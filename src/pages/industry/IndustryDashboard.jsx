import React, { useState, useEffect } from 'react';
import { industryService } from '../../services/industryService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { Briefcase, Users, UserCheck, TrendingUp, BarChart2 } from 'lucide-react';

export const IndustryDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await industryService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Chart data sets matching portal aesthetics
  const applicationTimeline = [
    { name: 'Wk 1', count: 12 },
    { name: 'Wk 2', count: 35 },
    { name: 'Wk 3', count: 28 },
    { name: 'Wk 4', count: 48 },
    { name: 'Wk 5', count: 65 },
    { name: 'Wk 6', count: 148 }
  ];

  const skillDemand = [
    { name: 'React', demand: 95 },
    { name: 'SQL', demand: 82 },
    { name: 'Testing', demand: 68 },
    { name: 'REST APIs', demand: 89 },
    { name: 'Git', demand: 75 }
  ];

  const candidatePipeline = [
    { name: 'Applied', value: 80, fill: '#6b7280' },
    { name: 'Screened', value: 36, fill: '#3b82f6' },
    { name: 'Shortlisted', value: 32, fill: '#22c55e' }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center animate-pulse" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Enterprise Console &mdash; {profile.companyName}</h2>
          <p className="text-xs text-zinc-500 mt-1">Logged in as recruiter representative: <strong className="text-white">{profile.representative}</strong></p>
        </div>
        <Badge variant="brand" className="text-xs font-semibold py-1 px-3 uppercase tracking-wider">
          {profile.industrySector}
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Active Postings</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.activePostingsCount} positions</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Total Applicants</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.totalApplicantsCount} students</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green flex-shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Shortlisted</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.shortlistedCount} candidates</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Avg Match Score</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.averageMatchScore}% alignment</span>
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
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={applicationTimeline}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} />
                <YAxis stroke="#52525b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#121214', borderColor: '#27272a', color: '#fff' }} />
                <Area type="monotone" dataKey="count" stroke="#2563eb" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Right Column: Pipeline distribution */}
        <Card className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
            Hiring Pipeline Funnel
          </h3>
          <div className="w-full h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
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
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-4">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-zinc-500" /> Applied</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Screened</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Selected</span>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
