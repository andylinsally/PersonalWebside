<template>
  <div v-fade-group class="about-container px-4 px-lg-5 py-5 min-vh-100">
    <div class="d-flex justify-content-end border-bottom pb-4 mb-5">
      <h2
        class="display-3 fw-bold tracking-widest text-dark m-0 d-none d-md-block"
      >
        ABOUT
      </h2>
      <h2
        class="h1 fw-bold tracking-widest text-dark m-0 d-md-none w-100 text-end"
      >
        ABOUT
      </h2>
    </div>

    <div class="row pb-5 justify-content-center justify-content-lg-start gap-5">
      <div
        class="col-12 col-lg-4 col-xl-4 mb-5 mb-lg-0 text-center text-lg-start"
      >
        <div
          class="img-wrapper position-relative d-inline-block w-100"
          style="max-width: 380px"
        >
          <img
            src="../assets/images/profile.jpg"
            alt="JHIH SYUAN LIN"
            class="profile-img img-fluid rounded-3 shadow-sm position-relative z-1 w-100"
          />
          <div class="bg-shape position-absolute rounded-3 z-0"></div>
        </div>
      </div>

      <div class="col-12 col-lg-8 col-xl-7">
        <div class="mb-5">
          <h1 class="fw-bold tracking-widest mb-2 h2">
            林芷璿
            <span class="fs-5 text-secondary fw-normal ms-2"
              >JHIH SYUAN LIN</span
            >
          </h1>
          <p class="text-primary fw-bold tracking-widest">
            UI/UX Designer ／ Web Designer
          </p>
        </div>

        <section class="mb-5">
          <h3 class="h6 fw-bold tracking-widest mb-4 section-title">
            簡介 PROFILE
          </h3>
          <div class="text-secondary tracking-wide lh-lg fs-6">
            <p>
              擁有紮實的視覺設計與跨部門協作經驗，具備電商行銷設計背景。通過
              <b>472 小時 UI/UX 與前端網頁設計培訓</b>，精通 Figma
              介面設計與前端開發。擅長跨部門溝通並具備網頁開發能力，致力於打造兼具商業轉化與美感的數位體驗。
            </p>
          </div>
        </section>

        <section class="profile-table mb-5">
          <div class="profile-row">
            <div class="profile-label">所在地</div>
            <div class="profile-value">新北市，板橋區</div>
          </div>
          <div class="profile-row">
            <div class="profile-label">學歷 EDUCATION</div>
            <div class="profile-value lh-lg">
              <b>國立臺中教育大學</b>
              <span class="ms-2 small text-muted">2019 - 2023 (畢業)</span
              ><br />
              數位內容科技學系<br />
              <b>國立板橋高級中學</b>
              <span class="ms-2 small text-muted">2016 - 2019</span>
            </div>
          </div>
          <div class="profile-row">
            <div class="profile-label">工作經歷 EXPERIENCE</div>
            <div class="profile-value lh-lg">
              <div class="mb-3">
                <b>環亞電訊有限公司</b>
                <span class="ms-2 small text-muted">2022.9 - 2025.3</span><br />
                <span class="text-dark-50">電商行銷設計師</span>
              </div>
              <div>
                <b>緯思創國際有限公司</b>
                <span class="ms-2 small text-muted">2021.7 - 2021.8</span><br />
                <span class="text-dark-50">設計實習生</span>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-5">
          <h3 class="h6 fw-bold tracking-widest mb-4 section-title">
            專業執行力 CORE COMPETENCIES
          </h3>
          <div class="row g-4">
            <div class="col-md-6">
              <div class="p-4 bg-light rounded-1 h-100">
                <h4 class="h6 fw-bold mb-3">UI/UX Design</h4>
                <ul class="small text-secondary lh-lg ps-3 mb-0">
                  <li>前期使用者研究、數據分析與競品分析</li>
                  <li>運用 User Flow 與 Wireframe 確保產品邏輯與介面易用性</li>
                  <li>
                    使用 Figma 建立設計系統 (Design System)，維持品牌視覺一致性
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-4 bg-light rounded-1 h-100">
                <h4 class="h6 fw-bold mb-3">Web Development</h4>
                <ul class="small text-secondary lh-lg ps-3 mb-0">
                  <li>精通 HTML5, CSS3 與 JavaScript</li>
                  <li>熟悉 <b>Vue 3</b> 架構與狀態管理 (Pinia/Router)</li>
                  <li>具備 Git 版本控制與 GitHub 協作經驗</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-5">
          <h3 class="h6 fw-bold tracking-widest mb-4 section-title">
            技能 SKILLS
          </h3>
          <div class="row">
            <div class="col-12 mb-4">
              <p class="small fw-bold mb-3 text-muted">
                UI/UX & Graphic Design
              </p>
              <div class="d-flex flex-wrap gap-2">
                <span class="skill-badge">Figma</span>
                <span class="skill-badge">Adobe Illustrator</span>
                <span class="skill-badge">Adobe Photoshop</span>
              </div>
            </div>
            <div class="col-12">
              <p class="small fw-bold mb-3 text-muted">Front-end Development</p>
              <div class="d-flex flex-wrap gap-2">
                <span class="skill-badge">HTML5 / CSS3</span>
                <span class="skill-badge">JavaScript</span>
                <span class="skill-badge">Sass / SCSS</span>
                <span class="skill-badge">Vue 3</span>
                <span class="skill-badge">Bootstrap 5</span>
                <span class="skill-badge">Vite</span>
                <span class="skill-badge">Git / GitHub</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/variables";

.about-container {
  background-color: var(--bs-body-bg);
}


.img-wrapper {
  .bg-shape {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05); 
    top: 20px;
    left: -20px;
    transition: transform 0.5s ease;
  }

  .profile-img {
    transition: transform 0.5s ease;
  }

  &:hover {
    .profile-img {
      transform: translateY(-5px);
    }
    .bg-shape {
      transform: translate(10px, 10px);
    }
  }
}
/* -------------------------- */

.tracking-wide {
  letter-spacing: 0.1em;
}

.tracking-widest {
  letter-spacing: 0.2em;
}

.section-title {
  border-left: 3px solid var(--bs-primary);
  padding-left: 1rem;
  color: var(--bs-headings-color);
}

/* --- 表格化排版 --- */
.profile-row {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;

  @media (min-width: map-get($grid-breakpoints, md)) {
    flex-direction: row;
  }

  &:last-child {
    border-bottom: 1px solid #eee;
  }

  .profile-label {
    width: 100%;
    font-weight: bold;
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 0.5rem;
    letter-spacing: 0.1em;

    @media (min-width: map-get($grid-breakpoints, md)) {
      width: 30%;
      margin-bottom: 0;
    }
  }

  .profile-value {
    width: 100%;
    font-size: 0.95rem;
    color: var(--bs-body-color);

    @media (min-width: map-get($grid-breakpoints, md)) {
      width: 70%;
    }
  }
}

/* --- 技能標籤樣式 --- */
.skill-badge {
  background-color: #f8f9fa;
  border: 1px solid #eee;
  padding: 0.4rem 1rem;
  font-size: 0.8rem;
  border-radius: 20px;
  color: #555;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--bs-primary);
    color: white;
    border-color: var(--bs-primary);
    transform: translateY(-2px);
  }
}

.text-dark-50 {
  color: rgba(0, 0, 0, 0.6);
}
</style>
