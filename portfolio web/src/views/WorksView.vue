<template>
  <div v-fade-group class="works-container px-4 px-lg-5 py-5 min-vh-100">
    <div
      class="d-flex flex-column flex-md-row justify-content-between align-items-md-end border-bottom pb-4 mb-5"
    >
      <ul class="nav filter-nav gap-3 gap-md-4 mb-4 mb-md-0">
        <li
          class="nav-item"
          v-for="category in store.categories"
          :key="category"
        >
          <button
            class="btn btn-link text-decoration-none p-0 filter-btn tracking-widest fw-bold"
            :class="{
              'active text-primary': store.currentCategory === category,
              'text-muted': store.currentCategory !== category,
            }"
            @click="store.setCategory(category)"
          >
            {{ category }}
          </button>
        </li>
      </ul>

      <h2
        class="display-3 fw-bold tracking-widest text-dark m-0 d-none d-md-block"
      >
        WORKS
      </h2>
      <h2 class="h1 fw-bold tracking-widest text-dark m-0 d-md-none">WORKS</h2>
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 g-lg-5">
      <div class="col" v-for="work in store.filteredWorks" :key="work.id">
        <transition name="fade" appear>
          <WorkCard :work="work" />
        </transition>
      </div>
    </div>

    <div
      v-if="store.filteredWorks.length === 0"
      class="text-center text-muted py-5 tracking-widest"
    >
      <p>目前尚無相關作品</p>
    </div>
  </div>
</template>

<script setup>
import { useWorksStore } from "../stores/worksStore";
import WorkCard from "../components/Works/WorkCard.vue";

// 初始化 Pinia store
const store = useWorksStore();
</script>

<style lang="scss" scoped>
.filter-btn {
  font-size: 0.85rem;
  transition: color 0.3s ease;
  position: relative;

  // 啟動狀態的青色小圓點指示器 (對應參考圖的 ALL 上面的點)
  &.active::before {
    content: "●";
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 8px;
    color: var(--bs-primary);
  }

  &:hover {
    color: var(--bs-dark) !important;
  }
}

.tracking-widest {
  letter-spacing: 0.2em;
}

// 確保背景色融入你的極簡風格
.works-container {
  background-color: var(--bs-body-bg);
}

// 卡片出現的淡入效果
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
