import ProjectCardLargeFeatured from './ProjectCardLargeFeatured';
import ProjectCardVerticalSmall from './ProjectCardVerticalSmall';
import ProjectCardWideReversed from './ProjectCardWideReversed';
import ProjectCardMedium from './ProjectCardMedium';
import ProjectCardStat from './ProjectCardStat';
/**
 * 项目卡片渲染组件
 * 根据项目布局类型渲染对应的卡片
 */
export default function ProjectCard({project}){
  switch (project.layout) {
    case 'large-featured':
      return <ProjectCardLargeFeatured project={project} />;
    case 'vertical-small':
      return <ProjectCardVerticalSmall project={project} />;
    case 'wide-reversed':
      return <ProjectCardWideReversed project={project} />;
    case 'medium-card':
      return <ProjectCardMedium project={project} />;
    case 'stat-card':
      return <ProjectCardStat project={project} />;
    default:
      return <ProjectCardLargeFeatured project={project} />;
  }
}