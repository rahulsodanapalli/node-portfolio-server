import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/error.middleware';

// Routes imports
import authRoutes from './routes/auth.routes';
import skillsRoutes from './routes/skills.routes';
import experienceRoutes from './routes/experience.routes';
import projectsRoutes from './routes/projects.routes';
import achievementsRoutes from './routes/achievements.routes';

// Models imports for seeding
import { Skill } from './models/Skill.model';
import { Experience } from './models/Experience.model';
import { Project } from './models/Project.model';
import { Achievement } from './models/Achievement.model';

const app = express();

// Disable ETags to prevent 304 Not Modified responses
app.set('etag', false);

// Middlewares
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://rahulbuilds-dev-gamma.vercel.app',
  'https://rahulbuilds.dev',
];

if (process.env.ALLOWED_ORIGINS) {
  const customOrigins = process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
  allowedOrigins.push(...customOrigins);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// RESTful Route registrations
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/achievements', achievementsRoutes);

// Root test route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Error handling middleware
app.use(errorHandler);

// Database Seeding Logic
const seedDatabase = async () => {
  try {
    // 1. Seed Skills if empty
    const skillsCount = await Skill.countDocuments();
    if (skillsCount === 0) {
      console.log('🌱 Seeding skills data...');
      const seedSkills = [
        // Frontend Core
        { name: 'React.js', category: 'Frontend Core', level: 'Expert' },
        { name: 'TypeScript', category: 'Frontend Core', level: 'Expert' },
        { name: 'Next.js', category: 'Frontend Core', level: 'Intermediate' },
        { name: 'JavaScript ES6+', category: 'Frontend Core', level: 'Expert' },
        { name: 'HTML5 / CSS3', category: 'Frontend Core', level: 'Expert' },
        // State Management
        { name: 'Redux Toolkit', category: 'State Management', level: 'Expert' },
        { name: 'RTK Query', category: 'State Management', level: 'Expert' },
        { name: 'Zustand', category: 'State Management', level: 'Expert' },
        { name: 'Context API', category: 'State Management', level: 'Expert' },
        // Forms & Schema
        { name: 'React Hook Form', category: 'Forms & Schema', level: 'Expert' },
        { name: 'Zod Validators', category: 'Forms & Schema', level: 'Expert' },
        { name: 'MUI Form Controllers', category: 'Forms & Schema', level: 'Expert' },
        { name: 'Asynchronous validators', category: 'Forms & Schema', level: 'Expert' },
        // Data Viz & Charts
        { name: 'Recharts', category: 'Data Viz & Charts', level: 'Expert' },
        { name: 'ApexCharts', category: 'Data Viz & Charts', level: 'Expert' },
        { name: 'Interactive Telemetry', category: 'Data Viz & Charts', level: 'Expert' },
        { name: 'High-Density grids', category: 'Data Viz & Charts', level: 'Expert' },
        // Performance tuning
        { name: 'Code Splitting', category: 'Performance tuning', level: 'Expert' },
        { name: 'Vite Bundler', category: 'Performance tuning', level: 'Expert' },
        { name: 'Dynamic Imports', category: 'Performance tuning', level: 'Expert' },
        { name: 'Ref Re-renders optimization', category: 'Performance tuning', level: 'Expert' },
        // AI Tools & Workflow
        { name: 'LLM REST Integrations', category: 'AI Tools & Workflow', level: 'Expert' },
        { name: 'Cursor AI Workflow', category: 'AI Tools & Workflow', level: 'Expert' },
        { name: 'Production Chat Agents', category: 'AI Tools & Workflow', level: 'Expert' },
        { name: 'Prompt Engineering', category: 'AI Tools & Workflow', level: 'Expert' },
      ];
      await Skill.insertMany(seedSkills);
      console.log('✅ Skills data seeded successfully');
    }

    // 2. Seed Experience if empty
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      console.log('🌱 Seeding experiences...');
      const seedExperiences = [
        {
          role: 'Software Engineer (Frontend)',
          company: 'Innovatech Technology Solutions',
          location: 'Hyderabad, India (Client: Abu Dhabi Govt)',
          period: 'Aug 24 - Present',
          details: [
            'Architected the Abu Dhabi Department of Energy (DoE) Regulatory Portal, a multi-tier regulatory platform for permits and inspections.',
            'Integrated an AI Chat Assistant via REST API, elevating self-service support across production interfaces.',
            'Built rigorous RBAC (Role-Based Access Control) gates, securing multi-level approval workflows (Engineer → Section Head → Director).',
            'Engineered high-performance real-time data visualization charts using Recharts and ApexCharts.',
          ],
          tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'ApexCharts', 'REST APIs', 'MUI'],
        },
        {
          role: 'Frontend Developer',
          company: 'Innovatech Technology Solutions',
          location: 'Hyderabad, India (Client: TAQA Water Solutions)',
          period: 'Oct 23 - Aug 24',
          details: [
            'Engineered the TAQA Water Compliance and Monitoring Dashboard, tracking daily water parameters and metrics.',
            'Implemented a 30% performance enhancement across high-density table views through code splitting and tree-shaking.',
            'Developed fully reusable component systems, achieving 100% design system alignment and zero bundle clutter.',
            'Fixed and resolved complex compliance delay date validators and custom form submissions.',
          ],
          tech: ['React.js', 'TypeScript', 'Redux State', 'Ant Design', 'ApexCharts', 'Axios', 'CSS Modules'],
        },
        {
          role: 'Junior Frontend Engineer',
          company: 'Innovatech Technology Solutions',
          location: 'Hyderabad, India',
          period: 'Jan 23 - Oct 23',
          details: [
            'Designed and coded responsive marketing assets and sub-modules for corporate projects, achieving 100% WCAG accessibility compliance.',
            'Assisted in refactoring legacy jQuery modules into clean, modern React hooks, decreasing code size by 25%.',
            'Integrated secure Axios REST handlers with rigorous client-side schema parsing.',
          ],
          tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Axios', 'Bootstrap', 'Git'],
        },
      ];
      await Experience.insertMany(seedExperiences);
      console.log('✅ Experiences data seeded successfully');
    }

    // 3. Seed Projects if empty
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      console.log('🌱 Seeding projects...');
      const seedProjects = [
        {
          title: 'DoE Regulatory Portal',
          subtitle: 'Department of Energy, Abu Dhabi',
          category: 'Government Enterprise',
          desc: 'A mission-critical regulatory platform handling permits, inspections, and corporate licensing workflows for Abu Dhabi\'s utilities.',
          imageMockup: 'doe',
          specs: {
            challenge: 'Abu Dhabi utility regulatory workflows were manual and fragmented. The authority required a single, secure, highly performant gateway capable of managing high-volume permit approvals and inspection schedules, guarded by strict multi-level state agency controls.',
            solution: 'Engineered a robust multi-step workflow portal. Developed dynamic form schemas, contextual validation architectures, and integrated an AI Chat Guide to assist corporate operators through technical filing procedures, accelerating applications.',
            architecture: 'Structured around React with Redux Toolkit and RTK Query to maintain a unified client state cache. Access gates are enforced via a granular Role-Based Access Control (RBAC) mechanism tracking three-tier approvals (Engineer → Section Head → Director).',
            performance: 'Leveraged route-based lazy loading, layout shift prevention, and heavy dashboard chart optimizations (ApexCharts memoization), resulting in a 30% paint speed increase and sub-1.2s initial interactive cycles.',
            tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'ApexCharts', 'Axios', 'MUI'],
            impact: 'Successfully delivered 3 production releases. Successfully processed thousands of regulatory permits across regional energy partners, reducing operational latency by 40%.',
          },
        },
        {
          title: 'Compliance Dashboard',
          subtitle: 'TAQA Water Solutions, UAE',
          category: 'Utility Analytics',
          desc: 'Real-time compliance audit and utility parameters monitoring terminal processing operational water quality and regulatory charts.',
          imageMockup: 'taqa',
          specs: {
            challenge: 'Utility teams required a performant interface to aggregate water parameter compliance tests. Legacy tables suffered from massive layout shifts, slow paint times under heavy data packets, and date validator mismatches that caused submission delays.',
            solution: 'Designed a lightweight monitoring cockpit featuring lazy-loaded parametrics, optimized high-frequency data grids, and a strict compliance schema date validator using custom asynchronous validation rules.',
            architecture: 'Built on clean modular component design with custom React context state hooks, integrated with third-party charts. Developed a bulletproof parameters table displaying real-time compliance status (Safe, Caution, Alert).',
            performance: 'Avoided unnecessary parent re-renders through local parameter caching and strict visual component encapsulation. Minimized CSS payload to improve initial load speed.',
            tech: ['React.js', 'TypeScript', 'Ant Design', 'Redux', 'ApexCharts', 'Axios', 'Zod'],
            impact: 'Reduced operational reporting latency from 3 days to instantaneous real-time metrics. Maintained a 99.9% compliance data submission accuracy rating.',
          },
        },
      ];
      await Project.insertMany(seedProjects);
      console.log('✅ Projects data seeded successfully');
    }

    // 4. Seed Achievements if empty
    const achievementsCount = await Achievement.countDocuments();
    if (achievementsCount === 0) {
      console.log('🌱 Seeding achievements...');
      const seedAchievements = [
        {
          title: 'Three Production Releases of DoE Regulatory Portal',
          desc: 'Led frontend deployment sequences and security audits, successfully migrating over 10,000 regulatory permits.',
          date: 'Dec 2025',
        },
        {
          title: '99.9% Compliance reporting uptime for TAQA Solutions',
          desc: 'Optimized state rendering for real-time compliance matrices, resolving multi-date validator overlaps.',
          date: 'Aug 2024',
        },
        {
          title: 'AI Chat integration milestone',
          desc: 'Engineered clean REST handshakes and context boundary rules for the regulatory portal\'s integrated AI advisor.',
          date: 'Oct 2025',
        },
      ];
      await Achievement.insertMany(seedAchievements);
      console.log('✅ Achievements data seeded successfully');
    }
  } catch (err) {
    console.error('⚠️ Seeding database failed:', err);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
};

startServer();
