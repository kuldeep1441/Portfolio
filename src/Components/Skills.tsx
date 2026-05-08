import { SkillInfo } from "../User";
import SkillCard from "./SkillCard";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const allTech = SkillInfo.flatMap((s: any) => s.skills as string[]);
const marqueeItems = [...allTech, ...allTech];

const TechMarquee = () => (
    <div className="relative overflow-hidden mb-12 py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex gap-3 w-max cursor-default">
            {marqueeItems.map((tech, i) => (
                <span key={i} className="flex-shrink-0 text-[11px] font-mono px-3 py-1.5 rounded-lg border border-[#38BDF815] bg-[#38BDF806] text-textColor whitespace-nowrap hover:text-primaryColor hover:border-primaryColor/30 transition-colors duration-200">
                    {tech}
                </span>
            ))}
        </div>
    </div>
);

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const Skills = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="px-16 md-mx:px-6 sm-mx:px-4 my-16" id="Skills">
            <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-12"
            >
                <div className="flex items-center gap-3">
                    <span className="text-primaryColor font-mono text-sm tracking-widest">04.</span>
                    <h2 className="text-3xl sm-mx:text-2xl xs-mx:text-xl font-bold font-space text-white">Skills</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#38BDF820] to-transparent" />
            </motion.div>

            <TechMarquee />

            {/* 50-50 grid — two equal columns */}
            <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="grid grid-cols-2 sm-mx:grid-cols-1 gap-4"
            >
                {SkillInfo.map((skill: any, index: number) => (
                    <motion.div key={index} variants={item}>
                        <SkillCard title={skill.title} skills={skill.skills} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;
