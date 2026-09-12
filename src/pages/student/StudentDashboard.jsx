import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { opportunityService } from '../../services/opportunityService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  ArrowRight, Award, BrainCircuit, Play, CheckCircle2, 
  MapPin, Clock, Calendar, CheckSquare, ShieldAlert
} from 'lucide-react';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentProfile = await studentService.getProfile();
        
        // If profile exists and student is not onboarded, redirect to survey
        if (studentProfile && studentProfile.onboarded === false) {
          navigate('/student/onboarding');
          return;
        }

        const allOpps = await opportunityService.getAll();
        setProfile(studentProfile);
        setOpps(allOpps.slice(0, 2)); // Show top 2 matching ones
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-6 animate-pulse">
          <div className="h-20 bg-zinc-800 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-zinc-800 rounded-xl" />
            <div className="h-32 bg-zinc-800 rounded-xl" />
            <div className="h-32 bg-zinc-800 rounded-xl" />
          </div>
          <div className="h-64 bg-zinc-800 rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  const skillCards = profile?.skills?.technical || [];
  const isLocked = profile?.assessmentCompleted === false;

  return (
    <DashboardLayout>
      <div className="relative">
        
        {/* Blur container when dashboard is locked */}
        <div className={`space-y-8 transition-all duration-300 ${isLocked ? 'blur-md pointer-events-none select-none' : ''}`}>
          
          {/* Welcome Hero bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-brand/10 to-brand-indigo/10 border border-brand/20 rounded-2xl p-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Good evening, {profile?.name.split(' ')[0]}</h2>
              <p className="text-xs text-zinc-400">
                Your current career alignment for <strong className="text-white">{profile?.careerPath?.role || 'Selected Career'}</strong> is updated.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-zinc-500 font-medium block">Career Readiness Score</span>
                <span className="text-2xl font-extrabold text-white">{profile?.careerPath?.readiness || 0}%</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-brand flex items-center justify-center bg-brand/10">
                <Award className="w-6 h-6 text-brand" />
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">Technical Skills</span>
              <span className="text-xl font-bold text-white">{skillCards.length} Mapped</span>
              <p className="text-xs text-zinc-400 mt-2">Competency level calculated</p>
            </Card>
            <Card>
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">Soft Skills</span>
              <span className="text-xl font-bold text-white">2 Mapped</span>
              <p className="text-xs text-zinc-400 mt-2">Aptitude and collaboration</p>
            </Card>
            <Card>
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">Profile Completion</span>
              <span className="text-xl font-bold text-white">{profile?.profileCompletion}%</span>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-brand h-full rounded-full" style={{ width: `${profile?.profileCompletion}%` }} />
              </div>
            </Card>
            <Card className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">Assessments Status</span>
                <span className="text-xl font-bold text-white">{isLocked ? 'Pending' : 'Completed'}</span>
              </div>
              {!isLocked && (
                <span className="text-xs font-semibold text-accent-green flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Profile
                </span>
              )}
            </Card>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Skill Assessment Cards */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-brand" /> Skill Competency Breakdown
                </h3>
                <Button size="sm" variant="outline" onClick={() => navigate('/student/skills')}>
                  View Detailed Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillCards.map((skill) => {
                  const gap = skill.required - skill.current;
                  const hasGap = gap > 0;
                  return (
                    <Card key={skill.name} className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                          <span className="text-[10px] text-zinc-500">{skill.category}</span>
                        </div>
                        {hasGap ? (
                          <Badge variant="warning">Gap: {gap}%</Badge>
                        ) : (
                          <Badge variant="success">Aligned</Badge>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-500">Current vs Required</span>
                          <span className="text-white font-medium">{skill.current}% / {skill.required}%</span>
                        </div>
                        <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 bottom-0 border-l border-zinc-500" style={{ left: `${skill.required}%` }} />
                          <div className={`h-full rounded-full ${hasGap ? 'bg-brand' : 'bg-accent-green'}`} style={{ width: `${skill.current}%` }} />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Recommendations & Actions */}
            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-md font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-brand" /> Target Opportunities
              </h3>

              <div className="space-y-4">
                {opps.map((opp) => (
                  <Card key={opp.id} hover onClick={() => navigate('/student/opportunities')} className="p-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-zinc-500 font-semibold uppercase">{opp.type}</span>
                        <Badge variant="brand">{opp.matchScore}% Match</Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{opp.title}</h4>
                        <p className="text-xs text-zinc-400 mt-1">{opp.company}</p>
                      </div>
                    </div>
                    <div className="border-t border-zinc-800/60 mt-4 pt-3 flex justify-between items-center text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {opp.location.split(' (')[0]}</span>
                      <span className="text-brand hover:underline flex items-center gap-0.5 cursor-pointer">
                        Apply <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Lock State Modal Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-background/40 backdrop-blur-sm rounded-2xl min-h-[50vh] p-4">
            <Card className="max-w-md w-full bg-[#121214]/90 border border-zinc-800 p-8 text-center space-y-6 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto text-brand">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Dashboard Locked</h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  To calculate your technical alignment, analyze skill gaps, and match with recommended internships, you must complete the Initial Skill Assessment.
                </p>
              </div>
              <Button
                onClick={() => navigate('/student/assessment')}
                className="w-full justify-center py-2.5 text-xs font-semibold uppercase tracking-wider gap-1.5"
              >
                Start Initial Assessment <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};
