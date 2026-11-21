/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const User = require('../models/User');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const SiteSettings = require('../models/SiteSettings');

const { slugify } = require('../utils/slugify');

const projects = [
  {
    title: 'ClevPay',
    shortDescription: 'A multi-wallet digital payments platform for small businesses across West Africa.',
    description:
      'ClevPay is a digital payments platform that lets small businesses accept transfers, track settlements, and manage multiple wallets from a single dashboard. It was built to replace fragmented spreadsheets and manual bank reconciliation with a real-time ledger.',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features: ['Multi-wallet balances', 'Transaction history & export', 'Role-based staff accounts', 'Real-time settlement tracking'],
    problem: 'Business owners were reconciling payments manually across bank apps, POS terminals, and spreadsheets, leading to frequent errors and delayed settlement visibility.',
    solution: 'A unified dashboard that aggregates transactions into one ledger, with automated categorization and exportable statements.',
    architecture: 'React SPA communicating with an Express REST API, MongoDB for transaction storage, JWT-based staff authentication with role scoping.',
    challenges: 'Designing a wallet schema that stays consistent under concurrent transaction writes required careful use of MongoDB transactions and optimistic concurrency checks.',
    results: 'Reduced manual reconciliation time for pilot merchants from several hours a week to under 20 minutes.',
    image: '/uploads/seed/clevpay-cover.jpg',
    screenshots: ['/uploads/seed/clevpay-1.jpg', '/uploads/seed/clevpay-2.jpg'],
    githubUrl: 'https://github.com/clevtechdevhub/clevpay',
    liveUrl: 'https://clevpay-demo.clevtechdevhub.com',
    featured: true,
    status: 'Completed',
  },
  {
    title: 'Smart Expense Tracker',
    shortDescription: 'A personal finance app with budget categories, recurring expenses, and visual spending reports.',
    description:
      'Smart Expense Tracker helps individuals log daily expenses, set monthly budgets per category, and visualize where their money goes through interactive charts.',
    category: 'Frontend',
    technologies: ['React', 'Chart.js', 'Context API', 'Bootstrap 5'],
    features: ['Category-based budgeting', 'Recurring expense reminders', 'Monthly spending charts', 'CSV export'],
    problem: 'Most budgeting apps are either too complex or too limited for everyday users who just want a clear picture of monthly spending.',
    solution: 'A lightweight, fast interface focused on quick entry and immediate visual feedback on budget usage.',
    architecture: 'React frontend with Context API for global budget state, persisted through a lightweight REST API.',
    challenges: 'Building accurate recurring-expense projections without over-complicating the UI.',
    results: 'Used by over 200 early testers during the beta period with consistently positive feedback on ease of use.',
    image: '/uploads/seed/expense-tracker-cover.jpg',
    screenshots: ['/uploads/seed/expense-tracker-1.jpg'],
    githubUrl: 'https://github.com/clevtechdevhub/smart-expense-tracker',
    liveUrl: 'https://expense-tracker-demo.clevtechdevhub.com',
    featured: true,
    status: 'Completed',
  },
  {
    title: 'School Management System',
    shortDescription: 'An administrative platform for managing students, staff, results, and fee payments.',
    description:
      'A comprehensive school management system covering student enrollment, class assignment, staff records, result computation, and fee tracking for private schools.',
    category: 'Dashboard',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Bootstrap 5'],
    features: ['Student & staff records', 'Result computation engine', 'Fee tracking', 'Role-based admin access'],
    problem: 'Administrative staff were managing student records across paper files and disconnected spreadsheets.',
    solution: 'A centralized web platform where each department works from the same live data source.',
    architecture: 'Express REST API backed by MongoDB, with role-based routes separating admin, teacher, and accounts-office permissions.',
    challenges: 'Modeling flexible result computation rules that vary by term and class level.',
    results: 'Deployed across two pilot schools, cutting result-processing time by more than half each term.',
    image: '/uploads/seed/school-mgmt-cover.jpg',
    screenshots: ['/uploads/seed/school-mgmt-1.jpg', '/uploads/seed/school-mgmt-2.jpg'],
    githubUrl: 'https://github.com/clevtechdevhub/school-management-system',
    liveUrl: 'https://school-mgmt-demo.clevtechdevhub.com',
    featured: true,
    status: 'Maintenance',
  },
  {
    title: 'Shipment Tracking System',
    shortDescription: 'A logistics tracking platform with real-time shipment status updates and customer notifications.',
    description:
      'Built for a logistics startup, this system lets dispatch teams create shipments, update status at each checkpoint, and gives customers a trackable link to follow their delivery.',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    features: ['Checkpoint-based status updates', 'Public tracking links', 'Dispatcher dashboard', 'Delivery history'],
    problem: 'Customers had no visibility into shipment progress and support staff were fielding repetitive status-check calls.',
    solution: 'A public tracking page tied to a unique shipment ID, updated automatically as dispatch staff log checkpoints.',
    architecture: 'REST API with a checkpoint sub-document model, MongoDB indexes on tracking IDs for fast public lookups.',
    challenges: 'Keeping the public tracking endpoint fast and abuse-resistant without requiring customer login.',
    results: 'Cut status-related support calls by roughly 40% within the first month of rollout.',
    image: '/uploads/seed/shipment-tracker-cover.jpg',
    screenshots: ['/uploads/seed/shipment-tracker-1.jpg'],
    githubUrl: 'https://github.com/clevtechdevhub/shipment-tracking-system',
    liveUrl: 'https://shipment-tracker-demo.clevtechdevhub.com',
    featured: false,
    status: 'Completed',
  },
  {
    title: 'Online Counseling Platform',
    shortDescription: 'A booking and messaging platform connecting clients with licensed counselors.',
    description:
      'A platform where clients can browse counselor profiles, book sessions around counselor availability, and exchange secure messages before and after sessions.',
    category: 'Full Stack',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features: ['Counselor availability calendar', 'Secure client-counselor messaging', 'Session booking & reminders', 'Profile verification'],
    problem: 'Clients seeking counseling had no simple way to discover and book verified counselors online.',
    solution: 'A structured booking flow tied to each counselor\'s live availability, with in-app messaging to reduce reliance on external channels.',
    architecture: 'Express API with role-based access for clients vs. counselors, MongoDB storing availability as time-slot documents.',
    challenges: 'Preventing double-booking of the same time slot under concurrent requests.',
    results: 'Successfully piloted with a small group of counselors, handling bookings without a single scheduling conflict.',
    image: '/uploads/seed/counseling-cover.jpg',
    screenshots: ['/uploads/seed/counseling-1.jpg'],
    githubUrl: 'https://github.com/clevtechdevhub/online-counseling-platform',
    liveUrl: 'https://counseling-demo.clevtechdevhub.com',
    featured: false,
    status: 'In Development',
  },
  {
    title: 'ClevTech Finance',
    shortDescription: 'An internal budgeting and invoicing tool built for small agency operations.',
    description:
      'ClevTech Finance manages client invoices, project-based expense tracking, and monthly revenue reporting for a small software agency.',
    category: 'Dashboard',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js'],
    features: ['Invoice generation', 'Project expense tracking', 'Monthly revenue charts', 'Client billing history'],
    problem: 'Invoicing and expense tracking were split across separate tools with no unified reporting view.',
    solution: 'A single dashboard combining invoicing, expenses, and revenue charts scoped per client and per project.',
    architecture: 'React dashboard with Chart.js visualizations, Express API aggregating financial data via MongoDB pipelines.',
    challenges: 'Designing aggregation queries that stay performant as invoice history grows.',
    results: 'Now used internally to track all client billing for the ClevTech DevHub team.',
    image: '/uploads/seed/clevtech-finance-cover.jpg',
    screenshots: ['/uploads/seed/clevtech-finance-1.jpg'],
    githubUrl: 'https://github.com/clevtechdevhub/clevtech-finance',
    liveUrl: '',
    featured: false,
    status: 'Completed',
  },
  {
    title: 'Result Analysis System',
    shortDescription: 'A statistical dashboard for analyzing exam results and student performance trends.',
    description:
      'A tool that ingests raw exam score data and generates performance analytics: class averages, subject-level trends, and individual student progress across terms.',
    category: 'Dashboard',
    technologies: ['React', 'Chart.js', 'Node.js', 'Express.js', 'MongoDB'],
    features: ['Bulk score import', 'Class & subject performance charts', 'Student progress history', 'Exportable reports'],
    problem: 'Teachers could see raw scores but had no easy way to spot performance trends across terms.',
    solution: 'Automated aggregation pipelines that turn raw scores into trend charts and rankings on import.',
    architecture: 'MongoDB aggregation pipelines feeding a React dashboard rendered with Chart.js.',
    challenges: 'Handling inconsistent score formats from bulk CSV imports.',
    results: 'Adopted by academic staff to identify at-risk students earlier in the term.',
    image: '/uploads/seed/result-analysis-cover.jpg',
    screenshots: ['/uploads/seed/result-analysis-1.jpg'],
    githubUrl: 'https://github.com/clevtechdevhub/result-analysis-system',
    liveUrl: 'https://result-analysis-demo.clevtechdevhub.com',
    featured: false,
    status: 'Completed',
  },
  {
    title: 'ClevTech Portfolio',
    shortDescription: 'This very platform — a full-stack portfolio, blog, and client-acquisition system for ClevTech DevHub.',
    description:
      'The ClevTech DevHub portfolio platform itself: a public marketing site backed by a real REST API and MongoDB database, with a full admin dashboard for managing projects, blog content, testimonials, and incoming client requests.',
    category: 'Full Stack',
    technologies: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features: ['Dynamic project & blog CMS', 'Quote request pipeline', 'Admin analytics dashboard', 'Role-protected content management'],
    problem: 'A static portfolio page can\'t demonstrate real backend, database, or authentication skill.',
    solution: 'Build the portfolio itself as a full production-grade application, so the site is proof of capability rather than just a description of it.',
    architecture: 'React + Vite frontend, Express REST API with a service-layer architecture, MongoDB via Mongoose, JWT-based admin authentication.',
    challenges: 'Balancing a large feature set against clean, maintainable folder structure and avoiding scope creep into unnecessary features.',
    results: 'A working demonstration of full-stack engineering ability that doubles as the company\'s client-facing website.',
    image: '/uploads/seed/clevtech-portfolio-cover.jpg',
    screenshots: ['/uploads/seed/clevtech-portfolio-1.jpg'],
    githubUrl: 'https://github.com/clevtechdevhub/clevtech-devhub',
    liveUrl: 'https://clevtechdevhub.com',
    featured: true,
    status: 'In Development',
  },
];

