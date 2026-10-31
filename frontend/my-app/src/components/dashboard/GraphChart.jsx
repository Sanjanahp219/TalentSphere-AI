import React from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import './dashboard.css';

const GraphChart = ({ trendData = [], loading }) => {
  // Fallback monthly workforce headcount dataset if trendData is not available
  const defaultData = [
    { month: 'Jan', headcount: 0 },
    { month: 'Feb', headcount: 0 },
    { month: 'Mar', headcount: 0 },
    { month: 'Apr', headcount: 0 },
    { month: 'May', headcount: 0 },
    { month: 'Jun', headcount: 0 },
  ];

  const data = trendData.length > 0 ? trendData : defaultData;

  // Custom tooltip for dark glassmorphism theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs">
          <p className="font-bold text-slate-200 mb-1">{label} Overview</p>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Headcount: {payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="ts-glass-panel"
    >
      {/* Header */}
      <div className="ts-panel-header">
        <div>
          <h3 className="ts-panel-title">
            <TrendingUp size={20} className="text-cyan-400" />
            Workforce Headcount Trend
          </h3>
          <p className="ts-panel-subtitle">Interactive headcount trajectory (past 6 months)</p>
        </div>
        {!loading && data.length > 0 && (
          <span className="ts-card-badge ts-badge-positive">
            {(() => {
              const startVal = data[0].headcount;
              const endVal = data[data.length - 1].headcount;
              const growth = startVal > 0 ? (((endVal - startVal) / startVal) * 100).toFixed(0) : 0;
              return `${growth >= 0 ? '+' : ''}${growth}% Growth`;
            })()}
          </span>
        )}
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-60 mt-2 flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500">Generating trajectory...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHeadcount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.4)" vertical={false} />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="headcount"
                stroke="#22d3ee"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorHeadcount)"
                dot={{ r: 4, fill: '#22d3ee', stroke: '#020617', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#38bdf8', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default GraphChart;
