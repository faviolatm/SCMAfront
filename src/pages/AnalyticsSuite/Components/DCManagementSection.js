import React from 'react';
import BaseSectionComponent from './BaseSectionComponent';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite_service';

const DCManagementSection = ({ onBack, isAdmin, data = [], onDataUpdate, loading }) => {
  const predefinedOptions = [
    'Logistics Management System',
    'New EPDC Tier 3 Dashboard', 
    'PADC Tier 3 Dashboard',
    'HLDC Tier 3 Dashboard',
    'Outbound Revenue',
    'Performance Tracker',
    'DCMS Daily/Monthly KPI',
    'GLOG Aging Inventory',
    'DC Receiving Variance',
    'DCMS Non-Compliance Scorecard'
  ];

  // Función para mapear nombres de opciones a nombres de archivos
  const getImageFileName = (optionName) => {
    const mapping = {
      'Logistics Management System': 'LogisticsManagementSystem',
      'New EPDC Tier 3 Dashboard': 'NewEPDCTier3Dashboard',
      'PADC Tier 3 Dashboard': 'PADCTier3Dashboard',
      'HLDC Tier 3 Dashboard': 'HLDCTier3Dashboard',
      'Outbound Revenue': 'OutboundRevenue',
      'Performance Tracker': 'PerformanceTracker',
      'DCMS Daily/Monthly KPI': 'DCMSDaily/MonthlyKPI',
      'GLOG Aging Inventory': 'GLOGAgingInventory',
      'DC Receiving Variance': 'DCReceivingVariance',
      'DCMS Non-Compliance Scorecard': 'DCMSNon-ComplianceScorecard'
    };
    
    return mapping[optionName];
  };

  // Función para generar la URL de la imagen usando el service centralizado
  const getImageUrl = (optionName) => {
    const fileName = getImageFileName(optionName);
    if (!fileName) return null;
    return AnalyticsSuiteService.buildUrl(`/analytics/images/${fileName}.webp`);
  };

  // Crear las opciones enriquecidas con las URLs de imágenes
  const enrichedOptions = predefinedOptions.map(option => ({
    name: option,
    imageUrl: getImageUrl(option),
    hasImage: getImageFileName(option) !== null
  }));

  return (
    <BaseSectionComponent
      sectionName="DC Management"
      sectionDescription="Distribution Center Management Analytics"
      predefinedOptions={enrichedOptions}
      onBack={onBack}
      isAdmin={isAdmin}
      data={data}
      onDataUpdate={onDataUpdate}
      loading={loading}
      useDatabase={true}
    />
  );
};

export default DCManagementSection;