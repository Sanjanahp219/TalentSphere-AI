import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import './dashboard.css';

const AnalyticsChart = () => {
  const [activeTab, setActiveTab] = useState('department');

  const departmentData = [
    { name: 'Engineering', count: 110, percentage: '45%' },
    { name: 'Sales', count: 50, percentage: '20%' },
    { name: 'HR', count: 35, percentage: '14%' },
    { name: 'Finance', count: 30, percentage: '12%' },
    { name: 'Design', count: 20, percentage: '9%' },
  ];

  const experienceData = [
    { label: '0-2 Years', count: 65, percentage: '26%' },
    { label: '2-5 Years', count: 95, percentage: '39%' },
    { label: '5-10 Years', count: 55, percentage: '22%' },
    { label: '10+ Years', count: 30, percentage: '13%' },
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
            <BarChart3 size={20} className="text-cyan-400" />
            Workforce Analytics
          </h3>
          <p className="ts-panel-subtitle">Department & Experience Distribution</p>
        </div>

        {/* Tab Toggle */}
        <div className="ts-tabs-container">
          <button
            onClick={() => setActiveTab('department')}
            className={`ts-tab-btn ${activeTab === 'department' ? 'ts-tab-active' : ''}`}
          >
            By Department
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`ts-tab-btn ${activeTab === 'experience' ? 'ts-tab-active' : ''}`}
          >
            By Experience
          </button>
        </div>
      </div>

      {/* Chart Bars */}
      <div>
        {activeTab === 'department' ? (
          departmentData.map((item) => (
            <div key={item.name} className="ts-progress-row">
              <div className="ts-progress-label">
                <span className="text-slate-300">{item.name}</span>
                <span className="text-cyan-400 font-semibold">{item.count} employees ({item.percentage})</span>
              </div>
              <div className="ts-progress-bg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: item.percentage }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="ts-progress-fill-cyan"
                />
              </div>
            </div>
          ))
        ) : (
          experienceData.map((item) => (
            <div key={item.label} className="ts-progress-row">
              <div className="ts-progress-label">
                <span className="text-slate-300">{item.label}</span>
                <span className="text-indigo-400 font-semibold">{item.count} employees ({item.percentage})</span>
              </div>
              <div className="ts-progress-bg">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: item.percentage }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="ts-progress-fill-purple"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
