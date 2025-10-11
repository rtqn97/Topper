@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

:root {
  --bg1: #f0c0ff;
  --bg2: #c0f0ff;
  --text: #fff;
  --btn-bg: rgba(255, 255, 255, 0.2);
  --btn-hover: rgba(255, 255, 255, 0.4);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body, html {
  height: 100%;
  overflow: hidden;
  color: var(--text);
}

body {
  background: linear-gradient(-45deg, #e3a1ff, #a8e6ff, #ffb3c6, #b5fffc);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@keyframes gradientShift {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}

.hidden {
  display: none;
}

#start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

#start-btn {
  background: var(--btn-bg);
  border: none;
  padding: 12px 28px;
  font-size: 1.2rem;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

#start-btn:hover {
  background: var(--btn-hover);
}

#story-container {
  width: 100%;
  max-width: 600px;
  padding: 20px;
}

.line {
  opacity: 0;
  transition: opacity 0.5s ease;
  margin-bottom: 12px;
  font-size: 1rem;
}

.fade-in {
  opacity: 1;
}

.nav-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

button {
  background: var(--btn-bg);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

button:hover {
  background: var(--btn-hover);
}
