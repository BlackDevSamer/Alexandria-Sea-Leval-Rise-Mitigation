// Config
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Types
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

// Service
export const dataService = {
  // BACKEND ENDPOINT: GET /api/scenarios
  // Description: Returns list of available climate scenarios
  getAllScenarios: async () => {
    // const response = await fetch(`${API_BASE_URL}/scenarios`);
    // return response.json();
    return []; // Placeholder
  },

  // BACKEND ENDPOINT: GET /api/dashboard
  // Params: ?scenario=SSPxxx&year=20xx
  // Description: Returns aggregate metrics for the dashboard (Home Page)
  getDashboardData: async (
    scenario: ScenarioCode,
    year: Year,
  ): Promise<DashboardData | null> => {
    /* 
    const response = await fetch(`${API_BASE_URL}/dashboard?scenario=${scenario}&year=${year}`);
    return response.json();
    */
    console.log(`[Backend] Fetching Dashboard Data for ${scenario}/${year}`);
    return null; // Empty state for now
  },

  // BACKEND ENDPOINT: GET /api/map-risk
  // Params: ?scenario=SSPxxx&year=20xx
  // Description: Returns risk visualization data for the map
  getMapRiskData: async (
    scenario: ScenarioCode,
    year: Year,
  ): Promise<MapData | null> => {
    /*
    const response = await fetch(`${API_BASE_URL}/map-risk?scenario=${scenario}&year=${year}`);
    return response.json();
    */
    return null;
  },

  // BACKEND ENDPOINT: GET /api/population
  // Params: ?scenario=SSPxxx&year=20xx
  // Description: Returns population exposure analysis
  getPopulationRisk: async (
    scenario: ScenarioCode,
    year: Year,
  ): Promise<PopulationData | null> => {
    /*
    const response = await fetch(`${API_BASE_URL}/population?scenario=${scenario}&year=${year}`);
    return response.json();
    */
    return null;
  },

  // BACKEND ENDPOINT: GET /api/infrastructure
  // Params: ?scenario=SSPxxx&year=20xx
  // Description: Returns critical infrastructure risk data
  getInfrastructureRisk: async (
    scenario: ScenarioCode,
    year: Year,
  ): Promise<InfrastructureData | null> => {
    /*
    const response = await fetch(`${API_BASE_URL}/infrastructure?scenario=${scenario}&year=${year}`);
    return response.json();
    */
    return null;
  },
};
