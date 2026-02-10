
import React, { useRef, useState } from 'react';

interface Props {
  onAnalyze: (data: string | { base64: string, mimeType: string }) => void;
  isLoading: boolean;
}

export const ResumeUploader: React.FC<Props> = ({ onAnalyze, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileType, setFileType] = useState<'text' | 'file'>('file');
  const [inputText, setInputText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        onAnalyze({ base64, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    } else {
      const text = await file.text();
      onAnalyze(text);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Build Your Future</h2>
        <p className="text-slate-500 text-sm">Upload your resume and let Gemini optimize your career path.</p>
      </div>

      <div className="flex gap-2 p-1 bg-slate-200 rounded-xl mb-6">
        <button 
          onClick={() => setFileType('file')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${fileType === 'file' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'}`}
        >
          Upload File
        </button>
        <button 
          onClick={() => setFileType('text')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${fileType === 'text' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'}`}
        >
          Paste Text
        </button>
      </div>

      {fileType === 'file' ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFile(e.dataTransfer.files[0]); }}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400'}`}
        >
          <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept=".txt,.pdf,image/*" />
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <p className="text-slate-700 font-medium">Click or drag resume</p>
          <p className="text-slate-400 text-xs mt-1">Supports Image, TXT, PDF</p>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your resume content here..."
            className="w-full h-64 p-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-sm transition-all resize-none"
          />
          <button 
            disabled={!inputText.trim() || isLoading}
            onClick={() => onAnalyze(inputText)}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            Analyze Now
          </button>
        </div>
      )}

      <div className="mt-12">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-widest">Why use SmartResume?</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-indigo-600 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs font-bold text-slate-700">Skill Detection</p>
            <p className="text-[10px] text-slate-500">Find hidden talents.</p>
          </div>
          <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="text-emerald-600 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.061-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.061l1.06-1.061zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.061 1.06l1.06 1.061zM5.404 6.464a.75.75 0 001.06-1.06l-1.061-1.06a.75.75 0 00-1.06 1.061l1.06 1.06z" />
              </svg>
            </div>
            <p className="text-xs font-bold text-slate-700">Role Matching</p>
            <p className="text-[10px] text-slate-500">Perfect job fits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
