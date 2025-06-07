import { Badge } from "@/components/ui/badge";
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
                <div className="flex w-full justify-center gap-4 my-8 max-lg:flex-col">
                    <Button variant="outline" className="text-base !py-5" onClick={() => seeIfUser('/capacity')}>
                        5G Dimension Tool
                        <Badge>Capacity</Badge>
                    </Button>
                    <Button variant="outline" className="text-base !py-5" onClick={() => seeIfUser('/coverage')}>
                        5G Network Planning Tool
                        <Badge>Coverage</Badge>
                    </Button>
                </div>
            </div>
        </main>
    )
}