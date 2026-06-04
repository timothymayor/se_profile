import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily, guarding against missing API key crashes
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ Warning: GEMINI_API_KEY is not defined. AI consulting assistant will fall back to local responses.");
      throw new Error("GEMINI_API_KEY is required for the AI Consulting Agent.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Portfolio Knowledge Base to train the AI Consultant Chatbot
const CONSULTANT_KB = `
You are the AI Consulting Assistant for Alex Mercer, a Senior Software Engineer and AI Solutions Consultant.
Your objective is to advise clients, answer technical questions, explain the projects in the portfolio, and convert visitors into scheduling a discovery call.

About Alex Mercer:
- Title: Principal Software Engineer & AI Solutions Consultant
- Background: 8+ years of experience leading engineering teams, former Technical Lead at top-tier startups, now advising enterprises and startups on AI adoption and custom software systems.
- Brand positioning: Someone who designs, builds, and ships working production systems, bridging products, data, and automation. Translates business needs into robust technical architectures.
- Tone: Confident, concise, analytical, technically detailed yet easy for non-technical executives to understand. Focuses on business outcomes and Speed of Execution, not vague buzzwords.

Services Offered:
1. AI Strategy & Feasibility Advisory: Model selection, technical viability, cost/latency optimization.
2. Intelligent Workflow Automation: Automating multi-step operational flows connecting email, CRMs, Slack, and document repositories.
3. Custom Full-Stack AI Software: React/TypeScript, NodeJS/Express APIs, cloud platforms with premium desktop-first precision.
4. AI Prototyping & MVPs: High-velocity 4-week builds from concept to secure beta.
5. System Architecture Audits: Influx of semantic caching, vector indexing strategies, and database schemas.
6. Internal Tools & Operations Interfaces.
7. Document Processing Pipelines (OCR-free visual LLM parsers).

Alex's Core Projects (10 Real-World Case Studies):
1. AI Customer Support Assistant: Cuts response times to 25s, handles 68% of inbound queries via dynamic tool-calling. (Tools: React, Shopify API, Zendesk SDK, Gemini).
2. Internal Knowledge Base Search (RAG): Scientific PDF semantic reader mapping citations back to exact source page coordinates. (Tools: Qdrant VDB, Late Chunking, FastAPI).
3. Recruitment Automation Platform: Multi-agent screening and scheduling coordinating resume parsing to Google Calendar. (Tools: BullMQ, SendGrid, Node.js).
4. Sales Lead Qualification Assistant: Real-time search checking ICP signals and auto-drafting intro pitches. (Tools: Puppeteer, Hubspot. Google Search Grounding).
5. Executive Reporting Dashboard: Visual corporate dashboard that auto-summarizes revenue anomalies. (Tools: D3, Recharts, Express).
6. Document Processing and Extraction: High-throughput visual file parser processing 12,000 invoices/week with Zod schema validation. (Tools: Gemini API, S3).
7. Workflow Operations Automator: Deals webhook linking Salesforce, custom legal PDF generation, and DocuSign triggers. (Tools: AWS Lambda, Pulumi).
8. AI Product Prototype (MVP): Completed visual presentation pitch SaaS delivered in 26 days. (Tools: Supabase, React Canvas).
9. Customer Onboarding Checklist: Dynamic custom guide reducing signup dropout rate by 54%. (Tools: React, Auth0, AWS).
10. DevSecOps Engineering Tooling: Jira webhook automations that tag issues and draft release summaries from commit logs. (Tools: Jira Rest API, Git Diff Parsing).

Guidelines for your responses:
- Talk as Alex's expert representative. Frame advice with commercial impact (e.g. ROI, hours saved) alongside raw tech details.
- Always be brief and highlight 1-2 relevant case studies from the list of 10 above when they match the user's inquiry!
- Under no circumstances make up projects not listed in this KB.
- Encourage booking a Discovery Call. Give the booking url as "#contact-booking" or offer direct email.
`;

// API routes
app.post('/api/consult', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    try {
      const gemini = getGeminiClient();

      // Format previous messages into contents array
      const contentsParts: any[] = [];
      
      // Seed systems prompt context for the model
      const systemInstruction = CONSULTANT_KB;

      if (history && Array.isArray(history)) {
        history.forEach((msg: any) => {
          contentsParts.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        });
      }

      contentsParts.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await gemini.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsParts,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const textOutput = response.text || "I was unable to compile an answer at this time. Please try again shortly.";
      res.json({ content: textOutput });
    } catch (apiError: any) {
      console.error("Gemini API Error:", apiError);
      
      // Graceful local fallback to avoid breaking user interactions during offline testing or missing key situations
      const fallbackReplies: { [key: string]: string } = {
        "hello": "Hello! I am Alex Mercer's AI Solutions Consultant representative. I can tell you about our RAG pipelines, workflow automation systems, or any of the 10 real-world case studies in our portfolio. How can I assist with your engineering or AI strategy today?",
        "rag": "We have comprehensive experience with Retrieval-Augmented Generation (RAG). In our portfolio, Case Study #2 is an Internal Knowledge Base Search system utilizing Qdrant and a 'Late Chunking' strategy over scientific PDFs. This reduced search times from 8 hours per week to under 4 minutes with 99.1% accurate citations.",
        "support": "Our AI Customer Support Assistant (Case Study #1) utilizes Shopify dynamic tool calling to automate 68% of e-commerce support tickets safely with a secure human handoff. This cut our client's first-response times from 4.5 hours to 25 seconds.",
        "automation": "We build operational automation. For example, our Lead Qualification Assistant (Case Study #4) enriches anonymous signups in real-time, and our Workflow Operations Automator (Case Study #7) connects Salesforce update events directly to custom DocuSign generation.",
        "contact": "Excellent! You can schedule a discovery call with me by moving down to the contact form below or clicking 'Book a Discovery Call'. Let's find an innovative strategy for your business."
      };

      const q = message.toLowerCase();
      let matchedReply = "Thanks for your inquiry. I would love to talk about how our AI strategy, workflow automations, and custom full-stack solutions can accelerate your operations. You can schedule a 15-minute Strategy Call below on the booking calendar!";
      
      for (const [key, val] of Object.entries(fallbackReplies)) {
        if (q.includes(key)) {
          matchedReply = val;
          break;
        }
      }

      res.json({ 
        content: matchedReply, 
        warning: "Running in offline fallback mode." 
      });
    }
  } catch (err: any) {
    console.error("Server consult error:", err);
    res.status(500).json({ error: "Failed to process consultation query." });
  }
});

// Configure Vite middleware in development or direct static serving in production
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    console.log("🚀 Starting in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log("📦 Starting in production mode serving static directory...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`📡 Full-stack portfolio server is spinning on http://localhost:${PORT}`);
  });
}

setupServer();
