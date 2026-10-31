import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar/navbar';
import Header from '../components/Header/Header';
import SummaryCards from '../components/dashboard/SummaryCards';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import GraphChart from '../components/dashboard/GraphChart';

import ActiveProjects from '../components/dashboard/ActiveProjects';
import RecentActivities from '../components/dashboard/RecentActivities';
import AIRecommendations from '../components/dashboard/AIRecommendations';
import QuickActions from '../components/dashboard/QuickActions';
import '../components/dashboard/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/employees/stats');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="ts-dashboard-layout bg-grid-white">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Side Navbar */}
      <Navbar />

      <div className="ts-main-content relative z-10">
        <Header />
        
        <main className="space-y-8 p-6 md:p-10">

          {/* Dashboard Title & Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="ts-dashboard-header"
          >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="ts-dashboard-title">
                Workforce Intelligence Dashboard
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Welcome back, <span className="text-slate-200 font-semibold">{user?.name || 'User'}</span>! Real-time workforce metrics & AI insights.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 1. Summary Cards Section */}
        <section>
          <h2 className="ts-section-heading">Key Metrics</h2>
          <SummaryCards stats={stats} loading={loading} />
        </section>

        {/* 2. Visual Graph Chart & Department Analytics */}
        <div className="ts-grid-2-equal">
          <GraphChart trendData={stats?.headcountTrend} loading={loading} />
          <AnalyticsChart 
            departmentData={stats?.departmentDistribution} 
            experienceData={stats?.experienceDistribution} 
            loading={loading} 
          />
        </div>

        {/* 3. Active Projects */}
        <div className="ts-grid-2-equal">
          <ActiveProjects />
        </div>

        {/* 4. Recent Activities */}
        <section>
          <h2 className="ts-section-heading">Recent Timeline</h2>
          <RecentActivities />
        </section>

        {/* 5. AI Recommendations */}
        <section>
          <h2 className="ts-section-heading">AI Recommendations</h2>
          <AIRecommendations />
        </section>

        {/* 6. Quick Actions & Notifications */}
        <section>
          <h2 className="ts-section-heading">Actions & Alerts</h2>
          <QuickActions />
        </section>

      </main>
    </div>
  </div>
  );
};

export default Dashboard;
