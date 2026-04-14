/**
 * 宽屏反向布局项目卡片组件
 */
function ProjectCardWideReversed({ project }) {
  return (
    <article className="md:col-span-12 group">
      <div className="glass-card flex flex-col md:flex-row min-h-[400px]">
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-4">
            {project.isOptimized && (
              <span className="font-label text-[10px] text-tertiary uppercase tracking-[0.2em] bg-tertiary/10 px-2 py-1">
                Optimized_Module
              </span>
            )}
          </div>
          <h3 className="font-headline text-4xl font-bold mb-6">
            {project.title}
          </h3>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            {project.description}
          </p>
          {project.techStack && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {project.techStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">
                    {tech.icon}
                  </span>
                  <span className="font-label text-xs text-on-surface uppercase tracking-wider">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-4">
            <a
              className="px-6 py-3 bg-white text-black font-label font-bold text-xs tracking-widest uppercase hover:bg-primary-fixed transition-colors"
              href={project.sourceUrl}
            >
              EXPLORE_SOURCE
            </a>
            <a
              className="px-6 py-3 border border-outline-variant hover:border-primary font-label text-xs tracking-widest uppercase transition-colors"
              href={project.logsUrl}
            >
              PROJECT_LOGS
            </a>
          </div>
        </div>
        <div className="md:w-1/2 relative overflow-hidden bg-surface-container-low min-h-[300px]">
          <img
            alt={project.imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
            src={project.image}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-high via-transparent to-transparent"></div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCardWideReversed;
