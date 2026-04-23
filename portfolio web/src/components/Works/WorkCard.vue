<template>
  <router-link
    :to="work.link"
    class="work-card text-decoration-none d-block mb-5"
  >
    <div class="img-wrapper mb-3 overflow-hidden bg-light">
      <img
        :src="getImageUrl(work.image)"
        :alt="work.title"
        class="work-img w-100 h-100 object-fit-cover transition-transform"
      />
    </div>

    <h3 class="h6 fw-bold text-dark mb-1 tracking-wide">{{ work.title }}</h3>

    <div class="d-flex flex-wrap gap-2 mt-2">
      <span
        v-for="(tag, index) in work.tags"
        :key="index"
        class="small-tag text-muted"
      >
        {{ tag
        }}<span v-if="index !== work.tags.length - 1" class="ms-2">,</span>
      </span>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  work: {
    type: Object,
    required: true,
  },
});


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
</script>

<style lang="scss" scoped>
.work-card {
  .img-wrapper {
    aspect-ratio: 4 / 3;
    border-radius: 4px;
  }

  .work-img {
    transition: transform 0.5s ease;
  }

 
  &:hover {
    .work-img {
      transform: scale(1.05);
    }
  }

  .tracking-wide {
    letter-spacing: 0.1em;
  }

  .small-tag {
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }
}
</style>
