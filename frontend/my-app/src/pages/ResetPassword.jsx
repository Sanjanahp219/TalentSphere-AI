import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Spotlight } from '../components/Spotlight';
import { Lock, Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import './forgetpassword.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenError('Missing password reset token. Please request a new link.');
        setVerifying(false);
        return;
      }

      try {
        await axios.get(`/api/auth/verify-reset-token?token=${token}`);
        setTokenError('');
      } catch (err) {
        setTokenError(err.response?.data?.message || 'This reset link is invalid or has expired.');
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'Lowercase letter (a-z)', test: (p) => /[a-z]/.test(p) },
    { label: 'Uppercase letter (A-Z)', test: (p) => /[A-Z]/.test(p) },
    { label: 'Number (0-9)', test: (p) => /\d/.test(p) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    const failedRequirement = passwordRequirements.find((req) => !req.test(password));
    if (failedRequirement) {
      setError(`Password requirement failed: ${failedRequirement.label}`);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        password,
      });
      setSuccessMessage(response.data?.message || 'Password reset successfully! You can now log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      {/* Background Spotlight Glows */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />
      <Spotlight className="top-10 right-0 md:right-60 md:top-20" fill="indigo" />

      {/* Glassmorphic Reset Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="forgot-password-card"
      >
        {/* Header */}
        <div className="card-header">
          <div className="icon-badge">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="card-title">Set New Password</h1>
          <p className="card-subtitle">
            Please enter and confirm your new secure password below.
          </p>
        </div>

        {/* Loading Spinner during Token Verification */}
        {verifying ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="spinner" />
            <p className="text-sm text-slate-400">Verifying reset token...</p>
          </div>
        ) : tokenError ? (
          /* Token Error View */
          <div className="space-y-4">
            <div className="alert-message alert-error flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{tokenError}</span>
            </div>
            <button
              onClick={() => navigate('/forgot-password')}
              className="submit-btn"
            >
              Request New Reset Link
            </button>
            <div className="back-container">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="back-link-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          </div>
        ) : successMessage ? (
          /* Success View */
          <div className="space-y-6 text-center">
            <div className="alert-message alert-success">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="submit-btn"
            >
              Proceed to Login
            </button>
          </div>
        ) : (
          /* Password Form */
          <form onSubmit={handleSubmit}>
            {error && <div className="alert-message alert-error">{error}</div>}

            {/* New Password */}
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="form-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>
            </div>

            {/* Password Validation Requirements */}
            <div className="mb-6 p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
              <p className="text-xs font-semibold text-slate-400 mb-2">Password must include:</p>
              {passwordRequirements.map((req, idx) => {
                const met = req.test(password);
                return (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        met ? 'bg-emerald-400' : 'bg-slate-600'
                      }`}
                    />
                    <span className={met ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                      {req.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <div className="spinner" />
              ) : (
                <>
                  Reset Password
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="back-container">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="back-link-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPassword;
