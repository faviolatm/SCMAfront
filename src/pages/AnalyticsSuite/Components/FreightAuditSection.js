import React from 'react';
import BaseSectionComponent from './BaseSectionComponent';

const FreightAuditSection = ({ onBack, isAdmin, data = [], onDataUpdate, loading }) => {
  const predefinedOptions = [
    'FAP Non-compliance',
    'Payment Blocks',
    'FAP KPI Dashboard',
    'Automatch Performance',
    'Credit Note',
    'Invoice on hold'
  ];

  return (
    <BaseSectionComponent
      sectionName="Freight Audit & Pay (FAP)"
      sectionDescription="Freight Audit and Payment Management"
      predefinedOptions={predefinedOptions}
      onBack={onBack}
      isAdmin={isAdmin}
      data={data}
      onDataUpdate={onDataUpdate}
      loading={loading}
      useDatabase={true} // Cambié a true para que sea editable
    />
  );
};

export default FreightAuditSection;