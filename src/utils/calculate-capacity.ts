import type { CapacityData, CapacityResult } from "@/types";

export default function calculateCapacity(data: CapacityData): CapacityResult {
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

    const noOfSites = Math.ceil(totalTrafficDemand / siteCapacity);

    return {
        activeUsers: activeUsers,
        blerPercentage: blerPercentage,
        voiceTrafficPerUser: voiceTrafficPerUser,
        browsingTrafficPerUser: browsingTrafficPerUser,
        streamingTrafficPerUser: streamingTrafficPerUser,
        gamingTrafficPerUser: gamingTrafficPerUser,

        totalVoiceTraffic: totalVoiceTraffic,
        totalBrowsingTraffic: totalBrowsingTraffic,
        totalStreamingTraffic: totalStreamingTraffic,
        totalGamingTraffic: totalGamingTraffic,

        totalTrafficDemand: totalTrafficDemand,

        noOfSites: noOfSites
    }
};

// 60 دي يعني ساعه
// دقايق و mbps 