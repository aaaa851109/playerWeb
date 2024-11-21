const musicList = [
  "music/poison.mp3",
  "music/leave.mp3",
  "music/relyon.mp3",
  "music/fish.mp3",
];

let selectedIndex = 0;
let randomIndex = 0;
let selectedIndexInnerText = ""; //歌曲名稱
let isRepeating = false; // 設置初始狀態為不重複播放
let isRandom = false; // 設置初始狀態為不隨機播放
let isrepeatList = false; // 設置初始狀態為不循環歌單
let currentSongIndex; // 設置初始狀態
let wasPlaying = false; //判斷是否播放
let wasMute = false; //判斷是否播放
let iptTime = 0;

//test
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.querySelector("#audio");
  const controlPanel = document.querySelector("#controlPanel");
  const selectList = document.querySelector("#selectList");
  const playStopBtn = document.querySelector("#playStopBtn");
  const replayBtn = document.querySelector("#replayBtn");
  const prevTime = document.querySelector("#prevTime");
  const prevSong = document.querySelector("#prevSong");
  const nextSong = document.querySelector("#nextSong");
  const nextTime = document.querySelector("#nextTime");
  const setMute = document.querySelector("#setMute");
  const repeatSong = document.querySelector("#repeatSong");
  const randomSong = document.querySelector("#randomSong");
  const repeatList = document.querySelector("#repeatList");
  const tool = document.querySelector("#tool");
  const setVolume = document.querySelector("#setVolume");
  const clickVolumeUp = document.querySelector("#clickVolumeUp");
  const clickVolumeDown = document.querySelector("#clickVolumeDown");
  const showVolume = document.querySelector("#showVolume");
  const showNowTime = document.querySelector("#showNowTime");
  const showSongTime = document.querySelector("#showSongTime");
  const showDetailText = document.querySelector("#showDetailText");
  const progressBar = document.querySelector("#progressBar");
  const showStatus = document.querySelector("#showStatus");
  const closePop = document.querySelector("#closePop");
  const closePopPly = document.querySelector("#closePopPly");

  /////////////////////////////////////////////////////////////
  // let timeoutId;
  // function onTimeDo() {
  //   console.log("滑鼠未移動超過1分鐘，執行動作");
  //   showPopup();
  //   stop();
  // }
  // // 添加滑鼠移動事件監聽器
  // window.addEventListener("mousemove", (event) => {
  //   if (wasPlaying == true) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(onTimeDo, 1000); //一分鐘
  //   }
  // });
  // // 顯示彈跳視窗
  // function showPopup() {
  //   document.getElementById("overlay").style.display = "flex";
  // }
  // // 關閉彈跳視窗
  // function closePopup() {
  //   document.getElementById("overlay").style.display = "none";
  // }
  // closePop.addEventListener("click", function () {
  //   closePopup();
  // });
  // closePopPly.addEventListener("click", function () {
  //   closePopup();
  //   play();
  // });
  ////////////////////////////////////////////

  audio.src = musicList[0];

  //====================================================================================
  //設定 ==> 音量
  function setVolumeFun() {
    audio.volume = setVolume.value / 100;
    showVolume.value = setVolume.value;
    mute();
  }
  //更換靜音圖示
  function mute() {
    if (audio.muted || audio.volume == 0) {
      setMute.setAttribute("class", "fa-solid fa-volume-xmark fa-2x btn");
    } else {
      setMute.setAttribute("class", "fa-solid fa-volume-up fa-2x btn");
    }
  }
  //靜音 ==> 切換
  setMute.addEventListener("click", function () {
    wasMute = audio.muted;
    console.log("Current mute state:", wasMute);
    audio.muted = !audio.muted;
    mute();
  });
  setVolumeFun(); // 顯示初始音量
  setVolume.addEventListener("input", setVolumeFun); // 滑動時顯示音量
  function setVolumeClick(n) {
    setVolume.value = Math.min(100, Math.max(0, parseInt(setVolume.value) + n));
    setVolumeFun(); // 顯示更改音量
  }
  clickVolumeUp.addEventListener("click", function () {
    setVolumeClick(1);
  });
  clickVolumeDown.addEventListener("click", function () {
    setVolumeClick(-1);
  });
  //===================================================================================
  //取得時間格式
  function getTimeFormat(t) {
    let m = parseInt(t / 60);
    let s = parseInt(t % 60);
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return m + ":" + s;
  }
  //曲目歌手進度條
  function getMusicTime() {
    showNowTime.innerText = getTimeFormat(audio.currentTime);
    showSongTime.innerText = getTimeFormat(audio.duration);
    progressBar.value = audio.currentTime;
  }
  // 設定 ==> 滑動進度條
  function setProgress() {
    audio.currentTime = progressBar.value;
  }
  progressBar.addEventListener("input", setProgress);
  // 更新進度條的最大值在音樂的元數據加載完成後
  audio.addEventListener("loadedmetadata", function () {
    progressBar.max = audio.duration;
  });
  //=============================================================================
  //判斷有無播放及更新圖示
  function updatePlayStatus() {
    wasPlaying = !audio.paused; // 更新播放狀態
    if (wasPlaying == true) {
      playStopBtn.setAttribute("class", "fa-solid fa-pause fa-2x btn");
    } else {
      playStopBtn.setAttribute("class", "fa-solid fa-play fa-2x btn");
    }
    console.log("判斷播放:" + wasPlaying);
  }
  //播放&暫停 ==> 音樂
  function stop() {
    showDetailText.innerText = "音樂暫停中...";
    audio.pause();
    updatePlayStatus();
    // 清除滑鼠移動計時器
    // clearTimeout(timeoutId);
  }
  function play() {
    if (isRandom == true) {
      showDetailText.innerText = `正在播放 ${selectList[randomIndex].value}`;
    } else {
      showDetailText.innerText = `正在播放 ${selectList[selectedIndex].value}`;
    }
    setInterval(() => getMusicTime(), 500);
    //////////////////////////////////////
    audio.play();
    updatePlayStatus();
    // timeoutId = setTimeout(onTimeDo, 60000);
  }
  playStopBtn.addEventListener("click", function () {
    if (audio.paused) {
      play();
    } else {
      stop();
    }
  });
  //停止&歸零 ==> 音樂
  replayBtn.addEventListener("click", function () {
    stop();
    audio.currentTime = 0; // 時間歸零
  });
  //================================================================================
  //快轉||倒轉 ==> 音樂
  function changeTime(s) {
    audio.currentTime += s;
  }
  prevTime.addEventListener("click", function () {
    changeTime(-10);
  });
  nextTime.addEventListener("click", function () {
    changeTime(10);
  });
  //次曲||上曲 ==> 音樂
  prevSong.addEventListener("click", function () {
    if (selectedIndex == 0) {
      selectedIndex = 0;
    } else {
      selectedIndex -= 1;
      audio.src = musicList[selectedIndex];
    }
    selectList.value = selectList[selectedIndex].value;
    if (wasPlaying) {
      play();
    }
  });
  nextSong.addEventListener("click", function () {
    if (selectedIndex == musicList.length - 1) {
      selectedIndex = musicList.length - 1;
    } else {
      selectedIndex += 1;
      audio.src = musicList[selectedIndex];
    }
    selectList.value = selectList[selectedIndex].value;
    if (wasPlaying) {
      play();
    }
  });

  //=======================================================================
  //選單切換 ==> 歌曲
  selectList.addEventListener("change", function (event) {
    updatePlayStatus();
    console.log(event);
    selectedIndex = event.target.selectedIndex;
    selectedIndexInnerText = event.target.options[selectedIndex].text;
    audio.src = musicList[selectedIndex]; //抓使用者選到的選項value屬值
    if (wasPlaying) {
      play();
    }
  });
  //=========================================================================
  // 播放結束 ==> 判斷行為
  audio.addEventListener("ended", function () {
    if (isRepeating == true) {
      audio.currentTime = 0;
      audio.play();
    } else if (isRandom == true) {
      randomIndex = Math.floor(Math.random() * musicList.length);
      selectList.value = selectList[randomIndex].value;
      audio.src = musicList[randomIndex];
      console.log(randomIndex);
      play();
    } else {
      musicStatus();
    }
  });

  //音樂結束，播放下一首歌，直到最後一首
  function musicStatus() {
    if (selectedIndex + 1 == musicList.length && isrepeatList == true) {
      selectedIndex = 0;
      selectList.value = selectList[selectedIndex].value;
      audio.src = musicList[selectedIndex];
      play();
    } else if (selectedIndex + 1 == musicList.length) {
      stop();
      audio.currentTime = 0; // 時間歸零
    } else {
      selectedIndex += 1;
      audio.src = musicList[selectedIndex];
      selectList.value = selectList[selectedIndex].value;
      console.log(selectedIndexInnerText);
      play();
    }
  }

  function statusCheck() {
    if (isRepeating == false && isRandom == false && isrepeatList == false) {
      showStatus.innerText = "正常";
    }
  }
  //單曲循環
  repeatSong.addEventListener("click", function () {
    showStatus.innerText = "單曲循環";
    isRepeating = !isRepeating;
    isRandom = false;
    isrepeatList = false;
    statusCheck();
    console.log("isRepeating:" + isRepeating);
  });

  //隨機播放 ==> 歌單
  randomSong.addEventListener("click", function () {
    showStatus.innerText = "隨機播放";
    isRandom = !isRandom;
    isRepeating = false;
    isrepeatList = false;
    statusCheck();
    console.log("isRandom:" + isRandom);
  });

  //循環 ==> 歌單
  repeatList.addEventListener("click", function () {
    showStatus.innerText = "歌單循環";
    isrepeatList = !isrepeatList;
    isRepeating = false;
    isRandom = false;
    statusCheck();
    console.log(" isrepeatList:" + isrepeatList);
  });
});
