import React, { useState, useEffect } from 'react';
import { institutionService } from '../../services/institutionService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  Tooltip, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { ShieldCheck, Users, GraduationCap, Award, BarChart2 } from 'lucide-react';

export const InstitutionDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await institutionService.getProfile();
        const analyticsData = await institutionService.getAnalytics();
        setProfile(profileData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error(err);
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

  return (
    <DashboardLayout>
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">University Cohort Metrics &mdash; {profile.name}</h2>
          <p className="text-xs text-zinc-500 mt-1">Institutional lead administrator: <strong className="text-white">{profile.representative}</strong></p>
        </div>
        <Badge variant="brand" className="text-xs font-semibold py-1 px-3 uppercase tracking-wider">
          Accredited Institute
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Total Students</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.totalStudentsCount}</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Assessed Students</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.assessedStudentsCount} ({Math.round((profile.assessedStudentsCount/profile.totalStudentsCount)*100)}%)</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green flex-shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Placement Rate</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.placementRate}%</span>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Internship Rate</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.internshipParticipation}%</span>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Skill Gap Analysis Bar chart */}
        <Card className="lg:col-span-6 space-y-6">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
            <BarChart2 className="w-4.5 h-4.5 text-brand" /> Curriculum Gap Analysis (% Mismatch)
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.skillsGap}>
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} />
                <YAxis stroke="#52525b" fontSize={10} label={{ value: 'Percent deficient', angle: -90, position: 'insideLeft', fill: '#52525b', style: { fontSize: 10 } }} />
                <Tooltip contentStyle={{ backgroundColor: '#121214', borderColor: '#27272a', color: '#fff' }} />
                <Bar dataKey="lack" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Readiness distribution Donut chart */}
        <Card className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
            Placement Readiness Index
          </h3>
          <div className="w-full h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.placementReadiness}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics.placementReadiness.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-around text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mt-4">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Ready</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Almost Ready</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Deficient</span>
          </div>
        </Card>

        {/* Cohort participation trends */}
        <Card className="lg:col-span-12 space-y-6">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
            Timeline Cohort Placement Trends
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.participationTimeline}>
                <XAxis dataKey="month" stroke="#52525b" fontSize={10} />
                <YAxis stroke="#52525b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#121214', borderColor: '#27272a', color: '#fff' }} />
                <Line type="monotone" dataKey="internships" stroke="#2563eb" strokeWidth={2.5} />
                <Line type="monotone" dataKey="placements" stroke="#22c55e" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
