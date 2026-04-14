/**
 * 大型特色项目卡片组件
 */
export default function ProjectCardLargeFeatured({project}){
  return (
    <article className="md:col-span-8 group">
      
      <div className="glass-card relative overflow-hidden h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden bg-surface-container-low">
          <img
            alt={project.imageAlt}
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            src={project.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high to-transparent"></div>
          <div className="absolute top-6 left-6 flex gap-2">
            {project.isLive && (
              <span className="px-3 py-1 bg-primary/20 backdrop-blur-md text-primary font-label text-[10px] tracking-widest uppercase border border-primary/30">
                Deployment_Live
              </span>
            )}
          </div>
        </div>
        <div className="p-8 flex-grow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-headline text-3xl font-bold mb-2">
                {project.title}
              </h3>
              <div className="flex gap-4">
                <span className="font-label text-[10px] text-outline uppercase">
                  Type: {project.type}
                </span>
                <span className="font-label text-[10px] text-outline uppercase">
                  Year: {project.year}
                </span>
              </div>
            </div>
            <a
              className="p-3 bg-surface-container-highest border border-outline-variant hover:border-primary text-primary transition-all duration-300"
              href={project.liveUrl}
            >
              <span className="material-symbols-outlined text-2xl">terminal</span>
            </a>
          </div>
          <p className="text-on-surface-variant mb-8 leading-relaxed max-w-xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-surface-container-low text-on-surface-variant font-label text-xs uppercase border border-outline-variant hover:border-secondary transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 mt-auto">
            <a
              className="px-8 py-3 bg-primary text-on-primary font-label font-bold text-xs tracking-widest uppercase hover:glow-cyan-500/40 transition-all flex items-center gap-2"
              href={project.liveUrl}
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              VIEW_LIVE_DEPLOYMENT
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label text-xs tracking-widest uppercase"
              href={project.githubUrl}
            >
              <span className="material-symbols-outlined text-sm">code</span>
              GITHUB_REPO
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}