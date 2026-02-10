
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-slate-50 shadow-2xl relative overflow-hidden md:max-w-none md:bg-white">
      {/* Mobile-centric header */}
      <header className="sticky top-0 z-50 bg-indigo-600 text-white p-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">
            S
          </div>
          <h1 className="text-lg font-bold tracking-tight">SmartResume</h1>
        </div>
        <div className="text-xs opacity-80 font-medium bg-indigo-500 px-2 py-1 rounded">
          Fresher Edition
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>
      
      {/* Decorative background blobs (Desktop Only) */}
      <div className="hidden lg:block absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="hidden lg:block absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
    </div>
  );
};
