/**
 * 统计项目卡片组件
 */
function ProjectCardStat({ project }) {
  return (
    <article className="md:col-span-6 group">
      <div className="glass-card overflow-hidden h-full flex flex-col md:flex-row">
        <div className="p-10 flex-grow">
          <h3 className="font-headline text-3xl font-bold mb-4">
            {project.title}
          </h3>
          <p className="text-on-surface-variant text-sm mb-8">
            {project.description}
          </p>
          {project.stats && (
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <div className="text-2xl font-bold font-headline text-secondary">
                  {project.stats.seekTime}
                </div>
                <div className="font-label text-[10px] text-outline uppercase tracking-widest">
                  Seek Time
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold font-headline text-secondary">
                  {project.stats.scaling}
                </div>
                <div className="font-label text-[10px] text-outline uppercase tracking-widest">
                  Scaling
                </div>
              </div>
            </div>
          )}
          <div className="mt-10">
            <a
              className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary transition-all font-label text-[10px] tracking-widest uppercase inline-block"
              href={project.githubUrl}
            >
              GITHUB_ACCESS
            </a>
          </div>
        </div>
        <div className="md:w-1/3 bg-surface-container-highest flex items-center justify-center p-8">
          <span className="material-symbols-outlined text-7xl text-secondary opacity-30">
            {project.icon}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCardStat;
