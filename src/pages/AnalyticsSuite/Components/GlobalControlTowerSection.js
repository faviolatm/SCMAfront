import React from 'react';
import BaseSectionComponent from './BaseSectionComponent';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite/AnalyticsSuite_service';

const GlobalControlTowerSection = ({ onBack, isAdmin, data = [], onDataUpdate, loading }) => {
  const predefinedOptions = [
    'ETA Status Change',
    'ETA Status for Parcel',
    'GR Lags',
    'Container Utilization Fill Rate',
    'Cost per KG Analysis',
    'Demurrage and Detention',
    'Premium Freight'
  ];

  // Función para mapear nombres de opciones a nombres de archivos
  const getImageFileName = (optionName) => {
    const mapping = {
      'ETA Status Change': 'EtaStatusChange',
      'ETA Status for Parcel': 'ETAStatusForParcel',
      'GR Lags': 'GRLags',
      'Container Utilization Fill Rate': 'ContainerUtilizationFillRate',
      'Cost per KG Analysis': 'CostperKGAnalysis',
      'Demurrage and Detention': 'DemurrageAndDetention',
      'Premium Freight': 'PremiumFreight',
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
      sectionName="Global Control Tower"
      sectionDescription="Global Supply Chain Control Tower Analytics"
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

export default GlobalControlTowerSection;
