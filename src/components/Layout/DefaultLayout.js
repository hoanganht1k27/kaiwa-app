import React from 'react';

export default function DefaultLayout({ children }) {
  return (
    <div>
      <h1>DefaultLayout</h1>
      {children}
    </div>
  );
}