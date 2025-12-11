// Components/DynamicSection.js
import React from 'react';
import BaseSectionComponent from './BaseSectionComponent';

// ==================== CONFIGURACIÓN DE SECCIONES ====================

const SECTIONS_CONFIG = {
  'DC Management': {
    name: 'DC Management',
    description: 'Distribution Center Management Analytics'
  },
  'Global Freight': {
    name: 'Global Freight',
    description: 'Global Freight Management and Analytics'
  },
  'DC Quality & Operations': {
    name: 'DC Quality & Operations',
    description: 'Distribution Center Quality and Operations Analytics'
  },
  'Freight Audit & Pay (FAP)': {
    name: 'Freight Audit & Pay (FAP)',
    description: 'Freight Audit and Payment Management'
  },
  'Global Control Tower': {
    name: 'Global Control Tower',
    description: 'Global Supply Chain Control Tower Analytics'
  },
  'Global Planning & ESH': {
    name: 'Global Planning & ESH',
    description: 'Global Planning and Environment, Safety & Health'
  }
};

// ==================== COMPONENTE ====================

const DynamicSection = ({ sectionName, onBack, isAdmin, data = [], onDataUpdate, loading }) => {
  // Obtener config de la sección o usar valores por defecto
  const config = SECTIONS_CONFIG[sectionName] || {
    name: sectionName,
    description: `${sectionName} Analytics`
  };
  
  return (
    <BaseSectionComponent
      sectionName={config.name}
      sectionDescription={config.description}
      predefinedOptions={[]}
      onBack={onBack}
      isAdmin={isAdmin}
      data={data}
      onDataUpdate={onDataUpdate}
      loading={loading}
      useDatabase={true}
    />
  );
};

export default DynamicSection;
