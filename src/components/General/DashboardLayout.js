// src/components/Layout.js
import React from 'react';
import Sidebar from './sidebar'; 
import Header from './Header';

function DashboardLayout({ title, showBuildingNum, transparent = false, children }) {
  return (
    <>
      {/* si quieres un "header" estático, con un título dinámico */}
      <Header centerText={title} showBuildingNum={showBuildingNum} transparent={transparent} />
      <main className="mt-20">
        {children}
      </main>
    </>
  );
}

export default DashboardLayout;