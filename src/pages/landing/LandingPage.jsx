import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LandingLayout } from '../../layouts/LandingLayout';
import { Button } from '../../components/ui/Button';
import {
  ArrowRight, BarChart3, BriefcaseBusiness, Building2, Check, GraduationCap,
  Handshake, Lightbulb, Network, Radar, Search, Sparkles, Target, Workflow
} from 'lucide-react';

const people = [
  { icon: GraduationCap, title: 'Students', text: 'Build profiles, assess skills, find opportunities.', color: 'text-sky-300' },
  { icon: BriefcaseBusiness, title: 'Industry', text: 'Define requirements, discover talent, recruit.', color: 'text-amber-300' },
  { icon: Building2, title: 'Institutions', text: 'Monitor readiness and placement trends.', color: 'text-emerald-300' },
  { icon: GraduationCap, title: 'Academicians', text: 'Understand demand and emerging gaps.', color: 'text-violet-300' }
];

const pipeline = [
  ['01', 'Build Profile', 'Add education, skills, interests and career goals.'],
  ['02', 'Assess', 'Evaluate capability through assessments, projects and profile data.'],
  ['03', 'Skill Gap', 'Compare current skills with target role requirements.'],
  ['04', 'Industry Needs', 'Organizations define the skills required for roles.'],
  ['05', 'Smart Matching', 'Calculate compatibility between skills and opportunities.'],
  ['06', 'Connect', 'Discover opportunities and track applications.']
];

const features = [
  ['Skill Mapping', 'Map learner capabilities against industry requirements.', Network],
  ['Skill Assessment', 'Measure current competency through structured assessments.', Target],
  ['Skill Gap Analysis', 'Identify what a candidate needs for a target role.', Search],
  ['Smart Matching', 'Connect candidates with relevant internships and jobs.', Sparkles],
  ['Opportunity Discovery', 'Find opportunities aligned with skills and interests.', BriefcaseBusiness],
  ['Application Tracking', 'Track applications and recruitment progress.', Workflow],
  ['Industry Collaboration', 'Let organizations communicate changing requirements.', Handshake],
  ['Institutional Analytics', 'Give institutions insight into readiness and demand.', BarChart3]
];

const reasons = [
  ['Skill-first', 'Opportunities connect to actual skill requirements.'],
  ['Gap-aware', 'Students can see what skills they are missing.'],
  ['Academia + Industry', 'Both sides shape the same talent ecosystem.'],
  ['Role-specific', 'Matching is based on requirements for specific roles.'],
  ['Collaboration-driven', 'Industry can communicate changing skill needs.'],
  ['Data-informed', 'Institutions understand readiness and demand.']
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Heading = ({ eyebrow, title, text, center = false }) => (
  <motion.div variants={fadeUp} className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
    {text && <p className="mt-4 text-base leading-7 text-zinc-400">{text}</p>}
  </motion.div>
);

const RadarNode = ({ icon: Icon, label, className, color }) => (
  <div className={`absolute z-10 flex flex-col items-center gap-1 ${className}`}>
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#10151f] ${color}`}>
      <Icon className="h-5 w-5" />
    </div>
    <span className="whitespace-nowrap text-[10px] font-semibold text-zinc-300">{label}</span>
  </div>
);

const RadarVisual = () => (
  <div className="relative mx-auto aspect-square w-full max-w-[540px]">
    <div className="absolute inset-[8%] rounded-full border border-brand/20 bg-brand/[0.035] shadow-[0_0_100px_rgba(59,130,246,0.16)]" />
    <div className="absolute inset-[20%] rounded-full border border-brand/25" />
    <div className="absolute inset-[32%] rounded-full border border-brand/30" />
    <div className="absolute inset-[44%] rounded-full border border-brand/40 bg-brand/10" />
    <div className="absolute left-1/2 top-[8%] h-[84%] w-px bg-brand/20" />
    <div className="absolute left-[8%] top-1/2 h-px w-[84%] bg-brand/20" />
    <div className="absolute inset-[8%] overflow-hidden rounded-full">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(37,99,235,0.32)_34deg,transparent_68deg)]" />
    </div>
    <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2">
      <motion.div animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.4, repeat: Infinity }} className="h-full w-full rounded-full bg-brand shadow-[0_0_35px_rgba(59,130,246,0.9)]" />
    </div>
    <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#101a2b] text-brand"><Radar className="h-7 w-7" /></div>
    <RadarNode icon={GraduationCap} label="Student" className="left-[3%] top-[43%]" color="text-sky-300" />
    <RadarNode icon={Building2} label="Industry" className="right-0 top-[43%]" color="text-amber-300" />
    <RadarNode icon={Building2} label="Institution" className="left-1/2 top-[-1%] -translate-x-1/2" color="text-emerald-300" />
    <RadarNode icon={GraduationCap} label="Academia" className="bottom-[-1%] left-1/2 -translate-x-1/2" color="text-violet-300" />
    <div className="absolute right-[5%] top-[13%] hidden w-44 rounded-xl border border-emerald-400/20 bg-[#10151f]/95 p-3 sm:block">
      <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-300">Skill match detected</p>
      <p className="mt-1 text-sm font-bold text-white">Frontend Developer</p>
      <p className="mt-1 text-2xl font-black text-emerald-300">92%</p>
      <div className="mt-2 space-y-1.5">
        {['React 94%', 'JavaScript 91%', 'SQL 72%', 'Testing 51%'].map((item) => <p key={item} className="text-[9px] text-zinc-400">{item}</p>)}
      </div>
      <p className="mt-2 border-t border-white/10 pt-2 text-[9px] text-amber-300">Skill gap: Testing / CI-CD</p>
    </div>
  </div>
);

