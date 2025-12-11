// Components/BaseSectionComponent.js
import React from 'react';
import { useDashboardManager } from '../hooks/useDashboardManager';
import DashboardGrid from './DashboardGrid';
import EditUrlModal from './EditUrlModal';
import CreateDashboardModal from './CreateDashboardModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const BaseSectionComponent = ({ 
  sectionName, 
  predefinedOptions = [], 
  onBack, 
  isAdmin, 
  data = [], 
  onDataUpdate, 
  loading,
  useDatabase = false
}) => {
  const {
    modalOpen,
    createModalOpen,
    deleteModalOpen,
    currentOption,
    dashboardToDelete,
    newUrl,
    setNewUrl,
    newDashboardName,
    setNewDashboardName,
    newDashboardUrl,
    setDashboardUrl,
    isSubmitting,
    getOptionsWithUrls,
    handleOptionClick,
    openModal,
    closeModal,
    saveUrl,
    openCreateModal,
    closeCreateModal,
    createDashboard,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete
  } = useDashboardManager(sectionName, data, useDatabase, onDataUpdate);

  const options = getOptionsWithUrls(predefinedOptions);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-300 border-t-slate-700 mb-4"></div>
        <h2 className="text-2xl font-semibold text-slate-700">Loading {sectionName}...</h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="bg-gradient-to-r from-slate-700 to-slate-800 text-white font-medium px-6 py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105">
          ← Back to BI Options
        </button>

        {isAdmin && useDatabase && (
          <button onClick={openCreateModal} className="bg-gradient-to-r from-green-600 to-green-700 text-white font-medium px-6 py-3 rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2">
            <span className="text-xl">+</span>
            Add New Dashboard
          </button>
        )}
      </div>

      <h2 className="text-4xl font-bold text-slate-800 mb-6">{sectionName}</h2>

      {/* Grid */}
      <DashboardGrid
        options={options}
        isAdmin={isAdmin}
        useDatabase={useDatabase}
        onOptionClick={handleOptionClick}
        onEditClick={openModal}
        onDeleteClick={openDeleteModal}
        onCreateClick={openCreateModal}
      />

      {/* Modals */}
      <EditUrlModal isOpen={modalOpen} currentOption={currentOption} newUrl={newUrl} setNewUrl={setNewUrl} isSubmitting={isSubmitting} onSave={saveUrl} onClose={closeModal} />
      <CreateDashboardModal isOpen={createModalOpen} sectionName={sectionName} dashboardName={newDashboardName} setDashboardName={setNewDashboardName} dashboardUrl={newDashboardUrl} setDashboardUrl={setDashboardUrl} isSubmitting={isSubmitting} onCreate={createDashboard} onClose={closeCreateModal} />
      <DeleteConfirmationModal isOpen={deleteModalOpen} dashboard={dashboardToDelete} isSubmitting={isSubmitting} onConfirm={confirmDelete} onClose={closeDeleteModal} />
    </div>
  );
};

export default BaseSectionComponent;