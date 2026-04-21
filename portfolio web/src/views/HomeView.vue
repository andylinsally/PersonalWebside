<template>
  <div
    class="home-container position-relative overflow-hidden min-vh-100 w-100"
  >
    <div class="bg-shape shape-1 d-none d-md-block"></div>
    <div class="bg-shape shape-2"></div>
    <div class="bg-shape shape-3 d-none d-lg-block"></div>

    <div class="carousel-section">
      <HomeCarousel />
    </div>

    <div
      class="title-section position-absolute start-0 p-4 p-lg-5 z-2"
      v-fade-group
    >
      <h1 class="fw-bold mb-3 tracking-wide title-text display-4 display-lg-3">
        <br />
        專案集
      </h1>
      <p class="text-secondary mb-0 tracking-widest subtitle-text fs-6">
        UI/UX & Graphic Design Portfolio<br />
        Lin Jhih-Syuan
      </p>
    </div>
  </div>
</template>

<script setup>
import HomeCarousel from "../components/Home/HomeCarousel.vue";
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.home-container {
  background-color: $body-bg;
}

.carousel-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* --- ⭐️ 統一改為 1024px 與 1440px 斷點 --- */
.title-section {
  pointer-events: none;
  bottom: 15vh; /* 手機版：提很高避開卡片 */

  @media (min-width: map-get($grid-breakpoints, lg)) {
    bottom: 10vh;
  }
  @media (min-width: map-get($grid-breakpoints, xl)) {
    bottom: 0;
  }
}

.title-text {
  color: $headings-color;
  letter-spacing: 0.1em;
  line-height: 1.4;

  @media (min-width: map-get($grid-breakpoints, xl)) {
    letter-spacing: 0.15em;
    line-height: 1.5;
  }
}

.subtitle-text {
  color: $body-color;
  letter-spacing: 0.25em;
}

.tracking-widest {
  letter-spacing: 0.2em;
}

/* 背景幾何裝飾 */
.bg-shape {
  position: absolute;
  background-color: rgba($bg-assets, 0.4); /* 使用你的變數並加上一點透明度 */
  z-index: 0;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: -5%;
  right: 10%;
  transform: rotate(15deg);
}

.shape-2 {
  width: 80px;
  height: 80px;
  bottom: 15%;
  right: 25%;
}

.shape-3 {
  width: 120px;
  height: 120px;
  top: 40%;
  left: 15%;
}
</style>
