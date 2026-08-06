import React from 'react';
import { User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import './dashboard.css';

const RecentEmployees = () => {
  const employees = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'React Developer',
      department: 'Engineering',
      joined: 'Yesterday',
      avatarBg: 'rgba(6, 182, 212, 0.15)',
      avatarColor: '#22d3ee',
      avatarBorder: 'rgba(6, 182, 212, 0.3)',
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'UI/UX Designer',
      department: 'Design',
      joined: '2 Days Ago',
      avatarBg: 'rgba(168, 85, 247, 0.15)',
      avatarColor: '#c084fc',
      avatarBorder: 'rgba(168, 85, 247, 0.3)',
    },
    {
      id: 3,
      name: 'Ankit Mehta',
      role: 'Backend Engineer',
      department: 'Engineering',
      joined: '4 Days Ago',
      avatarBg: 'rgba(99, 102, 241, 0.15)',
      avatarColor: '#818cf8',
      avatarBorder: 'rgba(99, 102, 241, 0.3)',
    },
    {
      id: 4,
      name: 'Sneha Verma',
      role: 'HR Specialist',
      department: 'HR',
      joined: '1 Week Ago',
      avatarBg: 'rgba(16, 185, 129, 0.15)',
      avatarColor: '#34d399',
      avatarBorder: 'rgba(16, 185, 129, 0.3)',
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
            <User size={20} className="text-indigo-400" />
            Recent Employees
          </h3>
          <p className="ts-panel-subtitle">New additions to the workforce</p>
        </div>
      </div>

      <div className="ts-employee-list">
        {employees.map((emp) => (
          <div key={emp.id} className="ts-employee-item">
            <div className="flex items-center gap-3">
              <div
                className="ts-employee-avatar"
                style={{
                  backgroundColor: emp.avatarBg,
                  color: emp.avatarColor,
                  borderColor: emp.avatarBorder,
                }}
              >
                {emp.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">{emp.name}</p>
                <p className="text-xs text-slate-400">
                  {emp.role} • <span className="text-slate-500">{emp.department}</span>
                </p>
              </div>
            </div>

            <div className="ts-time-pill">
              <Clock size={12} className="text-slate-500" />
              {emp.joined}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentEmployees;
