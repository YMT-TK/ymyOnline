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
          Personal Portfolio
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
            网站集
          </Link>
          <Link
            to="/projects"
            className={`font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs transition-colors duration-300 ${
              isActive('/projects')
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            项目集
          </Link>
          <Link
            to="/collections"
            className={`font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs transition-colors duration-300 ${
              isActive('/collections')
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1'
                : 'text-slate-400 hover:text-cyan-200'
            }`}
          >
            收藏集
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/YMT-TK"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <button className="font-['Space_Grotesk'] uppercase tracking-[0.1em] text-xs bg-primary-container text-on-primary-fixed px-6 py-2 rounded-sm hover:glow-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-500 scale-95 hover:scale-100">
            明着的天空
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
