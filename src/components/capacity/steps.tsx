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
import type { CapacityData } from '@/types';
import { Calculator, ChevronRight, Users, Signal, Activity } from 'lucide-react';

export default function CapacityCalculationSteps({ data }: { data: CapacityData }) {
    const {
        population, mobilePenetration, marketShare, bler, busyHourActiveUsers, siteCapacity,
        voiceCallDutyRatio, voiceCallMin, voiceCallRate, voiceCallRatio,
        streamingDutyRatio, streamingMin, streamingRate, streamingRatio,
        gamingDutyRatio, gamingMin, gamingRate, gamingRatio,
        browsingDutyRatio, browsingMin, browsingRate, browsingRatio,
    } = data;

    const activeUsers = population * (mobilePenetration / 100) * (marketShare / 100) * (busyHourActiveUsers / 100);

    const voiceTrafficPerUser = ((voiceCallRate) * (voiceCallMin) * (voiceCallDutyRatio / 100)) / (1 - bler);
    const browsingTrafficPerUser = ((browsingRate) * (browsingMin) * (browsingDutyRatio / 100)) / (1 - bler);
    const streamingTrafficPerUser = ((streamingRate) * (streamingMin) * (streamingDutyRatio / 100)) / (1 - bler);
    const gamingTrafficPerUser = ((gamingRate) * (gamingMin) * (gamingDutyRatio / 100)) / (1 - bler);

    const totalVoiceTraffic = (voiceCallRatio / 100) * activeUsers * voiceTrafficPerUser;
    const totalBrowsingTraffic = (browsingRatio / 100) * activeUsers * browsingTrafficPerUser;
    const totalStreamingTraffic = (streamingRatio / 100) * activeUsers * streamingTrafficPerUser;
    const totalGamingTraffic = (gamingRatio / 100) * activeUsers * gamingTrafficPerUser;

    const totalTrafficDemand = (totalVoiceTraffic + totalBrowsingTraffic + totalStreamingTraffic + totalGamingTraffic) / 60;

    const steps = [
        {
            icon: <Users className="w-5 h-5 text-blue-500" />,
            title: "Calculate Active Users",
            description: `We start by determining the number of active users during busy hours. From a total population of ${population.toLocaleString()} people, we apply the mobile penetration rate of ${mobilePenetration}%, then factor in our market share of ${marketShare}%, and finally consider that ${busyHourActiveUsers}% of users are active during busy hours.`,
            formula: `${population.toLocaleString()} × ${mobilePenetration}% × ${marketShare}% × ${busyHourActiveUsers}%`,
            result: `${Math.round(activeUsers).toLocaleString()} active users`
        },
        {
            icon: <Signal className="w-5 h-5 text-purple-500" />,
            title: "Calculate Traffic Per User by Service",
            description: `Next, we calculate how much traffic each user generates for different services. For each service type, we multiply the call/session rate by duration and duty ratio, then adjust for Block Error Rate (BLER) of ${(bler * 100).toFixed(1)}% to account for retransmissions.`,
            formula: "For each service: (Rate × Duration × Duty Ratio) ÷ (1 - BLER)",
            result: `Voice: ${voiceTrafficPerUser.toFixed(2)} mbps/user <br/> 
            Browsing: ${browsingTrafficPerUser.toFixed(2)} mbps/user <br/> 
            Streaming: ${streamingTrafficPerUser.toFixed(2)} mbps/user <br/> 
            Gaming: ${gamingTrafficPerUser.toFixed(2)} mbps/user`
        },
        {
            icon: <Activity className="w-5 h-5 text-green-500" />,
            title: "Calculate Total Traffic by Service",
            description: `We then determine the total traffic demand for each service by multiplying the active users by the percentage using each service and their respective traffic per user. Voice calling represents ${voiceCallRatio}% of users, browsing ${browsingRatio}%, streaming ${streamingRatio}%, and gaming ${gamingRatio}%.`,
            formula: "For each service: (Service Ratio × Active Users × Traffic Per User)",
            result: `Voice: ${Math.round(totalVoiceTraffic).toLocaleString()} mbps <br/> 
            Browsing: ${Math.round(totalBrowsingTraffic).toLocaleString()} mbps <br/> 
            Streaming: ${Math.round(totalStreamingTraffic).toLocaleString()} mbps <br/> 
            Gaming: ${Math.round(totalGamingTraffic).toLocaleString()} mbps`
        },
        {
            icon: <Calculator className="w-5 h-5 text-orange-500" />,
            title: "Calculate Final Traffic Demand",
            description: `Finally, we sum all service traffic demands and convert from kilobits per second to megabits per second by dividing by 60. This gives us the total bandwidth requirement needed to serve all active users across all services during peak busy hours.`,
            formula: `(${Math.round(totalVoiceTraffic).toLocaleString()} + ${Math.round(totalBrowsingTraffic).toLocaleString()} + ${Math.round(totalStreamingTraffic).toLocaleString()} + ${Math.round(totalGamingTraffic).toLocaleString()}) ÷ 60`,
            result: `${totalTrafficDemand.toFixed(2)} Mbps total traffic demand`
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
                        Traffic Demand Calculation Steps
                    </DrawerTitle>
                    <DrawerDescription>
                        Follow the step-by-step process of how we calculate the total traffic demand for your network.
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
                                Based on all calculations above, the total traffic demand for your network during busy hours is:
                            </p>
                            <div className="text-3xl font-bold text-primary">
                                {Math.ceil(totalTrafficDemand / siteCapacity)} Mbps
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                This represents the bandwidth needed to serve {Math.round(activeUsers).toLocaleString()} active users across all services
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
};