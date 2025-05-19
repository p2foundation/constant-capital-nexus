
export interface EquitiesDataPoint {
  date: string;
  symbol: string;
  value: number;
  previousValue?: number; // Added for change calculation
  change?: number; // Added for storing calculated change
  change_percent: number;
  isNew?: boolean;
}

export interface ProcessedEquitiesData {
  date: string;
  [key: string]: any;
}

export interface ListedCompany {
  symbol: string;
  name: string;
}

export const LISTED_COMPANIES: ListedCompany[] = [
  { symbol: "GCB", name: "Ghana Commercial Bank Limited" },
  { symbol: "SCB", name: "Standard Chartered Bank Ghana Ltd." },
  { symbol: "ETI", name: "Ecobank Transnational Incorporation" },
  { symbol: "MTNGH", name: "MTN Ghana" },
  { symbol: "EGH", name: "Ecobank Ghana PLC" },
  { symbol: "GOIL", name: "GOIL PLC" },
  { symbol: "FML", name: "Fan Milk Limited" },
  { symbol: "TOTAL", name: "TotalEnergies Ghana PLC" },
  { symbol: "SOGEGH", name: "Societe Generale Ghana Limited" },
  { symbol: "UNIL", name: "Unilever Ghana PLC" },
  { symbol: "BOPP", name: "Benso Oil Palm Plantation Ltd" },
  { symbol: "CAL", name: "CalBank PLC" },
  { symbol: "ADB", name: "Agricultural Development Bank" },
  { symbol: "ACCESS", name: "Access Bank Ghana Plc" },
  { symbol: "ALLGH", name: "Atlantic Lithium Limited" }
];
