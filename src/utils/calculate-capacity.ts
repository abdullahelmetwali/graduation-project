import type { CapacityData } from "@/types";

// export default function calculateCapacity(data: CapacityData): number {
//     const activeUsers = data.population * (data.mobilePenetration / 100) * (data.marketShare / 100) * (data.busyHourActiveUsers / 100);

//     const voiceTrafficPerUser = (data.voiceCallRate * 1000 * (data.voiceCallDutyRatio / 100)) / (1 - data.bler);
//     const browsingTrafficPerUser = (data.browsingRate * 1000 * (data.browsingDutyRatio / 100)) / (1 - data.bler);
//     const streamingTrafficPerUser = (data.streamingRate * 1000 * (data.streamingDutyRatio / 100)) / (1 - data.bler);
//     const gamingTrafficPerUser = (data.gamingRate * 1000 * (data.gamingDutyRatio / 100)) / (1 - data.bler);

//     const totalVoiceTraffic = (data.voiceCallRatio / 100) * activeUsers * (voiceTrafficPerUser / 1000000);
//     const totalBrowsingTraffic = (data.browsingRatio / 100) * activeUsers * (browsingTrafficPerUser / 1000000);
//     const totalStreamingTraffic = (data.streamingRatio / 100) * activeUsers * (streamingTrafficPerUser / 1000000);
//     const totalGamingTraffic = (data.gamingRatio / 100) * activeUsers * (gamingTrafficPerUser / 1000000);

//     const totalTrafficDemand = totalVoiceTraffic + totalBrowsingTraffic + totalStreamingTraffic + totalGamingTraffic;

//     return Math.round(totalTrafficDemand / data.siteCapacity);
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

    const activeUsers = data.population * (data.mobilePenetration / 100) * (data.marketShare / 100) * (data.busyHourActiveUsers / 100);

    const voiceTrafficPerUser = (data.voiceCallRate * (data.voiceCallDutyRatio / 100)) / (1 - data.bler);
    const browsingTrafficPerUser = (data.browsingRate * (data.browsingDutyRatio / 100)) / (1 - data.bler);
    const streamingTrafficPerUser = (data.streamingRate * (data.streamingDutyRatio / 100)) / (1 - data.bler);
    const gamingTrafficPerUser = (data.gamingRate * (data.gamingDutyRatio / 100)) / (1 - data.bler);

    const totalVoiceTraffic = (data.voiceCallRatio / 100) * activeUsers * voiceTrafficPerUser;
    const totalBrowsingTraffic = (data.browsingRatio / 100) * activeUsers * browsingTrafficPerUser;
    const totalStreamingTraffic = (data.streamingRatio / 100) * activeUsers * streamingTrafficPerUser;
    const totalGamingTraffic = (data.gamingRatio / 100) * activeUsers * gamingTrafficPerUser;

    const totalTrafficDemand = totalVoiceTraffic + totalBrowsingTraffic + totalStreamingTraffic + totalGamingTraffic;

    return Math.ceil(totalTrafficDemand / data.siteCapacity);
};