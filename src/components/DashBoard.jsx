import { Link } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeFill } from "react-icons/ri";
import { BsLayoutSidebarInset } from "react-icons/bs";
import DarkLightMode from "./DarkLightMode"
import { useSelector} from "react-redux";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";


export default function DashBoard()
{
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const [isSideNavBarOpen, setIsSideNavBarOpen] = useState(false); 

    const dashBoardElement = useSelector((state)=>state.dashBoardElementSlice.dashBoardElement);

    useEffect(() => {
        // Function to check screen size
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSideNavBarOpen(false);
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
    }, [setIsSideNavBarOpen]);

    useEffect(()=>{
        if(isSideNavBarOpen)
        {
            document.body.style.overflow = "hidden";
        }
        else
        {
            document.body.style.overflow = "auto";
        }
    },[isSideNavBarOpen])
    
    return(
        <div className={`${darkMode?"bg-[#121212] text-[#e0e0e0]":"bg-white text-black"}`}>
        <div className="p-3 h-[84.95px] md:hidden">
            <div className={`rounded-2xl flex h-[72.95px] justify-between px-5 items-center ${darkMode?"bg-[#33333365]":"bg-[#dddddd65]"}`}>
                <motion.button
                className={`text-xl cursor-pointer mt-2 ${darkMode?"text-[#e0e0e0a4]":"text-[#000000a4]"}`}
                onClick={() => setIsSideNavBarOpen(!isSideNavBarOpen)}
                animate={{ rotate: isSideNavBarOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <BsLayoutSidebarInset size="1.5rem"/>
                </motion.button>  
                <div className={`text-md sm:text-lg flex flex-wrap gap-1 sm:gap-2 ${darkMode?"text-[#e0e0e0a4]":"text-[#000000a4]"}`}>
                    <div className={`${dashBoardElement!=""?"hidden":""}`}>Dashboard</div>
                    <nav className={`${dashBoardElement!=""?"":"hidden"}`}><Link to="/dashboard"><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>Dashboard</button></Link></nav>
                    <span className={`${dashBoardElement===""?"hidden":"inline"}`}>{">"}</span>
                    <span>{dashBoardElement}</span>
                </div>
                <motion.button
                className={`text-xl cursor-pointer mt-2 ${darkMode?"text-[#e0e0e0a4]":"text-[#000000a4]"}`}
                onClick={() => setIsNavBarOpen(!isNavBarOpen)}
                animate={{ rotate: isNavBarOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {isNavBarOpen ? <RiCloseLargeFill size="2em" /> : <RxHamburgerMenu size="2em" />}
                </motion.button>
            </div>
        </div>
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: isNavBarOpen ? "300px" : 0}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`flex flex-col items-center justify-evenly overflow-hidden m-3 rounded-2xl md:hidden ${darkMode?"bg-[#33333365]":"bg-[#dddddd65]"}`}
            >
            <nav><Link to="/"><button className="text-xl cursor-pointer">Home</button></Link></nav>
            <nav><Link to="/about"><button className="text-xl cursor-pointer">About</button></Link></nav>
            <DarkLightMode setIsNavBarOpen={setIsNavBarOpen}/>
        </motion.div>
        <motion.div
            id="toCloseSideNavBar"
            className={`fixed h-screen w-screen top-0 ${darkMode ? "bg-[#33333365]" : "bg-[#dddddd65]"} z-25`}
            onClick={(e) => {
                if (e.target.id === "toCloseSideNavBar") setIsSideNavBarOpen(false);
            }}
            initial={{ opacity: 0,  display: "none"}}
            animate={isSideNavBarOpen ? { opacity: 1, display: "flex" } : { opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
        >
        </motion.div>
        <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isSideNavBarOpen ? "260px" : 0, opacity: isSideNavBarOpen ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={`z-30 fixed h-screen top-0 flex lg:hidden overflow-x-hidden overflow-y-auto ${
            darkMode ? "bg-[#333333]" : "bg-[#dddddd]"
            }`}
        >
            <div className="flex flex-col w-full gap-8 p-4">
            {/* Sidebar Header */}
            <div className="flex justify-center items-center h-[72.95px] w-full">
                <h1 className="text-3xl font-bold">VizLearn</h1>
            </div>

            {/* Common Button Style */}
            {/** Defined the buttonStyle variable at the correct place inside JSX */}
            {/** It ensures all buttons share the same styling */}
            {/** Used `hover:bg-[#444]` for dark mode and `hover:bg-[#ccc]` for light mode */}
            {/** Applied `w-full` to maintain consistency across all buttons */}
            {/** Added `transition` to enhance the hover effect smoothly */}
            {(() => {
                const buttonStyle = `w-full py-2 text-lg rounded-xl cursor-pointer transition ${
                darkMode ? "hover:bg-[#444]" : "hover:bg-[#ccc]"
                }`;

                return (
                <>
                    {/* Data Structures Section */}
                    <div className="flex flex-col items-center">
                    <h3 className="text-xl text-center font-medium pb-2 w-35">Data Structures</h3>
                    <nav className="w-50">
                        <Link to="/dashBoard/stacks">
                        <button
                            className={`${buttonStyle} ${dashBoardElement === "Stack" ? "text-red-700" : ""}`}
                            onClick={() => setIsSideNavBarOpen(false)}
                        >
                            Stack
                        </button>
                        </Link>
                    </nav>
                    <nav className="w-50">
                        <Link to="/dashBoard/queues">
                        <button
                            className={`${buttonStyle} ${dashBoardElement === "Queue" ? "text-red-700" : ""}`}
                            onClick={() => setIsSideNavBarOpen(false)}
                        >
                            Queue
                        </button>
                        </Link>
                    </nav>
                    <nav className="w-50">
                        <Link to="/dashBoard/linkedlists">
                        <button
                            className={`${buttonStyle} ${dashBoardElement === "Linked List" ? "text-red-700" : ""}`}
                            onClick={() => setIsSideNavBarOpen(false)}
                        >
                            Linked List
                        </button>
                        </Link>
                    </nav>
                    </div>

                    {/* Algorithms Section */}
                    <div className="flex flex-col items-center">
                    <h3 className="text-xl text-center font-medium pb-2 w-35">Algorithms</h3>
                    <nav className="w-50">
                        <Link to="/dashBoard/infix-to-postfix">
                        <button
                            className={`${buttonStyle} ${dashBoardElement === "Infix to Postfix" ? "text-red-700" : ""}`}
                            onClick={() => setIsSideNavBarOpen(false)}
                        >
                            Infix to Postfix
                        </button>
                        </Link>
                    </nav>
                    <nav className="w-50">
                        <Link to="/dashBoard/linearsearch">
                        <button
                            className={`${buttonStyle} ${dashBoardElement === "Linear Search" ? "text-red-700" : ""}`}
                            onClick={() => setIsSideNavBarOpen(false)}
                        >
                            Linear Search
                        </button>
                        </Link>
                    </nav>
                    <nav className="w-50">
                        <Link to="/dashBoard/bfstraversal">
                        <button
                            className={`${buttonStyle} ${dashBoardElement === "BFS Traversal" ? "text-red-700" : ""}`}
                            onClick={() => setIsSideNavBarOpen(false)}
                        >
                            BFS Traversal
                        </button>
                        </Link>
                    </nav>
                    </div>
                </>
                );
            })()}
            </div>
        </motion.div>


        <div className={`flex flex-col gap-10 p-5 sm:px-18 md:px-0 md:grid md:grid-cols-[130px_130px_repeat(9,1fr)]  md:grid-rows-10 md:grid-flow-col md:h-[100vh] md:gap-0 md:p-0 ${darkMode?"bg-[#121212] text-[#e0e0e0]":"bg-white text-black"}`} onClick={()=>{setIsNavBarOpen(false)}}>
            <div className={`m-3 rounded-2xl hidden lg:flex md:col-start-3 md:col-end-12 md:row-start-1 md:row-end-2 ${darkMode?"bg-[#33333365]":"bg-[#dddddd65]"}`}>
                <div className="flex h-[100%] w-[100%] items-center">
                    <div className={`text-lg mr-auto ml-10 flex gap-2 ${darkMode?"text-[#e0e0e0a4]":"text-[#000000a4]"}`}>
                        <nav><Link to="/"><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>Home</button></Link></nav>
                        <span>{">"}</span>
                        <div className={`${dashBoardElement!=""?"hidden":""}`}>Dashboard</div>
                        <nav className={`${dashBoardElement!=""?"":"hidden"}`}><Link to="/dashboard"><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>Dashboard</button></Link></nav>
                        <span className={`${dashBoardElement===""?"hidden":"inline"}`}>{">"}</span>
                        <span>{dashBoardElement}</span>
                    </div>
                    <DarkLightMode/>
                    <nav><Link to="/about"><button className="text-xl cursor-pointer mx-10">About</button></Link></nav>
                </div>
            </div>


            {/* NavBar between md and lg */}
            
            <div className={`m-3 rounded-2xl justify-between px-5 md:col-start-1 md:col-end-12 md:row-start-1 md:row-end-2 items-center ${darkMode?"bg-[#33333365]":"bg-[#dddddd65]"} hidden md:flex lg:hidden`}>
                <motion.button
                className={`text-xl cursor-pointer mt-2 ${darkMode?"text-[#e0e0e0a4]":"text-[#000000a4]"}`}
                onClick={() => setIsSideNavBarOpen(!isSideNavBarOpen)}
                animate={{ rotate: isSideNavBarOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <BsLayoutSidebarInset size="1.5rem"/>
                </motion.button>  
                <div className={`text-md sm:text-lg flex flex-wrap gap-1 sm:gap-2 ${darkMode?"text-[#e0e0e0a4]":"text-[#000000a4]"}`}>
                    <nav><Link to="/"><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>Home</button></Link></nav>
                    <span>{">"}</span>
                    <div className={`${dashBoardElement!=""?"hidden":""}`}>Dashboard</div>
                    <nav className={`${dashBoardElement!=""?"":"hidden"}`}><Link to="/dashboard"><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>Dashboard</button></Link></nav>
                    <span className={`${dashBoardElement===""?"hidden":"inline"}`}>{">"}</span>
                    <span>{dashBoardElement}</span>
                </div>
                <div className="flex gap-10 items-center">
                <DarkLightMode/>
                <nav><Link to="/about"><button className="text-xl cursor-pointer">About</button></Link></nav>
                </div>
            </div>
            
            <div className={`hidden lg:flex md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-11 overflow-y-auto rounded-r-3xl ${darkMode?"bg-[#33333365]":"bg-[#dddddd65]"}`}>
                <div className="flex flex-col w-[100%] gap-10 p-3">
                    <div className="flex justify-center items-center h-[72.95px] w-[100%]">
                        <h1 className="text-3xl font-bold">VizLearn</h1>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl text-center font-medium pb-2">Data Structures</h3>
                        <nav><Link to="/dashBoard/stacks"><button className={`w-[100%] py-2 text-lg rounded-2xl cursor-pointer ${dashBoardElement==="Stack"?"text-red-700":""} ${darkMode?"hover:bg-[#333333]":"hover:bg-[#dddddd]"}`} >Stack</button></Link></nav>
                        <nav><Link to="/dashBoard/queues"><button className={`w-[100%] py-2 text-lg rounded-2xl cursor-pointer ${dashBoardElement==="Queue"?"text-red-700":""} ${darkMode?"hover:bg-[#333333]":"hover:bg-[#dddddd]"}`} >Queue</button></Link></nav>
                        <nav><Link to="/dashBoard/linkedlists"><button className={`w-[100%] py-2 text-lg rounded-2xl cursor-pointer ${dashBoardElement==="Linked List"?"text-red-700":""} ${darkMode?"hover:bg-[#333333]":"hover:bg-[#dddddd]"}`} >Linked List</button></Link></nav>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-xl text-center font-medium pb-2 ">Algorithms</h3>
                        <nav><Link to="/dashBoard/infix-to-postfix"><button className={`w-[100%] py-2 text-lg rounded-2xl cursor-pointer ${dashBoardElement==="Infix to Postfix"?"text-red-700":""} ${darkMode?"hover:bg-[#333333]":"hover:bg-[#dddddd]"}`} >Infix to Postfix</button></Link></nav>
                        <nav><Link to="/dashBoard/linearsearch"><button className={`w-[100%] py-2 text-lg rounded-2xl cursor-pointer ${dashBoardElement==="Linear Search"?"text-red-700":""} ${darkMode?"hover:bg-[#333333]":"hover:bg-[#dddddd]"}`} >Linear Search</button></Link></nav>
                        <nav><Link to="/dashBoard/bfs-traversal"><button className={`w-[100%] py-2 text-lg rounded-2xl cursor-pointer ${dashBoardElement==="BFS Traversal"?"text-red-700":""} ${darkMode?"hover:bg-[#333333]":"hover:bg-[#dddddd]"}`} >BFS Traversal</button></Link></nav>
                    </div>
                </div>
            </div>

            <Outlet/>
        </div>
        </div>
    )
}