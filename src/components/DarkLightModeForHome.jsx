import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../themeSlice"
import { Sun } from 'lucide-react'
import { Moon } from 'lucide-react'

export default function DarkLightModeForHome()
{
    const [isToggled, setIsToggled] = useState(false);
    const dispatch = useDispatch();
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    const handleClick = () => {
        setIsToggled(!isToggled);
        dispatch(switchTheme());
    }

    return(
        <div
            className={`relative w-16 h-8 border text-black ${darkMode?"bg-[#333333] borer-[#333333] hover:border-white":"bg-[#dddddd] border-[#dddddd] hover:border-black"} text-black} 
            rounded-full p-1 cursor-pointer scale-80 flex items-center`}
            onClick={handleClick}
        >
            {/* Sun always on the left */}
            <Sun size={"1em"} className="ml-1 z-10" />

            {/* Toggle button */}
            <div
                className={`flex justify-center items-center rounded-full w-6 h-6 absolute 
                transition-all duration-200 ease-in bg-[#ffffff] ${darkMode ? "translate-x-[30px]" : "translate-x-0"}`}
            ></div>

            {/* Moon always on the right */}
            <Moon size={"1em"} className="ml-auto mr-1 z-10" />
        </div>
    )
}
