import type { SetStateAction } from "react";

export interface CoverageData {
    area: number,
    frequency: number,
    bandwidth: number,
    subCarrier: number,
    covergeProbability: number,

    upload: number,
    download: number,

    trPowergNB: number,
    trPowerUE: number,

    noiseFactorUE: number,
    noiseFactorENB: number,

    sinrUL: number,
    sinrDL: number,

    antennaGain: number,
    buildingLoss: number,

    shadowFaddingSelected: number,
    shadowFaddingLoss: number

    foliageLoss: number
};

export type CoverageResult = {
    dlRxSensitivity: number; // in dBm
    ulRxSensitivity: number; // in dBm
    DL_MAPL: number,
    UL_MAPL: number,
    NUMBER_OF_SITES_DL: number,
    NUMBER_OF_SITES_UL: number,
};

export interface CapacityData {
    population: number,
    mobilePenetration: number,
    marketShare: number,
    busyHourActiveUsers: number,
    bler: number,

    voiceCallRatio: number,
    voiceCallMin: number,
    voiceCallRate: number,
    voiceCallDutyRatio: number,

    browsingRatio: number,
    browsingMin: number,
    browsingRate: number,
    browsingDutyRatio: number,

    gamingRatio: number,
    gamingMin: number,
    gamingRate: number,
    gamingDutyRatio: number,

    streamingRatio: number,
    streamingMin: number,
    streamingRate: number,
    streamingDutyRatio: number,

    siteCapacity: number
};

export interface InputBoxType<T extends string | number> {
    label: string,
    type: string,
    placeHolder: string,
    content: string,
    badge: string | null,
    value: string | number,
    className: string,
    onChange: (value: T) => void,
};

export type History = {
    capacity: CapacityData[],
    coverage: CoverageData[],

    setCapacity: SetStateAction,
    setCoverage: SetStateAction
}