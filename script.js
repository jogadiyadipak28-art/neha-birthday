/* ============================================
   ✨ NEHA'S BIRTHDAY — INTERACTIVE SCRIPTS
   ============================================ */

// ====== SMOOTH SCROLL ======
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ====== FLOATING PARTICLES SYSTEM ======
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.opacitySpeed = Math.random() * 0.005 + 0.002;
            this.opacityDir = 1;

            // Pastel colors
            const colors = [
                'rgba(244, 160, 192,',   // pink
                'rgba(196, 161, 224,',   // lavender
                'rgba(248, 201, 180,',   // peach
                'rgba(168, 230, 207,',   // mint
                'rgba(245, 213, 142,',   // gold
                'rgba(168, 216, 234,',   // sky
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Fade in/out
            this.opacity += this.opacitySpeed * this.opacityDir;
            if (this.opacity >= 0.6) this.opacityDir = -1;
            if (this.opacity <= 0.05) this.opacityDir = 1;

            // Wrap around
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.fill();

            // Subtle glow
            if (this.size > 1.5) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color + (this.opacity * 0.15) + ')';
                ctx.fill();
            }
        }
    }

    // Create particles based on screen size
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationId = requestAnimationFrame(animate);
    }

    animate();
})();


// ====== SPARKLE CURSOR TRAIL ======
(function initCursorTrail() {
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '💖', '🌸'];
    let throttle = false;

    document.addEventListener('mousemove', (e) => {
        if (throttle) return;
        throttle = true;
        setTimeout(() => throttle = false, 80);

        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = (e.clientX - 6 + (Math.random() - 0.5) * 20) + 'px';
        sparkle.style.top = (e.clientY - 6 + (Math.random() - 0.5) * 20) + 'px';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 800);
    });
})();


// ====== SCROLL REVEAL ANIMATIONS ======
(function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.tribute-card, .wish-card, .section-header, .letter-envelope, .letter-paper'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
})();


// ====== BIRTHDAY CAKE — BLOW CANDLES ======
let candlesBlown = false;

function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    const flames = document.querySelectorAll('.flame');
    const blowBtn = document.getElementById('blow-btn');
    const wishMessage = document.getElementById('wish-message');
    const instruction = document.getElementById('cake-instruction');

    // Blow out each flame with a slight stagger
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('blown-out');

            // Create smoke puff
            createSmoke(flame);
        }, index * 150);
    });

    // After all candles blown
    setTimeout(() => {
        blowBtn.classList.add('hidden');
        wishMessage.classList.remove('hidden');
        instruction.textContent = '🎉 You made a wish! ✨';

        // Launch confetti
        launchConfetti();

        // Shake the cake slightly
        const cakeContainer = document.getElementById('cake-container');
        cakeContainer.style.animation = 'cakeShake 0.5s ease-in-out';
        setTimeout(() => cakeContainer.style.animation = '', 500);
    }, flames.length * 150 + 300);
}

function relightCandles() {
    candlesBlown = false;
    const flames = document.querySelectorAll('.flame');
    const blowBtn = document.getElementById('blow-btn');
    const wishMessage = document.getElementById('wish-message');
    const instruction = document.getElementById('cake-instruction');

    flames.forEach(flame => flame.classList.remove('blown-out'));
    blowBtn.classList.remove('hidden');
    wishMessage.classList.add('hidden');
    instruction.textContent = 'Click the cake or press the button to blow out the candles! 🌬️';
}

function createSmoke(flame) {
    const rect = flame.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        const smoke = document.createElement('div');
        smoke.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
            width: 8px;
            height: 8px;
            background: rgba(200, 200, 200, 0.4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: smokePuff 1s ease-out forwards;
            animation-delay: ${i * 0.05}s;
        `;
        document.body.appendChild(smoke);
        setTimeout(() => smoke.remove(), 1200);
    }
}

// Add smoke animation
const smokeStyle = document.createElement('style');
smokeStyle.textContent = `
    @keyframes smokePuff {
        0% {
            opacity: 0.6;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(3) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 15}px);
        }
    }
    @keyframes cakeShake {
        0%, 100% { transform: translateX(0) rotate(0deg); }
        25% { transform: translateX(-3px) rotate(-1deg); }
        50% { transform: translateX(3px) rotate(1deg); }
        75% { transform: translateX(-2px) rotate(-0.5deg); }
    }
