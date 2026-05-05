import { useNavigate } from 'react-router-dom';

/**
 * 错误状态组件
 * @param {string} error 错误信息
 * @param {Function} onRetry 重试回调
 * @param {boolean} canRetry 是否可以重试
 * @param {number} retryCount 当前重试次数
 * @param {string} repoUrl 仓库地址（用于跳转到源站）
 */
function ErrorState({ error, onRetry, canRetry = true, retryCount = 0, repoUrl }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      {/* 错误图标 */}
      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-error">cloud_off</span>
      </div>

      {/* 错误标题 */}
      <h2 className="text-xl font-headline font-bold text-on-surface mb-2">文档加载失败</h2>

      {/* 错误详情 */}
      <p className="text-sm text-on-surface-variant mb-4 text-center max-w-md">
        {error || '无法连接到远程文档，请检查网络或文档地址是否正确'}
      </p>

      {/* 错误类型判断 */}
      <div className="bg-surface-container-low p-4 rounded-lg mb-6 max-w-md w-full">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-primary-fixed mt-0.5">info</span>
          <div className="text-sm">
            <p className="font-medium text-on-surface mb-1">可能原因：</p>
            <ul className="text-on-surface-variant space-y-1">
              <li>• 网络连接不稳定</li>
              <li>• 文档地址已变更或删除</li>
              <li>• GitHub 服务暂时不可用</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={onRetry}
          disabled={!canRetry}
          className={`px-6 py-3 rounded-lg font-label uppercase tracking-wider transition-all ${
            canRetry 
              ? 'bg-primary-fixed text-on-primary-fixed hover:bg-primary cursor-pointer' 
              : 'bg-surface-container-low text-outline cursor-not-allowed'
          }`}
        >
          {canRetry ? `重试 (${3 - retryCount}次)` : '已达最大重试次数'}
        </button>

        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-label uppercase tracking-wider bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            在 GitHub 查看
          </a>
        )}

        <button
          onClick={() => navigate('/collections')}
          className="px-6 py-3 rounded-lg font-label uppercase tracking-wider bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          返回收藏夹
        </button>
      </div>
    </div>
  );
}

export default ErrorState;