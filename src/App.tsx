/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Muhammad Ahmad — Agentic AI Developer & Automation Specialist Portfolio
 *
 * NOTE FOR MUHAMMAD:
 * All placeholders (bio, photo, projects, testimonials, social links) are marked
 * with clear TODO comments so you can easily update them with your own details.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Cpu,
  Workflow,
  Zap,
  Network,
  Database,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
  Sun,
  Moon,
  Menu,
  X,
  Mail,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  Send,
  ExternalLink,
  Copy,
  Check,
  GitBranch,
  Server,
  MessageSquare,
  ChevronRight,
  Clock,
  Compass,
  Briefcase,
  UserCheck,
  ArrowRight,
  Linkedin,
  Github
} from 'lucide-react';

/* =========================================================================
   1. EDITABLE CONSTANTS & PLACEHOLDER CONFIGURATION
   ========================================================================= */

// Contact information and verified profiles
const PROFILE = {
  name: 'Muhammad Ahmad',
  title: 'Agentic AI Developer',
  email: 'muhammadahma5858@gmail.com',
  whatsappNumber: '+92 370 6357435',
  whatsappUrl: 'https://wa.me/923706357435',
  githubUrl: 'https://github.com/muhammadahmad5858',
  githubUsername: 'muhammadahmad5858',
  
  // Tagline (editable)
  tagline: 'I design and build autonomous AI agents and automation systems that save businesses time and money.',

  // Professional Bio (editable, ~3-4 sentences)
  bio: 'I am an Agentic AI Developer specializing in architecting autonomous AI agents, resilient workflow automations, and scalable backend integrations. I partner with forward-thinking businesses and digital agencies to eliminate repetitive tasks and turn manual bottlenecks into intelligent, self-healing systems. By uniting state-of-the-art LLM reasoning with tools like n8n, webhooks, and custom APIs, I deliver reliable digital workers tailored to your exact business operations.',

  // Social Links
  socials: {
    linkedin: '#', // TODO: Add your LinkedIn profile URL (e.g., https://linkedin.com/in/muhammad-ahmad)
    github: 'https://github.com/muhammadahmad5858',
    upwork: '#',   // TODO: Add your Upwork profile URL
    fiverr: '#',   // TODO: Add your Fiverr profile URL
  },
};

// Subtitles cycled through in the Hero section typing effect
const TYPING_SUBTITLES = [
  'Agentic AI Developer',
  'n8n Automation Expert',
  'API & Backend Integrator',
];

// Quick stats & highlights in About Me (no fake numbers, icon + title + description)
const ABOUT_HIGHLIGHTS = [
  {
    icon: Bot,
    title: 'Agentic AI Systems',
    description: 'Autonomous reasoning, multi-step problem solving, tool calling, and structured memory retention.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'End-to-end multi-app pipelines connecting CRM, messaging, databases, and AI via n8n.',
  },
  {
    icon: Network,
    title: 'API Integrations',
    description: 'Custom RESTful endpoints, resilient webhooks, authentication flows, and microservices.',
  },
  {
    icon: ShieldCheck,
    title: 'Client-Focused Delivery',
    description: 'Direct communication, transparent milestones, thorough documentation, and post-launch support.',
  },
];

// Services offerings
const SERVICES_DATA = [
  {
    icon: Bot,
    title: 'Agentic AI Development',
    badge: 'Core Specialty',
    description:
      'Autonomous AI agents engineered for multi-step task execution, intelligent document analysis, customer support, and continuous decision-making.',
    features: [
      'Multi-agent decision loops & memory',
      'Function calling & live tool integrations',
      'Grounded RAG knowledge retrieval',
      'Autonomous ticket triage & processing',
    ],
  },
  {
    icon: Workflow,
    title: 'n8n Workflow Automation',
    badge: 'High Demand',
    description:
      'Custom automation pipelines, complex integrations, and no-code/low-code workflows that run 24/7 without manual intervention.',
    features: [
      'Self-hosted & cloud n8n architecture',
      'Webhook listeners & error-retry logic',
      'CRM, Slack, Google Workspace sync',
      'Scheduled data scrapers & reports',
    ],
  },
  {
    icon: Network,
    title: 'API Development & Integration',
    badge: 'Backend Logic',
    description:
      'High-performance REST APIs, third-party integrations, and custom endpoints that bridge disconnected software tools into one cohesive ecosystem.',
    features: [
      'REST API design & secure token auth',
      'Payment & SaaS webhook handlers',
      'Payload formatting & sanitization',
      'Fast API middleware for AI agents',
    ],
  },
  {
    icon: Database,
    title: 'Database Design & Management',
    badge: 'Data Architecture',
    description:
      'Schema design, data pipelines, and optimized databases tailored for storing real-time transaction records, user contexts, and AI vector embeddings.',
    features: [
      'Relational (SQL) & document (NoSQL) schemas',
      'Supabase & Firebase implementations',
      'Vector databases for AI knowledge bases',
      'Automated backup & migration pipelines',
    ],
  },
];