const EcosystemNode = ({ icon: Icon, title, text }) => (
  <div className="flex flex-col items-center text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700 bg-[#10151f] text-brand"><Icon className="h-6 w-6" /></div>
    <p className="mt-3 text-sm font-bold text-white">{title}</p>
    <p className="mt-1 text-xs text-zinc-500">{text}</p>
  </div>
);

const MatchCard = ({ title, items }) => (
  <div className="border border-zinc-800 bg-[#101114] p-5">
    <p className="text-[10px] font-bold uppercase tracking-widest text-brand">{title}</p>
    <div className="mt-5 space-y-3">{items.map((item) => <div key={item} className="flex items-center gap-2 text-sm text-zinc-300"><Check className="h-3.5 w-3.5 text-emerald-400" />{item}</div>)}</div>
  </div>
);

const RoleMatch = ({ role, score }) => (
  <div className="border border-zinc-800 bg-[#101114] p-4"><div className="flex items-center justify-between"><p className="text-sm font-bold text-white">{role}</p><span className="text-xl font-black text-emerald-300">{score}</span></div><p className="mt-1 text-[10px] text-zinc-500">Recommended role</p></div>
);

const InteractivePreview = () => {
  const [activeView, setActiveView] = useState('Dashboard');
  const [selectedRole, setSelectedRole] = useState('Frontend Engineer');
  const views = ['Dashboard', 'My Skills', 'Assessments', 'Opportunities', 'Applications'];
  const roles = [
    { title: 'Frontend Engineer', company: 'Novex Technologies', score: '92%', gap: 'Testing & CI/CD' },
    { title: 'Full Stack Developer', company: 'Microsoft', score: '86%', gap: 'Cloud Architecture' },
    { title: 'Product Engineer', company: 'Vertex Labs', score: '81%', gap: 'System Design' }
  ];
  const currentRole = roles.find((role) => role.title === selectedRole) || roles[0];

  return (
    <div className="mx-auto mt-12 max-w-5xl overflow-hidden border border-zinc-700 bg-[#101114] shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <span className="text-xs font-bold text-white">SkillBridge Dashboard</span>
        <span className="text-xs text-emerald-300">● Interactive preview</span>
      </div>
      <div className="grid min-h-[360px] md:grid-cols-[170px_1fr]">
        <aside className="border-r border-zinc-800 p-3">
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-brand">Workspace</p>
          {views.map((view) => (
            <button key={view} type="button" onClick={() => setActiveView(view)} className={`mb-1 w-full rounded px-3 py-2 text-left text-xs transition-colors ${activeView === view ? 'bg-brand/15 font-semibold text-white' : 'text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-200'}`}>
              {view}
            </button>
          ))}
        </aside>
        <div className="p-5 sm:p-8">
          {activeView === 'Dashboard' && (
            <div>
              <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs text-zinc-500">Good morning, Ajay</p><h3 className="mt-1 text-xl font-black text-white">Your career readiness</h3></div><span className="text-4xl font-black text-brand">78%</span></div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="border border-zinc-800 bg-zinc-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Top skill match</p><div className="mt-4 flex items-center justify-between"><span className="text-sm font-bold text-white">{currentRole.title}</span><span className="text-lg font-black text-emerald-300">{currentRole.score}</span></div><div className="mt-3 h-1.5 bg-zinc-800"><div className="h-full bg-emerald-400" style={{ width: currentRole.score }} /></div></div><div className="border border-zinc-800 bg-zinc-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Skill gap</p><p className="mt-4 text-sm font-bold text-white">{currentRole.gap}</p><p className="mt-2 text-xs text-zinc-500">Next recommended learning focus</p></div></div>
              <p className="mt-7 text-xs font-semibold text-zinc-400">Click an opportunity below to update this readiness view.</p><div className="mt-3 flex flex-wrap gap-2">{roles.map((role) => <button key={role.title} type="button" onClick={() => setSelectedRole(role.title)} className={`rounded-lg border px-3 py-2 text-xs transition-colors ${selectedRole === role.title ? 'border-brand bg-brand/10 text-white' : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-200'}`}>{role.title}</button>)}</div>
            </div>
          )}
          {activeView === 'My Skills' && <PreviewList title="My Skills" items={['React · 94%', 'JavaScript · 91%', 'HTML/CSS · 89%', 'SQL · 72%', 'Testing · 51%']} />}
          {activeView === 'Assessments' && <PreviewList title="Assessments" items={['Frontend fundamentals · Completed', 'Testing strategy · Recommended', 'System design basics · Available']} />}
          {activeView === 'Opportunities' && <PreviewList title="Recommended Opportunities" items={roles.map((role) => `${role.title} · ${role.score} match`)} />}
          {activeView === 'Applications' && <PreviewList title="Application Tracking" items={['Frontend Engineering Intern · Under Review', 'React Developer · Shortlisted', 'Product Engineer · Applied']} />}
        </div>
      </div>
    </div>
  );
};

