
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ResumeUploader } from './components/ResumeUploader';
import { AnalysisResult } from './components/AnalysisResult';
import { AppStatus, ResumeAnalysis } from './types';
import { analyzeResume } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('IDLE');
  const [result, setResult] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (content: string | { base64: string, mimeType: string }) => {
    setStatus('ANALYZING');
    setError(null);
    try {
      const data = await analyzeResume(content);
      setResult(data);
      setStatus('RESULT');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong during analysis.');
      setStatus('IDLE');
    }
  };

  const reset = () => {
    setStatus('IDLE');
    setResult(null);
    setError(null);
  };

  return (
    <Layout>
      {status === 'IDLE' && (
        <ResumeUploader onAnalyze={handleAnalyze} isLoading={false} />
      )}

      {status === 'ANALYZING' && (
        <div className="flex flex-col items-center justify-center py-32 px-10 text-center animate-in fade-in duration-500">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-600">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Gemini is thinking...</h2>
          <p className="text-slate-500 text-sm">Extracting skills and matching roles for your career.</p>
          
          <div className="mt-12 w-full max-w-xs space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 bg-slate-200 rounded-full w-full animate-pulse" style={{ opacity: 1 - (i * 0.2), animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
        </div>
      )}

      {status === 'RESULT' && result && (
        <AnalysisResult data={result} onReset={reset} />
      )}

      {error && (
        <div className="fixed bottom-24 left-4 right-4 bg-rose-100 border border-rose-200 p-4 rounded-xl text-rose-700 text-sm flex items-start gap-3 shadow-lg animate-in slide-in-from-bottom-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="font-bold">Analysis Failed</p>
            <p>{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-600">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      )}

      {/* Floating Action (IDLE only) */}
      {status === 'IDLE' && (
        <div className="fixed bottom-6 left-0 right-0 px-6 flex justify-center">
          <div className="glass-card flex items-center gap-4 px-6 py-3 rounded-full shadow-xl border border-white/50">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i + 10}/32/32`} className="w-8 h-8 rounded-full border-2 border-white" alt="user" />
              ))}
            </div>
            <p className="text-xs font-medium text-slate-700">1,200+ Freshers analyzed today</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
