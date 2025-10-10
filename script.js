<script>
document.addEventListener("DOMContentLoaded", () => {
  const scenes = [
    {
      title: "Let's Start My 🍬❤️",
      lines: ["Click Start to Begin Our Little Story 💞"],
      intro: true
    },
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
      title: "Some Stories Don’t End, They Just Pause in the Heart",
      lines: ["To Be Continued with My Lady. 😚❤️"],
      ending: true
    }
  ];

  const content = document.getElementById("content");
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  const seeYou = document.getElementById("seeYouBtn");
  const audio = new Audio("Perfect.mp3");
  audio.loop = true;
  let sceneIndex = 0;

  function fadeText(newHTML) {
    content.style.opacity = 0;
    setTimeout(() => {
      content.innerHTML = newHTML;
      content.style.opacity = 1;
    }, 400);
  }

  function showScene() {
    const s = scenes[sceneIndex];
    const linesHTML = s.lines.map(l => `<div class="line">${l}</div>`).join("");
    fadeText(`<h2>${s.title}</h2>${linesHTML}`);

    if (s.intro) {
      prev.style.display = "none";
      next.style.display = "none";
      seeYou.style.display = "none";
      const start = document.createElement("button");
      start.textContent = "Start";
      start.className = "nav-button";
      start.style.marginTop = "40px";
      start.onclick = () => {
        audio.play();
        sceneIndex++;
        showScene();
        start.remove();
      };
      content.appendChild(start);
    } else if (s.ending) {
      prev.style.display = "none";
      next.style.display = "none";
      seeYou.style.display = "inline-block";
    } else {
      prev.style.display = sceneIndex > 1 ? "inline-block" : "none";
      next.style.display = "inline-block";
      seeYou.style.display = "none";
    }
  }

  prev.addEventListener("click", () => {
    if (sceneIndex > 1) {
      sceneIndex--;
      showScene();
    }
  });

  next.addEventListener("click", () => {
    if (sceneIndex < scenes.length - 1) {
      sceneIndex++;
      showScene();
    }
  });

  seeYou.addEventListener("click", () => {
    fadeText("<h2>See You Again ❤️</h2>");
    seeYou.style.display = "none";
    audio.pause();
  });

  showScene();
});
</script>
