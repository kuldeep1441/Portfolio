import { ProjectInfo } from "../User";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13 } },
};

const item = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const Projects = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

    return (
        <section className="px-16 md-mx:px-6 sm-mx:px-4 my-16" id="Projects">
            <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-12"
            >
                <div className="flex items-center gap-3">
                    <span className="text-primaryColor font-mono text-sm tracking-widest">05.</span>
                    <h2 className="text-3xl sm-mx:text-2xl xs-mx:text-xl font-bold font-space text-white">Projects</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#38BDF820] to-transparent" />
            </motion.div>

            <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="grid grid-cols-3 lg-mx:grid-cols-2 sm-mx:grid-cols-1 gap-6 md-mx:gap-4 items-stretch"
            >
                {ProjectInfo.map((project: any, index: number) => (
                    <motion.div
                        key={index}
                        variants={item}
                        className="flex flex-col"
                    >
                        <ProjectCard
                            title={project.title}
                            desc={project.desc}
                            points={project.points}
                            image={project.image}
                            live={project.live}
                            website={project.website}
                            playStore={project.playStore}
                            github={project.github}
                            technologies={project.technologies}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Projects;
