import { defineStore } from "pinia";

export const useWorksStore = defineStore("works", {
  state: () => ({
    categories: ["ALL", "UI/UX", "GRAPHIC", "PRACTICE"],
    currentCategory: "ALL",

    worksList: [
      {
        id: 1,
        title: "VIESHOW 威秀影城官網重構",
        subtitle: "Web UI/UX ReDesign",
        category: "UI/UX",
        tags: ["UI/UX", "網頁設計", "互動設計"],
        description:
          "台灣最大影城威秀影城的非官方重構專案。透過 UX 研究與前端技術，將破碎的 10 步驟訂票流程整合為單一線性路徑，並導入 Design Token 設計標籤與無縫註冊機制，將系統易用性 (SUS) 從 36.67 (F) 大幅提升至 93.75 (A+)。",
        image: "project/1_vieshow/vieshow.png",
        link: "/works/vieshow",
        slug: "vieshow",
        // 👇 全新設計的詳細頁面專用資料
        details: {
          websiteUrl: "https://uiux-group-1.vercel.app/",
          outline:
            "舊版非官方系統的訂票流程多達 10 個步驟，體驗過於破碎。根據先前的系統易用性量表 (SUS) 測試，分數僅有 36.67 (F 級)，流失率極高。<br><br>我們透過 UX 研究重新梳理流程，並以 Vue 3 進行前端狀態管理與重構。將原本 10 步驟的流程整合為單一線性路徑，大幅降低使用者的操作認知負擔，改版後系統易用性分數飆升至 93.75 (A+)。",
          designBlocks: [
            {
              layout: "1-col", // 一排一張 (適合滿版大圖)
              images: ["project/1_vieshow/01.png"],
            },
            {
              layout: "1-col", // 一排一張 (適合滿版大圖)
              images: ["project/1_vieshow/02.png"],
            },
            {
              layout: "2-col", // 一排兩張 (適合對比或細節)
              images: ["project/1_vieshow/03.png", "project/1_vieshow/04.png"],
            },
            {
              layout: "3-col", // 一排三張 (非常適合手機 APP 截圖)
              images: [
                "project/1_vieshow/05.png",
                "project/1_vieshow/06.png",
                "project/1_vieshow/07.png",
              ],
            },
          ],
          data: {
            client: "威秀影城 (非官方重構)",
            production: "Team Project",
            jobRole: "UI/UX Designer, Front-end Dev",
            category: "UI/UX",
            release: "2026.04",
            tag: "UI/UX, 互動設計, 網頁設計",
            url: "https://www.behance.net/gallery/247896537/_",
          },
        },
      },
      {
        id: 2,
        title: "LOOP 質感循環",
        subtitle: "App UI/UX Design",
        category: "UI/UX",
        tags: ["UI/UX", "APP設計", "互動設計"],
        description:
          "網購最怕遇到「圖文不符」與尺寸不合。透過前期 96 份消費者的 User Research，我們發現高達 31% 的網購困擾源於尺寸版型落差，引發了消費者對電商的「信任危機」。\n\nLoop 打破傳統模式，主打「See it, Verify it, Get it」核心概念，並導入「True-View 實穿比對」功能，用真實的社群體型驗證取代精美的官方商品圖。",
        image: "project/2_loop/loop.png",
        link: "/works/loop",
        slug: "loop",
        details: {
          websiteUrl: "https://andylinsally.github.io/UIUX-Loop/",
          outline:
            "在針對 96 位消費者的研究中，發現高達 31% 的受訪者表示網購最常見的痛點在於「尺寸版型落差」。傳統精修的官方圖片往往無法反映衣服在不同體型上的真實樣貌，進而引發消費者的信任危機。<br><br>Loop 提出了「See it, Verify it, Get it」的核心概念，引入真實使用者的社群回饋 (True-View 實穿比對)，讓消費者找到與自己體型相似的實穿圖，以真實的社群體型驗證取代傳統商業廣告圖。",
          designBlocks: [
            {
              layout: "1-col", // 一排一張 (適合滿版大圖)
              images: ["project/2_loop/loop.png"],
            },
            {
              layout: "3-col", // 一排三張 (非常適合手機 APP 截圖)
              images: [
                "project/2_loop/01.png",
                "project/2_loop/02.png",
                "project/2_loop/03.png",
              ],
            },
            {
              layout: "3-col", // 一排三張 (非常適合手機 APP 截圖)
              images: [
                "project/2_loop/04.png",
                "project/2_loop/05.png",
                "project/2_loop/06.png",
              ],
            },
            {
              layout: "3-col", // 一排三張 (非常適合手機 APP 截圖)
              images: [
                "project/2_loop/07.png",
                "project/2_loop/08.png",
                "project/2_loop/09.png",
              ],
            },
          ],
          data: {
            client: "個人專案",
            production: "Solo Project",
            jobRole: "UI/UX Designer, Front-end Dev",
            category: "UI/UX",
            release: "2026.02",
            tag: "UI/UX, APP設計",
            url: "https://www.behance.net/gallery/247279931/_",
          },
        },
      },
      {
        id: 3,
        title: "2024-2025作品集",
        subtitle: "Portfolio",
        category: "GRAPHIC",
        tags: ["平面設計", "動畫設計"],
        description:
          "本作品集主要收錄任職於「環亞電訊」擔任電商行銷設計師期間的視覺專案。\n\n面對快節奏的電商檔期與複雜的網卡方案，專案核心著重於降低使用者的理解門檻，並有效提升導購轉換率。",
        image: "project/3_portfolio/portfolio.png",
        link: "/works/portfolio",
        slug: "portfolio",
        details: {
          websiteUrl: "https://online.fliphtml5.com/JhihSyuan_Lin/afax/#p=1",
          outline:
            "面對快節奏的電商檔期與複雜的網卡方案，專案核心著重於降低使用者的理解門檻，並有效提升導購轉換率。藉由整合平面視覺、動態影像與網頁介面設計，建構出一致且具吸引力的品牌溝通語彙。",
          designBlocks: [
            {
              layout: "1-col", // 一排一張 (適合滿版大圖)
              images: ["project/3_portfolio/portfolio.png"],
            },
            {
              layout: "2-col", // 一排兩張 (適合對比或細節)
              images: [
                "project/3_portfolio/02.png",
                "project/3_portfolio/03.png", // 測試用，之後可換成實際的圖
              ],
            },
            {
              layout: "3-col", // 一排三張 (非常適合手機 APP 截圖)
              images: [
                "project/3_portfolio/04.png",
                "project/3_portfolio/05.png",
                "project/3_portfolio/06.png",
              ],
            },
            {
              layout: "3-col", // 一排三張 (非常適合手機 APP 截圖)
              images: [
                "project/3_portfolio/07.png",
                "project/3_portfolio/08.png",
                "project/3_portfolio/09.png",
              ],
            },
          ],
          data: {
            client: "環亞電訊有限公司",
            production: "Solo Project",
            jobRole: "Graphic Designer",
            category: "GRAPHIC",
            release: "2024.01",
            tag: "平面設計, 動畫設計, 網頁設計",
            url: "https://online.fliphtml5.com/JhihSyuan_Lin/afax/#p=1",
          },
        },
      },
      {
        id: 4,
        title: "NoteWeb",
        subtitle: "Portfolio",
        category: "PRACTICE",
        tags: ["Vite+Vue3", "前端開發練習"],
        description:
          "Note筆記網站是我為了練習前端開發而創建的個人專案。這個網站允許使用者創建、編輯和刪除筆記，並且可以將筆記釘選或進行搜尋以便更好地組織。整個專案使用 Vite 作為構建工具，Vue 3 作為前端框架，並且利用 Pinia 進行狀態管理以及Bootstrap進行樣式設計。這個專案不僅幫助我熟悉了 Vue 3 的組件化開發，也讓我實際體驗了前端開發的流程和挑戰。",
        image: "project/3_portfolio/portfolio.png",
        link: "/works/NoteWeb",
        slug: "NoteWeb",
        details: {
          websiteUrl: "https://andylinsally.github.io/Note_web/",
          outline:
            "面對快節奏的電商檔期與複雜的網卡方案，專案核心著重於降低使用者的理解門檻，並有效提升導購轉換率。藉由整合平面視覺、動態影像與網頁介面設計，建構出一致且具吸引力的品牌溝通語彙。",
          designBlocks: [
            {
              layout: "1-col", // 一排一張 (適合滿版大圖)
              images: ["project/3_portfolio/portfolio.png"],
            },
            {
              layout: "2-col", // 一排兩張 (適合對比或細節)
              images: [
                "project/3_portfolio/02.png",
                "project/3_portfolio/03.png", // 測試用，之後可換成實際的圖
              ],
            },
            {
              layout: "3-col", // 一排三張 (非常適合手機 APP 截圖)
              images: [
                "project/3_portfolio/04.png",
                "project/3_portfolio/05.png",
                "project/3_portfolio/06.png",
              ],
            },
            {
              layout: "3-col", // 一排三張 (非常適合手機 APP 截圖)
              images: [
                "project/3_portfolio/07.png",
                "project/3_portfolio/08.png",
                "project/3_portfolio/09.png",
              ],
            },
          ],
          data: {
            client: "個人練習專案",
            production: "Solo Project",
            jobRole: "FrontEnd Developer",
            category: "FrontEnd Practice",
            release: "2024.01",
            tag: "前端開發練習, Vue3, Vite",
            url: "https://andylinsally.github.io/Note_web/",
          },
        },
      },
    ],
  }),

  getters: {
    filteredWorks: (state) => {
      if (state.currentCategory === "ALL") {
        return state.worksList;
      }
      return state.worksList.filter(
        (work) => work.category === state.currentCategory,
      );
    },
    getWorkById: (state) => {
      return (id) =>
        state.worksList.find((work) => work.id === id || work.slug === id);
    },
  },

  actions: {
    setCategory(category) {
      this.currentCategory = category;
    },
  },
});
