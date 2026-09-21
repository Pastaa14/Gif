// --- MESSAGES DATA ---
const MESSAGES = [
  { text: "Hi Nikol kanang hi hehe", anim: "" },
  { text: "Hi my Crush", anim: "sweet-bounce", icon: "🥰💛" },
  { text: "Hi Nicholas", anim: "flower-spin", icon: "🌼" },
  { text: "Hi my Matcha Lover", anim: "", icon: "🍵✨" },
  { text: "Hi my yellow", anim: "sweet-bounce", icon: "💛🌼" },
  { text: "Hi my Dog whisperer", anim: "", icon: "🐶💛" },
  { text: "Hi my Leader", anim: "", icon: "👑✨" },
  { text: "Ge kapoy naka no? HAHAHAHAH", anim: "laugh-wiggle", icon: "😂💛" },
  { text: "Last nani Promised", anim: "", icon: "🤙🌼" },
  { text: "Hi my singer My vocalist", anim: "music-float", icon: "🎵🎤" },
  { text: "Last na gud ni AHAHAHAHH", anim: "laugh-wiggle", icon: "😆💛" },
  { text: "Hala Ulawa oi na abot naka diri hehe", anim: "blush-glow", icon: "🙈😳" },
  { text: "I love you Crush 💛", anim: "heart-pulse", icon: "💛" }
];

let currentMessageIndex = 0;
let trapNoClickCount = 0;
let finalNoClickCount = 0;

// --- CANVAS PETALS ANIMATION ---
const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');
let petals = [];
let animFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', () => {
  setTimeout(resizeCanvas, 200);
});
resizeCanvas();

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

    const colors = ['#FFF59D', '#FFE082', '#FFD54F', '#FBC02D', '#FFFDE7'];
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
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, -this.size, 0, -this.size * 1.2);
      ctx.bezierCurveTo(this.size / 2, -this.size, this.size / 2, -this.size / 2, 0, 0);
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.arc(0, this.size * 0.4, this.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
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
    p.y = Math.random() * canvas.height;
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

// --- 1. LOGIN LOGIC ---
function handleLogin(event) {
  event.preventDefault();
  const passwordInput = document.getElementById('passwordInput');
  const errorMessage = document.getElementById('errorMessage');
  const loginScreen = document.getElementById('loginScreen');
  const welcomeScreen = document.getElementById('welcomeScreen');

  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword.toUpperCase() === 'BABY') {
    errorMessage.classList.add('hidden');

    loginScreen.style.opacity = '0';
    loginScreen.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      loginScreen.classList.add('hidden');
      welcomeScreen.classList.remove('hidden');
      welcomeScreen.classList.add('fade-in');
      spawnWelcomeBurst();
    }, 400);
  } else {
    errorMessage.classList.remove('hidden');
    errorMessage.style.animation = 'none';
    errorMessage.offsetHeight;
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

// --- 2. MESSAGE SEQUENCE LOGIC ---
function startMessageSequence() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const messageScreen = document.getElementById('messageScreen');

  welcomeScreen.style.opacity = '0';
  welcomeScreen.style.transform = 'translateY(-20px)';

  setTimeout(() => {
    welcomeScreen.classList.add('hidden');
    messageScreen.classList.remove('hidden');
    messageScreen.classList.add('fade-in');
    renderMessage(0);
  }, 400);
}

function renderMessage(index) {
  currentMessageIndex = index;
  const msgObj = MESSAGES[index];
  const messageText = document.getElementById('messageText');
  const animContainer = document.getElementById('messageAnimationContainer');

  messageText.innerText = msgObj.text;
  animContainer.innerHTML = '';

  if (msgObj.icon || msgObj.anim) {
    const iconEl = document.createElement('div');
    iconEl.innerText = msgObj.icon || '🌼';
    if (msgObj.anim) {
      iconEl.className = msgObj.anim;
    }
    animContainer.appendChild(iconEl);
  }
}

function nextMessage() {
  if (currentMessageIndex < MESSAGES.length - 1) {
    const messageScreen = document.getElementById('messageScreen');
    messageScreen.classList.remove('fade-in');
    void messageScreen.offsetWidth; // trigger reflow
    messageScreen.classList.add('fade-in');
    renderMessage(currentMessageIndex + 1);
  } else {
    // Transition to Trap Page
    showTrapPage();
  }
}

// --- 3. TRAP PAGE LOGIC ---
function showTrapPage() {
  const messageScreen = document.getElementById('messageScreen');
  const trapScreen = document.getElementById('trapScreen');

  messageScreen.style.opacity = '0';
  messageScreen.style.transform = 'translateY(-20px)';

  setTimeout(() => {
    messageScreen.classList.add('hidden');
    trapScreen.classList.remove('hidden');
    trapScreen.classList.add('fade-in');
  }, 400);
}

