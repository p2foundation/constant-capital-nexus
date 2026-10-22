
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { Briefcase, User, Mail, Phone, Clock, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CareerApplication {
  id: string;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone: string;
  current_position: string | null;
  years_experience: string | null;
  notice_period: string | null;
  expected_salary: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  heard_from: string | null;
  cover_letter: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ['new', 'reviewing', 'interview', 'offer', 'hired', 'rejected'] as const;

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500',
  reviewing: 'bg-yellow-500',
  interview: 'bg-purple-500',
  offer: 'bg-orange-500',
  hired: 'bg-green-500',
  rejected: 'bg-red-500',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  reviewing: 'Reviewing',
  interview: 'Interview',
  offer: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected',
};

const CareerApplicationsManager = () => {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [selected, setSelected] = useState<CareerApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<CareerApplication | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('career_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId: string, status: string) => {
    setUpdatingStatus(true);
    try {
      const { error } = await supabase
        .from('career_applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;

      setApplications(prev =>
        prev.map(app => (app.id === applicationId ? { ...app, status } : app))
      );
      if (selected?.id === applicationId) {
        setSelected(prev => (prev ? { ...prev, status } : null));
      }
      toast.success(`Application marked as ${STATUS_LABELS[status] || status}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const deleteApplication = async (application: CareerApplication) => {
    setDeleting(true);
    try {
      const { error } = await supabase
        .from('career_applications')
        .delete()
        .eq('id', application.id);

      if (error) throw error;

      setApplications(prev => prev.filter(app => app.id !== application.id));
      if (selected?.id === application.id) setSelected(null);
      toast.success(`Deleted application from ${application.full_name}`);
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const newCount = applications.filter(a => a.status === 'new').length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">Loading applications...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Applications List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Applications
              </span>
              <Badge variant="secondary">{newCount} new</Badge>
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              {STATUS_OPTIONS.map(status => (
                <Button
                  key={status}
                  variant={filter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(status)}
                >
                  {STATUS_LABELS[status]}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[32rem] overflow-y-auto">
              {filteredApplications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No applications found</div>
              ) : (
                filteredApplications.map(app => (
                  <div
                    key={app.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      selected?.id === app.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                    onClick={() => setSelected(app)}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${STATUS_COLORS[app.status] || 'bg-gray-500'}`} />
                        <span className="font-medium text-sm">{app.full_name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-muted-foreground mb-1">
                      {app.job_title}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{app.email}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Detail */}
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="pt-6">
            {selected ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${STATUS_COLORS[selected.status] || 'bg-gray-500'}`} />
                    <h3 className="text-lg font-medium">{selected.job_title}</h3>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmDelete(selected)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>

                {/* Status pipeline */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map(status => (
                      <Button
                        key={status}
                        variant={selected.status === status ? 'default' : 'outline'}
                        size="sm"
                        disabled={updatingStatus || selected.status === status}
                        onClick={() => updateStatus(selected.id, status)}
                      >
                        {updatingStatus && selected.status !== status ? (
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        ) : null}
                        {STATUS_LABELS[status]}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Contact details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium mr-2">Applicant:</span>
                    <span>{selected.full_name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium mr-2">Email:</span>
                    <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium mr-2">Phone:</span>
                    <a href={`tel:${selected.phone}`} className="text-blue-600 hover:underline">
                      {selected.phone}
                    </a>
                  </div>
                  {selected.linkedin_url && (
                    <div className="flex items-center text-sm">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium mr-2">LinkedIn:</span>
                      <a
                        href={selected.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {selected.linkedin_url}
                      </a>
                    </div>
                  )}
                  {selected.portfolio_url && (
                    <div className="flex items-center text-sm">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium mr-2">Portfolio:</span>
                      <a
                        href={selected.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {selected.portfolio_url}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium mr-2">Applied:</span>
                    <span>{formatDate(selected.created_at)}</span>
                  </div>
                </div>

                {/* Experience grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-card border rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Current Role</p>
                    <p className="text-sm font-medium">{selected.current_position || '—'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-card border rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Experience</p>
                    <p className="text-sm font-medium">{selected.years_experience || '—'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-card border rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Notice Period</p>
                    <p className="text-sm font-medium">{selected.notice_period || '—'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-card border rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Expected Salary</p>
                    <p className="text-sm font-medium">{selected.expected_salary || '—'}</p>
                  </div>
                </div>

                {selected.heard_from && (
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Heard about us via:</span> {selected.heard_from}
                  </p>
                )}

                {/* Cover letter */}
                <div className="border-t pt-4">
                  <p className="font-medium text-sm mb-2">Cover Letter:</p>
                  <div className="bg-gray-50 dark:bg-card p-4 rounded-lg">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{selected.cover_letter}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select an application
                </h3>
                <p className="text-gray-500">
                  Choose an application from the list to review the candidate
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the application from{' '}
              <strong>{confirmDelete?.full_name}</strong> for{' '}
              <strong>{confirmDelete?.job_title}</strong>. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                if (confirmDelete) deleteApplication(confirmDelete);
              }}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleting}
            >
              {deleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CareerApplicationsManager;