const PreviewList = ({ title, items }) => (
  <div><p className="text-xs text-zinc-500">SkillBridge workspace</p><h3 className="mt-1 text-xl font-black text-white">{title}</h3><div className="mt-7 space-y-3">{items.map((item) => <button key={item} type="button" className="flex w-full items-center justify-between border border-zinc-800 bg-zinc-900/40 p-4 text-left text-sm text-zinc-300 transition-colors hover:border-brand/50 hover:text-white"><span>{item}</span><ArrowRight className="h-4 w-4 text-brand" /></button>)}</div></div>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const reveal = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.12 }, variants: { visible: { transition: { staggerChildren: 0.08 } } } };

  return (
    <LandingLayout>
      <main className="landing-content overflow-hidden">
        <section className="landing-interactive-preview border-y border-zinc-900 bg-[#0b0f16] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading center eyebrow="Product preview" title="A Connected Experience for Every User" text="Click through the workspace, choose a role, and see how skill intelligence changes the recommendation." />
            <InteractivePreview />
          </div>
        </section>
        <section className="relative flex min-h-[calc(100vh-4rem)] items-center border-b border-zinc-900 bg-[#090d14] py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#33415512_1px,transparent_1px),linear-gradient(to_bottom,#33415512_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="lg:col-span-6">
              <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand"><Sparkles className="h-3.5 w-3.5" /> SIH26044 · Academia–Industry Skill Mapping</motion.div>
              <motion.h1 variants={fadeUp} className="max-w-xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl">Turn Skills into <span className="text-brand">Real Opportunities.</span></motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">SkillBridge is an academia–industry collaboration platform that maps skills, identifies skill gaps, connects learners with relevant opportunities, and helps organizations discover the right talent.</motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3"><Button size="lg" onClick={() => navigate('/signup')}>Join SkillBridge <ArrowRight className="ml-2 h-4 w-4" /></Button><Button size="lg" variant="outline" onClick={() => navigate('/about')}>Explore Platform</Button></motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="lg:col-span-6"><RadarVisual /></motion.div>
          </div>
        </section>

        <motion.section {...reveal} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Heading eyebrow="The problem" title="The Gap Between Learning and Employment" text="Students, educators, institutions and employers are working toward the same outcome, but they rarely share the same view of skills." />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{people.map(({ icon: Icon, title, text, color }) => <motion.div variants={fadeUp} key={title} className="border border-zinc-800 bg-[#101114] p-5"><div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${color}`}><Icon className="h-5 w-5" /></div><h3 className="font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></motion.div>)}</div>
          <motion.div variants={fadeUp} className="mt-8 grid overflow-hidden border border-zinc-800 bg-[#0d1015] md:grid-cols-2"><div className="border-b border-zinc-800 p-6 md:border-b-0 md:border-r"><p className="text-xs font-bold uppercase tracking-widest text-sky-300">Education</p><div className="mt-5 space-y-3 text-sm text-zinc-300"><p>Students</p><p>Courses</p><p>Academia</p><p>Institutions</p></div></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-widest text-amber-300">Industry</p><div className="mt-5 space-y-3 text-sm text-zinc-300"><p>Jobs</p><p>Skills</p><p>Requirements</p><p>Internships</p></div></div><div className="col-span-full flex items-center justify-center border-t border-zinc-800 px-6 py-5 text-center"><span className="text-lg font-black text-white">SkillBridge connects the two sides.</span><ArrowRight className="mx-3 h-5 w-5 text-brand" /></div></motion.div>
        </motion.section>

        <motion.section {...reveal} className="border-y border-zinc-900 bg-[#0b0f16] py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Heading center eyebrow="The ecosystem" title="One Platform. Four Stakeholders." text="A shared intelligence layer turns disconnected signals into better decisions for everyone involved." /><motion.div variants={fadeUp} className="mx-auto mt-16 max-w-4xl"><div className="grid grid-cols-2 gap-12 md:grid-cols-4">{people.map(({ icon, title, text }) => <EcosystemNode key={title} icon={icon} title={title} text={text} />)}</div><div className="mx-auto mt-10 flex h-32 w-32 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-center"><div><Network className="mx-auto mb-2 h-7 w-7 text-brand" /><p className="text-sm font-black text-white">SkillBridge</p><p className="mt-1 text-[8px] uppercase tracking-widest text-brand">Shared intelligence</p></div></div></motion.div></div></motion.section>

        <motion.section {...reveal} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><Heading eyebrow="How it works" title="From Skills to Opportunities" text="A clear pipeline makes the platform's value visible from the first profile update to the final application." /><div className="mt-12 grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">{pipeline.map(([number, title, text]) => <motion.div variants={fadeUp} key={number} className="bg-[#101114] p-6"><p className="text-3xl font-black text-brand/50">{number}</p><h3 className="mt-5 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></motion.div>)}</div></motion.section>

        <section className="border-y border-zinc-900 bg-[#0b0f16] py-24"><div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"><Heading eyebrow="The matching engine" title="Skills Meet Opportunity" text="The engine translates a student's capability into role-specific recommendations, with the gap made visible instead of hidden." /><div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><MatchCard title="Student profile" items={['React', 'JavaScript', 'HTML/CSS', 'SQL', 'Git']} /><div className="flex justify-center"><div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand"><Sparkles className="h-7 w-7" /></div></div><div className="space-y-3"><RoleMatch role="Frontend Engineer" score="92%" /><RoleMatch role="Full Stack Developer" score="86%" /></div><div className="col-span-full flex items-center gap-2 border-t border-zinc-800 pt-5 text-sm text-zinc-400"><Lightbulb className="h-4 w-4 text-amber-300" /><span><strong className="text-white">Recommended because</strong> your skills match 92% of the role requirements.</span></div></div></div></section>

        <motion.section {...reveal} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><Heading center eyebrow="Platform capabilities" title="Everything Needed to Bridge the Skill Gap" /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map(([title, text, Icon]) => <motion.div variants={fadeUp} key={title} className="border border-zinc-800 bg-[#101114] p-5 hover:border-brand/40"><Icon className="h-5 w-5 text-brand" /><h3 className="mt-5 text-sm font-bold text-white">{title}</h3><p className="mt-2 text-xs leading-5 text-zinc-500">{text}</p></motion.div>)}</div></motion.section>

        <section className="border-y border-zinc-900 bg-[#0b0f16] py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Heading center eyebrow="Product preview" title="A Connected Experience for Every User" text="A single readiness view helps a student understand what to do next and helps organizations see why the match matters." /><div className="mx-auto mt-12 max-w-5xl overflow-hidden border border-zinc-700 bg-[#101114]"><div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4"><span className="text-xs font-bold text-white">SkillBridge Dashboard</span><span className="text-xs text-emerald-300">● Live readiness view</span></div><div className="grid min-h-[300px] md:grid-cols-[170px_1fr]"><aside className="hidden border-r border-zinc-800 p-4 md:block"><p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-brand">Workspace</p>{['Dashboard', 'My Skills', 'Assessments', 'Opportunities', 'Applications'].map((item, index) => <p key={item} className={`mb-2 rounded px-3 py-2 text-xs ${index === 0 ? 'bg-brand/10 font-semibold text-white' : 'text-zinc-500'}`}>{item}</p>)}</aside><div className="p-5 sm:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs text-zinc-500">Good morning, Ajay</p><h3 className="mt-1 text-xl font-black text-white">Your career readiness</h3></div><span className="text-4xl font-black text-brand">78%</span></div><div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="border border-zinc-800 bg-zinc-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Top skill match</p><div className="mt-4 flex items-center justify-between"><span className="text-sm font-bold text-white">Frontend Engineer</span><span className="text-lg font-black text-emerald-300">92%</span></div><div className="mt-3 h-1.5 bg-zinc-800"><div className="h-full w-[92%] bg-emerald-400" /></div></div><div className="border border-zinc-800 bg-zinc-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Skill gap</p><p className="mt-4 text-sm font-bold text-white">Testing &amp; CI/CD</p><p className="mt-2 text-xs text-zinc-500">Next recommended learning focus</p></div></div></div></div></div></div></section>

        <motion.section {...reveal} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><Heading eyebrow="Why SkillBridge" title="Not Just Another Job Portal" text="The difference is not another list of vacancies. It is the shared skill intelligence behind every connection." /><div className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([title, text]) => <motion.div variants={fadeUp} key={title} className="flex gap-4 border-t border-zinc-800 pt-5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand"><Check className="h-4 w-4" /></div><div><h3 className="text-sm font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{text}</p></div></motion.div>)}</div></motion.section>

        <section className="border-y border-zinc-900 bg-[#0b0f16] py-20"><div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Designed for the entire skill ecosystem</p><div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">{[['4', 'Stakeholder groups'], ['1', 'Unified platform'], ['360°', 'Skill-to-opportunity ecosystem'], ['∞', 'Possibilities for collaboration']].map(([value, label]) => <div key={label}><p className="text-3xl font-black text-white sm:text-4xl">{value}</p><p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">{label}</p></div>)}</div><p className="mt-12 text-lg font-bold text-white sm:text-2xl">Students <span className="px-2 text-brand">→</span> Skills <span className="px-2 text-brand">→</span> Opportunities <span className="px-2 text-brand">→</span> Careers</p></div></section>

        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><div className="border border-brand/20 bg-brand/[0.06] p-8 sm:p-12"><p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">Built for SIH26044</p><h2 className="mt-4 max-w-4xl text-3xl font-black text-white sm:text-4xl">Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placements</h2><p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">SkillBridge makes skill readiness measurable, surfaces the gap between education and employment, and creates a practical path from learning to opportunity.</p><Button className="mt-8" onClick={() => navigate('/signup')}>Build the Bridge <ArrowRight className="ml-2 h-4 w-4" /></Button></div></section>

        <section className="relative overflow-hidden bg-brand py-20"><div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8"><div><h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Build the Bridge Between Skills and Opportunity.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">Whether you're learning, teaching, building talent or hiring it — SkillBridge connects you to the ecosystem.</p></div><div className="flex flex-wrap gap-3"><Button className="bg-white text-brand hover:bg-blue-50" onClick={() => navigate('/signup')}>Join SkillBridge <ArrowRight className="ml-2 h-4 w-4" /></Button><Button variant="outline" className="border-white/40 text-white hover:bg-white/10" onClick={() => navigate('/about')}>Explore Platform</Button></div></div></section>
      </main>
    </LandingLayout>
  );
};
