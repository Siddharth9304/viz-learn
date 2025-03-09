import { useState } from "react"
import { useSelector } from "react-redux";

export default function ToggleButton({handleSizeButton})
{
    const [isToggled, setIsToggled] = useState(false);

    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    const handleClick = ()=>{
        handleSizeButton();
        setIsToggled(!isToggled);
    }

    return(
        <div className={`relative w-16 h-8 ${isToggled ? `${darkMode?"bg-white":"bg-black" }` : `${darkMode?"bg-[#333333]":"bg-[#dddddd]" }`} rounded-full p-1 cursor-pointer transition-colors duration-200 delay-200`} onClick={handleClick}>
      <div className={`rounded-full w-6 h-6 absolute transition-all duration-200 delay-200 ease-in ${isToggled ? `translate-x-8 ${darkMode?"bg-[black]":"bg-white"}` : `translate-x-0 ${darkMode?"bg-[#121212]":"bg-white"}`}`}
      ></div>
    </div>
    )
}
