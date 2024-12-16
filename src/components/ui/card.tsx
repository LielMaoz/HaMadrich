import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 ${className || ''}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<{ title: string; className?: string }> = ({ title, className }) => (
  <div className={`p-4 border-b border-gray-200 bg-gray-100 ${className || ''}`}>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`p-4 ${className || ''}`}>{children}</div>
);

export const CardTitle: React.FC<{ title: string; className?: string }> = ({ title, className }) => (
  <h2 className={`text-xl font-bold text-gray-900 ${className || ''}`}>{title}</h2>
);
