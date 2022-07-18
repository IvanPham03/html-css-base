// button

const btnBack = document.querySelector(".back");
const btnNext = document.querySelector(".next");
const btnPlay = document.querySelector(".play");

// console.log(btnPlay);
// console.log(btnBack);
// console.log(btnNext);

// option
const audio = document.querySelector("#audio");
const nameSong = document.querySelector(".song");
const author = document.querySelector(".author");
const songs = document.querySelector(".list-song");
const duration = document.querySelector(".progress-durationTime");
const optionBar = document.querySelector(".option-bar");
const thumbnail = document.getElementById("disk-img");
const progressBar = document.querySelector(".progress-bar");
const progressRun = document.querySelector(".progress-run");
const currentTimeDisplay = document.querySelector('.progress-currentTime');



// console.log(progress);
// console.log(thumbnail);
// console.log(optionBar);

const listMusic = [
  { song: "Tình Thu Sao Hạ Buồn", author: "Dakaa" },
  { song: "Xứng Đôi Cưới Thôi", author: "Lê Thiện Hiếu" },
];

// console.log(listMusic);
// xu ly giao dien nguoi dung dong thoi load thong tin va bjai hat

class UI {
  constructor() {
    this.songIndex = 0;
  }

  // lay thoi gian cua bai hat

  getDuration(music) {
    return new Promise(function (resolve) {
      music.addEventListener("loadedmetadata", function () {
        const time = formatTime(music.duration);
        resolve(time);
      });
    });
  }

  // set list song

  async setSong() {
    songs.innerHTML = "";
    for (let i = 0; i < listMusic.length; i++) {
      const music = new Audio(`./src/music/${listMusic[i].song}.mp3`);
      const time = await this.getDuration(music);
    }
  }

  // load thong tin len trang
  loadSong(music) {
    audio.src = `./src/music/${music.song}.mp3`;
    this.getDuration(audio).then((time) => {
      nameSong.textContent = music.song;
      author.textContent = music.author;
      duration.textContent = time;
      // console.log(time);
      // console.log(`./src/music/${music.song}.mp3`);
      // console.log(music.song);
      // console.log(music.author);
    });
  }

  // nut play

  playBtn() {
    optionBar.classList.add("running");
    // console.log(btnPlay.querySelector('.fa'));
    thumbnail.style.animation = "rotate 4s linear 0s infinite";
    btnPlay.querySelector(".fa").classList.add("fa-pause-circle-o");
    btnPlay.querySelector(".fa").classList.remove("fa-play-circle-o");
    // console.log(btnPlay.classList);
    audio.play();
    // console.log(btnPlay.querySelector('.fa'));
  }
  pauseBtn() {
    optionBar.classList.remove("running");
    thumbnail.style.animationPlayState = "paused";
    btnPlay.querySelector(".fa").classList.add("fa-play-circle-o");
    btnPlay.querySelector(".fa").classList.remove("fa-pause-circle-o");
    audio.pause();
    // console.log(btnPlay.classList);
  }

  // btn next
  nextBtn() {
    this.songIndex++;
    this.songIndex > listMusic.length - 1
      ? (this.songIndex = 0)
      : this.songIndex;
    console.log(this.songIndex);
    this.loadSong(listMusic[this.songIndex]);
  }
  // btn back
  backBtn() {
    this.songIndex--;
    this.songIndex < 0
      ? (this.songIndex = listMusic.length - 1)
      : this.songIndex;
    this.loadSong(listMusic[this.songIndex]);
    console.log(this.songIndex);
  }

  // set time  progress-bar
  setTime(e) {

    //  width la chieu dai tu dau den diem click chuot
    const width = e.offsetX;
    // pgb lay phan tu ma cha cua no, de lay do dai cua thanh bar client
    const pgb = e.currentTarget;
    // tinh phan tram phu thuoc vao do dai thanh bar cua client
    const percentWidthClient = (width / pgb.clientWidth) * 100;
    progressRun.style.width = `${percentWidthClient}%`;
    // console.log(percentWidthClient);
    console.log(width);
    console.log(pgb.clientWidth);

    // luu y: duration tra ve giay
    let {duration} = audio;
    audio.currentTime = (width * duration)/ pgb.clientWidth;
    // audio.currentTime 
  }
  updateTime(e) {
    const { currentTime, duration } = e.srcElement;
    // console.log(currentTime);
    // console.log(duration);
    const percentWidth = (currentTime / duration) * 100;
    progressRun.style.width = `${percentWidth}%`;
    const time = formatTime(currentTime);
    currentTimeDisplay.textContent = time;
  }
}

function formatTime(sec) {
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = Math.floor(sec - hours * 3600 - minutes * 60);

  hours = hours < 10 ? (hours > 0 ? "0" + hours : 0) : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return (hours !== 0 ? hours + ":" : "") + minutes + ":" + seconds;
}

document.addEventListener("DOMContentLoaded", eventListeners);

function eventListeners() {
  console.log("loaded success!");
  const ui = new UI();
  ui.loadSong(listMusic[0]);
  btnPlay.addEventListener("click", function () {
    if (optionBar.classList.contains("running")) {
      ui.pauseBtn();
    } else {
      ui.playBtn();
    }
  });
  btnNext.addEventListener("click", function () {
    ui.nextBtn();
    ui.playBtn();
  });

  btnBack.addEventListener("click", function () {
    ui.backBtn();
    ui.playBtn();
  });
  audio.addEventListener("ended", function () {
    ui.nextBtn();
    ui.playBtn();
  });
  progressBar.addEventListener("click", function (e) {
    ui.setTime(e);
  });
  audio.addEventListener("timeupdate", function (e) {
    ui.updateTime(e);
  });
}
