// src/pages/Evaluation/components/EvaluationHome/UserInfoCard.jsx
import React from 'react';

const UserInfoCard = ({ currentUser, onLogout }) => {
  const getLevelInfo = (level) => {
    const levels = {
      1: { emoji: '🌐', color: 'purple', label: 'Admin' },
      2: { emoji: '🏢', color: 'blue', label: 'BU Manager' },
      3: { emoji: '🌎', color: 'green', label: 'Regional' },
      4: { emoji: '🏭', color: 'yellow', label: 'Plant' },
      5: { emoji: '👤', color: 'gray', label: 'Individual' }
    };
    return levels[level] || levels[5];
  };

  const levelInfo = getLevelInfo(currentUser?.scma_level);

  const colorClasses = {
    purple: 'bg-purple-500/20 border-purple-500 text-purple-300',
    blue: 'bg-blue-500/20 border-blue-500 text-blue-300',
    green: 'bg-green-500/20 border-green-500 text-green-300',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-300',
    gray: 'bg-gray-500/20 border-gray-500 text-gray-300'
  };

  return (
    <div className="flex items-center gap-4">
      {/* User Avatar & Name */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">
            {currentUser?.name?.charAt(0) || 'U'}
          </span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{currentUser?.name}</p>
          <p className="text-gray-400 text-xs">{currentUser?.userid}</p>
        </div>
      </div>

      {/* Permission Level Badge */}
      {currentUser?.scma_level && (
        <div className={`px-3 py-1.5 rounded-lg border-2 ${colorClasses[levelInfo.color]}`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{levelInfo.emoji}</span>
            <div className="flex flex-col">
              <span className={`text-xs font-bold ${colorClasses[levelInfo.color].split(' ')[2]}`}>
                Level {currentUser.scma_level}
              </span>
              <span className="text-[10px] text-gray-400">
                {levelInfo.label}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500 text-gray-300 hover:text-red-400 rounded-lg text-sm font-semibold transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfoCard;