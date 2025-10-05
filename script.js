/* script.js
   - All scene texts are embedded here.
   - Soft dreamy typewriter effect + scene control.
   - Floating hearts + polaroids are created dynamically.
*/

(function () {
  // ---------- SCENES: text content (already written) ----------
  const scenes = [
    {
      title: 'The Scroll That Started It All',
      lines: [
        "We met online — two strangers scrolling past galaxies of faces.",
        "That day, we didn’t talk. Just crossed each other’s orbit once.",
        "Funny how silence can leave an echo."
      ],
      visuals: { photos: 0 }
    },
    {
      title: 'A Message Sent Across the Screen',
      lines: [
        "Boy: “I wanna say you something. Do I have a permission?”",
        "Girl: “Yes, go ahead 😌”",
        "Boy: “I don’t wanna regret later by not saying that I find you attractive.",
        "Your vibe feels… connecting.",
        "Can I get that chance to know you more?”",
        "Girl: “How?”",
        "Boy: “Maybe by getting connected somewhere less noisy. Instagram?”",
        "Connection established: Instagram ✨"
      ],
      visuals: { photos: 0 }
    },
    {
      title: 'The First Call',
      lines: [
        "She wanted to see me. Video call? The word itself made my heartbeat skip.",
        "I panicked. I’m the one who hides behind silence and profile pictures.",
        "But curiosity won that night. I clicked ‘accept’.",
        "Her smile wasn’t perfect. That’s why it felt real."
      ],
      visuals: { photos: 0 }
    },
    {
      title: 'The Little Things',
      lines: [
        "Days started flowing like messages. Simple words, small smiles.",
        "I asked for pictures — not to collect them, but to collect her moods.",
        "“I want to see your happy side, sad side, angry side… if you’re comfortable.”",
        "She never said no — just hesitated. And I learned that hesitation has its own beauty."
      ],
      visuals: { photos: 2 }
    },
    {
      title: 'Dry Replies',
      lines: [
        "She rarely texted first.",
        "Dry replies, late replies, sometimes no replies.",
        "But she never ignored a call — not even once.",
        "Maybe that was her silent way of saying she still cared."
      ],
      visuals: { photos: 0 }
    },
    {
      title: 'Pictures Again',
      lines: [
        "After days of silence, she sent pictures again.",
        "Every time I thought of giving up, she showed up on the screen — smiling, glowing.",
        "And I fell again. Every. Single. Time.",
        "I never told her that she had become my favorite form of distraction."
      ],
      visuals: { photos: 3 }
    },
    {
      title: 'The Loop',
      lines: [
        "We talk, we drift, we talk again.",
        "She stays dry, I stay drawn.",
        "Maybe that’s our rhythm — imperfect, but ours.",
        "Every time she fades, I promise to let go.",
        "Then she sends another smile… and I forget again."
      ],
      visuals: { photos: 0 }
    },
    {
      title: 'The Pause',
      lines: [
        "I don’t know what we are.",
        "But I know I don’t regret saying it that day.",
        "“I find you attractive. Your vibe feels connecting.”",
        "Because sometimes, the story itself is the reward.",
        "To be continued…"
      ],
      visuals: { photos: 0 }
    }
  ];

  // ---------- Basic state ----------
  let currentScene = 0;
  let currentLine = 0;
  let typing = false;

  // ---------- DOM refs ----------
  const contentEl = document.getElementById('content');
  const photosEl = document.getElementById('photos');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressEl = document.getElementById('progress');
  const sceneContainer = document.getElementById('scene');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  // ---------- Typewriter config ----------
  const TYPING_SPEED = 32; // ms per character
  const LINE_PAUSE = 540; // pause between lines
  const SCENE_PAUSE = 450; // pause after scene completes

  // ---------- Helpers ----------
  function updateProgress() {
    progressEl.textContent = `Scene ${currentScene + 1} / ${scenes.length}`;
  }

  function clearContent() {
    contentEl.innerHTML = '';
    photosEl.innerHTML = '';
  }

  function createPolaroid(index) {
    const div = document.createElement('div');
    div.className = 'polaroid fade-in';
    div.style.transform = `rotate(${(Math.random() * 8) - 4}deg)`;
    div.style.opacity = '0';
    div.innerHTML = `<div style="text-align:center;padding:10px;color:var(--muted)">photo ${index}</div>`;
    return div;
  }

  // dynamic decorative hearts
  function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = 12 + Math.random() * 18;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.top = `${60 + Math.random() * 30}%`;
    heart.style.opacity = (0.6 + Math.random() * 0.4).toString();
    heart.style.transform = `rotate(${(-45 + Math.random() * 20)}deg) translateY(0) scale(0.8)`;
    document.body.appendChild(heart);
    const rise = 220 + Math.random() * 180;
    heart.animate([
      { transform: heart.style.transform, opacity: heart.style.opacity },
      { transform: `translateY(-${rise}px) scale(1.05) rotate(${(Math.random()*40)-20}deg)`, opacity: 0.02 }
    ], {
      duration: 4200 + Math.random() * 2400,
      easing: 'ease-out'
    });
    setTimeout(() => heart.remove(), 7600);
  }
  // spawn a few hearts periodically
  setInterval(() => {
    if (Math.random() < 0.6) spawnHeart();
  }, 900);

  // ---------- Typewriter function (returns a promise) ----------
  function typeLine(text, container) {
    return new Promise((resolve) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'line';
      container.appendChild(lineEl);

      let i = 0;
      typing = true;
      function step() {
        if (i <= text.length) {
          // show typed substring
          lineEl.textContent = text.slice(0, i);
          if (i === text.length) {
            // finish
            lineEl.classList.add('visible', 'fade-in');
            typing = false;
            resolve();
            return;
          }
          i++;
          setTimeout(step, TYPING_SPEED + Math.random() * 8);
        }
      }
      step();
    });
  }

  // type all lines for current scene
  async function playScene(index) {
    clearContent();
    currentLine = 0;
    const scene = scenes[index];
    contentEl.setAttribute('aria-label', scene.title || `Scene ${index + 1}`);

    // show title subtle
    const titleEl = document.createElement('div');
    titleEl.className = 'line fade-in';
    titleEl.style.fontWeight = '600';
    titleEl.style.fontSize = '1.08rem';
    titleEl.style.marginBottom = '14px';
    titleEl.style.color = 'var(--soft-pink)';
    titleEl.textContent = scene.title;
    contentEl.appendChild(titleEl);

    // small pause before lines
    await new Promise(r => setTimeout(r, 320));

    // create polaroids if specified
    photosEl.innerHTML = '';
    if (scene.visuals && scene.visuals.photos > 0) {
      for (let p = 1; p <= scene.visuals.photos; p++) {
        const pol = createPolaroid(p);
        photosEl.appendChild(pol);
        // stagger show
        setTimeout(() => {
          pol.style.opacity = '1';
          pol.classList.add('fade-in');
        }, 380 + p * 160);
      }
    }

    // type each line in order
    for (const line of scene.lines) {
      await typeLine(line, contentEl);
      await new Promise(r => setTimeout(r, LINE_PAUSE));
      currentLine++;
    }
    // small pause after scene finishes
    await new Promise(r => setTimeout(r, SCENE_PAUSE));
    updateProgress();
  }

  // ---------- Navigation ----------
  function goToScene(index) {
    if (index < 0) index = 0;
    if (index >= scenes.length) index = scenes.length - 1;
    currentScene = index;
    // prevent rapid clicks: disable buttons briefly
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    playScene(currentScene).finally(() => {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    });
  }

  prevBtn.addEventListener('click', () => {
    if (typing) return;
    goToScene(currentScene - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (typing) return;
    goToScene(currentScene + 1);
  });

  // allow clicking anywhere in the scene as next
  sceneContainer.addEventListener('click', () => {
    if (typing) return;
    // if last scene, do nothing (or could loop)
    if (currentScene < scenes.length - 1) {
      goToScene(currentScene + 1);
    }
  });

  // keyboard nav
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      if (!typing && currentScene < scenes.length - 1) goToScene(currentScene + 1);
    }
    if (e.key === 'ArrowLeft') {
      if (!typing && currentScene > 0) goToScene(currentScene - 1);
    }
  });

  // ---------- Music toggle ----------
  musicToggle.addEventListener('change', (e) => {
    if (!bgMusic.src) {
      // if no music file provided, just toggle a subtle ambient using WebAudio — fallback not included to keep simple.
      alert('No music file loaded. Add an audio source to the <audio id="bgMusic"> element in index.html (src).');
      musicToggle.checked = false;
      return;
    }
    if (musicToggle.checked) {
      bgMusic.volume = 0.14;
      bgMusic.play().catch(()=>{/* user gesture required in some browsers */});
    } else {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  });

  // ---------- Initial boot ----------
  function init() {
    updateProgress();
    goToScene(0);

    // gentle ambient hearts on load
    for (let i=0;i<5;i++){
      setTimeout(spawnHeart, 200*i + Math.random()*500);
    }

    // make Prev disabled initially
    prevBtn.disabled = true;

    // update prev/next enabled state observer
    const updateButtons = () => {
      prevBtn.disabled = (currentScene === 0);
      nextBtn.disabled = (currentScene === scenes.length - 1);
    };

    // Observe scene changes by wrapping goToScene - a simple approach:
    const originalGo = goToScene;
    goToScene = function (index) {
      originalGo(index);
      setTimeout(updateButtons, 450);
    };
  }

  // run init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
