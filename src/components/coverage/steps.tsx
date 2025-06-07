import type { CoverageData, CoverageResult } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { Calculator, ChevronRight, Signal, Radio, Target, Antenna } from 'lucide-react';

export default function CoverageCalculationSteps({ data, result }: { data: CoverageData, result: CoverageResult }) {
    const { area, frequency, bandwidth, subCarrier, sinrDL, sinrUL, antennaGain } = data;

    const { dlRxSensitivity, ulRxSensitivity, DL_MAPL, UL_MAPL, NUMBER_OF_SITES_DL, NUMBER_OF_SITES_UL } = result;

    const NOISE_FLOOR = -174;
    const RESOURCE_BLOCKS = 12;
    const DL_NF_UE = 9;
    const UL_NF_UE = 5;
    const TXPOWER_GNB = 49;
    const TXPOWER_UE = 23;

    // =======================================================================================
    const logBW = 10 * Math.log10(bandwidth);
    const BW_IN_gNB = 2 * subCarrier * RESOURCE_BLOCKS;
    const logBW_GNB = 10 * Math.log10(BW_IN_gNB);

    const CABLE_LOSSES = Number(antennaGain) === 14 ? 0.5 : 0;
    const BODY_LOSSES = Number(frequency) === 3.5 ? 3 : 15;
    const IM_DL = Number(frequency) === 3.5 ? 6 : 1;
    const IM_UL = Number(frequency) === 3.5 ? 2 : 0.5;
    const RAIN_FADING = Number(frequency) === 3.5 ? 0 : 3;


    const D3D_FOR_DL = (Math.pow(10, (DL_MAPL - 28 - 20 * Math.log10(frequency)) / 22));
    const D3D_FOR_UL = (Math.pow(10, (UL_MAPL - 28 - 20 * Math.log10(frequency)) / 22));
    // =======================================================================================

    const steps = [
        {
            icon: <Signal className="w-5 h-5 text-blue-500" />,
            title: "Calculate Bandwidth Parameters",
            description: `We begin by converting bandwidth values to logarithmic form for link budget calculations. For downlink, we calculate 10 × log₁₀(${bandwidth} MHz) = ${logBW.toFixed(2)} dB. For uplink at the gNodeB, we determine the bandwidth as 2 × ${subCarrier} × ${RESOURCE_BLOCKS} = ${BW_IN_gNB} Hz, then convert to ${logBW_GNB.toFixed(2)} dB.`,
            formula: `DL: 10 × log₁₀(${bandwidth}) | UL: 10 × log₁₀(2 × ${subCarrier} × ${RESOURCE_BLOCKS})`,
            result: `DL Bandwidth: ${logBW.toFixed(2)} dB <br/> UL Bandwidth: ${logBW_GNB.toFixed(2)} dB`
        },
        {
            icon: <Radio className="w-5 h-5 text-purple-500" />,
            title: "Determine Receiver Sensitivity",
            description: `Receiver sensitivity represents the minimum signal level that can be reliably detected. We calculate this by adding the thermal noise floor (${NOISE_FLOOR} dBm/Hz), bandwidth in dB, noise figure, and required SINR. For downlink we use ${DL_NF_UE} dB noise figure and ${sinrDL} dB SINR. For uplink we use ${UL_NF_UE} dB noise figure and ${sinrUL} dB SINR.`,
            formula: `Sensitivity = ${NOISE_FLOOR} + Bandwidth(dB) + Noise Figure + SINR`,
            result: `DL Sensitivity: ${dlRxSensitivity.toFixed(2)} dBm <br/> UL Sensitivity: ${ulRxSensitivity.toFixed(2)} dBm`
        },
        {
            icon: <Target className="w-5 h-5 text-green-500" />,
            title: "Calculate Loss Factors",
            description: `Various loss factors are applied based on system configuration and frequency. Cable losses are ${CABLE_LOSSES} dB (based on ${antennaGain} dB antenna gain). Body losses are ${BODY_LOSSES} dB for ${frequency} GHz frequency. Interference margins are ${IM_DL} dB (DL) and ${IM_UL} dB (UL). Rain fading adds ${RAIN_FADING} dB for frequencies above 3.5 GHz.`,
            formula: `Losses vary by frequency and antenna configuration`,
            result: `Cable: ${CABLE_LOSSES} dB | Body: ${BODY_LOSSES} dB | Rain: ${RAIN_FADING} dB <br/> IM DL: ${IM_DL} dB | IM UL: ${IM_UL} dB`
        },
        {
            icon: <Antenna className="w-5 h-5 text-orange-500" />,
            title: "Calculate Max. Allowable Path Loss (MAPL)",
            description: `MAPL represents the maximum signal loss between transmitter and receiver while maintaining connection quality. For downlink, we start with gNodeB transmit power (${TXPOWER_GNB} dBm) plus antenna gain (${antennaGain} dB), then subtract all loss components and receiver sensitivity. The same process applies to uplink using UE transmit power (${TXPOWER_UE} dBm).`,
            formula: `MAPL = TX Power + Antenna Gain - All Losses - RX Sensitivity`,
            result: `DL MAPL: ${DL_MAPL.toFixed(2)} dB <br/> UL MAPL: ${UL_MAPL.toFixed(2)} dB`
        },
        {
            icon: <Signal className="w-5 h-5 text-red-500" />,
            title: "Calculate Coverage Distance",
            description: `Using the 3GPP path loss model PL = 22.0×log₁₀(d3D) + 28.0 + 20×log₁₀(frequency), we solve for the 3D distance d3D. This gives us the maximum coverage radius for both downlink and uplink scenarios. The formula is rearranged to d3D = 10^((MAPL - 28 - 20×log₁₀(${frequency})) / 22).`,
            formula: `d3D = 10^((MAPL - 28 - 20×log₁₀(${frequency})) / 22)`,
            result: `DL Distance: ${(D3D_FOR_DL / 1000).toFixed(2)} km <br/> UL Distance: ${(D3D_FOR_UL / 1000).toFixed(2)} km`
        },
        {
            icon: <Calculator className="w-5 h-5 text-indigo-500" />,
            title: "Determine Site Requirements",
            description: `The coverage area is calculated using π×r² and converted to km². We apply a 0.6 efficiency factor to account for hexagonal cell deployment patterns in real networks. Finally, we determine the number of sites needed by dividing the total coverage area (${area} km²) by the effective coverage area per site.`,
            formula: `Sites = Total Area ÷ (π × radius² × 0.6 efficiency factor)`,
            result: `DL Sites: ${NUMBER_OF_SITES_DL} sites <br/> UL Sites: ${NUMBER_OF_SITES_UL} sites`
        }
    ];

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Calculator className="w-4 h-4" />
                    View Calculation Steps
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
                <DrawerHeader>
                    <DrawerTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5" />
                        5G Coverage Calculation Steps
                    </DrawerTitle>
                    <DrawerDescription>
                        Follow the step-by-step process of how we calculate the coverage requirements for your 5G network.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="px-4 pb-4 overflow-y-auto">
                    <div className="space-y-6">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-4 p-4 bg-card rounded-lg border">
                                <div className="flex-shrink-0 mt-1">
                                    {step.icon}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Step {index + 1}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                        <h3 className="font-semibold">{step.title}</h3>
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>

                                    <div className="bg-muted/50 p-3 rounded-md border">
                                        <p className="text-xs text-muted-foreground mb-1">Formula:</p>
                                        <code className="text-sm font-mono">{step.formula}</code>
                                    </div>

                                    <div className="bg-primary/5 p-3 rounded-md border border-primary/20">
                                        <p className="text-xs text-muted-foreground mb-1">Result:</p>
                                        <p className="text-sm font-medium text-primary"
                                            dangerouslySetInnerHTML={{ __html: step.result }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold mb-2">Final Result</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Based on all calculations above, the coverage requirements for your ${area} km² area are:
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {NUMBER_OF_SITES_DL}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Downlink Sites</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">
                                        {NUMBER_OF_SITES_UL}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Uplink Sites</p>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                The limiting factor determines the actual number of sites needed: {Math.max(NUMBER_OF_SITES_DL, NUMBER_OF_SITES_UL)} sites
                            </p>
                        </div>
                    </div>
                </div>

                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}