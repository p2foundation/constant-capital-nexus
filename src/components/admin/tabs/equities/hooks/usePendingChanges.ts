
import { useState } from 'react';
import { toast } from "sonner";
import { EquitiesDataPoint } from '../types';

/**
 * Hook for managing pending/unsaved changes to equities data
 */
export const usePendingChanges = () => {
  const [unsavedChanges, setUnsavedChanges] = useState<EquitiesDataPoint[]>([]);

  const handleAddDataPoint = (dataPoint: EquitiesDataPoint) => {
    console.log("Adding data point:", dataPoint);
    
    // Ensure change percentage has the correct sign (should be negative if value decreased)
    if (dataPoint.previousValue !== undefined && dataPoint.value !== undefined) {
      const actualChange = ((dataPoint.value - dataPoint.previousValue) / dataPoint.previousValue) * 100;
      dataPoint.change = actualChange;
      
      // Always set the change_percent to match the calculated change
      // This ensures consistency between change and change_percent
      dataPoint.change_percent = actualChange;
    }
    
    setUnsavedChanges(prev => [...prev, dataPoint]);
    toast.success(`${dataPoint.symbol} data point added. Click Save to persist changes.`);
  };

  const handleDeletePendingChange = (index: number) => {
    setUnsavedChanges(prev => {
      const newUnsavedChanges = [...prev];
      newUnsavedChanges.splice(index, 1);
      return newUnsavedChanges;
    });
    toast.success("Data point removed from pending changes");
  };

  const clearUnsavedChanges = () => {
    setUnsavedChanges([]);
  };

  return {
    unsavedChanges,
    handleAddDataPoint,
    handleDeletePendingChange,
    clearUnsavedChanges
  };
};
