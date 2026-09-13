import React, { useState, useEffect } from 'react';
import { academicianService } from '../../services/academicianService';
import { useToast } from '../../context/ToastContext';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Award, Briefcase, Cpu, Layers } from 'lucide-react';

export const AcademicianDashboard = () => {
  const { addToast } = useToast();

  const [profile, setProfile] = useState(null);
  const [opps, setOpps] = useState([]);
  const [collabs, setCollabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [appliedIds, setAppliedIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const overview = await academicianService.getOverview();
        
        setProfile(overview.profile);
        setOpps(Array.isArray(overview.opportunities) ? overview.opportunities : []);
        setCollabs(Array.isArray(overview.collaborations) ? overview.collaborations : []);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to load the academician dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApply = (oppId, title) => {
    if (appliedIds.includes(oppId)) return;
    setAppliedIds(prev => [...prev, oppId]);
    addToast(`Interest noted for: ${title}`, 'success');
  };

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
        <Card className="border-red-500/30 bg-red-500/5">
          <h2 className="text-base font-semibold text-white">Academician dashboard unavailable</h2>
          <p className="text-sm text-zinc-400 mt-2">{error || 'No profile data was returned by the server.'}</p>
        </Card>
      </DashboardLayout>
    );
  }

  const trainingCount = opps.filter((opp) => opp.category === 'Faculty Development').length;

  return (
    <DashboardLayout>
      {/* Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Academician Workspace &mdash; {profile.name}</h2>
          <p className="text-xs text-zinc-500 mt-1">{profile.department} &bull; <strong className="text-white">{profile.institution}</strong></p>
        </div>
        <Badge variant="brand" className="text-xs font-semibold py-1 px-3 uppercase tracking-wider">
          Faculty Hub
        </Badge>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Collaborations</span>
            <span className="text-xl font-bold text-white mt-0.5">{profile.activeCollaborationsCount} active</span>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo flex-shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">FDP Training</span>
            <span className="text-xl font-bold text-white mt-0.5">{trainingCount} Available</span>
          </div>
        </Card>
      </div>

      {/* Main double column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recommended Openings */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4.5 h-4.5 text-brand" /> Recommended Corporate Collaborations
          </h3>

          <div className="space-y-4">
            {opps.length === 0 ? (
              <Card>
                <p className="text-sm text-zinc-400">No collaboration opportunities are available right now.</p>
              </Card>
            ) : opps.map((opp) => {
              const isApplied = appliedIds.includes(opp.id);
              return (
                <Card key={opp.id} className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase block">{opp.category}</span>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-tight mt-1">{opp.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1">{opp.sponsor} &bull; {opp.duration}</p>
                    </div>
                    <Badge variant={opp.status === 'Recommended' ? 'brand' : 'default'}>{opp.status}</Badge>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">{opp.description}</p>
                  
                  <div className="flex justify-between items-center border-t border-zinc-800/60 pt-4 mt-2">
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase">Budget/Stipend: <strong className="text-zinc-300 font-bold">{opp.stipend}</strong></span>
                    <Button 
                      size="sm" 
                      onClick={() => handleApply(opp.id, opp.title)} 
                      disabled={isApplied}
                      className="text-xs font-semibold px-4"
                    >
                      {isApplied ? 'Application Pending' : 'Register Interest'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right Column: Research collaborations */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4.5 h-4.5 text-brand" /> Active Partnerships
          </h3>

          <div className="space-y-4">
            {collabs.length === 0 ? (
              <Card>
                <p className="text-sm text-zinc-400">No active partnerships are listed yet.</p>
              </Card>
            ) : collabs.map((col) => (
              <Card key={col.id} className="space-y-3 p-4">
                <div className="flex justify-between items-start">
                  <Badge variant="info" className="text-[9px]">{col.type}</Badge>
                  <span className="text-[9px] text-zinc-500 font-semibold uppercase">{col.date}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-200 leading-tight">{col.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">{col.description}</p>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
