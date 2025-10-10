(function () {
  const scenes = [
    {
      title: 'The Scroll That Started It All',
      lines: [
        "We met online — two strangers scrolling past galaxies of faces.",
        "That day, we didn’t talk. Just crossed each other’s orbit once.",
        "Funny how silence can leave an echo."
      ]
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
      ]
    },
    {
      title: 'The First Call',
      lines: [
        "She wanted to see me. Video call? The word itself made my heartbeat skip.",
        "I panicked. I’m the one who hides behind silence and profile pictures.",
        "But curiosity won that night. I clicked ‘accept’.",
        "Her smile wasn’t perfect. That’s why it felt real."
      ]
    },
    {
      title: 'The Little Things',
      lines: [
        "Days started flowing like messages. Simple words, small smiles.",
        "I asked for pictures — not to collect them, but to collect her moods.",
        "“I want to see your happy side, sad side, angry side… if you’re comfortable.”",
        "She never said no — just hesitated. And I learned that hesitation has its own beauty."
      ]
    },
    {
      title: 'Dry Replies',
      lines: [
        "She rarely texted first.",
        "Dry replies, late replies, sometimes no replies.",
        "But she never ignored a call — not even once.",
        "Maybe that was her silent way of saying she still cared."
      ]
    },
    {
      title: 'Pictures Again',
      lines: [
        "After days of silence, she sent pictures again.",
        "Every time I thought of giving up, she showed up on the screen — smiling, glowing.",
        "And I fell again. Every. Single. Time.",
        "I never told her that she had become my favorite form of distraction."
      ]
    },
    {
      title: 'The Loop',
      lines: [
        "We talk, we drift, we talk again.",
        "She stays dry, I stay drawn.",
        "Maybe that’s our rhythm — imperfect, but ours.",
        "Every time she fades, I promise to let go.",
        "Then she sends another smile… and I forget again."
      ]
    },
    {
      title: 'The Pause',
      lines: [
        "Some Stories Don't End, They Just Pause in the Heart",
        "",
        "To Be Continue with My Lady. 😚❤️ "
      ]
    }
  ];

  const contentEl = document.getElementById('content');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressEl = document.getElementById('progress');
  const sceneContainer = document.getElementById('scene');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  // hide progress text visually
  progressEl.style.display = 'none';

  const seeAgainBtn = document.createElement('button');
  seeAgainBtn.id = 'seeAgainBtn';
  seeAgainBtn.textContent = 'See You Again';
  document.body.appendChild(seeAgainBtn);

  const TYPING_SPEED = 30;
  const LINE_PAUSE = 500;

  let currentScene = 0;
  let typing = false;
  let musicStarted = false;

  function clearContent() {
    contentEl.innerHTML = '';
  }

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = 12 + Math.random() * 18;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${10 + Math.random() * 80}%`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }
  setInterval(() => { if (Math.random() < 0.6) spawnHeart(); }, 1000);

  function typeLine(text, container) {
    return new Promise((resolve) => {
      const lineEl = document.createElement('div');
      lineEl.className = 'line';
      container.appendChild(lineEl);
      let i = 0;
      typing = true;
      (function step() {
        if (i <= text.length) {
          lineEl.textContent = text.slice(0, i);
          i++;
          setTimeout(step, TYPING_SPEED);
        } else {
          lineEl.classList.add('fade-in');
          typing = false;
          resolve();
        }
      })();
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

    for (const line of scene.lines) {
      await typeLine(line, contentEl);
      await new Promise(r => setTimeout(r, LINE_PAUSE));
    }

    // Final scene — only show See You Again
    if (index === scenes.length - 1) {
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'none';
      seeAgainBtn.classList.add('visible');
    } else {
      nextBtn.style.display = 'inline-block';
      prevBtn.style.display = 'inline-block';
      seeAgainBtn.classList.remove('visible');
    }
  }

  function goToScene(index) {
    if (index < 0) index = 0;
    if (index >= scenes.length) index = scenes.length - 1;
    currentScene = index;
    playScene(index);
  }

  prevBtn.onclick = () => { if (!typing) goToScene(currentScene - 1); };
  nextBtn.onclick = () => { if (!typing) goToScene(currentScene + 1); };
  sceneContainer.onclick = () => {
    if (!typing && currentScene < scenes.length - 1) goToScene(currentScene + 1);

    // 🔊 start music on first click
    if (musicToggle.checked && !musicStarted) {
      bgMusic.volume = 0.14;
      bgMusic.play().catch(()=>{});
      musicStarted = true;
    }
  };
  seeAgainBtn.onclick = () => {
    seeAgainBtn.classList.remove('visible');
    nextBtn.style.display = 'inline-block';
    prevBtn.style.display = 'inline-block';
    goToScene(0);
  };

  // Manual toggle
  musicToggle.addEventListener('change', (e) => {
    if (!bgMusic.src) return;
    if (musicToggle.checked) {
      bgMusic.volume = 0.14;
      bgMusic.play().catch(()=>{});
      musicStarted = true;
    } else {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      musicStarted = false;
    }
  });

  goToScene(0);
})();
