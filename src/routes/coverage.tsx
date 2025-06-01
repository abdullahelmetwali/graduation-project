import { useState } from "react";
import type { CoverageData } from "@/types";
import calculateCoverage from "@/utils/calculate-coverage";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import InputBox from "@/components/used-ui/input-box";

export default function Coverage() {
    document.title = 'Coverage | 5G Planning Tool';

    const [data, setData] = useState<CoverageData>({
        area: null,
        frequency: null,
        bandwidth: null,
        subCarrier: null,
        covergeProbability: null,

        upload: null,
        download: null,

        noiseFactorUE: null,
        noiseFactorENB: null,

        trPowerENB: null,
        trPowerUE: null,

        sinrUL: null,
        sinrDL: null
    });

    const [result, setResult] = useState({
        dlRxSensitivity: null,
        ulRxSensitivity: null,
        DL_MAPL: null,
        UL_MAPL: null,
        NUMBER_OF_SITES_DL: null,
        NUMBER_OF_SITES_UL: null,
    });

    const reset = () => {
        setData({
            area: null,
            frequency: null,
            bandwidth: null,
            subCarrier: null,
            covergeProbability: null,

            upload: null,
            download: null,

            noiseFactorUE: null,
            noiseFactorENB: null,

            trPowerENB: null,
            trPowerUE: null,

            sinrUL: null,
            sinrDL: null
        });

        setResult({
            dlRxSensitivity: null,
            ulRxSensitivity: null,
            DL_MAPL: null,
            UL_MAPL: null,
            NUMBER_OF_SITES_DL: null,
            NUMBER_OF_SITES_UL: null,
        });
    };

    return (
        <main className="grid place-items-center min-h-dvh max-lg:py-16">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Coverage</CardTitle>

                    <CardDescription>
                        Here you can calculate how many sites you need.
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        const resultFromCalc = calculateCoverage(data);
                        setResult(resultFromCalc);
                    }}>
                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <InputBox
                                type="number"
                                value={data.area}
                                onChange={(value: number) => setData(prev => ({ ...prev, area: Number(value) }))}
                                label="area"
                                placeHolder="Enter the place's area here..."
                                content="Total area you need to calculate"
                                badge="in (KM²)"
                                className=""
                            />

                            <InputBox
                                type="number"
                                value={data.covergeProbability}
                                onChange={(value: number) => setData(prev => ({ ...prev, covergeProbability: Number(value) }))}
                                label="Coverge Probability"
                                placeHolder="Enter the coverge probability here..."
                                content="The coverge probability you need"
                                badge="in (Percentage (%))"
                                className=""
                            />
                        </div>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <InputBox
                                type="number"
                                value={data.frequency}
                                onChange={(value: number) => setData(prev => ({ ...prev, frequency: Number(value) }))}
                                label="frequency"
                                placeHolder="Enter the frequency here..."
                                content="Frequency of the total area"
                                badge="in (GHZ)"
                                className=""
                            />

                            <InputBox
                                type="number"
                                value={data.bandwidth}
                                onChange={(value: number) => setData(prev => ({ ...prev, bandwidth: Number(value) }))}
                                label="bandwidth"
                                placeHolder="Enter the bandwidth here..."
                                content="Amount of data you can send per second"
                                badge="in (HZ)"
                                className=""
                            />
                        </div>

                        <div className="w-full !my-3">
                            <InputBox
                                type="number"
                                value={data.subCarrier}
                                onChange={(value: number) => setData(prev => ({ ...prev, subCarrier: Number(value) }))}
                                label="sub-carrier"
                                placeHolder="Enter the sub-carrier here..."
                                content=" It's the frequency gap between two near subcarriers"
                                badge="in (HZ)"
                                className="w-full"
                            />
                        </div>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <InputBox
                                type="number"
                                value={data.noiseFactorUE}
                                onChange={(value: number) => setData(prev => ({ ...prev, noiseFactorUE: Number(value) }))}
                                label="noise factor user equipment"
                                placeHolder="Enter the user equipment here..."
                                content="Amount of internal noise the user's device adds"
                                badge="in (DB)"
                                className=""
                            />

                            <InputBox
                                type="number"
                                value={data.noiseFactorENB}
                                onChange={(value: number) => setData(prev => ({ ...prev, noiseFactorENB: Number(value) }))}
                                label="noice factor of station "
                                placeHolder="Enter the coverge probability here..."
                                content="Amount of noise added by the base station's components"
                                badge="in (DB)"
                                className=""
                            />
                        </div>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <InputBox
                                type="number"
                                value={data.sinrDL}
                                onChange={(value: number) => setData(prev => ({ ...prev, sinrDL: Number(value) }))}
                                label="SINR DownLink"
                                placeHolder="Enter the sinr downlink here..."
                                content="Signal quality at the UE when receiving data from the base station (downloading)"
                                badge="in (DB)"
                                className=""
                            />

                            <InputBox
                                type="number"
                                value={data.sinrUL}
                                onChange={(value: number) => setData(prev => ({ ...prev, sinrUL: Number(value) }))}
                                label="SINR UpLink"
                                placeHolder="Enter the sinr uplink here..."
                                content="Signal quality at the base station when receiving data from the (UE) (uploading)"
                                badge="in (DB)"
                                className=""
                            />
                        </div>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <InputBox
                                type="number"
                                value={data.trPowerENB}
                                onChange={(value: number) => setData(prev => ({ ...prev, trPowerENB: Number(value) }))}
                                label="eNodeB Power"
                                placeHolder="Enter the eNodeB here..."
                                content="The maximum number of transmission power for the base station"
                                badge="in (dBm)"
                                className=""
                            />

                            <InputBox
                                type="number"
                                value={data.trPowerUE}
                                onChange={(value: number) => setData(prev => ({ ...prev, trPowerUE: Number(value) }))}
                                label="UE Power"
                                placeHolder="Enter the UE power here..."
                                content="The maximum number of sending (transmitting) power for user's device"
                                badge="in (dBm)"
                                className=""
                            />
                        </div>

                        {/* buttons */}
                        <div className="space-x-2">
                            <Button type="submit" variant="secondary">
                                Calculate
                            </Button>
                            <Button variant="destructive" onClick={reset}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="grid gap-2">
                    {/* {
                        result.dlRxSensitivity &&
                        <div className="flex items-center gap-2">
                            <p>Download sensitivity (RX Sens. ( DL ))</p>
                            <Badge>{result.dlRxSensitivity} dBM</Badge>
                        </div>
                    }

                    {
                        result.ulRxSensitivity &&
                        <div className="flex items-center gap-2">
                            <p>Upload sensitivity (RX Sens. ( UL ))</p>
                            <Badge>{result.ulRxSensitivity} dBM</Badge>
                        </div>
                    } */}
                    {
                        result.DL_MAPL &&
                        <div className="flex items-center gap-2">
                            <p>DL_MAPL</p>
                            <Badge>{result.DL_MAPL} dB</Badge>
                        </div>
                    }
                    {
                        result.UL_MAPL &&
                        <div className="flex items-center gap-2">
                            <p>UL_MAPL</p>
                            <Badge>{result.UL_MAPL} dB</Badge>
                        </div>
                    }

                    {
                        result.NUMBER_OF_SITES_DL &&
                        <div className="flex items-center gap-2">
                            <p>NUMBER OF SITES DL ( DOWNLOAD )</p>
                            <Badge>{result.NUMBER_OF_SITES_DL} 🚧</Badge>
                        </div>
                    }

                    {
                        result.NUMBER_OF_SITES_UL &&
                        <div className="flex items-center gap-2">
                            <p>NUMBER OF SITES UL ( UPLOAD )</p>
                            <Badge>{result.NUMBER_OF_SITES_UL} 🚧</Badge>
                        </div>
                    }
                </CardFooter>
            </Card>
        </main>
    );
};