const services = [
  {
    title: 'Website Development',
    shortDescription: 'Professional, responsive websites for businesses that need a strong online presence.',
    description:
      'We design and build fast, responsive business websites focused on clarity, performance, and conversion — from small brochure sites to multi-page company platforms.',
    icon: 'FaGlobe',
    technologies: ['React', 'HTML', 'CSS', 'Bootstrap'],
    features: ['Responsive design', 'SEO-friendly structure', 'Fast load times', 'Content-ready layout'],
    order: 1,
  },
  {
    title: 'Full-Stack Web Applications',
    shortDescription: 'Complete applications with a React frontend and a secure Node.js/Express backend.',
    description:
      'End-to-end application development covering frontend interfaces, backend APIs, database design, and authentication — built as one cohesive system.',
    icon: 'FaLayerGroup',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    features: ['REST API architecture', 'JWT authentication', 'Database design', 'Admin dashboards'],
    order: 2,
  },
  {
    title: 'E-commerce Development',
    shortDescription: 'Online stores with product management and a payment-ready architecture.',
    description:
      'Custom e-commerce platforms with product catalogs, cart and checkout flows, and clean extension points for payment provider integration.',
    icon: 'FaShoppingCart',
    technologies: ['React', 'Node.js', 'MongoDB', 'Paystack/Flutterwave-ready'],
    features: ['Product management', 'Cart & checkout flow', 'Order tracking', 'Payment-ready architecture'],
    order: 3,
  },
  {
    title: 'API Development',
    shortDescription: 'Secure, well-documented REST APIs for web, mobile, or third-party integration.',
    description:
      'Clean REST API design following a routes-controllers-services-models architecture, with validation, rate limiting, and proper error handling built in.',
    icon: 'FaPlug',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    features: ['RESTful architecture', 'Input validation', 'Rate limiting', 'Consistent error responses'],
    order: 4,
  },
  {
    title: 'Admin Dashboards',
    shortDescription: 'Professional dashboards with analytics, data tables, and management tools.',
    description:
      'Internal tools built for real operational use — content management, analytics charts, and data tables designed for daily admin workflows.',
    icon: 'FaChartLine',
    technologies: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
    features: ['Role-based access', 'Analytics charts', 'Searchable data tables', 'CRUD management'],
    order: 5,
  },
  {
    title: 'Database Development',
    shortDescription: 'MongoDB database design, schema architecture, and query optimization.',
    description:
      'Schema design focused on data integrity, appropriate indexing, and queries that stay fast as your data grows.',
    icon: 'FaDatabase',
    technologies: ['MongoDB', 'Mongoose'],
    features: ['Schema design', 'Indexing strategy', 'Data validation', 'Query optimization'],
    order: 6,
  },
];

