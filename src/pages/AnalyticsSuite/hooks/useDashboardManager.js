// hooks/useDashboardManager.js
import { useState } from 'react';
import AnalyticsDashboardService from '../../../services/AnalyiticsDashboards/Analytics_dashboards';

export const useDashboardManager = (sectionName, data, useDatabase, onDataUpdate) => {
  // ==================== STATE ====================
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const [dashboardToDelete, setDashboardToDelete] = useState(null);
  const [newUrl, setNewUrl] = useState('');
  const [newDashboardName, setNewDashboardName] = useState('');
  const [newDashboardUrl, setNewDashboardUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==================== HELPERS ====================
  
  const getOptionsWithUrls = (predefinedOptions) => {
    if (!useDatabase) {
      return predefinedOptions.map(option => ({
        name: typeof option === 'object' ? option.name : option,
        url: '',
        imageUrl: typeof option === 'object' ? option.imageUrl : null,
        hasImage: typeof option === 'object' ? option.hasImage : false
      }));
    }

    const dataArray = Array.isArray(data) ? data : [];
    
    return dataArray.map(item => ({
      name: item.option_name,
      url: item.url || '',
      imageUrl: item.image_url,
      hasImage: item.has_image,
      id: item.id
    }));
  };

  // ==================== NAVIGATION ====================

  const handleOptionClick = (option) => {
    if (option.url) {
      window.open(option.url, '_blank');
    } else if (useDatabase) {
      openModal(option);
    }
  };

  // ==================== EDIT ====================

  const openModal = (option) => {
    setCurrentOption(option);
    setNewUrl(option.url || '');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentOption(null);
    setNewUrl('');
    setIsSubmitting(false);
  };

  const saveUrl = async () => {
    if (!currentOption || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const success = await AnalyticsDashboardService.updateUrl(
        sectionName, 
        currentOption.name, 
        newUrl
      );
      
      if (success) {
        alert(`✅ URL ${newUrl ? 'configured' : 'removed'} successfully!`);
        if (typeof onDataUpdate === 'function') await onDataUpdate();
        closeModal();
      } else {
        alert('❌ Failed to update URL. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error updating URL:', error);
      alert('❌ Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  // ==================== CREATE ====================

  const openCreateModal = () => {
    setNewDashboardName('');
    setNewDashboardUrl('');
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setNewDashboardName('');
    setNewDashboardUrl('');
    setIsSubmitting(false);
  };

  const createDashboard = async () => {
    if (!newDashboardName.trim() || !newDashboardUrl.trim()) {
      alert('❌ Please fill in both dashboard name and URL');
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await AnalyticsDashboardService.createDashboard(
        sectionName,
        newDashboardName.trim(),
        newDashboardUrl.trim()
      );

      if (result) {
        alert('✅ Dashboard created successfully!');
        if (typeof onDataUpdate === 'function') await onDataUpdate();
        closeCreateModal();
      } else {
        alert('❌ Failed to create dashboard. It may already exist.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating dashboard:', error);
      alert('❌ Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  // ==================== DELETE ====================

  const openDeleteModal = (option) => {
    setDashboardToDelete(option);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDashboardToDelete(null);
  };

  const confirmDelete = async () => {
    if (!dashboardToDelete) return;
    setIsSubmitting(true);

    try {
      const success = await AnalyticsDashboardService.deleteDashboard(
        sectionName,
        dashboardToDelete.name
      );

      if (success) {
        alert('✅ Dashboard deleted successfully!');
        if (typeof onDataUpdate === 'function') await onDataUpdate();
        closeDeleteModal();
      } else {
        alert('❌ Failed to delete dashboard');
      }
    } catch (error) {
      console.error('Error deleting dashboard:', error);
      alert('❌ Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== RETURN ====================

  return {
    // State
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
    setDashboardUrl: setNewDashboardUrl,
    isSubmitting,
    
    // Helpers
    getOptionsWithUrls,
    
    // Handlers
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
  };
};