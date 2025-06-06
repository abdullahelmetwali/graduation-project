import type { CoverageData, CovreageResult } from "@/types";

const NOISE_FLOOR = -174; // dBm/Hz
const RESOURCE_BLOCKS = 12;

const DL_NF_UE = 9; // DB Noise factor user equimpent ( for download )
const UL_NF_UE = 5; // DB Noise factor user equimpent ( for upload )

const TXPOWER_GNB = 49;
const TXPOWER_UE = 23;

export default function calculateCoverage(data: CoverageData): CovreageResult {
    const { area, frequency, bandwidth, subCarrier, sinrDL, sinrUL, antennaGain, buildingLoss, foliageLoss, shadowFaddingLoss } = data;

    const logBW = 10 * Math.log10(bandwidth); // in DL
    const BW_IN_gNB = 2 * subCarrier * RESOURCE_BLOCKS; // 2 * Subcarrier * number of resource blocks (12) 
    const logBW_GNB = 10 * Math.log10(BW_IN_gNB); // in UL

    const dlRxSensitivity = NOISE_FLOOR + logBW + DL_NF_UE + sinrDL;
    const ulRxSensitivity = NOISE_FLOOR + logBW_GNB + UL_NF_UE + sinrUL;

    const CABLE_LOSSES = Number(antennaGain) === 14 ? 0.5 : 0; // antenna config

    const BODY_LOSSES = Number(frequency) === 3.5 ? 3 : 15;

    const IM_DL = Number(frequency) === 3.5 ? 6 : 1;
    const IM_UL = Number(frequency) === 3.5 ? 2 : 0.5;

    const RAIN_FADING = Number(frequency) === 3.5 ? 0 : 3;


    const DL_MAPL = TXPOWER_GNB + antennaGain - BODY_LOSSES - CABLE_LOSSES - buildingLoss - shadowFaddingLoss - RAIN_FADING - foliageLoss - IM_DL - dlRxSensitivity;

    const UL_MAPL = TXPOWER_UE + antennaGain - BODY_LOSSES - CABLE_LOSSES - buildingLoss - shadowFaddingLoss - RAIN_FADING - foliageLoss - IM_UL - ulRxSensitivity;

    // PL = 22.0log10(d3D) + 28.0 + 20log10(frequency)
    // so => D3D = 10 ** ((MAPL - 28 - 20 * Math.log10(3.5)) / 22) 

    const D3D_FOR_DL = (Math.pow(10, (DL_MAPL - 28 - 20 * Math.log10(frequency)) / 22));
    const D3D_FOR_UL = (Math.pow(10, (UL_MAPL - 28 - 20 * Math.log10(frequency)) / 22));

    const SITE_AREA_DL = (Math.PI * (D3D_FOR_DL ** 2)) / 1000000; // from m2 to km2
    const SITE_AREA_UL = (Math.PI * (D3D_FOR_UL ** 2)) / 1000000; // from m2 to km2

    const EFFECTIVE_AREA_DL = (SITE_AREA_DL * 0.6); // Because the HEXA SHAPE
    const EFFECTIVE_AREA_UL = (SITE_AREA_UL * 0.6); // Because the HEXA SHAPE

    const NUMBER_OF_SITES_DL = Math.ceil(area / EFFECTIVE_AREA_DL);
    const NUMBER_OF_SITES_UL = Math.ceil(area / EFFECTIVE_AREA_UL);

    return {
        dlRxSensitivity: parseFloat(dlRxSensitivity.toFixed(2)),
        ulRxSensitivity: parseFloat(ulRxSensitivity.toFixed(2)),
        DL_MAPL: parseFloat(DL_MAPL.toFixed(2)),
        UL_MAPL: parseFloat(UL_MAPL.toFixed(2)),
        NUMBER_OF_SITES_DL: parseFloat(NUMBER_OF_SITES_DL.toFixed(1)),
        NUMBER_OF_SITES_UL: parseFloat(NUMBER_OF_SITES_UL.toFixed(1))
    };
}
