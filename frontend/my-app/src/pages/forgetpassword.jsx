import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Spotlight } from '../components/Spotlight';
import { Mail, ArrowRight, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';
import './forgetpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Send password reset request to backend API
      const response = await axios.post('/api/auth/forgot-password', { email });
      setSuccessMessage(response.data?.message || 'Password reset link sent to your email!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send password reset email. Please try again.');
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
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="card-title">Forgot Password</h1>
          <p className="card-subtitle">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert-message alert-error">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="alert-message alert-success">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Password Reset Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <div className="spinner" />
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="w-4 h-4" />
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
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
