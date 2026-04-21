export const fadeGroup = {
  mounted(el, binding) {
    // 1. 抓取你要自動做動畫的子元素標籤或 class
    // 如果你在模板有傳值 (例如 v-fade-group="'.card'") 就用傳的值，
    // 沒有傳的話，就預設抓取這些常見的排版元素
    const selector = binding.value || 'h1, h2, h3, h4, h5, h6, p, ul, .profile-row, .work-card, .value-item, .custom-input, .btn';
    const items = el.querySelectorAll(selector);

    // 2. 初始化：把找到的子元素都加上隱藏的 class
    items.forEach(item => {
      item.classList.add('auto-fade-item');
    });

    // 3. 建立觀察者 (只觀察父容器 el 一次就好)
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          // 當父容器進入畫面時
          if (entry.isIntersecting) {
            
            // 4. 自動幫裡面的子元素加上 is-visible，並依照順序給予延遲 (Stagger 效果)
            items.forEach((item, index) => {
              // 每個元素延遲 0.15 秒，創造順暢的骨牌效應
              item.style.transitionDelay = `${index * 0.15}s`; 
              
              // 強制瀏覽器重繪後再加上 class，確保動畫觸發
              requestAnimationFrame(() => {
                item.classList.add('is-visible');
              });
            });

            // 觸發後就停止觀察這個父容器
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    observer.observe(el);
  }
}