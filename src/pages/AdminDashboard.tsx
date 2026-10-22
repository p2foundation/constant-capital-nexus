
import React from 'react';
import MarketSummaryManager from '@/components/admin/MarketSummaryManager';
import MarketDataManager from '@/components/admin/MarketDataManager';
import MarketDataSourceSettings from '@/components/admin/MarketDataSourceSettings';
import ContentManager from '@/components/admin/ContentManager';
import ContactInbox from '@/components/admin/ContactInbox';
import CareerApplicationsManager from '@/components/admin/CareerApplicationsManager';
import EmailTestingPanel from '@/components/admin/EmailTestingPanel';
import ResearchReportManager from '@/components/admin/ResearchReportManager';
import AdminShell, { AdminSectionId } from '@/components/admin/AdminShell';
import { AdminSection } from '@/components/admin/AdminSection';
import { CalendarDays } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';

const AdminDashboard = () => {
  useAnalytics();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab') || 'content';
  const validTabs: AdminSectionId[] = ['content', 'research', 'contact-inbox', 'careers', 'market-summary', 'market-data', 'events', 'settings', 'email-testing'];
  const activeTab: AdminSectionId = validTabs.includes(requestedTab as AdminSectionId) ? requestedTab as AdminSectionId : 'content';

  const renderSection = () => {
    switch (activeTab) {
      case 'research': return <ResearchReportManager />;
      case 'contact-inbox': return <ContactInbox />;
      case 'careers': return <CareerApplicationsManager />;
      case 'market-summary': return <MarketSummaryManager />;
      case 'market-data': return <MarketDataManager />;
      case 'settings': return <MarketDataSourceSettings />;
      case 'email-testing': return <AdminSection><EmailTestingPanel /></AdminSection>;
      case 'events': return (
        <AdminSection title="Events are not connected" description="This area will remain read-only until an approved events source is added.">
          <div className="flex min-h-56 flex-col items-center justify-center text-center">
            <CalendarDays className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="max-w-md text-sm text-muted-foreground">No sample calendar is shown, so staff cannot mistake placeholder events for published information.</p>
          </div>
        </AdminSection>
      );
      default: return <ContentManager />;
    }
  };

  return (
    <AdminShell active={activeTab}>{renderSection()}</AdminShell>
  );
};

export default AdminDashboard;
