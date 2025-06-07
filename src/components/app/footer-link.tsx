import Smile from "@/assets/smile.png";
import Snap from "@/assets/snap.png";
import { Link } from "react-router-dom";

const FooterButton = () => {
    return (
        <div className="relative tab:hidden group">
            <Link to={'https://abdullahelmetwali.vercel.app/'} className="text-sm ring-1 ring-muted-foreground px-8 py-1 rounded-2xl" target="_blank">
                AM
            </Link>

            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="relative w-10 h-20 overflow-hidden">
                    <img
                        src={Smile}
                        alt="smile"
                        className="absolute top-0 left-0 w-10 h-12 opacity-100 group-hover:opacity-0 transition-opacity duration-200 delay-200 brightness-[0.85]"
                    />
                    <img
                        src={Snap}
                        alt="snap"
                        className="absolute top-0 left-0 w-10 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-200 brightness-[0.85]"
                    />
                </div>
            </div>
        </div>
    );
};
export default FooterButton;