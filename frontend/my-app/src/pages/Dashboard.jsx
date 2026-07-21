import React from 'react';
import { useAuth } from '../AuthContext';
import { LogOut, User, Mail, Shield, Briefcase, Code, Award, Calendar } from "lucide-react";
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, logout } = useAuth(); // Corrected hook usage

  const userSkills = user?.skills || ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'CSS', 'JavaScript'];
  const userProjects = user?.projects || [
    { id: 1, name: 'AI Resume Analyzer', role: 'Frontend Dev', status: 'In Progress' },
    { id: 2, name: 'TalentSphere Portal', role: 'Lead Dev', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white p-6 md:p-12 relative overflow-hidden bg-grid-white">
      {/* Background glow gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <header className="flex justify-between items-center pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              TalentSphere AI
            </h1>
            <p className="text-xs text-slate-400">Workforce Intelligence Portal</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </header>

        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Welcome back, {user?.name || 'Employee'}!</h2>
            <p className="text-slate-400 text-sm">Here is your workforce intelligence overview.</p>
          </div>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile details */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl space-y-6">
            <h3 className="text-lg font-semibold border-b border-slate-800 pb-3 flex items-center gap-2 text-cyan-400">
              <Shield className="w-5 h-5" /> Profile details
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Full Name</p>
                  <p className="text-sm font-medium">{user?.name || 'TalentSphere User'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Email Address</p>
                  <p className="text-sm font-medium">{user?.email || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">App Role</p>
                  <span className="inline-block mt-0.5 text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {user?.role || 'User'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500">Department</p>
                  <p className="text-sm font-medium">{user?.department || 'Engineering'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Matrix */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl space-y-6 md:col-span-2">
            <h3 className="text-lg font-semibold border-b border-slate-800 pb-3 flex items-center gap-2 text-indigo-400">
              <Code className="w-5 h-5" /> Your Skills Matrix
            </h3>
            
            <p className="text-sm text-slate-400">
              These verified skills are synced to your workforce profile.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {userSkills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-xl text-sm font-medium"
                >
                  <Award className="w-4 h-4 text-indigo-400" />
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Projects */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl space-y-6 md:col-span-3">
            <h3 className="text-lg font-semibold border-b border-slate-800 pb-3 flex items-center gap-2 text-emerald-400">
              <Calendar className="w-5 h-5" /> Assigned Projects
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Project Name</th>
                    <th className="pb-3 font-semibold">Your Assigned Role</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {userProjects.map((project) => (
                    <tr key={project.id}>
                      <td className="py-4 font-semibold text-slate-200">{project.name}</td>
                      <td className="py-4 text-slate-400">{project.role}</td>
                      <td className="py-4 text-right">
                        <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;



