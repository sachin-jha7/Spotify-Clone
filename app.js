
let songs = [
    new Audio("Songs/Aavan-Jaavan.mp3"),
    new Audio("Songs/Tum-se.mp3"),
    new Audio("Songs/Mahiye-Jinna-Sohna.mp3"),
    new Audio("Songs/Phero-Na-Najariya.mp3"),
    new Audio("Songs/Aayat.mp3"),
    new Audio("Songs/Ek-Dil-Ek-Jaan.mp3"),
    new Audio("EnSongs/Closer.mp3"),
    new Audio("EnSongs/Treat-You-Better.mp3")
];

let currSong = 0;

let playBtn = document.querySelectorAll(".play");
let backwardBtn = document.querySelectorAll(".backward");
let forwardBtn = document.querySelectorAll(".forward");
let pauseBtn = document.querySelectorAll(".pause");
let musicName = document.querySelector(".music-name");
let durationInMins = document.querySelector(".mins");
let durationInSecs = document.querySelector(".secs");
let currRunTime = document.querySelector(".run-time");
// let songRunTimeSecs = document.querySelector(".run-timeSec");
let mins; let secs;
let ball = document.querySelector(".ball");
let seekBar = document.querySelector(".line");

for (let btn of pauseBtn) {
    btn.style.display = "none";
}

let loadSongs = (currSong) => {
    songs[currSong].addEventListener("loadedmetadata", () => {
        const totalDuration = songs[currSong].duration;
        // console.log(totalDuration);
        mins = Math.floor(totalDuration / 60);
        secs = Math.floor(totalDuration % 60);
        // console.log(`${mins}:${secs}`);
        durationInMins.innerText = `0${mins}`;
        document.querySelector(".mins2").innerText = `0${mins}`;
        if (secs < 10) {
            durationInSecs.innerText = `0${secs}`;
            document.querySelector(".secs2").innerText = `0${secs}`;
        } else {
            durationInSecs.innerText = `${secs}`;
            document.querySelector(".secs2").innerText = `${secs}`;
        }
    });
    songs[currSong].load();
};


let formatTime = (time) => {
    if (isNaN(time)) return "00:00";

    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);

    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

seekBar.addEventListener("click", (event) => {
    let rect = seekBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    songs[currSong].currentTime = percent * songs[currSong].duration;
});

let line = document.querySelector(".line2");
line.addEventListener("click", () => {
    let rect = seekBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    songs[currSong].currentTime = percent * songs[currSong].duration;
});

for (let btn of playBtn) {
    btn.addEventListener("click", () => {
        for (let BTN of pauseBtn) {
            BTN.style.display = "inline-block";
        }
        for (let PlBTN of playBtn) {
            PlBTN.style.display = "none";
        }

        songs[currSong].ontimeupdate = () => {
            currRunTime.innerText = formatTime(songs[currSong].currentTime);
            currentTime2.innerText = formatTime(songs[currSong].currentTime);
            const percent = (songs[currSong].currentTime / songs[currSong].duration * 100);
            ball.style.left = percent + "%";
            ball2.style.left = percent + "%";
        };
        songs[currSong].play();
    });
}

for (let btn of pauseBtn) {
    btn.addEventListener("click", () => {
        for (let BTN of pauseBtn) {
            BTN.style.display = "none";
        }
        for (let PlBTN of playBtn) {
            PlBTN.style.display = "inline-block";
        }
        songs[currSong].pause();

        for (let song of musicArray) {
            song.classList.remove("glow");
        }

    });
}


let changeSongName = (currSong) => {
    if (currSong == 0) {
        musicName.innerText = "Aavan Jaavan";
        songName.innerText = "Aavan Jaavan";
        songImg.src = "Gallery/Aavan-Jaavan-poster.jpg";
        ShadowEffect();
    } else if (currSong == 1) {
        musicName.innerText = "Tum Se";
        songName.innerText = "Tum Se";
        songImg.src = "Gallery/tum-se-poster.jpg";
        ShadowEffect();
    } else if (currSong == 2) {
        musicName.innerText = "Mahiye Jinna Sohna";
        songName.innerText = "Mahiye Jinna Sohna";
        songImg.src = "Gallery/Mahiye-Jinna-Sohna-poster.jpg";
        ShadowEffect();
    } else if (currSong == 3) {
        musicName.innerText = "Phero Na Najariya";
        songName.innerText = "Phero Na Najariya";
        songImg.src = "Gallery/Phero-na-najariya-poster.jpeg";
        ShadowEffect();
    } else if (currSong == 4) {
        musicName.innerText = "Aayat";
        songName.innerText = "Aayat";
        songImg.src = "Gallery/aayat-song-poster.jpg";
        ShadowEffect();
    } else if (currSong == 5) {
        musicName.innerText = "Ek Dil Ek Jaan";
        songName.innerText = "Ek Dil Ek Jaan";
        songImg.src = "Gallery/ek-dil-ek-jaan-poster.jpeg";
        ShadowEffect();
    } else if (currSong == 6) {
        musicName.innerText = "Closer";
        songName.innerText = "Closer";
        songImg.src = "Gallery/closer-poster.jpeg";
        ShadowEffect();
    } else if (currSong == 7) {
        musicName.innerText = "Treat You Better";
        songName.innerText = "Treat You Better";
        songImg.src = "Gallery/Treat_You_Better-poster.png";
        ShadowEffect();
    }
}

