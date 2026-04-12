import { useRef,useEffect } from "react"
/**
 * 数据流组件
 * 创建垂直向下的数据流效果
 */
export default function DataStreams() {
  const containerRef = useRef(null);

  /**
   * 创建数据流
   */
  function createStreams(){
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';
    const count = 15;
    
    for (let i = 0; i < count; i++) {
      const stream = document.createElement('div');
      stream.className = 'data-stream';
      stream.style.left = `${Math.random() * 100}%`;
      stream.style.height = `${Math.random() * 20 + 10}vh`;
      stream.style.animationDuration = `${Math.random() * 10 + 5}s`;
      stream.style.animationDelay = `${Math.random() * 10}s`;
      container.appendChild(stream);
    } 
  }
  useEffect(()=>{
    createStreams();
  },[])
  return (
    <div className="absolute inset-0" id="stream-container" ref={containerRef}></div>
  )
}