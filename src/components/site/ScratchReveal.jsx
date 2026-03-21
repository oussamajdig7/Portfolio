import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export function ScratchReveal({ src, alt, className }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const container = containerRef.current;

    const initCanvas = () => {
      // Use offsetWidth/Height for more accurate sizing in some scenarios
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      // Use theme colors for the cover
      ctx.fillStyle = isDark ? "#121212" : "#f0f0f0";
      ctx.fillRect(0, 0, width, height);
      
      // Optional: Add some subtle dots pattern to the cover
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
      for (let i = 0; i < width; i += 10) {
        for (let j = 0; j < height; j += 10) {
          ctx.beginPath();
          ctx.arc(i, j, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
      ctx.textAlign = "center";
      ctx.fillText("SCRATCH TO REVEAL", width / 2, height / 2);

      setIsInitialized(true);
    };

    // Initial call
    initCanvas();

    // Use ResizeObserver for better reactivity to container size changes
    const observer = new ResizeObserver(() => {
      initCanvas();
    });
    observer.observe(container);

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      scratch(x, y);
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      scratch(x, y);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDark]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* The Actual Image underneath */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />

      {/* The Canvas Cover */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair touch-none"
        style={{
          transition: isInitialized ? "opacity 0.5s" : "none",
        }}
      />
    </div>
  );
}
