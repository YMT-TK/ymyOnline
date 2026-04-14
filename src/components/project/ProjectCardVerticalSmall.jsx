/**
 * 垂直小型项目卡片组件
 */
function ProjectCardVerticalSmall({ project }) {
  return (
    <article className="md:col-span-4 group">
      <div className="glass-card h-full flex flex-col border-t-0 border-r-2 border-r-secondary/20">
        <div className="h-64 bg-surface-container-low relative overflow-hidden">
          <img
            alt={project.imageAlt}
            className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000"
            src={project.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/90 to-transparent"></div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="font-headline text-2xl font-bold mb-4">
            {project.title}
          </h3>
          <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
            {project.description}
          </p>
          {project.codeSnippet && (
            <div className="bg-surface-container-lowest p-4 font-mono text-[10px] text-tertiary/60 mb-6 border-l-2 border-tertiary">
              <code dangerouslySetInnerHTML={{ __html: project.codeSnippet.replace(/\n/g, '<br/>') }} />
            </div>
          )}
          <div className="mt-auto space-y-4">
            <div className="w-full bg-outline-variant h-1 overflow-hidden">
              <div className="bg-secondary h-full" style={{ width: `${project.completion}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-label uppercase tracking-widest text-outline">
              <span>Completion</span>
              <span>{project.completion}%</span>
            </div>
            <a
              className="block text-center py-3 border border-outline-variant hover:bg-secondary hover:text-on-secondary transition-all font-label text-xs tracking-widest uppercase"
              href={project.docUrl}
            >
              VIEW_DOCUMENTATION
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCardVerticalSmall;
