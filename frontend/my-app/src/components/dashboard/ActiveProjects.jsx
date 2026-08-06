import React from 'react';
import { FolderKanban, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import './dashboard.css';

const ActiveProjects = () => {
  const projects = [
    {
      id: 1,
      name: 'TalentSphere AI',
      status: 'In Progress',
      members: 12,
      progress: 75,
      badgeClass: 'ts-badge-alert',
      barGradient: 'linear-gradient(90deg, #f59e0b, #ea580c)',
    },
    {
      id: 2,
      name: 'CRM Migration',
      status: 'Completed',
      members: 8,
      progress: 100,
      badgeClass: 'ts-badge-positive',
      barGradient: 'linear-gradient(90deg, #10b981, #14b8a6)',
    },
    {
      id: 3,
      name: 'Mobile App Redesign',
      status: 'In Progress',
      members: 6,
      progress: 40,
      badgeClass: 'ts-badge-neutral',
      barGradient: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="ts-glass-panel"
    >
      <div className="ts-panel-header">
        <div>
          <h3 className="ts-panel-title">
            <FolderKanban size={20} className="text-cyan-400" />
            Active Projects
          </h3>
          <p className="ts-panel-subtitle">Overview of current project statuses</p>
        </div>
      </div>

      <div>
        {projects.map((proj) => (
          <div key={proj.id} className="ts-project-item">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-200">{proj.name}</h4>
              <span className={`ts-card-badge ${proj.badgeClass}`}>
                {proj.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-slate-500" />
                <span>{proj.members} Team Members</span>
              </div>
              <span className="font-semibold text-slate-300">{proj.progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="ts-progress-bg">
              <div
                className="h-full rounded-full"
                style={{ width: `${proj.progress}%`, background: proj.barGradient }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActiveProjects;
