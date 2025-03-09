import socialMediaInfo from "../utils/socialMediaInfo"
import { useSelector } from "react-redux";

export default function SocialMediaLinks()
{
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    return(
        <div className="flex justify-center flex-wrap gap-3 pb-15">
            <div className={`${darkMode?"text-white":"text-black"} text-3xl font-medium`}>Follow Us</div>
            {
                socialMediaInfo.map(socialMedia => <a key={socialMedia.platformName} href={socialMedia?.url} target="_blank"><img className={`h-9 rounded mt-[1px] ${darkMode?"hover:bg-white":"hover:bg-black"}`} src={socialMedia?.logo} alt={socialMedia?.platformName} /></a>)
            }
        </div>
    )
}