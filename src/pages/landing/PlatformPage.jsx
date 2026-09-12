import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowDown, ArrowRight, BarChart3, BriefcaseBusiness, Check, Code2,
  Database, GraduationCap, Handshake, Network, SearchCheck, ShieldCheck,
  Sparkles, Target, Users, Workflow
} from 'lucide-react';
import { LandingLayout } from '../../layouts/LandingLayout';
import { Button } from '../../components/ui/Button';

const ease = [0.22, 1, 0.36, 1];
const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } };
const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const roles = [
  ['Students', 'Discover your potential', GraduationCap, 'Build profiles, understand gaps, find opportunities.'],
  ['Industry', 'Find the right talent', BriefcaseBusiness, 'Define requirements and connect with matched candidates.'],
  ['Institutions', 'Understand your talent pool', Users, 'See readiness, skills, and placement outcomes.'],
  ['Academicians', 'Connect education with industry', Handshake, 'Find collaboration, development, and research pathways.']
];

const features = [
  ['Skill Mapping', Target], ['Skill Assessment', SearchCheck], ['Skill Gap Analysis', BarChart3],
  ['Smart Opportunity Matching', Network], ['Application Tracking', Workflow], ['Institutional Analytics', BarChart3]
];

const stack = [
  ['Frontend', 'React, Tailwind CSS, Framer Motion, React Router', Code2],
  ['Backend', 'FastAPI, Python, JWT', ShieldCheck],
  ['Database', 'MySQL', Database]
];

