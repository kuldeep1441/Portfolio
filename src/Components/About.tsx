import { Info, socialLinks } from "../User";
import Typewriter from "typewriter-effect";
import { IconDownload, IconArrowRight, IconChevronDown } from "@tabler/icons-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { getTotalExperienceYears } from "../User";

const buildStats = () => [
    { label: "Experience", end: getTotalExperienceYears(), decimals: 1, suffix: " yrs" },
    { label: "Projects Delivered", end: 15, decimals: 0, suffix: "+" },
    { label: "Latency Reduced", end: 75, decimals: 0, suffix: "%" },
    { label: "Infra Cost Cut", end: 12.5, decimals: 1, suffix: "%" },
];

const stats = buildStats();

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

const About = () => {
    const { ref: statsRef, inView: statsInView } = useInView({
        triggerOnce: true,
        threshold: 0.4,
    });

    return (
        <div
            id="About"
            className="relative min-h-screen flex items-center justify-around overflow-hidden px-16 md-mx:px-8 sm-mx:px-5 xs-mx:px-4 bs-mx:flex-col-reverse bs-mx:justify-center bs-mx:gap-12 bs-mx:pt-32 bs-mx:pb-16 lg-mx:px-10"
        >
            {/* Ambient background blobs */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-primaryColor opacity-[0.05] blur-[130px]" />
                <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-accentColor opacity-[0.06] blur-[130px]" />
            </div>

            {/* ── Left: Text content ── */}
            <div className="bs:w-[55%] flex flex-col gap-4 bs-mx:items-center bs-mx:text-center">

                <motion.div className="flex items-center gap-2" {...fadeUp(0.1)}>
                    <span className="h-px w-8 bg-primaryColor" />
                    <span className="text-primaryColor text-sm font-mono tracking-[0.2em] uppercase">
                        Hello
                    </span>
                </motion.div>

                <motion.h1
                    {...fadeUp(0.2)}
                    className="text-[3.8rem] lg-mx:text-5xl sm-mx:text-4xl xs-mx:text-3xl xsm-mx:text-2xl font-extrabold font-space leading-[1.1] tracking-tight"
                >
                    <span className="text-white">I'm </span>
                    <span className="bg-gradient-to-r from-primaryColor via-accentColor to-primaryColor bg-clip-text text-transparent shimmer-text">
                        {Info.name}
                    </span>
                </motion.h1>

                <motion.div
                    {...fadeUp(0.3)}
                    className="text-2xl lg-mx:text-xl sm-mx:text-lg xs-mx:text-base text-[#CBD5E1] font-medium flex items-center gap-2 flex-wrap bs-mx:justify-center"
                >
                    <span>Building</span>
                    <span className="text-primaryColor font-semibold">
                        <Typewriter
                            options={{
                                strings: Info.stack,
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 40,
                                delay: 60,
                            }}
                        />
                    </span>
                </motion.div>

                <motion.p
                    {...fadeUp(0.4)}
                    className="text-textColor text-[1.05rem] lg-mx:text-base sm-mx:text-sm leading-[1.85] max-w-[560px] bs-mx:text-center"
                >
                    {Info.bio}
                </motion.p>

                {/* ── Stat counters ── */}
                <motion.div
                    ref={statsRef}
                    {...fadeUp(0.45)}
                    className="grid grid-cols-4 sm-mx:grid-cols-2 gap-x-6 gap-y-4 mt-1 bs-mx:w-full"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <span className="text-2xl sm-mx:text-xl font-bold font-space text-white leading-none">
                                {statsInView ? (
                                    <CountUp
                                        end={stat.end}
                                        decimals={stat.decimals}
                                        duration={1.8}
                                        suffix={stat.suffix}
                                        useEasing
                                    />
                                ) : (
                                    <>0{stat.suffix}</>
                                )}
                            </span>
                            <span className="text-[10px] text-textColor font-mono uppercase tracking-[0.14em] mt-0.5">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* ── CTAs ── */}
                <motion.div
                    {...fadeUp(0.5)}
                    className="flex items-center gap-4 sm-mx:flex-col mt-2 bs-mx:w-full"
                >
                    <a
                        href={localStorage.getItem("portfolio_resume_b64") || "Kuldeep_CV.pdf"}
                        download={`${Info.name}_CV.pdf`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-primaryColor to-accentColor text-bgColor font-semibold font-space text-sm hover:shadow-[0_0_28px_0_#38BDF855] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 sm-mx:w-full"
                    >
                        <IconDownload size={16} />
                        Download Resume
                    </a>
                    <a
                        href="#Projects"
                        onClick={(e) => { e.preventDefault(); document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" }); }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-[#38BDF840] text-textColor font-medium text-sm hover:border-primaryColor hover:text-primaryColor hover:bg-[#38BDF808] transition-all duration-200 sm-mx:w-full"
                    >
                        View Projects
                        <IconArrowRight size={15} />
                    </a>
                </motion.div>

                {/* ── Social icons ── */}
                <motion.div {...fadeUp(0.6)} className="flex items-center gap-5 mt-1">
                    {socialLinks.map((s, i) => (
                        <a
                            key={i}
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-textColor hover:text-primaryColor hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <s.icon size={20} stroke={1.5} />
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* ── Right: Profile photo ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="bs:w-[40%] flex justify-center items-center"
            >
                <div className="relative">
                    {/* Ambient glow */}
                    <div className="absolute inset-0 scale-125 rounded-full bg-gradient-to-br from-primaryColor/10 to-accentColor/10 blur-3xl" />

                    {/* Slowly-rotating gradient ring */}
                    <div className="absolute inset-[-3px] rounded-full ring-spin"
                        style={{
                            background: "conic-gradient(#38BDF8 0deg, #14B8A6 120deg, #0F172A 200deg, #38BDF8 360deg)",
                        }}
                    />

                    {/* Inner ring + photo */}
                    <div className="relative rounded-full p-[3px] bg-bgColor">
                        <img
                            src={`${process.env.PUBLIC_URL}/profile.jpeg`}
                            alt="Kuldeep Tanwar"
                            className="w-72 h-72 lg-mx:w-56 lg-mx:h-56 sm-mx:w-48 sm-mx:h-48 rounded-full object-cover object-center"
                        />
                    </div>

                    {/* Experience badge */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                        className="absolute -bottom-3 -right-3 bg-cardBg border border-[#38BDF830] rounded-xl px-3 py-2 shadow-lg"
                    >
                        <div className="text-xs text-textColor font-mono">Experience</div>
                        <div className="text-lg font-bold text-primaryColor font-space">2.7 yrs</div>
                    </motion.div>

                    {/* Available badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
                        className="absolute -top-2 -left-2 bg-cardBg border border-[#38BDF830] rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-400 font-medium font-mono">Available</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Scroll-down indicator ── */}
            <motion.a
                href="#Experience"
                onClick={(e) => { e.preventDefault(); document.getElementById("Experience")?.scrollIntoView({ behavior: "smooth" }); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 group bs-mx:hidden cursor-pointer"
                aria-label="Scroll down"
            >
                <span className="text-[10px] text-textColor font-mono tracking-[0.25em] uppercase group-hover:text-primaryColor transition-colors duration-200">
                    scroll
                </span>
                <div className="flex flex-col items-center gap-0.5 scroll-pulse">
                    <IconChevronDown size={16} className="text-primaryColor -mb-2" />
                    <IconChevronDown size={16} className="text-primaryColor/50" />
                </div>
            </motion.a>
        </div>
    );
};

export default About;
