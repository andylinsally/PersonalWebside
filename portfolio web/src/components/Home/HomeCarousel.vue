<template>
  <div
    class="home-carousel position-relative w-100 h-100"
    style="touch-action: pan-y"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div v-if="store.worksList.length > 0" class="w-100 h-100 position-relative">
      
      <div class="diagonal-stack w-100 h-100 position-absolute d-flex align-items-center justify-content-center">
        <div
          v-for="(work, index) in store.worksList"
          :key="work.id"
          class="stack-item position-absolute"
          :class="{ 'is-active': currentIndex === index }"
          :style="getStackStyle(index)"
          @click="handleCardClick(index)"
        >
          <img
            :src="getImageUrl(work.image)"
            :alt="work.title"
            class="work-img object-fit-cover shadow-lg w-100 h-100 rounded-3"
          />
        </div>
      </div>

      <div class="info-overlay position-absolute align-items-center pointer-events-none">
        <transition name="extend-line" mode="out-in">
          <div :key="'line-' + currentIndex" class="line-connector"></div>
        </transition>
        <transition name="text-reveal" mode="out-in">
          <div :key="'text-' + currentIndex" class="info-content text-start pe-auto">
            <router-link :to="store.worksList[currentIndex].link" class="text-decoration-none">
              <h2 class="work-title fw-bold text-dark mb-2 tracking-widest">
                {{ store.worksList[currentIndex].title }}
              </h2>
              <p class="work-tags text-muted mb-0 tracking-widest">
                {{ store.worksList[currentIndex].category }}
                <span v-if="store.worksList[currentIndex].tags.length">
                  , {{ store.worksList[currentIndex].tags.join(" , ") }}
                </span>
              </p>
            </router-link>
          </div>
        </transition>
      </div>

      <div class="mobile-info position-absolute z-3 pe-auto">
        <transition name="extend-line-vertical" mode="out-in">
          <div :key="'line-mobile-' + currentIndex" class="line-connector-vertical"></div>
        </transition>
        <transition name="text-reveal-mobile" mode="out-in">
          <div :key="'text-mobile-' + currentIndex" class="info-content-mobile text-start">
            <router-link :to="store.worksList[currentIndex].link" class="text-decoration-none">
              <h2 class="work-title fw-bold text-dark mb-1 tracking-widest">
                {{ store.worksList[currentIndex].title }}
              </h2>
              <p class="work-tags text-muted mb-0 tracking-widest">
                {{ store.worksList[currentIndex].category }}
                <span v-if="store.worksList[currentIndex].tags.length">
                  , {{ store.worksList[currentIndex].tags.join(" , ") }}
                </span>
              </p>
            </router-link>
          </div>
        </transition>
      </div>

    </div>

    <div v-else class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-muted">
      <div class="spinner-border mb-3" role="status" style="color: #72a6d9;"></div>
      <p class="tracking-widest" style="letter-spacing: 0.15em;">載入精選作品中...</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useWorksStore } from "../../stores/worksStore";

const store = useWorksStore();
const router = useRouter();
const currentIndex = ref(0);
let timer = null;


const isMobile = ref(window.innerWidth < 1200);
const handleResize = () => {
  isMobile.value = window.innerWidth < 1200;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  resetTimer();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const startX = ref(0);
const startY = ref(0);
const handleTouchStart = (e) => {
  if (!isMobile.value) return;
  startX.value = e.touches[0].clientX;
  startY.value = e.touches[0].clientY;
  if (timer) clearInterval(timer);
};

const handleTouchMove = () => {};

const handleTouchEnd = (e) => {
  if (!isMobile.value) return;
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const diffX = endX - startX.value;
  const diffY = endY - startY.value;

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    const total = store.worksList.length;
    if (diffX < 0) {
      currentIndex.value = (currentIndex.value + 1) % total;
    } else {
      currentIndex.value = (currentIndex.value - 1 + total) % total;
    }
  }
  resetTimer();
};


const images = import.meta.glob('../../assets/images/**/*', { eager: true });

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // ⭐️ 智慧判斷：如果是 Firebase 傳來的雲端網址，就直接回傳不處理！
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // 否則，按照原本的方式處理本機端圖片
  const path = `../../assets/images/${imagePath}`;
  return images[path]?.default || '';
};