// Skills categorized groups
const SKILL_CATEGORIES = [
  {
    category: 'Agentic AI & Automation',
    icon: Bot,
    skills: [
      { name: 'n8n Workflows', highlight: true },
      { name: 'LangChain & Agent Frameworks', note: 'Editable placeholder' },
      { name: 'Prompt Engineering & System Personas' },
      { name: 'Workflow Automation Pipelines' },
      { name: 'Tool Calling & Function Execution' },
      { name: 'RAG Knowledge Retrieval' },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: Server,
    skills: [
      { name: 'REST API Development', highlight: true },
      { name: 'Node.js / Python', note: 'Editable placeholder' },
      { name: 'Webhooks & Event Listeners' },
      { name: 'JSON Schema Validation' },
      { name: 'Authentication (OAuth, API Keys)' },
      { name: 'Microservice Endpoints' },
    ],
  },
  {
    category: 'Databases',
    icon: Database,
    skills: [
      { name: 'SQL / PostgreSQL', highlight: true },
      { name: 'NoSQL / Firebase / Supabase', note: 'Editable placeholder' },
      { name: 'Vector Databases (Pinecone / Chroma)' },
      { name: 'Data Pipeline Design' },
      { name: 'Schema Normalization' },
    ],
  },
  {
    category: 'Tools & Platforms',
    icon: Terminal,
    skills: [
      { name: 'n8n Self-Hosted / Cloud', highlight: true },
      { name: 'Git & Version Control' },
      { name: 'Postman API Testing' },
      { name: 'Docker & Containerization', note: 'Editable placeholder' },
      { name: 'Linux / VPS Deployments' },
      { name: 'Zapier / Make.com' },
    ],
  },
];

// Featured Projects (4 Placeholders clearly commented for Muhammad to replace)
export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI Agents' | 'Automation' | 'API/Backend';
  description: string;
  tags: string[];
  link: string; // TODO: Replace '#' with real project link / demo
  details: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'AI Customer Support & Triage Agent',
    category: 'AI Agents',
    description:
      'Autonomous conversational agent that ingests user support tickets, consults internal docs via vector search, and resolves inquiries or escalates to human agents with context summaries.',
    tags: ['Agentic AI', 'n8n', 'LangChain', 'Vector Search'],
    link: '#', // TODO: Replace with Muhammad's project demo or GitHub link
    details: 'Autonomous multi-turn decision loop with real-time human-in-the-loop fallback.',
  },
  {
    id: 'proj-2',
    title: 'Multi-Platform Lead Automation Engine',
    category: 'Automation',
    description:
      'End-to-end n8n workflow synchronizing inbound leads from Typeform and LinkedIn, enriching contact profiles with web data, updating HubSpot CRM, and sending instant Slack alerts.',
    tags: ['n8n', 'HubSpot CRM', 'Webhooks', 'Slack API'],
    link: '#', // TODO: Replace with Muhammad's project demo or GitHub link
    details: 'Cuts response time from 4 hours to under 30 seconds with 99.9% pipeline reliability.',
  },
  {
    id: 'proj-3',
    title: 'Custom CRM & Payment Webhook API',
    category: 'API/Backend',
    description:
      'Resilient backend service handling Stripe payment webhooks, triggering automated customer provisioning, generating PDF invoices, and notifying accounting software in real time.',
    tags: ['REST API', 'Node.js', 'Stripe Webhooks', 'SQL'],
    link: '#', // TODO: Replace with Muhammad's project demo or GitHub link
    details: 'Zero data drop rate with idempotency keys and automatic retry queues.',
  },
  {
    id: 'proj-4',
    title: 'Autonomous Knowledge Base Retrieval Agent',
    category: 'AI Agents',
    description:
      'Specialized internal agent allowing team members to query technical product manuals and policy documentation in natural language with direct source citations.',
    tags: ['LLM Agents', 'Embeddings', 'Supabase', 'FastAPI'],
    link: '#', // TODO: Replace with Muhammad's project demo or GitHub link
    details: 'Reduces internal documentation lookup time by over 80% across 500+ indexed pages.',
  },
];

// Process Timeline (4 Steps)
const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery Call',
    icon: Compass,
    description: 'We map out your current bottlenecks, manual steps, existing tools, and desired automation objectives.',
  },
  {
    step: '02',
    title: 'Plan & Propose',
    icon: Workflow,
    description: 'I design a concrete system architecture blueprint, selecting optimal tools, APIs, and a clear timeline.',
  },
  {
    step: '03',
    title: 'Build & Automate',
    icon: Cpu,
    description: 'I build the agent logic, configure n8n pipelines, set up endpoints, and conduct rigorous edge-case testing.',
  },
  {
    step: '04',
    title: 'Deliver & Support',
    icon: CheckCircle2,
    description: 'Seamless deployment to your environment, live video walkthrough, comprehensive documentation, and ongoing support.',
  },
];

// Testimonials (Placeholders for Muhammad to replace later)
const TESTIMONIALS_DATA = [
  {
    id: 'test-1',
    quote:
      'Muhammad completely transformed our lead qualification workflow with n8n and an autonomous AI agent. What used to take hours of manual triage is now instantaneous. An absolute game-changer for our agency.',
    clientName: 'Alex Reynolds', // TODO: Replace with real client name
    role: 'Agency Founder & CEO', // TODO: Replace with real client role
    company: 'Apex Digital Systems', // TODO: Replace with client company
  },
  {
    id: 'test-2',
    quote:
      'The API integration Muhammad built between our custom database and payment gateways was flawless. Clean architecture, transparent updates, and finished ahead of our deadline.',
    clientName: 'Sarah Mitchell', // TODO: Replace with real client name
    role: 'Director of Operations', // TODO: Replace with real client role
    company: 'FinFlow Cloud', // TODO: Replace with client company
  },
  {
    id: 'test-3',
    quote:
      'Working with Muhammad was effortless. He has a rare ability to understand complex business logic and translate it into robust, reliable autonomous agents. Highly recommended!',
    clientName: 'David Vance', // TODO: Replace with real client name
    role: 'Product Lead', // TODO: Replace with real client role
    company: 'Nova Automations', // TODO: Replace with client company
  },
];

