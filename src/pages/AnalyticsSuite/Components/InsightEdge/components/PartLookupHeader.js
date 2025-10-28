import React from 'react';
import te_logo from '../../../../../assets/te_logo.png'

/**
 * Header component for Part Lookup
 */
const PartLookupHeader = () => {
  return (

    <div>
      <div className="sticky top-0 flex items-center h-[60px] w-full bg-white px-5 box-border z-10 mb-8">
          <img src={te_logo} alt='company logo' className="h-full w-[120px] m-0"></img>
          <h1 className="absolute left-1/2 -translate-x-1/2 m-0 text-[#f28d00] text-4xl font-bold">
                InsighTEdge
          </h1>
      </div>
    </div>
    
  );
};

export default PartLookupHeader;