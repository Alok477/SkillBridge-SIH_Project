import React, { useState, useEffect } from 'react';
import { institutionService } from '../../services/institutionService';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Search, GraduationCap, X, ChevronRight, Eye } from 'lucide-react';

export const InstitutionStudentRoster = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [readinessFilter, setReadinessFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const roster = await institutionService.getStudents();
        setStudents(roster);
        setFilteredStudents(roster);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, readinessFilter);
  };

  const handleReadinessFilter = (e) => {
    const filter = e.target.value;
    setReadinessFilter(filter);
    applyFilters(searchQuery, filter);
  };

  const applyFilters = (query, readiness) => {
    let list = [...students];

    if (query) {
      list = list.filter(s => s.name.toLowerCase().includes(query) || s.department.toLowerCase().includes(query));
    }

    if (readiness !== 'All') {
      list = list.filter(s => s.placementReadiness === readiness);
    }

    setFilteredStudents(list);
  };

  const getReadinessVariant = (readiness) => {
    switch (readiness) {
      case 'Ready':
        return 'success';
      case 'Almost Ready':
        return 'warning';
      case 'Needs Development':
        return 'error';
      default:
        return 'default';
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
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search students or majors..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#121214] border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>

          <select
            value={readinessFilter}
            onChange={handleReadinessFilter}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-[#121214] border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <option value="All">All Readiness Tiers</option>
            <option value="Ready">Ready</option>
            <option value="Almost Ready">Almost Ready</option>
            <option value="Needs Development">Needs Development</option>
          </select>
        </div>

        {/* Student Directory Table Container */}
        <Card className="p-0 overflow-hidden border-zinc-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-800/20 border-b border-zinc-800 text-zinc-500 font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Department</th>
                  <th className="py-4 px-6 text-center">Skill score</th>
                  <th className="py-4 px-6 text-center">Internships</th>
                  <th className="py-4 px-6">Readiness</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-medium">
                {filteredStudents.map((stud) => (
                  <tr key={stud.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{stud.name}</td>
                    <td className="py-4 px-6 text-zinc-400">{stud.department}</td>
                    <td className="py-4 px-6 text-center text-zinc-200">{stud.skillScore}%</td>
                    <td className="py-4 px-6 text-center text-zinc-400">{stud.internshipStatus}</td>
                    <td className="py-4 px-6">
                      <Badge variant={getReadinessVariant(stud.placementReadiness)}>
                        {stud.placementReadiness}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => setSelectedStudent(stud)}
                        className="text-brand hover:text-brand-hover inline-flex items-center gap-1 font-semibold"
                      >
                        <Eye className="w-4 h-4" /> Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Inspect student details profile modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-[slideIn_0.2s_ease-out_forwards]">
            
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-base font-bold text-white leading-tight">{selectedStudent.name}</h3>
                <span className="text-xs text-zinc-400 block mt-0.5">{selectedStudent.department} &bull; MSUT student</span>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-zinc-300 border-t border-zinc-800/60 pt-4">
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">GPA</span>
                <span className="font-bold text-white mt-1 block">{selectedStudent.gpa}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Skill competency Score</span>
                <span className="font-bold text-brand mt-1 block">{selectedStudent.skillScore}% score</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[10px] text-zinc-500 font-semibold uppercase block">Placement Status Benchmarks</span>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
                <span>Assessment Status</span>
                <Badge variant={selectedStudent.assessmentStatus === 'Completed' ? 'success' : 'warning'}>{selectedStudent.assessmentStatus}</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
                <span>Active Internship status</span>
                <span className="text-zinc-300">{selectedStudent.internshipStatus}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/60">
                <span>Hiring Readiness Group</span>
                <Badge variant={getReadinessVariant(selectedStudent.placementReadiness)}>{selectedStudent.placementReadiness}</Badge>
              </div>
            </div>

            <Button 
              variant="secondary" 
              className="w-full text-xs font-semibold py-2.5" 
              onClick={() => setSelectedStudent(null)}
            >
              Dismiss
            </Button>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
