import type { CapacityData } from "@/types";
import { useEffect, useState, type FormEvent } from "react";
import calculateCapacity from "@/utils/calculate-capacity";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import InputBox from "@/components/mine-ui/input-box";
import { Badge } from "@/components/ui/badge";
import { useHistory } from "@/store/calculations-history";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import CapacityCalculationSteps from "@/components/capacity/steps";

export default function Capacity() {
    document.title = 'Capacity | 5G Planning Tool';

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const { setCapacity, capacity } = useHistory();

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

    const [data, setData] = useState<CapacityData>({
        population: null,
        mobilePenetration: null,
        marketShare: null,
        busyHourActiveUsers: null,

        bler: null,

        voiceCallRatio: null,
        voiceCallMin: null,
        voiceCallRate: null,
        voiceCallDutyRatio: null,

        browsingRatio: null,
        browsingMin: null,
        browsingRate: null,
        browsingDutyRatio: null,

        gamingRatio: null,
        gamingMin: null,
        gamingRate: null,
        gamingDutyRatio: null,

        streamingRatio: null,
        streamingMin: null,
        streamingRate: null,
        streamingDutyRatio: null,

        siteCapacity: null
    });

    const [result, setResult] = useState(null);

    const reset = () => {
        setData({
            population: null,
            mobilePenetration: null,
            marketShare: null,
            busyHourActiveUsers: null,
            bler: 0.01,

            voiceCallRatio: null,
            voiceCallMin: null,
            voiceCallRate: null,
            voiceCallDutyRatio: null,

            browsingRatio: null,
            browsingMin: null,
            browsingRate: null,
            browsingDutyRatio: null,

            gamingRatio: null,
            gamingMin: null,
            gamingRate: null,
            gamingDutyRatio: null,

            streamingRatio: null,
            streamingMin: null,
            streamingRate: null,
            streamingDutyRatio: null,

            siteCapacity: null
        });
    };

    const addCapacityToHistory = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newDataEntry = { id: Date.now(), ...data };

        const isDuplicate = capacity.some(entry =>
            JSON.stringify(entry) === JSON.stringify(data)
        );

        if (isDuplicate) return;

        const calcRes = calculateCapacity(data);
        setResult(calcRes);

        const updatedCapacity = [...capacity, newDataEntry];
        setCapacity(updatedCapacity);
        localStorage.setItem('capacity', JSON.stringify(updatedCapacity));
    };

    // const exampleData = {
    //     population: 180000,
    //     mobilePenetration: 125,
    //     marketShare: 35,
    //     busyHourActiveUsers: 80,
    //     bler: 0.01,

    //     voiceCallRatio: 25,
    //     voiceCallMin: 3.5,
    //     voiceCallRate: 64, // kbps
    //     voiceCallDutyRatio: 40,

    //     browsingRatio: 45,
    //     browsingMin: 60,
    //     browsingRate: 1000, // kbps (1 Mbps)
    //     browsingDutyRatio: 10,

    //     streamingRatio: 20,
    //     streamingMin: 30,
    //     streamingRate: 4000, // kbps (4 Mbps)
    //     streamingDutyRatio: 20,

    //     siteCapacity: 1233.16 // Mbps
    // };

    // const unitMeasurements = {
    //     population: "person",
    //     mobilePenetration: "%",
    //     marketShare: "%",
    //     busyHourActiveUsers: "users",
    //     bler: 0.01,

    //     voiceCallRatio: "%",
    //     voiceCallMin: "minutes",
    //     voiceCallRate: "Mbps",
    //     voiceCallDutyRatio: "%",

    //     browsingRatio: "%",
    //     browsingMin: "minutes",
    //     browsingRate: "Mbps",
    //     browsingDutyRatio: "%",

    //     gamingRatio: "%",
    //     gamingMin: "minutes",
    //     gamingRate: "Mbps",
    //     gamingDutyRatio: "%",

    //     streamingRatio: "%",
    //     streamingMin: "minutes",
    //     streamingRate: "Mbps",
    //     streamingDutyRatio: "%",

    //     siteCapacity: "Mbps"
    // }

    if (!user) return null;
    return (
        <main className="grid place-items-center min-h-[90dvh] py-24 max-lg:py-20">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Capacity </CardTitle>

                    <CardDescription>
                        Here we can calculate dimension of the place we want.
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={(e) => addCapacityToHistory(e)}>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <InputBox
                                type="number"
                                value={data.population}
                                onChange={(value: number) => setData(prev => ({ ...prev, population: Number(value) }))}
                                label="population"
                                placeHolder="Enter the population here..."
                                content="Total number of people in the place"
                                badge={""}
                                className={""}
                            />

                            <InputBox
                                type="number"
                                value={data.mobilePenetration}
                                onChange={(value: number) => setData(prev => ({ ...prev, mobilePenetration: Number(value) }))}
                                label="mobile penetration"
                                placeHolder="Enter the mobile penetration here..."
                                content="Ratio of mobile subscriptions (SIMs) compared to the total population"
                                badge="in (Percentage (%))"
                                className={""}
                            />
                        </div>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <InputBox
                                type="number"
                                value={data.marketShare}
                                onChange={(value: number) => setData(prev => ({ ...prev, marketShare: Number(value) }))}
                                label="market Share"
                                placeHolder="Enter the market share here..."
                                content="Ration of total mobile users in an area that are using a specific operator’s network"
                                badge="in (Percentage (%))"
                                className={""}
                            />

                            <InputBox
                                type="number"
                                value={data.busyHourActiveUsers}
                                onChange={(value: number) => setData(prev => ({ ...prev, busyHourActiveUsers: Number(value) }))}
                                label="busy hour active users"
                                placeHolder="Enter the busy hour active users here..."
                                content="Number of users who are active on the network during the busiest hour of the day "
                                badge=""
                                className={""}
                            />
                        </div>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <InputBox
                                type="number"
                                value={data.siteCapacity}
                                onChange={(value: number) => setData(prev => ({ ...prev, siteCapacity: Number(value) }))}
                                label="site capacity"
                                placeHolder="Enter the site capacity here..."
                                content="Max data a site can support per busy hour"
                                badge="in (Mbps)"
                                className={""}
                            />

                            <InputBox
                                type="number"
                                value={data.bler}
                                onChange={(value: number) => setData(prev => ({ ...prev, bler: Number(value) }))}
                                label="block error rate"
                                placeHolder="Enter the site bler here..."
                                content="Ratio of data blocks received with errors"
                                badge="in (Percentage (%))"
                                className={""}
                            />

                        </div>

                        {/* voice calls */}
                        <div className="border-0 border-t py-4 px-1 space-y-4">
                            <p className="text-2xl font-semibold text-muted-foreground">Voice Calls</p>

                            <div className="flex gap-2 items-center max-lg:flex-col">
                                <InputBox
                                    type="number"
                                    value={data.voiceCallRatio}
                                    onChange={(value: number) => setData(prev => ({ ...prev, voiceCallRatio: Number(value) }))}
                                    label="voice call ratio"
                                    placeHolder="Enter the voice call ratio here..."
                                    content="Ration of total mobile users in an area that are using a specific operator’s network"
                                    badge="in (Percentage (%))"
                                    className={""}
                                />

                                <InputBox
                                    type="number"
                                    value={data.voiceCallMin}
                                    onChange={(value: number) => setData(prev => ({ ...prev, voiceCallMin: Number(value) }))}
                                    label="voice call minutes"
                                    placeHolder="Enter the voice call minutes here..."
                                    content="Average duration of a single voice call made by a user "
                                    badge=""
                                    className={""}
                                />
                            </div>

                            <div className="flex gap-2 items-center max-lg:flex-col">
                                <InputBox
                                    type="number"
                                    value={data.voiceCallRate}
                                    onChange={(value: number) => setData(prev => ({ ...prev, voiceCallRate: Number(value) }))}
                                    label="voice Call Rate"
                                    placeHolder="Enter the voice call rate here..."
                                    content="Amount of data consumed per voice call during a call session"
                                    badge="in (Mbps)"
                                    className={""}
                                />

                                <InputBox
                                    type="number"
                                    value={data.voiceCallDutyRatio}
                                    onChange={(value: number) => setData(prev => ({ ...prev, voiceCallDutyRatio: Number(value) }))}
                                    label="voice call duty ratio"
                                    placeHolder="Enter the voice call duty ratio here..."
                                    content="Amount of time that the data transmission is actually active during a session"
                                    badge="in (Percentage (%))"
                                    className={""}
                                />
                            </div>

                        </div>

                        {/* browsing */}
                        <div className="border-x-0 border py-4 px-1 space-y-4">
                            <p className="text-2xl font-semibold text-muted-foreground">Browsing</p>

                            <div className="flex gap-2 items-center max-lg:flex-col">
                                <InputBox
                                    type="number"
                                    value={data.browsingRatio}
                                    onChange={(value: number) => setData(prev => ({ ...prev, browsingRatio: Number(value) }))}
                                    label="browsing ratio"
                                    placeHolder="Enter the browsing ratio here..."
                                    content="Ratio of total active users who are browsing the internet during the busy hour"
                                    badge="in (Percentage (%))"
                                    className={""}
                                />

                                <InputBox
                                    type="number"
                                    value={data.browsingMin}
                                    onChange={(value: number) => setData(prev => ({ ...prev, browsingMin: Number(value) }))}
                                    label="browsing minutes"
                                    placeHolder="Enter the browsing minutes here..."
                                    content="Average session duration for browsing"
                                    badge=""
                                    className={""}
                                />
                            </div>

                            <div className="flex gap-2 items-center max-lg:flex-col">
                                <InputBox
                                    type="number"
                                    value={data.browsingRate}
                                    onChange={(value: number) => setData(prev => ({ ...prev, browsingRate: Number(value) }))}
                                    label="browsing rate"
                                    placeHolder="Enter the browsing rate here..."
                                    content="Amount of data rate (speed) used during browsing"
                                    badge="in (Mbps)"
                                    className={""}
                                />

                                <InputBox
                                    type="number"
                                    value={data.browsingDutyRatio}
                                    onChange={(value: number) => setData(prev => ({ ...prev, browsingDutyRatio: Number(value) }))}
                                    label="browsing duty ratio"
                                    placeHolder="Enter the browsing duty ratio here..."
                                    content="Amount of time that the data transmission is actually active during a browsing session"
                                    badge="in (Percentage (%))"
                                    className={""}
                                />
                            </div>

                        </div>

                        {/* gaming */}
                        <div className="border-x-0 border py-4 px-1 space-y-4">
                            <p className="text-2xl font-semibold text-muted-foreground">Gaming</p>

                            <div className="flex gap-2 items-center max-lg:flex-col">
                                <InputBox
                                    type="number"
                                    value={data.gamingRatio}
                                    onChange={(value: number) => setData(prev => ({ ...prev, gamingRatio: Number(value) }))}
                                    label="gaming ratio"
                                    placeHolder="Enter the gaming ratio here..."
                                    content="Ratio of total active users who are gaming the internet during the busy hour"
                                    badge="in (Percentage (%))"
                                    className={""}
                                />

                                <InputBox
                                    type="number"
                                    value={data.gamingMin}
                                    onChange={(value: number) => setData(prev => ({ ...prev, gamingMin: Number(value) }))}
                                    label="gaming minutes"
                                    placeHolder="Enter the gaming minutes here..."
                                    content="Average session duration for gaming"
                                    badge=""
                                    className={""}
                                />
                            </div>

                            <div className="flex gap-2 items-center max-lg:flex-col">
                                <InputBox
                                    type="number"
                                    value={data.gamingRate}
                                    onChange={(value: number) => setData(prev => ({ ...prev, gamingRate: Number(value) }))}
                                    label="gaming rate"
                                    placeHolder="Enter the gaming rate here..."
                                    content="Amount of data rate (speed) used during gaming"
                                    badge="in (Mbps)"
                                    className={""}
                                />

                                <InputBox
                                    type="number"
                                    value={data.gamingDutyRatio}
                                    onChange={(value: number) => setData(prev => ({ ...prev, gamingDutyRatio: Number(value) }))}
                                    label="gaming duty ratio"
                                    placeHolder="Enter the gaming duty ratio here..."
                                    content="Amount of time that the data transmission is actually active during a gaming session"
                                    badge="in (Percentage (%))"
                                    className={""}
                                />
                            </div>

                        </div>

                        {/* streaming */}
                        <div className="border-0 border-b py-4 px-1 space-y-4">
                            <p className="text-2xl font-semibold text-muted-foreground">Streaming</p>

                            <div className="flex gap-2 items-center max-lg:flex-col">
                                <InputBox
                                    type="number"
                                    value={data.streamingRatio}
                                    onChange={(value: number) => setData(prev => ({ ...prev, streamingRatio: Number(value) }))}
                                    label="streaming ratio"
                                    placeHolder="Enter the streaming ratio here..."
                                    content="Ratio of total active users who are streaming the internet during the busy hour"
                                    badge="in (Percentage (%))"
                                    className={""}
                                />

                                <InputBox
                                    type="number"
                                    value={data.streamingMin}
                                    onChange={(value: number) => setData(prev => ({ ...prev, streamingMin: Number(value) }))}
                                    label="streaming minutes"
                                    placeHolder="Enter the streaming minutes here..."
                                    content="Average session duration for streaming"
                                    badge=""
                                    className={""}
                                />
                            </div>

                            <div className="flex gap-2 items-center max-lg:flex-col">
                                <InputBox
                                    type="number"
                                    value={data.streamingRate}
                                    onChange={(value: number) => setData(prev => ({ ...prev, streamingRate: Number(value) }))}
                                    label="streaming rate"
                                    placeHolder="Enter the streaming rate here..."
                                    content="Amount of data rate (speed) used during streaming"
                                    badge="in (Mbps)"
                                    className={""}
                                />

                                <InputBox
                                    type="number"
                                    value={data.streamingDutyRatio}
                                    onChange={(value: number) => setData(prev => ({ ...prev, streamingDutyRatio: Number(value) }))}
                                    label="streaming duty ratio"
                                    placeHolder="Enter the streaming duty ratio here..."
                                    content="Amount of time that the data transmission is actually active during a streaming session"
                                    badge="in (Percentage (%))"
                                    className={""}
                                />
                            </div>

                        </div>

                        <div className="space-x-2">
                            <Button
                                type="submit"
                                variant="secondary"
                            >
                                Calculate
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={reset}
                            >
                                Reset
                            </Button>
                        </div>
                    </form>

                </CardContent>
                <CardFooter className="grid">
                    {
                        result &&
                        <div className="flex items-center gap-2 text-base">
                            <p className="text-muted-foreground">Number of sites you need</p>
                            <Badge className="font-semibold text-base">{result}</Badge>
                        </div>
                    }
                    <br />
                    {
                        result &&
                        <CapacityCalculationSteps data={data} />
                    }
                </CardFooter>
            </Card>
        </main>
    );
};