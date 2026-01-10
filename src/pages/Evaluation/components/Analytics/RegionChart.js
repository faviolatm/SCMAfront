// src/pages/Evaluation/components/EvaluationHome/Analytics/RegionChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const RegionChart = ({ data, loading }) => {
  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  if (loading) {
    return (
      <div className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-80 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const chartData = data.map(item => ({
    name: item.region,
    value: item.total,
    completed: item.completed,
    inProgress: item.in_progress,
    completionRate: item.completion_rate
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 shadow-xl">
          <p className="text-white font-bold mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-300">
              <span className="font-semibold">Total:</span> {data.value}
            </p>
            <p className="text-green-400">
              <span className="font-semibold">Completed:</span> {data.completed}
            </p>
            <p className="text-orange-400">
              <span className="font-semibold">In Progress:</span> {data.inProgress}
            </p>
            <p className="text-purple-400">
              <span className="font-semibold">Rate:</span> {data.completionRate}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (entry) => {
    return `${entry.name}: ${entry.value}`;
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-white font-bold text-xl flex items-center gap-2">
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Evaluations by Region
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Geographic distribution of evaluations
        </p>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};

export default RegionChart;