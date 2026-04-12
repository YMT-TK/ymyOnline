import NebulaGlow from "@/components/shared/NebulaGlow";
import KineticCanvas from "@/components/shared/KineticCanvas"
import DataStreams from "@/components/shared/DataStreams"

/**
 * 首页组件
 */
export default function Home(){
  return (
    <div className="dark bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary min-h-screen overflow-x-hidden">
      {/* 动态背景层  */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NebulaGlow />
        <KineticCanvas />
        <DataStreams />
      </div>
    </div>
  )
}