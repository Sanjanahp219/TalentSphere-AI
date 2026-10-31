import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './components/Employees/EmployeeList';

import ForgotPassword from './pages/forgetpassword';
import ResetPassword from './pages/ResetPassword';
import Navbar from './components/Navbar/navbar';
import Header from './components/Header/Header';

const AdminView = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    <Navbar />
    <div className="ts-main-content">
      <Header />
      <main className="p-6 md:p-12">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-amber-400">HR Administrator Panel</h1>
        <p className="mt-2 text-slate-400">This page is restricted to HR Administrators for company-wide talent management.</p>
      </main>
    </div>
  </div>
);

const Unauthorized = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    <Navbar />
    <div className="ts-main-content">
      <Header />
      <main className="p-6 md:p-12">
        <div className="max-w-md mx-auto p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl">
          <h1 className="text-2xl font-semibold text-red-400">Access Denied</h1>
          <p className="mt-2 text-slate-400 text-sm">You do not have the required permissions to view this page.</p>
        </div>
      </main>
    </div>
  </div>
);

const PageView = ({ title, description }) => (
  <div className="min-h-screen bg-slate-950 text-white">
    <Navbar />
    <div className="ts-main-content">
      <Header />
      <main className="p-6 md:p-12 space-y-6">
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-2xl">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
            {title}
          </h1>
          <p className="mt-2 text-slate-400 text-sm">{description}</p>
        </div>
      </main>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Core Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <PageView title="Assigned Projects" description="Track project allocation, status, and team assignments." />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <PageView title="Workforce Analytics" description="AI insights on employee skill distribution and performance." />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute>
                <PageView title="TalentSphere AI Assistant" description="Ask AI for skill recommendations, resume analysis, and job matching." />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PageView title="User Profile" description="View and update your personal workforce profile and verified skills." />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <PageView title="Account Settings" description="Manage app preferences, notifications, and security settings." />
              </ProtectedRoute>
            }
          />

          {/* Protected Role-Based Admin Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['HR Administrator']}>
                <AdminView />
              </ProtectedRoute>
            }
          />

          {/* Fallback redirecting to Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
