import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, FileText, GitBranch, LayoutDashboard, Network, Sparkles, Users } from 'lucide-react';
import { LandingLayout } from '../../layouts/LandingLayout';
import { Button } from '../../components/ui/Button';

const ease = [0.22, 1, 0.36, 1];
const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } }
};

const teamMembers = [
  { name: 'Ajay Kumar', role: 'Team Leader', focus: 'Product direction and coordination', icon: LayoutDashboard },
  { name: 'Alok Kumar', role: 'Fullstack Developer & Technical Lead', focus: 'Interface and user experience', icon: Code2 },
  { name: 'Devang Kumar', role: 'Content Lead & Lead Presenter', focus: 'Product evaluation', icon: Database },
  { name: 'Amit Raj', role: 'Architecture asessment', focus: 'APIs & services', icon: GitBranch },
  { name: 'Lara', role: 'Research and Data Analytics', focus: 'Data models and persistence', icon: FileText },
  { name: 'Dipanshu', role: 'Research, Presentation Designer & Co-Presenter', focus: 'Problem research and presentation', icon: Users }
];

export const TeamPage = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <main className="overflow-hidden">
        <section className="relative border-b border-zinc-900 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
            <motion.div variants={reveal} className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="h-3.5 w-3.5" /> Smart India Hackathon 2026
            </motion.div>
            <motion.h1 variants={reveal} className="mt-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">BinaryBrains</motion.h1>
            <motion.p variants={reveal} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-xl">
              The team behind SkillBridge, a portal for connecting academia and industry through skills, opportunities, and collaboration.
            </motion.p>
            <motion.div variants={reveal} className="mx-auto mt-8 max-w-2xl border-y border-brand/20 py-5">
              <p className="text-2xl font-extrabold tracking-[0.16em] text-brand">SIH26044</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">Portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placements</p>
            </motion.div>
          </motion.div>
        </section>

        <motion.section className="border-b border-zinc-900 py-20 sm:py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div variants={reveal} className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Meet the team</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">The people behind BinaryBrains.</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">Update the names and roles below with your final team details. Each card is intentionally simple so the team stays the focus.</p>
            </motion.div>
            <motion.div variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map(({ name, role, focus, icon: Icon }) => (
                <motion.article key={name} variants={reveal} className="group flex min-h-[230px] flex-col justify-between border border-zinc-800 bg-[#121214]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-[#161619] hover:shadow-[0_10px_30px_rgba(37,99,235,0.08)] sm:min-h-[250px] sm:p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-brand/60 group-hover:bg-brand/20">
                    <Icon className="h-6 w-6 text-brand transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white">{name}</h3>
                    <p className="mt-1 text-sm font-semibold text-brand">{role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">{focus}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="py-20 text-center sm:py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <motion.div variants={reveal} className="mx-auto max-w-2xl px-5 sm:px-6">
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}><Network className="mx-auto h-8 w-8 text-brand" /></motion.div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Building the bridge together.</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">SkillBridge is our answer to a shared problem: making skills visible and meaningful connections easier to build.</p>
            <Button className="mt-7" size="lg" onClick={() => navigate('/about')}>Explore SkillBridge <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
          </motion.div>
        </motion.section>
      </main>
    </LandingLayout>
  );
};
