import type { CoverageData, CovreageResult } from "@/types";

const gNB_ANTENNA_GAIN = 24; // gNB => 5G

const CABLE_LOSSES = 0; // DB
const BODY_LOSSES = 3; // DB
const BUILDING_LOSSES = 22; // DB
const FOLIAGE_LOSSES = 11; // DB

const SHADOW_FADING_MARGIN = 6; // DB
const RAIN_FADING = 0; // DB

const IM_UL = 2; // DB
const IM_DL = 6; // DB

const NOISE_FLOOR = -174; // dBm/Hz
const RESOURCE_BLOCKS = 12;

export default function calculateCoverage(data: CoverageData): CovreageResult {
    const { area, frequency, bandwidth, subCarrier, noiseFactorUE, noiseFactorENB, sinrDL, sinrUL, trPowerENB, trPowerUE } = data;

    const logBW = 10 * Math.log10(bandwidth); // in DL
    const BW_IN_gNB = 2 * subCarrier * RESOURCE_BLOCKS; // 2 * Subcarrier * number of resource blocks (12) 
    const logBW_GNB = 10 * Math.log10(BW_IN_gNB); // in UL

    const dlRxSensitivity = NOISE_FLOOR + logBW + noiseFactorUE + sinrDL;
    const ulRxSensitivity = NOISE_FLOOR + logBW_GNB + noiseFactorENB + sinrUL;

    const DL_MAPL = trPowerENB + gNB_ANTENNA_GAIN
        - CABLE_LOSSES - IM_DL
        - BODY_LOSSES - BUILDING_LOSSES
        - SHADOW_FADING_MARGIN - FOLIAGE_LOSSES
        - RAIN_FADING - dlRxSensitivity;

    const UL_MAPL = trPowerUE + gNB_ANTENNA_GAIN
        - CABLE_LOSSES - IM_UL
        - BODY_LOSSES - BUILDING_LOSSES
        - SHADOW_FADING_MARGIN - FOLIAGE_LOSSES
        - RAIN_FADING - ulRxSensitivity;

    // PL = 22.0log10(d3D) + 28.0 + 20log10(frequency)
    // so => D3D = 10 ** ((MAPL - 28 - 20 * Math.log10(3.5)) / 22) 

    const D3D_FOR_DL = (Math.pow(10, (DL_MAPL - 28 - 20 * Math.log10(frequency)) / 22));
    const D3D_FOR_UL = (Math.pow(10, (UL_MAPL - 28 - 20 * Math.log10(frequency)) / 22));

    const SITE_AREA_DL = Math.round(Math.PI * (D3D_FOR_DL ** 2)) / 1000000; // from m2 to km2
    const SITE_AREA_UL = Math.round(Math.PI * (D3D_FOR_UL ** 2)) / 1000000; // from m2 to km2

    const EFFECTIVE_AREA_DL = (SITE_AREA_DL * 0.6); // Because the HEXA SHAPE
    const EFFECTIVE_AREA_UL = (SITE_AREA_UL * 0.6); // Because the HEXA SHAPE

    const NUMBER_OF_SITES_DL = area / EFFECTIVE_AREA_DL;
    const NUMBER_OF_SITES_UL = area / EFFECTIVE_AREA_UL;

    return {
        dlRxSensitivity: parseFloat(dlRxSensitivity.toFixed(2)),
        ulRxSensitivity: parseFloat(ulRxSensitivity.toFixed(2)),
        DL_MAPL: parseFloat(DL_MAPL.toFixed(2)),
        UL_MAPL: parseFloat(UL_MAPL.toFixed(2)),
        NUMBER_OF_SITES_DL: parseFloat(NUMBER_OF_SITES_DL.toFixed(1)),
        NUMBER_OF_SITES_UL: parseFloat(NUMBER_OF_SITES_UL.toFixed(1))
    };
}
