import React, { useEffect, useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import PropTypes from 'prop-types';

function RefreshCard({ lastUpdated, onRefresh, refreshInterval }) {
  const [timeLeft, setTimeLeft] = useState(refreshInterval);

  // Inicializa el estado del interruptor leyendo el valor del LocalStorage (por defecto true)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(() => {
    const storedValue = localStorage.getItem('autoRefreshEnabled');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  useEffect(() => {
    localStorage.setItem('autoRefreshEnabled', JSON.stringify(autoRefreshEnabled));
  }, [autoRefreshEnabled]);

  useEffect(() => {
    if (autoRefreshEnabled) {
      setTimeLeft(refreshInterval);
    }
  }, [autoRefreshEnabled, refreshInterval]);

  useEffect(() => {
    if (!autoRefreshEnabled) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          onRefresh();
          return refreshInterval;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onRefresh, refreshInterval, autoRefreshEnabled]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  // Actualizamos la función para convertir a Date si es necesario
  const formatTimeLastUpdated = (date) => {
    if (!date) return 'Never';
    let d = date;
    if (!(d instanceof Date)) {
      d = new Date(date);
    }
    if (isNaN(d.getTime())) return 'Invalid Date';
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleManualRefresh = () => {
    onRefresh();
    if (autoRefreshEnabled) {
      setTimeLeft(refreshInterval);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg w-fit max-w-md p-4 flex flex-col items-center gap-2 h-fit">
      <button
        onClick={handleManualRefresh}
        className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
      >
        <FiRefreshCw className="text-xl" />
      </button>
      <span className="text-gray-700 text-sm font-medium">
        Last updated: {formatTimeLastUpdated(lastUpdated)}
      </span>
      {autoRefreshEnabled ? (
        <span className="text-gray-500 text-xs">
          Next refresh in: {formatTime(timeLeft)}
        </span>
      ) : (
        <span className="text-gray-500 text-xs">Auto refresh is disabled</span>
      )}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="autoRefresh"
          checked={autoRefreshEnabled}
          onChange={() => setAutoRefreshEnabled((prev) => !prev)}
        />
        <label htmlFor="autoRefresh" className="text-gray-700 text-sm font-medium">
          Auto Refresh
        </label>
      </div>
    </div>
  );
}

RefreshCard.propTypes = {
  lastUpdated: PropTypes.any,
  onRefresh: PropTypes.func.isRequired,
  refreshInterval: PropTypes.number.isRequired,
};

export default RefreshCard;
