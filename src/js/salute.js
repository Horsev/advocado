let canvas = document.getElementById("magicCanvas");
let ctx = canvas.getContext("2d", { alpha: true });

const CONFIG = {
  particleCount: 80,
  minSpeed: 1,
  maxSpeed: 5,
  minSize: 1,
  maxSize: 5,
  life: 100,
  initialExplosions: 3,
};

let width = 0;
let height = 0;
let particles = [];
let pendingExplosions = [];

const randomInRange = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(randomInRange(min, max + 1));

const resizeCanvas = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;
};

const getParticleColor = () =>
  `255, ${randomInt(100, 255)}, ${randomInt(55, 255)}`;

class Particle {
  constructor({ x, y, vx, vy, size, color, life }) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
    this.life = life;
    this.maxLife = life;
  }

  get opacity() {
    return Math.max(this.life / this.maxLife, 0);
  }

  get isAlive() {
    return this.life > 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
  }

  draw(context) {
    context.save();
    context.globalCompositeOperation = "source-over";
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    context.fill();
    context.restore();
  }
}

const createParticle = (x, y) => {
  const angle = randomInRange(0, Math.PI * 2);
  const speed = randomInRange(CONFIG.minSpeed, CONFIG.maxSpeed);

  return new Particle({
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: randomInRange(CONFIG.minSize, CONFIG.maxSize),
    color: getParticleColor(),
    life: CONFIG.life,
  });
};

const createExplosion = (x, y) => {
  const newParticles = Array.from({ length: CONFIG.particleCount }, () =>
    createParticle(x, y),
  );

  particles.push(...newParticles);
};

const clearFrame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const updateParticle = (particle) => {
  particle.update();
  particle.draw(ctx);
  return particle.isAlive;
};

const runNextExplosion = () => {
  if (particles.length > 0 || pendingExplosions.length === 0) {
    return;
  }

  const [x, y] = pendingExplosions.shift();
  createExplosion(x, y);
};

const createInitialExplosionQueue = () => {
  pendingExplosions = [
    [width * 0.25, height * 0.5],
    [width * 0.5, height * 0.3],
    [width * 0.75, height * 0.6],
  ];
};

const animate = () => {
  clearFrame();
  particles = particles.filter(updateParticle);
  runNextExplosion();
  requestAnimationFrame(animate);
};

let started = false;

const SALUTE_STORAGE_KEY = "saluteLastPlayed";

const getTodayKey = () => new Date().toLocaleDateString("en-CA");

export default function runSalute() {
  const today = getTodayKey();
  if (localStorage.getItem(SALUTE_STORAGE_KEY) === today) return;
  localStorage.setItem(SALUTE_STORAGE_KEY, today);

  if (started) return;
  started = true;
  canvas = document.getElementById("magicCanvas");
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  canvas.style.display = "block";
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  createInitialExplosionQueue();
  runNextExplosion();
  animate();
}
