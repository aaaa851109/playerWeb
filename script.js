let musicList = [
  {
    title: "離開的一路上 Farewell",
    src: "https://storage.googleapis.com/music-api/%E9%9B%A2%E9%96%8B%E7%9A%84%E4%B8%80%E8%B7%AF%E4%B8%8A%20Farewell",
    singer: "理想混蛋",
  },
  {
    title: "How You Like That",
    src: "https://storage.googleapis.com/music-api/How%20You%20Like%20That",
    singer: "BLACKPINK",
  },
  {
    title: "能遇见就很不错了",
    src: "https://storage.googleapis.com/music-api/%E8%83%BD%E9%81%87%E8%A7%81%E5%B0%B1%E5%BE%88%E4%B8%8D%E9%94%99%E4%BA%86",
    singer: "菲道尔",
  },
  {
    title: "APT.",
    src: "https://storage.googleapis.com/music-api/APT",
    singer: "ROSÉ & 火星人布魯諾Bruno Mars",
  },
  {
    title: "我喜歡你 I'm Into You",
    src: "https://storage.googleapis.com/music-api/%E6%88%91%E5%96%9C%E6%AD%A1%E4%BD%A0%20I'm%20Into%20You",
    singer: "芒果醬 Mango Jump",
  },
  {
    title: "光害 Light Pollution",
    src: "https://storage.googleapis.com/music-api/%E5%85%89%E5%AE%B3%20Light%20Pollution",
    singer: "謝和弦",
  },

  {
    title: "Small girl",
    src: "https://storage.googleapis.com/music-api/Small%20girl",
    singer: "李泳知 이영지 feat. 도경수D.O.",
  },
];

