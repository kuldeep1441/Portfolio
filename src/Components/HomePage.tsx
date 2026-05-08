import { useEffect, useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Footer from "./Footer";
import Header from "./Header";
import { Loader } from "./Loader";
import Mail from "./Mail";
import Projects from "./Projects";
import Skills from "./Skills";
import Social from "./Social";
import { Toaster } from "react-hot-toast";
import { IconArrowUp } from "@tabler/icons-react";
import CONFIG from "../config";

/** Dot-grid overlay — toggle via CONFIG.showDotGrid */
const DotGrid = () => (
    <div
        className="fixed inset-0 -z-10 pointer-events-none select-none"
        style={{
            backgroundImage: "radial-gradient(rgba(56, 189, 248, 0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
        }}
    />
);

/**
 * Grain/noise texture overlay — adds depth and tactile quality.
 * Toggle via CONFIG.showNoise. SVG feTurbulence filter = zero-cost,
 * no external image required.
 */
const NoiseOverlay = () => (
    <div
        className="fixed inset-0 z-[99998] pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
        style={{ opacity: 0.028 }}
    >
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
        >
            <filter id="portfolio-noise">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.68"
                    numOctaves="4"
                    stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#portfolio-noise)" />
        </svg>
    </div>
);

/** Thin gradient progress bar pinned to top of viewport */
const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]">
            <div
                className="h-full bg-gradient-to-r from-primaryColor to-accentColor"
                style={{ width: `${progress}%`, transition: "width 60ms linear" }}
            />
        </div>
    );
};

/** Floating back-to-top button */
const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={`fixed bottom-8 md:right-20 right-4 z-50 w-10 h-10 rounded-xl bg-cardBg border border-[#38BDF830] text-primaryColor flex items-center justify-center hover:bg-[#38BDF810] hover:border-primaryColor/50 hover:shadow-[0_0_20px_0_#38BDF830] transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
            <IconArrowUp size={16} />
        </button>
    );
};

const HomePage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 4500);
        return () => clearTimeout(t);
    }, []);

    if (loading) {
        return (
            <div className="min-h-[100dvh] flex items-center justify-center overflow-hidden bg-bgColor">
                <Loader />
            </div>
        );
    }

    return (
        <div className="focus-visible:[&_button]:!outline-none min-h-[100dvh] bg-bgColor">
            <ScrollProgress />
            {CONFIG.showDotGrid && <DotGrid />}
            {CONFIG.showNoise && <NoiseOverlay />}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#1E293B",
                        color: "#F1F5F9",
                        border: "1px solid #38BDF820",
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "13px",
                    },
                }}
            />
            <Header />
            <main className="max-w-[1400px] mx-auto">
                <About />
                <Experience />
                <Education />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
            <Mail />
            <Social />
            <ScrollToTop />
        </div>
    );
};

export default HomePage;
