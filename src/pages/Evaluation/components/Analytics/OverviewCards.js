// src/pages/Evaluation/components/Analytics/OverviewCards.jsx
import React from 'react';

const OverviewCards = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-5 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-800/50 border-2 border-gray-700 rounded-xl p-8 text-center">
        <p className="text-gray-400">No overview data available</p>
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Evaluations',
      value: data.total_evaluations,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'blue',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-400'
    },
    {
      label: 'Completed',
      value: data.completed_evaluations,
      subtitle: `${data.completion_rate}% completion rate`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500',
      textColor: 'text-green-400'
    },
    {
      label: 'In Progress',
      value: data.in_progress_evaluations,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'orange',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-400'
    },
    {
      label: 'Unique Evaluators',
      value: data.unique_evaluators,
      subtitle: `${data.active_business_units} BUs • ${data.active_regions} Regions`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'purple',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} backdrop-blur-sm border-2 ${card.borderColor} rounded-xl p-5 hover:shadow-lg transition-all group`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
              {card.label}
            </p>
            <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center ${card.textColor} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
          </div>
          <p className={`text-3xl font-bold ${card.textColor} mb-1`}>
            {card.value.toLocaleString()}
          </p>
          {card.subtitle && (
            <p className="text-gray-500 text-xs font-medium">
              {card.subtitle}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;