import type { Content } from './types'

export const es = {
  meta: {
    title: 'Facundo Lizarraga — Ingeniero Full-Stack Senior',
    description:
      'Ingeniero full-stack senior en Buenos Aires. Cinco años de TypeScript y Node.js en producción sobre AWS serverless, líder técnico de un SaaS multi-tenant y un portfolio de productos de IA lanzados.',
  },

  nav: {
    about: 'sobre-mí',
    skills: 'skills',
    experience: 'experiencia',
    projects: 'proyectos',
    education: 'estudios',
    contact: 'contacto',
    resume: 'descargar CV',
  },

  hero: {
    role: 'Ingeniero Full-Stack Senior',
    location: 'Buenos Aires, Argentina · Remoto',
    stack: 'TypeScript · Node.js · AWS · Next.js · Python · IA / LLM',
  },

  character: {
    whoami: ['facundo lizarraga', 'ingeniero full-stack', 'senior · buenos aires'],
  },

  about:
    'Ingeniero full-stack con cinco años construyendo y operando sistemas de producción en TypeScript y Node.js sobre AWS serverless. Crecí hasta liderar técnicamente un SaaS multi-tenant y white-label de distribución musical usado por alrededor de 5.000 usuarios, y lancé un portfolio de productos de IA: pipelines de scoring con LLM, agentes autónomos y visión por computadora en el navegador. Cómodo tomando un sistema de punta a punta, del esquema en MongoDB a la UI en Next.js y el deploy.',

  skills: [
    { label: 'Lenguajes', items: ['TypeScript', 'JavaScript', 'Python', 'Bash', 'SQL', 'R'] },
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
    { label: 'Bases de datos', items: ['MongoDB', 'Mongoose', 'Prisma', 'Qdrant', 'PostgreSQL'] },
    {
      label: 'DevOps & IaC',
      items: ['Docker', 'Terraform', 'Coder', 'GitHub Actions', 'Cloudflare', 'nginx', 'Linux'],
    },
    {
      label: 'IA & LLM',
      items: [
        'Ollama',
        'OpenWebUI',
        'OpenAI API',
        'Anthropic Claude',
        'RAG',
        'agentes autónomos',
        'prompt eng.',
      ],
    },
    {
      label: 'Datos & ML',
      items: ['pandas', 'numpy', 'PowerBI', 'TensorFlow', 'Keras', 'scikit-learn'],
    },
    {
      label: 'Integraciones & Pagos',
      items: ['Stripe', 'Airwallex', 'OAuth / JWT', 'Google APIs', 'Mailjet', 'webhooks'],
    },
    { label: 'Testing', items: ['Jest', 'Vitest', 'pytest', 'ESLint / Prettier'] },
  ],

  experience: [
    {
      company: 'Zil Global',
      role: 'Full Stack Developer',
      meta: 'Mar 2022 – Actualidad · Remoto (contractor)',
      sub: 'SaaS multi-tenant y white-label de distribución musical y regalías',
      stats: [
        { value: '~5.000', label: 'usuarios en el SaaS white-label que lidero técnicamente' },
        {
          value: '4-5h → ~5min',
          label: 'proceso clave de liquidación tras mi rediseño con Step Functions',
        },
        { value: '3+', label: 'productos de IA / LLM lanzados de punta a punta' },
      ],
      bullets: [
        'Ingeniero central de una plataforma multi-tenant y white-label usada por ~5.000 sellos, artistas y operadores. Crecí hasta liderar técnicamente, a cargo de todo el código TypeScript y Node.js sobre AWS serverless mientras el equipo rotaba unas 8 personas.',
        'Diseñé y construí de punta a punta un sistema de billetera digital y distribución de ingresos: rendiciones, transacciones y revenue con pagos por Stripe sujetos a aprobación humana, cubriendo dos modelos de cuenta bajo un mismo esquema, con cobertura de tests apta para un sistema financiero.',
        'Implementé AWS Step Functions desde cero para resolver cuellos de botella en toda la plataforma, rediseñando un proceso clave de liquidación de 4-5 horas a unos 5 minutos usando transacciones de MongoDB para garantizar actualizaciones atómicas y confiables.',
        'Construí el sistema de suscripciones sobre Stripe con validación en front y back, llevando el producto de un acceso gestionado manualmente a un alta paga self-service.',
        'Diseñé las funcionalidades centrales multi-tenant y white-label (marca, dominios propios, mailing, gestión de usuarios), dándole al negocio una forma repetible de sumar nuevas instancias de cliente.',
        'Construí el sistema de mailing y un subsistema de audit-logging desde cero, dando a los operadores un historial de cambios confiable que resolvió disputas sobre quién cambió qué.',
        'Automaticé los deploys con GitHub Actions entre dev, staging y producción, y guié directamente a 3 ingenieros (backend, frontend y operaciones), revisando sus pull requests.',
      ],
      tags: ['TypeScript', 'Node.js', 'AWS', 'MongoDB', 'Stripe', 'Next.js'],
    },
    {
      company: 'The Coca-Cola Company',
      role: 'Pasante de Planeamiento y Logística',
      meta: 'Jul 2021 – Ene 2022 · Buenos Aires',
      bullets: [
        'Construí automatizaciones en Python (pandas, numpy, openpyxl) que reemplazaron flujos manuales de Excel y SAP en varios sectores de la empresa.',
        'Sumé dashboards y herramientas de carga de archivos, y automaticé tareas de reporting, trabajando con PowerBI y Docker.',
      ],
      tags: ['Python', 'pandas', 'PowerBI', 'Docker'],
    },
  ],

  posture: {
    name: 'Posture',
    kind: 'producto de coaching postural con IA · en solitario',
    description:
      'Un coach de postura por webcam. La detección de pose en tiempo real en el navegador alimenta un extractor de características geométricas, con scoring mediante búsqueda de vecinos más cercanos sobre una base de datos vectorial y modelos neuronales entrenados localmente. Incluye un pipeline de mejora continua para ampliar y refinar los datos de entrenamiento. Lanzado como SaaS multi-tenant con facturación integrada mediante Stripe.',
    stack: ['Next.js', 'FastAPI', 'TensorFlow.js', 'Qdrant', 'Keras', 'Stripe', 'Docker'],
  },

  marktboost: {
    name: 'Marktboost',
    kind: 'lead-gen en IG + scoring por IA · equipo de dos',
    description:
      'Construí el subsistema de scoring de leads con IA: un scorer sobre Ollama self-hosted que rankea perfiles candidatos contra verticales de negocio configurables, una cola de prioridad durable con equidad por tier de suscripción, y filtrado de corte duro sobre la salida del modelo. Corre sobre un pipeline de AWS Step Functions / Lambda / EventBridge, junto a un microservicio de automatización en Python FastAPI con rate limiting por cuenta y detección de abuso.',
    stack: ['FastAPI', 'Ollama', 'AWS Lambda', 'Step Functions', 'MongoDB', 'Next.js'],
  },

  characterPackage: {
    name: '@facundolizarraga/portfolio-characters',
    kind: 'paquete npm open-source · en solitario',
    description:
      'El personaje de esta página, extraído como una librería de React que cualquiera puede instalar. Cada parte es data en vez de markup — 12 tonos de piel, 13 peinados, 12 estilos de ojos, 6 bocas, 5 barbas, 6 anteojos y 14 presets — así que agregar dibujo nunca implica tocar un componente. Incluye un editor de personajes, se renderiza entero en el servidor y respeta reduced-motion.',
    stack: ['React', 'TypeScript', 'SVG', 'tsup', 'Vitest', 'npm'],
    install: 'npm i @facundolizarraga/portfolio-characters',
    repoUrl: 'https://github.com/lizarragafacundo/portfolio-characters',
    builderLabel: 'Abrir el editor',
    randomLabel: 'Aleatorio',
    resetLabel: 'Volver a mí',
    demoCaption: 'Cambia este retrato y el personaje que te sigue por la página.',
  },

  smallProjects: [
    {
      title: 'Plataforma Interna de Desarrollo sobre Coder',
      tag: 'construida por mí',
      about:
        'Una plataforma interna de desarrollo basada en Terraform sobre Coder y Docker que provisiona entornos multi-stack desde un formulario web a través de un pipeline ordenado, con ruteo de IA consciente del costo y un equipo de agentes nocturnos que deja el trabajo como PRs revisados por un humano.',
      stack: 'Terraform · Coder · Docker · Ollama',
    },
    {
      title: 'Plataforma de Descubrimiento de Leads de Artistas',
      tag: 'freelance → interna',
      about:
        'Una plataforma de scraping de Spotify y redes sociales con scoring de leads (Playwright / Puppeteer con stealth, circuit breakers propios, export detallado para sector de operaciones), más un agente de operaciones autónomo con LLM y una salvaguarda determinística que verifica el modelo contra hechos precalculados.',
      stack: 'Playwright · Puppeteer · Next.js · Ollama',
    },
  ],

  education: [
    {
      school: 'Universidad Católica Argentina',
      degree: 'Ingeniería Industrial — cursada hacia el título',
      meta: '2016–2022',
      description:
        'Estadística, optimización e investigación operativa antes de pasar full time al software.',
    },
    {
      school: 'Universidad de Palermo',
      degree: 'Ingeniería Informática',
      meta: '2022–2023',
      description: 'Completé un año y medio de cursada.',
    },
    {
      school: 'Universidad Católica Argentina',
      degree: 'Ayudante de cátedra — Estadística Avanzada',
      meta: '2021–2022',
      description: 'Acompañé las clases prácticas de los estudiantes durante la pandemia.',
    },
  ],

  certificationsLabel: 'Certificaciones e Idiomas',
  certifications: [
    'Cambridge English: First (FCE)',
    'Cambridge IGCSE',
    'Español — nativo',
    'Inglés — avanzado',
  ],

  contactMessage:
    'Construyamos algo. Estoy abierto a roles senior de full-stack e ingeniería de IA, remotos.',
  builtWith: 'hecho con cuidado, en una terminal',

  a11y: {
    skipToContent: 'Ir al contenido',
    languageSwitch: 'Cambiar idioma',
    primaryNav: 'Secciones',
  },
} satisfies Content
