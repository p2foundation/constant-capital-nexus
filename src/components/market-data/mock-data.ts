
export const gseData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
  { name: 'Jul', value: 4300 },
  { name: 'Aug', value: 9398 },
  { name: 'Sep', value: 5900 },
  { name: 'Oct', value: 2800 },
  { name: 'Nov', value: 4800 },
  { name: 'Dec', value: 3800 },
];

export const fxData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

// Updated eurobondData to match the EurobondChartDataPoint interface
export const eurobondData = [
  { name: 'Jan', ghana29: 10.5, nigeria32: 9.8, kenya31: 11.2, ghana30: 10.8 },
  { name: 'Feb', ghana29: 10.7, nigeria32: 9.9, kenya31: 11.4, ghana30: 11.0 },
  { name: 'Mar', ghana29: 10.9, nigeria32: 10.1, kenya31: 11.6, ghana30: 11.2 },
  { name: 'Apr', ghana29: 11.2, nigeria32: 10.3, kenya31: 11.8, ghana30: 11.5 },
  { name: 'May', ghana29: 11.4, nigeria32: 10.5, kenya31: 12.0, ghana30: 11.7 },
  { name: 'Jun', ghana29: 11.6, nigeria32: 10.7, kenya31: 12.2, ghana30: 11.9 },
  { name: 'Jul', ghana29: 11.8, nigeria32: 10.9, kenya31: 12.4, ghana30: 12.1 },
];

// Sample equities data - Top 5 GSE companies
export const equitiesData = [
  { name: 'Jan', gcb: 7.20, scb: 21.50, eti: 19.80, mtngh: 3.10, total: 24.50 },
  { name: 'Feb', gcb: 7.35, scb: 21.75, eti: 20.10, mtngh: 3.15, total: 24.80 },
  { name: 'Mar', gcb: 7.50, scb: 22.00, eti: 20.40, mtngh: 3.20, total: 25.10 },
  { name: 'Apr', gcb: 7.45, scb: 21.90, eti: 20.20, mtngh: 3.25, total: 25.00 },
  { name: 'May', gcb: 7.60, scb: 22.10, eti: 20.50, mtngh: 3.30, total: 25.20 },
  { name: 'Jun', gcb: 7.55, scb: 22.05, eti: 20.35, mtngh: 3.28, total: 25.15 },
  { name: 'Jul', gcb: 7.65, scb: 22.15, eti: 20.60, mtngh: 3.32, total: 25.30 },
];

// Fixed Income Data - Updated to match Ghana's actual fixed income instruments
export const fixedIncomeData = [
  { 
    name: '01/05/2023', 
    yield91: 23.85, 
    yield182: 24.87,
    yield364: 26.43
  },
  { 
    name: '08/05/2023', 
    yield91: 23.92, 
    yield182: 24.93,
    yield364: 26.51
  },
  { 
    name: '15/05/2023', 
    yield91: 24.04, 
    yield182: 25.12,
    yield364: 26.74
  },
  { 
    name: '22/05/2023', 
    yield91: 24.18, 
    yield182: 25.26,
    yield364: 26.89
  },
  { 
    name: '29/05/2023', 
    yield91: 24.25, 
    yield182: 25.31,
    yield364: 27.02
  }
];
