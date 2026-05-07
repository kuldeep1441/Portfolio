import { ExperienceInfo, calcDuration } from "../User";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const item = {
    hidden: { opacity: 0, x: -24 },
    show: (delay: number) => ({
        opacity: 1, x: 0,
        transition: { duration: 0.55, ease: "easeOut" as const, delay },
    }),
};

const Experience = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section className="px-16 mx-20 md-mx:px-6 sm-mx:px-4 lg-mx:mx-0 mt-6 mb-16" id="Experience">
            <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-12"
            >
                <div className="flex items-center gap-3">
                    <span className="text-primaryColor font-mono text-sm tracking-widest">02.</span>
                    <h2 className="text-3xl sm-mx:text-2xl xs-mx:text-xl font-bold font-space text-white">Experience</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#38BDF820] to-transparent" />
            </motion.div>

            <div ref={ref} className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primaryColor/30 via-accentColor/20 to-transparent md-mx:left-4" />

                <div className="flex flex-col gap-8">
                    {ExperienceInfo.map((exp: any, index: number) => (
                        <motion.div
                            key={index}
                            custom={index * 0.15}
                            initial="hidden"
                            animate={inView ? "show" : "hidden"}
                            variants={item}
                            className="relative pl-16 md-mx:pl-12 group"
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-[13px] top-6 w-5 h-5 md-mx:left-[9px] rounded-full border-2 border-primaryColor bg-bgColor flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_12px_0_#38BDF860]">
                                <div className="w-2 h-2 rounded-full bg-primaryColor" />
                            </div>

                            {/* Card */}
                            <div className="relative border border-[#38BDF818] bg-gradient-to-br from-cardBg to-bgColor rounded-2xl p-6 sm-mx:p-4 hover:border-[#38BDF840] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_0_#00000050] transition-all duration-300 overflow-hidden">

                                {/* Left accent bar */}
                                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-gradient-to-b from-primaryColor to-accentColor scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                                {/* Header */}
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-xl border border-[#38BDF820] bg-white flex items-center justify-center flex-shrink-0 overflow-hidden sm-mx:w-10 sm-mx:h-10">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/${exp.company}.png`}
                                            alt={exp.company}
                                            className="w-full h-full object-contain p-1"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white text-xl font-semibold font-space sm-mx:text-lg xs-mx:text-base leading-tight">
                                            {exp.role}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                            <span className="text-primaryColor text-sm font-medium">{exp.company}</span>
                                            <span className="text-textColor text-xs">·</span>
                                            <span className="text-textColor text-xs font-mono">{exp.date}</span>
                                            <span className="text-textColor text-xs">·</span>
                                            {/* Auto-updating duration */}
                                            <span className="text-accentColor text-xs font-mono font-semibold">
                                                {calcDuration(exp.startDate, exp.endDate)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bullet points */}
                                <ul className="flex flex-col gap-2 mb-5">
                                    {exp.points.map((point: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-textColor leading-relaxed md-mx:text-xs">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primaryColor flex-shrink-0 mt-[6px]" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1.5">
                                    {exp.skills.map((skill: string, i: number) => (
                                        <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-md border border-[#38BDF825] bg-[#38BDF808] text-primaryColor">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