const testimonials = [
  {
    clientName: 'Adaeze Nwosu',
    company: 'Nwosu Retail Group',
    position: 'Operations Manager',
    testimonial:
      'ClevTech DevHub rebuilt our internal ordering system from scratch. What used to take our team hours of manual spreadsheet work now happens automatically, and the dashboard is genuinely easy for non-technical staff to use.',
    rating: 5,
    avatar: '/uploads/seed/avatar-adaeze.jpg',
    order: 1,
  },
  {
    clientName: 'Tunde Bakare',
    company: 'Bakare & Co.',
    position: 'Founder',
    testimonial:
      'We came in wanting a simple business website and left with a full booking system we didn\'t know we needed. Communication throughout the project was clear and deadlines were consistently met.',
    rating: 5,
    avatar: '/uploads/seed/avatar-tunde.jpg',
    order: 2,
  },
  {
    clientName: 'Grace Ehiogu',
    company: 'Ehiogu Schools',
    position: 'Administrator',
    testimonial:
      'The school management system has completely changed how our academic office handles results and fee tracking. Support after launch has been just as responsive as during development.',
    rating: 5,
    avatar: '/uploads/seed/avatar-grace.jpg',
    order: 3,
  },
  {
    clientName: 'Michael Osaretin',
    company: 'Swiftline Logistics',
    position: 'Operations Lead',
    testimonial:
      'Our customers can finally track shipments without calling support every time. The tracking dashboard the ClevTech team built is fast, reliable, and looks genuinely professional.',
    rating: 4,
    avatar: '/uploads/seed/avatar-michael.jpg',
    order: 4,
  },
  {
    clientName: 'Chioma Eze',
    company: 'Eze Consulting',
    position: 'Managing Partner',
    testimonial:
      'From the first call, it was clear ClevTech DevHub understood exactly what a small consulting firm actually needs — not an overbuilt system, just a clean, dependable platform that works.',
    rating: 5,
    avatar: '/uploads/seed/avatar-chioma.jpg',
    order: 5,
  },
];

