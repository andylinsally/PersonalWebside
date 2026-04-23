<template>
  <header class="mobile-header d-flex justify-content-between align-items-center px-4 py-3 bg-white w-100">
    <router-link to="/" @click="closeMenu">
      <img src="../../assets/images/LOGO.png" alt="Personal Logo" class="mobile-logo" />
    </router-link>

    <button class="btn btn-link text-dark p-0" @click="toggleMenu">
      <i class="bi bi-list fs-1"></i>
    </button>

    <transition name="fade">
      <div v-if="isMenuOpen" class="mobile-overlay d-flex flex-column p-4">
        <div class="d-flex justify-content-end mb-5">
          <button class="btn btn-link text-white p-0 close-btn" @click="toggleMenu">
            <i class="bi bi-x-lg fs-2"></i>
          </button>
        </div>

        <div class="overlay-content flex-grow-1 d-flex flex-column justify-content-center px-4">
          <div class="mb-5 logo-wrapper">
            <img src="../../assets/images/LOGO-w.png" alt="Personal Logo" class="menu-logo" />
          </div>

          <ul class="nav flex-column gap-4 fs-3 fw-bold tracking-widest ps-4">
            <li class="nav-item">
              <router-link to="/" class="nav-link px-0" @click="closeMenu">HOME</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link px-0" @click="closeMenu">ABOUT</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/works" class="nav-link px-0" @click="closeMenu">PORTFOLIO</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link px-0" @click="closeMenu">CONTACT</router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;

  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};
</script>

<style lang="scss" scoped>
.mobile-header {
  position: sticky;
  top: 0;
  z-index: 1040;

  .mobile-logo {
    max-width: 90px;
    height: auto;
  }
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bs-overlay-bg, #222);
  z-index: 1050;
  overflow-y: auto;
}

.menu-logo {
  max-width: 150px;
  height: auto;
}

.tracking-widest {
  letter-spacing: 0.2em;
}


.nav-item {
  position: relative;
}

.nav-link {
  color: #fff;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  display: inline-block;


  &.router-link-active {
    color: var(--bs-primary);


    &::before {
      content: "●";
      font-size: 12px;
      position: absolute;
      left: -24px;
      top: 50%;
      transform: translateY(-50%);
    }
  }


  &:hover:not(.router-link-active) {
    color: rgba(255, 255, 255, 0.6);
    transform: translateX(8px);
  }
}

/* 關閉按鈕與 Logo 的微互動 */
.close-btn,
.logo-wrapper {
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.6;
  }
}


// 滿版選單淡入淡出動畫
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
