
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useApiData } from '@/hooks/useApiData';

import DataPointForm from './market-data-editor/DataPointForm';
import DataTable from './market-data-editor/DataTable';
import LoadingState from './market-data-editor/LoadingState';
import SaveButton from './market-data-editor/SaveButton';
import { DataPoint, DataField, MarketDataEditorProps } from './market-data-editor/types';

const MarketDataEditor: React.FC<MarketDataEditorProps> = ({
  title,
  initialData,
  dataFields,
  fetchFn,
  updateFn,
  showDatePicker = false,
  showChangeColors = false
}) => {
  const { data, setData, isLoading, isSaving, saveData } = useApiData<DataPoint[]>(
    fetchFn, 
    updateFn, 
    initialData, 
    `Failed to load ${title.toLowerCase()} data`
  );
  
  const [pendingChanges, setPendingChanges] = useState<DataPoint[]>([]);

  const handleAddDataPoint = (dataPoint: DataPoint) => {
    const updatedData = [...data, dataPoint];
    setData(updatedData);
    setPendingChanges(previous => [...previous, dataPoint]);
    toast.info(`${title} data point staged. Save changes to publish it.`);
  };
  
  const handleDeleteDataPoint = (index: number) => {
    const pendingStartIndex = data.length - pendingChanges.length;
    if (index < pendingStartIndex) {
      toast.info('Published history is retained. Add a correction for the same date to replace its values.');
      return;
    }
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    setPendingChanges(previous => previous.filter((_, pendingIndex) => pendingIndex !== index - pendingStartIndex));
    toast.info('Staged row removed.');
  };
  
  const handleSaveData = async () => {
    try {
      console.log(`Saving ${title} data...`);
      await saveData(pendingChanges);
      setPendingChanges([]);
      console.log(`${title} data saved successfully`);
      toast.success(`${title} data saved successfully`);
    } catch (error) {
      console.error(`Error saving ${title} data:`, error);
      toast.error(`Failed to save ${title} data`);
    }
  };

  if (isLoading) {
    return <LoadingState title={title} />;
  }
  
  return (
    <div className="space-y-6">
      <DataPointForm 
        dataFields={dataFields}
        showDatePicker={showDatePicker}
        onAddDataPoint={handleAddDataPoint}
      />
      
      <DataTable 
        data={data}
        dataFields={dataFields}
        showChangeColors={showChangeColors}
        onDeleteDataPoint={handleDeleteDataPoint}
        pendingStartIndex={data.length - pendingChanges.length}
      />
      
      <SaveButton 
        title={title}
        isSaving={isSaving}
        onSave={handleSaveData}
        disabled={pendingChanges.length === 0}
      />
    </div>
  );
};

export default MarketDataEditor;
