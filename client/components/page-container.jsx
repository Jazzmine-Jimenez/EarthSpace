import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div className="container post-container mx-auto mt-5 pt-4">
      {children}
    </div>
  );
}
