
import { EquitiesDataPoint, ProcessedEquitiesData } from '../types';
import { formatDateString } from '../utils';

/**
 * Prepares data for API operations by combining existing and new data
 */
export const prepareDataForSaving = (
  processedData: ProcessedEquitiesData[],
  unsavedChanges: EquitiesDataPoint[]
): ProcessedEquitiesData[] => {
  // Create a copy of the existing data
  const allData: ProcessedEquitiesData[] = [...processedData];
  
  // Update existing entries and create new ones
  unsavedChanges.forEach(change => {
    const existingDateIndex = allData.findIndex(item => item.date === change.date);
    const symbolLower = change.symbol.toLowerCase();
    
    if (existingDateIndex >= 0) {
      // Update existing date entry
      allData[existingDateIndex][symbolLower] = change.value;
      allData[existingDateIndex][`${symbolLower}_change`] = change.change_percent;
      allData[existingDateIndex][`${symbolLower}_positive`] = change.change_percent >= 0;
    } else {
      // Create new date entry
      const newEntry: ProcessedEquitiesData = { date: change.date };
      newEntry[symbolLower] = change.value;
      newEntry[`${symbolLower}_change`] = change.change_percent;
      newEntry[`${symbolLower}_positive`] = change.change_percent >= 0;
      allData.push(newEntry);
    }
  });

  console.log("Prepared data for saving:", allData);
  return allData;
};

/**
 * Prepares deletion operation data
 */
export const prepareDataForDeletion = (
  processedData: ProcessedEquitiesData[],
  date: string,
  symbol: string
): ProcessedEquitiesData[] => {
  // Create a copy of the data
  const allData = [...processedData];
  const dateIndex = allData.findIndex(item => item.date === date);
  
  if (dateIndex >= 0) {
    const newEntry: ProcessedEquitiesData = { ...allData[dateIndex] };
    delete newEntry[symbol.toLowerCase()];
    delete newEntry[`${symbol.toLowerCase()}_change`];
    delete newEntry[`${symbol.toLowerCase()}_positive`];
    
    // Check if there are any other symbols left for this date
    const hasRemainingSymbols = Object.keys(newEntry).some(key => 
      !key.includes('_') && key !== 'date'
    );
    
    if (hasRemainingSymbols) {
      allData[dateIndex] = newEntry;
    } else {
      // Remove the entire date entry if no symbols left
      allData.splice(dateIndex, 1);
    }
  }
  
  return allData;
};
