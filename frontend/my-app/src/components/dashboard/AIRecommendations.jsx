import React from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import './dashboard.css';

const AIRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      title: 'Skill Gap Warning',
      desc: '5 Frontend Engineers should learn TypeScript to meet Q3 roadmap needs.',
      badge: 'Skill Development',
      badgeClass: 'ts-badge-neutral',
    },
    {
      id: 2,
      title: 'Resource Allocation',
      desc: 'React Team currently has a 25% bandwidth shortage for Project Phoenix.',
      badge: 'High Priority',
      badgeClass: 'ts-badge-alert',
    },
    {
      id: 3,
      title: 'Talent Match Recommendation',
      desc: 'Recommend Rahul Sharma for Project Phoenix based on 92% skill compatibility.',
      badge: 'Smart Match',
      badgeClass: 'ts-badge-positive',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="ts-glass-panel ts-ai-panel"
    >
      <div className="ts-panel-header">
        <div>
          <h3 className="ts-panel-title">
            <Sparkles size={20} className="text-amber-400" />
            AI Intelligence Insights
          </h3>
          <p className="ts-panel-subtitle">Automated talent & project recommendations</p>
        </div>
      </div>

      <div className="ts-grid-3">
        {recommendations.map((item) => (
          <div key={item.id} className="ts-ai-card">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Lightbulb size={16} className="text-amber-400" />
                  {item.title}
                </div>
                <span className={`ts-card-badge ${item.badgeClass}`}>
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>

            <button className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium pt-3 transition-colors cursor-pointer">
              <span>View Details</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIRecommendations;
