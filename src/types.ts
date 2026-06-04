export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'agent' | 'user' | 'database' | 'ai' | 'service' | 'queue';
  description?: string;
  x: number;
  y: number;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI Agents' | 'RAG & Search' | 'Workflows' | 'Pipelines' | 'Analytics';
  businessContext: string;
  challenge: string;
  solution: string;
  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  tools: string[];
  implementationDetails?: string[];
  aiAutomationLayer: string;
  deploymentApproach: string;
  measurableResults: string[];
  lessonsLearned: string[];
  contributions: string[];
  icon: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  forWho: string;
  deliverables: string[];
  businessValue: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Engineering' | 'AI Implementation' | 'Architecture' | 'Leadership';
  date: string;
  readTime: string;
  summary: string;
  content: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar: string;
  content: string;
  type: 'client' | 'peer' | 'team';
  metric?: string;
}
