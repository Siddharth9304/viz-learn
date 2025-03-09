import { Link } from "react-router"
import { useSelector } from "react-redux"

export default function FooterNavigationLinks()
{

    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    return(
        <div className="flex flex-col text-md gap-5 items-center">
            <div className="text-lg font-bold">Navigation</div>
            <nav><Link to="/"><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>Home</button></Link></nav>
            <nav><Link to="/dashboard"><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>DashBoard</button></Link></nav>
            <nav><Link to="/about"><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>About</button></Link></nav>
        </div>
    )
}