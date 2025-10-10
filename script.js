(function () {
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
        "Some Stories Don’t End, They Just Pause in the Heart.",
        "To Be Continued with My Lady. 😚❤️"
      ],
      visuals: { photos: 0 }
    }
  ];

  let currentScene = 0;
  let typing = false;

  const contentEl = document.getElementById('content');
  const photosEl = document.getElementById('photos');
  const sceneContainer = document.getElementById('scene');
  const bgMusic = document.getElementById('bgMusic');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressEl = document.getElementById('progress');
  progressEl.style.display = 'none';

  const TYPING_SPEED = 32;
  const LINE_PAUSE = 540;
  const SCENE_PAUSE = 450;

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

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = 12 + Math.random() * 18;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.top = `${60 + Math.random() * 30}%`;
    heart.style.opacity = (0.6 + Math.random() * 0.4).toString();
    heart.style.transform = `rotate(${(-45 + Math.random() * 20)}deg)`;
    document.body.appendChild(heart);
    const rise = 220 + Math.random() * 180;
    heart.animate([
      { transform: heart.style.transform, opacity: heart.style.opacity },
      { transform: `translateY(-${rise}px) scale(1.05)`, opacity: 0.02 }
    ], { duration: 4200 + Math.random() * 2400, easing: 'ease-out' });
    setTimeout(() => heart.remove(), 7600);
  }

  setInterval(() => { if (Math.random() < 0.6) spawnHeart(); }, 900);

  function typeLine(text, container) {
    return new Promise((resolve) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'line';
      container.appendChild(lineEl);
      let i = 0;
      typing = true;
      function step() {
        if (i <= text.length) {
          lineEl.textContent = text.slice(0, i);
          if (i === text.length) {
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

  async function playScene(index) {
    clearContent();
    const scene = scenes[index];
    const titleEl = document.createElement('div');
    titleEl.className = 'line fade-in';
    titleEl.style.fontWeight = '600';
    titleEl.style.fontSize = '1.08rem';
    titleEl.style.marginBottom = '14px';
    titleEl.style.color = 'var(--soft-pink)';
    titleEl.textContent = scene.title;
    contentEl.appendChild(titleEl);
    await new Promise(r => setTimeout(r, 320));

    if (scene.visuals && scene.visuals.photos > 0) {
      for (let p = 1; p <= scene.visuals.photos; p++) {
        const pol = createPolaroid(p);
        photosEl.appendChild(pol);
        setTimeout(() => {
          pol.style.opacity = '1';
          pol.classList.add('fade-in');
        }, 380 + p * 160);
      }
    }

    for (const line of scene.lines) {
      await typeLine(line, contentEl);
      await new Promise(r => setTimeout(r, LINE_PAUSE));
    }

    if (index === scenes.length - 1) {
      const btn = document.createElement('button');
      btn.textContent = 'See You Again';
      btn.className = 'final-btn';
      btn.onclick = () => {
        contentEl.innerHTML = "<div class='line fade-in'>Until next time… 💫</div>";
      };
      contentEl.appendChild(btn);
    }

    await new Promise(r => setTimeout(r, SCENE_PAUSE));
  }

  function goToScene(index) {
    if (index < 0) index = 0;
    if (index >= scenes.length) index = scenes.length - 1;
    currentScene = index;
    playScene(currentScene);
  }

  sceneContainer.addEventListener('click', () => {
    if (typing) return;
    if (currentScene < scenes.length - 1) goToScene(currentScene + 1);
  });

  function initMusic() {
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => {
      document.body.addEventListener('click', () => {
        bgMusic.play().catch(() => {});
      }, { once: true });
    });
  }

  function init() {
    goToScene(0);
    for (let i = 0; i < 5; i++) setTimeout(spawnHeart, 200 * i + Math.random() * 500);
    initMusic();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
