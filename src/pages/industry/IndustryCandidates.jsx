import React, { useState, useEffect } from 'react';
import { industryService } from '../../services/industryService';
import { useToast } from '../../context/ToastContext';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { 
  Users, CheckCircle2, AlertTriangle, UserCheck, 
  ExternalLink, GraduationCap, FileCheck, FileText, X 
} from 'lucide-react';

const externalUrl = value => value && (/^https?:\/\//i.test(value) ? value : `https://${value}`);

export const IndustryCandidates = () => {
  const { addToast } = useToast();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const fetchCandidates = async () => {
    try {
      const data = await industryService.getCandidates();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleShortlist = async (candidateId, name) => {
    try {
      const updated = await industryService.updateCandidateStatus(candidateId, 'Shortlisted');
      setCandidates(updated);
      
      // Update selected profile view if open
      if (selectedCandidate?.id === candidateId) {
        setSelectedCandidate(prev => ({ ...prev, status: 'Shortlisted' }));
      }
      
      addToast(`Candidate ${name} shortlisted for review!`, 'success');
    } catch (err) {
      addToast('Status update failed', 'error');
    }
  };

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
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI Candidate Recommendation Directory</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Browse students auto-matched to active corporate postings based on assessment competencies.
          </p>
        </div>

        {/* Candidate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((cand) => {
            const isShortlisted = cand.status === 'Shortlisted';
            return (
              <Card key={cand.id} className="flex flex-col justify-between h-full bg-[#121214]/60 border-zinc-800">
                <div className="space-y-4">
                  {/* Top line profile header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar name={cand.name} sizeClass="w-10 h-10 text-xs" />
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{cand.name}</h4>
                        <span className="text-[10px] text-zinc-500 block truncate max-w-[150px]">{cand.college}</span>
                      </div>
                    </div>
                    <Badge variant="brand">{cand.matchScore}% Match</Badge>
                  </div>

                  {/* Skills match summary checkboxes */}
                  <div className="space-y-2 border-t border-b border-zinc-800/60 py-3 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Competencies Matched</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cand.skills.matched.map(s => (
                          <span key={s} className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-accent-green bg-accent-green/5 border border-accent-green/15 rounded px-1.5 py-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" /> {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Gaps Mapped</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cand.skills.missing.map(s => (
                          <span key={s} className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-accent-amber bg-accent-amber/5 border border-accent-amber/15 rounded px-1.5 py-0.5">
                            <AlertTriangle className="w-2.5 h-2.5" /> {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer action trigger CTAs */}
                <div className="flex gap-2.5 mt-5">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-[11px]" 
                    onClick={() => setSelectedCandidate(cand)}
                  >
                    Compare Profile
                  </Button>
                  <Button
                    size="sm"
                    disabled={isShortlisted}
                    className="flex-1 text-[11px] justify-center gap-1"
                    onClick={() => handleShortlist(cand.id, cand.name)}
                  >
                    {isShortlisted ? <FileCheck className="w-3.5 h-3.5" /> : null}
                    {isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Candidate comparison overlay drawer/modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-[slideIn_0.2s_ease-out_forwards]">
            
            {/* Header info */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <Avatar name={selectedCandidate.name} sizeClass="w-12 h-12 text-sm" />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedCandidate.name}</h3>
                  <span className="text-xs text-zinc-400 block">{selectedCandidate.college}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile statistics */}
            <div className="grid grid-cols-3 gap-4 text-xs text-zinc-300 border-t border-b border-zinc-800/60 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">GPA</span>
                <span className="font-bold text-white mt-0.5 flex items-center gap-1"><GraduationCap className="w-4 h-4 text-zinc-500" /> {selectedCandidate.gpa}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">Assessment Rating</span>
                <span className="font-bold text-white mt-0.5 flex items-center gap-1"><UserCheck className="w-4 h-4 text-zinc-500" /> {selectedCandidate.assessmentScore}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">Match Score</span>
                <span className="font-bold text-brand mt-0.5 flex items-center gap-1">{selectedCandidate.matchScore}% Alignment</span>
              </div>
            </div>

            {/* Interest */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Career Pathway Interest</span>
              <span className="text-white font-medium block">{selectedCandidate.interest}</span>
            </div>

            <div className="space-y-4 border-t border-zinc-800/60 pt-4">
              <div className="flex items-center justify-between">
                <div><span className="text-[10px] text-zinc-500 font-semibold uppercase">Skill profile</span><p className="mt-1 text-xs text-zinc-500">Assessment-driven competency levels and skill gaps.</p></div>
                <Badge variant="brand">{selectedCandidate.profile?.careerPath?.readiness || 0}% readiness</Badge>
              </div>
              <div className="space-y-3">
                {[...(selectedCandidate.profile?.skills?.technical || []), ...(selectedCandidate.profile?.skills?.soft || [])].length ? [...(selectedCandidate.profile?.skills?.technical || []), ...(selectedCandidate.profile?.skills?.soft || [])].map((skill, index) => {
                  const current = Math.max(0, Math.min(100, Number(skill?.current ?? 0)));
                  const required = Math.max(0, Math.min(100, Number(skill?.required ?? 75)));
                  const gap = Math.max(0, required - current);
                  return <div key={`${skill?.name || skill}-${index}`}><div className="mb-1 flex items-center justify-between gap-3 text-xs"><span className="font-semibold text-zinc-200">{skill?.name || skill}<span className="ml-2 text-[10px] font-normal text-zinc-500">{skill?.category || 'Skill'}</span></span><span className="text-zinc-400">{current}%{skill?.assessmentScore != null ? ` · Test ${skill.assessmentScore}%` : ''}</span></div><div className="relative h-2 overflow-hidden rounded-full bg-zinc-800"><div className={`h-full rounded-full ${gap ? 'bg-brand' : 'bg-accent-green'}`} style={{ width: `${current}%` }} /><span className="absolute top-0 h-2 w-0.5 bg-zinc-400" style={{ left: `${required}%` }} title={`Required: ${required}%`} /></div>{gap > 0 && <span className="mt-1 block text-[10px] text-accent-amber">Gap: {gap}% to required level</span>}</div>;
                }) : <p className="text-xs text-zinc-500">No mapped skills available.</p>}
              </div>
              {Object.keys((selectedCandidate.profile?.assessmentHistory || []).reduce((scores, attempt) => { Object.entries(attempt.skillScores || {}).forEach(([domain, score]) => { if (!scores[domain]) scores[domain] = []; scores[domain].push(Number(score)); }); return scores; }, {})).length > 0 && <div className="border-t border-zinc-800 pt-3"><span className="text-[10px] font-semibold uppercase text-zinc-500">Tested domains</span><div className="mt-2 flex flex-wrap gap-2">{Object.entries((selectedCandidate.profile?.assessmentHistory || []).reduce((scores, attempt) => { Object.entries(attempt.skillScores || {}).forEach(([domain, score]) => { if (!scores[domain]) scores[domain] = []; scores[domain].push(Number(score)); }); return scores; }, {})).map(([domain, scores]) => <span key={domain} className="rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-1 text-[10px] text-violet-200">{domain}: {Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)}%</span>)}</div></div>}
            </div>

            <div className="space-y-4 border-t border-zinc-800/60 pt-4">
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">Student profile</span>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg bg-zinc-900/60 p-3"><span className="block text-[10px] text-zinc-500">Email</span><span className="mt-1 block break-all text-xs text-zinc-200">{selectedCandidate.profile?.email || 'Not provided'}</span></div>
                  <div className="rounded-lg bg-zinc-900/60 p-3"><span className="block text-[10px] text-zinc-500">Department</span><span className="mt-1 block text-xs text-zinc-200">{selectedCandidate.profile?.department || 'Not provided'}{selectedCandidate.profile?.graduationYear ? ` · Class of ${selectedCandidate.profile.graduationYear}` : ''}</span></div>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase">Skills</span>
                <div className="mt-2 flex flex-wrap gap-1.5">{[...(selectedCandidate.profile?.skills?.technical || []), ...(selectedCandidate.profile?.skills?.soft || [])].map((skill, index) => <span key={`${skill.name || skill}-${index}`} className="rounded-full border border-brand/20 bg-brand/10 px-2 py-1 text-[10px] text-blue-200">{skill.name || skill}</span>)}</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><span className="text-[10px] text-zinc-500 font-semibold uppercase">Education</span>{(selectedCandidate.profile?.education || []).length ? <div className="mt-2 space-y-1">{selectedCandidate.profile.education.map(item => <div key={item.id || `${item.degree}-${item.institution}`} className="text-xs text-zinc-300"><strong className="text-white">{item.degree || 'Degree'}</strong><span className="block text-zinc-500">{item.institution || 'Institution not provided'}</span></div>)}</div> : <p className="mt-2 text-xs text-zinc-500">Not provided</p>}</div>
                <div><span className="text-[10px] text-zinc-500 font-semibold uppercase">Projects</span>{(selectedCandidate.profile?.projects || []).length ? <div className="mt-2 space-y-2">{selectedCandidate.profile.projects.slice(0, 3).map(item => <div key={item.id || item.title} className="text-xs text-zinc-300"><strong className="text-white">{item.title || 'Untitled project'}</strong><span className="block truncate text-zinc-500">{item.description || item.outcome || 'No description'}</span><div className="mt-1.5 flex flex-wrap gap-2">{item.github && <a className="inline-flex items-center gap-1 text-[11px] text-brand hover:text-white" href={externalUrl(item.github)} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3" /> GitHub</a>}{item.demo && <a className="inline-flex items-center gap-1 text-[11px] text-brand hover:text-white" href={externalUrl(item.demo)} target="_blank" rel="noreferrer"><ExternalLink className="h-3 w-3" /> Live demo</a>}</div></div>)}</div> : <p className="mt-2 text-xs text-zinc-500">Not provided</p>}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCandidate.profile?.resume?.dataUrl && <><a className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-200 hover:border-brand hover:text-white" href={selectedCandidate.profile.resume.dataUrl} target="_blank" rel="noreferrer"><FileText className="h-3.5 w-3.5" /> View resume</a><a className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-200 hover:border-brand hover:text-white" href={selectedCandidate.profile.resume.dataUrl} download={selectedCandidate.profile.resume.name || 'resume.pdf'}><FileText className="h-3.5 w-3.5" /> Download resume</a></>}
                {(selectedCandidate.profile?.certifications || []).filter(item => item.certificatePdf?.dataUrl).map(item => <span key={item.id || item.title} className="inline-flex flex-wrap gap-2"><a className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-200 hover:border-brand hover:text-white" href={item.certificatePdf.dataUrl} target="_blank" rel="noreferrer"><FileCheck className="h-3.5 w-3.5" /> View {item.title || 'certificate'}</a><a className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-200 hover:border-brand hover:text-white" href={item.certificatePdf.dataUrl} download={item.certificatePdf.name || `${item.title || 'certificate'}.pdf`}><FileCheck className="h-3.5 w-3.5" /> Download</a></span>)}
                {!selectedCandidate.profile?.resume?.dataUrl && !(selectedCandidate.profile?.certifications || []).some(item => item.certificatePdf?.dataUrl) && <span className="text-xs text-zinc-500">No uploaded documents available.</span>}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-2">
              <Button 
                variant="secondary" 
                className="w-full text-xs font-semibold py-2.5" 
                onClick={() => setSelectedCandidate(null)}
              >
                Close Drawer
              </Button>
              <Button 
                className="w-full justify-center text-xs font-semibold py-2.5"
                disabled={selectedCandidate.status === 'Shortlisted'}
                onClick={() => handleShortlist(selectedCandidate.id, selectedCandidate.name)}
              >
                {selectedCandidate.status === 'Shortlisted' ? 'Shortlisted' : 'Shortlist Candidate'}
              </Button>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
