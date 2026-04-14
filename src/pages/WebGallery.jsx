import Navigation from "@/components/layout/Navigation"
import { websitesData } from '../data/websitesData';
// import SystemHUD from "@/components/shared/SystemHUD"
import Footer from "@/components/layout/Footer"
import { useState } from "react";
/**
 * 网页效果列表页面
 */
export default function WebGallery(){
  const [activeFilter, setActiveFilter] = useState('全部');
  const filters = ['全部', '实验', '企业', '3D/WEBGL'];
  return(
    <div className="dark bg-background text-on-surface font-body selection:bg-primary-container/30 min-h-screen">
      {/* 动态背景  */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid animate-grid-flow"></div>
        <div className="scanline-overlay animate-scanline"></div>
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full opacity-30"></div>
      </div>

      {/* 顶部导航 */}
      <Navigation />

      {/* 主要内容 */}
      <main className="relative pt-24 pb-20 min-h-screen z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Header & Filter Bar */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in-up">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-label tracking-[0.2em] uppercase animate-pulse">
                Active Database // Artifacts
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-on-surface">
                网站<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-dim">艺术展</span>
              </h1>
            </div>
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 p-1 bg-surface-container-low rounded-lg border border-outline-variant/10">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 text-xs font-label uppercase tracking-widest transition-all duration-300 transform active:scale-95 relative overflow-hidden group ${
                    activeFilter === filter
                      ? 'bg-primary text-on-primary-container shadow-[0_0_15px_rgba(0,238,252,0.3)]'
                      : 'text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded'
                  }`}
                >
                  <span className="relative z-10">[{filter}]</span>
                  {activeFilter !== filter && (
                    <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  )}
                </button>
              ))}
            </div>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
            {websitesData.map((artifact) => (
              <WebArtifact key={artifact.id} artifact={artifact} />
            ))}
          </div>
        </div>
      </main>

      {/* 状态 HUD */}
      {/* <SystemHUD /> */}

      {/* 页脚 */}
      <Footer />
    </div>
  )
}