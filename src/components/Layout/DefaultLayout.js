import React from 'react';

export default function DefaultLayout({ children }) {
  return (
    <div >
      <div className="h-[60px]">DefaultLayout</div>
      {children}
    </div>
  );
}
