import { LogIn, LogOut, LucideUserSquare, UserRound } from "lucide-react";
import Logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/app/toggle-theme";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isUserHere, setIsUserHere] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const isLoggedIn = onAuthStateChanged(auth, (nowUser) => {
            setIsUserHere(nowUser)
        });
        return () => isLoggedIn();
    });

    return (
        <header className={cn("p-4 lg:px-16 fixed w-full z-50",
            location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname.includes('forget') ? "bg-transparent" : "bg-background"
        )}>
            <nav className="flex justify-between items-center w-full">
                <div>
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-white text-primary-foreground flex size-7 items-center justify-center rounded-md">
                            <img src={Logo} alt="logo" />
                        </div>
                        5G Planning Tool
                    </Link>
                </div>
                <div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    {
                        isUserHere ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-10 [&_svg]:size-5">
                                        <LucideUserSquare />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>
                                            My account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-border h-[1px]" />
                                        <DropdownMenuItem asChild>
                                            <Link to={'/profile'}>
                                                <UserRound /> Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600 hover:!text-red-600"
                                            onClick={() => auth.signOut()}
                                        >
                                            <LogOut /> Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <Button asChild variant="outline" className="w-9 [&_svg]:size-5">
                                <Link to={'/login'}>
                                    <LogIn />
                                </Link>
                            </Button>
                    }
                </div>
            </nav>
        </header>
    );
};