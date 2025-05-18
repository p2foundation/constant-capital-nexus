
import React from 'react';

export interface DataPoint {
  [key: string]: string | number | boolean | React.ReactNode;
}

export interface DataField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'hidden';
}

export interface MarketDataEditorProps {
  title: string;
  initialData: DataPoint[];
  dataFields: DataField[];
  fetchFn: () => Promise<DataPoint[]>;
  updateFn: (data: DataPoint[]) => Promise<any>;
  showDatePicker?: boolean;
  showChangeColors?: boolean;
}
