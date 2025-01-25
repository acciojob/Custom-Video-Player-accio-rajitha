/* Edit this file *//*
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const resetButton = player.querySelector('.player__button[data-skip="0"]');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update the play/pause button text
function updateButton() {
  if (video.paused) {
    toggle.textContent = '►';
  } else {
    toggle.textContent = '❚ ❚';
  }
}

// Skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle range sliders (volume and playback speed)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub through the video (dragging the progress bar)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);

// Reset the video and button states
function resetPlayer() {
  video.pause();
  video.currentTime = 0;
  updateButton();
  progressBar.style.flexBasis = '0%';
}

resetButton.addEventListener('click', resetPlayer);
