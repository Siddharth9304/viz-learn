import ToggleButton from "./ToggleButton";
import React, { useEffect, useState } from "react";
import Stack from "../utils/Stack";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDashBoardElement } from "../dashboardElementSlice"

export default function StackVisualizer()
{
    const [stack] = useState(new Stack());
    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [historyArr, setHistoryArr] = useState([]);
    const [stackSize, setStackSize] = useState("");
    const [isButtonOn, setIsButtonOn] = useState(false);
    const [overflow, setOverflow] = useState(false);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setDashBoardElement("Stack"))
    },[]);

    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    const handlePush = () => {
    if(inputValue!=="")
    {
        if(isButtonOn && (stack.getStackLength() === Number(stackSize)))
        {
            setOverflow(!overflow);
            setHistoryArr([...historyArr, ["overflow",inputValue]]);
        }
        else
        {
            stack.push(inputValue);
            setHistoryArr([...historyArr, ["push",inputValue]]);
            setElements(stack.getStack());
        }
        setInputValue("");
    }
    };

    const handlePop = () => {
    if (!stack.isEmpty()) {
        setHistoryArr([...historyArr, ["pop",stack.pop()]]);
        setElements(stack.getStack());
    }
    };

    const handleClear = () => {
    stack.clear();
    setHistoryArr([]);
    setElements([]);
    };


    const handleSizeButton = () => {
        if(isButtonOn)
            setStackSize("");
        setIsButtonOn(!isButtonOn);
    };
      
    return(
        <>
            {/* Stack Controls */}
            <div className="border p-5 flex flex-col gap-8 rounded md:col-start-1 md:col-end-5 lg:col-start-3 lg:col-end-7 md:row-start-2 md:row-end-6 md:p-3 md:gap-0 md:justify-between md:m-5 md:mb-0">
                <div className="text-2xl">Stack Operations</div>
                <div className="flex justify-between items-center flex-wrap">
                    <input id="inputSize" className={`w-[68%] border h-10 p-3 text-xl rounded ${isButtonOn?`${darkMode?"bg-[#121212]":"bg-white"}`:`cursor-not-allowed ${darkMode?"bg-[#333333]":"bg-[#dddddd]"}`}`} disabled={!isButtonOn} placeholder="Enter Stack Size" type="number" value={stackSize} onChange={(e)=>{if(e.target.value<1)setStackSize("");else if(e.target.value<101)setStackSize(e.target.value);}}/>
                    <div className="w-[28%] flex justify-center"><ToggleButton handleSizeButton={handleSizeButton}/></div>
                </div>
                <div className="flex justify-between items-center flex-wrap">
                    <input id="inputValue" className={`w-[68%] border h-10 p-3 text-xl rounded ${darkMode?"text-white":"text-black"}`} placeholder="Enter Value" type="number" value={inputValue} onChange={(e)=>{if(e.target.value>-100000000000&&e.target.value<100000000000)setInputValue(e.target.value)}}/>
                    <button className="w-[28%] bg-green-500 hover:bg-green-600 h-10 rounded-lg text-xl cursor-pointer text-white" onClick={handlePush}>Push</button>
                </div>
                <div className="flex justify-between flex-wrap">
                    <button className=" bg-red-500 hover:bg-red-600 w-[48%] h-10 text-xl rounded-lg cursor-pointer text-white" onClick={handlePop}>Pop</button>
                    <button className={`w-[48%] h-10 text-xl rounded-lg cursor-pointer  ${darkMode?"text-black bg-white":"text-white bg-black"}`} onClick={handleClear}>Clear</button>
                </div>
            </div>

            {/* Operations History */}
            <div className="border p-3 pt-0 flex flex-col gap-2 rounded md:overflow-y-scroll md:col-start-1 md:col-end-5 lg:col-start-3 lg:col-end-7 md:row-start-6 md:row-end-11 md:m-5 z-1">
                <div className={`text-xl ml-2 sticky top-0 py-3 ${darkMode?"bg-[#121212]":"bg-white"}`}>Operations History</div>
                <AnimatePresence>
                    {historyArr.map((item, index) => (
                        <motion.div
                        key={index}// Use unique key for Framer Motion
                        initial={{ opacity: 1, x:(item[0] === "push"?-16:item[0]==="pop"?16:0)}} // Initial state
                        animate={{ opacity: 1, x: 0 }} // Animation on mount
                        exit={{ opacity: 0, x: 0 }} // Animation on unmount
                        transition={{ duration: 0.4 }}
                        className="text-lg"
                        >
                        <span className={`mr-2 ml-4 ${item[0] === "push" ? "text-green-500" : item[0]==="pop"?"text-red-500": "text-blue-500"}`}>{item[0]}</span>
                        <span>{item[1]}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Stack Visualization */}
            <div className="border p-10 pt-40 md:pt-27 sm:pt-40 relative flex justify-center items-end flex-wrap gap-2 mt-5 rounded md:col-start-5 lg:col-start-7 md:col-end-12 md:row-start-2 md:row-end-11 md:m-5 md:overflow-y-scroll">
                <div className={`absolute py-2 flex justify-around top-0 w-[100%] flex-wrap gap-1 ${ darkMode?"text-black bg-white":"bg-[black]"} text-[white]`}>
                    <div className="text-lg">Stack Size : {isButtonOn?stackSize:"Dynamic"}</div>
                    <div className="text-lg">Stack Length : {stack.getStackLength()}</div>
                </div>
                <div className={`relative w-48 border-2 border-t-0 p-2 flex flex-col-reverse gap-2 ${ darkMode?"bg-[#33333365]":"bg-[#dddddd65]"}`} style={(!isButtonOn||stackSize==="")?{minHeight: "456px"}:{ height: `${stackSize*48 + (stackSize)*8 + 10}px` }}>
                    <motion.div
                        initial={{ opacity: 0, display: "none" }}
                        animate={overflow ? { opacity: 1, display: "flex" } : { opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onAnimationComplete={() => setTimeout(() => setOverflow(false), 5)}
                        className="bg-blue-500 h-12 w-45 right-1 absolute top-[-52px] rounded text-2xl justify-center items-center"
                        >
                        Overflow
                    </motion.div>
                    <AnimatePresence>
                        {elements.map((item, index) => (
                            <motion.div
                            key={index}// Use unique key for Framer Motion
                            initial={{ opacity: 0, y: -70 }} // Initial state
                            animate={{ opacity: 1, y: 0 }} // Animation on mount
                            exit={{ opacity: 0, y: -70 }} // Animation on unmount
                            transition={{ duration: 0.7 }}
                            className={`text-2xl h-12 flex items-center justify-center rounded ${ darkMode?"bg-white text-black":"bg-black text-white"}`}
                            >
                            {item}
                        </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}