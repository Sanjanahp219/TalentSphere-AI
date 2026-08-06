import React from 'react';
import { Activity, CheckCircle2, UserPlus, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './dashboard.css';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      text: 'John joined Engineering department as Frontend Developer.',
      time: '10 mins ago',
      icon: UserPlus,
      bg: 'rgba(6, 182, 212, 0.15)',
      color: '#22d3ee',
      border: 'rgba(6, 182, 212, 0.3)',
    },
    {
      id: 2,
      text: 'Priya updated her skill profile (Added TypeScript & TailwindCSS).',
      time: '1 hour ago',
      icon: CheckCircle2,
      bg: 'rgba(16, 185, 129, 0.15)',
      color: '#34d399',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    {
      id: 3,
      text: 'Rahul was assigned to Project Alpha as Lead Engineer.',
      time: '3 hours ago',
      icon: FileText,
      bg: 'rgba(99, 102, 241, 0.15)',
      color: '#818cf8',
      border: 'rgba(99, 102, 241, 0.3)',
    },
    {
      id: 4,
      text: 'AI system analyzed 15 candidate resumes and recommended 3 matches.',
      time: '5 hours ago',
      icon: Sparkles,
      bg: 'rgba(245, 158, 11, 0.15)',
      color: '#fbbf24',
      border: 'rgba(245, 158, 11, 0.3)',
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
            <Activity size={20} className="text-indigo-400" />
            Recent Activity
          </h3>
          <p className="ts-panel-subtitle">Timeline of recent workforce events</p>
        </div>
      </div>

      <div>
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="ts-activity-row">
              <div
                className="ts-activity-icon"
                style={{
                  backgroundColor: act.bg,
                  color: act.color,
                  borderColor: act.border,
                }}
              >
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-200 leading-relaxed">{act.text}</p>
                <span className="text-[11px] text-slate-500 mt-0.5 block">{act.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RecentActivities;
