import Skeleton from "@/components/mine-ui/skeleton";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { CapacityData, CoverageData } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function Profile() {
    document.title = 'Profile | 5G Planning Tool';
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const [capacityCalc, setCapacityCalc] = useState([]);
    const [coverageCalc, setCoverageCalc] = useState([]);

    useEffect(() => {
        const storedCapacity = localStorage.getItem("capacity");
        const storedCoverage = localStorage.getItem("coverage");

        if (storedCapacity) setCapacityCalc(JSON.parse(storedCapacity));
        if (storedCoverage) setCoverageCalc(JSON.parse(storedCoverage));
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 200);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const getName = localStorage.getItem('user');
        const isLoggedIn = onAuthStateChanged(auth, (nowUser) => {

            if (!nowUser) {
                navigate('/login');
                return;
            }

            if (getName) {
                setUser({
                    email: nowUser?.email,
                })
            } else {
                setUser({
                    email: nowUser.email,
                    img: nowUser.photoURL
                });
            }
        });
        return () => isLoggedIn();
    }, []);

    if (isLoading) {
        return (
            <div className="grid place-items-center gap-8 h-full px-8 pt-24 md:p-10 md:pt-36">
                <div className="flex gap-2 items-center">
                    <Skeleton className="size-14 rounded-full" />
                    <Skeleton className="w-40 rounded-lg h-3" />
                </div>
                <div className="w-full lg:w-1/2 grid lg:grid-cols-2 gap-2">
                    <Skeleton className="w-full h-[50dvh] rounded-md" />
                    <Skeleton className="w-full h-[50dvh] rounded-md" />
                </div>
            </div>
        );
    };

    const deleteHistory = () => {
        localStorage.setItem('capacity', '[]');
        localStorage.setItem('coverage', '[]');
        setOpen(false);
    };

    return (
        <main className="grid place-items-center h-full px-8 pt-24 md:p-10 md:pt-36">
            <section className="flex items-start justify-between max-lg:flex-col lg:w-[47rem]">
                <div className="flex gap-2 items-center pb-8">
                    {
                        (user?.img && user) ?
                            <img src={user?.img} alt="user-image" className="size-14 rounded-full" />
                            :
                            <Button variant="outline" className="uppercase size-14 rounded-full text-lg">
                                {user?.email?.slice(0, 2)}
                            </Button>
                    }
                    <div>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            disabled={!capacityCalc.length && !coverageCalc.length}
                            variant="destructive"
                            className="max-lg:w-full lg:mt-2"
                            onClick={() => setOpen(true)}
                        >
                            Clear
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>This action might delete all your history calculations.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="max-lg:gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={deleteHistory}>
                                Clear
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>

            <Card className="my-8 p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Calculations History
                    </CardTitle>
                    <CardDescription>
                        Here's the history of your old calculations.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid lg:grid-cols-2 gap-8 items-start relative">
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Capacity</h2>
                        {
                            capacityCalc.length > 0
                                ?
                                <ul className="list-decimal ml-6 space-y-2 mx-4">
                                    {capacityCalc.map((item: CapacityData, i: number) => (
                                        <li key={i} className="">
                                            <div className="grid gap-2">
                                                <p><strong>BLER:</strong> {item.bler}</p>
                                                <p><strong>Population:</strong> {item.population} Person</p>
                                                <p><strong>Site Capacity:</strong> {item.siteCapacity} Mbps</p>
                                                <p><strong>Mobile Penetration:</strong> {item.mobilePenetration} %</p>
                                                <p><strong>Busy Hour Active Users:</strong> {item.busyHourActiveUsers} user</p>
                                                <p><strong>Market Share:</strong> {item.marketShare} %</p>

                                                <p><strong>Voice Call Ratio:</strong> {item.voiceCallRatio} %</p>
                                                <p><strong>Voice Call Duration:</strong> {item.voiceCallMin} minutes</p>
                                                <p><strong>Voice Call Rate:</strong> {item.voiceCallRate} Mbps</p>
                                                <p><strong>Voice Call Duty Ratio:</strong> {item.voiceCallDutyRatio} %</p>

                                                <p><strong>Browsing Ratio:</strong> {item.browsingRatio} %</p>
                                                <p><strong>Browsing Duration:</strong> {item.browsingMin} minutes</p>
                                                <p><strong>Browsing Rate:</strong> {item.browsingRate} Mbps</p>
                                                <p><strong>Browsing Duty Ratio:</strong> {item.browsingDutyRatio} %</p>

                                                <p><strong>Gaming Ratio:</strong> {item.gamingRatio} %</p>
                                                <p><strong>Gaming Duration:</strong> {item.gamingMin} minutes</p>
                                                <p><strong>Gaming Rate:</strong> {item.gamingRate} Mbps</p>
                                                <p><strong>Gaming Duty Ratio:</strong> {item.gamingDutyRatio} %</p>

                                                <p><strong>Streaming Ratio:</strong> {item.streamingRatio} %</p>
                                                <p><strong>Streaming Duration:</strong> {item.streamingMin} minutes</p>
                                                <p><strong>Streaming Rate:</strong> {item.streamingRate} Mbps</p>
                                                <p><strong>Streaming Duty Ratio:</strong> {item.streamingDutyRatio} %</p>
                                            </div>
                                            <hr className="my-2" />
                                        </li>
                                    ))}
                                </ul>
                                :
                                <div>
                                    <p className="text-muted-foreground">No capacity calculations done yet!</p>
                                </div>
                        }
                    </div>


                    <div className="p-4 lg:border-l">
                        <h2 className="text-2xl font-semibold mb-4">Coverage</h2>
                        {
                            coverageCalc.length > 0
                                ?
                                <ul className="list-decimal ml-6 space-y-2 mx-4">
                                    {coverageCalc.map((item: CoverageData, i: number) => (
                                        <li key={i}>
                                            <div className="grid gap-2">
                                                <p><strong>Area:</strong> {item.area} km²</p>
                                                <p><strong>Frequency:</strong> {item.frequency} MHz</p>
                                                <p><strong>Bandwidth:</strong> {item.bandwidth} MHz</p>
                                                <p><strong>Sub Carrier:</strong> {item.subCarrier}</p>
                                                <p><strong>Coverage Probability:</strong> {item.covergeProbability} %</p>

                                                <p><strong>Upload:</strong> {item.upload} Mbps</p>
                                                <p><strong>Download:</strong> {item.download} Mbps</p>

                                                <p><strong>Tr Power ENB:</strong> {item.trPowergNB} dBm</p>
                                                <p><strong>Tr Power UE:</strong> {item.trPowerUE} dBm</p>

                                                <p><strong>Noise Factor UE:</strong> {item.noiseFactorUE} dB</p>
                                                <p><strong>Noise Factor ENB:</strong> {item.noiseFactorENB} dB</p>

                                                <p><strong>SINR UL:</strong> {item.sinrUL} dB</p>
                                                <p><strong>SINR DL:</strong> {item.sinrDL} dB</p>
                                            </div>
                                            <hr className="my-2" />
                                        </li>
                                    ))}
                                </ul>
                                :
                                <div>
                                    <p className="text-muted-foreground">No coverage calculations done yet!</p>
                                </div>
                        }
                    </div>

                </CardContent>
            </Card>
        </main>
    );
};