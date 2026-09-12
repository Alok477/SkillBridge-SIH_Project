import React, { useState, useEffect } from 'react';
import { opportunityService } from '../../services/opportunityService';
import { studentService } from '../../services/studentService';
import { useToast } from '../../context/ToastContext';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { 
  Search, MapPin, DollarSign, Calendar, 
  ArrowRight, ShieldCheck, CheckCircle2, Star 
} from 'lucide-react';

export const StudentOpportunities = () => {
  const { addToast } = useToast();

  const [opps, setOpps] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ type: 'All', location: 'All' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [appliedIds, setAppliedIds] = useState([]);

  // Fetch opportunities and existing applications to show 'applied' state
  const fetchData = async () => {
    try {
      const data = await opportunityService.getAll();
      const apps = await studentService.getApplications();
      setOpps(data);
      if (data.length > 0) {
        setSelectedOpp(data[0]); // Default to first
      }
      setAppliedIds(apps.map(a => a.opportunityId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter application trigger
  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    const nextFilters = { ...filters, [name]: value };
    setFilters(nextFilters);

    setLoading(true);
    try {
      const results = await opportunityService.searchAndFilter(searchQuery, nextFilters);
      setOpps(results);
      if (results.length > 0) {
        setSelectedOpp(results[0]);
      } else {
        setSelectedOpp(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search input change handler
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    try {
      const results = await opportunityService.searchAndFilter(query, filters);
      setOpps(results);
      if (results.length > 0) {
        setSelectedOpp(results[0]);
      } else {
        setSelectedOpp(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (opp) => {
    setSubmitting(true);
    try {
      await studentService.applyForOpportunity(opp.id, opp.title, opp.company, opp.type);
      addToast(`Applied successfully to ${opp.company}!`, 'success');
      setAppliedIds(prev => [...prev, opp.id]);
    } catch (err) {
      addToast(err.message || 'Application failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Search and Filters Header */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search roles, corporations, or skills..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#121214] border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="flex-grow md:flex-initial px-3 py-2 bg-[#121214] border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <option value="All">All Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Apprenticeship">Apprenticeship</option>
            </select>

            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="flex-grow md:flex-initial px-3 py-2 bg-[#121214] border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <option value="All">All Locations</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Austin">Austin</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Dual-Pane Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Opportunity list */}
          <div className="lg:col-span-5 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-28 bg-zinc-800 rounded-xl" />
                <div className="h-28 bg-zinc-800 rounded-xl" />
              </div>
            ) : opps.length > 0 ? (
              opps.map((opp) => {
                const isSelected = selectedOpp?.id === opp.id;
                const isApplied = appliedIds.includes(opp.id);
                return (
                  <Card
                    key={opp.id}
                    hover
                    onClick={() => setSelectedOpp(opp)}
                    className={`flex flex-col justify-between p-4 cursor-pointer border-l-4 transition-all ${
                      isSelected 
                        ? 'bg-zinc-900 border-l-brand border-zinc-700/80 shadow-md' 
                        : 'border-l-transparent'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] text-zinc-500 font-semibold uppercase">{opp.type}</span>
                        <Badge variant="brand">{opp.matchScore}% Match</Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">{opp.title}</h4>
                        <p className="text-xs text-zinc-400 mt-1">{opp.company}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(Array.isArray(opp.skills) ? opp.skills : (typeof opp.skills === 'string' ? opp.skills.split(',') : ['React'])).map(s => (
                          <Badge key={typeof s === 'string' ? s.trim() : s} className="text-[9px] px-1.5 py-0.5">
                            {typeof s === 'string' ? s.trim() : s}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-zinc-800/60 mt-4 pt-3 flex justify-between items-center text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {(opp.location || 'Remote').split(' (')[0]}</span>
                      {isApplied ? (
                        <span className="text-accent-green font-semibold flex items-center gap-0.5">Applied</span>
                      ) : (
                        <span className="text-brand hover:underline flex items-center gap-0.5 font-medium">
                          Details &rarr;
                        </span>
                      )}
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="text-center py-12 text-zinc-500 text-sm">
                No matching opportunities found.
              </Card>
            )}
          </div>

          {/* Right details pane */}
          <div className="lg:col-span-7 bg-[#121214] border border-zinc-800 rounded-2xl p-6 min-h-[50vh]">
            {selectedOpp ? (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-800/60 pb-5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedOpp.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80'} 
                      alt={selectedOpp.company} 
                      className="w-12 h-12 rounded-xl object-cover bg-zinc-800 border border-zinc-700/50" 
                    />
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{selectedOpp.title}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{selectedOpp.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end sm:text-right gap-1">
                    <Badge variant="brand" className="text-xs font-semibold py-1 px-2.5">
                      {selectedOpp.matchScore || 90}% Skill Fit Match
                    </Badge>
                    <span className="text-[10px] text-zinc-500 mt-1">Deadline: {selectedOpp.deadline || 'Open'}</span>
                  </div>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-3 gap-4 text-xs text-zinc-300 border-b border-zinc-800/60 pb-5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase">Location</span>
                    <span className="font-medium flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5 text-zinc-500" /> {selectedOpp.location || 'Remote'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase">Compensation</span>
                    <span className="font-medium flex items-center gap-1 mt-0.5"><DollarSign className="w-3.5 h-3.5 text-zinc-500" /> {selectedOpp.compensation || 'Stipend Offered'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase">Posted</span>
                    <span className="font-medium flex items-center gap-1 mt-0.5"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> {selectedOpp.postedDate || 'Just now'}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Opportunity Overview</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">{selectedOpp.description || 'No description provided.'}</p>
                </div>

                {/* Requirements & Responsibilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Core Requirements</h4>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-zinc-400 leading-relaxed">
                      {(selectedOpp.requirements && Array.isArray(selectedOpp.requirements) && selectedOpp.requirements.length > 0 ? selectedOpp.requirements : ['Proficient in core technology stack', 'Good analytical and problem solving skills']).map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Responsibilities</h4>
                    <ul className="list-disc pl-4 space-y-1.5 text-xs text-zinc-400 leading-relaxed">
                      {(selectedOpp.responsibilities && Array.isArray(selectedOpp.responsibilities) && selectedOpp.responsibilities.length > 0 ? selectedOpp.responsibilities : ['Collaborate with tech lead and engineering team', 'Deliver project milestones efficiently']).map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action footer */}
                <div className="border-t border-zinc-800/60 pt-5 flex justify-between items-center">
                  <div className="text-[11px] text-zinc-500 font-normal leading-relaxed">
                    {appliedIds.includes(selectedOpp.id) ? (
                      <span className="text-accent-green font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Application on pipeline
                      </span>
                    ) : (
                      <span>Apply triggers immediate match review</span>
                    )}
                  </div>

                  <Button
                    onClick={() => handleApply(selectedOpp)}
                    disabled={submitting || appliedIds.includes(selectedOpp.id)}
                    className="px-5 font-semibold text-xs py-2.5 uppercase tracking-wider gap-1"
                  >
                    {appliedIds.includes(selectedOpp.id) ? 'Applied' : 'Apply For Position'} 
                    {!appliedIds.includes(selectedOpp.id) && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 text-zinc-500 text-sm">
                <Star className="w-8 h-8 text-zinc-700 mb-2" />
                Select an opportunity to view description.
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
