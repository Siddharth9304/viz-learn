import FooterNavigationLinks from "./FooterNavigationLinks"
import FooterDataStructureLinks from "./FooterDataStructureLinks"
import FooterAlgorithmLinks from "./FooterAlgorthmLinks"
import SocialMediaLinks from "./SocialMediaLinks";
import { useSelector } from "react-redux";

export default function Footer()
{
    const darkMode = useSelector((state)=>state.themeSlice.darkMode);

    return(
        <div className={`px-5 ${darkMode?"text-[#e0e0e0a4] bg-[#33333365]":"text-[#000000a4] bg-[#dddddd65]"}`}>
            <div className="flex flex-col gap-10 md:flex-row md:justify-evenly py-25 ">
                <FooterNavigationLinks/>
                <FooterDataStructureLinks/>
                <FooterAlgorithmLinks/>
            </div>
            <SocialMediaLinks/>
            <hr />
            <p className="p-3 text-center">&copy; all rights are reserved by VizLearn</p>
        </div>
    )
}