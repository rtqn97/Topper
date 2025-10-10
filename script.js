// === Visual Love Diary ===
// Same as the first version you loved — fixed buttons + music + proper ending.

(function () {
  // --- All scenes (original texts) ---
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
      title: "The First Call",
      lines: [
        "She wanted to see me. Video call? The word itself made my heartbeat skip.",
        "I panicked. I’m the one who hides behind silence and profile pictures.",
        "But curiosity won that night. I clicked ‘accept’.",
        "Her smile wasn’t perfect. That’s why it felt real."
      ]
    },
    {
      title: "The Little Things",
      lines: [
        "Days started flowing like messages. Simple words, small smiles.",
        "I asked for pictures — not to collect them, but to collect her moods.",
        "“I want to see your happy side, sad side, angry side… if you’re comfortable.”",
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
      ]
    }
  ];

  // --- Elements ---
  const contentEl = document.getElementById("content");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const bgMusic = document.getElementById("bgMusic");

  // --- State ---
  let currentScene = 0;
  let typing = false;

  // --- Typewriter effect ---
  const TYPE_SPEED = 35;

  function typeLine(line) {
    return new Promise((resolve) => {
      const lineEl = document.createElement("div");
      lineEl.className = "line";
      contentEl.appendChild(lineEl);

      let i = 0;
      typing = true;
      function step() {
        if (i <= line.length) {
          lineEl.textContent = line.slice(0, i);
          i++;
          setTimeout(step, TYPE_SPEED);
        } else {
          typing = false;
          resolve();
        }
      }
      step();
    });
  }

  async function playScene(index) {
    contentEl.innerHTML = "";
    const scene = scenes[index];
    if (!scene) return;

    // Title
    const titleEl = document.createElement("div");
    titleEl.className = "title fade-in";
    titleEl.textContent = scene.title;
    contentEl.appendChild(titleEl);
    await new Promise((r) => setTimeout(r, 300));

    // Lines
    for (const line of scene.lines) {
      await typeLine(line);
      await new Promise((r) => setTimeout(r, 450));
    }

    // If last scene — show final button
    if (index === scenes.length - 1) {
      const endBtn = document.createElement("button");
      endBtn.textContent = "See You Again 💫";
      endBtn.className = "navBtn fade-in";
      endBtn.style.marginTop = "30px";
      endBtn.onclick = () => {
        bgMusic.pause();
        contentEl.innerHTML =
          "<div class='line fade-in'>Until we meet again... 🌙</div>";
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      };
      contentEl.appendChild(endBtn);
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "inline-block";
    }
  }

  // --- Navigation ---
  function goToScene(index) {
    if (index < 0) index = 0;
    if (index >= scenes.length) index = scenes.length - 1;
    currentScene = index;
    playScene(currentScene);
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === scenes.length - 1;
  }

  prevBtn.onclick = () => {
    if (!typing) goToScene(currentScene - 1);
  };
  nextBtn.onclick = () => {
    if (!typing) goToScene(currentScene + 1);
  };

  // --- Music setup ---
  function initMusic() {
    if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.loop = true;
      bgMusic.play().catch(() => {
        // Safari/Chrome autoplay block: resume on first click
        document.body.addEventListener(
          "click",
          () => {
            bgMusic.play();
          },
          { once: true }
        );
      });
    }
  }

  // --- Hearts (keep your dreamy effect) ---
  function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    const size = 12 + Math.random() * 18;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.top = `${70 + Math.random() * 20}%`;
    heart.style.opacity = 0.6 + Math.random() * 0.4;
    document.body.appendChild(heart);
    heart.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        {
          transform: `translateY(-${150 + Math.random() * 100}px)`,
          opacity: 0
        }
      ],
      { duration: 5000 + Math.random() * 2000, easing: "ease-out" }
    );
    setTimeout(() => heart.remove(), 7000);
  }
  setInterval(() => {
    if (Math.random() < 0.6) spawnHeart();
  }, 900);

  // --- Init ---
  function init() {
    goToScene(0);
    initMusic();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
