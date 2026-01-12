import data from "../mock-data/data.json";

// Types derived from the JSON structure
export type ScenarioCode = "SSP126" | "SSP245" | "SSP370" | "SSP585";
export type Year = "2030" | "2050" | "2070" | "2100";

export interface DashboardData {
  populationAtRisk: number;
  floodedAreaKm2: number;
  highRiskAreas: string[];
}

export interface MapData {
  floodedAreaKm2: number;
  riskLevel: string;
  colorCode: string;
  description: string;
}

export interface PopulationData {
  totalPopulation: number;
  exposedPopulation: number;
  informalSettlementsExposure: string;
  qisms: {
    name: string;
    exposedPopulation: number;
    riskLevel: string;
  }[];
}

export interface InfrastructureData {
  [category: string]: {
    name: string;
    qism: string;
    riskLevel: string;
    impactDescription: string;
  }[];
}

const LATENCY_MIN = 300;
const LATENCY_MAX = 800;

const delay = () =>
  new Promise((resolve) =>
    setTimeout(
      resolve,
      Math.random() * (LATENCY_MAX - LATENCY_MIN) + LATENCY_MIN
    )
  );

export const dataService = {
  getDashboardData: async (
    scenario: ScenarioCode,
    year: Year
  ): Promise<DashboardData> => {
    await delay();
    return (data.dashboard as any)[scenario]?.[year] || null;
  },

  getMapRiskData: async (
    scenario: ScenarioCode,
    year: Year
  ): Promise<MapData> => {
    await delay();
    return (data.maps as any)[scenario]?.[year] || null;
  },

  getPopulationRisk: async (
    scenario: ScenarioCode,
    year: Year
  ): Promise<PopulationData> => {
    await delay();
    return (data.population as any)[scenario]?.[year] || null;
  },

  getInfrastructureRisk: async (
    scenario: ScenarioCode,
    year: Year
  ): Promise<InfrastructureData> => {
    await delay();
    return (data.infrastructure as any)[scenario]?.[year] || null;
  },

  getAllScenarios: async () => {
    await delay();
    return data.scenarios;
  },
};
