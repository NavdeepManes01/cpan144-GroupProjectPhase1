import { useEffect } from 'react';

export default function BackgroundGrid() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'background-grid';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.1;
      pointer-events: none;
    `;
    document.body.prepend(canvas);

    function drawGrid() {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = 'white';
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    drawGrid();

    const resizeObserver = new ResizeObserver(drawGrid);
    resizeObserver.observe(document.body);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      const existingCanvas = document.getElementById('background-grid');
      if (existingCanvas) {
        existingCanvas.remove();
      }
    };
  }, []);

  return null;
}