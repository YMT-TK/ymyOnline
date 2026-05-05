/**
 * 加载骨架屏组件
 * 显示文档加载时的占位符
 */
function LoadingSkeleton() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto p-12">
      {/* 标题区域 */}
      <div className="mb-8">
        <div className="h-10 bg-surface-container-low rounded-lg w-2/3 mb-4 skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-1/2 skeleton-pulse"></div>
      </div>

      {/* 内容区域 - 第一段 */}
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-surface-container-low rounded w-full skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-11/12 skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-4/5 skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-3/4 skeleton-pulse"></div>
      </div>

      {/* 子标题区域 */}
      <div className="h-6 bg-surface-container-low rounded w-1/3 mb-4 skeleton-pulse"></div>

      {/* 内容区域 - 第二段 */}
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-surface-container-low rounded w-full skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-5/6 skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-full skeleton-pulse"></div>
      </div>

      {/* 代码块区域 */}
      <div className="h-48 bg-surface-container-low rounded-lg border border-outline/10 mb-8">
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary-fixed/30 border-t-primary-fixed rounded-full animate-spin"></div>
            <span className="font-label text-sm text-on-surface-variant">解析中...</span>
          </div>
        </div>
      </div>

      {/* 列表区域 */}
      <div className="space-y-3">
        <div className="h-4 bg-surface-container-low rounded w-1/4 mb-4 skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-full skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-11/12 skeleton-pulse"></div>
        <div className="h-4 bg-surface-container-low rounded w-3/4 skeleton-pulse"></div>
      </div>

      {/* 底部占位 */}
      <div className="h-32 mt-8"></div>
    </div>
  );
}

export default LoadingSkeleton;