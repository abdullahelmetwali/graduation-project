import { LogIn, LogOut, LucideUserSquare, UserRound, Wifi } from "lucide-react";
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
            location.pathname.includes('login') || location.pathname.includes('signup') ? "bg-transparent" : "bg-background"
        )}>
            <nav className="flex justify-between items-center w-full">
                <div>
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <Wifi className="size-4" />
                        </div>
                        5G Planning Inc.
                    </Link>
                </div>
                <div>
                    {/* {isUserHere &&
                        <>
                            <Button asChild variant="outline" className="text-base mx-2">
                                <Link to={'/capacity'}>
                                    Capacity
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="text-base">
                                <Link to={'/coverage'}>
                                    Coverage
                                </Link>
                            </Button>
                        </>
                    } */}
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