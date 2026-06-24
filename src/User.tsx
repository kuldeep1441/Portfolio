import { IconBrandGithub, IconBrandLeetcode, IconBrandLinkedin, IconCode, IconTerminal } from "@tabler/icons-react";

/* ─────────────────────────────────────────────────────────
   Optional localStorage override key `portfolio_data_override`.
   On load, User.tsx merges it over defaults when valid JSON exists.
───────────────────────────────────────────────────────── */
const _override = (() => {
    try { return JSON.parse(localStorage.getItem("portfolio_data_override") || "null"); }
    catch { return null; }
})();

/* ── Utility: calculate duration between two dates ─────── */
export const calcDuration = (startDate: string, endDate?: string | null): string => {
    const start = new Date(startDate);
    const end   = endDate ? new Date(endDate) : new Date();
    const total = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    const yrs   = Math.floor(total / 12);
    const mos   = total % 12;
    if (yrs === 0) return `${mos} mo`;
    if (mos === 0) return `${yrs} yr${yrs > 1 ? "s" : ""}`;
    return `${yrs} yr${yrs > 1 ? "s" : ""} ${mos} mo`;
};

/* ── Utility: total professional experience ─────────────── */
export const getTotalExperienceYears = (): number => {
    const start = new Date(Info.experienceStartDate);
    const now   = new Date();
    // LinkedIn counts months inclusively (e.g. Sep 2023 → Jun 2026 = 34 mos), so add 1.
    const mos   = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
    return parseFloat((mos / 12).toFixed(1));
};

/* ════════════════════════════════════════════════════════
   CORE INFO
════════════════════════════════════════════════════════ */
const _Info = {
    name: "Kuldeep Tanwar",
    /** Set to when your professional career started for auto-updating year counter */
    experienceStartDate: "2023-09-01",
    stack: ["Full-Stack Engineer", "Backend Developer", "Cloud & DevOps Engineer"],
    bio: `Full-stack Engineer with 2.5+ years of experience building scalable, production-grade systems using JavaScript, TypeScript, React, Next.js, Node.js, NestJS, FastAPI, Python, and AWS; mentoring 2 interns. Skilled in backend architecture and performance optimization, leveraging Redis caching, database indexing, query tuning, asynchronous processing, and distributed system design to improve scalability and reliability. Experienced in AI-powered product development using Claude API, OpenAI, GPTZero, and LLM pipelines to automate workflows and enhance user experiences at scale.`,
};
const Info = _override?.info || _Info;

/* ════════════════════════════════════════════════════════
   PROJECTS
════════════════════════════════════════════════════════ */
const _ProjectInfo = [
    {
        title: "Narriva",
        desc: "AI-driven social media automation platform for Indian SMBs — content generation, publishing, customer interaction, and lead capture — powered by event-driven async pipelines, Meta Graph API, and multi-tenant FastAPI services with real-time webhook processing.",
        points: [
            "Architected event-driven async pipelines on Celery + Redis for trend detection, scheduling, lead capture, and WhatsApp alerts",
            "Implemented Meta Graph API for Instagram/Facebook OAuth, media publishing, real-time webhooks, and analytics",
            "Engineered multi-tenant FastAPI services with PostgreSQL, JWT auth, and rate-limited request handling at scale on AWS",
            "Built AI-generated posts with captions and hashtags, auto-replies across Instagram, Facebook & WhatsApp",
            "Integrated intelligent lead scoring and daily trend alerts via Claude API pipelines",
        ],
        image: "Narriva.png",
        live: true,
        technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Celery", "React Native", "AWS", "Claude API"],
        // Narriva ships as both a web app and an Android app
        website: "https://narriva.in/",
        playStore: "https://play.google.com/store/apps/details?id=in.narriva.app",
    },
    {
        title: "DigiCampus LMS",
        desc: "Production Learning Management System serving 5,000+ learners and facilitating 150k–300k learning hours monthly, optimised for performance, AI content detection, and offline-first PWA access.",
        points: [
            "Built and scaled a production LMS serving 5,000+ learners and 150k–300k monthly learning hours across multiple cohorts",
            "Cut API latency by 75% via Redis caching, concurrent async processing, and strategic MongoDB indexing on the hottest read paths",
            "Integrated GPTZero AI APIs to detect AI-generated content in student assessment submissions",
            "Converted platform to PWA with offline access, install support, and push-notification engagement",
            "Optimised React with memoization, code-splitting, lazy loading, and AbortController request cancellation",
        ],
        image: "DigiCampus.png",
        live: true,
        technologies: ["React", "Next.js", "Node.js", "NestJS", "JavaScript", "TypeScript", "MongoDB", "AWS", "Redis"],
        website: "https://campus.alterainstitute.com/dashboard",
    },
    {
        title: "BookShoppe",
        desc: "Modern, fully responsive e-commerce platform for books with secure auth, cart management, product search, and validated checkout — built with React, Vite, Tailwind, Redux, and Material UI.",
        points: [
            "Fully responsive e-commerce built with React, Vite, Tailwind CSS, Redux, and Material UI",
            "Secure user authentication with login, registration, and session management",
            "Cart management, real-time product search, and validated multi-step checkout flow",
            "Order history tracking with persistent state across book categories",
        ],
        image: "BookShoppe.png",
        live: true,
        technologies: ["React", "Vite", "Tailwind CSS", "Redux", "Material UI"],
        website: "https://book-shoppe.vercel.app/",
        github: "https://github.com/kuldeep1441/BookShoppe.git",
    },
];
const ProjectInfo = _override?.projectInfo || _ProjectInfo;

