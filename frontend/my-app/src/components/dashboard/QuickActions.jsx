import React from 'react';
import { UserPlus, FolderPlus, FileUp, FileSpreadsheet, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import './dashboard.css';

const QuickActions = () => {
  const actions = [
    { name: 'Add Employee', icon: UserPlus, gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    { name: 'Create Project', icon: FolderPlus, gradient: 'linear-gradient(135deg, #6366f1, #a855f7)' },
    { name: 'Upload Resume', icon: FileUp, gradient: 'linear-gradient(135deg, #a855f7, #ec4899)' },
    { name: 'Generate Report', icon: FileSpreadsheet, gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)' },
  ];

  const notifications = [
    'Three employee profiles are incomplete.',
    'Two projects need team assignments.',
    'Five employees completed TypeScript training.',
  ];

  return (
    <div className="ts-grid-2-1">
      {/* Quick Actions Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="ts-glass-panel"
      >
        <div className="ts-panel-header">
          <h3 className="ts-panel-title">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((act, index) => {
            const Icon = act.icon;
            return (
              <button key={index} className="ts-quick-btn group">
                <div className="ts-quick-btn-icon group-hover:scale-105 transition-transform" style={{ background: act.gradient }}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                  {act.name}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Notifications Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="ts-glass-panel"
      >
        <div className="ts-panel-header">
          <h3 className="ts-panel-title">
            <Bell size={20} className="text-amber-400" />
            Notifications
          </h3>
        </div>

        <div>
          {notifications.map((note, index) => (
            <div key={index} className="ts-notification-item">
              <span className="ts-notification-dot" />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuickActions;
