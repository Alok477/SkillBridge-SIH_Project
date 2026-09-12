import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export const StudentApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await studentService.getApplications();
        setApps(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Shortlisted':
      case 'Selected':
        return 'success';
      case 'Under Review':
      case 'Interview':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'info';
    }
  };

  const stages = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected'];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center animate-pulse" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Application Tracking Pipeline</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Monitor real-time recruitment pipeline updates from academic portal corporate partners.
          </p>
        </div>

        {apps.length > 0 ? (
          <div className="space-y-6">
            {apps.map((app) => (
              <Card key={app.id} className="space-y-6">
                {/* Application Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-zinc-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{app.title}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{app.company} &bull; {app.type}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="text-[10px] text-zinc-500 block">Applied on {app.appliedDate}</span>
                    <Badge variant={getStatusVariant(app.status)} className="text-xs py-1 px-2.5">
                      {app.status}
                    </Badge>
                  </div>
                </div>

                {/* Progress Pipeline */}
                <div>
                  <h4 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase mb-4">Recruitment Stage</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {stages.map((stage, idx) => {
                      const timeline = Array.isArray(app.timeline) ? app.timeline : [];
                      const isCompleted = timeline.some(t => t.stage === stage);
                      const isCurrent = app.status === stage;
                      
                      return (
                        <div 
                          key={stage} 
                          className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                            isCurrent 
                              ? 'bg-brand/10 border-brand text-white' 
                              : isCompleted 
                              ? 'bg-zinc-900 border-zinc-800 text-zinc-300' 
                              : 'bg-background/20 border-zinc-900 text-zinc-600'
                          }`}
                        >
                          <span className="text-[10px] font-semibold uppercase tracking-wider block">Stage 0{idx + 1}</span>
                          <span className="text-xs font-bold leading-normal">{stage}</span>
                          {isCompleted && (
                            <CheckCircle2 className="w-4 h-4 text-accent-green mt-1 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-20 text-zinc-500 text-sm">
            You haven't applied to any opportunities yet.
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
