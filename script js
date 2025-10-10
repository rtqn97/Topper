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
        "Some Stories Don’t End, They Just Pause in the Heart.",
        "To Be Continued with My Lady. 😚❤️"
      ],
      final: true
    }
  ];

  const contentEl = document.getElementById("content");
  const sceneEl = document.getElementById("scene");
  const bgMusic = document.getElementById("bgMusic");
  let currentScene = 0;
  let typing = false;

  const TYPING_SPEED = 32;
  const LINE_PAUSE = 540;

  function clearContent() {
    contentEl.innerHTML = "";
  }

  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    const size = 10 + Math.random() * 16;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${60 + Math.random() * 30}%`;
    heart.style.opacity = (0.6 + Math.random() * 0.4).toString();
    document.body.appendChild(heart);
    heart.animate(
      [
        { transform: `translateY(0) scale(1) rotate(45deg)`, opacity: heart.style.opacity },
        { transform: `translateY(-200px) scale(1.1) rotate(45deg)`, opacity: 0 }
      ],
      { duration: 4000 + Math.random() * 2000, easing: "ease-out" }
    );
    setTimeout(() => heart.remove(), 6000);
  }

  setInterval(() => { if (Math.random() < 0.6) spawnHeart(); }, 900);

  function typeLine(text) {
    return new Promise((resolve) => {
      const lineEl = document.createElement("div");
      lineEl.className = "line";
      contentEl.appendChild(lineEl);
      let i = 0;
      typing = true;
      function step() {
        if (i <= text.length) {
          lineEl.textContent = text.slice(0, i);
          i++;
          if (i <= text.length) setTimeout(step, TYPING_SPEED + Math.random() * 10);
          else {
            lineEl.classList.add("fade-in");
            typing = false;
            resolve();
          }
        }
      }
      step();
    });
  }

  async function playScene(index) {
    clearContent();
    const scene = scenes[index];
    const titleEl = document.createElement("div");
    titleEl.className = "line fade-in";
    titleEl.style.fontWeight = "600";
    titleEl.style.fontSize = "1.08rem";
    titleEl.style.marginBottom = "14px";
    titleEl.style.color = "var(--soft-pink)";
    titleEl.textContent = scene.title;
    contentEl.appendChild(titleEl);

    await new Promise(r => setTimeout(r, 300));

    for (const line of scene.lines) {
      await typeLine(line);
      await new Promise(r => setTimeout(r, LINE_PAUSE));
    }

    if (scene.final) {
      const btn = document.createElement("button");
      btn.textContent = "See You Again";
      btn.className = "final-btn";
      btn.onclick = () => {
        contentEl.innerHTML = "<div class='line fade-in'>Until next time… 💫</div>";
      };
      contentEl.appendChild(btn);
    }
  }

  function goNext() {
    if (typing) return;
    if (currentScene < scenes.length - 1) {
      currentScene++;
      playScene(currentScene);
    }
  }

  sceneEl.addEventListener("click", goNext);

  function startMusic() {
    bgMusic.volume = 0.3;
    bgMusic.play().catch(() => {
      document.body.addEventListener("click", () => bgMusic.play(), { once: true });
    });
  }

  function init() {
    playScene(currentScene);
    startMusic();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
