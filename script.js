let musicList = [
  {
    id: 0,
    title: "蕭秉治-毒藥",
    src: "files/music/poison.mp3",
  },
  {
    id: 1,
    title: "謝和弦-你是真的離開我",
    src: "files/music/leave.mp3",
  },
  {
    id: 2,
    title: "陳壹千-仗著",
    src: "files/music/relyon.mp3",
  },
  {
    id: 3,
    title: "怕胖團-魚",
    src: "files/music/fish.mp3",
  },
];
let newMusicList = [];

document.addEventListener("DOMContentLoaded", () => {
  const selectElement = document.querySelector("#selectElement");
  let selectedId = 0;
  musicList.forEach((song) => {
    const option = document.createElement("option");
    option.value = song.id;
    option.textContent = song.title;
    selectElement.appendChild(option);
  });
  const audio = document.querySelector("#audio");
  const playStopBtn = document.querySelector("#playStopBtn");
  const playStopImg = document.querySelector("img");
  const replayBtn = document.querySelector("#replayBtn");
  const prevTime = document.querySelector("#prevTime");
  const prevSong = document.querySelector("#prevSong");
  const nextSong = document.querySelector("#nextSong");
  const nextTime = document.querySelector("#nextTime");
  const setMute = document.querySelector("#setMute");
  const buttons = document.querySelectorAll(".nbtn");
  // const orderSong = document.querySelector("#orderSong");
  // const repeatSong = document.querySelector("#repeatSong");
  // const randomSong = document.querySelector("#randomSong");
  // const repeatList = document.querySelector("#repeatList");
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
  const closePopList = document.querySelector("#closePopList");
  const overlayList = document.getElementById("overlayList");
  const popupList = document.getElementById("popupList");

  //選單切換 ==> 歌曲
  let tempTitle = "";
  audio.src = musicList[selectedId].src; //初始化歌曲 = 0
  selectElement.addEventListener("change", function (event) {
    selectedId = parseInt(event.target.value);
    tempTitle = musicList[selectElement.value].title;
    audio.src = musicList[selectedId].src;
    if (wasPlaying) {
      play();
      showDetailText.innerText = `正在播放 ${tempTitle}`;
    }
  });

  let wasMute = false;
  setVolumeFun(); // 顯示初始音量
  //設定 ==> 音量
  function setVolumeFun() {
    audio.volume = setVolume.value / 100;
    showVolume.value = setVolume.value;
    mute();
  }
  //更換靜音圖示
  function mute() {
    if (audio.muted || audio.volume == 0) {
      setMute.setAttribute("class", "fa-solid fa-volume-xmark fa-2x mbtn");
    } else {
      setMute.setAttribute("class", "fa-solid fa-volume-up fa-2x mbtn");
    }
  }
  //靜音 ==> 切換
  setMute.addEventListener("click", function () {
    wasMute = audio.muted;
    console.log("Current mute state:", wasMute);
    audio.muted = !audio.muted;
    mute();
  });
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

  //判斷有無播放及更新圖示
  let wasPlaying = false;
  function updatePlayStatus() {
    wasPlaying = !audio.paused; // 更新播放狀態
    if (wasPlaying == true) {
      playStopBtn.src = "files/play_top_icon/pause.svg";
    } else {
      playStopBtn.src = "files/play_top_icon/play.svg";
    }
    console.log("判斷播放:" + wasPlaying);
  }
  //播放&暫停 ==> 音樂
  function stop() {
    showDetailText.innerText = "音樂暫停中...";
    audio.pause();
    updatePlayStatus();
    // 清除滑鼠移動計時器
    clearTimeout(timeoutId);
  }
  function play() {
    if (currentMode === "randomSong") {
      showDetailText.innerText = `正在播放 ${
        musicList[indices[ranIndex]].title
      }`;
    } else {
      showDetailText.innerText = `正在播放 ${musicList[selectedId].title}`;
    }

    setInterval(() => getMusicTime(), 500);
    audio.play();
    updatePlayStatus();
    timeoutId = setTimeout(onTimeDo, time);
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
    if (currentMode == "randomSong") {
      if (doubleMode == "randomSongAndRePeat" && ranIndex <= 0) {
        ranIndex = indices.length - 1;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
      } else if (ranIndex <= 0) {
        ranIndex = 0;
      } else {
        ranIndex -= 1;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
      }
    } else {
      if (doubleMode == "orderSongAndRePeat" && selectedId <= 0) {
        selectedId = musicList.length - 1;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
      } else if (selectedId <= 0) {
        selectedId = 0;
      } else {
        selectedId -= 1;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
      }
    }
    if (wasPlaying) {
      play();
    }
  });
  nextSong.addEventListener("click", function () {
    if (currentMode == "randomSong") {
      if (
        doubleMode == "randomSongAndRePeat" &&
        ranIndex + 1 >= indices.length
      ) {
        ranIndex = 0;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
      } else if (ranIndex + 1 >= indices.length) {
        ranIndex = indices.length - 1;
      } else {
        ranIndex += 1;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
      }
    } else {
      if (
        doubleMode == "orderSongAndRePeat" &&
        selectedId >= musicList.length - 1
      ) {
        selectedId = 0;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
      } else if (selectedId >= musicList.length - 1) {
        selectedId = musicList.length - 1;
      } else {
        selectedId += 1;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
      }
    }
    if (wasPlaying) {
      play();
    }
  });

  let currentMode = "orderSong";
  let doubleMode = "";
  let reapeatMode = false;
  let temp = "";
  const functions = {
    list: () => {
      showPopupList();
      document.addEventListener("click", (event) => {
        if (
          overlayList.style.display === "flex" && // 確保彈窗顯示中
          !popupList.contains(event.target) && // 點擊不在彈窗內部
          event.target !== list // 排除顯示按鈕本身
        ) {
          closePopupList();
        }
      });
    },
    orderSong: () => {
      if (reapeatMode === false) {
        currentMode = "orderSong";
        showStatus.innerHTML = "依序播放";
      } else {
        currentMode = "orderSong";
        doubleMode = "";
        doubleMode = "orderSongAndRePeat";
        showStatus.innerHTML = "依序循環播放";
      }
    },
    repeatSong: () => {
      currentMode = "repeatSong";
      temp = audio.src;
      console.log(temp);
      tempTitle = musicList[selectElement.value].title;
      console.log(tempTitle);
      showStatus.innerHTML = "單曲重複";
    },
    randomSong: () => {
      if (reapeatMode === false) {
        currentMode = "randomSong";
        doubleMode = "";
        showStatus.innerHTML = "隨機播放";
      } else {
        currentMode = "randomSong";
        doubleMode = "randomSongAndRePeat";
        showStatus.innerHTML = "隨機循環播放";
      }
      ranSong();
    },
    repeatList: () => {
      reapeatMode = !reapeatMode;
      console.log(reapeatMode);
      if (currentMode == "orderSong") {
        doubleMode = "orderSongAndRePeat";
        showStatus.innerHTML = "依序循環播放";
        if (reapeatMode == false) {
          // currentMode = "orderSong";
          doubleMode = "";
          functions.orderSong();
        }
      } else if (currentMode == "randomSong") {
        doubleMode = "randomSongAndRePeat";
        showStatus.innerHTML = "隨機循環播放";
        if (reapeatMode == false) {
          // currentMode = "randomSong";
          doubleMode = "";
          functions.randomSong();
        }
      }
    },
  };
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.id; // 獲取按鈕的 ID
      if (functions[id]) {
        functions[id](); // 執行對應的功能
      } else {
        console.error(`未定義的功能：${id}`);
      }
    });
  });

  // 播放結束 ==> 判斷行為
  let ranIndex = 0;
  audio.addEventListener("ended", function () {
    if (currentMode === "repeatSong") {
      audio.src = temp;
      if (wasPlaying) {
        play();
        showDetailText.innerText = `正在播放 ${tempTitle}`;
      }
    } else if (doubleMode == "randomSongAndRePeat") {
      if (ranIndex + 1 >= indices.length) {
        ranIndex = 0;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
        play();
      } else {
        ranIndex += 1;
        console.log(indices[ranIndex]);
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
        play();
      }
    } else if (doubleMode == "orderSongAndRePeat") {
      if (selectedId + 1 >= musicList.length) {
        selectedId = 0;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
        play();
      } else {
        defSong();
      }
    } else if (currentMode === "randomSong") {
      // showIndices(0);
      if (ranIndex < indices.length) {
        if (ranIndex + 1 == indices.length) {
          stop();
          audio.currentTime = 0;
        } else {
          ranIndex += 1;
          console.log(indices[ranIndex]);
          audio.src = musicList[indices[ranIndex]].src;
          selectElement.value = indices[ranIndex];
          play();
        }
      }
    } else if (currentMode === "orderSong") {
      defSong();
    }
  });

  function defSong() {
    if (musicList[selectedId].id == musicList.length - 1) {
      stop();
      audio.currentTime = 0;
    } else {
      selectedId = selectedId + 1;
      audio.src = musicList[selectedId].src;
      selectElement.value = selectedId;
      play();
    }
  }

  let indices;
  function ranSong() {
    indices = Array.from({ length: musicList.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]; // 交換元素
    }
    console.log("原始陣列:", musicList);
    console.log("隨機索引:", indices);
    console.log("顯示索引:", indices[ranIndex] + typeof indices[ranIndex]); // 顯示當前索引
    if (wasPlaying == false) {
      end();
    }
  }
  function end() {
    audio.src = musicList[indices[ranIndex]].src;
    selectElement.value = indices[ranIndex];
  }

  //=====================================================================

  let timeoutId;
  let time = 30000;
  function onTimeDo() {
    console.log("滑鼠未移動超過1分鐘，執行動作");
    showPopup();
    stop();
  }
  // 添加滑鼠移動事件監聽器
  window.addEventListener("mousemove", (event) => {
    if (wasPlaying == true) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onTimeDo, time);
    }
  });

  // 顯示彈跳視窗
  function showPopup() {
    document.getElementById("overlay").style.display = "flex";
  }
  // 關閉彈跳視窗
  function closePopup() {
    document.getElementById("overlay").style.display = "none";
  }
  closePop.addEventListener("click", function () {
    closePopup();
  });
  closePopPly.addEventListener("click", function () {
    closePopup();
    play();
  });

  // ======================================================

  function showPopupList() {
    overlayList.style.display = "flex";
  }
  function closePopupList() {
    overlayList.style.display = "none";
  }
  closePopList.addEventListener("click", closePopupList);

  for (let i = 0; i < musicList.length; i++) {
    let contentSong = document.createElement("div");
    let xmark = document.createElement("i");
    let box = document.createElement("div");
    contentSong.id = "contentSong";
    xmark.id = "xmark";
    box.id = "box";
    contentSong.classList.add("contentSong");
    xmark.classList.add("xmark");
    box.classList.add("box");
    contentSong.innerHTML = `<div>${musicList[i].title}</div>`;
    xmark.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    box.appendChild(contentSong);
    box.appendChild(xmark);
    document.querySelector("#popupListUp").appendChild(box);
  }
  // 為每個 box 添加事件監聽
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
      const children = box.querySelectorAll("*");
      children.forEach((child) => {
        child.style.color = "#FFD700 ";
      });
    });
    box.addEventListener("mouseleave", () => {
      const children = box.querySelectorAll("*");
      children.forEach((child) => {
        child.style.color = "";
      });
    });
  });

  // ======================================================
  const popupWindow = document.getElementById("popupWindow");
  // 當滑鼠移到按鈕上時，顯示彈出視窗
  setMute.addEventListener("mouseenter", () => {
    const rect = setMute.getBoundingClientRect();
    popupWindow.style.top = `${rect.top - popupWindow.offsetHeight}px`;
    popupWindow.style.left = `${
      rect.left + rect.width / 2 - popupWindow.offsetWidth / 2
    }px`;
    popupWindow.classList.remove("hidden");
    popupWindow.classList.add("show");
  });

  // 當滑鼠移出按鈕時，隱藏彈出視窗
  setMute.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!popupWindow.matches(":hover")) {
        // 檢查滑鼠是否在彈出視窗內
        popupWindow.classList.remove("show");
        popupWindow.classList.add("hidden");
      }
    }, 100);
  });
  // 當滑鼠進入彈出視窗時，保持顯示
  popupWindow.addEventListener("mouseenter", () => {
    popupWindow.classList.remove("hidden");
    popupWindow.classList.add("show");
  });

  // 當滑鼠移出彈出視窗時，隱藏視窗
  popupWindow.addEventListener("mouseleave", () => {
    popupWindow.classList.remove("show");
    popupWindow.classList.add("hidden");
  });
});
