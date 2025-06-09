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
                    <DialogTitle className="text-2xl">ABSTRACT</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <article className="h-[25rem] overflow-y-scroll">
                    In this book we focus on studying Some 5G NR Key Features Such as massive MIMO and Beamforming and how they are modeled by ATOLL, a network design and planning software We apply this in planning a sample area of Cairo to simulate the different coverage regions, signal quality, Capacity predictions depending on Calculating and the study of Coverage and Capacity dimensioning for this area.
                    From This Simulation we can determine some parameters such as the receiver height, the transmitter height, the number of antennas used in transmission and reception, the number of beams used by the beam-based antennas, the number of users, and the different MIMO techniques, were tested and varied in order to understand their impact in the area the cell can cover, its capacity, the traffic loads that can be handled and the data rates experienced by the users. And we will discuss some Planning and Optimization Challenges that face 5G radio Networks and their proposed solutions.
                    From the different studies performed, it was demonstrated how Massive MIMO and beamforming technique improved the signal quality and the network capacity thanks to high gain beams pointed toward users.
                    Additionally, a simple web-based tool was developed to assist in coverage and capacity estimation by allowing users to input specific parameters such as frequency band, antenna height, user density, and environment type. This tool was implemented using Javascript for the interface, enabling interactive calculations of link budget, number of required sites, and approximate coverage area for different (5G) scenarios.
                </article>
            </DialogContent >
        </Dialog >
    )
}