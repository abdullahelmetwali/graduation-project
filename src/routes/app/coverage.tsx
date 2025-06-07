import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { AlertCircle } from "lucide-react";

import type { CoverageData } from "@/types";
import { useHistory } from "@/store/calculations-history";

import calculateCoverage from "@/utils/calculate-coverage";
import CoverageCalculationSteps from "@/components/coverage/steps";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import InputBox from "@/components/mine-ui/input-box";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


export default function Coverage() {
    document.title = 'Coverage | 5G Planning Tool';
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const { coverage, setCoverage } = useHistory();

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

        trPowergNB: null,
        trPowerUE: null,

        sinrUL: null,
        sinrDL: null,

        antennaGain: null,
        buildingLoss: null,

        shadowFaddingSelected: null,
        shadowFaddingLoss: null,

        foliageLoss: null
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

            trPowergNB: null,
            trPowerUE: null,

            sinrUL: null,
            sinrDL: null,

            antennaGain: null,
            buildingLoss: null,

            shadowFaddingSelected: null,
            shadowFaddingLoss: null,

            foliageLoss: null
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

    const addCoverageToHistory = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newDataEntry = { id: Date.now(), ...data };

        const isDuplicate = coverage.some(entry =>
            JSON.stringify(entry) === JSON.stringify(data)
        );

        if (isDuplicate) return;

        const calcRes = calculateCoverage(data);
        setResult(calcRes);

        const updatedCoverage = [...coverage, newDataEntry];
        setCoverage(updatedCoverage);
        localStorage.setItem('coverage', JSON.stringify(updatedCoverage));
    };

    if (!user) return null;
    return (
        <main className="grid place-items-center min-h-[90dvh] py-24 max-lg:py-20">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Coverage</CardTitle>

                    <CardDescription>
                        Here you can calculate how many sites you need.
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={(e) => addCoverageToHistory(e)}>
                        <div className="w-full">
                            <InputBox
                                type="number"
                                value={data.area}
                                onChange={(value: number) => setData(prev => ({ ...prev, area: Number(value) }))}
                                label="area"
                                placeHolder="Enter the place's area here..."
                                content="Total area you need to calculate"
                                badge="in (KM²)"
                                className="w-full"
                            />

                        </div>

                        <div className="grid lg:grid-cols-2 gap-2 items-center">
                            <div className="w-full space-y-1">
                                <Label htmlFor="frequency">Frequency</Label>
                                <Select
                                    value={data.frequency?.toString()}
                                    onValueChange={(value) =>
                                        setData((prev) => ({ ...prev, frequency: Number(value) }))
                                    }
                                    required
                                >
                                    <SelectTrigger id="frequency">
                                        <SelectValue placeholder="Choose frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="3.5">3.5 GHZ</SelectItem>
                                            <SelectItem value="28">28 GHZ</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full">
                                <InputBox
                                    type="number"
                                    value={data.bandwidth}
                                    onChange={(value: number) => setData(prev => ({ ...prev, bandwidth: Number(value) }))}
                                    label="bandwidth"
                                    placeHolder="Enter the bandwidth here..."
                                    content="Amount of data you can send per second"
                                    badge="in (HZ)"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <div className="w-full space-y-1">
                                <Label htmlFor="enviroment-type">Enviroment type</Label>
                                <Select
                                    value={data.buildingLoss?.toString()}
                                    onValueChange={(value) =>
                                        setData((prev) => ({ ...prev, buildingLoss: Number(value) }))
                                    }
                                    required
                                >
                                    {
                                        data.frequency ?
                                            <SelectTrigger id="enviroment-type" disabled={!data.frequency}>
                                                <SelectValue placeholder="Choose enviroment type" />
                                            </SelectTrigger>
                                            :
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SelectTrigger id="enviroment-type" disabled={!data.frequency}>
                                                        <SelectValue placeholder="Choose enviroment type" />
                                                    </SelectTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent className="flex items-center !text-sm gap-2 text-destructive font-semibold">
                                                    <AlertCircle size={16} /> Please select a frequency first
                                                </TooltipContent>
                                            </Tooltip>
                                    }
                                    <SelectContent>
                                        {
                                            data.frequency === 3.5 ?
                                                <SelectGroup>
                                                    <SelectItem value="26">Dense Urban</SelectItem>
                                                    <SelectItem value="22">Urban</SelectItem>
                                                    <SelectItem value="15">Rural</SelectItem>
                                                </SelectGroup>
                                                :
                                                <SelectGroup>
                                                    <SelectItem value="28">Dense Urban</SelectItem>
                                                    <SelectItem value="24">Urban</SelectItem>
                                                    <SelectItem value="17">Rural</SelectItem>
                                                </SelectGroup>
                                        }
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full space-y-1">
                                <Label htmlFor="tree-type">Tree density</Label>
                                <Select
                                    value={data.foliageLoss?.toString()}
                                    onValueChange={(value) =>
                                        setData((prev) => ({ ...prev, foliageLoss: Number(value) }))
                                    }
                                    required
                                >
                                    {
                                        data.frequency ?
                                            <SelectTrigger id="tree-type" disabled={!data.frequency}>
                                                <SelectValue placeholder="Choose trees type" />
                                            </SelectTrigger>
                                            :
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SelectTrigger id="tree-type" disabled={!data.frequency}>
                                                        <SelectValue placeholder="Choose trees type" />
                                                    </SelectTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent className="flex items-center !text-sm gap-2 text-destructive font-semibold">
                                                    <AlertCircle size={16} /> Please select a frequency first
                                                </TooltipContent>
                                            </Tooltip>
                                    }
                                    <SelectContent>
                                        {
                                            data.frequency === 3.5 ?
                                                <SelectGroup>
                                                    <SelectItem value="7.5">Sparse Tree</SelectItem>
                                                    <SelectItem value="8.5">Dense Tree</SelectItem>
                                                    <SelectItem value="19.5">3 Tree</SelectItem>
                                                    <SelectItem value="11">2 Tree</SelectItem>
                                                    <SelectItem value="17">Typical</SelectItem>
                                                </SelectGroup>
                                                :
                                                <SelectGroup>
                                                    <SelectItem value="8">Sparse Tree</SelectItem>
                                                    <SelectItem value="15">Dense Tree</SelectItem>
                                                    <SelectItem value="24">3 Tree</SelectItem>
                                                    <SelectItem value="19">2 Tree</SelectItem>
                                                    <SelectItem value="30">Typical</SelectItem>
                                                </SelectGroup>
                                        }
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        <div className="grid lg:grid-cols-2 gap-2 items-center">
                            <div className="w-full space-y-1">
                                <Label htmlFor="config">Antenna Config</Label>
                                <Select
                                    value={data.antennaGain?.toString()}
                                    onValueChange={(value) =>
                                        setData((prev) => ({ ...prev, antennaGain: Number(value) }))
                                    }
                                    required
                                >
                                    <SelectTrigger id="config">
                                        <SelectValue placeholder="Choose antenna config" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="24">64T64R AAU</SelectItem>
                                            <SelectItem value="21">32T32R AAU</SelectItem>
                                            <SelectItem value="18">16T16R AAU</SelectItem>
                                            <SelectItem value="15">8T8R RRU</SelectItem>
                                            <SelectItem value="12">4T4R</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full">
                                <InputBox
                                    type="number"
                                    value={data.subCarrier}
                                    onChange={(value: number) => setData(prev => ({ ...prev, subCarrier: Number(value) }))}
                                    label="sub-carrier"
                                    placeHolder="Enter the sub-carrier here..."
                                    content=" It's the frequency gap between two near subcarriers"
                                    badge="in (HZ)"
                                    className=""
                                />
                            </div>
                        </div>

                        {/* shadow fading */}
                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <div className="w-full space-y-1">
                                <Label htmlFor="selected-sl">Shadow Fading Scenario</Label>
                                <Select
                                    value={data.shadowFaddingSelected?.toString()}
                                    onValueChange={(value) =>
                                        setData((prev) => ({ ...prev, shadowFaddingSelected: Number(value) }))
                                    }
                                    required
                                >
                                    <SelectTrigger id="selected-sl">
                                        <SelectValue placeholder="Choose shadow fading scenario type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="2">NLOS</SelectItem>
                                            <SelectItem value="3">LOS</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full space-y-1">
                                <Label htmlFor="loss-sl">
                                    Fading Margin
                                </Label>
                                <Select
                                    value={data.shadowFaddingLoss?.toString()}
                                    onValueChange={(value) =>
                                        setData((prev) => ({ ...prev, shadowFaddingLoss: Number(value) }))
                                    }
                                    required
                                >
                                    {
                                        data.shadowFaddingSelected ?
                                            <SelectTrigger id="loss-sl">
                                                <SelectValue placeholder="Choose fading margin loss" />
                                            </SelectTrigger>
                                            :
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SelectTrigger id="loss-sl" disabled={!data.shadowFaddingSelected}>
                                                        <SelectValue placeholder="Choose fading margin loss" />
                                                    </SelectTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent className="flex items-center !text-sm gap-2 text-destructive font-semibold">
                                                    <AlertCircle size={16} /> Please select a shadow fading margin type first
                                                </TooltipContent>
                                            </Tooltip>
                                    }
                                    <SelectContent>
                                        {
                                            // 2 === nLos 
                                            data.shadowFaddingSelected === 2 ?
                                                <SelectGroup>
                                                    <SelectItem value="8">Rural Macro (RMa)</SelectItem>
                                                    <SelectItem value="6">Urban Macro (UMa)</SelectItem>
                                                    <SelectItem value="7.82">Urban Micro (UMi)</SelectItem>
                                                    <SelectItem value="8.03">Indoor Hotspot (InH)</SelectItem>
                                                </SelectGroup>
                                                :
                                                // los
                                                <SelectGroup>
                                                    {/* <SelectItem value="4">Rural Macro (RMa)</SelectItem> */}
                                                    <SelectItem value="4">Urban Macro (UMa)</SelectItem>
                                                    {/* <SelectItem value="4">Urban Micro (UMi)</SelectItem> */}
                                                    <SelectItem value="3">Indoor Hotspot (InH)</SelectItem>
                                                </SelectGroup>
                                        }
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        <div className="flex gap-2 items-center max-lg:flex-col">
                            <div className="w-full space-y-1">
                                <Label htmlFor="sinr-dl">
                                    Code Rate <strong className="text-muted-foreground">( SINR )</strong> DL
                                </Label>
                                <Select
                                    value={data.sinrDL?.toString()}
                                    onValueChange={(value) =>
                                        setData((prev) => ({ ...prev, sinrDL: Number(value) }))
                                    }
                                    required
                                >
                                    <SelectTrigger id="sinr-dl">
                                        <SelectValue placeholder="Choose the code rate downlink" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="-6.7">0.076</SelectItem>
                                            <SelectItem value="-4.7">0.12</SelectItem>
                                            <SelectItem value="-2.3">0.19</SelectItem>
                                            <SelectItem value="0.2">0.30</SelectItem>
                                            <SelectItem value="5.9">0.37</SelectItem>
                                            <SelectItem value="2.4">0.44</SelectItem>
                                            <SelectItem value="11.7">0.45</SelectItem>
                                            <SelectItem value="8">0.48</SelectItem>
                                            <SelectItem value="14">0.55</SelectItem>
                                            <SelectItem value="4.3">0.59</SelectItem>
                                            <SelectItem value="10.3">0.60</SelectItem>
                                            <SelectItem value="16.3">0.65</SelectItem>
                                            <SelectItem value="18.7">0.75</SelectItem>
                                            <SelectItem value="21">0.85</SelectItem>
                                            <SelectItem value="22.7">0.93</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full space-y-1">
                                <Label htmlFor="sinr-ul">
                                    Code Rate <strong className="text-muted-foreground">( SINR )</strong> UL
                                </Label>
                                <Select
                                    value={data.sinrUL?.toString()}
                                    onValueChange={(value) =>
                                        setData((prev) => ({ ...prev, sinrUL: Number(value) }))
                                    }
                                    required
                                >
                                    <SelectTrigger id="sinr-ul">
                                        <SelectValue placeholder="Choose the code rate uplink" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="-6.7">0.076</SelectItem>
                                            <SelectItem value="-4.7">0.12</SelectItem>
                                            <SelectItem value="-2.3">0.19</SelectItem>
                                            <SelectItem value="0.2">0.30</SelectItem>
                                            <SelectItem value="5.9">0.37</SelectItem>
                                            <SelectItem value="2.4">0.44</SelectItem>
                                            <SelectItem value="11.7">0.45</SelectItem>
                                            <SelectItem value="8">0.48</SelectItem>
                                            <SelectItem value="14">0.55</SelectItem>
                                            <SelectItem value="4.3">0.59</SelectItem>
                                            <SelectItem value="10.3">0.60</SelectItem>
                                            <SelectItem value="16.3">0.65</SelectItem>
                                            <SelectItem value="18.7">0.75</SelectItem>
                                            <SelectItem value="21">0.85</SelectItem>
                                            <SelectItem value="22.7">0.93</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        {/* buttons */}
                        <div className="space-x-2">
                            <Button type="submit" variant="secondary">
                                Calculate
                            </Button>
                            <Button type="button" variant="destructive" onClick={reset}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="grid gap-4">
                    <div className=" space-y-2">
                        {
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
                        }

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
                                <Badge>{result.NUMBER_OF_SITES_DL}</Badge>
                            </div>
                        }

                        {
                            result.NUMBER_OF_SITES_UL &&
                            <div className="flex items-center gap-2">
                                <p>NUMBER OF SITES UL ( UPLOAD )</p>
                                <Badge>{result.NUMBER_OF_SITES_UL}</Badge>
                            </div>
                        }
                    </div>
                    {
                        (result.DL_MAPL && result.UL_MAPL &&
                            result.dlRxSensitivity && result.ulRxSensitivity &&
                            result.NUMBER_OF_SITES_DL && result.NUMBER_OF_SITES_UL)
                        &&
                        <CoverageCalculationSteps data={data} result={result} />
                    }
                </CardFooter>
            </Card>
        </main>
    );
};