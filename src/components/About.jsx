import Intro from "./Intro"
import Header from "./Header"
import Footer from "./Footer";
import AboutContent from "./AboutContent";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function About()
{
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    return(
        <div className={`${darkMode?"bg-[#121212] text-[#e0e0e0]":"bg-white text-black"}`}>
            <Header navBarControls={[isNavBarOpen, setIsNavBarOpen]} isAbout={true}/>
            <AboutContent/>
            <Footer/>
        </div>
    )
}