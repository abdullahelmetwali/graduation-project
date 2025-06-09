import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Album } from "lucide-react";

export default function Abstract() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Album />
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl max-lg:text-start">About</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <article>
                    We developed a simple web-based tool was developed to assist in coverage and capacity estimation by allowing users to input specific parameters such as frequency band, antenna configuration, user density, and environment type. Focusing in streamed <strong className="text-muted-foreground">LOGIC</strong> and beautiful <strong className="text-muted-foreground">UI</strong> This tool was implemented using typescript, tanstack/query,   shadcn/ui, vite, react, firebase, tailwindcss and react-router-dom for the interface, enabling interactive calculations of link budget, number of required sites, and approximate coverage area for different 5G scenarios.
                </article>
            </DialogContent >
        </Dialog >
    )
}