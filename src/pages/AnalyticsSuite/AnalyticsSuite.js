// pages/AnalyticsSuite/AnalyticsSuite.js
import React, { useState } from 'react';
import { useAnalytics } from './hooks/useAnalytics';
import Loader from '../../components/General/Loader';
import DynamicSection from './Components/DynamicSection';
import MainCard from './Components/MainCard';
import BIOptionCard from './Components/PrincipalCards/BIOptionCard';
import AIOptionCard from './Components/PrincipalCards/AIOptionCard';
import ContactModal from './Components/PrincipalCards/ContactModal';
import ErrorMessage from './Components/ErrorMessage';
import BackButton from './Components/BackButton';

const AnalyticsSuite = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  
  const {
    currentView,
    currentSection,
    biOptions,
    aiOptions,
    isAdmin,
    analyticsData,
    loading,
    error,
    handleAIClick,
    handleBIClick,
    handleBIOptionClick,
    handleAIOptionClick,
    handleBackToMain,
    handleBackToBIOptions,
    handleBackToAIOptions,
    handleDataUpdate
  } = useAnalytics();

  // ==================== RENDER SECTION ====================
  
  const renderSection = () => {
    if (!currentSection) {
      return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
          <BackButton onClick={handleBackToBIOptions}>Back to BI Options</BackButton>
          <div className="text-center p-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 inline-block">
              <h3 className="text-yellow-800 font-semibold mb-2">Section Not Found</h3>
              <p className="text-yellow-600">The requested section could not be found</p>
            </div>
          </div>
        </div>
      );
    }

    if (loading && analyticsData.length === 0) {
      return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
          <BackButton onClick={handleBackToBIOptions}>Back to BI Options</BackButton>
          <div className="mt-20"><Loader /></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
          <BackButton onClick={handleBackToBIOptions}>Back to BI Options</BackButton>
          <ErrorMessage error={error} onRetry={handleDataUpdate} />
        </div>
      );
    }

    return (
      <DynamicSection
        sectionName={currentSection}
        onBack={handleBackToBIOptions}
        isAdmin={isAdmin}
        data={analyticsData}
        onDataUpdate={handleDataUpdate}
        loading={loading}
      />
    );
  };

  // ==================== RENDER ====================

  if (currentView === 'section') {
    return renderSection();
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      {currentView === 'main' ? (
        <>
          <div className="text-center mb-12">
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Choose your analytics platform to access powerful insights and data-driven solutions
            </p>
          </div>

          <div className="flex gap-8 justify-center items-center flex-wrap">
            <MainCard title="AI" subtitle="Artificial Intelligence & Machine Learning Solutions" imageKey="ai" onClick={handleAIClick} />
            <MainCard title="BI" subtitle="Business Intelligence & Data Analytics Platform" imageKey="bi" onClick={handleBIClick} />
            <MainCard title="Contact" subtitle="Get Support & Technical Assistance" imageKey="contact" onClick={() => setShowContactModal(true)} />
          </div>

          <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
        </>
      ) : currentView === 'bi' ? (
        <div>
          <div className="mb-12">
            <BackButton onClick={handleBackToMain}>Back to Main</BackButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {biOptions.map((option) => (
              <BIOptionCard key={option.name} option={option} onClick={handleBIOptionClick} />
            ))}
          </div>
        </div>
      ) : currentView === 'ai' ? (
        <div>
          <div className="mb-12">
            <BackButton onClick={handleBackToMain}>Back to Main</BackButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {aiOptions.map((option) => (
              <AIOptionCard key={option.name} option={option} onClick={handleAIOptionClick} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AnalyticsSuite;