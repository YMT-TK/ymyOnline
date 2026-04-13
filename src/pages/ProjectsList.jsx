import Navigation from "@/components/layout/Navigation"
import { projectsData } from '../data/projectsData';
import Footer from "@/components/layout/Footer"
import ProjectCard from "@/components/project/ProjectCard"
/**
 * 项目列表页面
 * 展示所有项目的网格布局
 */
export default function ProjectsList(){
  return(
    <div className="dark bg-background text-on-surface font-body selection:bg-primary-container/30 min-h-screen">
      {/* 顶部导航  */}
      <Navigation />

      {/* 主要内容  */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* 头部区域  */}
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-12 h-[1px] bg-secondary"></span>
            <span className="font-label text-secondary text-[10px] tracking-[0.3em] uppercase">
              Project Center
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6">
            项目档案<span className="text-primary-fixed">集</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
            精心挑选的一系列技术应用,研究了高性能架构以及沉浸式数据可视化的项目
          </p>
        </header>

        {/* 状态HUD  */}
        <div className="fixed right-8 top-32 hidden xl:flex flex-col gap-4 z-40">
          <div className="glass-card p-4 flex flex-col gap-2 border-l-2 border-l-primary shadow-lg">
            <div className="flex justify-between items-center gap-8">
              <span className="font-label text-[10px] text-primary tracking-widest uppercase">
                系统状态
              </span>
              <span className="flex h-2 w-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(167,255,179,0.5)]"></span>
            </div>
            <div className="font-label text-[10px] text-outline uppercase">
              项目数: 1
            </div>
            {/* <div className="font-label text-[10px] text-outline uppercase">
              运行时间: 99.98%
            </div> */}
          </div>
        </div>

        {/* 项目网格  */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {
            projectsData.map((project)=>(
              <ProjectCard key={project.id} project={project} />
            ))
          }
        </div>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  )
}