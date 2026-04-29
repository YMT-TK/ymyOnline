import { Link } from "react-router-dom";

/**
 * 工具卡片组件
 * @param {Object} tool 工具数据
 */
function ToolCard({ tool }) {
  return (
    <Link 
      to={`/tool/${tool.id}`} 
      className="group relative overflow-hidden glass-panel bg-surface-container-high/60 p-6 rounded-lg transition-all duration-500 hover:bg-surface-container-highest/80 hover:scale-[1.02] cursor-pointer"
    >
      <div className="absolute top-0 right-0 p-4">
        <span className="material-symbols-outlined text-tertiary/30 group-hover:text-tertiary transition-colors">
          build
        </span>
      </div>
      
      <div className="mb-8">
        <div className="w-10 h-10 flex items-center justify-center bg-tertiary/10 rounded-sm mb-4 border border-tertiary/20 group-hover:border-tertiary transition-all duration-500">
          <span className="material-symbols-outlined text-tertiary">extension</span>
        </div>
        <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface mb-2 group-hover:text-tertiary transition-colors">
          {tool.title}
        </h3>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-label tracking-wider uppercase rounded">
            {tool.category}
          </span>
          {tool.tags && tool.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-outline/10 text-outline text-[10px] font-label tracking-wider rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline/10">
        <span className="font-label text-[10px] text-tertiary tracking-widest uppercase">
          {tool.createdAt}
        </span>
        <span className="material-symbols-outlined text-sm text-tertiary animate-pulse">
          arrow_forward
        </span>
      </div>
      
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-tertiary group-hover:w-full transition-all duration-700 ease-out"></div>
    </Link>
  );
}

export default ToolCard;
