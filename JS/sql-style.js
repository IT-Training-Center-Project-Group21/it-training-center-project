const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  const container = canvas.parentElement;
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
}

window.addEventListener('resize', resize);
resize();
const beams = Array.from({ length: 35 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  length: Math.random() * 80 + 30,
  speed: Math.random() * 1.5 + 0.5,
  width: Math.random() * 2 + 1,
  color: Math.random() > 0.4 ? '#06b6d4' : '#3b82f6'
}));

const particles = Array.from({ length: 45 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 2 + 1,
  speedY: -(Math.random() * 1.2 + 0.2),
  opacity: Math.random() * 0.8 + 0.2
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  beams.forEach(b => {
    const gradient = ctx.createLinearGradient(b.x, b.y, b.x, b.y - b.length);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
    gradient.addColorStop(0.5, b.color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = b.width;
    ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x, b.y - b.length);
    ctx.stroke();

    b.y -= b.speed;
    if (b.y + b.length < 0) {
      b.y = canvas.height + b.length;
      b.x = Math.random() * canvas.width;
    }
  });
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(165, 243, 252, ${p.opacity})`;
    ctx.fill();

    p.y += p.speedY;
    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animate);
}

animate();