for (let btn of forwardBtn) {
    btn.addEventListener("click", () => {
        // console.log("btn clicked");
        songs[currSong].pause();
        songs[currSong].currentTime = 0;
        currSong++;
        if (currSong >= songs.length) {
            currSong = 0;
        }
        changeSongName(currSong);
        loadSongs(currSong);
        for (let BTN of pauseBtn) {
            BTN.style.display = "inline-block";
        }
        for (let PlBTN of playBtn) {
            PlBTN.style.display = "none";
        }
        songs[currSong].ontimeupdate = () => {
            currRunTime.innerText = formatTime(songs[currSong].currentTime);
            currentTime2.innerText = formatTime(songs[currSong].currentTime);
            const percent = (songs[currSong].currentTime / songs[currSong].duration * 100);
            ball.style.left = percent + "%";
            ball2.style.left = percent + "%";
        };
        songs[currSong].play();
    });
}

for (let btn of backwardBtn) {
    btn.addEventListener("click", () => {
        songs[currSong].pause();
        songs[currSong].currentTime = 0;
        currSong--;
        if (currSong < 0) {
            currSong = 7;
        }
        changeSongName(currSong);
        loadSongs(currSong);
        for (let BTN of pauseBtn) {
            BTN.style.display = "inline-block";
        }
        for (let PlBTN of playBtn) {
            PlBTN.style.display = "none";
        }
        songs[currSong].ontimeupdate = () => {
            currRunTime.innerText = formatTime(songs[currSong].currentTime);
            currentTime2.innerText = formatTime(songs[currSong].currentTime);
            const percent = (songs[currSong].currentTime / songs[currSong].duration * 100);
            ball.style.left = percent + "%";
            ball2.style.left = percent + "%";
        };
        songs[currSong].play();
    });
}


// Side bar animation

let sideBar = document.querySelector(".left");
let menuBtn = document.querySelector(".menu-btn");
let crossBtn = document.querySelector(".cross-btn");

menuBtn.addEventListener("click", () => {
    if (window.innerWidth <= 430) {
        sideBar.style.left = "50%";
    } else {
        sideBar.style.left = "183px";
    }
});

crossBtn.addEventListener("click", () => {
    sideBar.style.left = "-100%";
});

// Shadow effect

let ShadowEffect = () => {
    const colorThief = new ColorThief();
    const img = document.querySelector("#img");

    if (img.complete) {
        applyShadowColor(img, colorThief);
    } else {
        img.addEventListener("load", () => {
            applyShadowColor(img, colorThief);
        });
    }
}

window.onload = () => {
    const colorThief = new ColorThief();
    const img = document.querySelector("#img");

    if (img.complete) {
        applyShadowColor(img, colorThief);
    } else {
        img.addEventListener("load", () => {
            applyShadowColor(img, colorThief);
        });
    }
}

let applyShadowColor = (imgElmt, colorThief) => {
    const color = colorThief.getColor(imgElmt);
    const shadowColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    imgElmt.style.boxShadow = `0px 0px 50px ${shadowColor}`;
}


let currentTime2 = document.querySelector(".run-time2");

let updateDuration = (idx) => {
    songs[idx].ontimeupdate = () => {
        currentTime2.innerText = formatTime(songs[idx].currentTime);
        currRunTime.innerText = formatTime(songs[idx].currentTime);
        const percent = (songs[idx].currentTime / songs[idx].duration * 100);
        ball.style.left = percent + "%";
        ball2.style.left = percent + "%";
    };
}


// Card click event management

let ball2 = document.querySelector(".ball2");
let line2 = document.querySelector(".line2");

let songCrossBtn = document.querySelector(".song-cross-btn");
let songBox = document.querySelector(".song-box");
let allCards = document.querySelectorAll(".card");
let songImg = document.getElementById("img");
let songName = document.querySelector(".song-info .song-name");

// let musicBox = document.querySelector(".music-bar");
musicName.addEventListener("click", () => {
    if (window.innerWidth < 430.5) {
        songBox.style.top = "55%";
    }
    else {
        songBox.style.top = "12%";
    }
});

