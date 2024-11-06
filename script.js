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


  const cursor = document.querySelector('.cursor');
  const mousePos = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
      mousePos.x = e.pageX;
      mousePos.y = e.pageY;

      cursor.style.left = `${mousePos.x}px`;
      cursor.style.top = `${mousePos.y}px`;
  });

});
