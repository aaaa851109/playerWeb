let arr = ["a", "b", "c", "d"];
let indices;

function ranSong() {
  indices = Array.from({ length: arr.length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]; // 交換元素
  }
  console.log("原始陣列:", arr + typeof arr);
  console.log("隨機索引:", indices + typeof arr);

  // 逐一顯示
  showIndices(0);
}

function showIndices(index) {
  if (index < indices.length) {
    console.log("顯示索引:", indices[index] + typeof indices[index]); // 顯示當前索引
    setTimeout(() => showIndices(index + 1), 500); // 每隔 500 毫秒遞迴顯示
  }
}

ranSong();
