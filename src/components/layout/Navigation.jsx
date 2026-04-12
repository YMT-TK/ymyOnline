import { Link, useLocation } from 'react-router-dom';

/**
 * 顶部导航栏组件
 * 包含Logo、导航链接和简历按钮
 */
function Navigation() {
  const location = useLocation();
  
  /**
   * 检查导航链接是否激活
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d0e13]/80 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_0_20px_rgba(0,238,252,0.1)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tighter text-cyan-400 font-headline">
          KINETIC_HORIZON
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/websites"
            className={`font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs transition-colors duration-300 ${
              isActive('/websites')
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            WEBSITES
          </Link>
          <Link
            to="/projects"
            className={`font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs transition-colors duration-300 ${
              isActive('/projects')
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            PROJECTS
          </Link>
          <a
            className="font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs text-slate-400 hover:text-cyan-200 transition-colors duration-300"
            href="#"
          >
            EXPERIENCE
          </a>
          <a
            className="font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs text-slate-400 hover:text-cyan-200 transition-colors duration-300"
            href="#"
          >
            LABS
          </a>
          <a
            className="font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs text-slate-400 hover:text-cyan-200 transition-colors duration-300"
            href="#"
          >
            CONTACT
          </a>
        </div>
        <button className="font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs bg-primary-container text-on-primary-fixed px-6 py-2 rounded-sm hover:glow-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-500 scale-95 hover:scale-100">
          RESUME
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
