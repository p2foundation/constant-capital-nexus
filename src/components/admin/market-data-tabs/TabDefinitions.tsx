
import React from 'react';
import { GSEIndexIcon, EquitiesIcon, FixedIncomeIcon, EurobondsIcon, FXRatesIcon } from './TabIcons';

export interface TabDefinition {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const marketDataTabs: TabDefinition[] = [
  {
    id: 'gse',
    label: 'GSE Index',
    icon: <GSEIndexIcon />
  },
  {
    id: 'equities',
    label: 'Equities',
    icon: <EquitiesIcon />
  },
  {
    id: 'fixed-income',
    label: 'Fixed Income',
    icon: <FixedIncomeIcon />
  },
  {
    id: 'eurobonds',
    label: 'Eurobonds',
    icon: <EurobondsIcon />
  },
  {
    id: 'fx',
    label: 'FX Rates',
    icon: <FXRatesIcon />
  }
];
