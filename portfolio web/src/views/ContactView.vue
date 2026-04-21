<template>
  <div
    v-fade-group
    class="contact-container px-4 px-lg-5 py-5 min-vh-100 position-relative"
  >
    <div
      class="d-flex justify-content-end border-bottom pb-4 mb-5 position-relative"
    >
      <div class="title-bg-shape d-none d-md-block"></div>

      <h2
        class="display-3 fw-bold tracking-widest text-dark m-0 d-none d-md-block z-1"
      >
        CONTACT
      </h2>
      <h2
        class="h1 fw-bold tracking-widest text-dark m-0 d-md-none w-100 text-end"
      >
        CONTACT
      </h2>
    </div>

    <div class="row pb-5 justify-content-center">
      <div class="col-12 col-lg-10 col-xl-9">
        <div class="mb-5">
          <h3 class="h5 fw-bold tracking-widest mb-4">
            Contact Me
            <span class="fs-6 text-muted ms-2 fw-normal tracking-wide"
              >聯絡我</span
            >
          </h3>
          <p class="text-secondary tracking-wide lh-lg fs-6 mb-0">
            如有工作洽詢、專案報價或其他任何問題，歡迎隨時透過下方表單與我聯繫。<br />
            收到訊息後，我會盡快透過電子郵件回覆您。
          </p>
        </div>

        <form @submit.prevent="submitForm" class="contact-form">
          <div class="row mb-4 align-items-md-center">
            <div class="col-md-3 mb-2 mb-md-0 d-flex align-items-center">
              <span class="badge badge-required me-3">必填</span>
              <label for="name" class="fw-bold tracking-wide text-dark mb-0"
                >姓名</label
              >
            </div>
            <div class="col-md-9">
              <input
                type="text"
                id="name"
                v-model="formData.name"
                class="form-control custom-input"
                required
              />
            </div>
          </div>

          <div class="row mb-4 align-items-md-center">
            <div class="col-md-3 mb-2 mb-md-0 d-flex align-items-center">
              <span class="badge badge-optional me-3">任意</span>
              <label for="company" class="fw-bold tracking-wide text-dark mb-0"
                >公司名稱</label
              >
            </div>
            <div class="col-md-9">
              <input
                type="text"
                id="company"
                v-model="formData.company"
                class="form-control custom-input"
              />
            </div>
          </div>

          <div class="row mb-4 align-items-md-center">
            <div class="col-md-3 mb-2 mb-md-0 d-flex align-items-center">
              <span class="badge badge-required me-3">必填</span>
              <label for="email" class="fw-bold tracking-wide text-dark mb-0"
                >電子郵件</label
              >
            </div>
            <div class="col-md-9">
              <input
                type="email"
                id="email"
                v-model="formData.email"
                class="form-control custom-input"
                required
              />
            </div>
          </div>

          <div class="row mb-4 align-items-md-center">
            <div class="col-md-3 mb-2 mb-md-0 d-flex align-items-center">
              <span class="badge badge-optional me-3">任意</span>
              <label for="phone" class="fw-bold tracking-wide text-dark mb-0"
                >聯絡電話</label
              >
            </div>
            <div class="col-md-9">
              <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                class="form-control custom-input"
              />
            </div>
          </div>

          <div class="row mb-5">
            <div class="col-md-3 mb-2 mt-md-2 d-flex align-items-start">
              <span class="badge badge-required me-3 mt-1">必填</span>
              <label
                for="message"
                class="fw-bold tracking-wide text-dark mb-0 mt-1"
                >聯絡內容</label
              >
            </div>
            <div class="col-md-9">
              <textarea
                id="message"
                v-model="formData.message"
                rows="8"
                class="form-control custom-input"
                required
              ></textarea>
            </div>
          </div>

          <div class="text-center mt-5">
            <button
              type="submit"
              class="btn btn-submit px-5 py-3 tracking-widest fw-bold rounded-pill"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '發送中...' : '送出' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formData = reactive({
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
});


const isSubmitting = ref(false);

const submitForm = async () => {
 
  isSubmitting.value = true;

  try {
    
    const response = await fetch("https://formspree.io/f/mdaylyae", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    
    if (response.ok) {
      alert("感謝您的來信！我會盡快回覆您。");
      
      // 清空表單
      formData.name = "";
      formData.company = "";
      formData.email = "";
      formData.phone = "";
      formData.message = "";
    } else {
      alert("抱歉，信件發送失敗，請稍後再試。");
    }
  } catch (error) {
    console.error("發送錯誤：", error);
    alert("抱歉，網路連線似乎發生了錯誤。");
  } finally {
    
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.contact-container {
  background-color: $body-bg;
}

.tracking-wide {
  letter-spacing: 0.1em;
}

.tracking-widest {
  letter-spacing: 0.2em;
}

/* --- 標題背景裝飾 (導入 $bg-assets 變數) --- */
.title-bg-shape {
  position: absolute;
  top: -20px;
  right: 5%;
  width: 120px;
  height: 120px;
  background: repeating-linear-gradient(
    45deg,
    $bg-assets,
    $bg-assets 2px,
    transparent 2px,
    transparent 8px
  );
  opacity: 0.5;
  z-index: 0;
}

.z-1 {
  z-index: 1;
}

/* --- 表單標籤樣式 --- */
.badge {
  padding: 0.35em 0.8em;
  font-size: 0.75rem;
  border-radius: 20px;
  letter-spacing: 0.1em;
  font-weight: normal;
}

.badge-required {
  background-color: #ee6c65; 
  color: white;
}

.badge-optional {
  background-color: $border-color;
  color: white;
}

/* --- 輸入框無邊框極簡樣式 --- */
.custom-input {
  background-color: rgba($bg-assets, 0.3);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0.8rem 1rem;
  transition: all 0.3s ease;
  color: $body-color;

  &:focus {
    background-color: $body-bg;
    border-color: $bg-assets;
    box-shadow: 0 0 0 4px rgba($bg-assets, 0.5);
    outline: none;
  }
}

/* --- 底部送出按鈕 --- */
.btn-submit {
  background-color: $primary;
  color: white;
  transition: all 0.3s ease;
  border: none;
  font-size: 0.95rem;

  &:hover {
    background-color: darken(
      $primary,
      10%
    );
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba($primary, 0.3);
  }
}
</style>
