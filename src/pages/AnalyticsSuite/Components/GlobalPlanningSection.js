import React from 'react';
import BaseSectionComponent from './BaseSectionComponent';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite/AnalyticsSuite_service';

const GlobalPlanningSection = ({ onBack, isAdmin, data = [], onDataUpdate, loading }) => {
  const predefinedOptions = [
    'Corporate SC Scorecard *New',
    'Line of Balance',
    'Schedule Attainment',
    'Global - Inventory Aging Dashboard',
    'STR Dashboard - ION Hub',
    'Clear to Build',
    'Behavior Based Safety',
    'Co2 Emission Tracker - New',
    'Network Study',
    'DC Safety'
  ];

  // Función para mapear nombres de opciones a nombres de archivos
  const getImageFileName = (optionName) => {
    const mapping = {
      'Corporate SC Scorecard *New': 'CorporatedSCScored',
      'Line of Balance': 'LineofBalance',
      'Schedule Attainment': 'ScheduleAttainment',
      'Global - Inventory Aging Dashboard': 'GlobalInventoryAgingDashboard',
      'STR Dashboard - ION Hub': 'STRDashboard',
      'Clear to Build': 'CleartoBuild',
      'Behavior Based Safety': 'BehaviorBasedSafety',
      'Co2 Emission Tracker - New': 'Co2EmissionTracker',
      'Network Study': 'NetworkStudy',
      'DC Safety': 'DCSafety'
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
      sectionName="Global Planning & ESH"
      sectionDescription="Global Planning and Environment, Safety & Health"
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

export default GlobalPlanningSection;