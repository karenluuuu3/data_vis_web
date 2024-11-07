document.addEventListener("DOMContentLoaded", function() {
  const menuIcon = document.querySelector(".menu-icon");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const closeBtn = document.querySelector(".close-btn");



  // 打開選單
  menuIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // 阻止事件冒泡
    dropdownMenu.classList.add('show'); // 顯示選單
    menuIcon.classList.add('hide'); // 隱藏三個點
  });

  // 關閉選單
  closeBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // 阻止事件冒泡
    dropdownMenu.classList.remove('show'); // 隱藏選單
    // 等待動畫完成後再顯示三個點
    setTimeout(function() {
        menuIcon.classList.remove('hide'); // 顯示三個點
    }, 400); // 與過渡時間相同，確保選單動畫完成後顯示三個點
  });

  // 點擊頁面其他地方時關閉選單
  document.addEventListener('click', function(event) {
    // 如果點擊到選單或菜單按鈕，則不執行關閉選單的動作
    if (!dropdownMenu.contains(event.target) && !menuIcon.contains(event.target)) {
        dropdownMenu.classList.remove('show'); // 隱藏選單
        // 等待動畫完成後再顯示三個點
        setTimeout(function() {
            menuIcon.classList.remove('hide'); // 顯示三個點
        }, 400); // 與過渡時間相同，確保選單動畫完成後顯示三個點
    }
  });


  

  
  // word cloud
  const words = ['Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience'
    ,'Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience'
    ,'Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience','Creative', 'Design', 'Technology', 'Innovation', 'Development', 'Art', 'Code', 'Experience'];
  
    // 定義特殊關鍵字
  const importantWords = ['Technology', 'Innovation', 'Future'];
  const wordCloud = document.getElementById('wordCloud');
  const centerX = wordCloud.clientWidth / 1.5;
  const centerY = wordCloud.clientHeight / 1.5;
  const a = centerX; // 橢圓的水平半徑
  const b = centerY; // 橢圓的垂直半徑
  const minPadding = 15; // 增加文字間距來避免重疊

  let placedWords = [];

  function generateRandomColor() {
      const colors = ['#96D932', '#F20505']; // 定義兩個顏色
      return colors[Math.floor(Math.random() * colors.length)];
  }

  function getRandomPositionInEllipse(nearCenter = false) {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sqrt(Math.random()); // 確保分布均勻

    // 如果是關鍵字，讓它們靠近圓心
    const x = centerX + (nearCenter ? radius * 0.4 * a : radius * a * Math.cos(angle));
    const y = centerY + (nearCenter ? radius * 0.4 * b : radius * b * Math.sin(angle));

    return { x, y };
}

  function isOverlapping(newPos, wordElement) {
      const wordWidth = wordElement.offsetWidth;
      const wordHeight = wordElement.offsetHeight;

      for (let i = 0; i < placedWords.length; i++) {
          const placed = placedWords[i];
          const distanceX = Math.abs(newPos.x - placed.x);
          const distanceY = Math.abs(newPos.y - placed.y);

          // 檢查是否有重疊，並考慮字體的寬度與高度
          if (distanceX < (wordWidth + placed.width) / 2 + minPadding &&
              distanceY < (wordHeight + placed.height) / 2 + minPadding) {
              return true; // 發現重疊
          }
      }
      return false;
  }

  words.forEach((wordText) => {
      let word = document.createElement('span');
      word.className = 'word';
      word.textContent = wordText;
      word.style.position = 'absolute';
      wordCloud.appendChild(word);

      let position;
      let attempts = 0;
      const nearCenter = importantWords.includes(wordText); // 如果是關鍵字，讓它靠近圓心
      do {
          position = getRandomPositionInEllipse(nearCenter);
          attempts++;
      } while (isOverlapping(position, word) && attempts < 200); // 增加最多嘗試次數，避免無法放置的情況

      if (attempts < 200) {
        word.style.left = `${position.x}px`;
        word.style.top = `${position.y}px`;

        // 如果是關鍵字，將文字設置為粗體並設置顏色
        if (importantWords.includes(wordText)) {
            word.style.fontWeight = 'bold';
            //word.style.color = '#FF5733'; // 特別顏色
            word.style.fontSize = '30px';  // 增加字型大小
            
        } else {
            const randomColor = generateRandomColor();
            //word.style.color = randomColor;
        }

        const randomColor = generateRandomColor();
        word.style.setProperty('--hover-color', randomColor);

        // 設置滑鼠懸停時的推開動畫
        const moveX = (Math.random() - 0.5) * 50; // 隨機水平位移
        const moveY = (Math.random() - 0.5) * 50; // 隨機垂直位移
        word.style.setProperty('--move-x', `${moveX}px`);
        word.style.setProperty('--move-y', `${moveY}px`);

        placedWords.push({ x: position.x, y: position.y, width: word.offsetWidth, height: word.offsetHeight });
    } else {
          wordCloud.removeChild(word); // 超過嘗試次數則移除無法放置的單字
      }
  });







});

// cursor球球
const cursor = document.querySelector('.cursor');
const mousePos = { x: 0, y: 0 };
const delay = 0.05; // 控制延遲的係數，可以根據需求調整

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', (e) => {
    // 更新目標位置
    targetX = e.clientX;
    targetY = e.clientY;
});

// 使用 requestAnimationFrame 來平滑移動
function updateCursor() {
    // 使用線性插值來平滑過渡
    currentX += (targetX - currentX) * delay;
    currentY += (targetY - currentY) * delay;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;

    // 繼續更新游標位置
    requestAnimationFrame(updateCursor);
}

// 開始更新游標位置
updateCursor();




// 切換頁面
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});

window.addEventListener('beforeunload', () => {
  document.body.style.transition = 'opacity 1s ease-in-out';
  document.body.style.opacity = 0;
});