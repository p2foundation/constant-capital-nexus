
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
  { symbol: "ACCESS", name: "Access Bank Ghana Plc" },
  { symbol: "ADB", name: "Agricultural Development Bank" },
  { symbol: "AGA", name: "AngloGold Ashanti Plc" },
  { symbol: "ALLGH", name: "Atlantic Lithium Limited" },
  { symbol: "ALW", name: "Aluworks LTD" },
  { symbol: "ASG", name: "Asante Gold Corporation" },
  { symbol: "BOPP", name: "Benso Oil Palm Plantation Ltd" },
  { symbol: "CAL", name: "CalBank PLC" },
  { symbol: "CLYD", name: "Clydestone (Ghana) Limited" },
  { symbol: "CMLT", name: "Camelot Ghana Ltd" },
  { symbol: "CPC", name: "Cocoa Processing Company" },
  { symbol: "DASPHARM", name: "Dannex Ayrton Starwin Plc" },
  { symbol: "EGH", name: "Ecobank Ghana PLC" },
  { symbol: "EGL", name: "Enterprise Group PLC" },
  { symbol: "ETI", name: "Ecobank Transnational Inc" },
  { symbol: "FML", name: "Fan Milk Limited" },
  { symbol: "GCB", name: "Ghana Commercial Bank Ltd" },
  { symbol: "GGBL", name: "Guinness Ghana Breweries" },
  { symbol: "GOIL", name: "GOIL PLC" },
  { symbol: "MAC", name: "Mega African Capital Limited" },
  { symbol: "MTNGH", name: "MTN Ghana" },
  { symbol: "PBC", name: "Produce Buying Company" },
  { symbol: "RBGH", name: "Republic Bank (Ghana) PLC" },
  { symbol: "SCB", name: "Standard Chartered Bank Ghana Ltd" },
  { symbol: "SCB PREF", name: "Standard Chartered Bank Ghana Ltd Preference" },
  { symbol: "SIC", name: "SIC Insurance Company Ltd" },
  { symbol: "SOGEGH", name: "Societe Generale Ghana Limited" },
  { symbol: "SWL", name: "Sam Wood Ltd" },
  { symbol: "TBL", name: "Trust Bank Limited" },
  { symbol: "TLW", name: "Tullow Oil Plc" },
  { symbol: "TOTAL", name: "TotalEnergies Ghana PLC" },
  { symbol: "UNIL", name: "Unilever Ghana PLC" }
];
