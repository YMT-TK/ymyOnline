/**
 * 页脚组件
 * 包含版权信息、链接和操作按钮
 */
export default function Footer(){
  return (
    <footer className="w-full relative overflow-hidden border-t border-cyan-950 bg-[#0d0e13] z-50">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-4">
        <div className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-slate-500 opacity-80 hover:opacity-100">
          © 2025 Personal Portfolio 
        </div>
        {/* <div className="flex items-center gap-8">
          <a
            className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-slate-500 hover:text-purple-400 transition-all duration-300"
            href="#"
          >
            TERMINAL
          </a>
          <a
            className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-slate-500 hover:text-purple-400 transition-all duration-300"
            href="#"
          >
            FEEDBACK
          </a>
          <a
            className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-slate-500 hover:text-purple-400 transition-all duration-300 flex items-center gap-2"
            href="#"
          >
            <span className="w-1.5 h-1.5 bg-tertiary rounded-full"></span>
            STATUS
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors cursor-pointer">
            share
          </span>
          <span className="material-symbols-outlined text-slate-500 hover:text-primary transition-colors cursor-pointer">
            settings
          </span>
        </div> */}
      </div>
    </footer>
  );
}