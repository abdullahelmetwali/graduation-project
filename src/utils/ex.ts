export const calculateRequiredSites = (data) => {
    const activeUsers = data.population * (data.mobilePenetration / 100) * (data.marketShare / 100) * (data.busyHourActiveUsers / 100);

    const voiceTrafficPerUser = (data.voiceCallRate * 1000 * (data.voiceCallDutyRatio / 100)) / (1 - data.bler);
    const browsingTrafficPerUser = (data.browsingRate * 1000 * (data.browsingDutyRatio / 100)) / (1 - data.bler);
    const streamingTrafficPerUser = (data.streamingRate * 1000 * (data.streamingDutyRatio / 100)) / (1 - data.bler);

    const totalVoiceTraffic = (data.voiceCallRatio / 100) * activeUsers * (voiceTrafficPerUser / 1000000);
    const totalBrowsingTraffic = (data.browsingRatio / 100) * activeUsers * (browsingTrafficPerUser / 1000000);
    const totalStreamingTraffic = (data.streamingRatio / 100) * activeUsers * (streamingTrafficPerUser / 1000000);

    const totalTrafficDemand = totalVoiceTraffic + totalBrowsingTraffic + totalStreamingTraffic;

    return Math.round(totalTrafficDemand / data.siteCapacity);
};

// const calculateRequiredSitesAllInMBPS = (data) => {
//     // Calculate Active Users
//     const activeUsers = data.population * (data.mobilePenetration / 100) * (data.marketShare / 100) * (data.busyHourActiveUsers / 100);

//     // Calculate traffic per user for each service (rates already in Mbps)
//     const voiceTrafficPerUser = (data.voiceCallRate * (data.voiceCallDutyRatio / 100)) / (1 - data.bler);
//     const browsingTrafficPerUser = (data.browsingRate * (data.browsingDutyRatio / 100)) / (1 - data.bler);
//     const streamingTrafficPerUser = (data.streamingRate * (data.streamingDutyRatio / 100)) / (1 - data.bler);

//     // Calculate total traffic for each service
//     const totalVoiceTraffic = (data.voiceCallRatio / 100) * activeUsers * voiceTrafficPerUser;
//     const totalBrowsingTraffic = (data.browsingRatio / 100) * activeUsers * browsingTrafficPerUser;
//     const totalStreamingTraffic = (data.streamingRatio / 100) * activeUsers * streamingTrafficPerUser;

//     // Calculate total traffic demand in Mbps
//     const totalTrafficDemand = totalVoiceTraffic + totalBrowsingTraffic + totalStreamingTraffic;

//     // Return number of sites needed
//     return Math.ceil(totalTrafficDemand / data.siteCapacity);
// };