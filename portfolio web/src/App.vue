<template>
  <div class="container-fluid p-0">
    <MobileNav class="d-xl-none" />

    <div class="row g-0">
      <aside
        class="col-xl-2 d-none d-xl-flex border-end bg-white sidebar-wrapper"
      >
        <Sidebar />
      </aside>

      <main
        class="col-12 col-xl-10 min-vh-100 bg-light-soft main-content"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/Layout/Sidebar.vue";
import MobileNav from "./components/Layout/MobileNav.vue";
</script>

<style lang="scss">
.bg-light-soft {
  background-color: #fcfcfc;
}


.sidebar-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

// 內容區切換動畫
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