const SectionTitle = ({ eyebrow, title, children }) => (
  <div className="max-w-2xl">
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
    <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{title}</h2>
    {children && <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-400">{children}</p>}
  </div>
);

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <main className="overflow-hidden">
        <section className="relative flex min-h-[620px] items-center border-b border-zinc-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 hidden h-px w-[min(70vw,34rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/40 to-transparent sm:block" />
          <div className="absolute left-1/2 top-1/2 hidden h-[min(70vw,34rem)] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-brand/30 to-transparent sm:block" />
          {['Student', 'Industry', 'Institution', 'Academia'].map((label, index) => (
            <motion.span key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + index * 0.12 }} className={`absolute hidden text-[10px] uppercase tracking-widest text-zinc-600 sm:block ${index === 0 ? 'left-[8%] top-1/2' : index === 1 ? 'right-[8%] top-1/2' : index === 2 ? 'left-1/2 top-[12%] -translate-x-1/2' : 'bottom-[12%] left-1/2 -translate-x-1/2'}`}><span className="mr-2 inline-block h-2 w-2 rounded-full bg-brand" />{label}</motion.span>
          ))}
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="relative z-10 mx-auto max-w-3xl px-5 text-center">
            <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand"><Sparkles className="h-3.5 w-3.5" /> Smart India Hackathon 2026</motion.div>
            <motion.h1 variants={reveal} className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">SkillBridge</motion.h1>
            <motion.p variants={reveal} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-xl">Connecting Academia with Industry through Skills, Opportunities and Collaboration.</motion.p>
            <motion.div variants={reveal} className="mx-auto mt-7 max-w-xl border-y border-brand/20 py-4"><p className="text-2xl font-extrabold tracking-[0.18em] text-brand">SIH26044</p><p className="mt-2 text-sm leading-relaxed text-zinc-500">Portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placements</p></motion.div>
            <motion.div variants={reveal} className="mt-7 flex flex-wrap justify-center gap-3"><Button size="lg" onClick={() => goTo('concept')}>Explore Platform <ArrowRight className="ml-1.5 h-4 w-4" /></Button><Button size="lg" variant="outline" onClick={() => goTo('concept')}>See How It Works <ArrowDown className="ml-1.5 h-4 w-4" /></Button></motion.div>
          </motion.div>
        </section>

        <motion.section id="problem" className="border-b border-zinc-900 py-20 sm:py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div variants={reveal} className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <SectionTitle eyebrow="The Problem" title="The gap isn't just between students and jobs.">
                It's between skills, education, and industry requirements. SkillBridge makes that gap visible and actionable.
              </SectionTitle>
            </motion.div>
            <motion.div variants={reveal} className="mx-auto mt-12 max-w-5xl border border-zinc-800 bg-[#121214]/70 p-5 sm:p-8">
              <div className="grid items-center gap-5 text-center sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-6">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-brand sm:text-sm">Academia</span>
                  <div className="mt-4 flex min-h-20 items-center justify-center border border-zinc-800 px-4 py-4 text-sm leading-relaxed text-zinc-300">Curriculum<br />Student skills</div>
                </div>
                <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-accent-amber sm:flex-col sm:gap-2">
                  <span className="h-px w-12 bg-accent-amber/30 sm:h-12 sm:w-px" />
                  <span>Gap</span>
                  <span className="h-px w-12 bg-accent-amber/30 sm:h-12 sm:w-px" />
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-brand sm:text-sm">Industry</span>
                  <div className="mt-4 flex min-h-20 items-center justify-center border border-zinc-800 px-4 py-4 text-sm leading-relaxed text-zinc-300">Job roles<br />Required skills</div>
                </div>
              </div>
              <p className="mt-8 text-center text-lg font-bold text-white">SkillBridge closes this gap.</p>
            </motion.div>
          </div>
        </motion.section>

        <section id="concept" className="border-b border-zinc-900 bg-zinc-950/20 py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><SectionTitle eyebrow="Core Concept" title="From skills to opportunity">A shared ecosystem for understanding capability, finding the next step, and connecting people around measurable outcomes.</SectionTitle><div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div className="space-y-2">{['Student Profile', 'Skill Assessment', 'Skill Mapping', 'Skill Gap Analysis', 'Industry Requirements', 'Smart Matching', 'Internships & Jobs', 'Applications', 'Career Progress'].map((step, index) => <div key={step} className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-[10px] font-bold text-brand">{String(index + 1).padStart(2, '0')}</span><span className="border border-zinc-800 bg-[#121214] px-4 py-2.5 text-sm text-zinc-300">{step}</span></div>)}</div><div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border border-brand/20 bg-[#121214]/70 p-8"><div className="absolute h-56 w-56 rounded-full border border-dashed border-brand/20 animate-[spin_24s_linear_infinite]" /><div className="absolute h-40 w-40 rounded-full border border-dashed border-brand/30 animate-[spin_18s_linear_infinite_reverse]" /><div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-center shadow-[0_0_50px_rgba(37,99,235,0.16)]"><Network className="mb-2 h-7 w-7 text-brand" /><span className="text-xs font-bold tracking-widest text-white">SKILLBRIDGE</span><span className="mt-1 text-[10px] text-zinc-500">Shared ecosystem</span></div></div></div></div></section>

        <motion.section id="workflow" className="py-20 sm:py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><SectionTitle eyebrow="How It Works" title="A clearer path from profile to placement" /><div className="mt-10 grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">{[['01', 'Build your profile', 'Education, skills, projects, and interests.'], ['02', 'Assess your skills', 'Technical, communication, and domain capability.'], ['03', 'Find your gaps', 'Compare your profile with target roles.'], ['04', 'Get matched', 'Connect skills and requirements into a score.'], ['05', 'Discover opportunities', 'Find internships, jobs, and programs.'], ['06', 'Apply and track', 'Follow applications through each outcome.']].map(([number, title, text]) => <motion.div key={number} variants={reveal} className="bg-[#121214] p-5"><span className="text-xs font-bold tracking-widest text-brand">{number}</span><h3 className="mt-4 text-base font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-500">{text}</p></motion.div>)}</div></div></motion.section>

        <section className="border-y border-zinc-900 bg-zinc-950/20 py-20 sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8"><SectionTitle eyebrow="One Platform" title="Four perspectives, one ecosystem" /><div className="mt-10 grid gap-4 sm:grid-cols-2">{roles.map(([title, subtitle, Icon, text]) => <div key={title} className="border border-zinc-800 bg-[#121214]/70 p-5"><div className="flex items-center gap-3"><Icon className="h-5 w-5 text-brand" /><h3 className="font-bold text-white">{title}</h3></div><p className="mt-5 text-sm font-semibold text-zinc-200">{subtitle}</p><p className="mt-2 text-sm leading-relaxed text-zinc-500">{text}</p></div>)}</div><div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{features.map(([title, Icon]) => <div key={title} className="border border-zinc-800 p-4"><Icon className="h-4 w-4 text-brand" /><p className="mt-4 text-xs font-semibold leading-relaxed text-zinc-300">{title}</p></div>)}</div></div></section>

        <section className="py-20 text-center sm:py-24"><div className="mx-auto max-w-3xl px-5 sm:px-6"><SectionTitle eyebrow="Built With" title="A practical foundation for collaboration" /><div className="mt-8 grid gap-3 text-left sm:grid-cols-3">{stack.map(([title, text, Icon]) => <div key={title} className="border border-zinc-800 bg-[#121214]/70 p-4"><Icon className="h-5 w-5 text-brand" /><p className="mt-4 text-xs uppercase tracking-widest text-zinc-500">{title}</p><p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p></div>)}</div><div className="mx-auto mt-20 max-w-2xl border-t border-brand/20 pt-16"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Our Vision</p><h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Make skills visible, opportunities accessible, and collaboration meaningful.</h2><div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-zinc-300"><span>Students discover.</span><span>Institutions understand.</span><span>Industry connects.</span><span>Academia collaborates.</span></div><p className="mt-8 text-2xl font-extrabold text-brand">That's SkillBridge.</p><Button className="mt-6" size="lg" onClick={() => navigate('/signup')}>Join SkillBridge <ArrowRight className="ml-1.5 h-4 w-4" /></Button></div></div></section>
      </main>
    </LandingLayout>
  );
};