function handleTrapNoClick() {
  const yesBtn = document.getElementById('trapYesBtn');
  const noBtn = document.getElementById('trapNoBtn');

  trapNoClickCount++;

  const isMobile = window.innerWidth <= 480;
  const scale = 1 + trapNoClickCount * (isMobile ? 0.15 : 0.28);
  const paddingY = (isMobile ? 10 : 14) + trapNoClickCount * (isMobile ? 2 : 4);
  const paddingX = (isMobile ? 24 : 38) + trapNoClickCount * (isMobile ? 5 : 10);
  const fontSize = (isMobile ? 1.1 : 1.3) + trapNoClickCount * (isMobile ? 0.08 : 0.15);

  yesBtn.style.transform = `scale(${scale})`;
  yesBtn.style.padding = `${paddingY}px ${paddingX}px`;
  yesBtn.style.fontSize = `${fontSize}rem`;

  noBtn.style.transform = `translate(${(Math.random() - 0.5) * 15}px, ${(Math.random() - 0.5) * 10}px)`;
}

function handleTrapYesClick() {
  const trapScreen = document.getElementById('trapScreen');
  trapScreen.classList.add('hidden');

  // Trigger 5-second romantic flower animation overlay
  startFlowerOverlayAnimation();
}

// --- 4 & 5. 5-SECOND FLOWER ANIMATION & HIDDEN BUTTON ---
function startFlowerOverlayAnimation() {
  const overlay = document.getElementById('flowerOverlay');
  const garden = document.getElementById('overlayFlowerGarden');
  const hiddenPopup = document.getElementById('hiddenPopup');
  const hiddenBtn = document.getElementById('hiddenClickBtn');

  overlay.classList.remove('hidden');
  garden.innerHTML = '';
  hiddenPopup.classList.add('hidden');
  hiddenBtn.classList.add('hidden');

  const flowerIcons = ['🌼', '🌸', '🌺', '🌻', '💛', '✨', '🌼'];

  // Fill screen gradually over 5 seconds
  const interval = setInterval(() => {
    for (let i = 0; i < 4; i++) {
      const flower = document.createElement('div');
      flower.className = 'blooming-flower';
      flower.innerText = flowerIcons[Math.floor(Math.random() * flowerIcons.length)];
      flower.style.left = `${Math.random() * 92}vw`;
      flower.style.top = `${Math.random() * 92}vh`;
      flower.style.fontSize = `${2 + Math.random() * 2.5}rem`;
      garden.appendChild(flower);
    }
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    // Show Notification Popup & Hidden Button
    hiddenPopup.classList.remove('hidden');

    // Place hidden button randomly near middle/bottom flowers
    hiddenBtn.style.left = `${20 + Math.random() * 60}vw`;
    hiddenBtn.style.top = `${40 + Math.random() * 40}vh`;
    hiddenBtn.classList.remove('hidden');
  }, 5000);
}

function handleHiddenBtnClick() {
  const overlay = document.getElementById('flowerOverlay');
  const finalScreen = document.getElementById('finalScreen');

  overlay.classList.add('hidden');
  finalScreen.classList.remove('hidden');
  finalScreen.classList.add('fade-in');
}

// --- 6. FINAL MAIN QUESTION LOGIC ---
function handleFinalNoClick() {
  const yesBtn = document.getElementById('finalYesBtn');
  const noBtn = document.getElementById('finalNoBtn');

  finalNoClickCount++;

  const isMobile = window.innerWidth <= 480;
  const scale = 1 + finalNoClickCount * (isMobile ? 0.15 : 0.3);
  const paddingY = (isMobile ? 10 : 14) + finalNoClickCount * (isMobile ? 2 : 5);
  const paddingX = (isMobile ? 24 : 38) + finalNoClickCount * (isMobile ? 5 : 12);
  const fontSize = (isMobile ? 1.1 : 1.3) + finalNoClickCount * (isMobile ? 0.08 : 0.18);

  yesBtn.style.transform = `scale(${scale})`;
  yesBtn.style.padding = `${paddingY}px ${paddingX}px`;
  yesBtn.style.fontSize = `${fontSize}rem`;

  noBtn.style.transform = `translate(${(Math.random() - 0.5) * 15}px, ${(Math.random() - 0.5) * 10}px)`;
}

function handleFinalYesClick() {
  const finalScreen = document.getElementById('finalScreen');
  const celebrationScreen = document.getElementById('celebrationScreen');

  initPetals(80);
  spawnCelebrationBurst();

  finalScreen.style.opacity = '0';
  finalScreen.style.transform = 'scale(0.95)';

  setTimeout(() => {
    finalScreen.classList.add('hidden');
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