// Simulated AI Demo responses for the floating widget
const SIMULATED_KNOWLEDGE_BASE: { keywords: string[]; response: string }[] = [
  {
    keywords: ['service', 'offer', 'what do you do', 'help'],
    response:
      'Muhammad specializes in 4 primary areas: 1) Autonomous Agentic AI systems with tool-calling and memory, 2) n8n workflow automations, 3) Custom REST API development and webhook bridges, and 4) Database architecture (SQL/NoSQL/Vector). How can he help your business?',
  },
  {
    keywords: ['n8n', 'workflow', 'automation', 'automate'],
    response:
      'Yes! Muhammad is an n8n automation expert. He builds self-hosted and cloud n8n workflows that connect your CRMs, Slack, email, databases, and AI models into seamless pipelines with automatic error handling.',
  },
  {
    keywords: ['hire', 'contact', 'whatsapp', 'reach', 'price', 'rate', 'cost', 'quote', 'freelance'],
    response:
      'You can hire Muhammad directly on WhatsApp at +92 370 6357435 or by email at muhammadahma5858@gmail.com. He is available for freelance projects on Upwork and Fiverr, as well as direct client contracts!',
  },
  {
    keywords: ['agent', 'agentic', 'langchain', 'llm', 'autonomous'],
    response:
      'Agentic AI means AI systems that do not just chat—they take action! Muhammad builds agents capable of querying databases, triggering webhooks, reading docs via RAG, and executing multi-step business tasks autonomously.',
  },
  {
    keywords: ['tech', 'stack', 'tools', 'languages', 'python', 'node'],
    response:
      'Muhammad works with n8n, Node.js, Python, REST APIs, Webhooks, SQL/PostgreSQL, Supabase, Firebase, Vector DBs, LangChain/agent frameworks, Git, and Docker.',
  },
  {
    keywords: ['github', 'git', 'repo', 'code', 'repository', 'open source', 'projects'],
    response:
      'You can explore Muhammad\'s public repositories, agent implementations, and code at https://github.com/muhammadahmad5858 (@muhammadahmad5858).',
  },
];

/* =========================================================================
   2. MAIN APPLICATION COMPONENT
   ========================================================================= */