let newMusicList = [
  {
    title: "毒藥",
    src: "https://storage.googleapis.com/music-api/%E6%AF%92%E8%97%A5",
    singer: "蕭秉治",
  },
  {
    title: "你是真的離開我",
    src: "https://storage.googleapis.com/music-api/%E4%BD%A0%E6%98%AF%E7%9C%9F%E7%9A%84%E9%9B%A2%E9%96%8B%E6%88%91",
    singer: "謝和弦",
  },
  {
    title: "仗著",
    src: "https://storage.googleapis.com/music-api/%E4%BB%97%E8%91%97",
    singer: "陳壹千",
  },

  {
    title: "魚",
    src: "https://storage.googleapis.com/music-api/%E9%AD%9A",
    singer: "怕胖團",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const selectElement = document.querySelector("#selectElement");
  let selectedId = 0;

  musicListFun();
  function musicListFun() {
    selectElement.innerHTML = "";
    musicList.forEach((song, i) => {
      const option = document.createElement("option");
      option.value = i;
      selectElement.value = option.value;
      option.textContent = song.title;
      selectElement.appendChild(option);
    });
  }

  const audio = document.querySelector("#audio");
  const playStopBtn = document.querySelector("#playStopBtn");
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
  const closePopList = document.querySelector("#closePopList");
  const overlayList = document.querySelector("#overlayList");
  const popupList = document.querySelector("#popupList");
  const sinGer = document.querySelector("#sinGer");

  let singer = musicList[selectElement.value].singer;
  sinGer.innerHTML = singer;
  function getSinger() {
    singer = musicList[selectElement.value].singer;
    sinGer.innerHTML = singer;
    temp = musicList[selectElement.value].src;
    document.title = `playWeb ${musicList[selectElement.value].title}`;
  }

  audio.src = musicList[selectedId].src;
  selectElement.addEventListener("change", function (event) {
    selectedId = parseInt(event.target.value);
    audio.src = musicList[selectedId].src;
    getSinger();
    if (wasPlaying) {
      play();
    }
  });

  let wasMute = false;
  setVolumeFun();
  function setVolumeFun() {
    const min = setVolume.min;
    const max = setVolume.max;
    const value = setVolume.value;
    const percentage = ((value - min) / (max - min)) * 100;
    setVolume.style.background = `linear-gradient(to right, #5fc3b4  ${percentage}%, #8F8F8F ${percentage}%)`;
    audio.volume = setVolume.value / 100;
    showVolume.value = setVolume.value;
    mute();
  }

  function mute() {
    if (audio.muted || audio.volume == 0) {
      setMute.setAttribute("class", "fa-solid fa-volume-xmark fa-2x mbtn");
    } else {
      setMute.setAttribute("class", "fa-solid fa-volume-up fa-2x mbtn");
    }
  }

  setMute.addEventListener("click", function () {
    wasMute = audio.muted;
    console.log("Current mute state:", wasMute);
    audio.muted = !audio.muted;
    mute();
  });
  setVolume.addEventListener("input", setVolumeFun);
  function setVolumeClick(n) {
    setVolume.value = Math.min(100, Math.max(0, parseInt(setVolume.value) + n));
    setVolumeFun();
  }
  clickVolumeUp.addEventListener("click", function () {
    setVolumeClick(5);
  });
  clickVolumeDown.addEventListener("click", function () {
    setVolumeClick(-5);
  });

  function getTimeFormat(t) {
    let m = parseInt(t / 60);
    let s = parseInt(t % 60);
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return m + ":" + s;
  }

  function getMusicTime() {
    showNowTime.innerText = getTimeFormat(audio.currentTime);
    showSongTime.innerText = getTimeFormat(audio.duration);
    progressBar.value = audio.currentTime;
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.background = `linear-gradient(to right, #5fc3b4 ${percentage}%, #8F8F8F ${percentage}%)`;
  }

  function setProgress() {
    const min = progressBar.min;
    const max = progressBar.max;
    const value = progressBar.value;
    const percentage = ((value - min) / (max - min)) * 100;
    progressBar.style.background = `linear-gradient(to right, #5fc3b4  ${percentage}%, #8F8F8F ${percentage}%)`;
    audio.currentTime = progressBar.value;
  }

  audio.addEventListener("loadedmetadata", function () {
    progressBar.max = audio.duration;
  });
  progressBar.addEventListener("input", setProgress);

  let wasPlaying = false;
  function updatePlayStatus() {
    wasPlaying = !audio.paused;

    console.log("判斷播放:" + wasPlaying);
  }

  function stop() {
    playStopBtn.src = "play_top_icon/play.svg";
    showDetailText.innerText = "已暫停";
    audio.pause();
    updatePlayStatus();
    // 清除滑鼠移動計時器
    // clearTimeout(timeoutId);
  }

  function play() {
    playStopBtn.src = "play_top_icon/pause.svg";
    if (currentMode === "randomSong") {
      singer = musicList[selectElement.value].singer;
      sinGer.innerHTML = musicList[indices[ranIndex]].singer;
    } else {
      getSinger();
    }
    showDetailText.innerText = `播放中`;
    audio.addEventListener("timeupdate", getMusicTime);
    audio.play();
    updatePlayStatus();
    // timeoutId = setTimeout(onTimeDo, time);
  }

  playStopBtn.addEventListener("click", function () {
    if (audio.paused) {
      play();
    } else {
      stop();
    }
  });

  replayBtn.addEventListener("click", function () {
    stop();
    audio.currentTime = 0;
  });

  function changeTime(s) {
    audio.currentTime += s;
  }
  prevTime.addEventListener("click", function () {
    changeTime(-10);
  });
  nextTime.addEventListener("click", function () {
    changeTime(10);
  });

  prevSong.addEventListener("click", function () {
    if (currentMode == "randomSong") {
      if (doubleMode == "randomSongAndRePeat" && ranIndex <= 0) {
        ranIndex = indices.length - 1;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
        getSinger();
        adjustSelectWidth();
      } else if (ranIndex <= 0) {
        ranIndex = 0;
      } else {
        ranIndex -= 1;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
        getSinger();
        adjustSelectWidth();
      }
    } else {
      if (doubleMode == "orderSongAndRePeat" && selectedId <= 0) {
        selectedId = musicList.length - 1;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
        getSinger();
        adjustSelectWidth();
      } else if (selectedId <= 0) {
        selectedId = 0;
      } else {
        selectedId -= 1;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
        getSinger();
        adjustSelectWidth();
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
        getSinger();
        adjustSelectWidth();
      } else if (ranIndex + 1 >= indices.length) {
        ranIndex = indices.length - 1;
      } else {
        ranIndex += 1;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
        getSinger();
        adjustSelectWidth();
      }
    } else {
      if (
        doubleMode == "orderSongAndRePeat" &&
        selectedId >= musicList.length - 1
      ) {
        selectedId = 0;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
        getSinger();
        adjustSelectWidth();
      } else if (selectedId >= musicList.length - 1) {
        selectedId = musicList.length - 1;
      } else {
        selectedId += 1;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
        getSinger();
        adjustSelectWidth();
      }
    }
    if (wasPlaying) {
      play();
    }
  });

  let currentMode = "orderSong";
  let doubleMode = "";
  let repeatMode = false;
  let temp = "";
  let ranIndex = 0;
  let iconIndex = 0;

  const iconFun = [
    { icon: "fa-right-long", action: orderSong },
    { icon: "fa-redo", action: repeatSong },
    { icon: "fa-shuffle", action: randomSong },
  ];

  function orderSong() {
    if (repeatMode === false) {
      currentMode = "orderSong";
      showStatus.innerHTML = "依序播放";
    } else {
      currentMode = "orderSong";
      doubleMode = "";
      doubleMode = "orderSongAndRePeat";
      showStatus.innerHTML = "依序循環播放";
    }
  }

  function repeatSong() {
    currentMode = "repeatSong";
    temp = audio.src;
    console.log(temp);
    showStatus.innerHTML = "單曲重複";
  }

  function randomSong() {
    if (repeatMode === false) {
      currentMode = "randomSong";
      doubleMode = "";
      showStatus.innerHTML = "隨機播放";
    } else {
      currentMode = "randomSong";
      doubleMode = "randomSongAndRePeat";
      showStatus.innerHTML = "隨機循環播放";
    }
    ranSong();
    getSinger();
  }

  function updateButton() {
    if (iconIndex == 0) {
      carouselButton.className = `fa-solid ${iconFun[iconIndex].icon} fa-2x nbtn `;
    } else {
      carouselButton.className = `fa-solid ${iconFun[iconIndex].icon} fa-2x nbtn tbtn`;
    }
  }

  carouselButton.addEventListener("click", () => {
    iconIndex = (iconIndex + 1) % iconFun.length;
    console.log(iconIndex);
    iconFun[iconIndex].action();
    updateButton();
  });

  const functions = {
    list: () => {
      showPopupList();
      document.addEventListener("click", (event) => {
        if (
          overlayList.style.display === "flex" &&
          !popupList.contains(event.target) &&
          event.target !== list
        ) {
          closePopupList();
        }
      });
    },
    repeatList: () => {
      repeatMode = !repeatMode;
      console.log(repeatMode);
      if (currentMode == "orderSong") {
        doubleMode = "orderSongAndRePeat";
        showStatus.innerHTML = "依序循環播放";
        if (repeatMode == false) {
          doubleMode = "";
          orderSong();
        }
      } else if (currentMode == "randomSong") {
        doubleMode = "randomSongAndRePeat";
        showStatus.innerHTML = "隨機循環播放";
        if (repeatMode == false) {
          doubleMode = "";
          randomSong();
        }
      }
      const repeatList = document.querySelector("#repeatList");
      if (repeatMode == true) {
        repeatList.setAttribute("class", "fa-solid fa-retweet fa-2x tbtn");
      } else {
        repeatList.setAttribute("class", "fa-solid fa-retweet fa-2x nbtn");
      }
      console.log(repeatList);
    },
    tool: () => {
      showPopupTool();
      document.addEventListener("click", (event) => {
        if (
          overlayTool.style.display === "flex" &&
          !popupTool.contains(event.target) &&
          event.target !== tool
        ) {
          closePopToolF();
        }
      });
    },
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.id;
      if (functions[id]) {
        functions[id]();
      } else {
        console.error(`未定義的功能：${id}`);
      }
    });
  });

  audio.addEventListener("ended", function () {
    if (currentMode === "repeatSong") {
      audio.src = temp;
      if (wasPlaying) {
        play();
      }
    } else if (doubleMode == "randomSongAndRePeat") {
      if (ranIndex + 1 >= indices.length) {
        ranIndex = 0;
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
        document.title = `playWeb ${musicList[selectElement.value].title}`;
        adjustSelectWidth();
        play();
      } else {
        ranIndex += 1;
        console.log(indices[ranIndex]);
        audio.src = musicList[indices[ranIndex]].src;
        selectElement.value = indices[ranIndex];
        document.title = `playWeb ${musicList[selectElement.value].title}`;
        adjustSelectWidth();
        play();
      }
    } else if (doubleMode == "orderSongAndRePeat") {
      if (selectedId + 1 >= musicList.length) {
        selectedId = 0;
        audio.src = musicList[selectedId].src;
        selectElement.value = selectedId;
        adjustSelectWidth();
        play();
      } else {
        defSong();
      }
    } else if (currentMode === "randomSong") {
      if (ranIndex < indices.length) {
        if (ranIndex + 1 == indices.length) {
          adjustSelectWidth();
          stop();
          audio.currentTime = 0;
        } else {
          ranIndex += 1;
          console.log(indices[ranIndex]);
          audio.src = musicList[indices[ranIndex]].src;
          selectElement.value = indices[ranIndex];
          document.title = `playWeb ${musicList[selectElement.value].title}`;
          adjustSelectWidth();
          play();
        }
      }
    } else if (currentMode === "orderSong") {
      defSong();
    }
  });

  function defSong() {
    if (musicList[selectedId] == musicList.length - 1) {
      stop();
      audio.currentTime = 0;
    } else {
      selectedId = selectedId + 1;
      audio.src = musicList[selectedId].src;
      selectElement.value = selectedId;
      play();
    }
    adjustSelectWidth();
  }

  let indices;
  function ranSong() {
    indices = Array.from({ length: musicList.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    console.log("原始陣列:", musicList);
    console.log("隨機索引:", indices);
    console.log("顯示索引:", indices[ranIndex] + typeof indices[ranIndex]);
    if (wasPlaying == true) {
    } else {
      end();
    }
  }
  function end() {
    audio.src = musicList[indices[ranIndex]].src;
    selectElement.value = indices[ranIndex];
    singer = musicList[indices[ranIndex]].singer;
    sinGer.innerHTML = singer;
  }

  //=====================================================================

  // let timeoutId;
  let time = 30000;
  // function onTimeDo() {
  //   console.log("滑鼠未移動超過X分鐘，執行動作");
  //   showPopup();
  //   stop();
  // }
  // // 添加滑鼠移動事件監聽器
  // window.addEventListener("mousemove", (event) => {
  //   if (wasPlaying == true) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(onTimeDo, time);
  //   }
  // });

  // 顯示彈跳視窗
  function showPopup() {
    document.getElementById("overlay").style.display = "flex";
  }
  // 關閉彈跳視窗
  function closePopup() {
    document.getElementById("overlay").style.display = "none";
  }

  // ======================================================

  function showPopupList() {
    overlayList.style.display = "flex";
  }
  function closePopupList() {
    overlayList.style.display = "none";
  }
  closePopList.addEventListener("click", closePopupList);

  ListUp();
  function ListUp() {
    const listContainer = document.querySelector("#popupListUp");
    listContainer.innerHTML = "";
    musicList.forEach((song, i) => {
      let contentSong = document.createElement("div");
      let xmark = document.createElement("i");
      let box = document.createElement("div");
      contentSong.id = "contentSong";
      xmark.id = "xmark";
      box.id = "box";
      contentSong.classList.add("contentSong");
      xmark.classList.add("xmark");
      box.classList.add("box");
      contentSong.innerHTML = `<div>${song.title}</div>`;
      xmark.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      box.appendChild(contentSong);
      box.appendChild(xmark);
      listContainer.appendChild(box);

      xmark.addEventListener("click", () => {
        event.stopPropagation(); // 阻止事件冒泡
        newMusicList.push(musicList[i]);
        musicList.splice(i, 1);
        updateUI();
      });
    });
  }
  ListDown();
  function ListDown() {
    const listContainer = document.querySelector("#popupListDown");
    listContainer.innerHTML = "";
    newMusicList.forEach((song, i) => {
      let contentSong = document.createElement("div");
      let xmark = document.createElement("i");
      let box = document.createElement("div");
      contentSong.id = "contentSong";
      xmark.id = "xmark";
      box.id = "box";
      contentSong.classList.add("contentSong");
      xmark.classList.add("xmark");
      box.classList.add("box");
      contentSong.innerHTML = `<div>${song.title}</div>`;
      xmark.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
      box.appendChild(contentSong);
      box.appendChild(xmark);
      listContainer.appendChild(box);

      xmark.addEventListener("click", () => {
        event.stopPropagation(); // 阻止事件冒泡
        musicList.push(newMusicList[i]);
        newMusicList.splice(i, 1);
        updateUI();
      });
    });
  }

  function updateUI() {
    ListUp();
    ListDown();
    boxesFun();
    musicListFun();
    getSinger();
  }
  boxesFun();
  function boxesFun() {
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
  }

  const popupWindow = document.getElementById("popupWindow");
  setMute.addEventListener("mouseenter", () => {
    const rect = setMute.getBoundingClientRect();
    popupWindow.style.top = `${rect.top - popupWindow.offsetHeight}px`;
    popupWindow.style.left = `${
      rect.left + rect.width / 2 - popupWindow.offsetWidth / 2
    }px`;
    popupWindow.classList.remove("hidden");
    popupWindow.classList.add("show");
  });

  setMute.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!popupWindow.matches(":hover")) {
        popupWindow.classList.remove("show");
        popupWindow.classList.add("hidden");
      }
    }, 100);
  });

  popupWindow.addEventListener("mouseenter", () => {
    popupWindow.classList.remove("hidden");
    popupWindow.classList.add("show");
  });

  popupWindow.addEventListener("mouseleave", () => {
    popupWindow.classList.remove("show");
    popupWindow.classList.add("hidden");
  });

  const overlayTool = document.getElementById("overlayTool");
  const setTool = document.getElementById("setTool");
  const closePopTool = document.getElementById("closePopTool");
  const closePopSet = document.getElementById("closePopSet");
  const popupTool = document.getElementById("popupTool");

  function showPopupTool() {
    overlayTool.style.display = "flex";
    closePopSet.addEventListener("click", function () {
      time = setTool.value * 1000;
      if (time == 0) {
        setTool.value = "30";
      } else if (time !== 0) {
        closePopToolF();
      }
    });
  }
  function closePopToolF() {
    document.getElementById("overlayTool").style.display = "none";
  }
  closePopTool.addEventListener("click", closePopToolF);

  function adjustSelectWidth() {
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.font = window.getComputedStyle(selectElement).font;
    tempSpan.innerText =
      selectElement.options[selectElement.selectedIndex].text;

    document.body.appendChild(tempSpan);
    selectElement.style.width = `${tempSpan.offsetWidth}px`;
    document.body.removeChild(tempSpan);
  }
  adjustSelectWidth();
  selectElement.addEventListener("change", adjustSelectWidth);
  document.querySelector(".arrow").addEventListener("click", () => {
    document.getElementById("selectElement").focus();
  });
  const arrow = document.querySelector(".arrow");
  arrow.addEventListener("click", () => {
    selectElement.focus();
  });

  //当select获得焦点时触发，确保select弹出菜单
  // selectElement.addEventListener("focus", () => {
  //   setTimeout(() => {
  //     // 通过点击操作确保select弹出
  //     selectElement.size = selectElement.length;
  //   }, 100);
  // });

  // // 在select失去焦点时，关闭下拉菜单
  // selectElement.addEventListener("blur", () => {
  //   selectElement.size = 1; // 恢复默认大小
  // });
});

//
//
//
//bug
//重複及循環同時 ==> select !== 音源  ====> 已處理
//重播 ==> 切換歌手未更新 ===> 已處理
//初始化後單曲重複 最後一首前按循環無法下一首 ==> 邏輯沒錯、不隸屬任何清單
//單曲循環 => 手動切換到次首 無法單曲循環 ==> 已處理

//待處理
//條整視窗大小無法更新select寬度 ==> 留到RWD
//select彈出視窗
//settimeout for long time
//playstopbtn hover
//docs
