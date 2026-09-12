import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { industryService } from '../../services/industryService';
import { useToast } from '../../context/ToastContext';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const IndustryOpportunityCreate = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Internship',
    location: '',
    compensation: '',
    skills: '',
    description: '',
    requirements: '',
    responsibilities: '',
    eligibility: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await industryService.createOpportunity(formData);
      addToast('Opportunity published and indexed successfully!', 'success');
      navigate('/industry/dashboard');
    } catch (err) {
      addToast(err.message || 'Publishing failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(4, prev + 1));
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Stepper Header */}
        <div className="flex justify-between items-center bg-[#121214] border border-zinc-800 rounded-xl px-6 py-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Publish Opportunity Pipeline</h2>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                  step === num 
                    ? 'border-brand bg-brand text-white' 
                    : step > num 
                    ? 'border-accent-green bg-accent-green/10 text-accent-green' 
                    : 'border-zinc-800 bg-background text-zinc-600'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Form Body Card */}
        <Card className="p-6 sm:p-8">
          
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase border-b border-zinc-800 pb-2">Step 01: Core Information</h3>
              <Input
                label="Opportunity Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Senior Cloud Architect Intern"
                required
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Opportunity Classification</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-background border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand/40"
                >
                  <option value="Internship">Internship</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Apprenticeship">Apprenticeship</option>
                  <option value="Live Project">Live Project</option>
                </select>
              </div>
              <Input
                label="Location & Logistics"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Austin, TX (Hybrid) or Remote"
                required
              />
            </div>
          )}

          {/* Step 2: Compensation & Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase border-b border-zinc-800 pb-2">Step 02: Description & Stipend</h3>
              <Input
                label="Stipend / Salary Range"
                value={formData.compensation}
                onChange={(e) => setFormData({...formData, compensation: e.target.value})}
                placeholder="e.g. $45 - $55 / hour or Competitive Salary"
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Overview Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Summarize team role scope and day-to-day expectations..."
                  className="w-full px-3.5 py-2.5 bg-background border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 min-h-[100px]"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Required Skills & Requirements */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase border-b border-zinc-800 pb-2">Step 03: Required Skill Profile & Requirements</h3>
              <Input
                label="Skills Index (Comma separated)"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                placeholder="e.g. React, JavaScript, Git, REST APIs"
                required
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Core Requirements (One per line)</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  placeholder="e.g. Proficient in React & Node.js&#10;Understanding of REST APIs"
                  className="w-full px-3.5 py-2.5 bg-background border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 min-h-[70px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Responsibilities (One per line)</label>
                <textarea
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
                  placeholder="e.g. Develop frontend web features&#10;Collaborate with cross-functional teams"
                  className="w-full px-3.5 py-2.5 bg-background border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 min-h-[70px]"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review and Publish */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase border-b border-zinc-800 pb-2">Step 04: Review Opportunity Specifications</h3>
              
              <div className="space-y-3.5 text-xs text-zinc-300">
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500 font-semibold uppercase">Position Title</span>
                  <span className="text-white font-bold">{formData.title || 'Not specified'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500 font-semibold uppercase">Classification</span>
                  <Badge variant="brand">{formData.type}</Badge>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500 font-semibold uppercase">Logistics Location</span>
                  <span className="text-white font-semibold">{formData.location || 'Not specified'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500 font-semibold uppercase">Stipend Rate</span>
                  <span className="text-white font-semibold">{formData.compensation || 'Not specified'}</span>
                </div>
                <div className="flex flex-col gap-1 py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-500 font-semibold uppercase">Target Competency Tags</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {formData.skills ? formData.skills.split(',').map(s => (
                      <Badge key={s.trim()} className="text-[10px]">{s.trim()}</Badge>
                    )) : <span className="text-zinc-600">None specified</span>}
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 p-3.5 bg-brand/5 border border-brand/20 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-brand flex-shrink-0" />
                <p className="text-[11px] text-zinc-400 leading-normal">
                  Publishing will immediately index this opportunity in the student marketplace matching engines.
                </p>
              </div>
            </div>
          )}

          {/* Stepper controls */}
          <div className="flex justify-between items-center gap-4 mt-8 pt-5 border-t border-zinc-800/60">
            <Button
              onClick={prevStep}
              disabled={step === 1}
              variant="outline"
              className="gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            {step < 4 ? (
              <Button
                onClick={nextStep}
                disabled={step === 1 && !formData.title}
                className="gap-1"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                disabled={submitting}
                className="px-6 font-semibold"
              >
                {submitting ? 'Publishing...' : 'Confirm & Publish'}
              </Button>
            )}
          </div>

        </Card>
      </div>
    </DashboardLayout>
  );
};
