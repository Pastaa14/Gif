// --- STATE & DOM ELEMENTS ---
let noClickCount = 0;

const NO_MESSAGES = [
  "Are you sure? 🥺🌼",
  "Maybe think about it one more time? 💛",
  "My heart is still waiting… 🌼",
  "I’ll ask you just one more time. 🥹💛"
];

// Canvas setup for yellow petals animation
const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');
let petals = [];
let animFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- PETAL CLASS ---
class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20 - Math.random() * 50;
    this.size = 10 + Math.random() * 14;
    this.speedY = 1 + Math.random() * 1.8;
    this.speedX = (Math.random() - 0.5) * 1.2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.opacity = 0.6 + Math.random() * 0.4;

    // Palette of warm yellow petals
    const colors = [
      '#FFF59D', // Soft pastel yellow
      '#FFE082', // Gentle yellow
      '#FFD54F', // Warm golden yellow
      '#FBC02D', // Bright gold
      '#FFFDE7'  // Cream yellow
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.type = Math.random() > 0.3 ? 'petal' : 'flower';
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * 0.015) + this.speedX;
    this.rotation += this.rotSpeed;

    if (this.y > canvas.height + 30) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    if (this.type === 'petal') {
      // Draw single petal shape
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, -this.size, 0, -this.size * 1.2);
      ctx.bezierCurveTo(this.size / 2, -this.size, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
    } else {
      // Draw small cute 5-petal flower
      ctx.fillStyle = this.color;
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.arc(0, this.size * 0.4, this.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      // Center dot
      ctx.beginPath();
      ctx.fillStyle = '#F57F17';
      ctx.arc(0, 0, this.size * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function initPetals(count = 35) {
  petals = [];
  for (let i = 0; i < count; i++) {
    const p = new Petal();
    p.y = Math.random() * canvas.height; // Scatter initially
    petals.push(p);
  }
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    p.update();
    p.draw();
  });
  animFrameId = requestAnimationFrame(animatePetals);
}

initPetals();
animatePetals();

// --- LOGIN LOGIC ---
function handleLogin(event) {
  event.preventDefault();
  const passwordInput = document.getElementById('passwordInput');
  const errorMessage = document.getElementById('errorMessage');
  const loginScreen = document.getElementById('loginScreen');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const mainScreen = document.getElementById('mainScreen');

  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword.toUpperCase() === 'BABY') {
    errorMessage.classList.add('hidden');

    // Fade out login screen
    loginScreen.style.opacity = '0';
    loginScreen.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      loginScreen.classList.add('hidden');
      welcomeScreen.classList.remove('hidden');
      welcomeScreen.classList.add('fade-in');

      // Floating flower burst for welcome animation
      spawnWelcomeBurst();

      // After 3 seconds, transition smoothly to main proposal screen
      setTimeout(() => {
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transform = 'translateY(-20px)';

        setTimeout(() => {
          welcomeScreen.classList.add('hidden');
          mainScreen.classList.remove('hidden');
          mainScreen.classList.add('fade-in');
        }, 400);
      }, 3000);
    }, 400);
  } else {
    errorMessage.classList.remove('hidden');
    // Trigger re-shake animation
    errorMessage.style.animation = 'none';
    errorMessage.offsetHeight; // trigger reflow
    errorMessage.style.animation = 'shake 0.4s ease-in-out';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

function spawnWelcomeBurst() {
  const icons = ['🌼', '💛', '✨', '💛', '🌼'];
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'floating-element';
      el.innerText = icons[Math.floor(Math.random() * icons.length)];
      el.style.left = `${15 + Math.random() * 70}vw`;
      el.style.top = `${60 + Math.random() * 30}vh`;
      el.style.fontSize = `${1.5 + Math.random() * 1.2}rem`;
      document.body.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 3000);
    }, i * 120);
  }
}

// --- NO BUTTON INTERACTION ---
function handleNoClick() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const questionText = document.getElementById('questionText');

  // Change question or display encouraging text in NO button/question
  if (noClickCount < NO_MESSAGES.length) {
    questionText.innerText = NO_MESSAGES[noClickCount];
  } else {
    questionText.innerText = NO_MESSAGES[NO_MESSAGES.length - 1];
  }

  noClickCount++;

  // Progressively make YES button larger without obscuring NO button
  const scale = 1 + noClickCount * 0.25;
  const paddingY = 14 + noClickCount * 4;
  const paddingX = 38 + noClickCount * 10;
  const fontSize = 1.3 + noClickCount * 0.15;

  yesBtn.style.transform = `scale(${scale})`;
  yesBtn.style.padding = `${paddingY}px ${paddingX}px`;
  yesBtn.style.fontSize = `${fontSize}rem`;

  // Slight playful offset for NO button
  noBtn.style.transform = `translate(${(Math.random() - 0.5) * 15}px, ${(Math.random() - 0.5) * 10}px)`;
}

// --- YES BUTTON CELEBRATION ---
function handleYesClick() {
  const mainScreen = document.getElementById('mainScreen');
  const celebrationScreen = document.getElementById('celebrationScreen');

  // Increase background petal burst
  initPetals(80);

  // Trigger floating hearts & yellow flowers burst
  spawnCelebrationBurst();

  mainScreen.style.opacity = '0';
  mainScreen.style.transform = 'scale(0.95)';

  setTimeout(() => {
    mainScreen.classList.add('hidden');
    celebrationScreen.classList.remove('hidden');
    celebrationScreen.classList.add('fade-in');
  }, 400);
}

function spawnCelebrationBurst() {
  const icons = ['🌼', '💛', '🌸', '✨', '💛', '🌼'];
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'floating-element';
      el.innerText = icons[Math.floor(Math.random() * icons.length)];
      el.style.left = `${10 + Math.random() * 80}vw`;
      el.style.top = `${50 + Math.random() * 40}vh`;
      el.style.fontSize = `${1.8 + Math.random() * 1.5}rem`;
      document.body.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 3000);
    }, i * 60);
  }
}
