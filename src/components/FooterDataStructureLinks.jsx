import { Link } from "react-router";
import dataStructuresInfo from "../utils/dataStructuresInfo";
import { useSelector } from "react-redux";

export default function FooterDataStructureLinks()
{
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    return(
        <div className="flex flex-col gap-5 items-center">
            <div className="text-lg font-bold text-center">Data Structures</div>
            {dataStructuresInfo.map((ds)=>{
                return(
                    <nav key={ds?.id}><Link to={ds?.route}><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>{ds?.name}</button></Link></nav>
                )
            })}
        </div>
    )
}