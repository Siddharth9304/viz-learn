import React, { useEffect, useState } from "react";
import LinkedList from "../utils/LinkedList";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setDashBoardElement } from "../dashboardElementSlice";

export default function LinkedListVisualizer() {
    const [linkedList] = useState(new LinkedList());
    const [elements, setElements] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [historyArr, setHistoryArr] = useState([]);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDashBoardElement("Linked List"));
    }, []);

    const darkMode = useSelector((state) => state.themeSlice.darkMode);

    const handleInsertHead = () => {
        if (inputValue.trim() === "") return;
        const newNode = { id: Date.now(), value: inputValue }; // Unique key for React
        linkedList.insertAtHead(newNode);
        setHistoryArr([...historyArr, ["insert head", inputValue]]);
        setElements(linkedList.getList());
        setInputValue("");
    };    

    const handleInsertTail = () => {
        if (inputValue.trim() === "") return;
        const newNode = { id: Date.now(), value: inputValue }; // Unique key for React
        linkedList.insertAtTail(newNode);
        setHistoryArr([...historyArr, ["insert tail", inputValue]]);
        setElements(linkedList.getList());
        setInputValue("");
    };    

    const handleDeleteHead = () => {
        if (!linkedList.isEmpty()) {
            const deletedNode = linkedList.deleteHead(); 
            if (deletedNode) {
                setHistoryArr([...historyArr, ["delete head", deletedNode.value]]);
                setElements(linkedList.getList());
            }
        }
    };
    
    const handleDeleteTail = () => {
        if (!linkedList.isEmpty()) {
            const deletedNode = linkedList.deleteTail();
            if (deletedNode) {
                setHistoryArr([...historyArr, ["delete tail", deletedNode.value]]);
                setElements(linkedList.getList());
            }
        }
    };
    

    const handleClear = () => {
        linkedList.clear();
        setHistoryArr([]);
        setElements([]);
    };

    return (
        <>
            {/* Linked List Controls */}
            <div className="border p-5 flex flex-col gap-8 rounded md:col-start-1 md:col-end-6 lg:col-start-3 lg:col-end-8 md:row-start-6 md:row-end-11 md:p-3 md:gap-0 md:justify-between md:m-5">
            <div className="text-2xl">Linked List Operations</div>
                <div className="flex items-center gap-2">
                    <input 
                        className={`w-[96%] border h-10 p-3 text-lg rounded ${darkMode ? "text-white bg-gray-800" : "text-black"}`} 
                        placeholder="Enter Value" 
                        type="text" 
                        value={inputValue} 
                        onChange={(e) =>{if(e.target.value>-1000000&&e.target.value<1000000) setInputValue(e.target.value)}} 
                    />
                </div>
                <div className="flex gap-2">
                    <button className="bg-green-500 hover:bg-green-600 w-[48%] h-10 text-xl rounded-lg cursor-pointer text-white" onClick={handleInsertHead}>Insert Head</button>
                    <button className="bg-green-500 hover:bg-green-600 w-[48%] h-10 text-xl rounded-lg cursor-pointer text-white" onClick={handleInsertTail}>Insert Tail</button>
                </div>
                <div className="flex gap-2">
                    <button className="bg-red-500 hover:bg-red-600 w-[48%] h-10 text-xl rounded-lg cursor-pointer text-white" onClick={handleDeleteHead}>Delete Head</button>
                    <button className="bg-red-500 hover:bg-red-600 w-[48%] h-10 text-xl rounded-lg cursor-pointer text-white" onClick={handleDeleteTail}>Delete Tail</button>
                </div>
                <button className={`w-[96%] h-10 text-xl rounded-lg cursor-pointer  ${darkMode?"text-black bg-white":"text-white bg-black"}`} onClick={handleClear}>Clear</button>
            </div>

            {/* Operations History */}
            <div className="border p-3 pt-0 flex flex-col gap-2 rounded md:overflow-y-scroll md:col-start-6 lg:col-start-8 md:col-end-12 md:row-start-6 md:row-end-11 md:m-5 z-1">
            <div className="text-xl ml-2 py-3">Operations History</div>
                <AnimatePresence>
                    {historyArr.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                            className="text-lg"
                        >
                            <span className={`mr-2 font-semibold ${item[0].includes("insert") ? "text-green-500" : "text-red-500"}`}>{item[0]}</span>
                            <span>{item[1]}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Linked List Visualization */}
            <div className="border p-6 h-100 md:h-auto relative flex items-center justify-center gap-4 mt-5 rounded md:col-start-1 lg:col-start-3 md:col-end-14 md:row-start-2 md:row-end-6 md:m-5 md:mb-0 md:mt-0 overflow-x-scroll">
                <AnimatePresence>
                    {elements.map((item, index) => (
                        <React.Fragment key={item.id}> {/* Ensure unique keys */}
                            {/* Node */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0, y: -20 }} // Ensures smooth disappearance
                                transition={{ 
                                    duration: 0.5, 
                                    type: "spring", 
                                    stiffness: 200,
                                    delay: 0.1 // Small delay for smoothness
                                }}
                                className={`flex items-center justify-center p-4 w-22 h-22 rounded-lg text-xl font-bold shadow-md ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
                            >
                                {item.value} {/* Use item.value instead of item if storing objects */}
                            </motion.div>

                            {/* Arrow */}
                            {index !== elements.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="text-2xl font-bold"
                                >
                                    ➜
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </AnimatePresence>
            </div>

        </>
    );
}
