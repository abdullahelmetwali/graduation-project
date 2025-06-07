import type { CapacityData } from "@/types";

// export default function calculateCapacity(data: CapacityData): number {
//     const activeUsers = population * (mobilePenetration / 100) * (marketShare / 100) * (busyHourActiveUsers / 100);

//     const voiceTrafficPerUser = (voiceCallRate * 1000 * (voiceCallDutyRatio / 100)) / (1 - bler);
//     const browsingTrafficPerUser = (browsingRate * 1000 * (browsingDutyRatio / 100)) / (1 - bler);
//     const streamingTrafficPerUser = (streamingRate * 1000 * (streamingDutyRatio / 100)) / (1 - bler);
//     const gamingTrafficPerUser = (gamingRate * 1000 * (gamingDutyRatio / 100)) / (1 - bler);

//     const totalVoiceTraffic = (voiceCallRatio / 100) * activeUsers * (voiceTrafficPerUser / 1000000);
//     const totalBrowsingTraffic = (browsingRatio / 100) * activeUsers * (browsingTrafficPerUser / 1000000);
//     const totalStreamingTraffic = (streamingRatio / 100) * activeUsers * (streamingTrafficPerUser / 1000000);
//     const totalGamingTraffic = (gamingRatio / 100) * activeUsers * (gamingTrafficPerUser / 1000000);

//     const totalTrafficDemand = totalVoiceTraffic + totalBrowsingTraffic + totalStreamingTraffic + totalGamingTraffic;

//     return Math.round(totalTrafficDemand / siteCapacity);
// };

// in mbps
export default function calculateCapacity(data: CapacityData): number {
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
    // };

    const {
        population, mobilePenetration, marketShare, bler, busyHourActiveUsers, siteCapacity,
        voiceCallDutyRatio, voiceCallMin, voiceCallRate, voiceCallRatio,
        streamingDutyRatio, streamingMin, streamingRate, streamingRatio,
        gamingDutyRatio, gamingMin, gamingRate, gamingRatio,
        browsingDutyRatio, browsingMin, browsingRate, browsingRatio,
    } = data;

    const activeUsers = population * (mobilePenetration / 100) * (marketShare / 100) * (busyHourActiveUsers / 100);

    const blerPercentage = (bler / 100);

    const voiceTrafficPerUser = ((voiceCallRate) * (voiceCallMin) * (voiceCallDutyRatio / 100)) / (1 - blerPercentage);
    const browsingTrafficPerUser = ((browsingRate) * (browsingMin) * (browsingDutyRatio / 100)) / (1 - blerPercentage);
    const streamingTrafficPerUser = ((streamingRate) * (streamingMin) * (streamingDutyRatio / 100)) / (1 - blerPercentage);
    const gamingTrafficPerUser = ((gamingRate) * (gamingMin) * (gamingDutyRatio / 100)) / (1 - blerPercentage);

    const totalVoiceTraffic = (voiceCallRatio / 100) * activeUsers * voiceTrafficPerUser;
    const totalBrowsingTraffic = (browsingRatio / 100) * activeUsers * browsingTrafficPerUser;
    const totalStreamingTraffic = (streamingRatio / 100) * activeUsers * streamingTrafficPerUser;
    const totalGamingTraffic = (gamingRatio / 100) * activeUsers * gamingTrafficPerUser;

    const totalTrafficDemand = (totalVoiceTraffic + totalBrowsingTraffic + totalStreamingTraffic + totalGamingTraffic) / 60;

    return Math.ceil(totalTrafficDemand / siteCapacity);
};

// 60 دي يعني ساعه
// دقايق و mbps 