<template>
  <nav class="sidebar d-flex flex-column justify-content-between h-100">
    <div>
      <div class="logo-area">
        <router-link to="/" class="d-inline-block">
          <img
            src="../../assets/images/LOGO.png"
            alt="Personal Logo"
            class="logo-img"
          />
        </router-link>
      </div>

      <ul class="nav flex-column menu-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">HOME</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">ABOUT</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/works" class="nav-link">WORKS</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link">CONTACT</router-link>
        </li>
      </ul>
    </div>

    <div class="footer-area">
      <div class="social-links mb-3">
        <a href="https://www.behance.net/49b3ad3c" class="social-icon"
          ><i class="bi bi-behance"></i
        ></a>
        <a href="https://github.com/andylinsally" class="social-icon"
          ><i class="bi bi-github"></i
        ></a>
      </div>
      <p class="copyright text-muted mb-0">© 2026 Jhih Syuan Lin</p>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.sidebar {
  /* 預設 1024px ~ 1439px 的平板/小筆電 padding */
  padding: 3rem 2rem;
  height: 100vh;
  position: sticky;
  top: 0;
  background-color: transparent;

  @media (min-width: map-get($grid-breakpoints, xl)) {
    /* ⭐️ 1440px 桌機版專屬：給予更寬廣的呼吸空間 */
    padding: 4rem 3rem;
  }
}

.logo-area {
  margin-bottom: 4rem !important; /* 加大 Logo 與選單的距離 */

  .logo-img {
    width: 80%;
    max-width: 120px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.7;
    }
  }
}

.menu-list {
  gap: 0.5rem; /* 增加選單項目之間的垂直間距 */
}

.nav-item {
  position: relative; /* ⭐️ 這是讓「點點」可以絕對定位的關鍵 */
}

.nav-link {
  color: #888; /* 預設改為更低調的高級灰 */
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  padding: 0.5rem 0;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  font-weight: 500;
  display: inline-block;

  /* ⭐️ 當前路由啟動時的樣式 */
  &.router-link-active {
    color: var(--bs-primary);
    font-weight: 700;

    /* 高級排版細節：將點點移到文字外側，確保 HOME、ABOUT 等文字永遠完美左對齊 */
    &::before {
      content: "●";
      font-size: 9px;
      position: absolute;
      left: -18px; /* 把點點往左推 */
      top: 50%;
      transform: translateY(-50%);
    }
  }

  /* ⭐️ 滑鼠懸停時的微互動 */
  &:hover:not(.router-link-active) {
    color: #111;
    transform: translateX(5px); /* 微微向右滑動，提示可點擊 */
  }
}

.footer-area {
  .social-icon {
    display: inline-block;
    color: #888;
    font-size: 1.1rem;
    margin-right: 1.2rem;
    transition: all 0.3s ease;

    &:hover {
      color: var(--bs-primary);
      transform: translateY(-3px); /* 懸停時圖示微微上浮 */
    }
  }

  .copyright {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
  }
}
</style>
