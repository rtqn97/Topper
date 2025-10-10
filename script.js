// final script.js — button-based, typewriter, no glitches, music fallback
(function () {
  // --- Scenes (text kept as the original "first version" style) ---
  const scenes = [
    {
      title: "The Scroll That Started It All",
      lines: [
        "We met online — two strangers scrolling past galaxies of faces.",
        "That day, we didn’t talk. Just crossed each other’s orbit once.",
        "Funny how silence can leave an echo."
      ]
    },
    {
      title: "A Message Sent Across the Screen",
      lines: [
        "Boy: \"I wanna say you something. Do I have a permission?\"",
        "Girl: \"Yes, go ahead 😌\"",
        "Boy: \"I don’t wanna regret later by not saying that I find you attractive.",
        "Your vibe feels… connecting.",
        "Can I get that chance to know you more?\"",
        "Girl: \"How?\"",
        "Boy: \"Maybe by getting connected somewhere less noisy. Instagram?\"",
        "Connection established: Instagram ✨"
      ]
    },
    {
      title: "The First Call",
      lines: [
        "She wanted to see me. Video call? The word itself made my heartbeat skip.",
        "I panicked. I’m the one who hides behind silence and profile pictures.",
        "But curiosity won that night. I clicked 'accept'.",
        "Her smile wasn’t perfect. That’s why it felt real."
      ]
    },
    {
      title: "The Little Things",
      lines: [
        "Days started flowing like messages. Simple words, small smiles.",
        "I asked for pictures — not to collect them, but to collect her moods.",
        "\"I want to see your happy side, sad side, angry side… if you’re comfortable.\"",
        "She never said no — just hesitated. And I learned that hesitation has its own beauty."
      ]
    },
    {
      title: "Dry Replies",
      lines: [
        "She rarely texted first.",
        "Dry replies, late replies, sometimes no replies.",
        "But she never ignored a call — not even once.",
        "Maybe that was her silent way of saying she still cared."
      ]
    },
    {
      title: "Pictures Again",
      lines: [
        "After days of silence, she sent pictures again.",
        "Every time I thought of giving up, she showed up on the screen — smiling, glowing.",
        "And I fell again. Every. Single. Time.",
        "I never told her that she had become my favorite form of distraction."
      ]
    },
    {
      title: "The Loop",
      lines: [
        "We talk, we drift, we talk again.",
        "She stays dry, I stay drawn.",
        "Maybe that’s our rhythm — imperfect, but ours.",
        "Every time she fades, I promise to let go.",
        "Then she sends another smile… and I forget again."
      ]
    },
    {
      title: "The Pause",
      lines: [
        "Some stories don’t end, they just pause in the heart.",
        "To be continued with my lady. 😚❤️"
      ],
      final: true
    }
  ];

  // --- Get DOM elements (assumes your index.html IDs are as before) ---
  const contentEl = document.getElementById('content');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const bgMusic = document.getElementById('bgMusic');
  const controlsContainer = document.getElementById('controls') || document.querySelector('.controls');

  // Graceful fallback checks
  if (!contentEl) {
    console.error("script.js: #content element not found. Ensure your index.html has <div id='content'>.");
  }
  if (!prevBtn || !nextBtn) {
    console.error("script.js: prev/next buttons not found (#prevBtn, #nextBtn).");
  }

  // --- State ---
  let currentScene = 0;
  let typing = false;
  const TYPE_SPEED = 32;
  const LINE_PAUSE = 480; // pause between lines

  // final "See You Again" button (created once)
  const seeAgainBtn = document.createElement('button');
  seeAgainBtn.className = 'final-btn';
  seeAgainBtn.textContent = 'See You Again';
  seeAgainBtn.style.display = 'none';

  // Append seeAgain into controls area if available, else to content area
  if (controlsContainer) {
    controlsContainer.appendChild(seeAgainBtn);
  } else {
    // fallback: append to body
    document.body.appendChild(seeAgainBtn);
  }

  // --- Floating hearts (keep same dreamy effect) ---
  function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = 12 + Math.random() * 18;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * 90}%`;
    heart.style.top = `${60 + Math.random() * 30}%`;
    heart.style.opacity = `${0.5 + Math.random() * 0.5}`;
    document.body.appendChild(heart);
    heart.animate(
      [
        { transform: 'translateY(0) scale(1) rotate(45deg)', opacity: 1 },
        { transform: `translateY(-${140 + Math.random() * 100}px) scale(1.05) rotate(45deg)`, opacity: 0 }
      ],
      { duration: 4800 + Math.random() * 2000, easing: 'ease-out' }
    );
    setTimeout(() => heart.remove(), 7000);
  }
  setInterval(() => { if (Math.random() < 0.6) spawnHeart(); }, 900);

  // --- Typewriter: types a single line fully, returns a Promise ---
  function typeLine(line) {
    return new Promise((resolve) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'line';
      contentEl.appendChild(lineEl);
      let i = 0;
      typing = true;

      function step() {
        // type characters one by one
        if (i <= line.length) {
          lineEl.textContent = line.slice(0, i);
          i++;
          // schedule next char
          setTimeout(step, TYPE_SPEED + Math.random() * 8);
        } else {
          // ensure final full string shown
          lineEl.textContent = line;
          lineEl.classList.add('fade-in');
          typing = false;
          resolve();
        }
      }
      step();
    });
  }

  // --- Clear content area ---
  function clearContent() {
    contentEl.innerHTML = '';
  }

  // --- Play a scene by index (awaits typing of all lines) ---
  async function playScene(index) {
    // Defensive bounds
    if (index < 0) index = 0;
    if (index >= scenes.length) index = scenes.length - 1;
    // disable nav while rendering
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    seeAgainBtn.style.display = 'none';

    clearContent();
    const scene = scenes[index];

    // Title (subtle)
    const titleEl = document.createElement('div');
    titleEl.className = 'title fade-in';
    titleEl.textContent = scene.title;
    titleEl.style.fontWeight = '600';
    titleEl.style.marginBottom = '14px';
    titleEl.style.color = 'var(--soft-pink)';
    contentEl.appendChild(titleEl);

    // small pause before typing lines
    await new Promise(r => setTimeout(r, 260));

    // Type each line fully, with a consistent pause
    for (const line of scene.lines) {
      await typeLine(line);
      // small pause between lines
      await new Promise(r => setTimeout(r, LINE_PAUSE));
    }

    // After full scene typed:
    if (scene.final) {
      // Hide nav buttons and show final button
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      seeAgainBtn.style.display = 'inline-block';
      // enable click on final button
      seeAgainBtn.onclick = () => {
        // Restart story from scene 0 and restore buttons
        seeAgainBtn.style.display = 'none';
        if (prevBtn) { prevBtn.style.display = 'inline-block'; prevBtn.disabled = true; }
        if (nextBtn) { nextBtn.style.display = 'inline-block'; nextBtn.disabled = false; }
        goToScene(0);
      };
    } else {
      // Show nav buttons and set their enabled state
      if (prevBtn) { prevBtn.style.display = 'inline-block'; prevBtn.disabled = (index === 0); }
      if (nextBtn) { nextBtn.style.display = 'inline-block'; nextBtn.disabled = (index === scenes.length - 1); }
    }
  }

  // --- Navigation wrapper ---
  function goToScene(i) {
    if (typing) return; // ignore if typing in progress
    if (i < 0) i = 0;
    if (i > scenes.length - 1) i = scenes.length - 1;
    currentScene = i;
    playScene(currentScene).catch((err)=>{ console.error(err); });
  }

  // --- Button handlers (button-only navigation) ---
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (typing) return;
      if (currentScene > 0) goToScene(currentScene - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (typing) return;
      if (currentScene < scenes.length - 1) goToScene(currentScene + 1);
    });
  }

  // --- Music: try autoplay, fallback to start on first nav button click ---
  (function initMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.25;
    bgMusic.loop = true;
    const playAttempt = bgMusic.play();
    if (playAttempt !== undefined && typeof playAttempt.then === 'function') {
      playAttempt.then(() => {
        // playing
      }).catch(() => {
        // blocked by browser — start on first nav click
        const startOnFirstClick = () => {
          bgMusic.play().catch(()=>{});
        };
        if (prevBtn) prevBtn.addEventListener('click', startOnFirstClick, { once: true });
        if (nextBtn) nextBtn.addEventListener('click', startOnFirstClick, { once: true });
        // also start if user clicks the final button later
        seeAgainBtn.addEventListener('click', startOnFirstClick, { once: true });
      });
    }
  })();

  // --- Initialization ---
  function init() {
    // Start at scene 0
    goToScene(0);
    // small heart pre-spawn
    for (let i = 0; i < 4; i++) setTimeout(spawnHeart, 200 * i + Math.random() * 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
