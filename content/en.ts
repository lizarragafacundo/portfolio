import type { Content } from './types'

export const en = {
  meta: {
    title: 'Facundo Lizarraga — Senior Full-Stack Engineer',
    description:
      'Senior full-stack engineer in Buenos Aires. Five years of production TypeScript and Node.js on AWS serverless, technical lead of a multi-tenant SaaS, and a portfolio of shipped AI products.',
  },

  nav: {
    about: 'about',
    skills: 'skills',
    experience: 'experience',
    projects: 'projects',
    education: 'studies',
    contact: 'contact',
    resume: 'download CV',
  },

  hero: {
    role: 'Senior Full-Stack Engineer',
    location: 'Buenos Aires, Argentina · Remote',
    stack: 'TypeScript · Node.js · AWS · Next.js · Python · AI / LLM',
  },

  character: {
    whoami: ['facundo lizarraga', 'senior full-stack', 'buenos aires · remote'],
  },

  about:
    "Full-stack engineer with five years building and running production TypeScript and Node.js systems on AWS serverless. I grew into the technical lead of a multi-tenant, white-label music-distribution SaaS used by around 5,000 people, and I've shipped a portfolio of AI products: LLM scoring pipelines, autonomous agents, and browser computer vision. I'm comfortable owning a system end to end, from MongoDB schema to Next.js UI to deploy.",

  skills: [
    { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Bash', 'SQL', 'R'] },
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'TanStack Query', 'Tailwind CSS', 'Radix UI'],
    },
    { label: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'REST', 'WebSockets'] },
    {
      label: 'Cloud & Serverless',
      items: [
        'AWS Lambda',
        'Step Functions',
        'SQS',
        'S3',
        'API Gateway',
        'EventBridge',
        'Serverless',
        'Vercel',
        'Azure',
      ],
    },
    { label: 'Databases', items: ['MongoDB', 'Mongoose', 'Prisma', 'Qdrant', 'PostgreSQL'] },
    {
      label: 'DevOps & IaC',
      items: ['Docker', 'Terraform', 'Coder', 'GitHub Actions', 'Cloudflare', 'nginx', 'Linux'],
    },
    {
      label: 'AI & LLM',
      items: [
        'Ollama',
        'OpenWebUI',
        'OpenAI API',
        'Anthropic Claude',
        'RAG',
        'autonomous agents',
        'prompt eng.',
      ],
    },
    {
      label: 'Data & ML',
      items: ['pandas', 'numpy', 'PowerBI', 'TensorFlow', 'Keras', 'scikit-learn'],
    },
    {
      label: 'Integrations & Payments',
      items: ['Stripe', 'Airwallex', 'OAuth / JWT', 'Google APIs', 'Mailjet', 'webhooks'],
    },
    { label: 'Testing', items: ['Jest', 'Vitest', 'pytest', 'ESLint / Prettier'] },
  ],

  experience: [
    {
      company: 'Zil Global',
      role: 'Full Stack Developer',
      meta: 'Mar 2022 – Present · Remote (contractor)',
      sub: 'Multi-tenant, white-label music-distribution & royalties SaaS',
      stats: [
        { value: '~5,000', label: 'users on the white-label SaaS I tech-lead' },
        {
          value: '4-5h → ~5min',
          label: 'core settlement job after my Step Functions rebuild',
        },
        { value: '3+', label: 'end-to-end AI / LLM products shipped' },
      ],
      bullets: [
        'Core engineer on a multi-tenant, white-label platform used by ~5,000 record labels, artists and operators. Grew into the technical lead, owning the full TypeScript and Node.js codebase on AWS serverless as the team rotated through ~8 people.',
        'Designed and built a digital-wallet and revenue-distribution system end to end: accountabilities, transactions and revenue with Stripe payments gated behind human approval, covering two account models under one schema, backed by financial-grade automated test coverage.',
        'Implemented AWS Step Functions from scratch to resolve platform-wide processing bottlenecks, redesigning a core settlement job from 4-5 hours to about 5 minutes using MongoDB transactions for atomic, reliable updates.',
        'Built the Stripe subscriptions system with front- and back-end validation, moving the product from manually managed access to self-service paid signup.',
        'Architected core multi-tenant, white-label features (branding, custom domains, mailing, user management), giving the business a repeatable way to onboard new customer instances.',
        'Built the mailing system and an audit-logging subsystem from scratch, giving operators a reliable change history that settled disputes over who changed what.',
        'Automated deploys with GitHub Actions across dev, staging and production, and directly guided 3 engineers (backend, frontend, operations), reviewing their pull requests.',
      ],
      tags: ['TypeScript', 'Node.js', 'AWS', 'MongoDB', 'Stripe', 'Next.js'],
    },
    {
      company: 'The Coca-Cola Company',
      role: 'Planning & Logistics Intern',
      meta: 'Jul 2021 – Jan 2022 · Buenos Aires',
      bullets: [
        'Built Python automations (pandas, numpy, openpyxl) that replaced manual Excel- and SAP-based workflows across several areas of the company.',
        'Added dashboards and file-upload tooling and automated reporting tasks, working with PowerBI and Docker.',
      ],
      tags: ['Python', 'pandas', 'PowerBI', 'Docker'],
    },
  ],

  posture: {
    name: 'Posture',
    kind: 'AI posture-coaching product · solo',
    description:
      'A webcam posture coach. Real-time browser pose detection feeds a geometric feature extractor, scored by nearest-neighbor search over a vector database plus locally trained neural networks. It includes a continuous-improvement pipeline that grows and refines its training data. Shipped as a multi-tenant SaaS with integrated Stripe billing.',
    stack: ['Next.js', 'FastAPI', 'TensorFlow.js', 'Qdrant', 'Keras', 'Stripe', 'Docker'],
  },

  marktboost: {
    name: 'Marktboost',
    kind: 'IG lead-gen + AI scoring · 2-person team',
    description:
      'I built the AI lead-scoring subsystem: a self-hosted Ollama scorer that ranks candidate profiles against configurable business verticals, a durable priority queue with subscription-tier fairness, and hard-gate filtering on the model output. It runs on an AWS Step Functions / Lambda / EventBridge pipeline, alongside a Python FastAPI automation service with per-account rate limiting and abuse detection.',
    stack: ['FastAPI', 'Ollama', 'AWS Lambda', 'Step Functions', 'MongoDB', 'Next.js'],
  },

  characterPackage: {
    name: '@facundolizarraga/portfolio-characters',
    kind: 'open-source npm package · solo',
    description:
      'The character on this page, extracted into a React library anyone can install. Every part is data rather than markup — 12 skin tones, 13 hairstyles, 12 eye styles, 6 mouths, 5 beards, 6 glasses and 14 presets — so adding artwork never means touching a component. It ships a character builder, server-renders in full, and honours reduced-motion.',
    stack: ['React', 'TypeScript', 'SVG', 'tsup', 'Vitest', 'npm'],
    install: 'npm i @facundolizarraga/portfolio-characters',
    repoUrl: 'https://github.com/lizarragafacundo/portfolio-characters',
    builderLabel: 'Open the builder',
    randomLabel: 'Random',
    resetLabel: 'Reset to me',
    demoCaption: 'Changes this portrait and the character following you down the page.',
  },

  smallProjects: [
    {
      title: 'Coder Internal Developer Platform',
      tag: 'self-built',
      about:
        'A Terraform-based internal developer platform on Coder and Docker that provisions multi-stack dev environments from a web form through an ordered pipeline, with a cost-aware AI routing layer and an overnight agent team that lands work as human-reviewed PRs.',
      stack: 'Terraform · Coder · Docker · Ollama',
    },
    {
      title: 'Artist Lead-Discovery Platform',
      tag: 'freelance → internal',
      about:
        'A Spotify and social-media scraping and lead-scoring platform (Playwright / Puppeteer with stealth, custom circuit breakers, detailed export for the operations team), plus an autonomous LLM ops-agent with a deterministic guardrail that verifies the model against precomputed facts.',
      stack: 'Playwright · Puppeteer · Next.js · Ollama',
    },
  ],

  education: [
    {
      school: 'Universidad Católica Argentina',
      degree: 'Industrial Engineering — coursework toward degree',
      meta: '2016–2022',
      description:
        'Statistics, optimization and operations research before moving into software full time.',
    },
    {
      school: 'Universidad de Palermo',
      degree: 'Informatics Engineering',
      meta: '2022–2023',
      description: 'Completed one year and a half of coursework.',
    },
    {
      school: 'Universidad Católica Argentina',
      degree: 'Teaching Assistant — Advanced Statistics',
      meta: '2021–2022',
      description: 'Supported practical sessions for students during the pandemic.',
    },
  ],

  certificationsLabel: 'Certifications & Languages',
  certifications: [
    'Cambridge English: First (FCE)',
    'Cambridge IGCSE',
    'Spanish — native',
    'English — advanced',
  ],

  contactMessage:
    "Let's build something. I'm open to senior full-stack and AI-engineering roles, remote.",
  builtWith: 'built with care, in a terminal',

  a11y: {
    skipToContent: 'Skip to content',
    languageSwitch: 'Change language',
    primaryNav: 'Sections',
  },
} satisfies Content
