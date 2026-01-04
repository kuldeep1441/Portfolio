import { useEffect, useState } from "react";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Education from "./Education";
import Footer from "./Footer";
import Header from "./Header"
import { Loader } from "./Loader";
import Projects from "./Projects";
import Skills from "./Skills";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        }, 5000) 
    }, [])
    return <div className={` focus-visible:[&_button]:!outline-none min-h-[100dvh] ${loading?"flex":""} items-center overflow-hidden justify-center`}>
{   loading!==true?<>
    <Toaster/>
        <Header />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer/>
        </>:
        <Loader/>}
    </div>
};
export default HomePage;