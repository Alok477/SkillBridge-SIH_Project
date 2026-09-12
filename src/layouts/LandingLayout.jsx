import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';

export const LandingLayout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'About', href: '/about', route: true },
    { label: 'Team', href: '/team', route: true },
    { label: 'Students', href: '/login?role=student', route: true },
    { label: 'Industries', href: '/login?role=industry', route: true },
    { label: 'Institutions', href: '/login?role=institution', route: true }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden flex-1 items-center justify-center gap-4 lg:flex xl:gap-6">
              {navItems.map((item) => (
                item.route ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="whitespace-nowrap text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="whitespace-nowrap text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-400 hover:text-white transition-colors p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="border-b border-zinc-800 bg-[#121214] px-4 py-4 space-y-3 lg:hidden">
            {navItems.map((item) => (
              item.route ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-zinc-400 hover:text-white py-1 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-zinc-400 hover:text-white py-1 transition-colors"
                >
                  {item.label}
                </a>
              )
            ))}
            <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-center" onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}>
                Sign In
              </Button>
              <Button className="w-full justify-center" onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0b0b0d] border-t border-zinc-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <p className="text-xs text-zinc-500 max-w-xs">
                A unified ecosystem bridging skills, academic research, and industry collaborations.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase mb-4">Ecosystems</h4>
              <ul className="space-y-2">
                <li><Link to="/login?role=student" className="text-xs text-zinc-500 hover:text-white transition-colors">Students</Link></li>
                <li><Link to="/login?role=industry" className="text-xs text-zinc-500 hover:text-white transition-colors">Industries</Link></li>
                <li><Link to="/login?role=institution" className="text-xs text-zinc-500 hover:text-white transition-colors">Institutions</Link></li>
                <li><Link to="/login?role=academician" className="text-xs text-zinc-500 hover:text-white transition-colors">Academicians</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase mb-4">Marketplace</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-xs text-zinc-500 hover:text-white transition-colors">Internships</Link></li>
                <li><Link to="/login" className="text-xs text-zinc-500 hover:text-white transition-colors">FDP Programs</Link></li>
                <li><Link to="/login" className="text-xs text-zinc-500 hover:text-white transition-colors">Consultancies</Link></li>
                <li><Link to="/login" className="text-xs text-zinc-500 hover:text-white transition-colors">Joint Research</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 tracking-wide uppercase mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><span className="text-xs text-zinc-500 hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
                <li><span className="text-xs text-zinc-500 hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
                <li><span className="text-xs text-zinc-500 hover:text-white cursor-pointer transition-colors">Contact</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-zinc-900 pt-8 sm:flex-row sm:items-center">
            <span className="text-xs text-zinc-600">&copy; 2026 SkillBridge Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <span className="text-xs text-zinc-600 hover:text-zinc-400 cursor-pointer">Twitter</span>
              <span className="text-xs text-zinc-600 hover:text-zinc-400 cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
