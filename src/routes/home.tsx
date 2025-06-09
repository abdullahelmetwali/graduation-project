import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { auth } from "@/config/firebase";
import { toast } from "@/hooks/use-toast";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    document.title = 'Home | 5G Planning Tool';
    const [isUserHere, setIsUserHere] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = onAuthStateChanged(auth, (nowUser) => {
            setIsUserHere(nowUser)
        });
        return () => isLoggedIn();
    }, []);

    const seeIfUser = (link: string) => {
        if (isUserHere) {
            navigate(link);
        } else {
            toast({
                variant: 'destructive',
                title: '🤨 Login first',
                description: "You can't make any calculations without account",
                action: (
                    <ToastAction altText="Go to login" onClick={() => navigate("/login")}>
                        Login
                    </ToastAction>
                ),
            })
        }
    };

    return (
        <main className="grid place-items-center min-h-[85dvh] max-lg:px-4">
            <div>
                <h1 className="text-5xl text-center w-full font-semibold">
                    5G Planning Tools
                </h1>
                <div className="my-10 space-y-4">
                    <Button variant="outline" className="text-base !py-5 w-full" onClick={() => seeIfUser('/statistics')}>
                        Mobile Economy Statistics
                    </Button>
                    <div className="flex w-full justify-center gap-4  max-lg:flex-col">
                        <Button variant="default" className="!py-5 w-full" onClick={() => seeIfUser('/capacity')}>
                            Capacity Calculation
                        </Button>
                        <Button variant="default" className="!py-5 w-full" onClick={() => seeIfUser('/coverage')}>
                            Coverage Calculation
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}