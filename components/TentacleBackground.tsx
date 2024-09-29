import React, { useEffect, useRef } from 'react';

const TentacleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas) return;  // Add this null check
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const tentacles: Tentacle[] = [];
    const numTentacles = 20;

    const mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    class Tentacle {
      x: number;
      y: number;
      length: number;
      angle: number;
      segments: number;
      width: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.length = Math.random() * 100 + 50;
        this.angle = Math.random() * Math.PI * 2;
        this.segments = 10;
        this.width = Math.random() * 3 + 1;
        this.color = `rgba(${Math.random() * 50 + 100}, ${Math.random() * 50}, ${Math.random() * 100 + 155}, 0.7)`;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const targetAngle = Math.atan2(dy, dx);
        this.angle += (targetAngle - this.angle) * 0.1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.strokeStyle = this.color;
        context.lineWidth = this.width;
        context.beginPath();
        context.moveTo(this.x, this.y);

        let prevX = this.x;
        let prevY = this.y;

        for (let i = 0; i < this.segments; i++) {
          const segmentLength = this.length / this.segments;
          const segmentAngle = this.angle + Math.sin(i * 0.2 + performance.now() * 0.005) * 0.5;
          const x = prevX + Math.cos(segmentAngle) * segmentLength;
          const y = prevY + Math.sin(segmentAngle) * segmentLength;

          context.quadraticCurveTo(
            prevX + (x - prevX) * 0.5,
            prevY + (y - prevY) * 0.5,
            x,
            y
          );

          prevX = x;
          prevY = y;
        }

        context.stroke();
      }
    }

    for (let i = 0; i < numTentacles; i++) {
      tentacles.push(new Tentacle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    function animate() {
      if (!ctx || !canvas) return;  // Add this null check

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw dark background
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      tentacles.forEach((tentacle) => {
        tentacle.update();
        tentacle.draw(ctx);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default TentacleBackground;