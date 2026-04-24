import { defineStore } from "pinia";
// ⭐️ 1. 引入我們寫好的 API (請確認路徑是否正確，可能需要 ../api/worksApi)
import { worksApi } from "../api/worksApi";

export const useWorksStore = defineStore("works", {
  state: () => ({
    categories: ["ALL", "UI/UX", "GRAPHIC", "PRACTICE"],
    currentCategory: "ALL",
    // ⭐️ 3. 初始化載入預設作品
    worksList: [],
    // ⭐️ 新增狀態避免重複抓取
    isFetched: false,
  }),

  getters: {
    filteredWorks: (state) => {
      // 1. 先根據分類過濾出我們要的作品陣列 (記得用 [...陣列] 淺拷貝，避免改到原始資料)
      let result =
        state.currentCategory === "ALL"
          ? [...state.worksList]
          : state.worksList.filter(
              (work) => work.category === state.currentCategory,
            );

      // 2. 執行「多重條件排序」魔法
      return result.sort((a, b) => {
        // 條件一：精選狀態 (true 排在 false 前面)
        if (a.isFeatured && !b.isFeatured) return -1; // a 有星星、b 沒有，a 往前排
        if (!a.isFeatured && b.isFeatured) return 1; // a 沒有星星、b 有，b 往前排

        // 條件二：如果星星狀態一樣(都是 true 或都是 false)，就看後台的 sortOrder 數字
        return (a.sortOrder ?? 999) - (b.sortOrder ?? 999);
      });
    },
    getWorkById: (state) => {
      // ⭐️ 確保轉成字串比較，因為 Firebase 的 ID 是一串字串
      return (id) =>
        state.worksList.find(
          (work) => String(work.id) === String(id) || work.slug === String(id),
        );
    },
    featuredWorks: (state) => {
      const featured = state.worksList.filter(
        (work) => work.isFeatured === true,
      );

      // 防呆機制：如果一開始都沒有亮星星的作品，就先顯示前 3 個作品當墊背，以免首頁空白
      if (featured.length === 0 && state.worksList.length > 0) {
        return state.worksList.slice(0, 3);
      }
      return featured;
    },
  },

  actions: {
    setCategory(category) {
      this.currentCategory = category;
    },

    // ⭐️ 4. 終極解鎖版：從 Firebase 抓取包含完整 details 的作品，並排在最前面
    async fetchWorksFromFirebase() {
      if (this.isFetched) return;

      try {
        const firebaseData = await worksApi.fetchWorks();

        const newWorks = firebaseData.map((work) => ({
          id: work.id,
          title: work.title,
          subtitle: work.subtitle || "Portfolio Project",
          category: work.category,
          tags: work.tags || [],
          description: work.details?.outline || "無詳細說明",
          image: work.image,
          link: `/works/${work.id}`,
          slug: work.id,

          // 接收來自管理後台填寫的超完整排版與細節資料
          details: work.details || {
            websiteUrl: "-",
            outline: "無詳細說明",
            designBlocks: [],
            data: {},
          },
          sortOrder: work.sortOrder ?? 999,
          isFeatured: work.isFeatured || false,
        }));

        newWorks.sort((a, b) => a.sortOrder - b.sortOrder);

        this.worksList = [...newWorks];
        this.isFetched = true;
      } catch (error) {
        console.error("無法載入 Firebase 資料:", error);
      }
    },
  },
});
