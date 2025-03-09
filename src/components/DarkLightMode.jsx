import { Sun } from 'lucide-react'
import { Moon } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { switchTheme } from "../themeSlice"
import { useState } from 'react'

export default function DarkLightMode({setIsNavBarOpen})
{
    const [themePopUp, setThemePopUp] = useState(false);
    const dispatch = useDispatch();
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    const handleClick = () => {
        dispatch(switchTheme());
        if(window.innerWidth<=768)
            setIsNavBarOpen(false);
    }

    return(
            <div className='relative'>
                <button className={`cursor-pointer bg-white p-2 rounded-full ${darkMode?"hidden":"block"}`} onMouseEnter={()=>{setThemePopUp(true)}} onMouseLeave={()=>{setThemePopUp(false)}} onClick={handleClick}><Moon size={"1.2rem"}/></button>
                <button className={`cursor-pointer bg-black text-white p-2 rounded-full ${!darkMode?"hidden":"block"}`} onMouseEnter={()=>{setThemePopUp(true)}} onMouseLeave={()=>{setThemePopUp(false)}} onClick={handleClick}><Sun size={"1.2rem"}/></button>
                <div className={`z-10 text-sm rounded-2xl py-2 absolute bottom-[-45px] right-[-36px] w-25 text-center ${darkMode?"bg-[#333333] text-[#e0e0e0]":"bg-[#dddddd] text-black"} ${themePopUp?"":"hidden"}`}>{darkMode?"Light mode":"Dark mode"}</div>
            </div>
    )
}