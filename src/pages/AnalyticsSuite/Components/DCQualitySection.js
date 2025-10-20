import React from 'react';
import BaseSectionComponent from './BaseSectionComponent';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite/AnalyticsSuite_service';

const DCQualitySection = ({ onBack, isAdmin, data = [], onDataUpdate, loading }) => {
  const predefinedOptions = [
    'Quality Holdings Dashboard',
    'CoPQ Dashboard', 
    'Quality CPS Dashboard',
    'Fast Response',
    'GLOG Official Complaints Reporting'
  ];

  // Función para mapear nombres de opciones a nombres de archivos (sin espacios)
  const getImageFileName = (optionName) => {
    const mapping = {
      'Quality Holdings Dashboard': 'QualityHoldingsDashboard',
      'CoPQ Dashboard': 'CoPQDashboard',
      'Quality CPS Dashboard': 'QualityCPSDashboard',
      'Fast Response': 'FastResponse',
      'GLOG Official Complaints Reporting': 'GLOGOfficialComplaintsReporting'
    };
    
    return mapping[optionName];
  };

  // Función para generar la URL de la imagen usando el service centralizado
  const getImageUrl = (optionName) => {
    const fileName = getImageFileName(optionName);
    if (!fileName) return null;
    return AnalyticsSuiteService.buildUrl(`/global/images/${fileName}.webp`);
  };

  // Crear las opciones enriquecidas con las URLs de imágenes
  const enrichedOptions = predefinedOptions.map(option => ({
    name: option,
    imageUrl: getImageUrl(option),
    hasImage: getImageFileName(option) !== null
  }));

  return (
    <BaseSectionComponent
      sectionName="DC Quality & Operations"
      sectionDescription="Distribution Center Quality and Operations Analytics"
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

export default DCQualitySection;