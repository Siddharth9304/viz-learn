import React, { useEffect, useState, useRef } from "react";
import Stack from "../utils/Stack";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDashBoardElement } from "../dashboardElementSlice"
import { hasEqualBrackets } from "../utils/functions";



let result = []
let stringArr = [];
export default function InfixToPostfixVisualizer()
{
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);
    const [expression, setExpression] = useState("");
    const [resultIndex, setResultIndex] = useState(-1);
    const [isStart, setIsStart] = useState(false);
    const [isWrongInput, setIsWrongInput] = useState([false,""]);
    const [isAnimation, setIsAnimation] = useState(false);
    const intervalRef = useRef(null); // Store interval reference


    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setDashBoardElement("Infix to Postfix"))
    },[]);

    const handleChange = (e) => {
        const exp = e.target.value;
        const lastChar = exp[exp.length - 1];
    
        if (exp === "" || lastChar===' ') {
            setExpression(exp);
            setIsWrongInput([false,""]);
        } 
        else if (/[a-zA-Z]/.test(lastChar)) {
            if (exp.length === 1 || '(*/-+^ '.includes(exp[exp.length - 2])) {
                setExpression(exp);
                setIsWrongInput([false,""]);
            }
            else if(exp[exp.length - 2]===')')
            {
                setIsWrongInput([true,"An infix expression can't have ')' and operand consecutively."]);
            }
            else
            {
                setIsWrongInput([true,"An infix expression can't have two variables consecutively."]);
            }
        } 
        else if ('*/-+^'.includes(lastChar)) {
            if (exp.length > 1 && !'*/-+^'.includes(exp[exp.length - 2])) {
                setExpression(exp);
                setIsWrongInput([false,""]);
            }
            else if(exp.length === 1)
            {
                setIsWrongInput([true,"An infix expression can't start with operators."]);
            }
            else
            {
                setIsWrongInput([true,"An infix expression can't have two operators consecutively."]);
            }
        }
        else if(lastChar===')')
        {
            if(exp.length === 1)
            {
                setIsWrongInput([true,"An infix expression can't start with ')'"]);
            }
            else{
                const brackets = hasEqualBrackets(exp);
                if(brackets[0]==true)
                {
                    setExpression(exp);
                    setIsWrongInput([false,""]);
                }
                else if(brackets[1]==0)
                    setIsWrongInput([true,"You haven't used '(' in the expression."]);
                else
                    setIsWrongInput([true,"An infix expression should have an equal number of left and right brackets."]);
            }
        }
        else if(lastChar==='(')
        {
            if(exp.length === 1 || '(*/-+^ '.includes(exp[exp.length - 2]))
            {
                setExpression(exp);
                setIsWrongInput([false,""]);
            }
            else if(exp[exp.length - 2]===')')
            {
                setIsWrongInput([true,"An infix expression must have operator between ')' and '(' ."]);
            }
            else
            {
                setIsWrongInput([true,"An infix expression must have operator between variable and '(' ."]);
            }
        }
        else
        {
            setIsWrongInput([true,"Please only use variables, operators, or brackets (e.g., a * (b + c) / d)."]);
        }
    };
    

    const handleEvaluate = () => {
        if(isStart)
        {
            result = []
            stringArr = [];
            setIsAnimation(false);
            setExpression("");
            setResultIndex(-1);
            setIsStart(false);
        }
        else{
            if(expression==="")
                return;
            if('*/-+^'.includes(expression.charAt(expression.length-1)))
            {
                setIsWrongInput([true,"An infix expression should not end with an operator."]);
            }
            else if(hasEqualBrackets(expression)[0]===false)
            {
                setIsWrongInput([true,"An infix expression should have an equal number of left and right brackets."]);
            }
            else
            {
                setIsWrongInput([false,""]);
                const stringWithOutSpaces = expression.replace(/\s+/g, ""); // Removes all spaces (including tabs & newlines)
                result = Stack.InfixToPostfix(stringWithOutSpaces);
                stringArr = Array.from(stringWithOutSpaces)
                setIsStart(true);
            }
        }
    }

    const handleNextButton = () => {
        
        if(resultIndex<result.length-1){
            setResultIndex(resultIndex+1);
        }
    }

