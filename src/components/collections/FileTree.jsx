/**
 * 文件树组件
 * @param {Array} files 文件列表
 * @param {string} activeFile 当前选中的文件
 * @param {Function} onFileSelect 文件选择回调
 */
function FileTree({ files, activeFile, onFileSelect }) {
  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.jsx') || fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) return 'typescript';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.json')) return 'json';
    return 'file';
  };

  return (
    <div className="bg-surface-container-low border-r border-outline/10 h-full overflow-y-auto">
      <div className="p-3 border-b border-outline/10">
        <div className="flex items-center gap-2 text-tertiary">
          <span className="material-symbols-outlined text-sm">folder_open</span>
          <span className="font-label text-[10px] uppercase tracking-wider">文件列表</span>
        </div>
      </div>
      <div className="p-2">
        {files && files.map((file) => (
          <button
            key={file.path}
            onClick={() => onFileSelect(file.path)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left transition-all duration-200 group ${
              activeFile === file.path
                ? 'bg-tertiary/20 text-tertiary border-l-2 border-tertiary'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface border-l-2 border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100">
              {activeFile === file.path ? 'description' : 'description'}
            </span>
            <span className="font-body text-xs truncate flex-1">
              {file.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FileTree;
