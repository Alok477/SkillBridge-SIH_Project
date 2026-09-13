import React, { useState, useEffect } from 'react';
import { industryService } from '../../services/industryService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  ResponsiveContainer, Tooltip, PieChart, Pie, Cell 
} from 'recharts';
import { Briefcase, Users, UserCheck, TrendingUp, BarChart2 } from 'lucide-react';

export const IndustryDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError('');
        const data = await industryService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to load the industry dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center animate-pulse" />
      </DashboardLayout>
    );
  }

  if (error || !profile) {
    return (
      <DashboardLayout>
        <Card className="mx-auto max-w-xl space-y-4 text-center">
          <h2 className="text-lg font-bold text-white">Industry dashboard unavailable</h2>
          <p className="text-sm text-zinc-400">{error || 'No company profile was returned.'}</p>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </Card>
      </DashboardLayout>
    );
  }

  const totalApplicants = Number(profile.totalApplicantsCount || 0);
  const shortlistedCandidates = Number(profile.shortlistedCount || 0);
  const candidatePipeline = [
    { name: 'Applied', value: totalApplicants, fill: '#6b7280' },
    { name: 'Shortlisted', value: shortlistedCandidates, fill: '#22c55e' }
  ];

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 sm:p-6">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Enterprise Console &mdash; {profile.companyName}</h2>
          <p className="text-xs text-zinc-500 mt-1">Logged in as recruiter representative: <strong className="text-white">{profile.representative}</strong></p>
        </div>
        <Badge variant="brand" className="shrink-0 text-xs font-semibold py-1 px-3 uppercase tracking-wider">
          {profile.industrySector}
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="h-10 w-10 shrink-0 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Active Postings</span>
            <span className="mt-0.5 block break-words text-lg font-bold text-white sm:text-xl">{profile.activePostingsCount} positions</span>
          </div>
        </Card>

        <Card className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Total Applicants</span>
            <span className="mt-0.5 block break-words text-lg font-bold text-white sm:text-xl">{profile.totalApplicantsCount} students</span>
          </div>
        </Card>

        <Card className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green flex-shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Shortlisted</span>
            <span className="mt-0.5 block break-words text-lg font-bold text-white sm:text-xl">{profile.shortlistedCount} candidates</span>
          </div>
        </Card>

        <Card className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Avg Match Score</span>
            <span className="mt-0.5 block break-words text-lg font-bold text-white sm:text-xl">{profile.averageMatchScore}% alignment</span>
          </div>
        </Card>
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Applications over time */}
        <Card className="lg:col-span-8 space-y-6">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
            <BarChart2 className="w-4.5 h-4.5 text-brand" /> Recruiting Trend: Applications Over Time
          </h3>
          <div className="w-full h-64">
            <div className="flex h-full items-center justify-center text-center text-xs text-zinc-500">
              Application trend data will appear when dated application analytics are available.
            </div>
          </div>
        </Card>

        {/* Right Column: Pipeline distribution */}
        <Card className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
            Hiring Pipeline Funnel
          </h3>
          <div className="w-full h-48 flex items-center justify-center">
            {totalApplicants > 0 ? <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={candidatePipeline}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {candidatePipeline.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer> : <p className="px-4 text-center text-xs text-zinc-500">The hiring pipeline will appear after students apply to an opportunity.</p>}
          </div>
          <div className="flex justify-around text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-4">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-zinc-500" /> Applied</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Shortlisted</span>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
