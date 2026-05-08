import { Info, socialLinks } from "../User";
import { motion } from "framer-motion";

const techStack = ["React", "TypeScript", "Tailwind CSS", "Framer Motion"];

const Footer = () => (
    <footer className="mt-24 pb-10 flex flex-col items-center gap-5 font-mono">
        {/* Divider */}
        <div className="w-full max-w-5xl mx-auto px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-[#38BDF825] to-transparent" />
        </div>

        {/* Name + tagline */}
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-1.5 mt-4"
        >
            <div className="text-2xl font-bold font-space bg-gradient-to-r from-primaryColor to-accentColor bg-clip-text text-transparent">
                {Info.name}
            </div>
            <div className="text-textColor text-xs tracking-widest uppercase">
                building things for web and mobile apps
            </div>
        </motion.div>

        {/* Social icons */}
        <div className="flex items-center gap-5">
            {socialLinks.map((s, i) => (
                <a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-textColor hover:text-primaryColor hover:-translate-y-0.5 transition-all duration-200"
                >
                    <s.icon stroke={1.5} size={20} />
                </a>
            ))}
        </div>

        {/* Built with */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-textColor text-[11px]">Designed &amp; built with</span>
            {techStack.map((tech, i) => (
                <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[#38BDF820] text-[11px]">·</span>}
                    <span className="text-primaryColor text-[11px] hover:text-accentColor transition-colors duration-200 cursor-default">
                        {tech}
                    </span>
                </span>
            ))}
        </div>

        {/* Copyright */}
        <p className="text-textColor/50 text-[11px] text-center">
            &copy; {new Date().getFullYear()} {Info.name} &nbsp;·&nbsp; All rights reserved
        </p>
    </footer>
);

export default Footer;
