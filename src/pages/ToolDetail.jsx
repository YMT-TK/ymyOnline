import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadToolInfo, loadToolCode } from '../utils/loadTools';
import FileTree from '../components/collections/FileTree';
import CodeEditor from '../components/collections/CodeEditor';

/**
 * 工具详情页面
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

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const info = await loadToolInfo(id);
        if (info && info.files && info.files.length > 0) {
          setToolInfo(info);
          setActiveFile(info.files[0].path);
          const firstCode = await loadToolCode(id, info.files[0].path);
          setCode(firstCode);
        } else {
          setToolInfo(info);
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
    if (iframeRef.current) {
      setTimeout(() => iframeRef.current.focus(), 100);
    }
  }, [toolInfo]);

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
          <div className="inline-block w-8 h-8 border-4 border-tertiary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-label text-tertiary tracking-widest uppercase">Loading...</p>
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
            className="px-6 py-3 bg-tertiary/20 text-tertiary rounded-lg hover:bg-tertiary/30 transition-colors font-label uppercase tracking-wider"
          >
            返回收藏夹
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dark bg-background text-on-surface h-screen flex flex-col overflow-hidden">
      {/* 头部导航 */}
      <header className="flex items-center gap-4 px-6 py-3 bg-surface-container-high border-b border-outline/10 z-50 flex-shrink-0">
        <button
          onClick={() => navigate('/collections')}
          className="flex items-center gap-2 px-4 py-2 bg-tertiary/20 text-tertiary rounded-lg hover:bg-tertiary/30 transition-colors"
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
              isDragging ? 'bg-tertiary' : 'bg-outline/20 hover:bg-tertiary/50'
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
