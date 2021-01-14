import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div className="container post-container mx-auto">
      {children}
    </div>
  );
}
