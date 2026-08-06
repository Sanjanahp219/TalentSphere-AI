import React from 'react';
import { Users, FolderKanban, Building2, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import './dashboard.css';

const SummaryCards = () => {
  const cards = [
    {
      id: 'total-employees',
      title: 'Total Employees',
      value: '245',
      change: '+12 this month',
      badgeClass: 'ts-badge-positive',
      icon: Users,
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      showTrend: true,
    },
    {
      id: 'active-projects',
      title: 'Active Projects',
      value: '18',
      change: '4 delivering soon',
      badgeClass: 'ts-badge-neutral',
      icon: FolderKanban,
      gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
      showTrend: false,
    },
    {
      id: 'departments',
      title: 'Departments',
      value: '7',
      change: 'Cross-functional',
      badgeClass: 'ts-badge-neutral',
      icon: Building2,
      gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
      showTrend: false,
    },
    {
      id: 'ai-insights',
      title: 'AI Insights',
      value: '15',
      change: '15 Need Upskilling',
      badgeClass: 'ts-badge-alert',
      icon: Sparkles,
      gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
      showTrend: false,
    },
  ];

  return (
    <div className="ts-summary-grid">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="ts-summary-card"
          >
            <div className="ts-summary-card-accent" />

            <div className="ts-card-top">
              <span className="ts-card-label">{card.title}</span>
              <div className="ts-card-icon-box" style={{ background: card.gradient }}>
                <Icon size={20} />
              </div>
            </div>

            <div className="ts-card-value">
              {card.value}
            </div>

            <div>
              <span className={`ts-card-badge ${card.badgeClass}`}>
                {card.showTrend && <TrendingUp size={13} />}
                {card.change}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
