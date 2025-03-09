import Intro from "./Intro"
import DataStructures from "./DataStructures"
import Algorithms from "./Algorithms"
import Header from "./Header"
import Footer from "./Footer";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Home()
{
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    return(
        <div className={`${darkMode?"bg-[#121212] text-[#e0e0e0]":"bg-white text-black"}`}>
            <Header navBarControls={[isNavBarOpen, setIsNavBarOpen]}/>
            <Intro setIsNavBarOpen={setIsNavBarOpen} isAbout={false}/>
            <DataStructures/>
            <Algorithms/>
            <Footer/>
        </div>
    )
}