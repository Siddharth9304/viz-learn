import introImg from "../utils/images/introImg.png";
import introImgDark from "../utils/images/introImgDark.png";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Intro({ setIsNavBarOpen }) {
    const darkMode = useSelector((state) => state.themeSlice.darkMode);

    return (
        <div 
            id="Intro" 
            className="flex flex-col px-10 justify-center items-center pt-35 md:pt-50 md:flex-row z-30 overflow-hidden"
            onClick={() => setIsNavBarOpen(false)}
        >
            <motion.div 
                className="min-w-56 max-w-100 mt-6 mb-10 md:mr-25"
                initial={{ opacity: 0, x: -100 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-5xl/17 mb-4 md:text-6xl/17 sm:mb-6">
                    Visualize Data Structures and Algorithms
                </h2>
                <nav>
                    <a href="#dataStructures">
                        <motion.button 
                            className="text-2xl bg-[#007bffcf] rounded-2xl p-3 text-white cursor-pointer hover:bg-[#007bff]"
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }}
                        >
                            Get Started
                        </motion.button>
                    </a>
                </nav>
            </motion.div>
            
            <motion.img 
                src={darkMode ? introImgDark : introImg} 
                className={`border-15 ${darkMode ? "border-[#333333]" : "border-[#dddddd]"} sm:min-w-80 sm:max-w-160`}
                initial={{ opacity: 0, x: 100 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
            />
        </div>
    );
}
