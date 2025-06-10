import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import ContactUs from "@/components/app/contact-us";
import About from "@/components/app/about";

export default function Footer() {
    const location = useLocation();
    return (
        <footer className={cn("flex justify-between items-center max-lg:flex-col gap-2 py-8 lg:px-20",
            location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname.includes('forget') ? "hidden" : "bg-background"
        )}>
            <div className="hidden lg:block">
                <About />
            </div>
            <div className="flex items-center gap-2 uppercase">
                <div className="rounded-full relative before:animate-ping before:size-3.5 before:bg-lime-600 before:rounded-full before:absolute before:left-0 size-3.5 bg-lime-600"></div>
                Zero errors. Full control achieved.
            </div>
            <div className="flex items-center gap-2">
                <div className="block lg:hidden">
                    <About />
                </div>
                <ContactUs />
            </div>

        </footer>
    )
}