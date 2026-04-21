<template>
  <div v-if="work" class="work-detail-container pb-5 min-vh-100 bg-white">
    <section class="hero-section mb-5" v-fade-group>
      <div class="container px-4 px-lg-5 pt-4">
        <div class="hero-img-wrapper rounded-3 overflow-hidden shadow-sm">
          <img
            :src="getImageUrl(work.image)"
            :alt="work.title"
            class="w-100 h-100 object-fit-cover"
          />
        </div>
      </div>
    </section>

    <div class="container px-4 px-lg-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <div class="text-center mb-5 pb-4" v-fade-group>
            <a
              :href="work.details.websiteUrl"
              target="_blank"
              class="btn-pill outline-primary tracking-widest fw-bold"
            >
              VISIT WEBSITE
            </a>
          </div>

          <section class="mb-5 pb-5" v-fade-group>
            <h2 class="section-title mb-4 tracking-widest">OUTLINE</h2>
            <p
              class="lh-lg text-secondary fs-6 outline-text"
              v-html="work.details.outline"
            ></p>
          </section>

          <section
            class="mb-5 pb-5"
            v-fade-group
            v-if="work.details.designBlocks"
          >
            <h2 class="section-title mb-4 tracking-widest">DESIGN</h2>

            <div
              class="design-images-container d-flex flex-column gap-4 gap-md-5"
            >
              <div
                v-for="(block, blockIndex) in work.details.designBlocks"
                :key="'block-' + blockIndex"
              >
                <div class="row g-3 g-md-4">
                  <div
                    v-for="(img, imgIndex) in block.images"
                    :key="'img-' + imgIndex"
                    :class="{
                      'col-12': block.layout === '1-col',
                      'col-12 col-md-6': block.layout === '2-col',
                      'col-12 col-md-4': block.layout === '3-col',
                    }"
                  >
                    <div
                      class="design-img-wrapper shadow-sm rounded-2 overflow-hidden h-100"
                    >
                      <img
                        :src="getImageUrl(img)"
                        :alt="`${work.title} design detail`"
                        class="w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-5 pb-5" v-fade-group>
            <h2 class="section-title mb-4 tracking-widest">DATA</h2>
            <div class="data-table border-top">
              <div class="data-row" v-if="work.details.data.client">
                <div class="data-label">CLIENT</div>
                <div class="data-value">{{ work.details.data.client }}</div>
              </div>
              <div class="data-row" v-if="work.details.data.production">
                <div class="data-label">PRODUCTION</div>
                <div class="data-value">{{ work.details.data.production }}</div>
              </div>
              <div class="data-row" v-if="work.details.data.jobRole">
                <div class="data-label">JOB ROLE</div>
                <div class="data-value">{{ work.details.data.jobRole }}</div>
              </div>
              <div class="data-row" v-if="work.details.data.category">
                <div class="data-label">CATEGORY</div>
                <div class="data-value">{{ work.details.data.category }}</div>
              </div>
              <div class="data-row" v-if="work.details.data.release">
                <div class="data-label">RELEASE</div>
                <div class="data-value">{{ work.details.data.release }}</div>
              </div>
              <div class="data-row" v-if="work.details.data.tag">
                <div class="data-label">TAG</div>
                <div class="data-value">{{ work.details.data.tag }}</div>
              </div>
              <div class="data-row" v-if="work.details.data.url">
                <div class="data-label">URL</div>
                <div class="data-value">
                  <a
                    :href="work.details.data.url"
                    target="_blank"
                    class="text-primary text-decoration-none"
                    >{{ work.details.data.url }}</a
                  >
                </div>
              </div>
            </div>
          </section>

          <div class="text-center border-bottom pb-5 mb-5" v-fade-group>
            <router-link
              to="/works"
              class="btn-pill outline-secondary tracking-widest fw-bold"
            >
              BACK TO INDEX
            </router-link>
          </div>
        </div>
      </div>

      <section
        class="related-works pb-5"
        v-if="relatedWorks.length > 0"
        v-fade-group
      >
        <h3 class="h6 fw-bold tracking-widest mb-4 text-center text-dark">
          相同類別的作品
          <span class="text-muted fw-normal ms-2 small">RELATED WORKS</span>
        </h3>
        <div
          class="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4"
        >
          <div class="col" v-for="related in relatedWorks" :key="related.id">
            <WorkCard :work="related" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useWorksStore } from "../stores/worksStore";
import WorkCard from "../components/Works/WorkCard.vue"; // 引入卡片組件用於底部推薦

const route = useRoute();
const store = useWorksStore();

// 獲取當前作品
const work = computed(() => store.getWorkById(route.params.id));

// 計算「相同類別的其他作品」，排除自己，並最多顯示 3 筆
const relatedWorks = computed(() => {
  if (!work.value) return [];
  return store.worksList
    .filter((w) => w.category === work.value.category && w.id !== work.value.id)
    .slice(0, 3);
});

// ⭐️ 強制 Vite 抓取 images 資料夾下「所有層級」的圖片
const images = import.meta.glob("../assets/images/**/*", { eager: true });

const getImageUrl = (imageName) => {
  const path = `../assets/images/${imageName}`;
  // 回傳編譯後的正確路徑
  return images[path]?.default || "";
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

/* 頂部視覺高度控制 */
.hero-img-wrapper {
  height: 45vh;
  @media (min-width: map-get($grid-breakpoints, md)) {
    height: 60vh;
  }
}

/* 統一的小標題樣式 (OUTLINE, DESIGN, DATA) */
.section-title {
  font-size: 1rem;
  font-weight: 800;
  color: $headings-color;
}

.outline-text {
  letter-spacing: 0.05em;
}

/* DATA 資料表排版 (極簡細線風格) */
.data-table {
  .data-row {
    display: flex;
    flex-direction: column;
    padding: 1.2rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

    @media (min-width: map-get($grid-breakpoints, md)) {
      flex-direction: row;
      align-items: center;
    }

    .data-label {
      width: 100%;
      font-size: 0.8rem;
      font-weight: 700;
      color: $headings-color;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;

      @media (min-width: map-get($grid-breakpoints, md)) {
        width: 30%;
        margin-bottom: 0;
      }
    }

    .data-value {
      width: 100%;
      font-size: 0.9rem;
      color: $body-color;

      @media (min-width: map-get($grid-breakpoints, md)) {
        width: 70%;
      }
    }
  }
}

/* --- 膠囊按鈕樣式 (Pill Buttons) --- */
.btn-pill {
  display: inline-block;
  padding: 1rem 3.5rem;
  border-radius: 50px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &.outline-primary {
    border: 2px solid var(--bs-primary);
    color: var(--bs-primary);

    &:hover {
      background-color: var(--bs-primary);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(var(--bs-primary-rgb), 0.2);
    }
  }

  &.outline-secondary {
    border: 2px solid $border-color;
    color: $border-color;

    &:hover {
      background-color: $border-color;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }
}

.tracking-widest {
  letter-spacing: 0.15em;
}
</style>
