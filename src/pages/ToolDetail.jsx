import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadToolInfo, loadToolCode } from '../utils/loadTools';
import FileTree from '../components/collections/FileTree';
import CodeEditor from '../components/collections/CodeEditor';
import RepositoryContent from '../components/repository/RepositoryContent';

/**
 * 工具详情页面
 * 支持两种类型：code（代码编辑器+预览）和 repository（Markdown文档）
 */
function ToolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toolInfo, setToolInfo] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fileTreeVisible, setFileTreeVisible] = useState(true);
  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  // 判断工具类型：默认为 code 类型
  const toolType = toolInfo?.type || 'code';
  const isRepository = toolType === 'repository';

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const info = await loadToolInfo(id);
        
        if (!info) {
          setToolInfo(null);
          setLoading(false);
          return;
        }

        setToolInfo(info);

        // 只有 code 类型才需要加载文件
        if (info.type !== 'repository' && info.files && info.files.length > 0) {
          setActiveFile(info.files[0].path);
          const firstCode = await loadToolCode(id, info.files[0].path);
          setCode(firstCode);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, [id]);

  useEffect(() => {
    if (iframeRef.current && !isRepository) {
      setTimeout(() => iframeRef.current.focus(), 100);
    }
  }, [toolInfo, isRepository]);

  const handleFileSelect = async (filePath) => {
    setActiveFile(filePath);
    const newCode = await loadToolCode(id, filePath);
    setCode(newCode);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const totalWidth = rect.width;
        const newLeftWidth = ((e.clientX - rect.left) / totalWidth) * 100;
        if (newLeftWidth >= 20 && newLeftWidth <= 80) {
          setLeftWidth(newLeftWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const getLanguage = (fileName) => {
    if (!fileName) return 'javascript';
    if (fileName.endsWith('.jsx')) return 'jsx';
    if (fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.tsx')) return 'tsx';
    if (fileName.endsWith('.ts')) return 'typescript';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.html')) return 'html';
    return 'javascript';
  };

  const focusIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.focus();
    }
  };

  if (loading) {
    return (
      <div className="dark bg-background text-on-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary-fixed border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-label text-primary-fixed tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  if (!toolInfo) {
    return (
      <div className="dark bg-background text-on-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">error</span>
          <p className="font-headline text-xl text-outline mb-6">工具不存在</p>
          <button
            onClick={() => navigate('/collections')}
            className="px-6 py-3 bg-primary-fixed/20 text-primary-fixed rounded-lg hover:bg-primary-fixed/30 transition-colors font-label uppercase tracking-wider"
          >
            返回收藏夹
          </button>
        </div>
      </div>
    );
  }

  // 仓库类型（Markdown 文档）
  if (isRepository) {
    return (
      <div className="dark bg-background text-on-surface h-screen flex flex-col overflow-hidden">
        {/* 头部导航 */}
        <header className="flex items-center gap-4 px-6 py-3 bg-surface-container-high border-b border-outline/10 z-50 flex-shrink-0">
          <button
            onClick={() => navigate('/collections')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-fixed/20 text-primary-fixed rounded-lg hover:bg-primary-fixed/30 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="font-label text-xs uppercase tracking-wider">返回</span>
          </button>
          
          <div className="flex-1">
            <h1 className="font-headline text-xl font-bold text-on-surface">
              {toolInfo.title}
            </h1>
            <p className="font-body text-xs text-on-surface-variant">
              {toolInfo.description}
            </p>
          </div>

          {/* GitHub 链接按钮 */}
          {toolInfo.repoUrl && (
            <a
              href={toolInfo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface-variant rounded-lg hover:bg-surface-container-highest transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-label text-xs uppercase tracking-wider hidden md:inline">GitHub</span>
            </a>
          )}
        </header>

        {/* Markdown 内容区域 */}
        <div className="flex-1 overflow-hidden bg-surface-dim">
          <RepositoryContent
            readmeUrl={toolInfo.readmeUrl}
            repoUrl={toolInfo.repoUrl}
            title={toolInfo.title}
            description={toolInfo.description}
          />
        </div>
      </div>
    );
  }

  // 代码类型（代码编辑器 + 预览）
  return (
    <div className="dark bg-background text-on-surface h-screen flex flex-col overflow-hidden">
      {/* 头部导航 */}
      <header className="flex items-center gap-4 px-6 py-3 bg-surface-container-high border-b border-outline/10 z-50 flex-shrink-0">
        <button
          onClick={() => navigate('/collections')}
          className="flex items-center gap-2 px-4 py-2 bg-primary-fixed/20 text-primary-fixed rounded-lg hover:bg-primary-fixed/30 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="font-label text-xs uppercase tracking-wider">返回</span>
        </button>
        
        <div className="flex-1">
          <h1 className="font-headline text-xl font-bold text-on-surface">
            {toolInfo.title}
          </h1>
          <p className="font-body text-xs text-on-surface-variant">
            {toolInfo.description}
          </p>
        </div>

        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="flex items-center gap-2 px-4 py-2 bg-surface-container-low text-on-surface-variant rounded-lg hover:bg-surface-container-highest transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            {isFullScreen ? 'fullscreen_exit' : 'fullscreen'}
          </span>
          <span className="font-label text-xs uppercase tracking-wider hidden md:inline">
            {isFullScreen ? '退出全屏' : '全屏预览'}
          </span>
        </button>
      </header>

      {/* 主内容区 */}
      {!isFullScreen ? (
        <div ref={containerRef} className="flex-1 flex overflow-hidden">
          {/* 左侧代码区域 */}
          <div style={{ width: `${leftWidth}%` }} className="h-full flex flex-col overflow-hidden">
            <div className="flex h-full">
              {/* 文件列表侧边栏 */}
              <div 
                style={{ 
                  width: fileTreeVisible ? '200px' : '0px', 
                  flexShrink: 0, 
                  overflow: 'hidden',
                  transition: 'width 0.3s ease'
                }}
              >
                <div style={{ width: '200px' }} className="h-full">
                  <FileTree
                    files={toolInfo.files}
                    activeFile={activeFile}
                    onFileSelect={handleFileSelect}
                  />
                </div>
              </div>
              
              {/* 折叠/展开按钮 */}
              <button
                onClick={() => setFileTreeVisible(!fileTreeVisible)}
                className="w-6 bg-surface-container-low hover:bg-surface-container-high border-r border-outline/10 flex items-center justify-center transition-colors flex-shrink-0"
                title={fileTreeVisible ? '隐藏文件树' : '显示文件树'}
              >
                <span className="material-symbols-outlined text-outline text-sm">
                  {fileTreeVisible ? 'chevron_left' : 'chevron_right'}
                </span>
              </button>
              
              {/* 代码编辑器区域 */}
              <div className="flex-1 h-full min-w-0 overflow-hidden">
                <CodeEditor
                  code={code}
                  language={getLanguage(activeFile)}
                />
              </div>
            </div>
          </div>

          {/* 拖拽分割线 */}
          <div
            onMouseDown={handleMouseDown}
            className={`w-1.5 cursor-col-resize flex items-center justify-center transition-colors flex-shrink-0 ${
              isDragging ? 'bg-primary-fixed' : 'bg-outline/20 hover:bg-primary-fixed/50'
            }`}
          >
            <div className="w-0.5 h-8 bg-outline/30 rounded"></div>
          </div>

          {/* 右侧预览区域 */}
          <div 
            style={{ width: `${100 - leftWidth}%` }} 
            className="bg-white h-full overflow-hidden"
            onClick={focusIframe}
          >
            <iframe
              ref={iframeRef}
              src={`/tools/${id}/public/index.html`}
              className="w-full h-full border-none"
              title={toolInfo.title}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden" onClick={focusIframe}>
          <iframe
            ref={iframeRef}
            src={`/tools/${id}/public/index.html`}
            className="w-full h-full border-none"
            title={toolInfo.title}
          />
        </div>
      )}
    </div>
  );
}

export default ToolDetail;