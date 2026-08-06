import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { motion } from 'framer-motion';
import { Spotlight } from '../components/Spotlight';
import { Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff, User } from 'lucide-react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    let result;
    if (isRegister) {
      if (!name.trim()) {
        setError('Full Name is required');
        return;
      }
      result = await register(name, email, password);
    } else {
      result = await login(email, password);
    }

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 text-white overflow-hidden bg-grid-white">
      {/* Aceternity Spotlight Backgrounds */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />
      <Spotlight className="top-10 right-0 md:right-60 md:top-20" fill="indigo" />

      {/* Background Radial Gradient overlay to fade grid edges */}
      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

      {/* Main Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 max-[1360px]:px-6 max-[1360px]:py-4 rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
      >

        {/* Card Header */}
        <div className="flex flex-col items-center mb-8 max-[1360px]:mb-4">
          <motion.div
            className="w-12 h-12 max-[1360px]:w-10 max-[1360px]:h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-4 max-[1360px]:mb-2"
          >
            <Sparkles className="w-6 h-6 max-[1360px]:w-5 max-[1360px]:h-5 text-white" />
          </motion.div>

          <h1 className="text-3xl max-[1360px]:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400">
            {isRegister ? 'Create Account' : 'TalentSphere AI'}
          </h1>
          <p className="text-sm max-[1360px]:text-xs text-slate-400 mt-2 max-[1360px]:mt-1">
            {isRegister ? 'Join the workforce intelligence platform' : 'Workforce intelligence platform'}
          </p>
        </div>


        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 max-[1360px]:mb-3 p-4 max-[1360px]:p-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm max-[1360px]:text-xs text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-[1360px]:space-y-3">
          {/* Full Name Input Field (Register Only) */}
          {isRegister && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 max-[1360px]:space-y-1 text-left"
            >
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-indigo-500/40 focus-within:from-cyan-400 focus-within:via-blue-400 focus-within:to-indigo-400 transition-all duration-300">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 max-[1360px]:w-4 max-[1360px]:h-4 text-slate-400 z-10" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegister}
                  placeholder="John Doe"
                  className="w-full pl-11 max-[1360px]:pl-10 pr-4 py-3 max-[1360px]:py-2 bg-slate-950 rounded-[11px] text-white placeholder-slate-600 focus:outline-none transition-all duration-200"
                />
              </div>
            </motion.div>
          )}

          {/* Email Input Field */}
          <div className="space-y-2 max-[1360px]:space-y-1 text-left">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-indigo-500/40 focus-within:from-cyan-400 focus-within:via-blue-400 focus-within:to-indigo-400 transition-all duration-300">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 max-[1360px]:w-4 max-[1360px]:h-4 text-slate-400 z-10" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-11 max-[1360px]:pl-10 pr-4 py-3 max-[1360px]:py-2 bg-slate-950 rounded-[11px] text-white placeholder-slate-600 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="space-y-2 max-[1360px]:space-y-1 text-left">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-indigo-500/40 focus-within:from-cyan-400 focus-within:via-blue-400 focus-within:to-indigo-400 transition-all duration-300">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 max-[1360px]:w-4 max-[1360px]:h-4 text-slate-400 z-10" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-11 max-[1360px]:pl-10 pr-11 max-[1360px]:pr-10 py-3 max-[1360px]:py-2 bg-slate-950 rounded-[11px] text-white placeholder-slate-600 focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 max-[1360px]:w-4 max-[1360px]:h-4" />
                ) : (
                  <Eye className="w-5 h-5 max-[1360px]:w-4 max-[1360px]:h-4" />
                )}
              </button>
            </div>
          </div>
          {/* Submit Button with animated gradient borders */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden rounded-xl p-[2px] focus:outline-none"
          >
            {/* Moving gradient outline border effect */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Button Inner Body */}
            <span className="relative flex items-center justify-center gap-2 w-full px-8 py-3 max-[1360px]:py-2 rounded-[10px] bg-slate-950 hover:bg-slate-950/90 text-white font-medium transition-all duration-200">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isRegister ? 'Register' : 'Sign In'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </motion.button>

          {/* Toggle between Register/Login */}
          <div className="text-center pt-4 max-[1360px]:pt-3 border-t border-slate-800/60 mt-4 max-[1360px]:mt-2.5 text-xs text-slate-400">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setError('');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer focus:outline-none"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setError('');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer focus:outline-none"
                >
                  Register
                </button>
              </span>
            )}
          </div>

          {/* Forgot password link */}
          {!isRegister && (
            <div className="text-center pt-2 max-[1360px]:pt-1">
              <motion.a
                href="/forgot-password"
                className="inline-block text-xs font-medium text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
                whileHover={{         
                  textDecoration:"underline",
                  x: 3,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Forgot Password?
              </motion.a>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
