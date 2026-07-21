import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const AdminView = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-red-600">Admin Panel</h1>
    <p className="mt-2 text-gray-600">This page is restricted to HR Administrators only.</p>
  </div>
);

const Unauthorized = () => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-semibold text-red-500">Access Denied</h1>
    <p className="mt-2 text-gray-600">You do not have the required permissions to view this page.</p>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected General Dashboard (Temporarily Unprotected for Preview) */}
          <Route path="/dashboard" element={<Dashboard />} />




          {/* Protected Role-Based Admin Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['HR Administrator']}>
                <AdminView />
              </ProtectedRoute>
            } 
          />

          {/* Fallback redirecting to the Protected Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
