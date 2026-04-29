import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

/**
 * 代码编辑器组件（只读展示）
 * @param {string} code 代码内容
 * @param {string} language 语言类型
 */
function CodeEditor({ code, language }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className="h-full flex flex-col bg-[#1d1f21]">
      {/* 编辑器头部 */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#32363f] border-b border-outline/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80"></div>
            <div className="w-3 h-3 rounded-full bg-[#27ca40] opacity-80"></div>
          </div>
          <span className="font-label text-[10px] text-outline uppercase tracking-wider ml-2">
            {language || 'code'}
          </span>
        </div>
        <span className="material-symbols-outlined text-outline text-sm">code</span>
      </div>
      
      {/* 代码区域 */}
      <div className="flex-1 overflow-auto p-4">
        <pre className="!bg-transparent !p-0 !m-0 text-sm font-mono leading-relaxed">
          <code 
            ref={codeRef} 
            className={`language-${language || 'javascript'}`}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
