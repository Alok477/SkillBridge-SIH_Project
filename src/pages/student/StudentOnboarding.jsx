import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { GraduationCap, ArrowRight, UserCheck, BookOpen, Trash2, Plus } from 'lucide-react';

export const StudentOnboarding = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    college: '',
    department: '',
    gpa: '',
    graduationYear: 2030,
    desiredRole: 'Frontend Engineer',
    desiredCompany: 'Microsoft',
    skills: [] // Starts empty, user dynamically appends skills
  });

  useEffect(() => {
    if (user?.name && !formData.name) {
      setFormData(prev => ({ ...prev, name: user.name }));
    }
  }, [user]);

  // Local state for dynamic skill adder form
  const [skillName, setSkillName] = useState('React');
  const [skillLevel, setSkillLevel] = useState(60);

  const availableLanguages = [
  // Frontend
  'HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js',
  'Angular', 'Tailwind CSS', 'Bootstrap', 'Redux', 'React Native',

  // Backend
  'Node.js', 'Express.js', 'FastAPI', 'Django', 'Flask', 'Spring Boot',
  'ASP.NET', 'REST APIs', 'GraphQL', 'WebSockets',

  // Programming Languages
  'Python', 'Java', 'C++', 'C', 'C#', 'Go', 'Rust', 'PHP', 'Ruby',
  'Kotlin', 'Swift', 'Dart',

  // Databases
  'SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis',
  'Firebase', 'Supabase', 'NoSQL Databases',

  // DevOps & Cloud
  'Git', 'GitHub', 'Docker', 'Kubernetes', 'Linux', 'CI/CD',
  'AWS', 'Microsoft Azure', 'Google Cloud', 'Vercel', 'Netlify',

  // Testing
  'Jest', 'Cypress', 'Playwright', 'PyTest', 'Unit Testing',
  'Integration Testing',

  // AI / ML / Data
  'Machine Learning', 'Deep Learning', 'Artificial Intelligence',
  'Data Science', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-learn',
  'TensorFlow', 'PyTorch', 'OpenCV', 'Natural Language Processing',
  'Computer Vision', 'Generative AI', 'LLMs', 'Prompt Engineering',

  // Data Structures & CS
  'Data Structures', 'Algorithms', 'Object-Oriented Programming',
  'Competitive Programming', 'System Design', 'Operating Systems',
  'Computer Networks', 'Database Management',

  // Mobile
  'Flutter', 'Android Development', 'iOS Development',

  // Security
  'Cybersecurity', 'Ethical Hacking', 'Network Security',
  'Web Security', 'Cryptography',

  // Other Development
  'API Development', 'Microservices', 'Authentication',
  'OAuth', 'JWT', 'Cloud Computing', 'Serverless',

  // UI / Design
  'UI/UX Design', 'Figma', 'Responsive Design', 'Graphic Design',

  // Business / Professional
  'Communication', 'Leadership', 'Teamwork', 'Problem Solving',
  'Project Management', 'Entrepreneurship', 'Public Speaking',
  'Research', 'Technical Writing'
];

  const handleAddSkill = () => {
    // Check if skill already added
    if (formData.skills.some(s => s.name === skillName)) {
      addToast(`${skillName} is already added. Remove or edit instead.`, 'warning');
      return;
    }

    const newSkill = {
      name: skillName,
      current: parseInt(skillLevel),
      target: 90,
      required: 75,
      category: 'Technical'
    };

    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    addToast(`Added skill: ${skillName}`, 'success');
  };

  const handleRemoveSkill = (nameToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== nameToRemove)
    }));
  };

  const handleCompleteSurvey = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.college || !formData.department) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    if (formData.skills.length === 0) {
      addToast('Please configure at least one core skill competency.', 'error');
      return;
    }

    try {
      const updatedProfile = {
        name: formData.name,
        college: formData.college,
        department: formData.department,
        gpa: formData.gpa || '7.50',
        graduationYear: parseInt(formData.graduationYear),
        skills: {
          technical: formData.skills,
          soft: [
            { name: 'Collaboration', current: 75, target: 90, required: 80 },
            { name: 'Analytical Thinking', current: 80, target: 90, required: 85 }
          ]
        },
        careerPath: {
          role: formData.desiredRole,
          readiness: 40,
          requiredSkillsCount: formData.skills.length,
          acquiredSkillsCount: formData.skills.filter(s => s.current >= s.required).length
        },
        onboarded: true,
        assessmentCompleted: false
      };

      await studentService.updateProfile(updatedProfile);

      await refreshUser();

      addToast('Profile survey completed!', 'success');
      setStep(4);
    } catch (err) {
      addToast('Failed to save survey data.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl space-y-6 relative z-10">
        
        {/* Stepper Header */}
        {step < 4 && (
          <div className="flex justify-between items-center bg-[#121214] border border-zinc-800 rounded-xl px-5 py-3">
            <span className="text-xs font-bold text-zinc-400 uppercase">Onboarding Profile Survey</span>
            <span className="text-xs font-semibold text-zinc-500">Step {step} of 3</span>
          </div>
        )}

        {/* Survey Form */}
        <Card className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Personal & Education */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Academic Profile</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Let us know where you are pursuing your studies.</p>
              </div>
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Alex Mercer"
                required
              />
              <Input
                label="University / College"
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
                placeholder="e.g. University of Technology"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Degree / Major"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  placeholder="e.g. Computer Science"
                  required
                />
                <Input
                  label="GPA / Mark Ratio"
                  value={formData.gpa}
                  onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                  placeholder="e.g. 8.00 / 10.00"
                />
              </div>
              <Button onClick={() => setStep(2)} className="w-full justify-center mt-2 gap-1.5" disabled={!formData.name || !formData.college || !formData.department}>
                Configure Skills <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Step 2: Skills Selection & Proficiency */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Add Core Competencies</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Choose a programming language/tool and specify your fluency.</p>
              </div>

              {/* Add Skill Widget */}
              <div className="p-4 bg-background border border-zinc-800 rounded-xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Programming Language / Tool</label>
                    <select
                      value={skillName}
                      onChange={(e) => setSkillName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand/40"
                    >
                      {availableLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wide">
                      <span>Proficiency</span>
                      <span className="text-brand font-semibold">{skillLevel}%</span>
                    </div>
                    <div className="flex items-center gap-3 h-10">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="10"
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        className="flex-grow accent-brand bg-zinc-800 h-1 rounded"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleAddSkill} variant="outline" className="w-full justify-center gap-1.5 text-xs py-2">
                  <Plus className="w-4 h-4" /> Add Skill Target
                </Button>
              </div>

              {/* Added Skills List */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Selected Skill Benchmarks</h4>
                {formData.skills.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {formData.skills.map((skill) => (
                      <div key={skill.name} className="flex justify-between items-center bg-zinc-900/40 p-3 border border-zinc-800/80 rounded-lg">
                        <div>
                          <span className="text-xs font-bold text-white block">{skill.name}</span>
                          <span className="text-[10px] text-zinc-500 block mt-0.5">Fluency competency: {skill.current}%</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="brand">Level: {skill.current}%</Badge>
                          <button
                            onClick={() => handleRemoveSkill(skill.name)}
                            className="text-zinc-500 hover:text-accent-red transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500 block py-4 text-center border border-dashed border-zinc-800 rounded-lg">
                    No skills configured. Add at least one competency to continue.
                  </span>
                )}
              </div>

              <div className="flex gap-4 pt-2">
                <Button variant="secondary" className="w-full justify-center" onClick={() => setStep(1)}>Back</Button>
                <Button 
                  className="w-full justify-center" 
                  disabled={formData.skills.length === 0} 
                  onClick={() => setStep(3)}
                >
                  Target Career Goals
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Desired Roles & Target Companies */}
          {step === 3 && (
            <form onSubmit={handleCompleteSurvey} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Target Career Milestones</h3>
                <p className="text-xs text-zinc-500 mt-0.5">Define your dream employment sectors.</p>
              </div>

              <Input
                label="Desired Role / Job Title"
                value={formData.desiredRole}
                onChange={(e) => setFormData({...formData, desiredRole: e.target.value})}
                placeholder="e.g. Frontend Engineer"
                required
              />
              <Input
                label="Desired Corporation / Company"
                value={formData.desiredCompany}
                onChange={(e) => setFormData({...formData, desiredCompany: e.target.value})}
                placeholder="e.g. Google"
              />

              <div className="flex gap-4 pt-2">
                <Button variant="secondary" className="w-full justify-center" onClick={() => setStep(2)}>Back</Button>
                <Button type="submit" className="w-full justify-center">Save & Complete</Button>
              </div>
            </form>
          )}

          {/* Success / Start Assessment Option step 4 */}
          {step === 4 && (
            <div className="text-center space-y-6 py-4">
              <div className="w-14 h-14 rounded-full bg-accent-green/10 border border-accent-green/20 flex items-center justify-center mx-auto text-accent-green">
                <UserCheck className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Profile Configured!</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Your academic credentials have been saved. To unlock the full recommendation match engine, you must complete the Initial Skill Assessment.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3 max-w-xs mx-auto">
                <Button onClick={() => navigate('/student/assessment')} className="w-full justify-center py-2.5 uppercase tracking-wider text-xs font-semibold gap-1.5">
                  <BookOpen className="w-4 h-4" /> Start Initial Assessment
                </Button>
                <Button variant="ghost" onClick={() => navigate('/student/dashboard')} className="w-full justify-center text-xs font-semibold">
                  Skip to Dashboard (Locked)
                </Button>
              </div>
            </div>
          )}

        </Card>
      </div>
    </div>
  );
};
