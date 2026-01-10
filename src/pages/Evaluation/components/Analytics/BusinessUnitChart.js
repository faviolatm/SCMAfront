// src/pages/Evaluation/components/EvaluationHome/Analytics/BusinessUnitChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BusinessUnitChart = ({ data, loading }) => {
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

  // Preparar data (top 10 BUs)
  const chartData = data
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map(item => ({
      name: item.business_unit.length > 25 
        ? item.business_unit.substring(0, 25) + '...' 
        : item.business_unit,
      fullName: item.business_unit,
      total: item.total,
      completed: item.completed,
      inProgress: item.in_progress,
      completionRate: item.completion_rate
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 shadow-xl">
          <p className="text-white font-bold mb-2">{data.fullName}</p>
          <div className="space-y-1 text-sm">
            <p className="text-green-400">
              <span className="font-semibold">Completed:</span> {data.completed}
            </p>
            <p className="text-orange-400">
              <span className="font-semibold">In Progress:</span> {data.inProgress}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Total:</span> {data.total}
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

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-white font-bold text-xl flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Evaluations by Business Unit
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Top 10 business units by evaluation volume
        </p>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={120}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
            />
            <YAxis tick={{ fill: '#9ca3af' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" radius={[8, 8, 0, 0]} />
            <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" name="In Progress" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};

export default BusinessUnitChart;