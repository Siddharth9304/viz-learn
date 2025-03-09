import algoritmsInfo from "../utils/algorithmsInfo"
import AlgorithmCard from "./AlgorithmCard"
import { useSelector } from "react-redux";

export default function AlgoTopics()
{
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);
    const cssForCards = darkMode?"bg-[#33333365] hover:bg-[#333333] border-[#333333]":"bg-[#dddddd55] hover:bg-[#dddddd] border-[#dddddd]";
    const cardImg = darkMode?"imgDark":"img";

    return(
        <div className="flex flex-wrap justify-center items-center gap-20">
            {algoritmsInfo.map((algo)=><AlgorithmCard key={algo.id} algo={algo} cssForCards={cssForCards} cardImg={cardImg}/>)}
        </div>
    )
}