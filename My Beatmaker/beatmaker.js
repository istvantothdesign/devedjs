class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = document.querySelector(".tempo-slider").value;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoNr = document.querySelector(".tempo-nr");
    this.tempoValue = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    console.log(activeBars);
    activeBars.forEach((bar) => {
      bar.style.animation = "grow alternate 0.5s ease-in-out";
      bar.addEventListener("animationend", function () {
        bar.style.animation = "";
      });
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    //Check if isPlaying null
    if (this.isPlaying === null) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      this.playBtn.innerHTML = "Stop";
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerHTML = "Play";
      this.index = 0;
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
    // if (selectionName === "kick-select") {
    //   this.currentKick = selectionValue;
    // }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = "0";
          break;
        case "1":
          this.snareAudio.volume = "0";
          break;
        case "2":
          this.hihatAudio.volume = "0";
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = "1";
          break;
        case "1":
          this.snareAudio.volume = "1";
          break;
        case "2":
          this.hihatAudio.volume = "1";
          break;
      }
    }
  }
  changeTempo(e) {
    console.log(e);
    this.tempoNr.innerHTML = e.target.value;
    this.bpm = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    this.start();
  }
}

const drumKit = new DrumKit();

//Event listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoValue.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoValue.addEventListener("change", function () {
  drumKit.updateTempo();
});
