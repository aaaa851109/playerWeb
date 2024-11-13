// 儲存音訊檔的陣列
const audioFiles = ["毒藥.mp3", "你是真的離開我.mp3", "仗著.mp3", "魚.mp3"];

// 獲取音訊元素和來源
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
// 預先設置第一首歌的音訊來源
audioSource.src = audioFiles[0];
audioPlayer.load();

//為抓取各按鈕及元素創變數
const playButton = document.getElementById("b1"); //播放按鈕
const replayButton = document.getElementById("b2"); //重播按鈕
const rewindButton = document.getElementById("b3"); //倒退10秒
const lastButton = document.getElementById("b4"); //上一首
const nextButton = document.getElementById("b5"); //下一首
const forwardButton = document.getElementById("b6"); //快轉10秒
const volumeButton = document.getElementById("b7"); //靜音/有聲
const repeatButton = document.getElementById("b8"); //切換單曲循環
const seekBar = document.getElementById("seekBar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

// 格式化時間，轉換為 mm:ss 格式
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// 抓下拉式選單
const selectElement = document.getElementById("song-select");
let currentIndex = 0; // 定義全域變數

// DOM 加載完成後的事件
document.addEventListener("DOMContentLoaded", function () {
  // 監聽下拉式選單
  selectElement.addEventListener("change", function () {
    currentIndex = selectElement.selectedIndex; // 獲取選擇的值
    loadAudio(currentIndex); // 加載新音訊檔
  });

  // 當音訊元數據加載完成後，設定滑桿最大值
  audioPlayer.addEventListener("loadedmetadata", function () {
    seekBar.max = Math.floor(audioPlayer.duration);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
  });

  // 監聽音訊的時間更新事件，動態更新滑桿位置和顯示當前時間
  audioPlayer.addEventListener("timeupdate", function () {
    seekBar.value = Math.floor(audioPlayer.currentTime);
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  });

  // 當滑桿的值改變時，更新音訊的播放時間
  seekBar.addEventListener("input", function () {
    audioPlayer.currentTime = seekBar.value;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  });

  // b1 播放/暫停音訊
  playButton.addEventListener("click", function () {
    if (audioPlayer.paused) {
      audioPlayer.play(); // 播放音訊
      playButton.classList.remove("fa-play"); // 移除播放圖示
      playButton.classList.add("fa-pause"); // 加入暫停圖示
    } else {
      audioPlayer.pause(); // 暫停音訊
      playButton.classList.remove("fa-pause"); // 移除暫停圖示
      playButton.classList.add("fa-play"); // 加入播放圖示
    }
  });

  // b2 重播
  replayButton.addEventListener("click", function () {
    audioPlayer.currentTime = 0; // 重置播放位置為 0
    seekBar.value = 0; // 重置滑桿位置為 0
    currentTimeDisplay.textContent = formatTime(0); // 重置顯示時間
  });

  // b3 倒退 10 秒
  rewindButton.addEventListener("click", function () {
    let newTime = audioPlayer.currentTime - 10;
    if (newTime < 0) newTime = 0; // 確保新的時間不會小於 0
    audioPlayer.currentTime = newTime;
    seekBar.value = Math.floor(newTime);
    currentTimeDisplay.textContent = formatTime(newTime);
  });

  // b4 上一首
  lastButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--; // 更新索引
      loadAudio(currentIndex); // 加載新音訊檔
      selectElement.selectedIndex = currentIndex; // 更新下拉式選單
      console.log("上一步選擇的歌曲索引:", currentIndex); // 調試用
    }
  });

  // b5 下一首
  nextButton.addEventListener("click", function () {
    if (currentIndex < audioFiles.length - 1) {
      currentIndex++; // 更新索引
      loadAudio(currentIndex); // 加載新音訊檔
      selectElement.selectedIndex = currentIndex; // 更新下拉式選單
      console.log("下一首選擇的歌曲索引:", currentIndex); // 調試用
    }
  });

  // b6 前進 10 秒
  forwardButton.addEventListener("click", function () {
    let newTime = audioPlayer.currentTime + 10;
    if (newTime > audioPlayer.duration) newTime = audioPlayer.duration; // 確保不超過總時長
    audioPlayer.currentTime = newTime;
    seekBar.value = Math.floor(newTime);
    currentTimeDisplay.textContent = formatTime(newTime);
  });
  // b7 靜音/有聲
  volumeButton.addEventListener("click", function () {
    if (audioPlayer.volume > 0) {
      audioPlayer.volume = 0; // 靜音
      volumeButton.classList.remove("fa-volume-xmark"); // 移除音量圖示
      volumeButton.classList.add("fa-volume-up"); // 加入靜音圖示
    } else {
      audioPlayer.volume = 1; // 恢復音量
      volumeButton.classList.remove("fa-volume-up"); // 移除靜音圖示
      volumeButton.classList.add("fa-volume-xmark"); // 加入音量圖示
    }
  });

  // b8 切換單曲循環
  repeatButton.addEventListener("click", function () {
    isRepeating = !isRepeating; // 切換循環狀態
    if (isRepeating) {
      repeatButton.classList.add("active"); // 添加活動類別
      repeatButton.classList.remove("fa-repeat"); // 移除循環圖示
      repeatButton.classList.add("fa-redo"); // 添加單曲循環圖示
    } else {
      repeatButton.classList.remove("active"); // 移除活動類別
      repeatButton.classList.remove("fa-redo"); // 移除單曲循環圖示
      repeatButton.classList.add("fa-repeat"); // 恢復循環圖示
    }
  });

  // 當音訊播放結束時自動暫停
  audioPlayer.addEventListener("ended", function () {
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // 重置播放位置為 0
    seekBar.value = 0; // 重置滑桿位置為 0
    currentTimeDisplay.textContent = formatTime(0); // 重置顯示時間
    playButton.classList.remove("fa-pause"); // 移除暫停圖示
    playButton.classList.add("fa-play"); // 加入播放圖示
  });
});

// 加載音訊函數
function loadAudio(index) {
  audioSource.src = audioFiles[index];
  audioPlayer.load(); // 加載新音訊檔
  audioPlayer.pause();
  audioPlayer.currentTime = 0; // 重置播放位置為 0
  // 更改CSS將圖示設置為播放icon
  playButton.classList.remove("fa-pause"); //移除播放icon
  playButton.classList.add("fa-play"); //加入播放icon
}
