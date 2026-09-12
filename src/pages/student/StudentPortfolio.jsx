import React, { useRef, useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { useToast } from '../../context/ToastContext';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { 
  User, Award, Plus, Upload, CheckCircle2, 
  MapPin, GraduationCap, Github, Globe, FileText, Eye, Pencil, X
} from 'lucide-react';

const getExternalUrl = (value) => {
  if (!value) return null;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
};

export const StudentPortfolio = () => {
  const { addToast } = useToast();
  const resumeInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certs, setCerts] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal dialog states
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', github: '', demo: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [portfolioPreviewOpen, setPortfolioPreviewOpen] = useState(false);
  
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '' });

  const fetchData = async () => {
    try {
      const data = await studentService.getProfile();
      setProfile(data);
      setProjects(data.projects);
      setCerts(data.certifications);
      if (data.resume?.dataUrl) {
        setResume({ name: data.resume.name, url: data.resume.dataUrl });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNewProjectModal = () => {
    setEditingProjectId(null);
    setNewProject({ title: '', description: '', github: '', demo: '' });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setEditingProjectId(project.id);
    setNewProject({
      title: project.title || '',
      description: project.description || '',
      github: project.github || '',
      demo: project.demo || ''
    });
    setProjectModalOpen(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      addToast('Please fill out all required fields', 'error');
      return;
    }

    const project = {
      id: editingProjectId || `proj-${Math.random().toString(36).substr(2, 9)}`,
      ...newProject,
      status: editingProjectId
        ? projects.find((item) => item.id === editingProjectId)?.status || 'Completed'
        : 'Completed'
    };

    try {
      if (editingProjectId) {
        const updatedProjects = projects.map((item) => item.id === editingProjectId ? project : item);
        await studentService.updateProfile({ projects: updatedProjects });
        setProjects(updatedProjects);
        addToast('Project updated successfully!', 'success');
      } else {
        const savedProject = await studentService.addProject(project);
        setProjects(prev => [...prev, savedProject]);
        addToast('Project added to portfolio!', 'success');
      }
      setProjectModalOpen(false);
      setEditingProjectId(null);
      setNewProject({ title: '', description: '', github: '', demo: '' });
    } catch (err) {
      console.error(err);
      addToast('Unable to save project. Please try again.', 'error');
    }
  };

  const handleAddCert = (e) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) {
      addToast('Please fill out all required fields', 'error');
      return;
    }

    const created = {
      id: `cert-${Math.random().toString(36).substr(2, 9)}`,
      ...newCert,
      verified: true
    };

    setCerts(prev => [...prev, created]);
    setCertModalOpen(false);
    setNewCert({ title: '', issuer: '', date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) });
    addToast('Certification added and verified!', 'success');
  };

  const handleResumeUpload = () => {
    resumeInputRef.current?.click();
  };

  const handleResumeFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';

    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      addToast('Please select a PDF or Word document.', 'error');
      return;
    }

    try {
      const savedResume = await studentService.saveResume(file);
      setResume({ name: savedResume.name, url: savedResume.dataUrl });
      addToast(`Resume uploaded: ${file.name}`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Unable to save resume. Please try again.', 'error');
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
      <div className="space-y-8">
        {/* Header Profile Summary */}
        <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand/5 rounded-full blur-2xl pointer-events-none" />
          
          <Avatar name={profile.name} sizeClass="w-24 h-24 text-2xl rounded-2xl" />

          <div className="flex-grow text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{profile.name}</h2>
              <Badge variant="brand" className="w-fit mx-auto md:mx-0">Verified Student</Badge>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
              Enrolled in {profile.department} &bull; {profile.college}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> GPA: {profile.gpa}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Graduating {profile.graduationYear}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleResumeFileChange}
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={handleResumeUpload} className="gap-1.5 py-2">
              <Upload className="w-4 h-4" /> {resume ? 'Re-upload Resume' : 'Upload Resume'}
            </Button>
            {resume && (
              <a href={resume.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-all duration-200 hover:bg-zinc-800/50 hover:text-white">
                <Eye className="w-4 h-4" /> View Resume
              </a>
            )}
            <Button variant="outline" size="sm" onClick={() => setPortfolioPreviewOpen(true)} className="py-2">
              View Portfolio
            </Button>
          </div>
        </div>

        {/* Portfolio Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Projects and Experience */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-brand" /> Projects & Research Work
              </h3>
              <Button size="sm" onClick={openNewProjectModal} className="gap-1 px-3 py-1">
                <Plus className="w-4 h-4" /> Add Project
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <Card key={proj.id} className="space-y-4 p-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white leading-tight">{proj.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="brand" className="text-[10px]">{proj.status}</Badge>
                          <button type="button" onClick={() => openEditProjectModal(proj)} className="text-zinc-500 hover:text-white" title="Edit project">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">{proj.description}</p>
                  </div>
                  <div className="flex gap-4 border-t border-zinc-800/60 mt-4 pt-3 text-[10px] text-zinc-500 font-semibold">
                    {proj.github && (
                      <a href={getExternalUrl(proj.github)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white cursor-pointer">
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                    {proj.demo && (
                      <a href={getExternalUrl(proj.demo)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white cursor-pointer">
                        <Globe className="w-3.5 h-3.5" /> Demo
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications and credentials */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-brand" /> Certifications
              </h3>
              <button onClick={() => setCertModalOpen(true)} className="text-xs font-semibold text-brand hover:underline">
                Add Cert
              </button>
            </div>

            <div className="space-y-3">
              {certs.map((cert) => (
                <Card key={cert.id} className="p-4 flex items-start gap-3 bg-[#121214]/60 border-zinc-800">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-200 truncate">{cert.title}</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 truncate">{cert.issuer} &bull; {cert.date}</p>
                  </div>
                  {cert.verified && (
                    <CheckCircle2 className="w-4.5 h-4.5 text-accent-green flex-shrink-0" title="Institution Verified" />
                  )}
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>

      {portfolioPreviewOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-[#121214] p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">Student Portfolio</p>
                <h3 className="mt-1 text-xl font-bold text-white">{profile.name}</h3>
              </div>
              <button type="button" onClick={() => setPortfolioPreviewOpen(false)} className="text-zinc-500 hover:text-white" title="Close portfolio preview">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.map((proj) => (
                <Card key={proj.id} className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                    <Badge variant="brand" className="text-[10px]">{proj.status}</Badge>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-400">{proj.description}</p>
                  <div className="flex gap-4 border-t border-zinc-800/60 pt-3 text-[10px] font-semibold text-zinc-500">
                    {proj.github && <a href={getExternalUrl(proj.github)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white"><Github className="w-3.5 h-3.5" /> Code</a>}
                    {proj.demo && <a href={getExternalUrl(proj.demo)} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white"><Globe className="w-3.5 h-3.5" /> Demo</a>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-[slideIn_0.2s_ease-out_forwards]">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setProjectModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <Input 
                label="Project Title" 
                value={newProject.title} 
                onChange={(e) => setNewProject({...newProject, title: e.target.value})} 
                placeholder="e.g. Algovis" 
                required 
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase">Description</label>
                <textarea 
                  value={newProject.description} 
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})} 
                  placeholder="Overview of scope and tech stack..." 
                  className="w-full px-3.5 py-2.5 bg-background border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/40 min-h-[80px]"
                  required
                />
              </div>
              <Input 
                label="Github Repository" 
                value={newProject.github} 
                onChange={(e) => setNewProject({...newProject, github: e.target.value})} 
                placeholder="github.com/username/project" 
              />
              <Input 
                label="Live Demo Link" 
                value={newProject.demo} 
                onChange={(e) => setNewProject({...newProject, demo: e.target.value})} 
                placeholder="project.vercel.app" 
              />
              <div className="flex gap-4 pt-2">
                <Button variant="secondary" className="w-full" onClick={() => setProjectModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="w-full justify-center">{editingProjectId ? 'Save Changes' : 'Save Project'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Certification Modal */}
      {certModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 animate-[slideIn_0.2s_ease-out_forwards]">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Add Certification</h3>
              <button onClick={() => setCertModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCert} className="space-y-4">
              <Input 
                label="Certification Name" 
                value={newCert.title} 
                onChange={(e) => setNewCert({...newCert, title: e.target.value})} 
                placeholder="e.g. AWS SysOps" 
                required 
              />
              <Input 
                label="Issuer Organization" 
                value={newCert.issuer} 
                onChange={(e) => setNewCert({...newCert, issuer: e.target.value})} 
                placeholder="Meta, Google, etc." 
                required 
              />
              <div className="flex gap-4 pt-2">
                <Button variant="secondary" className="w-full" onClick={() => setCertModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="w-full justify-center">Add Certification</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
