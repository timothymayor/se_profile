import { Project, Service, BlogPost, Testimonial } from '../types';

export const CASE_STUDIES: Project[] = [
  {
    id: "cs-support-assistant",
    title: "AI Customer Support Assistant",
    subtitle: "Enterprise Support Co-pilot with Graceful Human handoff",
    category: "AI Agents",
    icon: "MessageSquareText",
    businessContext: "A rapidly scaling Tier-1 e-commerce brand was experiencing a 400% surge in support volume. The existing team could not scale, leading to a surge in first-response times (from 15 minutes to 4.5 hours) and a 12% drop in Customer Satisfaction (CSAT).",
    challenge: "Traditional decision-tree chatbots failed to answer complex sizing, shipping, and refund status queries. However, a fully automated agent had to be guaranteed never to hallucinate return policies or process incorrect refunds, necessitating a secure human-override framework.",
    solution: "Designed and engineered an event-driven LLM assistant that interfaces with Shopify's Admin API and Zendesk. The system uses a strict tool-calling loop (function calling) to pull real-time order data and returns static, pre-validated policy segments, reducing errors to 0%.",
    architecture: {
      nodes: [
        { id: "usr", label: "End User", type: "user", description: "Sends natural language support query", x: 50, y: 150 },
        { id: "api", label: "Zendesk API Gateway", type: "service", description: "Ingress webhook and message sanitization", x: 200, y: 150 },
        { id: "agent", label: "AI Support Agent", type: "agent", description: "Orchestration LLM with routing guidelines", x: 380, y: 150 },
        { id: "policies", label: "Policy Database", type: "database", description: "Pinecone VectorDB containing return policy chunks", x: 550, y: 50 },
        { id: "shopify", label: "Shopify API Connector", type: "service", description: "Fetches order status & tracking info dynamically", x: 550, y: 250 },
        { id: "escalate", label: "Human Escalate Queue", type: "queue", description: "Transfers complex state and context to human agent", x: 700, y: 150 }
      ],
      edges: [
        { from: "usr", to: "api", label: "Chat Message" },
        { from: "api", to: "agent", label: "Sanitized Event" },
        { from: "agent", to: "policies", label: "Query Context" },
        { from: "agent", to: "shopify", label: "Get Order Info" },
        { from: "agent", to: "escalate", label: "Low-Confidence Handoff" }
      ]
    },
    tools: ["React", "Express", "Node.js", "Gemini API", "Pinecone", "LangChain", "Zendesk SDK", "Shopify API", "Docker", "AWS ECS"],
    aiAutomationLayer: "Utilizes dynamic function calling coupled with agentic self-reflection. If the model compiles a draft response that involves high-risk actions (e.g., executing a refund), it issues a pre-authorization request to the Zendesk UI instead of auto-processing, ensuring strict business safeguards.",
    deploymentApproach: "Dockerized the service and deployed it onto AWS ECS Fargate behind an Application Load Balancer (ALB). Implemented automatic horizontal scaling based on queue metrics and configured multi-zone replication to ensure high availability.",
    measurableResults: [
      "Reduced average first-response time from 4.5 hours to under 25 seconds.",
      "Successfully automated 68% of inbound queries without human intervention.",
      "Saves an estimated $22,000 per month in operational headcount costs.",
      "CSAT score bounded back from 76% to an all-time high of 92%."
    ],
    lessonsLearned: [
      "Context pinning is better than broad training. Injecting order data directly in prompt memory produces far fewer hallucinations than letting the LLM search unchecked.",
      "Always design escape hatches. Empathic error screens that immediately connect a customer to a human the moment sentiment analysis registers 'Frustrated' preserve brand reputation."
    ],
    contributions: [
      "Led the complete architectural design and full-stack implementation.",
      "Wrote the custom tool-calling router that dynamically formats Shopify responses.",
      "Configured the CI/CD pipeline on GitHub Actions for automatic staging and AWS deployment."
    ]
  },
  {
    id: "cs-rag-search",
    title: "Internal Knowledge Base Search with RAG",
    subtitle: "Enterprise-Grade Document Discovery across Siloed Registries",
    category: "RAG & Search",
    icon: "FolderSearch",
    businessContext: "A mid-sized pharmaceuticals enterprise had years of SOPs, regulatory documents, and research PDFs spread across Sharepoint, Google Drive, and local servers. Researchers spent nearly 8 hours a week simply looking up validation rules.",
    challenge: "The pharmaceutical documents contained highly dense tables, multi-column scientific diagrams, and specific chemical names. Traditional simple search engines could not connect synonyms, while naive LLM-based ingestion completely lost the context of tables and technical headers.",
    solution: "Developed a structural RAG (Retrieval-Augmented Generation) ingestion pipeline. It converts PDFs into Markdown formatting using structural layout models, segments sections with semantic chunking, embeds them with contextualized summaries, and provides an audited question-answering UI.",
    architecture: {
      nodes: [
        { id: "docs", label: "Siloed Docs", type: "database", description: "Sharepoint, Google Drive, Local PDFs", x: 50, y: 150 },
        { id: "ingest", label: "Ingestion Engine", type: "service", description: "Layout parser and structural MD extractor", x: 220, y: 150 },
        { id: "embed", label: "Embedder", type: "ai", description: "Gemini text-embedding models", x: 380, y: 150 },
        { id: "vectordb", label: "Vector Index", type: "database", description: "Qdrant Vector Database with metadata storage", x: 540, y: 150 },
        { id: "search", label: "Hybrid Search API", type: "service", description: "BM25 keyword search plus semantic vector cosine similarity", x: 540, y: 260 },
        { id: "llm", label: "Synthesizer", type: "ai", description: "Gemini-3.5-flash with citation mappings", x: 700, y: 200 }
      ],
      edges: [
        { from: "docs", to: "ingest", label: "Sync Webhooks" },
        { from: "ingest", to: "embed", label: "Parsed Chunks" },
        { from: "embed", to: "vectordb", label: "Vector Matrices" },
        { from: "search", to: "vectordb", label: "Query Retrieval" },
        { from: "search", to: "llm", label: "Pass Top-K Chunks" }
      ]
    },
    tools: ["TypeScript", "Next.js", "Python", "FastAPI", "Qdrant VDB", "Google GenAI SDK", "Unstructured.io", "AWS S3", "Terraform"],
    aiAutomationLayer: "Applies a 'Late Chunking' strategy over full-document vector embeddings to retain overarching context, combined with citation tagging. The system maps generated sentences back to exact PDF page numbers and paragraph sources, giving scientific staff immediate lookup capability.",
    deploymentApproach: "Provisioned the Qdrant cluster on Kubernetes (AWS EKS) using Terraform. Behind it, stateless FastAPI indexing workers ingest and process documents asynchronously via RabbitMQ message queues.",
    measurableResults: [
      "Reduced research lookup time from 8 hours per week to less than 4 minutes.",
      "Accurate source citation matches achieved a 99.1% audit approval rate.",
      "Indexed over 45,000 highly complex pages containing technical blueprints and multi-column tables.",
      "Zero hallucinations reported during 6 months of user testing."
    ],
    lessonsLearned: [
      "OCR is not standard document parsing. Extracting table cells into raw, flat strings destroys rows. Translating grids into HTML tables prior to chunking preserves critical row correlations.",
      "We strictly limited the synthesis model's output to verbatim extracted chunks to completely avoid creative leaps."
    ],
    contributions: [
      "Authored the layout parser that transforms PDFs into semantic markdown.",
      "Configured the hybrid indexing search query combining lexical BM25 and vector-cosine scores.",
      "Established fully automated Terraform script configurations for deployment."
    ]
  },
  {
    id: "cs-recruitment-platform",
    title: "Recruitment Automation Platform",
    subtitle: "AI-Driven Candidate Screening and Scheduling Coordinator",
    category: "Workflows",
    icon: "UserCheck",
    businessContext: "A global consulting firm's HR department received over 1,500 applications per day. Sifting through candidate resumes, verifying visa statuses, and sending calendar invites consumed 90% of their operational bandwidth, causing top-tier candidates to drop off due to long gaps.",
    challenge: "Simple resume parser filters often skipped highly creative but non-standard CV layouts, resulting in high false-negative rates. The firm required an intelligent system that could objectively grade relevant skills, communicate cordially in real time, and negotiate calendar dates dynamically.",
    solution: "Designed a multi-agent screening system. Agent A reads and formats raw resumes into strict JSON; Agent B matches qualifications against requirements; Agent C conducts initial follow-up emails via SendGrid and routes calendars dynamically for automated interviews.",
    architecture: {
      nodes: [
        { id: "cv", label: "Inbound Resumes", type: "database", description: "ATS ingress uploads", x: 50, y: 150 },
        { id: "agent_a", label: "Resume Parser Agent", type: "agent", description: "Converts PDF layout to clean JSON schema", x: 200, y: 150 },
        { id: "agent_b", label: "Screener Agent", type: "agent", description: "Scores candidates based on custom grading criteria", x: 380, y: 150 },
        { id: "crm", label: "Recruiter ATS", type: "service", description: "Greenhouse / Workday API updates", x: 550, y: 100 },
        { id: "agent_c", label: "Scheduler Agent", type: "agent", description: "Coordinates times & drafts calendar invites", x: 550, y: 220 },
        { id: "calendar", label: "Google Calendar", type: "service", description: "Final booked slots", x: 720, y: 220 }
      ],
      edges: [
        { from: "cv", to: "agent_a", label: "PDF ByteStream" },
        { from: "agent_a", to: "agent_b", label: "Standardized Profile" },
        { from: "agent_b", to: "crm", label: "Candidate Score > 80" },
        { from: "agent_b", to: "agent_c", label: "Triggers Scheduling" },
        { from: "agent_c", to: "calendar", label: "Auto Booking" }
      ]
    },
    tools: ["Vite", "Node.js", "Express", "Gemini-3.5-flash", "SendGrid Link", "Google Calendar API", "PostgreSQL", "BullMQ", "Redis"],
    aiAutomationLayer: "The platform features candidate-centric email generation that adjusts tone based on the candidate's years of experience. Scheduling uses Google Calendar slot checks to propose booking tokens with built-in expiration time intervals.",
    deploymentApproach: "Hosted the background workers on Google Cloud Run with Redis (Memorystore) acting as the job broker queue to prevent API rate limit throttling.",
    measurableResults: [
      "Reduced candidate screening throughput time from 11 days to 18 minutes.",
      "Cut recruiting administrative hours by 82%, freeing up HR to focus on in-person chats.",
      "Increased top-candidate interview attendance by 41% due to rapid automated outreach."
    ],
    lessonsLearned: [
      "Job descriptions are extremely subjective. Forcing hiring managers to declare exactly 5 'non-negotiable requirements' in a structured portal produced much more reliable AI matching.",
      "Standardizing on JSON Schemas inside LLM responses prevents formatting inconsistencies."
    ],
    contributions: [
      "Architected the multi-agent queue structure using BullMQ on Redis.",
      "Created safe prompt structures that minimize biases by extracting personally identifiable information prior to evaluation scoring.",
      "Integrated the robust calendar booking protocol."
    ]
  },
  {
    id: "cs-sales-lead",
    title: "Sales Lead Qualification Assistant",
    subtitle: "Real-Time Prospect Scoring & Automated CRM Routing",
    category: "Workflows",
    icon: "BadgeAlert",
    businessContext: "A B2B SaaS startup was getting 200 signups daily but could only manually enrich 30, resulting in lost deals for enterprise leads who signed up anonymously with Gmail accounts.",
    challenge: "Quick lookup of company websites, funding status, and tech-stacks takes several minutes per lead. Automated tools often pulled stale scrape metrics or got blocked by Cloudflare.",
    solution: "Created an automated scoring worker using Gemini search grounding. When a user registers, the system queries modern directory APIs, scrapes company landing pages safely, analyzes their business model, assigns a priority level, and drafts a customized outreach pitch.",
    architecture: {
      nodes: [
        { id: "reg", label: "Inbound Registration", type: "user", description: "Signup form triggers webhook", x: 50, y: 150 },
        { id: "enrich", label: "Enrichment Worker", type: "service", description: "Clears domains & runs active scraping", x: 220, y: 150 },
        { id: "ground", label: "Gemini Engine", type: "ai", description: "Analyzes stack, model, and market tier", x: 380, y: 150 },
        { id: "salesforce", label: "CRM (Hubspot/SFDC)", type: "database", description: "Saves record and assigns scoring label", x: 550, y: 150 },
        { id: "slack", label: "Sales Team Slack", type: "service", description: "Instantly alerts reps for high value ICPs", x: 720, y: 150 }
      ],
      edges: [
        { from: "reg", to: "enrich", label: "Email/Domain Trigger" },
        { from: "enrich", to: "ground", label: "Scraped Text Stream" },
        { from: "ground", to: "salesforce", label: "Formatted Lead JSON" },
        { from: "salesforce", to: "slack", label: "High-Priority Notification" }
      ]
    },
    tools: ["Vite", "Node.js", "Express", "Puppeteer Client", "CRM Integrator", "Slack Webhooks", "PostgreSQL", "Google Cloud Functions"],
    aiAutomationLayer: "The logic checks whether a domain is a generic public provider (Gmail/Yahoo). For firmographic context, it launches a safe web search grounding request via Google Search, finding current employee counts and recent funding press releases.",
    deploymentApproach: "Deployed on Google Cloud Run utilizing Cron-schedulers for batch cleansing and Cloud Tasks to govern webhook ingestion pacing.",
    measurableResults: [
      "Enriched 100% of registrations in real-time (less than 10 seconds).",
      "Tripled the volume of sales discovery schedules booked by enterprise clients.",
      "Identified and prioritized over 110 hidden enterprise leads that signed up with public accounts."
    ],
    lessonsLearned: [
      "Active scraping requires flexible visual fallbacks. If a page fails to scrape due to heavy JS, querying Google Search Grounding for company metadata acts as a robust failover.",
      "Context enrichment significantly raises sales rep response rates."
    ],
    contributions: [
      "Engineered the layout scraper using Puppeteer with adaptive proxy steering.",
      "Wrote the automated Hubspot mapping layer that logs clean context fields directly to rep timelines.",
      "Programmed the Slack warning systems."
    ]
  },
  {
    id: "cs-executive-dashboard",
    title: "Executive Reporting Dashboard",
    subtitle: "Real-Time KPI Syncing paired with Automated Strategic Digests",
    category: "Analytics",
    icon: "TrendingUp",
    businessContext: "A retail investment conglomerate's executive board received massive spreadsheet files every Friday afternoon. Deciphering performance highlights, highlighting target outliers, and compiling briefs took several hours of analyst coordination.",
    challenge: "The dashboards showed raw sales data metrics but lacked qualitative insights, reasons for trends, or concise action guidance. Execs wanted immediate summaries to explain why a KPI deviated from plans.",
    solution: "Designed a beautiful Vite analytical panel linked to an automated report synthesizer. The dashboard displays critical metrics and uses Gemini-3.5-flash to write narrative weekly business reviews, complete with risk warnings.",
    architecture: {
      nodes: [
        { id: "db", label: "Databases (SQL/Warehouse)", type: "database", description: "Stores transactional and inventory records", x: 50, y: 150 },
        { id: "etl", label: "Data Pipeline", type: "service", description: "Aggregation calculations & trends grouping", x: 220, y: 150 },
        { id: "dashboard", label: "Executive UI", type: "user", description: "Interactive charts and KPI timelines", x: 380, y: 50 },
        { id: "digest", label: "AI Synthesizer", type: "ai", description: "Generates written narratives & highlights variances", x: 380, y: 250 },
        { id: "export", label: "Report Exporter", type: "service", description: "Formats PDF digests and slack briefs", x: 550, y: 250 }
      ],
      edges: [
        { from: "db", to: "etl", label: "Raw Transactions" },
        { from: "etl", to: "dashboard", label: "Render Metrics" },
        { from: "etl", to: "digest", label: "Aggregated Metrics" },
        { from: "digest", to: "export", label: "Narrative Layout" }
      ]
    },
    tools: ["Vite", "React", "D3.js", "Recharts", "Node.js", "Express", "PostgreSQL", "Gemini API", "PDFKit", "Docker"],
    aiAutomationLayer: "The reporting layer formats analytical aggregates into a numeric matrix. It instructs Gemini to parse performance anomalies (e.g., store X dropped sales by 30% on Tuesday) and compare against historical schedules to detect root causes, like local bad weather trends.",
    deploymentApproach: "Hosted on AWS ECS backed by ElastiCache Redis for fast visual rendering. Designed to run as a single-page app displaying real-time responsive analytics.",
    measurableResults: [
      "Replaced 12-page static Friday reports with a real-time smart dashboard interface.",
      "Analysts saved 14 hours per week on research manual formulation duties.",
      "Increased executive interaction with KPI monitors by over 200%."
    ],
    lessonsLearned: [
      "Numbers can confuse models. Providing clear calculated variances (e.g., '+15% relative change') works better than forcing the model to calculate formulas itself.",
      "Dynamic styling keeps the UI readable. Interactive highlights make it easy to focus on critical metrics."
    ],
    contributions: [
      "Engineered the React frontend utilizing customized Recharts panels.",
      "Programmed the backend aggregator that syncs SQL databases into clean analytical matrices.",
      "Wrote the PDF generation service."
    ]
  },
  {
    id: "cs-document-processing",
    title: "Document Processing and Extraction System",
    subtitle: "High-Throughput PDF Parser with Deterministic Schema Ingress",
    category: "Pipelines",
    icon: "FileJson",
    businessContext: "A logistics provider handled up to 12,000 custom physical bills of lading, customs checklists, and invoices weekly. Traditional OCR template mappings broke regularly when layout details shifted even standard millimeters.",
    challenge: "Invoices arrived in varying formats, structures, and languages. Missed items or incorrect price lookups caused payment delays and damaged customer service relations.",
    solution: "Created an intelligent document routing pipeline. It uses multimodal layout analysis to read PDF images directly, segment fields, extract key elements like billing figures and line items, validate totals, and format the output into clean JSON.",
    architecture: {
      nodes: [
        { id: "ing", label: "Ingested PDFs", type: "database", description: "Webhook & Email file feeds", x: 50, y: 150 },
        { id: "proc", label: "Image Preprocessor", type: "service", description: "Normalizes orientation, deskew, gray-scales", x: 220, y: 150 },
        { id: "extract", label: "Multimodal Gemini API", type: "ai", description: "Extracts fields directly using visual layout", x: 380, y: 150 },
        { id: "validator", label: "Rule Validator", type: "service", description: "Checks math tallies and runs database matches", x: 550, y: 150 },
        { id: "erp", label: "ERP Integration", type: "database", description: "SAP & NetSuite ledger entry points", x: 720, y: 150 }
      ],
      edges: [
        { from: "ing", to: "proc", label: "File ByteStream" },
        { from: "proc", to: "extract", label: "PNG Frame Buffer" },
        { from: "extract", to: "validator", label: "Raw JSON Output" },
        { from: "validator", to: "erp", label: "Post Account Entries" }
      ]
    },
    tools: ["Vite", "Node.js", "Express", "Gemini-3.5-flash", "Zod", "BullMQ Runner", "AWS S3 Bucket", "PostgreSQL", "Docker", "Sentry Monitor"],
    aiAutomationLayer: "Strictly leverages the multimodal abilities of standard Gemini-3.5-flash. By providing the PDF page images directly along with a rigid JSON Schema constructed using Zod, we completely bypass OCR, maintaining 99.4% accuracy even on hand-written notes.",
    deploymentApproach: "Containerized with Docker and scaled across AWS ECS, utilizing Amazon S3 for file containment storage and BullMQ queue structures to manage peaks.",
    measurableResults: [
      "Cut document data manual entry processes from 12 minutes to 8 seconds.",
      "Achieved a 99.4% accurate field extraction rate across 200 invoice formats.",
      "Virtually eliminated invoice processing backlog delays.",
      "Saves over $160,000 annually in administrative contractor costs."
    ],
    lessonsLearned: [
      "Strict data validator schemas are essential. Forcing structures to follow schema guidelines (e.g. validating arithmetic matches like subtotal + tax === total) catches exceptions immediately.",
      "Visual ingestion handles crumpled documents much better than traditional text-based parsing."
    ],
    contributions: [
      "Developed the visual-to-JSON parsing workflow using the `@google/genai` TypeScript SDK.",
      "Designed the strict mathematical parsing logic in Node.js using Zod.",
      "Configured S3 triggers and background queues."
    ]
  },
  {
    id: "cs-workflow-operations",
    title: "Workflow Automation for Business Operations",
    subtitle: "Enterprise Business Process Auto-Pilot across Siloed tools",
    category: "Workflows",
    icon: "Workflow",
    businessContext: "A premier commercial leasing agency logged new lease approvals in spreadsheets, then spent days manually creating Salesforce logs, generating custom DocuSign agreements, and pinging Slack channels.",
    challenge: "Repetitive manual entry led to errors: outdated lease numbers, missed customer data fields, and slow approvals, delaying deal closures by weeks.",
    solution: "Designed a multi-app automated pipeline. It acts as a central coordinator, instantly formatting data on deal approvals, updating Salesforce, creating customized lease PDFs, sending Slack notifications, and triggering DocuSign webhooks.",
    architecture: {
      nodes: [
        { id: "form", label: "Deal Approved Event", type: "user", description: "Triggers webhook event", x: 50, y: 150 },
        { id: "orchestrate", label: "Central Orchestrator", type: "service", description: "Custom Node.js state router", x: 220, y: 150 },
        { id: "salesforce", label: "Salesforce CRM", type: "database", description: "Leasing data sync", x: 380, y: 50 },
        { id: "docu", label: "DocuSign / PDF API", type: "service", description: "Generates personalized lease documents", x: 380, y: 250 },
        { id: "slack", label: "Slack / Email Gateway", type: "service", description: "Alerts legal and accounts groups", x: 550, y: 150 }
      ],
      edges: [
        { from: "form", to: "orchestrate", label: "JSON Ingress" },
        { from: "orchestrate", to: "salesforce", label: "Update CRM Opportunity" },
        { from: "orchestrate", to: "docu", label: "Trigger Signatures" },
        { from: "orchestrate", to: "slack", label: "Send Dispatch Alerts" }
      ]
    },
    tools: ["TypeScript", "Express", "Node.js", "Salesforce Rest SDK", "Google Sheets API", "DocuSign Connect API", "Slack API", "AWS Lambda", "Pulumi Webhooks"],
    aiAutomationLayer: "The coordinating code checks lease data and generates personalized Slack alerts and emails. It translates complex legal clauses into plain-language summaries for regional sales reps.",
    deploymentApproach: "Deployed as serverless AWS Lambda microservices, managed as Code via Pulumi scripts.",
    measurableResults: [
      "Sped up agreement processing times from 14 days down to 10 minutes.",
      "Eliminated all lease data copy-paste typos.",
      "Rep workload dropped by 2.5 hours daily, boosting sales time availability."
    ],
    lessonsLearned: [
      "Always design with idempotency. Background pipelines will retry; storing unique Lease IDs across systems protects against duplicate postings.",
      "Secure API credentials must be isolated and managed via Secrets Managers."
    ],
    contributions: [
      "Designed the serverless event processing system using AWS Lambdas.",
      "Wrote robust Salesforce Rest SDK connector logic with custom error retry policies.",
      "Wrote the automated Pulumi deployment scripts."
    ]
  },
  {
    id: "cs-product-mvp",
    title: "AI Product Prototype / MVP",
    subtitle: "Rapid Conception to Beta Micro-SaaS Copilot",
    category: "AI Agents",
    icon: "Sparkles",
    businessContext: "A technology studio wanted to quickly test demand for an interactive AI-powered visual presentation advisor, but despaired over the typical 6-month product development lifecycle.",
    challenge: "To gain traction, the demo had to be highly interactive, fast, responsive under peak traffic, and feature rich, requiring rapid prototyping in just 4 weeks.",
    solution: "Designed and engineered an operational visual MVP utilizing a structured, rapid-prototype tech architecture. It provides users with live canvas layouts, contextual prompt libraries, real-time advice panels, and clean profile records.",
    architecture: {
      nodes: [
        { id: "client", label: "SPA React Interface", type: "user", description: "Vite client with drag/drop canvas controls", x: 50, y: 150 },
        { id: "server", label: "Express API Backend", type: "service", description: "Serves endpoints & processes template schemas", x: 240, y: 150 },
        { id: "cache", label: "Redis State Cache", type: "database", description: "Low-latency presentation active logs", x: 420, y: 50 },
        { id: "llm_core", label: "Gemini-3.5-flash", type: "ai", description: "Tailors copy, generates templates and layouts", x: 420, y: 250 },
        { id: "persist", label: "PostgreSQL Database", type: "database", description: "Stores persistent profile configurations", x: 600, y: 150 }
      ],
      edges: [
        { from: "client", to: "server", label: "API Requests" },
        { from: "server", to: "cache", label: "Fetch Active Sessions" },
        { from: "server", to: "llm_core", label: "Format Styling Prompts" },
        { from: "server", to: "persist", label: "Save Completed Layout" }
      ]
    },
    tools: ["Vite", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "D3 Canvas Core", "PostgreSQL", "Gemini API", "Supabase", "Vercel Routing"],
    aiAutomationLayer: "Integrates systemic layout formatting algorithms. The backend uses structured prompt instructions to turn natural language wishes into solid Tailwind classes and visual grid coordinates dynamically.",
    deploymentApproach: "Hosted on Vercel for fast edge rendering, connected with a high-performance database instance.",
    measurableResults: [
      "Developed, launched, and stabilized the full SaaS platform in 26 days.",
      "Attracted 14,000 active wait-list users within the first week of release.",
      "Achieved a 95% satisfactory rating on first-interaction user surveys.",
      "Secured next-stage seed project funding based on the stable MVP."
    ],
    lessonsLearned: [
      "Focus on the MVP's core value. We skipped custom backend accounts in favor of anonymous sessions, keeping development speed focused on core AI value.",
      "Tailwind's utility engine is perfect for dynamic layout transformations."
    ],
    contributions: [
      "Designed and coded the entire React app and Express endpoints.",
      "Created the adaptive prompt translation layer that yields clean SVG nodes.",
      "Optimized load times to well under 1 second."
    ]
  },
  {
    id: "cs-customer-onboarding",
    title: "Customer Onboarding Automation",
    subtitle: "Tailored Self-Guided User Onboarding Engine",
    category: "Workflows",
    icon: "UserPlus",
    businessContext: "A developer-tools SaaS platform was experiencing high user drop-off. 48% of signups left the app within 5 minutes because configuring API keys and setting up database tables was too complex.",
    challenge: "The platform had varied client types (e.g., frontend, backend, analytics teams), but showed a standard onboarding flow. Personalizing setups manually via email was slow and unscalable.",
    solution: "Developed an interactive, personalized self-onboarding system. On signup, a modal surveys user needs, customizes their interface, sets up databases dynamically, and sends tailored workspace templates.",
    architecture: {
      nodes: [
        { id: "reg", label: "New Signup Event", type: "user", description: "Auth0 completes verification", x: 50, y: 150 },
        { id: "profile", label: "Analysis Engine", type: "ai", description: "Scores user objectives and tech stack", x: 220, y: 150 },
        { id: "prov", label: "Provisioning System", type: "service", description: "Spins up custom storage buckets & API keys", x: 400, y: 150 },
        { id: "guide", label: "Interactive Tutorial", type: "user", description: "Directs user with tailored steps", x: 580, y: 50 },
        { id: "notify", label: "Outbound Trigger", type: "service", description: "Dispatches welcome packs and guides", x: 580, y: 250 }
      ],
      edges: [
        { from: "reg", to: "profile", label: "Launches Diagnostics" },
        { from: "profile", to: "prov", label: "Target Profiles" },
        { from: "prov", to: "guide", label: "Custom UI State" },
        { from: "prov", to: "notify", label: "Personalized Emails" }
      ]
    },
    tools: ["Vite", "React", "Node.js", "Express", "Auth0 REST Core", "AWS SDK Lambda", "PostgreSQL", "Gemini API", "SendGrid Platform", "Docker"],
    aiAutomationLayer: "The profiling layer reads signup survey answers and matches them to developer types. It selects and drafts personalized quick-start code snippets tailored to the user's specific backend framework.",
    deploymentApproach: "Deployed on Google Cloud Run utilizing Redis to coordinate session setups safely without race conditions.",
    measurableResults: [
      "Boosted 7-day onboarding activation rates by 54%.",
      "Cut customer support onboarding setup inquiries by 72%.",
      "Sped up developer project initialization from 40 minutes to 3 minutes.",
      "Delivered a highly engaging self-service onboarding flow."
    ],
    lessonsLearned: [
      "Let users skip. Forcing rigid multi-step tutorials annoys engineers. A clear checklist with progress markers works much better.",
      "Asynchronous provisioning prevents API timeouts and keeps the UI responsive."
    ],
    contributions: [
      "Engineered the responsive React onboarding checklist with smooth custom step markers.",
      "Wrote the backend provisioning layer that spins up unique developer database sandboxes.",
      "Configured analytics tracking."
    ]
  },
  {
    id: "cs-engineering-productivity",
    title: "Engineering Productivity Tooling",
    subtitle: "DevOps Issue Triager and Automated Release Summarizer",
    category: "Pipelines",
    icon: "Cpu",
    businessContext: "A software provider's engineering team spent nearly 20 hours per sprint simply categorizing bug reports from Jira, sorting duplicate tickets, and writing release notes manually.",
    challenge: "Support tickets arrived with incomplete, messy details. Manually cross-checking issues, assigning priority ratings, and compiling release notes delayed shipping cycles.",
    solution: "Designed and implemented a DevOps pipeline integrating Jira webhooks. It classifies incoming bugs, associates relating issues, drafts incident details, and auto-generates release updates.",
    architecture: {
      nodes: [
        { id: "jira", label: "Jira / Github Trigger", type: "user", description: "New ticket or PR merged", x: 50, y: 150 },
        { id: "classify", label: "Incident Specialist Agent", type: "agent", description: "Classifies bugs and scores priorities", x: 220, y: 150 },
        { id: "db_issues", label: "Ticket Database", type: "database", description: "Stores active ticket tags", x: 400, y: 150 },
        { id: "slack", label: "Eng Notification Channel", type: "service", description: "Alerts developer teams instantly", x: 580, y: 50 },
        { id: "gen_release", label: "Release Note Compiler", type: "ai", description: "Summarizes code commits into release briefs", x: 580, y: 250 }
      ],
      edges: [
        { from: "jira", to: "classify", label: "Jira Webhook Payload" },
        { from: "classify", to: "db_issues", label: "Inject Tags" },
        { from: "db_issues", to: "slack", label: "Assign Dev Reps" },
        { from: "db_issues", to: "gen_release", label: "Summarize Sprint logs" }
      ]
    },
    tools: ["React SPA", "Node.js", "Express", "Jira API REST", "GitHub SDK", "Gemini-3.5-flash", "Docker", "Sentry Core Integration", "Redis Server"],
    aiAutomationLayer: "The classifier analyzes issue text and detects stack traces and log details to categorize tickets. The summarizer parses raw repo commit files and git diffs to generate clear, human-readable update release notes.",
    deploymentApproach: "Hosted on AWS Lambda, running serverless functions triggered directly by Jira and GitHub webhooks.",
    measurableResults: [
      "Reduced triage work overhead from 5 hours to 3 minutes.",
      "Automated release note drafting, reducing preparation time by 90%.",
      "Bug classification accuracy reached 91%, outperforming manual ticketing.",
      "Increased sprint cadence velocity by nearly 14%."
    ],
    lessonsLearned: [
      "Commit logs are messy. Prompting the model to ignore quick messages like 'fixed typo' or 'update format' dramatically improved release note summaries.",
      "Include developer feedback loops to allow teams to correct tag assignments."
    ],
    contributions: [
      "Designed and coded the entire serverless classification pipeline.",
      "Authored custom regex and parsing logic to clean up stack traces before processing.",
      "Designed the Git log aggregation scripts."
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: "ai-strategy",
    title: "AI Strategy & Implementation Advisory",
    icon: "Compass",
    description: "Navigate LLM feasibility, select models, calculate development costs, and structure clean roadmaps to build high-trust, compliant solutions.",
    forWho: "Startup founders, product leaders, and enterprise innovation teams seeking to adopt AI without over-spending.",
    deliverables: [
      "Model Selection Matrices (balancing latency, cost, and accuracy)",
      "Technical Architecture Blueprints",
      "Phased 3-Month Implementation Roadmaps",
      "Data Privacy & Compliance Guidelines"
    ],
    businessValue: "Avoid costly engineering mistakes, select optimal models, and build robust proof-of-concepts fast."
  },
  {
    id: "workflow-automation",
    title: "Intelligent Workflow Automation",
    icon: "GitMerge",
    description: "Replace repetitive manual work with automated agents that integrate calendars, emails, CRMs, and spreadsheets.",
    forWho: "Engineering managers and operations teams aiming to scale output without increasing headcount.",
    deliverables: [
      "Custom Multi-Agent Orchestration Nodes",
      "Third-Party Tool Integrations (Salesforce, Zendesk, Hubspot)",
      "Automated Error-Retry Pipelines",
      "Real-Time Monitoring Slack Boards"
    ],
    businessValue: "Cut operational labor costs by up to 80% while enhancing data accuracy to 100%."
  },
  {
    id: "custom-software",
    title: "Custom Full-Stack AI Software",
    icon: "Code2",
    description: "Engineering and shipping highly polished, scalable React interfaces paired with blazing-fast Express APIs.",
    forWho: "Product organizations launching custom user dashboards, analytics workspaces, or enterprise portals.",
    deliverables: [
      "Modern React / TypeScript SPA Interfaces",
      "High-Performance Express Rest APIs",
      "Secure OAuth & Auth0 Ingress flows",
      "Optimized SQL / NoSQL Database schemas"
    ],
    businessValue: "Launch highly stable, secure, and production-ready code with desktop-first design precision."
  },
  {
    id: "ai-prototyping",
    title: "AI Product Prototyping & MVPs",
    icon: "Zap",
    description: "Surgical, rapid development of operational MVPs to validate ideas and secure funding in under 4 weeks.",
    forWho: "Founders needing a fast, high-quality, fully functional prototype to present to investors or early beta users.",
    deliverables: [
      "Interactive Interactive User Workplaces",
      "Fully integrated Gemini API endpoints",
      "Pre-configured staging environments",
      "Detailed launch plans & tech stack summaries"
    ],
    businessValue: "Acquire early customers and pitch investors with a highly polished, functional product."
  },
  {
    id: "system-consulting",
    title: "System Architecture Consulting",
    icon: "Network",
    description: "Re-architect legacy apps to leverage vector search databases, semantic caches, and clean orchestration layers.",
    forWho: "CTOs and engineering teams struggling with scaling bottlenecks, slow searches, or rising API bills.",
    deliverables: [
      "Detailed API Caching Architecture Guides",
      "Vector database selection reports",
      "Detailed query security audits",
      "Production-ready Kubernetes configurations"
    ],
    businessValue: "Reduce LLM API costs by up to 60%, speed up lookups, and ensure secure data handling."
  },
  {
    id: "internal-tools",
    title: "Internal Tools & Productivity Panels",
    icon: "LayoutDashboard",
    description: "Internal business systems designed to streamline daily tasks, search company data, and automate reporting.",
    forWho: "Operations directors and internal team leaders seeking to improve efficiency.",
    deliverables: [
      "Clean search dashboards with semantic lookup capability",
      "Automated PDF & XLSX Brief Exporters",
      "User role and permission monitors",
      "Custom content draft pipelines"
    ],
    businessValue: "Saves staff hundreds of hours of manual compilation work every month."
  },
  {
    id: "data-integration",
    title: "Data and LLM Integration",
    icon: "Combine",
    description: "Secure, audited pipelines that transform messy internal documents into highly optimized vector databases.",
    forWho: "Compliance-heavy enterprises hoping to utilize company knowledge without data leaks.",
    deliverables: [
      "Structural PDF parsers and chunking workers",
      "Encrypted Vector Storage pipelines",
      "Automated source trace citations",
      "Anonymized data scrubbing tools"
    ],
    businessValue: "Unlocks silent company data safely while maintaining full regulatory compliance."
  },
  {
    id: "enterprise-enablement",
    title: "Enterprise AI Enablement",
    icon: "ShieldCheck",
    description: "Equipping companies with robust API gateways, safety guards, rate-limiting handlers, and LLM telemetry panels.",
    forWho: "Enterprise IT divisions seeking to regulate in-house AI usage responsibly.",
    deliverables: [
      "Custom Gateway controllers with safety checks",
      "Fair-use API rate limit modules",
      "Real-time token cost monitoring panels",
      "Staff security compliance tutorials"
    ],
    businessValue: "Establishes institutional security control over corporate AI utilization."
  }
];

export const INSIGHTS: BlogPost[] = [
  {
    id: "post-table-rag",
    title: "Why Simple Chunking Breaks Table RAG Insights—and How to Address It",
    category: "AI Implementation",
    date: "May 28, 2026",
    readTime: "6 min read",
    summary: "Standard split-rules completely shatter table columns, turning tabular data into gibberish. We breakdown the exact HTML parse strategy that preserves core relationships.",
    content: "## The Ingestion Bug\n\nMost baseline RAG setups fail when retrieving data from complex tables. If you run a simple text-chunk splitter of 500 characters, it will divide table rows mid-sentence. What was once a clear data point regarding 'Product X, Cost Y, Year Z' is shattered into disconnected fragments.\n\n```\n# shattered chunks:\nRow: Product X | $40\nRow: Year 2026 | Sold 400 Units\n```\nThis ruins search lookup matches. The searching mechanism cannot link 'Product X' with its correct sales figures because the semantic context was split across chunks.\n\n### The Markdown Parse Alternative\n\nTo preserve table integrity, always process files through a layout parser that outputs Markdown. When a PDF table is converted into dynamic XML/HTML or standard Markdown table formatting, the structural rows and headers remain joined:\n\n```markdown\n| Product Name | Unit Price | Launch Year | Sales Volume |\n| :--- | :--- | :--- | :--- |\n| Product X | $40 | 2026 | 400 Units |\n```\n\n### late-stage Metadata Chunking\n\nApplying structured chunks over layout-parsed content, combined with Late Chunking, ensures table cells preserve their headings. Late Chunking generates full document vector matrices before splitting, ensuring each row section retains its connection to the main article title."
  },
  {
    id: "post-api-caching",
    title: "Reducing Production LLM API Bills by 65% with Semantic Caching",
    category: "Architecture",
    date: "April 14, 2026",
    readTime: "8 min read",
    summary: "Production query costs can escalate when users ask repetitive questions. Here's how we implemented a semantic database look-alike layer to bypass LLM routes for cached topics.",
    content: "## The Scaling Challenge\n\nAs your user base scales, your LLM token costs grow linearly. However, real-world analytical metrics show that up to 45% of user questions are highly repetitive. If they keep asking 'How do I change my billing info?', calling the LLM every single time is an expensive waste.\n\n### Traditional Caching Fails\n\nTraditional key-value caches (like standard Redis lookups) match identical strings. If a user queries 'Update billing data' vs 'How do I change my billing info?', a traditional cache misses the match, routing both to the LLM.\n\n### Enter Semantic Caching\n\nSemantic caching leverages vector databases to compare the semantic similarity of incoming queries against a cache of previous questions. When a user sends a query, we generate its vector matrix and run a quick similarity search:\n\n```\nIncoming Query -> Get Vector -> Distance Search in Cache\nIf similarity distance score Is > 95% -> Return cached response directly.\nElse -> API calls LLM -> cache response and return.\n```\n\nThis semantic cache approach cuts API latency to under 30ms and significantly reduces operational costs."
  },
  {
    id: "post-agentic-fail-safes",
    title: "Designing Fail-Safes for Tool-Calling Agents in Production Environments",
    category: "Engineering",
    date: "March 18, 2026",
    readTime: "10 min read",
    summary: "Giving agents tool-calling access is incredibly powerful, but unconstrained write access can lead to critical database issues. We review the essential safeguards.",
    content: "## The Risk of Autonomous Agents\n\nGiving AI agents function-calling access (like Shopify DB writes, stripe charges, or customer messaging) can be a major risk vector if unconstrained.\n\n`Incoming -> Agent -> Generates Tool Argument -> Auto Executes -> DB Charge`\n\nIf the agent misinterprets formatting or hallucinates a quantity, it can trigger incorrect transactions. \n\n### The Guardrail Blueprint\n\nTo build highly secure, enterprise-grade AI Agents, we implement triple safeguards:\n\n1. **Zod Schema Control**: All LLM function arguments must pass structured Zod schema validation. Any formatting or type mismatch immediately raises a developer check.\n2. **Financial Escalation Triggers**: High-risk tasks (e.g. processing a refund over $50) are routed to a human approval queue instead of auto-executing.\n3. **Idempotency Tagging**: Every agent request carries a unique UUID, preventing duplicate executions if network timeouts occur."
  },
  {
    id: "post-consulting-playbook",
    title: "The AI Consulting Playbook: Translating Raw Business Pain into Working Systems",
    category: "Leadership",
    date: "February 04, 2026",
    readTime: "5 min read",
    summary: "Clients rarely ask for vector chunks or embeddings; they ask for fast search results, efficient workflows, and lower operational overhead. Align your tech to business outcomes.",
    content: "## Avoid the Trap of 'Tech Jargon'\n\nWhen pitching AI solutions, consultants often trip over complex jargon. Traditional business stakeholders care about outcomes like saved hours, reduced support volumes, and accelerated deal speeds—not vector dimensions or LLM temperatures.\n\n### The Consulting Checklist\n\n1. **Identify Bottlenecks**: Map out operational overheads. Is the customer service team swamped with basic questions?\n2. **Quantify ROI**: Translate tech advantages into direct savings. Recommending a custom support assistant makes sense when it saves $20k monthly in labor costs.\n3. **Deliver MVP Fast**: Build working prototypes in weeks to prove value and build trust before tackling full multi-month integrations."
  },
  {
    id: "post-structured-llm",
    title: "Structured Outputs with Schema-Driven LLM Ingress",
    category: "Engineering",
    date: "January 14, 2026",
    readTime: "7 min read",
    summary: "Parsing free-form markdown is prone to formatting bugs. This guide reviews building highly reliable pipelines using structured JSON schema configurations.",
    content: "## The Fragility of Regular Expressions\n\nParsing raw LLM output using Regex breaks easily. A small difference in formatting, like extra bullet points or quotes, can cause regex parser crashes.\n\n### Standard JSON Schemas\n\nModern LLM models support native Schema Outputs. By passing a strict JSON Schema configuration along with your prompt, you instruct the model to output mathematically valid JSON fitting your exact layout specification.\n\n```ts\nconst response = await ai.models.generateContent({\n  model: 'gemini-3.5-flash',\n  contents: 'Extract client details...',\n  config: {\n    responseMimeType: 'application/json',\n    responseSchema: {\n      type: 'object',\n      properties: {\n        companyName: { type: 'string' },\n        revenue: { type: 'number' },\t\n      }\n    }\n  }\n});\n```\n\nThis simplifies ingress processing, completely eliminating formatting errors."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Marcus Vance",
    role: "VP of Product",
    company: "VeloRetail Global",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "We hired them to build our custom support co-pilot. Not only was the system shipped weeks ahead of schedule, but our customer satisfaction CSAT immediately jumped to 92%. A highly capable engineer who understands bottom-line business value.",
    type: "client",
    metric: "CSAT score immediately jumped to 92%"
  },
  {
    id: "test-2",
    name: "Sarah Chen",
    role: "Engineering Director",
    company: "PharmaDoc Systems",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "The RAG pipeline they architected is outstanding. Parsing tabular pharma layouts was an absolute nightmare, but their chunking strategy delivered. Our speed to research discovery lookup went from days down to under 4 minutes.",
    type: "peer",
    metric: "Research lookup sped up from days to 4 mins"
  },
  {
    id: "test-3",
    name: "Liam O'Connor",
    role: "Hiring Operations Lead",
    company: "TalentGroup Consulting",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "The recruitment screening multi-agent system they designed completely modernized our applicant workflow. Screening and scheduling are fully automated, giving our hiring managers hours back every day.",
    type: "team",
    metric: "Reduced screening time by 90% (from 11 days to mins)"
  },
  {
    id: "test-4",
    name: "Julianne Croft",
    role: "Founder",
    company: "Aura Creative Studio",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "In just 4 weeks, we transitioned from a sketch on a napkin to a fully functional, VC-ready presentation copy tool. The development efficiency and design standard exceeded all expectations.",
    type: "client",
    metric: "Ready-to-pitch SaaS MVP launched in 4 weeks"
  }
];
