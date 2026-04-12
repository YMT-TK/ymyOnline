import { useEffect,useRef } from "react"
/**
 * 粒子网络画布组件
 */
export default function KineticCanvas(){
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({x:null,y:null,radius:150})

  /*
  * 粒子类
  */
  class Particle{
    constructor(canvas){
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.canvas = canvas;
    }

    /**
     * 更新粒子位置
     */
    update(){
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > this.canvas.width) this.x = 0;
      if (this.x < 0) this.x = this.canvas.width;
      if (this.y > this.canvas.height) this.y = 0;
      if (this.y < 0) this.y = this.canvas.height;

      if (mouseRef.current.x) {
        let dx = mouseRef.current.x - this.x;
        let dy = mouseRef.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }
    }

    /**
     * 绘制粒子
     */
    draw(ctx){
      ctx.fillStyle = `rgba(0, 238, 252, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  /**
   * 初始化画布
   */
  function initCanvas(canvas){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * 创建粒子
   */
  function createParticles(canvas){
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    particlesRef.current = [];
    for(let i=0;i<count;i++){
      particlesRef.current.push(new Particle(canvas))
    }
  }

  /**
   * 连接粒子
   */
  const connect = (ctx, canvas) => {
    for (let a = 0; a < particlesRef.current.length; a++) {
      for (let b = a; b < particlesRef.current.length; b++) {
        let dx = particlesRef.current[a].x - particlesRef.current[b].x;
        let dy = particlesRef.current[a].y - particlesRef.current[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          let opacity = 1 - (distance / 150);
          ctx.strokeStyle = `rgba(0, 238, 252, ${opacity * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
          ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
          ctx.stroke();
        }
      }
    }
  };

  /**
   * 动画循环
   */
  const animate = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesRef.current.length; i++) {
      particlesRef.current[i].update();
      particlesRef.current[i].draw(ctx);
    }
    connect(ctx, canvas);
    animationRef.current = requestAnimationFrame(() => animate(ctx, canvas));
  };

  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;

    const ctx = canvas.getContext('2d');

    initCanvas(canvas);
    createParticles(canvas);
    animate(ctx,canvas);

    const handleResize = () => {
      initCanvas(canvas);
      createParticles(canvas);
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.x;
      mouseRef.current.y = e.y;
    };

    window.addEventListener('resize',handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return ()=>{
      window.removeEventListener('resize',handleResize);
      window.removeEventListener('mousemove',handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }  
    }
  },[])
  return (
    <canvas id="kinetic-canvas" ref={canvasRef} />
  )
}