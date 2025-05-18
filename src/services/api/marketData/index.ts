
import { gseAPI } from './gse';
import { fixedIncomeAPI } from './fixedIncome';
import { equitiesAPI } from './equities';
import { eurobondsAPI } from './eurobonds';
import { fxAPI } from './fx';

// Combined market data API
export const marketDataAPI = {
  // GSE Index
  getGSEData: gseAPI.getData,
  updateGSEData: gseAPI.updateData,
  
  // Fixed Income
  getFixedIncomeData: fixedIncomeAPI.getData,
  updateFixedIncomeData: fixedIncomeAPI.updateData,
  
  // Equities
  getEquitiesData: equitiesAPI.getData,
  updateEquitiesData: equitiesAPI.updateData,
  
  // Eurobonds
  getEurobondsData: eurobondsAPI.getData,
  updateEurobondsData: eurobondsAPI.updateData,
  
  // FX
  getFXData: fxAPI.getData,
  updateFXData: fxAPI.updateData,
};
