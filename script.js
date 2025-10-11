const scenes = [
  {
    lines: [
      "We met online — two strangers scrolling past galaxies of faces.",
      "That day, we didn’t talk. Just crossed each other’s orbit once.",
      "Funny how silence can leave an echo."
    ]
  },
  {
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
    lines: [
      "She wanted to see me. Video call? The word itself made my heartbeat skip.",
      "I panicked. I’m the one who hides behind silence and profile pictures.",
      "But curiosity won that night. I clicked ‘accept’.",
      "Her smile wasn’t perfect. That’s why it felt real."
    ]
  },
  {
    lines: [
      "Days started flowing like messages. Simple words, small smiles.",
      "I asked for pictures — not to collect them, but to collect her moods.",
      "“I want to see your happy side, sad side, angry side… if you’re comfortable.”",
      "She never said no — just hesitated. And I learned that hesitation has its own beauty."
    ]
  },
  {
    lines: [
      "She rarely texted first.",
      "Dry replies, late replies, sometimes no replies.",
      "But she never ignored a call — not even once.",
      "Maybe that was her silent way of saying she still cared."
    ]
  },
  {
    lines: [
      "After days of silence, she sent pictures again.",
      "Every time I thought of giving up, she showed up on the screen — smiling, glowing.",
      "And I fell again. Every. Single. Time.",
      "I never told her that she had become my favorite form of distraction."
    ]
  },
  {
    lines: [
      "We talk, we drift, we talk again.",
      "She stays dry, I stay drawn.",
      "Maybe that’s our rhythm — imperfect, but ours.",
      "Every time she fades, I promise to let go.",
      "Then she sends another smile… and I forget again."
    ]
  },
  {
    lines: [
      "Then came the misunderstanding.",
      "He said something general in frustration, but she took it personally.",
      "She texted, “😡😡 Block me.”",
      "He panicked, called, tried to explain — but she didn’t pick up."
    ]
  },
  {
    lines: [
      "She said she didn’t want to hurt him, didn’t want to be someone’s reason to feel down.",
      "He said, “It wasn’t for you. I’d never say that to you.”",
      "She ignored the calls, unfollowed him.",
      "He lashed out — then softened again.",
      "“Sometimes I do have phases, please try to understand.”"
    ]
  },
  {
    lines: [
      "She said, “Block gardina dhannaley.”",
      "He replied, “Okay do it. I tried and it didn’t work. I don’t regret trying.”",
      "She said, “No need to announce to the world.”",
      "He said, “If you don’t want to understand, I can’t force you.”"
    ]
  },
  {
    lines: [
      "She said thanks for the effort and sorry for all the moments from beginning.",
      "He said, “Meeting you was the best part, my best distraction.”",
      "She said she hated herself and didn’t want to talk to anyone.",
      "He said, “Then ending isn’t the only option. You can move on, you can find light.”",
      "After that — silence."
    ]
  },
  {
    lines: [
      "Hope to Cross Paths Again in Another Timeline or Dimension ❤️"
    ]
  }
];

const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const storyContainer = document.getElementById('story-container');
const contentEl = document.getElementById('content');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const bgMusic = document.getElementById('bgMusic');

let currentScene = 0;
let typing = false;

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  storyContainer.classList.remove('hidden');
  bgMusic.volume = 0.15;
  bgMusic.play().catch(() => {});
  showScene(currentScene);
});

function typeLine(text, container) {
  return new Promise((resolve) => {
    const lineEl = document.createElement('div');
    lineEl.className = 'line';
    container.appendChild(lineEl);
    let i = 0;
    function step() {
      if (i <= text.length) {
        lineEl.textContent = text.slice(0, i);
        i++;
        setTimeout(step, 28);
      } else {
        lineEl.classList.add('fade-in');
        resolve();
      }
    }
    step();
  });
}

async function showScene(index) {
  typing = true;
  contentEl.innerHTML = '';
  const lines = scenes[index].lines;
  for (let line of lines) {
    await typeLine(line, contentEl);
    await new Promise(r => setTimeout(r, 400));
  }
  typing = false;
}

nextBtn.addEventListener('click', () => {
  if (typing) return;
  if (currentScene < scenes.length - 1) {
    currentScene++;
    showScene(currentScene);
  }
});

prevBtn.addEventListener('click', () => {
  if (typing) return;
  if (currentScene > 0) {
    currentScene--;
    showScene(currentScene);
  }
});
