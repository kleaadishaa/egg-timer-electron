function openMenu() {
  window.location.href = 'menu.html';
}

function openTimer(minutes) {
  window.location.href = `timer.html?min=${minutes}`;
}

document.addEventListener('DOMContentLoaded', () => {

  const minBtn = document.getElementById('min-btn');
  const maxBtn = document.getElementById('max-btn');
  const closeBtn = document.getElementById('close-btn');

  if (minBtn) minBtn.addEventListener('click', () =>
    window.electronAPI.controlWindow('minimize')
  );
  if (maxBtn) maxBtn.addEventListener('click', () =>
    window.electronAPI.controlWindow('maximize')
  );
  if (closeBtn) closeBtn.addEventListener('click', () =>
    window.electronAPI.controlWindow('close')
  );

  window.electronAPI.onWindowMaximized((isMaximized) => {
    const icon = maxBtn?.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-expand', !isMaximized);
    icon.classList.toggle('fa-compress', isMaximized);
  });

  /* TIMER LOGIC */

const countdownEl = document.getElementById('countdown');
const gifEl = document.getElementById('countdown-gif');
if (!countdownEl) return; 

const params = new URLSearchParams(window.location.search);
const minutes = parseInt(params.get('min'));

if (!minutes || isNaN(minutes)) return;

let totalSeconds = minutes * 60;

const alarm = new Audio('assets/alarm-clock-short-6402.mp3');
alarm.volume = 1.0;

// Show GIF when countdown starts
gifEl.style.display = 'block';

const timerInterval = setInterval(() => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  countdownEl.textContent =
    `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  totalSeconds--;

  if (totalSeconds < 0) {
    clearInterval(timerInterval);
      alarm.play();
    countdownEl.textContent = 'Your egg is ready!';
    countdownEl.style.textAlign = 'center';
    countdownEl.style.fontSize = '3rem';
    countdownEl.style.lineHeight = '2';
    alarm.play();

    // Hide GIF when countdown ends
    gifEl.style.display = 'none';
  }
}, 1000);

});
