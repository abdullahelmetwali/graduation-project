import type { CapacityData } from "@/types";

export default function calculateCapacity(data: CapacityData): number {
    const activeUsers = data.population * (data.mobilePenetration / 100) * (data.marketShare / 100) * (data.busyHourActiveUsers / 100);

    const voiceTrafficPerUser = (data.voiceCallRate * 1000 * (data.voiceCallDutyRatio / 100)) / (1 - data.bler);
    const browsingTrafficPerUser = (data.browsingRate * 1000 * (data.browsingDutyRatio / 100)) / (1 - data.bler);
    const streamingTrafficPerUser = (data.streamingRate * 1000 * (data.streamingDutyRatio / 100)) / (1 - data.bler);
    const gamingTrafficPerUser = (data.gamingRate * 1000 * (data.gamingDutyRatio / 100)) / (1 - data.bler);

    const totalVoiceTraffic = (data.voiceCallRatio / 100) * activeUsers * (voiceTrafficPerUser / 1000000);
    const totalBrowsingTraffic = (data.browsingRatio / 100) * activeUsers * (browsingTrafficPerUser / 1000000);
    const totalStreamingTraffic = (data.streamingRatio / 100) * activeUsers * (streamingTrafficPerUser / 1000000);
    const totalGamingTraffic = (data.gamingRatio / 100) * activeUsers * (gamingTrafficPerUser / 1000000);

    const totalTrafficDemand = totalVoiceTraffic + totalBrowsingTraffic + totalStreamingTraffic +  totalGamingTraffic;

    return Math.round(totalTrafficDemand / data.siteCapacity);
};