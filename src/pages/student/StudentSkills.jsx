import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Cpu, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

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

  const normalizeSkill = skill => typeof skill === 'string'
    ? { name: skill, category: 'Technical', current: 0, target: 90, required: 75 }
    : { ...skill, current: Number(skill.current ?? 0), target: Number(skill.target ?? 90), required: Number(skill.required ?? 75), assessmentScore: skill.assessmentScore == null ? null : Number(skill.assessmentScore) };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center animate-pulse" />
      </DashboardLayout>
    );
  }

  const technical = (profile?.skills?.technical || []).map(normalizeSkill);
  const soft = (profile?.skills?.soft || []).map(normalizeSkill);
  const assessmentHistory = profile?.assessmentHistory || [];
  const average = skills => skills.length ? Math.round(skills.reduce((total, skill) => total + skill.current, 0) / skills.length) : 0;
  const averageRequired = skills => skills.length ? Math.round(skills.reduce((total, skill) => total + skill.required, 0) / skills.length) : 75;
  const assessmentScores = assessmentHistory.map(attempt => Number(attempt.score)).filter(Number.isFinite);
  const assessmentAverage = assessmentScores.length
    ? Math.round(assessmentScores.reduce((total, score) => total + score, 0) / assessmentScores.length)
    : Number(profile?.careerPath?.readiness || 0);
  const domainScores = assessmentHistory
    .flatMap(attempt => Object.entries(attempt.skillScores || {}))
    .reduce((scores, [domain, score]) => {
      if (!scores[domain]) scores[domain] = [];
      scores[domain].push(Number(score));
      return scores;
    }, {});
  const domainAverage = Object.values(domainScores).length
    ? Math.round(Object.values(domainScores).reduce((total, scores) => total + scores.reduce((sum, score) => sum + score, 0) / scores.length, 0) / Object.values(domainScores).length)
    : assessmentAverage;
  const assessmentRadarData = Object.keys(domainScores).length
    ? Object.entries(domainScores).map(([domain, scores]) => ({
      subject: domain,
      current: Math.round(scores.reduce((total, score) => total + score, 0) / scores.length),
      required: 75,
    }))
    : assessmentHistory.length
      ? [{ subject: assessmentHistory[assessmentHistory.length - 1].domain || 'Overall', current: assessmentAverage, required: 75 }]
      : [{ subject: 'No assessments', current: 0, required: 75 }];
  const evidenceScores = {
    projects: Math.min(100, (profile?.projects?.length || 0) * 25),
    certifications: Math.min(100, (profile?.certifications?.length || 0) * 35),
    education: profile?.education?.length ? 100 : 0,
    languages: profile?.languages?.length ? Math.min(100, (profile.languages.length / 2) * 100) : 0,
  };
  const overviewData = [
    { subject: 'Technical', current: average(technical), required: averageRequired(technical) },
    { subject: 'Soft skills', current: average(soft), required: averageRequired(soft) },
    { subject: 'Assessments', current: assessmentAverage, required: 75 },
    { subject: 'Domains', current: domainAverage, required: 75 },
    { subject: 'Projects', current: evidenceScores.projects, required: 75 },
    { subject: 'Certifications', current: evidenceScores.certifications, required: 70 },
    { subject: 'Education', current: evidenceScores.education, required: 75 },
    { subject: 'Languages', current: evidenceScores.languages, required: 60 },
  ];
  const overallScore = Math.round(overviewData.reduce((total, item) => total + item.current, 0) / overviewData.length);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Interactive Skill Profile</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Map your current ability against target and employer-required competency levels.
          </p>
        </div>

        <Card className="border-brand/20 bg-gradient-to-br from-brand/10 via-[#121214] to-[#121214]">
          <p className="text-sm font-semibold text-white">Assessment-driven skill profile</p>
          <p className="mt-1 text-xs text-zinc-500">These competency levels are read-only and are updated automatically after you complete an assessment.</p>
        </Card>

        <Card className="border-zinc-800/80 bg-gradient-to-br from-violet-500/10 via-[#121214] to-[#121214]">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2"><Cpu className="h-4 w-4 text-violet-300" /><h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200">Competency overview</h3></div>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-zinc-500">The radar uses assessment performance only. Each axis represents a technology or domain tested, averaged across all attempts. The dotted outline represents the placement benchmark.</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"><div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"><span className="text-[10px] uppercase text-zinc-500">Overall position</span><strong className="mt-1 block text-2xl text-white">{overallScore}%</strong></div><div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"><span className="text-[10px] uppercase text-zinc-500">Technical</span><strong className="mt-1 block text-xl text-white">{average(technical)}%</strong></div><div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"><span className="text-[10px] uppercase text-zinc-500">All assessments</span><strong className="mt-1 block text-xl text-white">{assessmentAverage}%</strong><span className="text-[10px] text-zinc-500">{assessmentHistory.length} attempt{assessmentHistory.length === 1 ? '' : 's'}</span></div><div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"><span className="text-[10px] uppercase text-zinc-500">Portfolio evidence</span><strong className="mt-1 block text-xl text-white">{(profile?.projects?.length || 0) + (profile?.certifications?.length || 0) + (profile?.education?.length || 0) + (profile?.languages?.length || 0)}</strong><span className="text-[10px] text-zinc-500">scored items · resume excluded</span></div></div>
            </div>
            <div className="h-72 w-full lg:w-[440px]"><ResponsiveContainer width="100%" height="100%"><RadarChart data={assessmentRadarData} outerRadius="72%"><PolarGrid stroke="#3f3f46" /><PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 10 }} /><PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#71717a', fontSize: 8 }} /><Radar name="Benchmark" dataKey="required" stroke="#71717a" fill="#71717a" fillOpacity={0.08} strokeDasharray="4 4" /><Radar name="Assessment performance" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} /><Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '11px' }} /></RadarChart></ResponsiveContainer></div>
          </div>
        </Card>

        {/* Technical Skills Overview */}
        <Card className="space-y-6">
          <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Cpu className="w-4.5 h-4.5 text-brand" /> Technical & Domain Competencies
          </h3>

          <div className="space-y-5">
            {technical.map((skill, index) => {
              const gap = skill.required - skill.current;
              const hasGap = gap > 0;
              return (
                <div key={`${skill.name}-${index}`} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Title/Label */}
                  <div className="md:col-span-3">
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] text-zinc-500 block">{skill.category}{skill.assessmentScore != null ? ` · Assessment: ${skill.assessmentScore}%` : ''}</span>
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
                  <div className="flex items-center gap-2 md:col-span-2 md:justify-end">
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
            {soft.map((skill, index) => (
              <div key={`${skill.name}-${index}`} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-sm font-bold text-white">{skill.name}</span>
                  <span className="text-zinc-500 font-semibold">{skill.current}% competency level{skill.assessmentScore != null ? ` · Assessment ${skill.assessmentScore}%` : ''}</span>
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
