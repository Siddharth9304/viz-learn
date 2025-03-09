import { useSelector } from "react-redux";
import { setDashBoardElement } from "../dashboardElementSlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataStructuresInfo from "../utils/dataStructuresInfo"
import algorithmsInfo from "../utils/algorithmsInfo";
import { Link } from "react-router";

export default function DashBoardElements()
{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setDashBoardElement(""))
    },[]);

    const darkMode = useSelector((state) => state.themeSlice.darkMode);

    return(
        <div className={`flex flex-col gap-10 items-center md:px-10 md:pt-5 pb-20 md:items-start md:row-start-2 md:row-end-11 md:col-start-1 lg:col-start-3 md:col-end-12 ${darkMode?"text-[white] bg-[#121212]}":"bg-white text-black"} md:overflow-y-scroll`}>
            <h2 className="text-3xl p-3 text-center">Data Structures</h2>
            <div className={` flex flex-wrap gap-10 justify-center md:justify-start`}>
                {dataStructuresInfo.map((ds)=>{
                    return(
                        <nav key={ds?.id}><Link to={ds?.route}>
                        <div className={`max-w-90 min-h-50 md:h-50 md:w-90 p-4 flex flex-col gap-4 border-2 border-[#e0e0e0a4] rounded-3xl cursor-pointer transition-transform duration-250 ease-in-out hover:-translate-x-1 hover:scale-95`}>
                            <h3 className="text-3xl font-bold">{ds?.name}</h3>
                            <p className={`text-lg ${darkMode?"text-[#e0e0e0a4]":"text-[#000000a4]"}`}>{ds?.definition}</p>
                        </div>
                        </Link></nav>
                    )
                })}
            </div>
            <h2 className="text-3xl p-3 text-center">Algorithms</h2>
            <div className={` flex flex-wrap gap-10 justify-center md:justify-start`}>
                {algorithmsInfo.map((algo)=>{
                    return(
                        <nav key={algo?.id} ><Link to={algo?.route}>
                            <div className={`max-w-90 min-h-50 md:h-50 md:w-90 p-4 flex flex-col gap-4 border-2 border-[#e0e0e0a4] rounded-3xl cursor-pointer transition-transform duration-250 ease-in-out hover:-translate-x-1 hover:scale-95`}>
                                <h3 className="text-3xl font-bold">{algo?.name}</h3>
                                <p className={`text-lg ${darkMode?"text-[#e0e0e0a4]":"text-[#000000a4]"}`}>{algo?.definition}</p>
                            </div>
                        </Link></nav>
                    )
                })}
            </div>
        </div>
    )
}