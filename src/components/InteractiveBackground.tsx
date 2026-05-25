import { useEffect, useRef } from "react";
import { Theme } from "../types";

interface InteractiveBackgroundProps {
  theme: Theme;
}

export default function InteractiveBackground({ theme }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow movement
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        this.color = this.getRandomColor();
      }

      getRandomColor() {
        const cyan = "8, 220, 230"; // neon cyan
        const purple = "168, 85, 247"; // neon purple
        const emerald = "16, 185, 129"; // neon emerald
        const colors = [cyan, purple, emerald];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundary
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse avoidance/attraction attraction buffer
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Toggle opacity based on theme
        const opacity = theme === "dark" ? "0.3" : "0.22";
        c.fillStyle = `rgba(${this.color}, ${opacity})`;
        c.fill();
      }
    }

    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid first
      const gridSize = 60;
      ctx.strokeStyle = theme === "dark" ? "rgba(30, 41, 59, 0.25)" : "rgba(148, 163, 184, 0.12)";
      ctx.lineWidth = 1;
      
      // Draw Grid Mesh
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particle networks
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(ctx);

        // Network connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineOpacity = (1 - dist / 120) * (theme === "dark" ? 0.08 : 0.12);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineOpacity})`; // default connecting line color style (purple)
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Mouse cursor interaction line connections
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          const lineOpacity = (1 - mdist / mouse.radius) * (theme === "dark" ? 0.15 : 0.12);
          ctx.strokeStyle = theme === "dark" ? `rgba(6, 182, 212, ${lineOpacity})` : `rgba(14, 116, 144, ${lineOpacity})`; // cyan active glow lines
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="bg-interactive-canvas"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
