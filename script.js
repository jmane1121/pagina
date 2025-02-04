// Efecto de máquina de escribir
const typed = new Typed("#typed-name", {
    strings: ["Desarrollador Web y móvil","José Manuel Soto Quintana",],
    typeSpeed: 100,
    startDelay: 500,
    showCursor: true,
    cursorChar: "|",
  });
  
  // Efecto de explosión al hacer clic en "Conóceme"
  document.querySelector(".explosion-effect").addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(".explosion-effect::after", {
      width: 200,
      height: 200,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        window.location.href = "#about";
      },
    });
  });
  
  // Efecto hover en cards
  document.querySelectorAll(".hover-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.05, duration: 0.3 });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.3 });
    });
  });

//Fondo animado con puntos y lineas 
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("neural-network");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const points = [];
  const numPoints = 50;
  const maxDistance = 150;

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      //ctx.fillStyle = "rgba(111, 66, 193, 0.8)";
      ctx.fillStyle = "rgba(40, 65, 176, 0.8)";
      ctx.fill();
    }
  }

  function createPoints() {
    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      points.push(new Point(x, y));
    }
  }

  function drawLines() {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = `rgba(111, 66, 193, ${1 - distance / maxDistance})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach((point) => {
      point.update();
      point.draw();
    });

    drawLines();

    requestAnimationFrame(animate);
  }

  createPoints();
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});