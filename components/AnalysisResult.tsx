
import React from 'react';
import { ResumeAnalysis } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface Props {
  data: ResumeAnalysis;
  onReset: () => void;
}

export const AnalysisResult: React.FC<Props> = ({ data, onReset }) => {
  const chartData = [
    { name: 'Score', value: data.score },
    { name: 'Gap', value: 100 - data.score },
  ];

  const COLORS = ['#4f46e5', '#e2e8f0'];

  return (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Score Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-6">
        <div className="w-24 h-24 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={30}
                outerRadius={45}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-800">{data.score}</span>
            <span className="text-[8px] uppercase text-slate-400 font-bold">Score</span>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Analysis Complete</h2>
          <p className="text-sm text-slate-500 leading-tight line-clamp-2">{data.summary}</p>
        </div>
      </div>

      {/* Suggested Jobs */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-indigo-500">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          Top Job Matches
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {data.suggestedJobs.map((job, idx) => (
            <div key={idx} className="flex-shrink-0 w-64 bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-indigo-600 text-xs font-bold px-2 py-1 bg-white rounded-md">
                  {job.matchPercentage}% Match
                </span>
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-1">{job.title}</h4>
              <p className="text-xs text-indigo-700 leading-relaxed">{job.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Improvements */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Improvement Checklist</h3>
        <div className="space-y-4">
          {data.improvements.map((imp, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">{imp.category}</p>
                <p className="text-sm text-slate-800">{imp.suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Radar */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Skill Matrix</h3>
        <div className="grid grid-cols-2 gap-3">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm font-bold text-slate-800 mb-1">{skill.name}</p>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${skill.level === 'Advanced' ? 'bg-indigo-600 w-full' : skill.level === 'Intermediate' ? 'bg-indigo-400 w-2/3' : 'bg-indigo-300 w-1/3'}`}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-medium">{skill.level}</p>
            </div>
          ))}
        </div>
      </section>

      <button 
        onClick={onReset}
        className="w-full py-4 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all"
      >
        Upload Another Resume
      </button>
    </div>
  );
};
