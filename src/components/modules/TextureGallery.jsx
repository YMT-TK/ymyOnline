/**
 * 纹理画廊组件
 * 展示特色纹理图片
 */
export default function TextureGallery(){
  const textures = []
  return (
    <div  className="mt-20 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 opacity-30 z-20">
      {
        textures.map((texture,index)=>{
          <div key={index} className="h-32 rounded-lg bg-surface-container-low relative overflow-hidden group">
            <img className="w-full h-full object-cover mix-blend-overlay"
            src={texture.src} alt={texture.alt} />
          </div>
        })
      }
    </div>
  )
}