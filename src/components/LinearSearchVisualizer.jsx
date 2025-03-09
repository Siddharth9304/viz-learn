import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setDashBoardElement } from "../dashboardElementSlice"
import { parseNumberString, getLastNumberLength } from "../utils/functions";
import { linearSearch } from "../utils/searchingAlgorithms";
import confetti from "canvas-confetti";

let array = [];
let result = "";
let finalTarget = "";

export default function LinearSearchVisualizer() {

    const [arrayValues, setArrayValues] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [isAnimation, setIsAnimation] = useState(false);
    const [isWrongInput, setIsWrongInput] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [target, setTarget] = useState(""); 
    const [isTargetSet, setIsTargetSet] = useState(false);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setDashBoardElement("Linear Search"))
    },[]);

    const handleSearch = () => {
        if(arrayValues==="")
            return;
        if(isSearch)
        {
            array=[];
            result = "";
            finalTarget = "";
            setArrayValues("");
            setIsAnimation(false);
            setIsSearch(false);
            setTarget("");
            setIsTargetSet(false);
            setCurrentIndex(-1);
        }
        // else if(target==="")
        // {
        //     setIsWrongInput(true);
        // }
        else
        {
            array = parseNumberString(arrayValues);
            setIsWrongInput([false,""]);
            setIsSearch(true);
        }

    } 

    const handleAnimation = () => {

    }

    const handleNextButton = () => {
        if(currentIndex < result.length-1)
        {
            setCurrentIndex(currentIndex+1);
                if(result[currentIndex+1])
                    setTimeout(()=>confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { x: 0.5, y: 0.5 },
                      }),1050);
        }
    }

    const handleValuesChange = (e) => {

        const exp = e.target.value;
        const lastChar = exp[exp.length - 1];

        if(exp==="")
            setArrayValues("");
        else if('0123456789 ,'.includes(lastChar))
        {
            if(getLastNumberLength(exp)<6)
                setArrayValues(exp);
            else
                setIsWrongInput(true)
        }
        else
        {
            setIsWrongInput(true);
        }
        
    }

    const handleTargetValue = (e) => {
        if(e.target.value.length<6)
            setTarget(e.target.value)
    }

    const handleSetTargetButton = () => {
        if(isTargetSet)
        {
            finalTarget = "";
            setTarget("");
            setIsTargetSet(false);
        }
        else
        {
            if(target!="")
            {
                finalTarget = target;
                result = linearSearch(array,Number(finalTarget));
                setIsTargetSet(true);

            }
        }
    }

    const darkMode = useSelector((state) => state.themeSlice.darkMode);

    return (
        <>
            {/* Array Controls */}
            <div className="border p-5 flex flex-col gap-8 rounded md:col-start-1 md:col-end-6 lg:col-start-3 lg:col-end-8 md:row-start-7 md:row-end-11 md:p-3 md:gap-0 md:justify-around md:m-5 text-md sm:text-xl">
                <div className="flex justify-between items-center text-md sm:text-xl flex-wrap">
                    <input id="inputValue" className={`w-[68%] border h-10 p-3 rounded ${darkMode?"text-white":"text-black"} ${isSearch ? "opacity-70 cursor-not-allowed" : ""}`}
                    placeholder="Enter comma separated integers"type="text" value={arrayValues} disabled={isSearch} 
                    onChange={handleValuesChange}/>
                    <button className={`w-[28%] overflow-hidden bg-green-500 h-10 rounded-lg hover:bg-green-600 cursor-pointer text-white`} onClick={handleSearch}>{isSearch?"Reset Array":"Set Array"}</button>
                </div>
                <div className={`p-2 font-bold top-[-52px] left-[10px] ${darkMode?"bg-amber-300":"bg-amber-100"} rounded text-red-500 ${isWrongInput[0]?"":"hidden"}`}>{isWrongInput[1]}</div>
                <div className="flex justify-between items-center flex-wrap">
                    <input type="number" placeholder="Enter target value" value={target} className={`w-[68%] border h-10 p-3 rounded ${isSearch&&!isTargetSet ? "" : "opacity-70 cursor-not-allowed"} ${darkMode?"text-white":"text-black"}`} disabled={!isSearch||isTargetSet} onChange={handleTargetValue}/>
                    <button className={`w-[28%] overflow-hidden bg-green-500 h-10 rounded-lg text-white ${isSearch ? "cursor-pointer  hover:bg-green-600" : "opacity-70 cursor-not-allowed"}`} onClick={handleSetTargetButton} disabled={!isSearch}>{`${isTargetSet?"Reset target": "Set target"}`}</button>
                </div>
                <div className="flex justify-between flex-wrap ">
                    <button className={` bg-red-500 overflow-hidden w-[30%] h-10 rounded-lg ${isTargetSet ? "cursor-pointer hover:bg-red-600" : "opacity-70 cursor-not-allowed"} text-white`} disabled={!isTargetSet} onClick={handleAnimation}>{isAnimation?"Stop":"Animation"}</button>
                    <button className={`w-[30%] overflow-hidden h-10 rounded-lg ${isTargetSet ? "cursor-pointer" : "opacity-70 cursor-not-allowed"} ${darkMode?"text-black bg-white":"text-white bg-black"}`} disabled={!isTargetSet} onClick={()=>{if(currentIndex>-1)setCurrentIndex(currentIndex-1);}}>Step Back</button>
                    <button className={`w-[30%] overflow-hidden h-10 rounded-lg  ${isTargetSet ? "cursor-pointer" : "opacity-70 cursor-not-allowed"}  ${darkMode?"text-black bg-white":"text-white bg-black"}`} disabled={!isTargetSet} onClick={handleNextButton}>{`Check ${currentIndex+1}`}</button>
                </div>
            </div>

            {/* Array History */}
            <div className="border py-8 md:p-3 flex flex-col gap-5 md:gap-8 rounded justify-center items-center md:overflow-y-scroll md:col-start-6 lg:col-start-8 md:col-end-12 md:row-start-7 md:row-end-11 md:m-5 z-1">
                <div className={`mr-2 ml-4 tracking-wider text-2xl`}>{currentIndex>-1?`Checking value at index ${currentIndex} :`:""}</div> 
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }} // Start hidden
                    animate={{ opacity: 1 }} // Fade in
                    transition={{ delay: 1, duration: 0.5 }} // Delay for 2s, fade in over 0.5s
                    className={`mr-2 ml-4 pt-3 md:pt-0 tracking-wider text-2xl flex gap-2 ${result[currentIndex]?"text-green-500":"text-red-500"}`}
                    >
                    {currentIndex > -1 ? `( ${array[currentIndex]} == ${finalTarget} ) == ${result[currentIndex]}`: ""}
                </motion.div>
            </div>

            {/* Array Visualization */}
            <div className={`border relative flex justify-center pb-10 min-h-100 md:min-h-auto sm:p-20 items-center gap-2 mt-5 rounded md:col-start-1 lg:col-start-3 md:col-end-12 md:row-start-2 md:row-end-7 md:m-5 md:mb-0 md:mt-0`}>
                <div className="absolute top-0 left-0 h-10 px-3 bg-blue-500 flex items-center justify-center text-2xl rounded m-3">{`Target : ${finalTarget}`}</div>
                <div className={`sm:h-30 m-b-6 mt-20 md:mt-6 relative sm:overflow-x-auto sm:overflow-y-hidden p-2 flex sm:flex-row gap-2 flex-col ${ darkMode?"bg-[#33333365]":"bg-[#dddddd65]"}`}>
                    {array.map((value,index)=>{
                        return(
                            index==currentIndex?
                            <motion.div
                            animate={{
                              backgroundColor: [darkMode?"white":"black", darkMode?"white":"black", result[index]?"#22c55e":"#ef4444"], // Changes color after shake
                              x: [0, -10, 10, -10, 10, -10, 10, 0], // Shaking effect
                            }}
                            transition={{
                              x: { duration: 1, repeat: 0 }, // Shake for 1 second
                              backgroundColor: { duration: 0.5, delay: 1 }, // Change color after 1 sec
                            }}
                            className={`text-2xl relative h-25 w-25 sm:h-auto sm:min-w-20 p-2 flex items-center justify-center rounded ${ darkMode?"bg-white text-black":"bg-black text-white"}`}
                    >
                        <div>{value}</div>
                        <div className="absolute text-sm top-0 left-0 pl-2 pt-1">{index}</div>
                        <div className="absolute text-xl top-0 right-0 pr-2 text-blue-500">{finalTarget}</div>
                    </motion.div>:
                            <div 
                                key={index}
                                className={`text-2xl h-25 w-25 sm:h-auto sm:min-w-20 p-2 relative flex items-center justify-center rounded ${ darkMode?"bg-white text-black":"bg-black text-white"} transition-colors delay-500 duration-1000 ${currentIndex==index?result[index]?"bg-green-300":"bg-red-300":""}`}
                            >
                                <div>{value}</div>
                                <div className="absolute text-sm top-0 left-0 pl-2 pt-1">{index}</div>
                            </div>
                    )})}      
                </div>
            </div>
        </>
    );
}
