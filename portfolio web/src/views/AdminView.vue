<template>
  <div
    class="admin-container container py-5 min-vh-100 d-flex flex-column justify-content-center"
  >
    <div v-if="!isLoggedIn" class="row justify-content-center w-100">
      <div class="col-12 col-md-6 col-lg-5">
        <div class="card shadow-sm border-0 p-4 p-md-5">
          <h2 class="fw-bold tracking-widest mb-4 text-center">管理員登入</h2>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label fw-bold">Email</label>
              <input
                type="email"
                v-model="loginForm.email"
                class="form-control"
                required
              />
            </div>
            <div class="mb-4">
              <label class="form-label fw-bold">密碼</label>
              <input
                type="password"
                v-model="loginForm.password"
                class="form-control"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-custom-primary w-100 py-2 fw-bold tracking-widest"
              :disabled="isAuthenticating"
            >
              {{ isAuthenticating ? "登入中..." : "登入" }}
            </button>
            <p v-if="loginError" class="text-danger mt-3 text-center small">
              {{ loginError }}
            </p>
          </form>
        </div>
      </div>
    </div>

    <div v-else class="row justify-content-center w-100">
      <div class="col-12 col-lg-10">
        <div
          class="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3"
        >
          <h1 class="fw-bold tracking-widest m-0">作品管理後台</h1>
          <button @click="handleLogout" class="btn btn-outline-danger btn-sm">
            登出
          </button>
        </div>

        <div class="mb-5">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold mb-4">已發布作品 (Firebase)</h3>

            <div class="d-flex gap-2">
              <button
                v-if="firebaseWorks.length > 1"
                @click="saveOrder"
                class="btn btn-success btn-sm fw-bold shadow-sm"
                :disabled="isSavingOrder"
              >
                {{ isSavingOrder ? "儲存中..." : "儲存目前排序" }}
              </button>
            </div>
          </div>

          <div v-if="isLoadingList" class="text-center text-muted py-4">
            載入中...
          </div>

          <div
            v-else-if="firebaseWorks.length === 0"
            class="text-center text-muted py-4 bg-assets-block"
          >
            目前沒有在 Firebase 上發布的作品。
          </div>

          <div v-else class="list-group shadow-sm">
            <div
              v-for="(work, index) in firebaseWorks"
              :key="work.id"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3"
            >
              <div class="d-flex align-items-center gap-3">
                <div class="d-flex flex-column gap-1 me-2">
                  <button
                    @click="moveUp(index)"
                    :disabled="index === 0"
                    class="btn btn-sm btn-light py-0 border text-muted"
                  >
                    ▲
                  </button>
                  <button
                    @click="moveDown(index)"
                    :disabled="index === firebaseWorks.length - 1"
                    class="btn btn-sm btn-light py-0 border text-muted"
                  >
                    ▼
                  </button>
                </div>
                <button
                  @click="toggleFeature(work)"
                  class="btn btn-sm border-0 fs-5 star-btn"
                  :class="work.isFeatured ? 'is-featured' : 'text-muted'"
                  :title="work.isFeatured ? '取消首頁顯示' : '設定為首頁顯示'"
                >
                  {{ work.isFeatured ? "★" : "☆" }}
                </button>
                <img
                  v-if="work.image"
                  :src="work.image"
                  alt="封面預覽"
                  class="rounded object-fit-cover"
                  style="width: 60px; height: 60px"
                />
                <div>
                  <h6 class="mb-1 fw-bold">{{ work.title }}</h6>
                  <small class="text-muted">{{ work.category }}</small>
                </div>
              </div>

              <div class="d-flex gap-2">
                <button
                  @click="handleEdit(work)"
                  class="btn btn-sm btn-outline-primary px-3 fw-bold"
                >
                  編輯
                </button>

                <button
                  @click="confirmDelete(work.id, work.title)"
                  class="btn btn-sm btn-danger px-3 fw-bold shadow-sm"
                  :disabled="isDeleting === work.id"
                >
                  {{ isDeleting === work.id ? "刪除中..." : "刪除" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr class="my-5" />

        <div class="card shadow-sm border-0 p-4 p-md-5">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold m-0">
              {{ editingId ? "編輯作品" : "新增作品" }}
            </h3>
            <button
              v-if="editingId"
              @click="cancelEdit"
              class="btn btn-sm btn-outline-secondary"
            >
              取消編輯
            </button>
          </div>
          <form @submit.prevent="submitWork">
            <h4 class="fw-bold border-bottom pb-2 mb-4 mt-2">1. 基本資料</h4>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">主標題 (Title) *</label>
                <input
                  type="text"
                  v-model="form.title"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">副標題 (Subtitle)</label>
                <input
                  type="text"
                  v-model="form.subtitle"
                  class="form-control"
                />
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label fw-bold">分類 (Category) *</label>
                <select v-model="form.category" class="form-select" required>
                  <option value="UI/UX">UI/UX</option>
                  <option value="GRAPHIC">GRAPHIC</option>
                  <option value="PRACTICE">PRACTICE</option>
                </select>
              </div>
              <div class="col-md-8 mb-3">
                <label class="form-label fw-bold">標籤 (Tags) *</label>
                <input
                  type="text"
                  v-model="tagsInput"
                  class="form-control"
                  placeholder="用半形逗號分隔，如：UI/UX, 網頁設計"
                  required
                />
              </div>
              <div class="col-12 mb-3">
                <label class="form-label fw-bold">專案概述 (Outline)</label>
                <textarea
                  v-model="form.outline"
                  class="form-control"
                  rows="3"
                  placeholder="支援 HTML 標籤如 <br> 換行"
                ></textarea>
              </div>
              <div class="col-12 mb-4">
                <label class="form-label fw-bold">網站連結 (Website URL)</label>
                <input
                  type="url"
                  v-model="form.websiteUrl"
                  class="form-control"
                  placeholder="https://..."
                />
              </div>
            </div>

            <h4 class="fw-bold border-bottom pb-2 mb-4 mt-4">
              2. 封面圖片 (Cover)
            </h4>
            <div class="mb-4 bg-assets-block p-3 rounded">
              <input
                type="file"
                @change="handleCoverChange"
                class="form-control"
                accept="image/*"
                required
              />
              <div v-if="coverPreview" class="mt-3">
                <img
                  :src="coverPreview"
                  alt="封面預覽"
                  class="img-thumbnail"
                  style="height: 150px; object-fit: cover"
                />
              </div>
            </div>

            <div
              class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4 mt-5"
            >
              <h4 class="fw-bold m-0">3. 設計展示圖 (Design Blocks)</h4>
              <button
                type="button"
                @click="addDesignBlock"
                class="btn btn-sm btn-custom-outline"
              >
                + 新增排版區塊
              </button>
            </div>

            <div
              v-if="designBlocks.length === 0"
              class="text-center text-muted py-4 mb-4 bg-assets-block rounded"
            >
              尚未新增任何設計區塊，點擊右上角按鈕新增。
            </div>

            <div
              v-for="(block, index) in designBlocks"
              :key="index"
              class="card border mb-4 shadow-sm"
            >
              <div
                class="card-header bg-white d-flex justify-content-between align-items-center py-3"
              >
                <h6 class="m-0 fw-bold">區塊 #{{ index + 1 }}</h6>
                <button
                  type="button"
                  @click="removeDesignBlock(index)"
                  class="btn btn-sm btn-outline-danger"
                >
                  刪除此區塊
                </button>
              </div>
              <div class="card-body">
                <div class="row align-items-end">
                  <div class="col-md-4 mb-3">
                    <label class="form-label fw-bold">選擇排版 (Layout)</label>
                    <select v-model="block.layout" class="form-select">
                      <option value="1-col">一排 1 張圖 (滿版)</option>
                      <option value="2-col">一排 2 張圖 (對比)</option>
                      <option value="3-col">一排 3 張圖 (手機介面)</option>
                    </select>
                  </div>
                  <div class="col-md-8 mb-3">
                    <label class="form-label fw-bold"
                      >上傳此區塊圖片 (可多選)</label
                    >
                    <input
                      type="file"
                      @change="(e) => handleBlockImagesChange(e, index)"
                      class="form-control"
                      accept="image/*"
                      multiple
                    />
                  </div>
                </div>
                <div
                  v-if="block.previews && block.previews.length > 0"
                  class="mt-3"
                >
                  <p class="small text-muted mb-2">
                    已選擇 {{ block.previews.length }} 張圖片預覽：
                  </p>
                  <div class="d-flex gap-2 flex-wrap">
                    <img
                      v-for="(preview, pIdx) in block.previews"
                      :key="pIdx"
                      :src="preview"
                      class="img-thumbnail"
                      style="height: 80px; width: 80px; object-fit: cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <h4 class="fw-bold border-bottom pb-2 mb-4 mt-5">
              4. 專案細節 (DATA)
            </h4>
            <div class="row bg-assets-block p-3 rounded mb-5 mx-0">
              <div class="col-md-4 mb-3">
                <label class="form-label small fw-bold">客戶 (Client)</label>
                <input
                  type="text"
                  v-model="form.data.client"
                  class="form-control form-control-sm"
                />
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label small fw-bold"
                  >製作團隊 (Production)</label
                >
                <input
                  type="text"
                  v-model="form.data.production"
                  class="form-control form-control-sm"
                />
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label small fw-bold"
                  >擔任職位 (Job Role)</label
                >
                <input
                  type="text"
                  v-model="form.data.jobRole"
                  class="form-control form-control-sm"
                />
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label small fw-bold"
                  >發布時間 (Release)</label
                >
                <input
                  type="text"
                  v-model="form.data.release"
                  class="form-control form-control-sm"
                  placeholder="如: 2024.05"
                />
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-custom-primary w-100 py-3 fw-bold tracking-widest fs-5 shadow"
              :disabled="isUploading"
            >
              <span v-if="isUploading">努力上傳與處理中，請耐心等候...</span>
              <span v-else>{{ editingId ? "儲存修改" : "發布完整作品" }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { worksApi } from "../api/worksApi";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// --- 登入狀態管理 ---
const isLoggedIn = ref(false);
const isAuthenticating = ref(false);
const loginError = ref("");
const loginForm = reactive({ email: "", password: "" });

// ⭐️ 新增：後台專用的作品列表狀態
const firebaseWorks = ref([]);
const isLoadingList = ref(true);
const isDeleting = ref(null); // 紀錄目前正在刪除的 id
const editingId = ref(null); // 新增：紀錄目前正在編輯的作品 ID (null 代表新增模式)

// ==========================================
// ====== ⭐️ 首頁精選邏輯 (Featured) ======
// ==========================================
const toggleFeature = async (work) => {
  // 為了讓使用者體驗更好，我們先在畫面上立即切換狀態 (樂觀 UI 更新)
  const originalStatus = work.isFeatured || false;
  work.isFeatured = !originalStatus;

  try {
    // 呼叫 API 真的去改 Firebase
    await worksApi.toggleFeatured(work.id, originalStatus);
  } catch (error) {
    // 如果失敗了，再把畫面上的狀態改回來
    work.isFeatured = originalStatus;
    alert("切換失敗，請稍後再試。");
  }
};

// ==========================================
// ====== ⭐️ 排序邏輯 (Sort Order) ======
// ==========================================
const isSavingOrder = ref(false);

// 往上移動：把目前這筆跟上一筆互換位置
const moveUp = (index) => {
  if (index === 0) return;
  const temp = firebaseWorks.value[index];
  firebaseWorks.value[index] = firebaseWorks.value[index - 1];
  firebaseWorks.value[index - 1] = temp;
};

// 往下移動：把目前這筆跟下一筆互換位置
const moveDown = (index) => {
  if (index === firebaseWorks.value.length - 1) return;
  const temp = firebaseWorks.value[index];
  firebaseWorks.value[index] = firebaseWorks.value[index + 1];
  firebaseWorks.value[index + 1] = temp;
};

// 儲存排序到 Firebase
const saveOrder = async () => {
  isSavingOrder.value = true;
  try {
    // 呼叫 API，把排序好的陣列傳過去
    await worksApi.updateWorksOrder(firebaseWorks.value);
    alert("排序儲存成功！前台已同步更新。");
  } catch (error) {
    console.error("儲存排序失敗:", error);
    alert("儲存排序失敗，請查看 Console。");
  } finally {
    isSavingOrder.value = false;
  }
};

// 載入 Firebase 作品列表
const loadFirebaseWorks = async () => {
  isLoadingList.value = true;
  try {
    const data = await worksApi.fetchWorks();
    firebaseWorks.value = data;
  } catch (error) {
    console.error("載入作品列表失敗:", error);
  } finally {
    isLoadingList.value = false;
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
    if (user) {
      // 登入成功後，立刻抓取資料顯示在畫面上
      loadFirebaseWorks();
    }
  });
});

const handleLogin = async () => {
  isAuthenticating.value = true;
  loginError.value = "";
  try {
    await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
  } catch (error) {
    loginError.value = "登入失敗，請檢查 Email 或密碼。";
  } finally {
    isAuthenticating.value = false;
  }
};

const handleLogout = async () => {
  await signOut(auth);
};

// ==========================================
// ====== ⭐️ 刪除邏輯 (Delete) ======
// ==========================================
const confirmDelete = async (id, title) => {
  // 利用原生瀏覽器的 confirm 阻擋誤觸
  if (
    !window.confirm(`⚠️ 警告！\n\n確定要刪除「${title}」嗎？\n此動作無法還原！`)
  ) {
    return;
  }

  isDeleting.value = id; // 將按鈕切換為 loading 狀態

  try {
    // 呼叫我們剛剛在 worksApi 寫好的 deleteWork
    await worksApi.deleteWork(id);

    // 刪除成功後，重新抓取最新的列表
    await loadFirebaseWorks();
    alert("刪除成功！請記得去前台重整畫面確認。");
  } catch (error) {
    console.error("刪除失敗:", error);
    alert("刪除失敗，請看 Console 了解詳情。");
  } finally {
    isDeleting.value = null; // 解除 loading
  }
};

// ==========================================
// ====== ⭐️ 編輯邏輯 (Edit) ======
// ==========================================
const handleEdit = (work) => {
  // 1. 設定為編輯模式
  editingId.value = work.id;

  // 2. 為了體驗更好，讓畫面自動捲動回表單頂部
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 3. 回填基本資料與 Data
  form.title = work.title;
  form.subtitle = work.subtitle || "";
  form.category = work.category;
  form.outline = work.details?.outline || "";
  form.websiteUrl = work.details?.websiteUrl || "";
  tagsInput.value = (work.tags || []).join(", ");

  if (work.details?.data) {
    form.data.client = work.details.data.client || "";
    form.data.production = work.details.data.production || "";
    form.data.jobRole = work.details.data.jobRole || "";
    form.data.release = work.details.data.release || "";
  }

  // 4. 回填封面圖預覽 (因為無法回填 File 物件，我們只顯示舊圖網址)
  coverFile.value = null; // 清空選擇的檔案
  coverPreview.value = work.image;

  // 5. 回填 DesignBlocks
  if (work.details?.designBlocks) {
    // 將 Firebase 存的格式，轉回我們表單綁定的格式
    designBlocks.value = work.details.designBlocks.map((block) => ({
      layout: block.layout,
      files: [], // 無法回填真實檔案，保持空陣列
      previews: block.images || [], // 將原本儲存的網址拿來當預覽
    }));
  } else {
    designBlocks.value = [];
  }
};

// ⭐️ 新增：取消編輯模式的函式
const cancelEdit = () => {
  editingId.value = null;
  // 清空表單 (偷懶作法：直接重整頁面，或是手動把 form 的值全清空)
  window.location.reload();
};

// ==========================================
// ====== 新增表單狀態與邏輯 (維持不變) ======
// ==========================================
const isUploading = ref(false);

const form = reactive({
  title: "",
  subtitle: "",
  category: "UI/UX",
  outline: "",
  websiteUrl: "",
  data: {
    client: "",
    production: "",
    jobRole: "",
    release: "",
  },
});
const tagsInput = ref("");

const coverFile = ref(null);
const coverPreview = ref(null);

const handleCoverChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    coverFile.value = file;
    coverPreview.value = URL.createObjectURL(file);
  }
};

