import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/works', name: 'works', component: () => import('../views/WorksView.vue') },
    
    // 👇 新增的單一作品詳細頁路由放這裡 👇
    { 
      path: '/works/:id', 
      name: 'work-detail', 
      component: () => import('../views/WorkDetailView.vue'),
      // 開啟 props，這樣元件就能直接接收 id 作為參數
      props: true 
    },
    // 👆 新增結束 👆

    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') }
  ],
  // 讓切換頁面時自動回到頂部
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router