import ThemeToggle from "@/components/app/toggle-theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
    document.title = 'Home | 5G Planning Tool';
    return (
        <main className="grid place-items-center min-h-dvh">
            <div className="fixed right-8 top-4">
                <ThemeToggle />
            </div>
            <div>
                <h1 className="text-5xl text-center w-full font-semibold">
                    5G Planning Tools
                </h1>
                <div className="flex w-full justify-center gap-4 my-8 max-lg:flex-col">
                    <Button asChild variant="outline" className="text-base !py-5">
                        <Link to={'/capacity'}>
                            5G Dimension Tool
                            <Badge>Capacity</Badge>
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="text-base !py-5">
                        <Link to={'/coverage'}>
                            5G Network Planning Tool
                            <Badge>Coverage</Badge>
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
};