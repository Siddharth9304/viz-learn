import { Link } from "react-router";

export default function algorithmCard({algo , cssForCards, cardImg})
{   
    return(
        <nav><Link to={algo.route}>
            <div id={algo.id} className={`border-2 rounded-xl p-3 w-70 sm:w-105 flex flex-col justify-center items-center gap-3 cursor-pointer ${cssForCards} transition-transform duration-300 ease-in-out hover:scale-110`}> 
                <img src={algo[cardImg]} alt="stackImage" className="border rounded w-[90%] h-34 sm:h-51"/>
                <h3 className="text-2xl">{algo.name}</h3>
            </div>
        </Link></nav>
    )
}