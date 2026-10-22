import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Globe2,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Settings,
  TestTube2,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggler from '@/components/ThemeToggler';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

export type AdminSectionId =
  | 'content'
  | 'research'
  | 'contact-inbox'
  | 'careers'
  | 'market-summary'
  | 'market-data'
  | 'events'
  | 'settings'
  | 'email-testing';

type NavigationGroup = {
  label: string;
  items: Array<{ id: AdminSectionId; label: string; icon: React.ElementType }>;
};

const navigation: NavigationGroup[] = [
  {
    label: 'Publishing',
    items: [
      { id: 'content', label: 'Website content', icon: LayoutDashboard },
      { id: 'research', label: 'Research reports', icon: Newspaper },
      { id: 'market-summary', label: 'Market summary', icon: TrendingUp },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'market-data', label: 'Market data', icon: BarChart3 },
      { id: 'contact-inbox', label: 'Contact inbox', icon: Mail },
      { id: 'careers', label: 'Careers', icon: BriefcaseBusiness },
      { id: 'events', label: 'Events', icon: CalendarDays },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'email-testing', label: 'Email diagnostics', icon: TestTube2 },
    ],
  },
];

const sectionCopy: Record<AdminSectionId, { title: string; description: string }> = {
  content: { title: 'Website Content', description: 'Review and manage published website content.' },
  research: { title: 'Research Reports', description: 'Create, review and publish investment research.' },
  'contact-inbox': { title: 'Contact Inbox', description: 'Read enquiries, respond and track follow-up.' },
  careers: { title: 'Career Applications', description: 'Review candidates and move applications through the hiring process.' },
  'market-summary': { title: 'Market Summary', description: 'Prepare the latest market commentary and highlights.' },
  'market-data': { title: 'Market Data', description: 'Synchronize verified sources and manage analyst corrections.' },
  events: { title: 'Events', description: 'Event publishing is not connected yet.' },
  settings: { title: 'System Settings', description: 'Control verified data sources and operational preferences.' },
  'email-testing': { title: 'Email Diagnostics', description: 'Send controlled tests and review delivery results.' },
};

function AdminSidebar({ active, onSelect }: { active: AdminSectionId; onSelect: (id: AdminSectionId) => void }) {
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/admin" className="flex min-h-9 items-center gap-2 overflow-hidden" aria-label="Constant Capital administration">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary font-heading text-sm font-bold text-primary-foreground">CC</div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <div className="truncate font-heading text-sm font-bold">Constant Capital</div>
              <div className="text-xs text-sidebar-foreground/60">Administration</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-3">
        {navigation.map(group => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      isActive={active === item.id}
                      onClick={() => {
                        onSelect(item.id);
                        setOpenMobile(false);
                      }}
                      className="h-10"
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="View public website">
              <Link to="/"><Globe2 /><span>View public website</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default function AdminShell({ active, children }: { active: AdminSectionId; children: React.ReactNode }) {
  const [, setSearchParams] = useSearchParams();
  const { signOut } = useAuth();
  const copy = sectionCopy[active];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar active={active} onSelect={(id) => setSearchParams({ tab: id })} />
        <SidebarInset className="min-w-0 bg-transparent">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <SidebarTrigger className="h-9 w-9" />
              <div className="min-w-0">
                <p className="truncate text-xs font-medium uppercase text-muted-foreground">Admin workspace</p>
                <p className="truncate font-heading text-sm font-semibold">{copy.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggler />
              <Button variant="ghost" size="sm" onClick={() => signOut()} title="Log out">
                <LogOut className="h-4 w-4 sm:mr-2" /><span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </header>
          <main className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1500px]">
              <div className="mb-7 border-b pb-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
                  <FileText className="h-3.5 w-3.5" /> Constant Capital operations
                </div>
                <h1 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">{copy.title}</h1>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground sm:text-base">{copy.description}</p>
              </div>
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}