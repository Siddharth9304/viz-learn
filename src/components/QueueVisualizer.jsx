import ToggleButton from "./ToggleButton";
import React, { useState, useEffect } from "react";
import Queue from "../utils/Queue";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setDashBoardElement } from "../dashboardElementSlice"

export default function QueueVisualizer() {
    const [queue] = useState(new Queue());
    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [historyArr, setHistoryArr] = useState([]);
    const [queueSize, setQueueSize] = useState("");
    const [isButtonOn, setIsButtonOn] = useState(false);
    const [overflow, setOverflow] = useState(false);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setDashBoardElement("Queue"))
    },[]);

    const darkMode = useSelector((state) => state.themeSlice.darkMode);

    const handleEnqueue = () => {
        if (inputValue !== "") {
            if (isButtonOn && queue.getQueueLength() === Number(queueSize)) {
                setOverflow(!overflow);
                setHistoryArr([...historyArr, ["overflow", inputValue]]);
            } else {
                const newNode = { id: Date.now(), value: inputValue }; // Unique key for React
                queue.enqueue(newNode);
                setHistoryArr([...historyArr, ["enqueue", inputValue]]);
                setElements(queue.getQueue());
            }
            setInputValue("");
        }
    };

    const handleDequeue = () => {
        if (!queue.isEmpty()) {
            setHistoryArr([...historyArr, ["dequeue", queue.dequeue().value]]);
            setElements(queue.getQueue());
        }
    };

    const handleClear = () => {
        queue.clear();
        setHistoryArr([]);
        setElements([]);
    };

    const handleSizeButton = () => {
        if (isButtonOn) setQueueSize("");
        setIsButtonOn(!isButtonOn);
    };

    return (
        <>
            {/* Queue Controls */}
            <div className="border p-5 flex flex-col gap-8 rounded md:col-start-1 md:col-end-6 lg:col-start-3 lg:col-end-8 md:row-start-6 md:row-end-11 md:p-3 md:gap-0 md:justify-between md:m-5">
                <div className="text-2xl">Queue Operations</div>
                <div className="flex justify-between items-center flex-wrap">
                    <input className={`w-[68%] border h-10 p-3 text-xl rounded ${isButtonOn?`${darkMode?"bg-[#121212]":"bg-white"}`:`cursor-not-allowed ${darkMode?"bg-[#333333]":"bg-[#dddddd]"}`}`}
                        disabled={!isButtonOn} placeholder="Enter Queue Size" type="number"
                        value={queueSize} onChange={(e) => {if(e.target.value<1)setQueueSize("");else if(e.target.value<101)setQueueSize(e.target.value)}} />
                    <div className="w-[28%] flex justify-center"><ToggleButton handleSizeButton={handleSizeButton}/></div>
                </div>
                <div className="flex justify-between items-center flex-wrap">
                    <input className={`w-[68%] border h-10 p-3 text-xl rounded ${darkMode?"bg-[#121212]":"bg-white"}`}
                    placeholder="Enter Value" value={inputValue} onChange={(e) =>{if(e.target.value>-100000000000&&e.target.value<100000000000) setInputValue(e.target.value)}} />
                    <button className="w-[28%] bg-green-500 hover:bg-green-600 h-10 rounded-lg text-xl cursor-pointer text-white" onClick={handleEnqueue}>Enqueue</button>
                </div>
                <div className="flex justify-between flex-wrap">
                    <button className=" bg-red-500 hover:bg-red-600 w-[48%] h-10 text-xl rounded-lg cursor-pointer text-white" onClick={handleDequeue}>Dequeue</button>
                    <button className={`w-[48%] h-10 text-xl rounded-lg cursor-pointer  ${darkMode?"text-black bg-white":"text-white bg-black"}`} onClick={handleClear}>Clear</button>
                </div>
            </div>

            {/* Operations History */}
            <div className="border p-3 pt-0 flex flex-col gap-2 rounded md:overflow-y-scroll md:col-start-6 lg:col-start-8 md:col-end-12 md:row-start-6 md:row-end-11 md:m-5 z-1">
                <div className="text-xl ml-2 py-3">Operations History</div>
                <AnimatePresence>
                    {historyArr.map((item, index) => (
                        <motion.div key={index} initial={{ opacity: 1, x: item[0] === "enqueue" ? -16 : 16 }}
                            animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 0 }}
                            transition={{ duration: 0.4 }} className="text-lg">
                            <span className={`mr-2 ml-4 ${item[0] === "enqueue" ? "text-green-500" : "text-red-500"}`}>{item[0]}</span>
                            <span>{item[1]}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Queue Visualization */}
            <div className="border relative p-20 flex justify-center items-center gap-2 mt-5 rounded md:col-start-1 lg:col-start-3 md:col-end-12 md:row-start-2 md:row-end-6 md:m-5 md:mb-0 md:mt-0">
            <div className={`absolute py-2 flex justify-around top-0 w-[100%] flex-wrap gap-1 ${ darkMode?"text-black bg-white":"bg-[black]"} text-[white]`}>
                    <div className="text-lg">Queue Size : {isButtonOn ? queueSize : "Dynamic"}</div>
                    <div className="text-lg">Queue Length : {queue.getQueueLength()}</div>
                </div>
                <div className={`h-30 m-y-6 mt-12 md:mt-6 border-2 overflow-x-auto overflow-y-hidden border-x-0 p-2 flex flex-row-reverse gap-2 ${ darkMode?"bg-[#33333365]":"bg-[#dddddd65]"}`} style={(!isButtonOn||queueSize==="")?{minWidth: "95%"}:{ width: `${queueSize*80 + (queueSize)*8 + 10}px` }}>
                    <motion.div initial={{ opacity: 0 }} animate={overflow ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }} onAnimationComplete={() => setTimeout(() => setOverflow(false), 5)}
                        className="bg-blue-500 w-40 bottom-[12px] left-[44%] p-2 absolute rounded text-lg flex justify-center items-center">
                        Overflow
                    </motion.div>
                    <AnimatePresence>
                        {elements.map((item) => (
                            <motion.div 
                                key={item.id} 
                                initial={{ opacity: 0, x: -100 }} 
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }} 
                                transition={{ duration: 0.7 }}
                                className={`text-2xl min-w-20 p-2 flex items-center justify-center rounded ${ darkMode?"bg-white text-black":"bg-black text-white"}`}
                                >
                                {item.value}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}
