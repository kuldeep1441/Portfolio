import { EducationInfo } from "../User";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IconSchool, IconMapPin, IconCalendar, IconStar } from "@tabler/icons-react";
import { useScrollDirection } from "../hooks/useScrollDirection";

const item = {
    hidden: { opacity: 0, x: -24 },
    show: (delay: number) => ({
        opacity: 1, x: 0,
        transition: { duration: 0.55, ease: "easeOut" as const, delay },
    }),
};

const Education = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const scrollDir = useScrollDirection();
    const accentOrigin = scrollDir === "up" ? "origin-bottom" : "origin-top";

    return (
        <section className="px-16 mx-20 md-mx:px-6 sm-mx:px-4 lg-mx:mx-0 mt-6 mb-16" id="Education">
            <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-12"
            >
                <div className="flex items-center gap-3">
                    <span className="text-primaryColor font-mono text-sm tracking-widest">03.</span>
                    <h2 className="text-3xl sm-mx:text-2xl xs-mx:text-xl font-bold font-space text-white">Education</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-[#38BDF820] to-transparent" />
            </motion.div>

            <div ref={ref} className="relative">
                {/*
                  Line at left-6 = 24px.
                  Degree dot w-5 (20px) at left-[14px]  → center = 14+10 = 24px ✓
                  School dot w-3.5 (14px) at left-[17px] → center = 17+7  = 24px ✓
                  md: line left-5 = 20px
                    Degree dot left-[10px] → center = 10+10 = 20px ✓
                    School dot left-[13px] → center = 13+7  = 20px ✓
                */}
                <div className="absolute left-6 md-mx:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primaryColor/30 via-accentColor/20 to-transparent" />

                <div className="flex flex-col gap-6">
                    {EducationInfo.map((edu: any, index: number) => {
                        const isDegree = edu.type === "degree";
                        return (
                            <motion.div
                                key={index}
                                custom={index * 0.15}
                                initial="hidden"
                                animate={inView ? "show" : "hidden"}
                                variants={item}
                                className="relative pl-16 md-mx:pl-14 group"
                            >
                                {/* Timeline dot — precisely centered on the line */}
                                <div className={`absolute top-6 z-10 rounded-full border-2 border-primaryColor bg-bgColor flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_12px_0_#38BDF860] ${
                                    isDegree
                                        ? "left-[14px] md-mx:left-[10px] w-5 h-5"
                                        : "left-[17px] md-mx:left-[13px] w-3.5 h-3.5"
                                }`}>
                                    <div className={`rounded-full bg-primaryColor ${isDegree ? "w-2 h-2" : "w-1.5 h-1.5"}`} />
                                </div>

                                {/* Card */}
                                <div className={`relative border bg-gradient-to-br from-cardBg to-bgColor rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_40px_0_#00000050] ${
                                    isDegree
                                        ? "border-[#38BDF828] hover:border-[#38BDF850] p-6 sm-mx:p-4"
                                        : "border-[#38BDF814] hover:border-[#38BDF828] p-4 sm-mx:p-3"
                                }`}>

                                    {/* Left accent bar */}
                                    <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-gradient-to-b from-primaryColor to-accentColor scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ${accentOrigin}`} />

                                    {/* Header row */}
                                    <div className="flex items-start gap-3 mb-3">
                                        {edu.image ? (
                                            <div className={`flex-shrink-0 rounded-xl border border-[#38BDF820] bg-white flex items-center justify-center overflow-hidden ${isDegree ? "w-12 h-12 sm-mx:w-10 sm-mx:h-10" : "w-9 h-9"}`}>
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/${edu.image}`}
                                                    alt={edu.institution}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                />
                                            </div>
                                        ) : (
                                            <div className={`rounded-xl border border-[#38BDF820] bg-[#38BDF808] flex items-center justify-center flex-shrink-0 ${isDegree ? "w-12 h-12 sm-mx:w-10 sm-mx:h-10" : "w-9 h-9"}`}>
                                                <IconSchool size={isDegree ? 20 : 15} className={isDegree ? "text-primaryColor" : "text-primaryColor/70"} />
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 flex-wrap mb-0.5">
                                                <h3 className={`text-white font-semibold font-space leading-snug ${isDegree ? "text-xl sm-mx:text-lg xs-mx:text-base" : "text-base sm-mx:text-sm"}`}>
                                                    {edu.degree}
                                                </h3>
                                                <div className="flex gap-1.5 flex-wrap">
                                                    {edu.board && (
                                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#38BDF825] bg-[#38BDF808] text-primaryColor/80">
                                                            {edu.board}
                                                        </span>
                                                    )}
                                                    {edu.badge && (
                                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#14B8A630] bg-[#14B8A60A] text-accentColor">
                                                            {edu.badge}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className={`text-primaryColor font-medium ${isDegree ? "text-sm" : "text-xs"}`}>
                                                {edu.institution}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Meta row */}
                                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                                        {edu.date && (
                                            <div className="flex items-center gap-1.5 text-xs text-textColor font-mono">
                                                <IconCalendar size={11} className="text-primaryColor/60 flex-shrink-0" />
                                                <span>{edu.date}</span>
                                            </div>
                                        )}
                                        {edu.grade && (
                                            <div className="flex items-center gap-1.5 text-xs font-mono">
                                                <IconStar size={11} className="text-accentColor/80 flex-shrink-0" />
                                                <span className="text-accentColor font-semibold">{edu.grade}</span>
                                            </div>
                                        )}
                                        {edu.location && (
                                            <div className="flex items-center gap-1.5 text-xs text-textColor font-mono">
                                                <IconMapPin size={11} className="text-primaryColor/60 flex-shrink-0" />
                                                <span>{edu.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {edu.points && edu.points.length > 0 && (
                                        <ul className="flex flex-col gap-2 mt-3">
                                            {edu.points.map((point: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-textColor leading-relaxed md-mx:text-xs">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primaryColor flex-shrink-0 mt-[6px]" />
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Education;
