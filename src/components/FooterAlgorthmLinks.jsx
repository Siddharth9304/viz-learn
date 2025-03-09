import { Link } from "react-router";
import algorithmsInfo from "../utils/algorithmsInfo";
import { useSelector } from "react-redux";

export default function FooterAlgorithmLinks()
{
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    return(
        <div className="flex flex-col gap-5 items-center">
            <div className="text-lg font-bold">Algorithms</div>
            {algorithmsInfo.map((algo)=>{
                return(
                    <nav key={algo?.id}><Link to={algo?.route}><button className={`cursor-pointer hover ${darkMode?"hover:text-[#e0e0e0]":"hover:text-black"}`}>{algo?.name}</button></Link></nav>
                )
            })}
        </div>
    )
}