const blogPostsSeed = [
  {
    title: 'Why Full-Stack Thinking Matters When Choosing a Web Development Partner',
    excerpt:
      'A frontend that looks great is only half the job. Here is why the database and API decisions behind it matter just as much.',
    content:
      'When businesses evaluate a development partner, most of the conversation focuses on visual design. But the architecture underneath — how data is modeled, how the API is structured, how authentication is handled — determines whether the product can actually grow with the business. In this post we walk through the questions worth asking any development team before a project starts, including how they handle database schema changes, API versioning, and security basics like password hashing and rate limiting.',
    category: 'Software Engineering',
    tags: ['architecture', 'planning', 'full-stack'],
    status: 'published',
  },
  {
    title: 'A Practical Guide to REST API Design with Express and MongoDB',
    excerpt:
      'Clean routes, predictable responses, and sane error handling — the fundamentals that make an API pleasant to build against.',
    content:
      'Good API design is less about clever patterns and more about consistency. This post covers the routes-controllers-services-models layering we use at ClevTech DevHub, why centralized error handling saves time down the line, and how a consistent response envelope makes frontend integration far less error-prone for whoever consumes the API next.',
    category: 'Node.js',
    tags: ['express', 'api', 'mongodb'],
    status: 'published',
  },
  {
    title: 'React Component Architecture: Keeping Large Apps Maintainable',
    excerpt:
      'A look at how to structure components, hooks, and context so a growing React app does not collapse under its own weight.',
    content:
      'As React applications grow, the temptation to put everything into a handful of giant components becomes real. This post covers practical rules for splitting UI into reusable components, when Context API actually earns its complexity versus when local state is enough, and how a clear services layer keeps API calls out of your component tree.',
    category: 'React',
    tags: ['react', 'components', 'architecture'],
    status: 'published',
  },
  {
    title: 'MongoDB Schema Design: Lessons from Building Real Client Projects',
    excerpt:
      'Embedding versus referencing, when to add indexes, and other schema decisions that are easy to get wrong early.',
    content:
      'MongoDB\'s flexibility is a double-edged sword — it is easy to model data in a way that works fine at first and falls apart under real usage. Drawing from projects like our school management system and shipment tracker, this post walks through decisions around embedding subdocuments versus referencing collections, and where indexes actually paid off in production.',
    category: 'MongoDB',
    tags: ['mongodb', 'schema-design', 'database'],
    status: 'published',
  },
  {
    title: 'Securing a Node.js API: Beyond Just Adding JWT',
    excerpt:
      'Authentication is only one layer. Rate limiting, input sanitization, and proper CORS configuration matter just as much.',
    content:
      'JWT authentication gets most of the attention in security discussions, but it is only one piece of a secure API. This post covers the layers we build into every ClevTech DevHub backend: Helmet for HTTP headers, rate limiting on sensitive routes, MongoDB injection protection, and why CORS should never be left wide open on an authenticated API.',
    category: 'APIs',
    tags: ['security', 'jwt', 'express'],
    status: 'published',
  },
  {
    title: 'From Idea to Deployment: How We Scope a Web Application Project',
    excerpt:
      'A look inside the discovery-to-deployment process we follow with every ClevTech DevHub client engagement.',
    content:
      'Every project starts with discovery — understanding not just what a client wants built, but why, and who will actually use it day to day. This post walks through our process from initial discovery calls through planning, design, development, testing, and deployment, and why skipping the early stages almost always costs more time later.',
    category: 'ClevTech News',
    tags: ['process', 'planning', 'deployment'],
    status: 'published',
  },
];

