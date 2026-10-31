import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import './dashboard.css';

const AnalyticsChart = ({ departmentData = [], experienceData = [], loading }) => {
  const [activeTab, setActiveTab] = useState('department');

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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500">Calculating distributions...</p>
          </div>
        ) : activeTab === 'department' ? (
          departmentData.length > 0 ? (
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
            <p className="text-xs text-slate-500 text-center py-10">No department statistics available.</p>
          )
        ) : (
          experienceData.length > 0 ? (
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
          ) : (
            <p className="text-xs text-slate-500 text-center py-10">No experience statistics available.</p>
          )
        )}
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
