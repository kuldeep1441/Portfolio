import SideBar from "./SideBar";
import { useCallback, useEffect, useRef, useState } from "react";

const links = ["About", "Experience", "Skills", "Projects", "Contact"];

export const navLinks = (
    col: boolean,
    clicked: (() => void) | null,
    activeSection?: string
) => {
    const handleClick = () => { if (clicked) clicked(); };
    return links.map((link, index) => (
        <a
            key={index}
            onClick={handleClick}
            href={`#${link}`}
            className={`${col ? "flex flex-col items-center" : ""} relative text-sm font-space font-medium tracking-wide transition-colors duration-200 group ${
                activeSection === link
                    ? "text-primaryColor"
                    : "text-textColor hover:text-primaryColor"
            }`}
        >
            {col && (
                <span className="text-primaryColor font-mono text-[10px] mb-0.5">
                    0{index + 1}.
                </span>
            )}
            {link}
            <span
                className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-primaryColor to-accentColor transition-all duration-300 ${
                    activeSection === link ? "w-full" : "w-0 group-hover:w-full"
                }`}
            />
        </a>
    ));
};

const Logo = () => (
    <a href="#About" className="flex justify-center items-center cursor-pointer group">
        <div className="relative flex items-center justify-center">
            <svg className="w-11 h-13 xs-mx:w-9 xs-mx:h-11" viewBox="0 0 100 115" fill="none">
                <polygon
                    points="50,3 97,28 97,87 50,112 3,87 3,28"
                    stroke="#38BDF8"
                    strokeWidth="4"
                    fill="transparent"
                    className="group-hover:fill-[#38BDF808] transition-all duration-300"
                />
            </svg>
            <span className="absolute text-primaryColor font-bold text-lg font-space tracking-wider">
                KT
            </span>
        </div>
    </a>
);

const Header = () => {
    const [show, setShow] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("About");
    const lastScrollY = useRef(0);

    const controlNavbar = useCallback(() => {
        const current = window.scrollY;
        if (current > lastScrollY.current && current > 70) setShow(false);
        else setShow(true);
        setScrolled(current > 40);
        lastScrollY.current = current;
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar, { passive: true });
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [controlNavbar]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-20% 0px -70% 0px" }
        );
        links.forEach((link) => {
            const el = document.getElementById(link);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <nav
            className={`flex ${show ? "translate-y-0" : "-translate-y-28"} transition-transform duration-500 ease-in-out fixed w-full z-50 h-20 xs-mx:h-16 px-10 xs-mx:px-4 justify-between items-center ${
                scrolled
                    ? "bg-[#0F172A]/90 backdrop-blur-xl border-b border-[#38BDF810] shadow-[0_4px_30px_0_#00000040]"
                    : "bg-transparent"
            }`}
        >
            <Logo />
            <div className="bs:flex gap-8 hidden">
                {navLinks(false, null, activeSection)}
            </div>
            <SideBar activeSection={activeSection} />
        </nav>
    );
};

export default Header;
export { navLinks as default_navLinks };
