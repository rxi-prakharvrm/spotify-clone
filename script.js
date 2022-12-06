console.log("Hello Here!")

// Initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("master-play");
let myProgressBar = document.getElementById("my-progress-bar")
let playingGif = document.getElementById("playing-gif")
let songItems = Array.from(document.getElementsByClassName("song-item"))
let masterSongName = document.getElementById("master-song-name");

let songs = [
    {songName: "Jehda Nasha", filePath: "song/1.mp3", coverPath: "cover/1.jpg"},
    {songName: "Let Me Love You", filePath: "song/2.mp3", coverPath: "cover/2.jpg"},
    {songName: "Aashiqui", filePath: "song/3.mp3", coverPath: "cover/3.jpg"},
    {songName: "Humsafar", filePath: "song/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "Brown Munde", filePath: "song/5.mp3", coverPath: "cover/5.jpg"},
    {songName: "Mere Mehboob", filePath: "song/6.mp3", coverPath: "cover/6.jpg"}
]

songItems.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByClassName("song-name")[0].textContent = songs[i].songName
    element.getElementsByClassName("song-name")[0].src = songs[i].filePath
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
})

// audioElement.play();

// Handle play pause click
masterPlay.addEventListener("click", () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        playingGif.style.opacity="1"
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause")
        masterPlay.classList.add("fa-circle-play")
        playingGif.style.opacity="0"
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    //Update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")
    })
}

Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlays()
        songIndex = parseInt(e.target.id)
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        playingGif.style.opacity="1"
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        masterSongName.innerText = songs[songIndex].songName
    })
})

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 5
    }
    else {
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    playingGif.style.opacity="1"
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
    masterSongName.innerText = songs[songIndex].songName
})

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 5) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    playingGif.style.opacity="1"
    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
    masterSongName.innerText = songs[songIndex].songName
})
