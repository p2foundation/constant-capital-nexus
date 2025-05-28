
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
  
  const [pendingDeletes, setPendingDeletes] = useState<number[]>([]);

  const handleAddDataPoint = (dataPoint: DataPoint) => {
    const updatedData = [...data, dataPoint];
    setData(updatedData);
    toast.success(`${title} data point added`);
  };
  
  const handleDeleteDataPoint = (index: number) => {
    setPendingDeletes([...pendingDeletes, index]);
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    toast.success(`${title} data point deleted`);
  };
  
  const handleSaveData = async () => {
    try {
      console.log(`Saving ${title} data...`);
      await saveData(data);
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
    <div className="space-y-4">
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
      />
      
      <SaveButton 
        title={title}
        isSaving={isSaving}
        onSave={handleSaveData}
      />
    </div>
  );
};

export default MarketDataEditor;
