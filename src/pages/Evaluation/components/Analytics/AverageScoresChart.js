// src/pages/Evaluation/components/EvaluationHome/Analytics/AverageScoresChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const AverageScoresChart = ({ data, loading }) => {
  // Colores según el score
  const getBarColor = (score) => {
    if (score >= 4) return '#10b981'; // green
    if (score >= 3) return '#f59e0b'; // amber
    if (score >= 2) return '#f97316'; // orange
    return '#ef4444'; // red
  };

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

  // Preparar data para el chart
  const chartData = data.map(item => ({
    name: item.category_name.length > 20 
      ? item.category_name.substring(0, 20) + '...' 
      : item.category_name,
    fullName: item.category_name,
    avgScore: parseFloat(item.avg_score),
    count: item.evaluations_count,
    lowest: item.lowest_score,
    highest: item.highest_score
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 shadow-xl">
          <p className="text-white font-bold mb-2">{data.fullName}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-300">
              <span className="font-semibold">Avg Score:</span> {data.avgScore.toFixed(2)}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Evaluations:</span> {data.count}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Range:</span> {data.lowest} - {data.highest}
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
          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Average Scores by Category
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Lower scores indicate areas needing improvement
        </p>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 5]} 
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar 
              dataKey="avgScore" 
              name="Average Score" 
              radius={[8, 8, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.avgScore)} />
              ))}
            </Bar>
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

export default AverageScoresChart;