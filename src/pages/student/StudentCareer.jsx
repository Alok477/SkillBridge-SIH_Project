import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  GitFork, CheckCircle2, Circle, BookOpen, 
  Layers, ExternalLink, ArrowRight 
} from 'lucide-react';

export const StudentCareer = () => {
  const navigate = useNavigate();
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-64 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center animate-pulse" />
      </DashboardLayout>
    );
  }

  // Skills lists mapped out for UI
  const career = profile?.careerPath || {};
  const allSkills = profile?.skills?.technical || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Career Roadmap Navigation</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Path mapping aligned with industry standards for target role: <strong className="text-white">{career.role}</strong>.
            </p>
          </div>
          <Badge variant="brand" className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">
            {career.readiness}% Target Aligned
          </Badge>
        </div>

        {/* Roadmap Roadmap/Steps timeline view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main timeline steps */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <GitFork className="w-5 h-5 text-brand" /> Syllabus & Core Stack Path
            </h3>

            <div className="space-y-4">
              {allSkills.map((skill, index) => {
                const acquired = skill.current >= skill.required;
                return (
                  <Card key={skill.name} className="flex items-start gap-4 bg-[#121214]/60 border-zinc-800 relative">
                    {/* Left node check circle */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                        acquired ? 'border-accent-green bg-accent-green/10 text-accent-green' : 'border-zinc-700 bg-zinc-900 text-zinc-500'
                      }`}>
                        {acquired ? <CheckCircle2 className="w-4.5 h-4.5" /> : <Circle className="w-3.5 h-3.5" />}
                      </div>
                      {index < allSkills.length - 1 && (
                        <div className="w-0.5 h-12 bg-zinc-800/80 my-2" />
                      )}
                    </div>

                    {/* Step details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                        <Badge variant={acquired ? 'success' : 'warning'}>
                          {acquired ? 'Acquired' : 'Pending Gaps'}
                        </Badge>
                      </div>
                      <p className="text-xs text-zinc-400">
                        {acquired 
                          ? `You possess satisfactory proficiency (${skill.current}%) exceeding recruiter benchmark thresholds.` 
                          : `Slight mismatch detected. Target competency of ${skill.required}% requires assessment upgrades.`
                        }
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right sidebar info widgets */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Recommended Learning Content */}
            <Card className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5 text-brand" /> Recommended Pathways
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg hover:border-zinc-700/80 transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-white block">Microservices Integration</span>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">Sponsor: Novex Tech Engineering</span>
                </div>
                <div className="p-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg hover:border-zinc-700/80 transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-white block">React Testing Orchestration</span>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">Sponsor: MSUT CS Department</span>
                </div>
              </div>
            </Card>

            {/* Target corporate partners */}
            <Card className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wide flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-brand" /> Recruiting Partners
              </h3>
              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between items-center py-1">
                  <span>Novex Technologies</span>
                  <span className="text-[10px] text-accent-green font-semibold">92% Match</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-zinc-800/60">
                  <span>Synergy Systems</span>
                  <span className="text-[10px] text-accent-amber font-semibold">78% Match</span>
                </div>
              </div>
            </Card>

            {/* Opportunities trigger CTA */}
            <Button 
              onClick={() => navigate('/student/opportunities')} 
              className="w-full justify-center text-xs font-semibold py-3 uppercase tracking-wider gap-1.5"
            >
              Explore Opportunity Matches <ArrowRight className="w-4 h-4" />
            </Button>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
