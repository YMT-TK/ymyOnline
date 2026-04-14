/**
 * 中型项目卡片组件
 */
function ProjectCardMedium({ project }) {
  return (
    <article className="md:col-span-6 group">
      <div className="glass-card p-10 h-full border-b-2 border-b-primary/30">
        <div className="flex justify-between items-start mb-10">
          <div className="w-16 h-16 bg-surface-container-low flex items-center justify-center border border-outline-variant">
            <span
              className="material-symbols-outlined text-4xl text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {project.icon}
            </span>
          </div>
          <span className="font-label text-[10px] text-outline uppercase tracking-widest">
            {project.version}
          </span>
        </div>
        <h3 className="font-headline text-3xl font-bold mb-4">
          {project.title}
        </h3>
        <p className="text-on-surface-variant leading-relaxed mb-10">
          {project.description}
        </p>
        <div className="flex items-center justify-between pt-6 border-t border-outline-variant/30">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border border-background bg-slate-700"></div>
            <div className="w-8 h-8 rounded-full border border-background bg-slate-800"></div>
            <div className="w-8 h-8 rounded-full border border-background bg-cyan-900 flex items-center justify-center text-[10px] text-primary">
              +{project.collaborators - 2}
            </div>
          </div>
          <a
            className="group/link flex items-center gap-2 font-label text-xs uppercase tracking-widest text-primary"
            href={project.specsUrl}
          >
            FULL_SPECS
            <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCardMedium;