const handleAnimation = () => {
    if (isAnimation) {
        setIsAnimation(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    } else {
        if (resultIndex === result.length-1) {
            setResultIndex(-1);
        }
        
        intervalRef.current = setInterval(() => {
            setResultIndex((prevIndex) => {
                if (prevIndex >= result.length - 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setIsAnimation(false);
                    return prevIndex; // Keep at last step
                }
                return prevIndex + 1;
            });
        }, 1500); // Move to the next step every 1.5 seconds

        setIsAnimation(true);
    }
};

      
    return(
        <>
            {/* Stack Controls */}
            <div className="border p-5 flex flex-col gap-8 rounded md:col-start-1 text-md md:text-xl md:col-end-5 lg:col-start-3 lg:col-end-7 md:row-start-2 md:row-end-5 md:p-3 md:gap-0 md:justify-between md:m-5 md:mb-0">
                <div className="flex justify-between items-center flex-wrap">
                    <input id="inputValue" className={`w-[68%] border h-10 p-3 rounded ${darkMode?"text-white":"text-black"}`}
                    placeholder="Enter expression (use variables only)"type="text" value={expression} disabled={isStart} 
                    onChange={handleChange}/>
                    <button className={`w-[28%] bg-green-500 h-10 rounded-lg hover:bg-green-600 cursor-pointer ${isStart?"":""} text-white`} onClick={handleEvaluate}>{isStart?"Reset":"Start"}</button>
                </div>
                <div className={`p-1 font-bold top-[-52px] left-[10px] ${darkMode?"bg-amber-300":"bg-amber-100"} rounded text-red-500 ${isWrongInput[0]?"hidden":""}`}>{"Only use variables, operators, or brackets ( e.g., a * (b + c) / d )."}</div>
                <div className={`p-1 font-bold top-[-52px] left-[10px] ${darkMode?"bg-amber-300":"bg-amber-100"} rounded text-red-500 ${isWrongInput[0]?"":"hidden"}`}>{isWrongInput[1]}</div>
                <div className="flex justify-between flex-wrap">
                    <button className={` bg-red-500 w-[32%] h-10 rounded-lg ${isStart ? "cursor-pointer hover:bg-red-600" : "opacity-70 cursor-not-allowed"} text-white`} disabled={!isStart} onClick={handleAnimation}>{isAnimation?"Stop":"Animation"}</button>
                    <button className={`w-[32%] h-10 rounded-lg ${isStart ? "cursor-pointer" : "opacity-70 cursor-not-allowed"} ${darkMode?"text-black bg-white":"text-white bg-black"}`} disabled={!isStart} onClick={()=>{if(resultIndex>-1)setResultIndex(resultIndex-1);}}>Step Back</button>
                    <button className={`w-[32%] h-10 rounded-lg  ${isStart ? "cursor-pointer" : "opacity-70 cursor-not-allowed"}  ${darkMode?"text-black bg-white":"text-white bg-black"}`} disabled={!isStart} onClick={handleNextButton}>{`Step ${resultIndex+2}`}</button>
                </div>
            </div>

            {/* Operations History */}
            <div className="border pt-4 md:pt-2 p-2 flex flex-col rounded md:overflow-y-scroll md:overflow-x-scroll md:col-start-1 md:col-end-5 lg:col-start-3 lg:col-end-7 md:row-start-5 md:row-end-11 md:m-5 z-1">
                <div className="relative h-[70%] flex justify-center items-center">
                    <div className={`min-h-20 max-h-[90%] ${darkMode?"text-white bg-[#33333365]":"text-black bg-[#dddddd65]"} w-[95%] p-2 border flex justify-start flex-wrap gap-1 overflow-auto`}>
                        {
                            stringArr.map((char, index)=><div key={index} className={`h-10 w-10 flex justify-center items-center text-2xl ${((resultIndex>-1)&&(index===result[resultIndex][3]))?(darkMode?"bg-[#727272]":"bg-[#a4a4a4]"):(darkMode?"bg-[#333333]":"bg-[#dddddd]")}`}>{char}</div>)
                        }   
                    </div>
                </div>
                <div className="h-[30%] flex flex-col justify-center">
                    <AnimatePresence>
                            <motion.div
                            initial={{ opacity: 1, x:-16}} // Initial state
                            animate={{ opacity: 1, x: 0 }} // Animation on mount
                            exit={{ opacity: 0, x: 0 }} // Animation on unmount
                            transition={{ duration: 0.4 }}
                            className="text-lg"
                            >
                            <div className={`mr-2 ml-4 pt-3 md:pt-0 tracking-wider ${resultIndex>-1&&resultIndex<result.length?result[resultIndex][0][0]:""}`}>{resultIndex>-1&&resultIndex<result.length?`${resultIndex+1} ) `+`${result[resultIndex][0][1]}`:""}</div> 
                            </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Stack Visualization */}
            <div className="border pb-10 flex gap-20 flex-col justify-between mt-5 rounded  md:col-start-5 lg:col-start-7 md:col-end-12 md:row-start-2 md:row-end-11 md:m-5 overflow-y-auto">
                <div className={`p-3 w-[100%] text-lg tracking-wider text-center ${ darkMode?"text-black bg-white":"bg-[black]"} text-[white] overflow-x-auto`}>
                    <span><strong>Result : </strong></span>
                    {`${resultIndex>-1&&resultIndex<result.length?result[resultIndex][1]:""}`}
                </div>
                <div className="w-full flex justify-center items-center">
                <div className={`w-48 min-h-100 border-2 border-t-0 p-2 flex flex-col-reverse gap-2 ${ darkMode?"bg-[#33333365]":"bg-[#dddddd65]"}`}>
                    <AnimatePresence>
                        {resultIndex>-1&&resultIndex<result.length?result[resultIndex][2].map((item, index) => (
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
                        )):[]}
                    </AnimatePresence>
                </div>
                </div>
            </div>
        </>
    )
}