export default function App() {
  // Theme state: dark mode (true) or light mode (false) - stored in React state as requested
  const [isDark, setIsDark] = useState<boolean>(true);

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Navbar scrolled state (for dynamic blur & border)
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Hero section typewriter effect state
  const [typewriterIndex, setTypewriterIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Featured Projects filter category
  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | 'AI Agents' | 'Automation' | 'API/Backend'>('All');

  // Contact section copied tooltip indicators
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [copiedGithub, setCopiedGithub] = useState<boolean>(false);

  // Interactive message composer state in Contact section
  const [contactFormService, setContactFormService] = useState<string>('Agentic AI Development');
  const [contactFormName, setContactFormName] = useState<string>('');
  const [contactFormDetails, setContactFormDetails] = useState<string>('');

  // Floating AI Assistant Widget state (Step 8)
  const [chatWidgetOpen, setChatWidgetOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Hello! I am Muhammad's AI Portfolio Assistant. I can tell you about his agentic AI services, n8n automations, tech stack, or help you start a conversation. What would you like to know?",
      time: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Handle scroll detection for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth typewriter effect for hero subtitle
  useEffect(() => {
    const currentWord = TYPING_SUBTITLES[typewriterIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedText === currentWord) {
      // Pause at full word
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setTypewriterIndex((prev) => (prev + 1) % TYPING_SUBTITLES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? currentWord.substring(0, prev.length - 1) : currentWord.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typewriterIndex]);

  // Scroll to bottom in AI chat widget when messages change
  useEffect(() => {
    if (chatWidgetOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, chatWidgetOpen, isTyping]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Copy helpers
  const handleCopy = (text: string, type: 'email' | 'phone' | 'github') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    } else if (type === 'github') {
      setCopiedGithub(true);
      setTimeout(() => setCopiedGithub(false), 2200);
    }
  };

  // AI Chat simulation handler (Front-end only simulated agentic responses)
  /* =========================================================================
     TODO: CONNECT TO LIVE GEMINI / AI BACKEND (OPTIONAL)
     To connect this widget to a live LLM API (such as Gemini 2.5):
     Replace the simulated logic below with a fetch('/api/chat') call passing
     { prompt: userMessage }.
     ========================================================================= */
  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || chatInput.trim();
    if (!messageText) return;

    // Append user message
    const userMsg = {
      sender: 'user' as const,
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    // Simulate Agentic reasoning delay
    setTimeout(() => {
      const lower = messageText.toLowerCase();
      let foundResponse =
        'That sounds like a great project. Muhammad can architect a custom agentic pipeline or n8n workflow tailored specifically to your tools. You can reach out directly to him on WhatsApp at +92 370 6357435 to schedule a free 15-minute discovery call!';

      for (const item of SIMULATED_KNOWLEDGE_BASE) {
        if (item.keywords.some((kw) => lower.includes(kw))) {
          foundResponse = item.response;
          break;
        }
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: foundResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  // Filter projects based on active tab
  const filteredProjects =
    activeProjectFilter === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeProjectFilter);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      } relative overflow-x-hidden`}
    >
      {/* Background Ambient Glow & Geometric Balance Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute inset-0 opacity-[0.03] ${
            isDark ? 'geometric-grid-pattern' : 'geometric-grid-subtle'
          }`}
        />
        <div
          className={`absolute -top-40 left-1/4 w-[32rem] h-[32rem] rounded-full blur-[120px] opacity-20 transition-all duration-700 ${
            isDark ? 'bg-teal-500' : 'bg-teal-400'
          }`}
        />
        <div
          className={`absolute top-1/3 -right-20 w-[36rem] h-[36rem] rounded-full blur-[140px] opacity-15 transition-all duration-700 ${
            isDark ? 'bg-blue-600' : 'bg-blue-300'
          }`}
        />
        <div
          className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-[120px] opacity-15 transition-all duration-700 ${
            isDark ? 'bg-indigo-700' : 'bg-teal-300'
          }`}
        />
      </div>

      {/* =========================================================================
         SECTION 1: NAVBAR
         Logo, Nav links, Light/Dark toggle, "Hire Me" CTA, Sticky with blur
         ========================================================================= */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? isDark
              ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
              : 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-teal-500/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Muhammad Ahmad Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-400 via-blue-600 to-indigo-600 p-[1.5px] shadow-md shadow-teal-500/20 group-hover:shadow-teal-400/30 transition-all">
              <div
                className={`w-full h-full rounded-[14px] flex items-center justify-center font-bold text-sm tracking-wider ${
                  isDark ? 'bg-slate-950 text-white' : 'bg-white text-teal-600'
                }`}
              >
                MA
              </div>
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg sm:text-xl flex items-center gap-1.5 font-heading">
                Muhammad Ahmad
              </span>
              <span className="text-[11px] font-mono block tracking-wider uppercase opacity-85 text-teal-400 font-semibold">
                Agentic AI Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {[
              { label: 'About', target: 'about' },
              { label: 'Services', target: 'services' },
              { label: 'Skills', target: 'skills' },
              { label: 'Projects', target: 'projects' },
              { label: 'How I Work', target: 'process' },
              { label: 'Contact', target: 'contact' },
            ].map((item) => (
              <button
                key={item.target}
                id={`nav-link-${item.target}`}
                onClick={() => scrollToSection(item.target)}
                className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                  isDark
                    ? 'text-slate-300 hover:text-teal-300 hover:bg-slate-900/70'
                    : 'text-slate-600 hover:text-teal-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Area: GitHub, Theme Toggle & Hire Me CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* GitHub Profile Link */}
            <a
              id="navbar-github-btn"
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 rounded-2xl border transition-all duration-200 flex items-center gap-1.5 ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-teal-500/40 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
              aria-label="GitHub Profile (muhammadahmad5858)"
              title="GitHub: muhammadahmad5858"
            >
              <Github className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-mono font-medium">GitHub</span>
            </a>

            {/* Dark / Light Toggle Switch */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-2xl border transition-all duration-200 ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-teal-400 hover:bg-slate-800 hover:text-teal-300'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
              aria-label="Toggle light and dark theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-teal-600" />}
            </button>

            {/* "Hire Me" WhatsApp CTA Button */}
            <a
              id="navbar-hire-me-btn"
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 hover:from-teal-400 hover:to-blue-500 shadow-md shadow-teal-500/20 hover:shadow-teal-400/30 transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Menu & Theme Toggle for Small Screens */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-800 text-teal-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-800 text-teal-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-teal-600" />}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border ${
                isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-b px-4 py-4 ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex flex-col gap-2">
                {[
                  { label: 'About', target: 'about' },
                  { label: 'Services', target: 'services' },
                  { label: 'Skills', target: 'skills' },
                  { label: 'Projects', target: 'projects' },
                  { label: 'How I Work', target: 'process' },
                  { label: 'Contact', target: 'contact' },
                ].map((item) => (
                  <button
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                    className="text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-teal-500/10 hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-2 border-t border-slate-800/40 mt-1 flex flex-col gap-2">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold border ${
                      isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <Github className="w-4 h-4 text-teal-400" />
                    <span>GitHub: muhammadahmad5858</span>
                  </a>
                  <a
                    href={PROFILE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
         SECTION 2: HERO SECTION
         Full-height, Name & Title, Animated cycling subtitle, Tagline, CTAs, Avatar
         ========================================================================= */}
      <section
        id="hero"
        className="min-h-screen pt-28 pb-16 flex items-center justify-center relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-center lg:text-left space-y-6"
            >
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-sm backdrop-blur-md bg-teal-500/10 border-teal-500/30 text-teal-300">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                <span className="font-mono font-medium">Available for Freelance & Contract Projects</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    {PROFILE.name}
                  </span>
                </h1>

                {/* Animated Typing Subtitle */}
                <div className="flex items-center justify-center lg:justify-start gap-2 h-12">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-slate-400">
                    &gt;
                  </span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                    {displayedText}
                  </span>
                  <span className="w-0.5 h-7 bg-teal-400 animate-pulse" />
                </div>
              </div>

              {/* Tagline (placeholder, editable) */}
              <p
                className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {PROFILE.tagline}
              </p>

              {/* CTAs: WhatsApp, View My Work & GitHub */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  id="hero-whatsapp-cta"
                  href={PROFILE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 hover:from-teal-400 hover:to-blue-500 shadow-lg shadow-teal-500/20 hover:shadow-teal-400/30 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Hire Me on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 opacity-80" />
                </a>

                <button
                  id="hero-view-work-btn"
                  onClick={() => scrollToSection('projects')}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold border transition-all ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-teal-500/40 hover:bg-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-teal-500/40 shadow-sm'
                  }`}
                >
                  <Briefcase className="w-5 h-5 text-teal-400" />
                  <span>View My Work</span>
                  <ChevronRight className="w-4 h-4 opacity-75" />
                </button>

                <a
                  id="hero-github-btn"
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold border transition-all ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-teal-300 hover:border-teal-500/40 hover:bg-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-teal-700 hover:bg-slate-50 hover:border-teal-500/40 shadow-sm'
                  }`}
                  aria-label="GitHub Profile: muhammadahmad5858"
                >
                  <Github className="w-5 h-5 text-teal-400" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-4 h-4 opacity-75" />
                </a>
              </div>

              {/* Quick Trust / Tech Pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono">
                <span
                  className={`px-3 py-1.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  ⚡ n8n Pipelines
                </span>
                <span
                  className={`px-3 py-1.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  🤖 Multi-Agent LLMs
                </span>
                <span
                  className={`px-3 py-1.5 rounded-xl border ${
                    isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  🔗 REST Webhooks
                </span>
              </div>
            </motion.div>

            {/* Right Graphic / Circular Profile Photo Spot */}
            {/* ================================================================
                TODO: REPLACE AVATAR / PROFILE PHOTO SPOT
                To replace this stylized avatar with your real headshot photo:
                Replace the inner SVG avatar div with an <img src="/your-photo.jpg" ... /> tag!
                ================================================================ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Glowing Outer Rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 via-blue-600 to-indigo-600 opacity-25 blur-xl animate-pulse" />
                <div className="absolute -inset-2 rounded-full border border-teal-500/30 border-dashed animate-[spin_40s_linear_infinite]" />

                {/* Glassmorphic Container for Profile Picture */}
                <div
                  className={`relative w-full h-full rounded-full p-2.5 backdrop-blur-xl border shadow-2xl flex items-center justify-center ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-800 shadow-black/60'
                      : 'bg-white/90 border-slate-200 shadow-teal-500/10'
                  }`}
                >
                  {/* Stylized Modern Avatar Placeholder */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center relative overflow-hidden border border-teal-500/20">
                    {/* Circuit Background Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Agent Graphic Icon */}
                    <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-tr from-teal-400 to-blue-600 p-[1.5px] shadow-lg shadow-teal-500/20 mb-2">
                      <div className="w-full h-full rounded-[15px] bg-slate-950 flex items-center justify-center">
                        <Bot className="w-12 h-12 text-teal-400" />
                      </div>
                    </div>

                    <span className="relative z-10 font-heading font-bold text-white text-base">
                      {PROFILE.name}
                    </span>
                    <span className="relative z-10 text-xs text-teal-400 font-mono">
                      Agentic AI Engineer
                    </span>

                    {/* Placeholder replacement notice badge */}
                    <div className="absolute bottom-2 px-3 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[10px] text-slate-400 font-mono tracking-tight">
                      Photo Placeholder
                    </div>
                  </div>
                </div>

                {/* Floating Micro-Badge 1: n8n Specialist */}
                <div
                  className={`absolute -top-2 -right-2 px-3.5 py-2 rounded-2xl border backdrop-blur-md shadow-lg flex items-center gap-1.5 text-xs font-semibold ${
                    isDark
                      ? 'bg-slate-900/95 border-slate-800 text-teal-300 shadow-black/40'
                      : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200'
                  }`}
                >
                  <Workflow className="w-4 h-4 text-teal-400" />
                  <span>n8n Certified Flow</span>
                </div>

                {/* Floating Micro-Badge 2: Autonomous Agents */}
                <div
                  className={`absolute -bottom-2 -left-2 px-3.5 py-2 rounded-2xl border backdrop-blur-md shadow-lg flex items-center gap-1.5 text-xs font-semibold ${
                    isDark
                      ? 'bg-slate-900/95 border-slate-800 text-teal-300 shadow-black/40'
                      : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span>Autonomous Logic</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 3: ABOUT ME
         Bio placeholder text, 4 quick highlights in glassmorphism mini-cards
         ========================================================================= */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-teal-400 font-semibold">
              // Discover My Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
              Engineering Intelligent Systems That Run 24/7
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          {/* Bio Text Card */}
          <div
            className={`max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl border backdrop-blur-xl mb-12 shadow-lg transition-all ${
              isDark ? 'glass-panel-dark' : 'glass-panel-light'
            }`}
          >
            {/* Bio Content - Editable Placeholder */}
            <p
              className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {PROFILE.bio}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-700/40 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Available for worldwide remote contracts
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                Rapid prototyping & agile milestone turnarounds
              </span>
            </div>
          </div>

          {/* 4 Quick Stats / Highlights Mini-Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-7 rounded-3xl border backdrop-blur-xl glow-hover flex flex-col justify-between ${
                    isDark ? 'glass-panel-dark' : 'glass-panel-light'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 4: SERVICES
         Glassmorphism cards, one per service, hover effect (lift + glow border)
         ========================================================================= */}
      <section id="services" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-teal-400 font-semibold">
              // Tailored Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
              Autonomous Systems & Integration Services
            </h2>
            <p
              className={`text-base mt-4 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Every business has unique operational flows. Here is how I help you automate them.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          {/* Services Grid (4 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES_DATA.map((service, index) => {
              const IconComp = service.icon;
              return (
                <div
                  key={index}
                  id={`service-card-${index}`}
                  className={`p-8 sm:p-9 rounded-3xl border backdrop-blur-xl glow-hover flex flex-col justify-between relative overflow-hidden group ${
                    isDark ? 'glass-panel-dark' : 'glass-panel-light'
                  }`}
                >
                  {/* Subtle Accent Glow on Hover */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all pointer-events-none" />

                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-blue-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-md">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border bg-teal-500/10 border-teal-500/30 text-teal-300">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-bold font-heading mb-3">
                      {service.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-base leading-relaxed mb-6 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {service.description}
                    </p>

                    {/* Key Features List */}
                    <div className="space-y-2.5 mb-8">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                          <span className={isDark ? 'text-slate-400' : 'text-slate-700'}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Quick Inquire Link */}
                  <div className="pt-4 border-t border-slate-700/30 flex items-center justify-between">
                    <a
                      href={`${PROFILE.whatsappUrl}?text=Hi%20Muhammad,%20I'm%20interested%20in%20your%20${encodeURIComponent(
                        service.title
                      )}%20service.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-400 hover:text-teal-300 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Inquire on WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 5: SKILLS
         Categorized groups with icons (NOT progress bars), glass chips
         ========================================================================= */}
      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-teal-400 font-semibold">
              // Technical Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
              Skills, Frameworks & Tech Stack
            </h2>
            <p
              className={`text-base mt-4 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Practical tools and frameworks leveraged to build resilient automations and autonomous workflows.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl ${
                    isDark ? 'glass-panel-dark' : 'glass-panel-light'
                  }`}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold font-heading">{cat.category}</h3>
                  </div>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 flex items-center gap-2 ${
                          skill.highlight
                            ? 'bg-teal-500/15 border-teal-500/40 text-teal-300 font-semibold shadow-sm'
                            : isDark
                            ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-teal-500/30'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-teal-500/30 shadow-sm'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span>{skill.name}</span>
                        {skill.note && (
                          <span className="text-[10px] opacity-60 font-mono">({skill.note})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 6: FEATURED PROJECTS
         Filter bar (All, AI Agents, Automation, API/Backend)
         4 Placeholder project cards clearly marked for Muhammad to replace
         ========================================================================= */}
      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest uppercase text-teal-400 font-semibold">
              // Portfolio Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
              Featured Work & Projects
            </h2>
            <p
              className={`text-base mt-4 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              A selection of automated pipelines, intelligent agents, and backend integrations.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {(['All', 'AI Agents', 'Automation', 'API/Backend'] as const).map((tab) => (
              <button
                key={tab}
                id={`project-filter-${tab.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setActiveProjectFilter(tab)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeProjectFilter === tab
                    ? 'bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-teal-500/20'
                    : isDark
                    ? 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* GitHub Repositories Banner */}
          <div
            className={`mb-8 p-4 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto ${
              isDark ? 'bg-teal-500/5 border-teal-500/30' : 'bg-teal-50/60 border-teal-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-semibold">Explore My Code & Open-Source Projects</p>
                <p className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Follow my agent architectures and workflows on GitHub:{' '}
                  <span className="text-teal-400 font-semibold">@{PROFILE.githubUsername}</span>
                </p>
              </div>
            </div>
            <a
              id="projects-github-cta"
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-teal-500/40 text-teal-300 hover:text-teal-200 text-xs font-mono font-semibold transition-all shrink-0 shadow-sm"
            >
              <span>View GitHub Repos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Notice to Muhammad about Placeholders */}
          <div className="mb-8 p-3.5 rounded-2xl border border-dashed border-teal-500/40 bg-teal-500/5 text-center text-xs font-mono text-teal-300 max-w-2xl mx-auto">
            ⚡ Note for Muhammad: These 4 cards are placeholder projects ready to be customized with your specific repository URLs or client case studies.
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-3xl border backdrop-blur-xl glow-hover overflow-hidden flex flex-col justify-between ${
                    isDark ? 'glass-panel-dark' : 'glass-panel-light'
                  }`}
                >
                  {/* Placeholder Graphic / Image Area */}
                  <div
                    className={`h-48 w-full relative overflow-hidden flex items-center justify-center border-b ${
                      isDark
                        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-slate-800'
                        : 'bg-gradient-to-br from-slate-100 via-teal-50/50 to-slate-100 border-slate-200'
                    }`}
                  >
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px]" />

                    {/* Central Representative Graphic */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-blue-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-md">
                        {project.category === 'AI Agents' ? (
                          <Bot className="w-7 h-7" />
                        ) : project.category === 'Automation' ? (
                          <Workflow className="w-7 h-7" />
                        ) : (
                          <Network className="w-7 h-7" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        {project.category} Project
                      </span>
                    </div>

                    {/* Category Tag pill */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium border bg-teal-500/15 border-teal-500/30 text-teal-300 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-heading mb-2">
                        {project.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed mb-4 ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {project.description}
                      </p>

                      <p
                        className={`text-xs font-mono mb-6 italic ${
                          isDark ? 'text-teal-400/90' : 'text-teal-700'
                        }`}
                      >
                        Key Impact: {project.details}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-3 py-1 rounded-xl text-xs font-mono border ${
                              isDark
                                ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Details / GitHub Action Link */}
                    <div className="pt-4 border-t border-slate-700/30 flex items-center justify-between">
                      <a
                        href={project.link === '#' ? PROFILE.githubUrl : project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>{project.link === '#' ? 'View on GitHub' : 'View Details'}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                      </a>
                      <span className="text-[10px] font-mono text-slate-500">
                        {project.link === '#' ? 'Open Source' : 'Case Study'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 7: HOW I WORK (PROCESS TIMELINE)
         4 Steps: Discovery Call -> Plan & Propose -> Build & Automate -> Deliver & Support
         ========================================================================= */}
      <section id="process" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-teal-400 font-semibold">
              // Step-by-Step Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
              How I Work With Clients
            </h2>
            <p
              className={`text-base mt-4 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              A transparent, structured process designed to build production-ready automations fast.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {WORK_PROCESS_STEPS.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl glow-hover relative flex flex-col justify-between ${
                    isDark ? 'glass-panel-dark' : 'glass-panel-light'
                  }`}
                >
                  <div>
                    {/* Top Row: Step Number + Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-black font-mono bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-heading mb-3">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Connected arrow for desktop except last step */}
                  {index < WORK_PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 9: TESTIMONIALS (PLACEHOLDER)
         2-3 glassmorphism testimonial cards clearly marked as placeholder content
         ========================================================================= */}
      <section id="testimonials" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-teal-400 font-semibold">
              // Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mt-2">
              What Clients Say
            </h2>
            <p
              className={`text-base mt-4 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Placeholder client testimonials ready to be updated with real reviews.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl glow-hover flex flex-col justify-between relative ${
                  isDark ? 'glass-panel-dark' : 'glass-panel-light'
                }`}
              >
                <div>
                  {/* Quote Icon */}
                  <div className="text-3xl font-serif text-teal-400 mb-4 opacity-75">“</div>
                  <p
                    className={`text-sm sm:text-base leading-relaxed italic mb-6 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-400 to-blue-600 flex items-center justify-center font-bold text-sm text-slate-950">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm">{t.clientName}</h4>
                    <p className="text-xs font-mono text-teal-400">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 10: CONTACT & FOOTER
         "Let's Automate Something Great Together", Email + WhatsApp buttons, Socials
         ========================================================================= */}
      <section id="contact" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`p-8 sm:p-12 lg:p-16 rounded-3xl border backdrop-blur-2xl shadow-2xl relative overflow-hidden ${
              isDark ? 'glass-panel-dark' : 'glass-panel-light'
            }`}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Heading & Contact Buttons */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono tracking-widest uppercase text-teal-400 font-semibold">
                  // Get In Touch
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading leading-tight">
                  Let's Automate Something Great Together
                </h2>
                <p
                  className={`text-base sm:text-lg leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  Have a specific workflow bottleneck or looking to deploy an autonomous AI agent for your business? Send a message to get started right away.
                </p>

                {/* Primary Direct CTAs */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    id="contact-whatsapp-btn"
                    href={PROFILE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 hover:from-teal-400 hover:to-blue-500 shadow-lg shadow-teal-500/20 transition-all transform hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>WhatsApp Me</span>
                    <ArrowUpRight className="w-4 h-4 opacity-80" />
                  </a>

                  <a
                    id="contact-email-btn"
                    href={`mailto:${PROFILE.email}`}
                    className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold border transition-all ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-teal-500/40 hover:bg-slate-900'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-teal-500/40 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <Mail className="w-5 h-5 text-teal-400" />
                    <span>Email Me</span>
                  </a>
                </div>

                {/* Direct Copy Fields */}
                <div className="space-y-2 pt-4">
                  {/* Email row with copy button */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-mono ${
                      isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                      <span className="truncate">{PROFILE.email}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(PROFILE.email, 'email')}
                      className="ml-2 px-3 py-1 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 flex items-center gap-1 transition-colors shrink-0"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Phone / WhatsApp row with copy button */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-mono ${
                      isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                      <span className="truncate">{PROFILE.whatsappNumber}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(PROFILE.whatsappNumber, 'phone')}
                      className="ml-2 px-3 py-1 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 flex items-center gap-1 transition-colors shrink-0"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* GitHub row with visit and copy buttons */}
                  <div
                    className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-mono ${
                      isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Github className="w-4 h-4 text-teal-400 shrink-0" />
                      <span className="truncate">github.com/{PROFILE.githubUsername}</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2 shrink-0">
                      <a
                        href={PROFILE.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 flex items-center gap-1 transition-colors"
                        title="Visit GitHub profile"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit</span>
                      </a>
                      <button
                        onClick={() => handleCopy(PROFILE.githubUrl, 'github')}
                        className="px-2.5 py-1 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 flex items-center gap-1 transition-colors"
                        title="Copy GitHub URL"
                      >
                        {copiedGithub ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedGithub ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Interactive Inquiry Builder */}
              <div className="lg:col-span-6">
                <div
                  className={`p-6 sm:p-8 rounded-3xl border ${
                    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                  }`}
                >
                  <h3 className="font-heading font-bold text-xl mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                    <span>Quick Project Inquiry</span>
                  </h3>
                  <p
                    className={`text-xs sm:text-sm mb-6 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Select your project type and open a prefilled chat directly on WhatsApp or Email:
                  </p>

                  <div className="space-y-4">
                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                        I NEED HELP WITH:
                      </label>
                      <select
                        value={contactFormService}
                        onChange={(e) => setContactFormService(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm focus:outline-none focus:border-teal-400 ${
                          isDark ? 'bg-slate-950/80 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="Agentic AI Development">Agentic AI Development</option>
                        <option value="n8n Workflow Automation">n8n Workflow Automation</option>
                        <option value="API Development & Integration">API Development & Integration</option>
                        <option value="Database Design & Management">Database Design & Management</option>
                        <option value="Full Architecture Discovery Call">Full Architecture Discovery Call</option>
                      </select>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                        YOUR NAME / COMPANY:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alex from Acme Corp"
                        value={contactFormName}
                        onChange={(e) => setContactFormName(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm focus:outline-none focus:border-teal-400 ${
                          isDark ? 'bg-slate-950/80 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    {/* Message Brief */}
                    <div>
                      <label className="block text-xs font-mono font-medium mb-1.5 opacity-80">
                        BRIEF PROJECT OVERVIEW:
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Looking to automate lead processing with an n8n workflow and an AI agent..."
                        value={contactFormDetails}
                        onChange={(e) => setContactFormDetails(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm focus:outline-none focus:border-teal-400 ${
                          isDark ? 'bg-slate-950/80 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    {/* Action buttons to trigger WhatsApp or Mailto */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`${PROFILE.whatsappUrl}?text=${encodeURIComponent(
                          `Hi Muhammad, my name is ${contactFormName || 'Client'}. I'm reaching out regarding ${contactFormService}. ${
                            contactFormDetails ? `Overview: ${contactFormDetails}` : ''
                          }`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 rounded-2xl font-semibold text-xs sm:text-sm text-center text-white bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 hover:from-teal-400 hover:to-blue-500 shadow-md shadow-teal-500/20 flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </a>

                      <a
                        href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
                          `Inquiry: ${contactFormService} from ${contactFormName || 'Client'}`
                        )}&body=${encodeURIComponent(
                          `Hi Muhammad,\n\nName: ${contactFormName || 'Client'}\nService Needed: ${contactFormService}\n\nProject Details:\n${contactFormDetails || 'Looking to discuss an automation project.'}`
                        )}`}
                        className={`flex-1 py-3 px-4 rounded-2xl font-semibold text-xs sm:text-sm text-center border flex items-center justify-center gap-2 ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-teal-500/40' : 'bg-slate-100 border-slate-300 text-slate-800'
                        }`}
                      >
                        <Mail className="w-4 h-4 text-teal-400" />
                        <span>Send via Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Footer Bar */}
            <div className="mt-16 pt-8 border-t border-slate-700/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              {/* Copyright */}
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                © {new Date().getFullYear()} {PROFILE.name}. All rights reserved. Agentic AI & Automation Specialist.
              </p>

              {/* Social Placeholders */}
              {/* ================================================================
                  TODO: REPLACE SOCIAL LINKS
                  Replace href="#" with your actual LinkedIn, GitHub, Upwork, Fiverr URLs.
                  ================================================================ */}
              <div className="flex items-center gap-3">
                {/* LinkedIn */}
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-2xl border transition-colors ${
                    isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-teal-400 hover:border-teal-500/40' : 'bg-white border-slate-200 text-slate-700 hover:text-teal-600'
                  }`}
                  aria-label="LinkedIn profile placeholder"
                  title="LinkedIn (TODO: Add link in App.tsx)"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                {/* GitHub */}
                <a
                  id="footer-github-btn"
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-2xl border transition-colors flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-teal-400 hover:border-teal-500/40'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-teal-600'
                  }`}
                  aria-label="GitHub profile: muhammadahmad5858"
                  title="GitHub: https://github.com/muhammadahmad5858"
                >
                  <Github className="w-4 h-4" />
                  <span className="font-mono text-[11px] hidden sm:inline">github.com/{PROFILE.githubUsername}</span>
                </a>

                {/* Upwork Placeholder Badge */}
                <a
                  href={PROFILE.socials.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-2xl border text-[11px] font-mono font-medium transition-colors ${
                    isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-teal-400 hover:border-teal-500/40' : 'bg-white border-slate-200 text-slate-700 hover:text-teal-600'
                  }`}
                  title="Upwork (TODO: Add link in App.tsx)"
                >
                  Upwork
                </a>

                {/* Fiverr Placeholder Badge */}
                <a
                  href={PROFILE.socials.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 rounded-2xl border text-[11px] font-mono font-medium transition-colors ${
                    isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-teal-400 hover:border-teal-500/40' : 'bg-white border-slate-200 text-slate-700 hover:text-teal-600'
                  }`}
                  title="Fiverr (TODO: Add link in App.tsx)"
                >
                  Fiverr
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 8: LIVE AI DEMO WIDGET (FLOATING CHAT BUBBLE)
         Bottom-right corner floating chat bubble labeled "Try my AI Assistant"
         Simulated agentic responses via hardcoded pattern function, with comments
         where Muhammad can plug in live Gemini API later!
         ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatWidgetOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`w-[90vw] sm:w-96 h-[32rem] rounded-3xl border shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden mb-3 ${
                isDark
                  ? 'bg-slate-950/95 border-slate-800 shadow-black/60 text-slate-100'
                  : 'bg-white/95 border-slate-200 shadow-teal-500/10 text-slate-900'
              }`}
            >
              {/* Chat Header */}
              <div
                className={`p-4 border-b flex items-center justify-between ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100/90 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-sm font-bold">
                    <Bot className="w-4 h-4 text-slate-950" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm leading-none flex items-center gap-1.5">
                      Muhammad's AI Assistant
                    </h4>
                    <span className="text-[10px] font-mono text-teal-400 flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                      Simulated Agent Demo
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setChatWidgetOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-700/30 transition-colors opacity-70 hover:opacity-100"
                  aria-label="Close chat assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
                {chatMessages.map((msg, mIdx) => (
                  <div
                    key={mIdx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-br-none shadow-sm'
                          : isDark
                          ? 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none'
                          : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs p-2">
                    <Bot className="w-3.5 h-3.5 text-teal-400 animate-spin" />
                    <span>AI Assistant is analyzing...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Prompt Suggestion Chips */}
              <div
                className={`p-2 border-t overflow-x-auto whitespace-nowrap flex gap-1.5 text-[11px] font-mono ${
                  isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}
              >
                {[
                  'What services do you offer?',
                  'Can you build n8n workflows?',
                  'What is your GitHub?',
                  'How can I hire Muhammad?',
                ].map((chip, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => handleSendMessage(chip)}
                    className="px-3 py-1 rounded-full border border-teal-500/30 hover:border-teal-400 bg-teal-500/5 hover:bg-teal-500/10 text-teal-300 shrink-0 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div
                className={`p-3 border-t flex items-center gap-2 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <input
                  type="text"
                  placeholder="Ask about my AI skills, n8n, pricing..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  className={`flex-1 px-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:border-teal-400 ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-400 hover:to-blue-500 shadow-sm transition-all"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        <button
          id="floating-ai-assistant-btn"
          onClick={() => setChatWidgetOpen(!chatWidgetOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-teal-500/25 hover:shadow-teal-400/35 transform hover:-translate-y-1 transition-all border border-teal-400/30"
          aria-label="Open AI Assistant Demo"
        >
          <Sparkles className="w-4 h-4" />
          <span>Try my AI Assistant</span>
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
        </button>
      </div>
    </div>
  );
}
