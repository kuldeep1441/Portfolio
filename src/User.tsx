import { IconBrandGithub, IconBrandInstagram, IconBrandLeetcode, IconBrandLinkedin, IconBrandYoutube , IconCode, IconTerminal} from "@tabler/icons-react";

const Info = {
    name: "Kuldeep",
    stack: ["Software Engineer", "Full Stack Developer"],
    bio: `Passionate software engineer dedicated to building efficient, scalable, and impactful web applications. I thrive on solving complex problems, taking full ownership of tasks, and delivering high-quality digital experiences. Let's connect and build something extraordinary together!`,
    phone: "8569958265",
    email: "kuldeepsinghtanwar2001@gmail.com",
    location: "Haryana, India"
}



const ProjectInfo = [
    {
        title: "Gupshup",
        desc: "A full-stack real-time chat application. Engineered a Slack-style realtime group chat system where all conversations (including 1-to-1 DMs) are modeled as groups using a stable chatId and memberIds, enabling scalable multi-user messaging. Integrated realtime messaging and presence updates with Pusher Channels and Redis to deliver low-latency communication and consistent chat state. Designed secure authentication and access control using Google OAuth (NextAuth), protected routes, and email-based friend requests.",
        image: "gupshup.png",
        live: true,
        technologies: ["Next.js", "NextAuth", "Pusher", "Redis"],
        link: "https://gupshup-sigma.vercel.app/",
        github: "https://github.com/kuldeep1441/gupshup.git"
    },
    {
        title: "BookShoppe",
        desc: "Built a full-stack book-selling platform using React, Node.js, MongoDB, and Redux. Added core features including product listing, cart management, and checkout flow. Deployed the application on Vercel and refined client-server communication for a smooth user experience.",
        image: "BookShoppe.png",
        live: true,
        technologies: ["MERN", "Vite", "Redux", "Tailwind"],
        link: "https://book-shoppe.vercel.app/",
        github: "https://github.com/kuldeep1441/BookShoppe.git"
    },
    {
        title: "ApnaGPT",
        desc: "ApnaGPT is an advanced MERN stack application integrated with OpenAI's API to deliver intelligent features like text summarization, chatbot interactions, JavaScript code generation, and text-to-image conversion. The platform supports secure user authentication, ensuring privacy and data protection. Users can interact with a responsive chatbot, generate sci-fi images, or receive JavaScript code suggestions. The application showcases the powerful combination of AI and web development, providing users with a dynamic and engaging experience.",
        image: "ApnaGPT.png",
        live: false,
        technologies: ["MERN", "OpenAI", "Bootstrap", "Redux"],
        link: "https://github.com/kuldeep1441/ApnaGPT.git",
        github: "https://github.com/kuldeep1441/ApnaGPT.git"
    },
]


const SkillInfo = [
    {
        title: "Frontend",
        skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "Tailwind CSS", "Material UI"]
    },
    {
        title: "Backend",
        skills: ["Node.js", "NestJS", "Express.js", "RESTful APIs"]
    },
    {
        title: "Databases & Caching",
        skills: ["MongoDB", "SQL", "Redis"]
    },
    {
        title: "Programming Languages",
        skills: ["TypeScript", "JavaScript", "C++"]
    },
    {
        title: "Tools & Platforms",
        skills: ["VS Code", "Cursor", "Git", "Github", "Vite", "Postman", "Vercel", "Slack"]
    }
]
const socialLinks = [
    { link: "https://github.com/kuldeep1441", icon: IconBrandGithub },
    { link: "https://www.linkedin.com/in/kuldeep-tanwar-61b748237/", icon: IconBrandLinkedin },
    { link: "https://leetcode.com/u/kuldeep_kd/", icon: IconBrandLeetcode },
    { link: "https://www.geeksforgeeks.org/user/kuldeep1441/", icon: IconCode }
];


const ExperienceInfo = [
    {
        role: "Software Development Engineer",
        company: "Digiaccel Learning",
        image: "Digiaccel Learning (Altera Institute)",
        location: "Gurugram, IN",
        date: "November 2024 – Present",
        bullets: [
            "Developed a full-stack Learning Management System using Next.js, NestJS, and MongoDB, supporting internal admin and learner workflows.",
            "Improved backend performance by optimizing API logic and database queries, reducing average response latency by approximately 50%.",
            "Performed server load testing using k6 and integrated Redis caching to improve application stability during high traffic scenarios.",
            "Optimized frontend data fetching using debouncing and request cancellation, reducing redundant API calls and improving UI responsiveness.",
            "Implemented secure direct file uploads to AWS S3 using pre-signed URLs, improving file upload latency by approximately 30%."
        ],
        skills: ["Next.js", "NestJS", "TypeScript", "MongoDB", "Redis", "AWS S3", "k6"]
    },
    {
        role: "Software Development Engineer Intern",
        company: "Vilihi Virtual Services",
        location: "Noida, IN",
        date: "January 2024 – June 2024",
        bullets: [
            "Built a shared TypeScript Enums NPM package to maintain consistency between frontend and backend codebases, reducing approximately 20% of type-related issues.",
            "Set up Storybook for isolated development of React components to improve UI reliability and development efficiency.",
            "Boosted React component performance by minimizing unnecessary re-renders using useMemo, useCallback, and useRef."
        ],
        skills: ["MERN", "TypeScript", "React", "Redux", "Tailwind CSS", "Storybook"]
    },
]
const Slugs = [
    "typescript",
    "spring",
    "javascript",
    "dart",
    "java",
    "react",
    "angular",
    "flutter",
    "android",
    "html5",
    "css3",
    "springboot",
    "mongodb",
    "selenium",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "mysql",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
];
const EducationInfo = [
    {
        degree: "B.Tech",
        institution: "National Institute of Technology Kurukshetra",
        image: "nit-kurukshetra.png",
        grade: "7.88 CGPA",
        date: "August 2020 – June 2024",
        location: "Kurukshetra, Haryana"
    },
    {
        degree: "Senior Secondary (10+2) & High School (10)",
        institution: "Yaduvanshi Shiksha Niketan, Mahendragarh",
        grade: "93.2%",
        date: "2018 – 2020",
        location: "Mahendragarh, Haryana"
    }
]

export { Info, ProjectInfo, socialLinks, SkillInfo, ExperienceInfo, EducationInfo, Slugs };