const designBlocks = ref([]);

const addDesignBlock = () => {
  designBlocks.value.push({ layout: "1-col", files: [], previews: [] });
};

const removeDesignBlock = (index) => {
  designBlocks.value.splice(index, 1);
};

const handleBlockImagesChange = (e, blockIndex) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;
  designBlocks.value[blockIndex].files = Array.from(files);
  designBlocks.value[blockIndex].previews = Array.from(files).map((file) =>
    URL.createObjectURL(file),
  );
};

const submitWork = async () => {
  // 如果是新增模式才強制檢查圖片，編輯模式如果沒選新圖，代表保留舊圖
  if (!editingId.value && !coverFile.value)
    return alert("請務必上傳封面圖片！");

  isUploading.value = true;

  try {
    // --- A. 處理封面圖 ---
    // 如果有選新圖就上傳拿新網址，如果沒選新圖就沿用剛剛回填的 coverPreview 舊網址
    let coverUrl = coverPreview.value;
    if (coverFile.value) {
      coverUrl = await worksApi.uploadImage(
        coverFile.value,
        "portfolio-covers",
      );
    }

    // --- B. 整理標籤 ---
    const tagsArray = tagsInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    // --- C. 處理 DesignBlocks ---
    const finalDesignBlocks = [];
    for (const block of designBlocks.value) {
      let blockImages = block.previews; // 預設沿用舊的網址陣列

      // ⭐️ 只有當這個區塊「有選新圖片」時，才去執行上傳！
      if (block.files.length > 0) {
        blockImages = await worksApi.uploadMultipleImages(
          block.files,
          "portfolio-details",
        );
      }

      finalDesignBlocks.push({
        layout: block.layout,
        images: blockImages, // 存入新網址或舊網址
      });
    }

    // --- D. 打包終極物件 ---
    const finalWorkData = {
      title: form.title,
      subtitle: form.subtitle,
      category: form.category,
      tags: tagsArray,
      image: coverUrl,
      details: {
        websiteUrl: form.websiteUrl,
        outline: form.outline,
        designBlocks: finalDesignBlocks,
        data: {
          client: form.data.client,
          production: form.data.production,
          jobRole: form.data.jobRole,
          category: form.category,
          release: form.data.release,
          tag: tagsArray.join(", "),
          url: form.websiteUrl || "-",
        },
      },
      // 更新時間 (可選)
      updatedAt: new Date().toISOString(),
    };

    // --- E. API 分流：判斷要新增還是更新！ ---
    if (editingId.value) {
      // 編輯模式
      await worksApi.updateWork(editingId.value, finalWorkData);
      alert("作品更新成功！");
    } else {
      // 新增模式 (加上建立時間)
      finalWorkData.createdAt = new Date().toISOString();
      finalWorkData.isFeatured = false;
      await worksApi.addWork(finalWorkData);
      alert("新作品發布成功！");
    }

    window.location.reload();
  } catch (error) {
    alert("發生錯誤，請看 Console 了解詳情。");
    console.error("處理失敗:", error);
  } finally {
    isUploading.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

/* --- 星星按鈕專屬樣式 --- */
.star-btn {
  transition: all 0.2s ease;
  padding: 0 0.5rem;

  /* 滑鼠移過去時有一點點放大效果，增加互動感 */
  &:hover {
    transform: scale(1.2);
  }
}

/* 當作品被精選時，套用你的 primary 顏色！ */
.is-featured {
  color: $primary !important;
}

.tracking-widest {
  letter-spacing: 0.15em;
}

h1,
h2,
h3,
h4,
h6 {
  color: $headings-color;
}
.form-label,
p,
div {
  color: $body-color;
}

.bg-assets-block {
  background-color: rgba($bg-assets, 0.5);
  border-radius: 8px;
  padding: 1.5rem;
}

.btn-custom-primary {
  background-color: $primary;
  color: #ffffff;
  border: none;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: darken($primary, 8%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba($primary, 0.3);
  }

  &:disabled {
    background-color: rgba($primary, 0.6);
    cursor: not-allowed;
  }
}

.btn-custom-outline {
  color: $primary;
  border: 1px solid $primary;
  background: transparent;
  transition: all 0.3s ease;

  &:hover {
    background-color: $primary;
    color: #ffffff;
  }
}
</style>
