import { useRef, useState } from "react";
import Tilt from "react-parallax-tilt";

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

type IconConfig = { url: string; whiteBg?: boolean };

const iconMap: Record<string, IconConfig> = {
    "React.js":                          { url: `${BASE}react/react-original.svg` },
    "Next.js":                           { url: `${BASE}nextjs/nextjs-original.svg`, whiteBg: true },
    "TypeScript":                        { url: `${BASE}typescript/typescript-original.svg` },
    "JavaScript":                        { url: `${BASE}javascript/javascript-original.svg` },
    "JavaScript (ES6+)":                 { url: `${BASE}javascript/javascript-original.svg` },
    "Redux":                             { url: `${BASE}redux/redux-original.svg` },
    "Tailwind CSS":                      { url: `${BASE}tailwindcss/tailwindcss-original.svg` },
    "Material UI":                       { url: `${BASE}materialui/materialui-original.svg` },
    "HTML5":                             { url: `${BASE}html5/html5-original.svg` },
    "Storybook":                         { url: `${BASE}storybook/storybook-original.svg` },
    "Node.js":                           { url: `${BASE}nodejs/nodejs-original.svg` },
    "NestJS":                            { url: `${BASE}nestjs/nestjs-original.svg` },
    "Express.js":                        { url: `${BASE}express/express-original.svg`, whiteBg: true },
    "FastAPI":                           { url: `${BASE}fastapi/fastapi-original.svg` },
    "MongoDB":                           { url: `${BASE}mongodb/mongodb-original.svg` },
    "PostgreSQL":                        { url: `${BASE}postgresql/postgresql-original.svg` },
    "MySQL":                             { url: `${BASE}mysql/mysql-original.svg` },
    "Redis":                             { url: `${BASE}redis/redis-original.svg` },
    "Celery":                            { url: `${BASE}celery/celery-plain.svg` },
    "Docker":                            { url: `${BASE}docker/docker-original.svg` },
    "Nginx":                             { url: `${BASE}nginx/nginx-original.svg` },
    "Vercel":                            { url: `${BASE}vercel/vercel-original.svg`, whiteBg: true },
    "Sentry":                            { url: `${BASE}sentry/sentry-original.svg` },
    "Python":                            { url: `${BASE}python/python-original.svg` },
    "C++":                               { url: `${BASE}cplusplus/cplusplus-original.svg` },
    "AWS (S3, ECS, Lambda, RDS, SQS)":  { url: `${BASE}amazonwebservices/amazonwebservices-plain-wordmark.svg` },
    "Git":                               { url: `${BASE}git/git-original.svg` },
};

const SkillIcon = ({ skill }: { skill: string }) => {
    const [err, setErr] = useState(false);
    const cfg = iconMap[skill];

    if (!cfg || err) {
        return (
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primaryColor to-accentColor flex-shrink-0 mt-0.5" />
        );
    }

    return (
        <span className={`flex-shrink-0 ${cfg.whiteBg ? "rounded-sm bg-white p-0.5" : ""}`}>
            <img
                className="w-[18px] h-[18px] object-contain block"
                src={cfg.url}
                alt=""
                onError={() => setErr(true)}
            />
        </span>
    );
};

const SkillCard = (props: any) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [spot, setSpot] = useState({ x: 0, y: 0, show: false });

    const onMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, show: true });
    };

    return (
        <Tilt
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            glareEnable
            glareMaxOpacity={0.05}
            glareColor="#38BDF8"
            glareBorderRadius="16px"
            scale={1.01}
            transitionSpeed={500}
            className="h-full"
        >
            <div
                ref={cardRef}
                onMouseMove={onMouseMove}
                onMouseLeave={() => setSpot((s) => ({ ...s, show: false }))}
                className="relative h-full rounded-2xl border border-[#38BDF815] bg-gradient-to-b from-cardBg/80 to-bgColor p-5 sm-mx:p-4 hover:border-[#38BDF835] hover:shadow-[0_8px_32px_0_#00000030] transition-all duration-300 overflow-hidden"
            >
                {/* Mouse spotlight */}
                <div
                    className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
                    style={{
                        opacity: spot.show ? 1 : 0,
                        background: `radial-gradient(220px circle at ${spot.x}px ${spot.y}px, rgba(56,189,248,0.07), transparent 70%)`,
                    }}
                />

                {/* Category title */}
                <h3 className="text-base font-semibold font-space mb-4 text-center relative z-20">
                    <span className="bg-gradient-to-r from-primaryColor to-accentColor bg-clip-text text-transparent">
                        {props.title}
                    </span>
                </h3>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2 justify-center relative z-20">
                    {(props.skills as string[]).map((skill, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-1.5 border border-[#38BDF818] bg-bgColor rounded-lg px-2.5 py-1.5 hover:border-primaryColor/30 hover:bg-[#38BDF806] transition-all duration-150"
                        >
                            <SkillIcon skill={skill} />
                            <span className="text-textColor text-xs font-mono leading-none whitespace-nowrap">
                                {skill}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Tilt>
    );
};

export default SkillCard;
