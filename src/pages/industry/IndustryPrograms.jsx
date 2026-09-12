import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Calendar, Users, Cpu, FileCheck2, Plus, X } from 'lucide-react';

export const IndustryPrograms = () => {
  const { addToast } = useToast();

  const [programs, setPrograms] = useState([
    { id: 'prog-1', title: 'React Performance Benchmarking Boot camp', type: 'Workshop', sponsor: 'Novex Technologies', date: 'Sept 18, 2026', capacity: '120 slots', enrolled: 45 },
    { id: 'prog-2', title: 'AWS Serverless Computing Mentorship', type: 'Mentorship', sponsor: 'Synergy Systems', date: 'Oct 02, 2026', capacity: '15 slots', enrolled: 8 }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({ title: '', type: 'Workshop', date: '', capacity: '' });

  const handleCreateProgram = (e) => {
    e.preventDefault();
    if (!newProgram.title || !newProgram.date) {
      addToast('Please fill out all required fields', 'error');
      return;
    }

    const created = {
      id: `prog-${Math.random().toString(36).substr(2, 9)}`,
      title: newProgram.title,
      type: newProgram.type,
      sponsor: 'Novex Technologies',
      date: newProgram.date,
      capacity: `${newProgram.capacity || 50} slots`,
      enrolled: 0
    };

    setPrograms(prev => [...prev, created]);
    setModalOpen(false);
    setNewProgram({ title: '', type: 'Workshop', date: '', capacity: '' });
    addToast('Corporate learning program published!', 'success');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Corporate Learning Programs</h2>
            <p className="text-xs text-zinc-500 mt-1">Publish training bootcamps, technical workshops, or custom mentorship courses.</p>
          </div>
          <Button onClick={() => setModalOpen(true)} className="gap-1 px-4 py-2 text-xs font-semibold">
            <Plus className="w-4 h-4" /> Publish Program
          </Button>
        </div>

        {/* Programs cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((prog) => (
            <Card key={prog.id} className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <Badge variant="brand">{prog.type}</Badge>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase">{prog.sponsor}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-200 leading-tight">{prog.title}</h3>
              </div>

              <div className="border-t border-zinc-800/60 mt-4 pt-3 flex justify-between items-center text-[11px] text-zinc-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> {prog.date}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-zinc-500" /> Enrolled: {prog.enrolled} / {prog.capacity}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Program publish modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-[slideIn_0.2s_ease-out_forwards]">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Publish Corporate Program</h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateProgram} className="space-y-4">
              <Input 
                label="Program Title" 
                value={newProgram.title} 
                onChange={(e) => setNewProgram({...newProgram, title: e.target.value})} 
                placeholder="e.g. AWS Cloud Practitioner Boot camp" 
                required 
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Classification</label>
                <select
                  value={newProgram.type}
                  onChange={(e) => setNewProgram({...newProgram, type: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-background border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand/40"
                >
                  <option value="Workshop">Workshop / Lecture</option>
                  <option value="Mentorship">Mentorship Program</option>
                  <option value="Guest Lecture">Guest Lecture</option>
                  <option value="Training">Industrial Training</option>
                </select>
              </div>
              <Input 
                label="Date of Commencement" 
                type="date" 
                value={newProgram.date} 
                onChange={(e) => setNewProgram({...newProgram, date: e.target.value})} 
                required 
              />
              <Input 
                label="Capacity Slot count" 
                type="number" 
                value={newProgram.capacity} 
                onChange={(e) => setNewProgram({...newProgram, capacity: e.target.value})} 
                placeholder="e.g. 50" 
              />
              <div className="flex gap-4 pt-2">
                <Button variant="secondary" className="w-full" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="w-full justify-center">Publish Program</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
