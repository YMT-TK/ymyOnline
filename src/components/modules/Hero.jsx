/**
 * Hero 区域组件
 * 包含欢迎信息,个人介绍和标题
 */
export default function Hero(){
  return(
    <section className="relative z-20 text-center mb-16 max-w-5xl mx-auto">
      <div className="inline-block px-3 py-1 mb-6 glass-panel bg-surface-container-low/40 rounded-sm">
        {/* <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">
          Creative technologist &amp; UI Architect
        </span> */}
      </div>
      <h1 className="font-headline text-5xl md:text-8xl lg:text-[10rem] font-bold leading-tight tracking-tighter text-on-surface mb-4">
        个人 <br /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary-dim">
          作品展示
        </span>
      </h1>
      <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto opacity-80 leading-relaxed drop-shadow-sm">
        通过项目类型和网页设计多维度的展示自己
      </p>
    </section>
  )
}