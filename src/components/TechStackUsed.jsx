import { FaReact } from "react-icons/fa";
import { TbBrandTailwind } from "react-icons/tb";
import { TbBrandFramerMotion } from "react-icons/tb";
import { motion } from "framer-motion";


export default function TechStackUsed()
{
    return(
            <ul className="flex gap-20 flex-wrap justify-center">
                <li><motion.div
                    className="sm:w-100 rounded-xl sm:h-55 gap-3 p-5 flex flex-col justify-around bg-gradient-to-r from-[#1E90FF] via-[#61DAFB] to-[#00BFFF] bg-[length:200%_200%]"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                    <div className="flex items-center gap-3 justify-center">
                    <FaReact size={"4em"}/><span className="text-4xl ">React JS</span>
                    </div>
                    <p className="text-xl text-center">React.js is a JavaScript library for building interactive UIs with reusable components</p>
                </motion.div></li>
                <li><motion.div
                    className="sm:w-100 rounded-xl sm:h-55 p-5 gap-3 flex flex-col justify-around bg-gradient-to-r from-[#0EA5E9] via-[#06B6D4] to-[#38BDF8] bg-[length:200%_200%]"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                    <div className="flex items-center gap-3 justify-center">
                    <TbBrandTailwind size={"4em"}/><span className="text-4xl ">Tailwind CSS</span>
                    </div>
                    <p className="text-xl text-center">Tailwind CSS is a utility-first CSS framework for fast and customizable styling</p>
                </motion.div></li>
                <li><motion.div
                    className="sm:w-100 rounded-xl sm:h-55 p-5 gap-3 flex flex-col justify-around bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-[length:200%_200%]"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                    <div className="flex items-center gap-3 justify-center">
                    <TbBrandFramerMotion size={"4em"}/><span className="text-4xl ">Framer-Motion</span>
                    </div>
                    <p className="text-xl text-center">Framer Motion is a React library for smooth animations and interactive UI effects</p>
                </motion.div></li>
            </ul>
    )
}