`;
document.head.appendChild(smokeStyle);


// ====== CONFETTI SYSTEM ======
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const section = canvas.parentElement;
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;

    const confetti = [];
    const colors = ['#f4a0c0', '#c4a1e0', '#f8c9b4', '#a8e6cf', '#f5d58e', '#a8d8ea', '#e87ea1', '#b08fd8'];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.w = Math.random() * 10 + 5;
            this.h = Math.random() * 6 + 3;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedY = Math.random() * 3 + 2;
            this.speedX = (Math.random() - 0.5) * 4;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.opacity = 1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            this.speedY += 0.05; // gravity
            this.opacity -= 0.003;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, this.opacity);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
        }
    }

    // Create confetti burst
    for (let i = 0; i < 150; i++) {
        const piece = new ConfettiPiece();
        piece.speedY = -(Math.random() * 8 + 4);
        piece.y = canvas.height * 0.5;
        piece.x = canvas.width * 0.5 + (Math.random() - 0.5) * 200;
        confetti.push(piece);
    }

    let animId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let alive = false;
        confetti.forEach(p => {
            p.update();
            p.draw();
            if (p.opacity > 0 && p.y < canvas.height + 50) alive = true;
        });

        if (alive) {
            animId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}


// ====== LETTER ENVELOPE ======
let letterOpened = false;

function openLetter() {
    if (letterOpened) return;
    letterOpened = true;

    const envelope = document.getElementById('envelope');
    const flap = document.getElementById('envelope-flap');
    const paper = document.getElementById('letter-paper');

    // Open flap animation
    flap.style.transform = 'rotateX(180deg)';

    setTimeout(() => {
        envelope.classList.add('hidden');
        paper.classList.remove('hidden');
    }, 600);
}


// ====== BACKGROUND MUSIC (Optional) ======
let musicPlaying = false;
let audioCtx, oscillator;

function toggleMusic() {
    const btn = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');

    if (!musicPlaying) {
        // Create a gentle ambient tone using Web Audio API
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // Create a gentle melody using oscillators
        playMelody(audioCtx);

        musicPlaying = true;
        btn.classList.add('playing');
        icon.textContent = '🎶';
    } else {
        if (audioCtx) {
            audioCtx.close();
            audioCtx = null;
        }
        musicPlaying = false;
        btn.classList.remove('playing');
        icon.textContent = '🎵';
    }
}

function playMelody(ctx) {
    // "Happy Birthday" melody (simplified) using Web Audio API
    const notes = [
        { freq: 262, dur: 0.3 }, // C4
        { freq: 262, dur: 0.3 }, // C4
        { freq: 294, dur: 0.6 }, // D4
        { freq: 262, dur: 0.6 }, // C4
        { freq: 349, dur: 0.6 }, // F4
        { freq: 330, dur: 1.2 }, // E4
        { freq: 262, dur: 0.3 }, // C4
        { freq: 262, dur: 0.3 }, // C4
        { freq: 294, dur: 0.6 }, // D4
        { freq: 262, dur: 0.6 }, // C4
        { freq: 392, dur: 0.6 }, // G4
        { freq: 349, dur: 1.2 }, // F4
        { freq: 262, dur: 0.3 }, // C4
        { freq: 262, dur: 0.3 }, // C4
        { freq: 523, dur: 0.6 }, // C5
        { freq: 440, dur: 0.6 }, // A4
        { freq: 349, dur: 0.6 }, // F4
        { freq: 330, dur: 0.6 }, // E4
        { freq: 294, dur: 1.2 }, // D4
        { freq: 466, dur: 0.3 }, // Bb4
        { freq: 466, dur: 0.3 }, // Bb4
        { freq: 440, dur: 0.6 }, // A4
        { freq: 349, dur: 0.6 }, // F4
        { freq: 392, dur: 0.6 }, // G4
        { freq: 349, dur: 1.2 }, // F4
    ];

    let startTime = ctx.currentTime + 0.1;

    notes.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = note.freq;

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.dur + 0.05);

        startTime += note.dur;
    });
}


// ====== PARALLAX EFFECT ON HERO ======
(function initParallax() {
    const hero = document.querySelector('.hero-content');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (scroll < window.innerHeight) {
            hero.style.transform = `translateY(${scroll * 0.3}px)`;
            hero.style.opacity = 1 - (scroll / (window.innerHeight * 0.8));
        }
    });
})();


// ====== TILT EFFECT ON CARDS ======
(function initTilt() {
    const cards = document.querySelectorAll('.tribute-card, .wish-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
})();


// ====== TYPEWRITER EFFECT FOR HERO NAME ======
(function initTypewriter() {
    const nameEl = document.querySelector('.hero-name');
    if (!nameEl) return;

    const name = nameEl.textContent;
    nameEl.textContent = '';

    setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < name.length) {
                nameEl.textContent += name[i];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 120);
    }, 1000);
})();


// ====== CONSOLE BIRTHDAY MESSAGE ======
console.log(
    '%c🎂 Happy Birthday Neha! 🎂',
    'font-size: 24px; color: #f4a0c0; font-family: cursive; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);
console.log(
    '%c✨ Made with love ✨',
    'font-size: 14px; color: #c4a1e0;'
);
