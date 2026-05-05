import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';

/**
 * 仓库类型内容组件
 * @param {string} readmeUrl Markdown 文档的远程 URL
 * @param {string} repoUrl 仓库地址 URL
 * @param {string} title 工具标题（用于备用内容显示）
 * @param {string} description 工具描述（用于备用内容显示）
 */
function RepositoryContent({ readmeUrl, repoUrl, title, description }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadReadme = async () => {
    if (!readmeUrl) {
      setError('文档地址未配置');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 使用 AbortController 实现超时控制
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时

      const response = await fetch(readmeUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'text/plain',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();
      setContent(text);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load README:', err);
      
      // 判断错误类型
      if (err.name === 'AbortError') {
        setError('加载超时，请检查网络连接');
      } else if (err.message.includes('Failed to fetch')) {
        setError('网络连接失败，请检查网络设置');
      } else {
        setError(err.message || '加载失败，请稍后重试');
      }
      
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadReadme();
  }, [readmeUrl]);

  // 处理重试（指数退避策略）
  const handleRetry = () => {
    if (retryCount < 3) {
      const newCount = retryCount + 1;
      setRetryCount(newCount);
      const delay = 1000 * Math.pow(2, newCount - 1); // 1s, 2s, 4s
      
      setTimeout(() => {
        loadReadme();
      }, delay);
    }
  };

  // 加载中状态
  if (loading) {
    return <LoadingSkeleton />;
  }

  // 错误状态
  if (error) {
    return (
      <ErrorState
        error={error}
        onRetry={handleRetry}
        canRetry={retryCount < 3}
        retryCount={retryCount}
        repoUrl={repoUrl}
      />
    );
  }

  // 如果内容为空
  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">description</span>
        <p className="font-headline text-xl text-outline mb-2">文档为空</p>
        <p className="text-sm text-on-surface-variant">该文档暂无内容</p>
      </div>
    );
  }

  // 从 readmeUrl 提取基础路径（用于转换相对图片路径）
  const getBaseUrl = () => {
    if (!readmeUrl) return '';
    const lastSlash = readmeUrl.lastIndexOf('/');
    return lastSlash > 0 ? readmeUrl.substring(0, lastSlash + 1) : '';
  };

  // 转换相对路径为绝对 URL
  const resolveImageUrl = (src) => {
    if (!src) return src;
    
    // 如果已经是绝对 URL，直接返回
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      return src;
    }
    
    // 如果是协议相对 URL（//开头）
    if (src.startsWith('//')) {
      return 'https:' + src;
    }
    
    // 相对路径，转换为绝对 URL
    const baseUrl = getBaseUrl();
    
    // 移除开头的 ./ 或 /
    let relativePath = src;
    if (relativePath.startsWith('./')) {
      relativePath = relativePath.substring(2);
    } else if (relativePath.startsWith('/')) {
      // 对于以 / 开头的路径，需要特殊处理
      // 这种情况通常是相对于仓库根目录
      // 例如 /images/logo.png 应该转换为完整路径
      relativePath = relativePath.substring(1);
      // 需要从 readmeUrl 中提取仓库根目录
      const match = readmeUrl.match(/^(https:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\/)/);
      if (match) {
        return match[1] + relativePath;
      }
    }
    
    return baseUrl + relativePath;
  };

  // 成功状态 - 渲染 Markdown 内容
  return (
    <div className="markdown-body animate-fade-in p-12 overflow-y-auto h-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义链接打开方式
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-fixed hover:text-primary hover:underline"
            >
              {children}
            </a>
          ),
          // 自定义图片样式（自动转换相对路径）
          img: ({ src, alt }) => (
            <img
              src={resolveImageUrl(src)}
              alt={alt}
              className="rounded-lg my-4"
              loading="lazy"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default RepositoryContent;