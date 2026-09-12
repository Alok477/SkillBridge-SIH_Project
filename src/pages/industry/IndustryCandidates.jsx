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
  ExternalLink, GraduationCap, FileCheck, X 
} from 'lucide-react';

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
          <div className="w-full max-w-lg bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-[slideIn_0.2s_ease-out_forwards]">
            
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
