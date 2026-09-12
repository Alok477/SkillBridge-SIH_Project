import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Cpu, Star, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

export const StudentSkills = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await studentService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getCompetencyTier = (score) => {
    if (score >= 90) return 'Expert';
    if (score >= 75) return 'Advanced';
    if (score >= 55) return 'Intermediate';
    return 'Beginner';
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center animate-pulse" />
      </DashboardLayout>
    );
  }

  const technical = profile?.skills?.technical || [];
  const soft = profile?.skills?.soft || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Interactive Skill Profile</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Compare your competency benchmarks against corporate recruitment standards.
          </p>
        </div>

        {/* Technical Skills Overview */}
        <Card className="space-y-6">
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Cpu className="w-4.5 h-4.5 text-brand" /> Technical & Domain Competencies
          </h3>

          <div className="space-y-5">
            {technical.map((skill) => {
              const gap = skill.required - skill.current;
              const hasGap = gap > 0;
              return (
                <div key={skill.name} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Title/Label */}
                  <div className="md:col-span-3">
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] text-zinc-500 block">{skill.category}</span>
                  </div>

                  {/* Level Indicators */}
                  <div className="md:col-span-2 flex items-center gap-2">
                    <span className="text-xs text-zinc-400 font-semibold">{getCompetencyTier(skill.current)}</span>
                    <span className="text-[10px] text-zinc-600">&rarr; Target: {getCompetencyTier(skill.target)}</span>
                  </div>

                  {/* Visual Range bar */}
                  <div className="md:col-span-5 relative py-2">
                    <div className="flex justify-between text-[10px] text-zinc-600 mb-1">
                      <span>Competency</span>
                      <span>{skill.current}% / Required: {skill.required}%</span>
                    </div>
                    <div className="w-full bg-zinc-800/80 h-2.5 rounded-full overflow-hidden relative">
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-zinc-500" 
                        style={{ left: `${skill.required}%` }} 
                        title={`Required Level: ${skill.required}%`} 
                      />
                      <div 
                        className={`h-full rounded-full ${hasGap ? 'bg-brand' : 'bg-accent-green'}`} 
                        style={{ width: `${skill.current}%` }} 
                      />
                    </div>
                  </div>

                  {/* Gap Index badge */}
                  <div className="md:col-span-2 md:text-right">
                    {hasGap ? (
                      <div className="inline-flex items-center gap-1 bg-accent-amber/10 border border-accent-amber/20 text-accent-amber text-[10px] px-2 py-0.5 rounded-md font-semibold">
                        <AlertCircle className="w-3.5 h-3.5" /> Gap: {gap}%
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 bg-accent-green/10 border border-accent-green/20 text-accent-green text-[10px] px-2 py-0.5 rounded-md font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Soft Skills Section */}
        <Card className="space-y-6">
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Star className="w-4.5 h-4.5 text-brand" /> Soft Skills & Collaborative Aptitude
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {soft.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-sm font-bold text-white">{skill.name}</span>
                  <span className="text-zinc-500 font-semibold">{skill.current}% competency level</span>
                </div>
                <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-brand-indigo h-full rounded-full" style={{ width: `${skill.current}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
