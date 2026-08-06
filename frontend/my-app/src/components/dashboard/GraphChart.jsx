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

const GraphChart = () => {
  // Monthly workforce headcount dataset
  const data = [
    { month: 'Jan', headcount: 120, activeProjects: 10 },
    { month: 'Feb', headcount: 145, activeProjects: 12 },
    { month: 'Mar', headcount: 170, activeProjects: 14 },
    { month: 'Apr', headcount: 195, activeProjects: 15 },
    { month: 'May', headcount: 215, activeProjects: 17 },
    { month: 'Jun', headcount: 245, activeProjects: 18 },
  ];

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
          <p className="ts-panel-subtitle">Interactive headcount trajectory (Jan - Jun)</p>
        </div>
        <span className="ts-card-badge ts-badge-positive">
          +104% Growth
        </span>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-60 mt-2">
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
      </div>
    </motion.div>
  );
};

export default GraphChart;
