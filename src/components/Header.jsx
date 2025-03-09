import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import DarkLightModeForHome from "./DarkLightModeForHome";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Header({ navBarControls, isAbout }) {
    const darkMode = useSelector((state) => state.themeSlice.darkMode);
    const [isNavBarOpen, setIsNavBarOpen] = navBarControls;


    useEffect(() => {
        // Function to check screen size
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsNavBarOpen(false);
            }
        };
    
        // Add event listener
        window.addEventListener("resize", handleResize);
    
        // Call handleResize initially to check if lg is already active
        handleResize();
    
        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setIsNavBarOpen]);


    useEffect(()=>{
        if(isNavBarOpen)
        {
            document.body.style.overflow = "hidden";
        }
        else
        {
            document.body.style.overflow = "auto";
        }
    },[isNavBarOpen])

    return (
        <>
            {/* Desktop Navbar */}
            <div className={`${darkMode ? "bg-[#121212] shadow-[#33333365]" : "bg-white"} shadow-xl hidden h-20 items-center gap-9 fixed w-full top-0 z-30 lg:flex`}>
                <h1 className="text-4xl font-bold ml-20 mr-auto">VizLearn</h1>
                <DarkLightModeForHome />
                <nav className="flex gap-6 text-xl">
                    <a href="#Intro" className={`cursor-pointer ${isAbout?"hidden":""}`}>Home</a>
                    <Link to="/" className={`cursor-pointer ${isAbout?"":"hidden"}`}>Home</Link>
                    <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                    <a href="#dataStructures" className={`cursor-pointer ${isAbout?"hidden":""}`}>Data Structures</a>
                    <a href="#algorithms" className={`cursor-pointer ${isAbout?"hidden":""}`}>Algorithms</a>
                    <Link to="/about" className="cursor-pointer mr-20">About</Link>
                </nav>
            </div>

            {/* Mobile Navbar */}
            <div className={`${darkMode ? "bg-[#121212] shadow-[#33333365]" : "bg-white"} flex h-20 items-center shadow-xl gap-10 fixed w-[100%] top-0 z-20 lg:hidden`}>
                <h1 className="text-4xl font-bold ml-5 sm:ml-10 mr-auto">VizLearn</h1>
                <div className="hidden sm:block"><DarkLightModeForHome /></div>
                <motion.button
                    className="text-xl cursor-pointer mr-5 sm:mr-10 h-[46px] w-[46px] flex justify-center items-center"
                    onClick={() => setIsNavBarOpen(!isNavBarOpen)}
                    animate={{ rotate: isNavBarOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {isNavBarOpen ? <RiCloseLargeFill size="2em" /> : <RxHamburgerMenu size="2.3em" />}
                </motion.button>
            </div>

            {/* Background Overlay */}
            <AnimatePresence>
                {isNavBarOpen && (
                    <motion.div
                        id="dropDown"
                        className={`w-[100vw] h-[100vh] ${darkMode ? "bg-[#33333340]" : "bg-[#dddddd40]"} fixed top-0 lg:hidden`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "linear" }}
                        onClick={(e) => {
                            if (e.target.id === "dropDown") setIsNavBarOpen(false);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isNavBarOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "300px" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "linear" }}
                        className={`${darkMode ? "bg-[#33333365]" : "bg-[#dddddd65]"} backdrop-blur-lg top-20 fixed w-full flex flex-col items-center justify-evenly overflow-hidden z-15 lg:hidden`}
                    >
                        <div className="sm:hidden"><DarkLightModeForHome /></div>
                        <a href="#Intro" className={`text-xl cursor-pointer ${isAbout?"hidden":""}`} onClick={() => setIsNavBarOpen(false)}>Home</a>
                        <Link to="/" className={`text-xl cursor-pointer ${isAbout?"":"hidden"}`} onClick={() => setIsNavBarOpen(false)}>Home</Link>
                        <Link to="/dashboard" className="text-xl cursor-pointer" onClick={() => setIsNavBarOpen(false)}>Dashboard</Link>
                        <a href="#dataStructures" className={`text-xl cursor-pointer ${isAbout?"hidden":""}`} onClick={() => setIsNavBarOpen(false)}>Data Structures</a>
                        <a href="#algorithms" className={`text-xl cursor-pointer ${isAbout?"hidden":""}`} onClick={() => setIsNavBarOpen(false)}>Algorithms</a>
                        <Link to="/about" className="text-xl cursor-pointer" onClick={() => setIsNavBarOpen(false)}>About</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
