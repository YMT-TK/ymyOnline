import { Link } from "react-router-dom";
/**
 * 功能网格组件
 * 展示三个功能模块卡片
 */

export default function FeatureGrid(){
  return(
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl relative z-20">
      {/* 网页模块  */}
      <Link to="/websites" className="group relative overflow-hidden glass-panel bg-surface-container-high/60 p-8 rounded-lg transition-all duration-500 hover:bg-surface-container-highest/80 hover:scale-[1.02] cursor-pointer">
        <div className="absolute top-0 right-0 p-4">
          <span class="material-symbols-outlined text-primary-fixed/30 group-hover:text-primary-fixed transition-colors">language</span>
        </div>
        <div className="mb-12">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-sm mb-4 border border-primary/20 group-hover:border-primary transition-all duration-500">
            <span className="material-symbols-outlined text-primary-fixed">web</span>
          </div>
          <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-2">
            网页模块
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            网站: 精心选择的绚丽页面及非凡的交互效果.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-label text-[10px] text-primary tracking-widest uppercase">
            01 // 收藏夹
          </span>
          <span className="material-symbols-outlined text-sm text-primary animate-pulse">
            arrow_forward
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
      </Link>

      {/* 项目模块  */}
      <Link to="/projects" className="group relative overflow-hidden glass-panel bg-surface-container-high/60 p-8 rounded-lg transition-all duration-500 hover:bg-surface-container-highest/80 hover:scale-[1.02] cursor-pointer">
        <div className="absolute top-0 right-0 p-4">
          <span className="material-symbols-outlined text-secondary/30 group-hover:text-secondary transition-colors">
            terminal
          </span>
        </div>
        <div className="mb-12">
          <div className="w-12 h-12 flex items-center justify-center bg-secondary/10 rounded-sm mb-4 border border-secondary/20 group-hover:border-secondary transition-all duration-500">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              rocket_launch
            </span>
          </div>
          <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-2">
            项目模块
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            项目: 深入研究软件架构以及实验性项目.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-label text-[10px] text-secondary tracking-widest uppercase">
            02 // 工作区
          </span>
          <span className="material-symbols-outlined text-sm text-secondary animate-pulse">
            bolt
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-secondary group-hover:w-full transition-all duration-700 ease-out"></div>
      </Link>
      
      {/* 待定模块  */}
      <div className="group relative overflow-hidden glass-panel bg-surface-container-low/30 p-8 rounded-lg transition-all duration-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 cursor-not-allowed">
        <div className="absolute top-0 right-0 p-4">
          <span className="material-symbols-outlined text-outline/30">lock</span>
        </div>
        <div className="mb-12">
          <div className="w-12 h-12 flex items-center justify-center bg-outline/10 rounded-sm mb-4 border border-outline/20">
            <span className="material-symbols-outlined text-outline">hourglass_empty</span>
          </div>
          <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface mb-2">
            待定
          </h3>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            待定: 即将开展新的内容模块
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-label text-[10px] text-outline tracking-widest uppercase">
            03 // 待定
          </span>
          <span className="material-symbols-outlined text-sm text-outline">sensors</span>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-outline group-hover:w-full transition-all duration-700 ease-out"></div>
      </div>
    </div>
  )
}