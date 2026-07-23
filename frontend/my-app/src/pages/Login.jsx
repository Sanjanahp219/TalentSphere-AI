import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { motion } from 'framer-motion';
import { Spotlight } from '../components/ui/Spotlight';
import { Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
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

      {/* Main Glassmorphic Animated Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
      >

        {/* Card Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-4"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>

          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400">
            TalentSphere AI
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Workforce intelligence platform
          </p>
        </div>


        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input Field */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-indigo-500/40 focus-within:from-cyan-400 focus-within:via-blue-400 focus-within:to-indigo-400 transition-all duration-300">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 rounded-[11px] text-white placeholder-slate-600 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-indigo-500/40 focus-within:from-cyan-400 focus-within:via-blue-400 focus-within:to-indigo-400 transition-all duration-300">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-slate-950 rounded-[11px] text-white placeholder-slate-600 focus:outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
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
            <span className="relative flex items-center justify-center gap-2 w-full px-8 py-3 rounded-[10px] bg-slate-950 hover:bg-slate-950/90 text-white font-medium transition-all duration-200">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </motion.button>

          {/* Forgot password link */}
          <div className="text-center pt-2">
            <motion.a
              href="/forgot-password"
              className="inline-block text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
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

        </form>
      </motion.div>
    </div>
  );
};

export default Login;