const run = async () => {
  await connectDB();
  console.log('Connected. Seeding database...');

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@clevtechdevhub.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeThisPassword123!';

  await Promise.all([
    Project.deleteMany({}),
    BlogPost.deleteMany({}),
    Service.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: 'ClevTech Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin',
      title: 'Founder & Lead Developer',
      bio: 'Full-stack developer building web platforms and business software as ClevTech DevHub.',
    });
    console.log(`Created admin user: ${adminEmail} / ${adminPassword} (change this password after first login)`);
  } else {
    console.log('Admin user already exists, skipping creation.');
  }

  const projectDocs = await Project.insertMany(
    projects.map((p) => ({ ...p, slug: slugify(p.title) }))
  );
  console.log(`Seeded ${projectDocs.length} projects.`);

  const serviceDocs = await Service.insertMany(
    services.map((s) => ({ ...s, slug: slugify(s.title) }))
  );
  console.log(`Seeded ${serviceDocs.length} services.`);

  const testimonialDocs = await Testimonial.insertMany(testimonials);
  console.log(`Seeded ${testimonialDocs.length} testimonials.`);

  const blogDocs = await BlogPost.insertMany(
    blogPostsSeed.map((post, i) => ({
      ...post,
      slug: slugify(post.title),
      coverImage: `/uploads/seed/blog-${i + 1}.jpg`,
      author: admin._id,
      publishedAt: new Date(Date.now() - (blogPostsSeed.length - i) * 7 * 24 * 60 * 60 * 1000),
      readingTime: Math.max(2, Math.round(post.content.split(' ').length / 200)),
    }))
  );
  console.log(`Seeded ${blogDocs.length} blog posts.`);

  await SiteSettings.getSettings();
  console.log('Ensured default site settings document exists.');

  console.log('Seeding complete.');
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
