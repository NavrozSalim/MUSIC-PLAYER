const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-title');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeControl = document.getElementById('volume-control');

const songs = [
    { title: "Kun Anta", src: "Kun Anta ｜ Vocals Only - Without Music ｜ Slow & Reverb - English Lyrics + Translation ｜ Hamood.mp3" },
    { title: "Kun Faya Kun", src: "Kun Faya Kun -[Lyrics] [WORMONO x Drifting Lights Lofi Remake].mp3" },
    { title: "where you are", src: "where you are ( Nasheed instrumental ) Slowed + Reverb ✨ (1).mp3" }
];

let songIndex = 0;

// Load the initial song
function loadSong(song) {
    songTitle.innerText = song.title;
    audioPlayer.src = song.src;
    console.log("Loading song:", song.src); // Debugging line
}

function playSong() {
    audioPlayer.play();
    document.getElementById('play-btn').style.display = 'none';
    document.getElementById('pause-btn').style.display = 'inline';
}

function pauseSong() {
    audioPlayer.pause();
    document.getElementById('play-btn').style.display = 'inline';
    document.getElementById('pause-btn').style.display = 'none';
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Event listeners
document.getElementById('play-btn').addEventListener('click', playSong);
document.getElementById('pause-btn').addEventListener('click', pauseSong);
document.getElementById('next-btn').addEventListener('click', nextSong);
document.getElementById('prev-btn').addEventListener('click', prevSong);

// Update progress bar as the song plays
audioPlayer.addEventListener('timeupdate', () => {
    if (!isNaN(audioPlayer.duration)) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progressPercent;

        // Update time display
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        const durationMinutes = Math.floor(audioPlayer.duration / 60);
        const durationSeconds = Math.floor(audioPlayer.duration % 60);

        currentTimeEl.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
        durationEl.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
    }
});

// Change song position when progress bar is clicked
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value * audioPlayer.duration) / 100;
    audioPlayer.currentTime = newTime;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

// Auto play next song when the current one ends
audioPlayer.addEventListener('ended', nextSong);

// Load the first song on page load
window.addEventListener('DOMContentLoaded', () => {
    loadSong(songs[songIndex]);
});
