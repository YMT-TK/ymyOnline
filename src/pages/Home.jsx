import NebulaGlow from "@/components/shared/NebulaGlow";
import KineticCanvas from "@/components/shared/KineticCanvas"
import DataStreams from "@/components/shared/DataStreams"
import Navigation from "@/components/layout/Navigation"
import Hero from "@/components/modules/Hero"
import FeatureGrid from "@/components/modules/FeatureGrid"
import TextureGallery from "@/components/modules/TextureGallery"
import Footer from "@/components/layout/Footer"
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

      {/* 顶部导航栏  */}
      <Navigation />

      {/* 主要内容区域  */}
      <main className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
        {/* 静态背景层  */}
        <div className="absolute inset-0 circuit-bg pointer-events-none opacity-20 z-10"></div>
        <div className="absolute inset-0 hero-gradient pointer-events-none z-10"></div>
      
        {/* Hero 区域 */}
        <Hero />

        {/* 功能网格  */}
        <FeatureGrid />

        {/* 纹理画廊  */}
        <TextureGallery />
      </main>

      {/* 页脚  */}
      <Footer />
    </div>
  )
}