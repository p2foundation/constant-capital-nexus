
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import GSEIndexTab from '../tabs/GSEIndexTab';
import EquitiesTab from '../tabs/EquitiesTab';
import FixedIncomeTab from '../tabs/FixedIncomeTab';
import EurobondsTab from '../tabs/EurobondsTab';
import FXTab from '../tabs/FXTab';

interface TabContentProps {
  id: string;
}

const TabContent: React.FC<TabContentProps> = ({ id }) => {
  // Render appropriate component based on tab ID
  const renderTabComponent = () => {
    switch (id) {
      case 'gse':
        return <GSEIndexTab />;
      case 'equities':
        return <EquitiesTab />;
      case 'fixed-income':
        return <FixedIncomeTab />;
      case 'eurobonds':
        return <EurobondsTab />;
      case 'fx':
        return <FXTab />;
      default:
        return <div>Tab content not found</div>;
    }
  };

  return (
    <TabsContent value={id} className="space-y-4">
      {renderTabComponent()}
    </TabsContent>
  );
};

export default TabContent;