/* ════════════════════════════════════════════════════════
   SKILLS
════════════════════════════════════════════════════════ */
const _SkillInfo = [
    {
        title: "Frontend",
        skills: ["React.js", "Next.js", "JavaScript", "TypeScript", "Redux", "Tailwind CSS", "Material UI", "HTML5", "PWA", "Storybook"],
    },
    {
        title: "Backend",
        skills: ["Node.js", "NestJS", "Express.js", "FastAPI", "REST APIs", "Microservices", "WebSockets"],
    },
    {
        title: "Databases & Caching",
        skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "BullMQ", "Celery"],
    },
    {
        title: "Cloud & DevOps",
        skills: ["AWS (S3, ECS, Lambda, RDS, SQS)", "Docker", "Nginx", "CI/CD", "Vercel", "Sentry", "PostHog", "k6"],
    },
    {
        title: "AI & Integrations",
        skills: ["Claude API", "OpenAI APIs", "GPTZero", "LLM Pipelines", "Meta Graph API", "Webhooks"],
    },
    {
        title: "Languages",
        skills: ["TypeScript", "JavaScript (ES6+)", "Python", "C++", "SQL"],
    },
];
const SkillInfo = _override?.skillInfo || _SkillInfo;

/* ════════════════════════════════════════════════════════
   EXPERIENCE
════════════════════════════════════════════════════════ */
const _ExperienceInfo = [
    {
        role: "Software Development Engineer",
        company: "Digiaccel Learning (Altera Institute)",
        link: "https://www.linkedin.com/school/digiaccel/",
        location: "Gurugram, IN",
        startDate: "2024-11-01",
        endDate: null,          // null = "Present"
        date: "Nov 2024 - Present",
        points: [
            "Built Grafana/Prometheus observability dashboard with AWS Lambda-driven staging shutdown, reducing infrastructure costs by 12.5%",
            "Reduced API response times by 75% via Redis caching, concurrent async processing, query optimisation, and request batching",
            "Established scaling baselines through k6 load tests on AWS ECS Fargate, informing peak-traffic auto-scaling and capacity policies",
            "Integrated Sentry for error tracking and PostHog for product analytics, cutting MTTR to ~1 hour",
            "Implemented secure direct-to-AWS S3 uploads via pre-signed URLs, removing server bottlenecks and improving upload latency by ~30%",
            "Applied BullMQ rate-limiting and retry queues on LeadSquared CRM lead-sync, eliminating HTTP 429 throttling with zero lead loss",
        ],
        skills: ["React", "Next.js", "Node.js", "NestJS", "JavaScript", "TypeScript", "MongoDB", "AWS", "Redis"],
    },
    {
        role: "Junior Software Engineer",
        company: "Vilihi Virtual Services",
        link: "https://www.linkedin.com/in/vilihi-virtual-services-302034290/",
        location: "Noida, IN",
        startDate: "2023-12-01",
        endDate: "2024-11-30",
        date: "Dec 2023 - Nov 2024",
        points: [
            "Published a shared TypeScript Enums NPM package unifying frontend and backend contracts, cutting type-related defects by ~20%",
            "Configured Storybook for isolated React component development, accelerating UI iteration, design QA, and review cycles",
            "Designed Node.js + Express REST APIs with MongoDB schemas, JWT auth, and Zod validation powering core backend workflows",
        ],
        skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "TypeScript", "Storybook", "Zod"],
    },
];
const ExperienceInfo = _override?.experienceInfo || _ExperienceInfo;

/* ════════════════════════════════════════════════════════
   EDUCATION
════════════════════════════════════════════════════════ */
const _EducationInfo = [
    {
        type: "degree",
        degree: "B.Tech — Computer Science & Engineering",
        institution: "NIT Kurukshetra",
        grade: "7.8 CGPA",
        date: "2020 – 2024",
        location: "Kurukshetra, Haryana, India",
        image: "nit-kurukshetra.png",
        badge: "Govt. Premier Institute",
    },
    {
        type: "class12",
        degree: "Class XII — Science (PCM)",
        institution: "Yaduvanshi Shiksha Niketan",   // ← update
        grade: "93.2%",                       // ← update
        date: "2020",
        board: "CBSE",
        location: "Mahendragarh, Haryana, India",
    },
    {
        type: "class10",
        degree: "Class X",
        institution: "Yaduvanshi Shiksha Niketan",   // ← update
        grade: "88.4%",                       // ← update
        date: "2018",
        board: "CBSE",
        location: "Mahendragarh, Haryana, India",
    },
];
const EducationInfo = _override?.educationInfo || _EducationInfo;

/* ════════════════════════════════════════════════════════
   SOCIAL & ICON CLOUD
════════════════════════════════════════════════════════ */
const socialLinks = [
    { link: "https://github.com/kuldeep1441", icon: IconBrandGithub },
    { link: "https://www.linkedin.com/in/kuldeep-tanwar-61b748237/", icon: IconBrandLinkedin },
    { link: "https://leetcode.com/u/kuldeep_kd/", icon: IconBrandLeetcode },
    { link: "https://www.geeksforgeeks.org/user/kuldeep1441/", icon: IconCode },
    { link: "https://www.interviewbit.com/profile/kuldeep1441/", icon: IconTerminal },
];

const Slugs = [
    "typescript", "javascript", "python",
    "react", "nextdotjs", "nodedotjs",
    "nestjs", "express", "fastapi",
    "html5", "css3",
    "mongodb", "postgresql", "mysql", "redis",
    "amazonaws", "docker", "nginx", "vercel",
    "tailwindcss", "mui", "redux",
    "storybook", "git", "github", "openai",
];

export { Info, ProjectInfo, socialLinks, SkillInfo, ExperienceInfo, EducationInfo, Slugs };