for (let card of allCards) {
    card.addEventListener("click", () => {
        let cardId = card.getAttribute("id");

        for (let song of songs) {
            song.pause();
            song.currentTime = 0;
        }
        for (let BTN of pauseBtn) {
            BTN.style.display = "inline-block";
        }
        for (let PlBTN of playBtn) {
            PlBTN.style.display = "none";
        }
        if (window.innerWidth < 430.5) {
            songBox.style.top = "55%";
        } else if (window.innerWidth > 430 && window.innerWidth < 883) {
            songBox.style.top = "56%";
        }
        else {
            songBox.style.top = "12%";
        }

        if (cardId == "card1") {
            currSong = 0;
            updateDuration(0);
            loadSongs(0);
            changeSongName(0);
            songs[0].play();
        } else if (cardId == "card2") {
            currSong = 1;
            updateDuration(1);
            loadSongs(1);
            changeSongName(1);
            songs[1].play();
        } else if (cardId == "card3") {
            currSong = 2;
            updateDuration(2);
            loadSongs(2);
            changeSongName(2);
            songs[2].play();
        } else if (cardId == "card4") {
            currSong = 3;
            updateDuration(3);
            loadSongs(3);
            changeSongName(3);
            songs[3].play();
        } else if (cardId == "card5") {
            currSong = 4;
            updateDuration(4);
            loadSongs(4);
            changeSongName(4);
            songs[4].play();
        } else if (cardId == "card6") {
            currSong = 5;
            updateDuration(5);
            loadSongs(5);
            changeSongName(5);
            songs[5].play();
        } else if (cardId == "card7") {
            currSong = 6;
            updateDuration(6);
            loadSongs(6);
            changeSongName(6);
            songs[6].play();
        } else if (cardId == "card8") {
            currSong = 7;
            updateDuration(7);
            loadSongs(7);
            changeSongName(7);
            songs[7].play();
        }
    })
}

songCrossBtn.addEventListener("click", () => {
    // songBox.style.top = "100%";
    if (window.innerWidth < 430.5) {
        songBox.style.top = "200%";
    }
    else if (window.innerWidth > 430 && window.innerWidth < 883) {
        songBox.style.top = "200%";
    }
    else {
        songBox.style.top = "100%";
    }
});

// library box click event management

let musicBtn = document.querySelectorAll(".song");

let musicArray = Array.from(musicBtn);

for (let btn of musicBtn) {
    btn.addEventListener("click", () => {

        let songId = btn.getAttribute("id");

        for (let song of songs) {
            song.pause();
            song.currentTime = 0;
        }
        for (let song of musicArray) {
            song.classList.remove("glow");
        }

        for (let BTN of pauseBtn) {
            BTN.style.display = "inline-block";
        }
        for (let PlBTN of playBtn) {
            PlBTN.style.display = "none";
        }
        if (window.innerWidth < 430.5) {
            songBox.style.top = "55%";
        } else if (window.innerWidth > 430 && window.innerWidth < 883) {
            songBox.style.top = "56%";
        } else {
            songBox.style.top = "12%";
        }

        if (songId == "song1") {
            currSong = 0;
            updateDuration(0);
            loadSongs(0);
            changeSongName(0);
            songs[0].play();
            boxAnimation(musicArray[0]);
        } else if (songId == "song2") {
            currSong = 1;
            updateDuration(1);
            loadSongs(1);
            changeSongName(1);
            songs[1].play();
            boxAnimation(musicArray[1]);
        } else if (songId == "song3") {
            currSong = 2;
            updateDuration(2);
            loadSongs(2);
            changeSongName(2);
            songs[2].play();
            boxAnimation(musicArray[2]);
        } else if (songId == "song4") {
            currSong = 3;
            updateDuration(3);
            loadSongs(3);
            changeSongName(3);
            songs[3].play();
            boxAnimation(musicArray[3]);
        } else if (songId == "song5") {
            currSong = 4;
            updateDuration(4);
            loadSongs(4);
            changeSongName(4);
            songs[4].play();
            boxAnimation(musicArray[4]);
        } else if (songId == "song6") {
            currSong = 5;
            updateDuration(5);
            loadSongs(5);
            changeSongName(5);
            songs[5].play();
            boxAnimation(musicArray[5]);
        } else if (songId == "song7") {
            currSong = 6;
            updateDuration(6);
            loadSongs(6);
            changeSongName(6);
            songs[6].play();
            boxAnimation(musicArray[6]);
        } else if (songId == "song8") {
            currSong = 7;
            updateDuration(7);
            loadSongs(7);
            changeSongName(7);
            songs[7].play();
            boxAnimation(musicArray[7]);
        }
    })
}

// Library box animation

let boxAnimation = (box) => {
    box.classList.add("glow");
}


loadSongs(currSong);