const getStackStyle = (index) => {
  const total = store.worksList.length;
  let diff = index - currentIndex.value;

  if (diff > total / 2) diff -= total;
  else if (diff < -total / 2) diff += total;

  if (isMobile.value) {
    
    const angle = 6;
    const gapX = 80;
    const gapY = 4;
    return {
      transform: `translate(${diff * gapX}vw, ${diff * gapY}vh) rotate(${angle}deg) scale(${diff === 0 ? 1 : 1})`,
      zIndex: 100 - Math.abs(diff),
      filter: diff === 0 ? "grayscale(0%)" : "grayscale(100%)",
      opacity: Math.abs(diff) > 1 ? 0 : diff === 0 ? 1 : 0.4,
    };
  } else {
    
    const angle = 6;
    const gapX = 4;
    const gapY = -75;
    return {
      transform: `translate(${diff * gapX}vw, ${diff * gapY}vh) rotate(${angle}deg) scale(${diff === 0 ? 1 : 1})`,
      zIndex: 100 - Math.abs(diff),
      filter: diff === 0 ? "grayscale(0%)" : "grayscale(100%)",
      opacity: Math.abs(diff) > 1 ? 0 : diff === 0 ? 1 : 0.25,
    };
  }
};

const handleCardClick = (index) => {
  if (currentIndex.value === index) {
    router.push(store.worksList[index].link);
  } else {
    currentIndex.value = index;
    resetTimer();
  }
};

const nextSlide = () => {
  // ⭐️ 加上這行安全判斷：如果還沒有資料，就不要執行輪播切換
  if (!store.worksList || store.worksList.length === 0) return;
  
  currentIndex.value = (currentIndex.value + 1) % store.worksList.length;
};

const resetTimer = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(nextSlide, 5000);
};

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables.scss";

.home-carousel {
  min-height: 100vh;
}


.diagonal-stack {
  pointer-events: none;
  transform: translateY(-20vh);

  @media (min-width: map-get($grid-breakpoints, xl)) {
    transform: translateX(-5vw) translateY(0);
  }
}

.stack-item {
  overflow: hidden;
  width: 75vw;
  max-width: none;
  aspect-ratio: 16 / 10;
  cursor: pointer;
  pointer-events: auto;
  transition:
    transform 0.9s cubic-bezier(0.25, 1, 0.5, 1),
    filter 0.9s ease,
    opacity 0.9s ease,
    top 0.5s ease;

  @media (min-width: map-get($grid-breakpoints, lg)) {
    
    width: 65vw;
  }
  @media (min-width: map-get($grid-breakpoints, xl)) {
    width: 55vw;
  }

  &.is-active {
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);
  }
  &:hover:not(.is-active) {
    filter: grayscale(40%) !important;
    opacity: 0.8 !important;
  }
}

/* --- 桌機文字區塊 --- */
.info-overlay {
  display: none !important; 
  top: 70%;
  left: 75%;
  transform: translateY(-50%);
  z-index: 110;
 

  @media (min-width: map-get($grid-breakpoints, xl)) {
    display: flex !important;
  }
}

.pe-auto {
  pointer-events: auto;
}
.line-connector {
  height: 1px;
  background-color: $border-color;
  margin-right: 1.5rem;
  width: 50px;
}
.extend-line-enter-active {
  transition: width 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}
.extend-line-enter-from {
  width: 0px;
}
.extend-line-leave-active {
  transition: width 0.3s ease;
}
.extend-line-leave-to {
  width: 0px;
}

.info-content {
  max-width: 200px;
}
.work-title {
  font-size: 1.25rem;
}
.work-tags {
  font-size: 0.75rem;
}
.tracking-widest {
  letter-spacing: 0.15em;
}

.text-reveal-enter-active {
  transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1) 0.2s;
}
.text-reveal-enter-from {
  opacity: 0;
  transform: translateX(15px);
}
.text-reveal-leave-active {
  transition: all 0.3s ease;
}
.text-reveal-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* --- 手機/平板文字區塊 --- */
.mobile-info {
  display: flex !important; 
  top: 43%;
  left: 12.5%;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: map-get($grid-breakpoints, md)) {
    top: 50%;
    left: 15%;
  }

  @media (min-width: map-get($grid-breakpoints, lg)) {
    top: 52%;
    left: 18%;
  }

  @media (min-width: map-get($grid-breakpoints, xl)) {
    display: none !important;
  }
}

.line-connector-vertical {
  width: 1px;
  background-color: $border-color;
  height: 40px;
  margin-bottom: 0.8rem;
  margin-left: 5px;
}
.extend-line-vertical-enter-active {
  transition: height 0.7s cubic-bezier(0.25, 1, 0.5, 1);
}
.extend-line-vertical-enter-from {
  height: 0px;
}
.extend-line-vertical-leave-active {
  transition: height 0.3s ease;
}
.extend-line-vertical-leave-to {
  height: 0px;
}

.info-content-mobile {
  min-width: 200px;
}

.text-reveal-mobile-enter-active {
  transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1) 0.2s;
}
.text-reveal-mobile-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}
.text-reveal-mobile-leave-active {
  transition: all 0.3s ease;
}
.text-reveal-mobile-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
