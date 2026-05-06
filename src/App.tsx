/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  FileCode,
  LayoutDashboard,
  BrainCircuit,
  History,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { analysisSpringCode, RefactorResult } from './services/refactorService';

const SPRING_GREEN = "#6DB33F";
const DARK_BG = "#0D0D0D";
const CARD_BG = "#1A1A1A";

export default function App() {
  const [code, setCode] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [result, setResult] = useState<RefactorResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'analysis' | 'refactored'>('editor');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (res) => {
        setCode(res.target?.result as string);
        setActiveTab('editor');
        setResult(null);
      };
      reader.readAsText(file);
    }
  };

  const handleRefactor = async () => {
    if (!code) return;
    setIsAnalyzing(true);
    const res = await analysisSpringCode(code, fileName || "App.java");
    setResult(res);
    setIsAnalyzing(false);
    setActiveTab('analysis');
  };

  const reset = () => {
    setCode("");
    setFileName("");
    setResult(null);
    setActiveTab('editor');
  };

  return (
    <div className="relative h-screen w-full bg-[#050508] text-slate-200 font-sans flex flex-col overflow-hidden">
      {/* Mesh Gradient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Top Navigation */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-slate-900 shadow-lg shadow-emerald-500/20">S4</div>
          <span className="font-semibold tracking-tight text-lg flex items-center gap-2">
            SpringRefactor <span className="text-emerald-400 text-[10px] font-mono uppercase px-1.5 py-0.5 border border-emerald-400/30 rounded bg-emerald-400/5">Agent v4.2</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            connected: {fileName || "idle shadow instance"}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleRefactor}
              disabled={!code || isAnalyzing}
              className="px-4 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-xs font-bold transition-all disabled:opacity-30 flex items-center gap-2"
            >
              {isAnalyzing ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
              {isAnalyzing ? "Analyzing..." : "Refactor"}
            </button>
            <button 
              onClick={reset}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-xs font-medium transition-all"
            >
              New Project
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4 z-10 relative">
        
        {/* Sidebar: File Explorer */}
        <aside className="w-64 hidden xl:flex flex-col gap-4">
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <LayoutDashboard size={12} /> Project Explorer
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-slate-300 px-2 py-1">
                  <FileCode size={14} className="text-slate-500" />
                  src/main/java
                </div>
                <div className="pl-6 space-y-2">
                  <div className={`flex items-center gap-2 text-sm px-2 py-1.5 rounded transition-colors cursor-pointer ${fileName ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 hover:bg-white/5'}`}>
                    <Code2 size={14} />
                    {fileName || "example_controller.java"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 opacity-60 px-2">
                    <Code2 size={14} />
                    LegacyService.java
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300 border-t border-white/5 pt-4 px-2">
                <Settings size={14} className="text-slate-500" />
                pom.xml
              </div>
            </div>
          </div>

          <div className="h-32 bg-emerald-500/5 backdrop-blur-lg border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Compliance</span>
              <span className="text-xs text-emerald-400 font-mono">84%</span>
            </div>
            <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                className="bg-emerald-400 h-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
              ></motion.div>
            </div>
            <p className="text-[9px] text-slate-500 mt-3 leading-relaxed italic">Your application is nearing full Spring Boot 4 compliance.</p>
          </div>
        </aside>

        {/* Center: Agent Interface */}
        <section className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
            
            {/* Session Info Bar */}
            <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,1)]'}`}></div>
                <span className="text-xs font-semibold tracking-wide text-slate-400">SESSION: {isAnalyzing ? 'ANALYZING...' : 'IDLE'}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-4">
                <span>MODEL: GEMINI-3-FLASH</span>
                <span className="opacity-30">|</span>
                <span>TOKEN USAGE: 1.2k / 1M</span>
              </div>
            </div>
            
            {/* Scrollable Workspace */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {!code ? (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-6 border border-emerald-500/20 shadow-xl shadow-emerald-500/5 group">
                    <Upload className="text-emerald-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Spring Boot 4 Migrator</h2>
                  <p className="text-slate-400 max-w-sm text-sm leading-relaxed mb-8">
                    Upload your legacy Spring code for a comprehensive AI-driven refactoring & Spring AI modernization.
                  </p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    accept=".java,.xml"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl font-bold transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
                  >
                    Select Legacy File
                  </button>
                </div>
              ) : (
                <div className="flex flex-col min-h-full">
                  {/* Tabs */}
                  <div className="flex items-center px-4 pt-1 bg-white/5 border-b border-white/5 gap-2 sticky top-0 z-10 backdrop-blur-md">
                    <TabButton active={activeTab === 'editor'} onClick={() => setActiveTab('editor')} label="Legacy" icon={<Code2 size={13} />} />
                    {result && (
                      <>
                        <TabButton active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} label="Analysis" icon={<BrainCircuit size={13} />} />
                        <TabButton active={activeTab === 'refactored'} onClick={() => setActiveTab('refactored')} label="SB4 Refactored" icon={<Sparkles size={13} />} />
                      </>
                    )}
                  </div>

                  <div className="flex-1 relative p-8">
                    <AnimatePresence mode="wait">
                      {activeTab === 'editor' && (
                        <motion.div 
                          key="editor"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="font-mono text-xs md:text-sm leading-relaxed pl-12 relative"
                        >
                          <CodeLineNumbers content={code} />
                          <div className="text-slate-400 whitespace-pre">{code}</div>
                        </motion.div>
                      )}

                      {activeTab === 'analysis' && result && (
                        <motion.div 
                          key="analysis"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="markdown-body"
                        >
                          <Markdown>{result.analysis}</Markdown>
                        </motion.div>
                      )}

                      {activeTab === 'refactored' && result && (
                        <motion.div 
                          key="refactored"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="font-mono text-xs md:text-sm leading-relaxed pl-12 relative"
                        >
                          <CodeLineNumbers content={result.refactoredCode} />
                          <div className="text-emerald-400 whitespace-pre">{result.refactoredCode}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Input Overlay */}
            <div className="p-4 bg-black/40 border-t border-white/10">
              <div className="relative flex items-center max-w-4xl mx-auto w-full">
                <input 
                  type="text" 
                  placeholder="Ask the refactoring agent about specific patterns..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all placeholder:text-slate-600 block"
                />
                <button className="absolute right-2 p-2 bg-emerald-500 text-slate-900 rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 active:scale-95">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Insights Panel */}
        <section className="w-80 hidden lg:flex flex-col gap-4">
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex justify-between items-center bg-white/5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Migrator Diff</span>
              {result && <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">PROPOSED</span>}
            </div>
            
            <div className="flex-1 p-5 font-mono text-[10px] leading-relaxed overflow-hidden flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-600 uppercase text-[8px] font-bold tracking-tighter">Security Scan</span>
                  <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                    <CheckCircle2 size={12} />
                    <span>No OAuth vulnerabilities found.</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-slate-600 uppercase text-[8px] font-bold tracking-tighter">AI Integration</span>
                  <div className="flex items-center gap-2 text-blue-400 bg-blue-500/5 p-2 rounded-lg border border-blue-500/10">
                    <BrainCircuit size={12} />
                    <span>Spring AI VectorStore ready.</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <Cpu className="mx-auto text-emerald-400 mb-2" size={24} />
                <p className="text-[10px] font-medium text-slate-300">GraalVM Native Build</p>
                <p className="text-[9px] text-slate-500 mt-1">Ready for AOT compilation tests.</p>
              </div>
            </div>
            
            <div className="p-4 grid grid-cols-2 gap-3 bg-black/40 border-t border-white/10">
              <button disabled={!result} className="py-2.5 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold rounded-xl border border-white/10 text-slate-400 transition-colors disabled:opacity-30">DISCARD</button>
              <button disabled={!result} className="py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-[10px] font-bold rounded-xl shadow-xl shadow-emerald-500/10 transition-colors disabled:opacity-30">APPLY FIX</button>
            </div>
          </div>
          
          <div className="h-40 bg-indigo-500/5 backdrop-blur-lg border border-indigo-500/20 rounded-2xl p-5 flex flex-col justify-center items-center text-center shadow-lg group hover:border-indigo-400/30 transition-all cursor-help">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 border border-indigo-500/20 ring-4 ring-indigo-500/5">
              <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
            </div>
            <p className="text-xs font-bold text-slate-200 tracking-wide uppercase">AI Deep Scan</p>
            <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">Search through thousands of Spring AI patterns for the best refactor.</p>
          </div>
        </section>

      </main>

      {/* Bottom Status Bar */}
      <footer className="h-8 border-t border-white/10 px-6 flex items-center justify-between text-[10px] text-slate-500 bg-white/5 backdrop-blur-md z-20">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div> v18.0 (NG)</div>
          <span className="opacity-20">|</span>
          <div className="flex items-center gap-1.5 uppercase font-bold tracking-tighter">Spring AI 1.0.0-M1</div>
          <span className="opacity-20">|</span>
          <div className="flex items-center gap-1.5">JVM 23 (HOTSPOT)</div>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-emerald-400/80 uppercase font-bold"><RefreshCw size={10} /> Sync: Complete</span>
          <div className="flex items-center gap-2">
             <span className="opacity-40">EN</span>
             <span className="opacity-40 font-mono tracking-widest text-[#6DB33F] text-[8px] bg-[#6DB33F]/10 px-2 rounded">UTF-8</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TabButton({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon: any }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-10 py-3 border-b-2 transition-all font-bold text-[10px] uppercase tracking-[0.2em] relative group ${active ? 'border-emerald-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
    >
      <span className={`${active ? 'text-emerald-400' : 'text-slate-500'}`}>{icon}</span>
      {label}
      {active && <div className="absolute inset-x-0 bottom-[-2px] h-[2px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]"></div>}
    </button>
  );
}

function CodeLineNumbers({ content }: { content: string }) {
  const lines = content.split('\n').length;
  return (
    <div className="absolute left-0 top-0 bottom-0 w-10 shrink-0 flex flex-col items-center py-0 text-slate-700 select-none pointer-events-none font-mono text-[10px]">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-[1.62em] flex items-center tabular-nums">{i + 1}</div>
      ))}
    </div>
  );
}
