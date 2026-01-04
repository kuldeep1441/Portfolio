// import { IconHexagonLetterK } from "@tabler/icons-react";
import SideBar from "./SideBar";
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import { useEffect, useState } from "react";

const links = ["About", "Experience", "Skills", "Projects", "Education", "Contact"];
const navLinks = (col: Boolean, clicked: any) => {
    const handleClick = () => {
        if (clicked) clicked();
    }
    return links.map((link, index) => {
        return <a key={index} onClick={handleClick} className={`${col ? 'flex flex-col items-center' : ''} text-textColor text-lg font-mono hover:text-primaryColor`} href={`#${link}`}><span className="text-primaryColor"> </span>{link}</a>
    })
}

const IconHexagonLetterPortfolio = () => (
    <div className="flex justify-center items-center">
        <div className="relative w-24 h-14 bg-green-400">
            <div className="absolute -top-3.5 w-0 h-0 border-l-12 border-r-12 border-b-[14px] border-l-transparent border-r-transparent border-b-green-400"></div>
            <div className="absolute -bottom-3.5 w-0 h-0 border-l-12 border-r-12 border-t-[14px] border-l-transparent border-r-transparent border-t-green-400"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                Portfolio
            </span>
        </div>
    </div>
);




const Header = () => {
    const isMobile = useMediaQuery(`(max-width: ${em(476)})`);
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [shadow, setShadow] = useState(false);
    const controlNavbar = () => {
        if (window.scrollY > lastScrollY && window.scrollY > 70) setShow(false);
        else setShow(true);
        if (window.scrollY > 70) setShadow(true);
        else setShadow(false);
        setLastScrollY(window.scrollY);
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    })
    return (
        <nav className={`flex ${show ? "translate-y-0" : "-translate-y-28"} ${shadow ? "shadow-[0px_10px_30px_-10px_#020c1b]" : ""} transition-transform duration-500 ease-in-out fixed w-full z-10 bg-bgColor h-28  px-10  justify-between items-center xs-mx:px-4 xs-mx:h-20 `}>

            <IconHexagonLetterPortfolio />
            <div className="bs:flex gap-8 hidden">
                {navLinks(false, null)}
            </div>
            <SideBar />
        </nav>
    );
}
export default Header;
export { navLinks };