import React from 'react';
import BaseSectionComponent from './BaseSectionComponent';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite_service';

const GlobalFreightSection = ({ onBack, isAdmin, data = [], onDataUpdate, loading }) => {
  const predefinedOptions = [
    'Status 5 (Awaiting pickup)',
    'Status 7 (Awaiting Departure)', 
    'Freight Forward Dashboard',
    'Transportation Transit Time Performance',
    'Air Parcel Optimization',
    'Air Freight Weight Optimization',
    'Freight Analytics - MTO/MTS',
    'ASR Performance Tracker',
    'Monthly freight dashboard',
    'E2E Transportation Dashboard'
  ];

  // Función para mapear nombres de opciones a nombres de archivos
  const getImageFileName = (optionName) => {
    const mapping = {
      'Status 5 (Awaiting pickup)': 'Status5',
      'Status 7 (Awaiting Departure)': 'Status7',
      'Freight Forward Dashboard': 'FreightForwardDashboard',
      'Transportation Transit Time Performance': 'TransportationTransitTimePerformance',
      'Air Parcel Optimization': 'AirParcelOptimization',
      'Air Freight Weight Optimization': 'AirFreightWeightOptimization',
      'Freight Analytics - MTO/MTS': 'FreightAnalytics',
      'ASR Performance Tracker': 'ASRPerformanceTracker',
      'Monthly freight dashboard': null, // No tiene imagen aún
      'E2E Transportation Dashboard': null // No tiene imagen aún
    };
    
    return mapping[optionName];
  };

  // Función para generar la URL de la imagen usando el service centralizado
  const getImageUrl = (optionName) => {
    const fileName = getImageFileName(optionName);
    if (!fileName) return null;
    
    // Usa el service centralizado
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
      sectionName="Global Freight"
      sectionDescription="Global Freight Management and Analytics"
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

export default GlobalFreightSection;