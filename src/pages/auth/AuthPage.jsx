import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Cpu, Library, Mail, Lock, UserCheck } from 'lucide-react';

export const AuthPage = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  const isSignUp = location.pathname === '/signup';

  // Input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const roleFromUrl = new URLSearchParams(location.search).get('role');
  const initialRole = ['student', 'industry', 'institution', 'academician'].includes(roleFromUrl) ? roleFromUrl : 'student';
  const [role, setRole] = useState(initialRole);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Role Select Handler
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const validate = () => {
    const nextErrors = {};
    if (isSignUp && !fullName) nextErrors.fullName = 'Full Name is required';
    if (!email) nextErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Invalid email address format';
    
    if (!password) nextErrors.password = 'Password is required';
    else if (password.length < 6) nextErrors.password = 'Password must be at least 6 characters';

    if (isSignUp) {
      if (!confirmPassword) nextErrors.confirmPassword = 'Please confirm your password';
      else if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isSignUp) {
        await signup(email, password, role, { name: fullName });
        addToast('Account created successfully!', 'success');
      } else {
        await login(email, password, role);
        addToast('Signed in successfully!', 'success');
      }
      navigate(`/${role}/dashboard`);
    } catch (err) {
      const msg = err.message || 'Authentication failed';
      addToast(msg, 'error');
      
      // If user is strictly not found when trying to login, prompt to register
      if (!isSignUp && err.isNotFound) {
        setTimeout(() => {
          addToast('Account not found. Navigating to registration...', 'info');
          navigate('/signup');
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'student', label: 'Student', desc: 'Build skills & apply' },
    { id: 'industry', label: 'Industry', desc: 'Hire & collaborate' },
    { id: 'institution', label: 'Institution', desc: 'Monitor & analyze' },
    { id: 'academician', label: 'Academician', desc: 'Research & teach' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo / Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
              <Cpu className="w-4.5 h-4.5 text-brand" />
            </div>
            <span className="font-bold tracking-tight text-white text-lg">SkillBridge</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {isSignUp ? 'Create your platform account' : 'Sign in to your dashboard'}
          </h2>
          <p className="text-xs text-zinc-500">
            {isSignUp ? 'Already registered?' : 'Need to create an account?'}
            <Link to={isSignUp ? '/login' : '/signup'} className="text-brand hover:underline font-semibold ml-1.5">
              {isSignUp ? 'Login instead' : 'Register now'}
            </Link>
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Role selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-zinc-400 tracking-wide uppercase flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-zinc-500" /> Choose Ecosystem Role
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r.id)}
                  className={`flex flex-col text-left p-2.5 rounded-lg border transition-all ${
                    role === r.id 
                      ? 'bg-brand/10 border-brand text-white' 
                      : 'bg-background border-zinc-800 text-zinc-400 hover:border-zinc-700/80 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-xs font-bold">{r.label}</span>
                  <span className="text-[10px] text-zinc-500 leading-tight mt-0.5">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                label="Full Name"
                type="text"
                value={fullName}
                error={errors.fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                required
              />
            )}
            <Input
              label="Email Address"
              type="email"
              value={email}
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@university.edu"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {isSignUp && (
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                error={errors.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-400 select-none">
                  <input type="checkbox" className="rounded bg-background border-zinc-800 text-brand focus:ring-brand/40 w-3.5 h-3.5" />
                  Remember me
                </label>
                <span className="text-brand hover:underline cursor-pointer font-medium">Forgot password?</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full justify-center pt-2.5 pb-2.5 text-xs font-semibold tracking-wider uppercase mt-4"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : isSignUp ? 'Create Account' : 'Authenticate'}
            </Button>

          </form>

          {/* Social login divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <span className="relative bg-[#121214] px-3 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          {/* Google Login Placeholder */}
          <Button variant="outline" className="w-full justify-center gap-2 text-xs font-semibold py-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Google
          </Button>

        </div>
      </div>
    </div>
  );
};
