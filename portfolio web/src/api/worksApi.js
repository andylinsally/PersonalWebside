import { db, storage } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// 定義我們要操作的資料表名稱
const COLLECTION_NAME = "works";
const worksCollection = collection(db, COLLECTION_NAME);

export const worksApi = {
  // 1. 取得所有作品 (Get)
  async fetchWorks() {
    try {
      const snapshot = await getDocs(worksCollection);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("抓取作品失敗:", error);
      throw error;
    }
  },

  // 2. 新增單一作品 (Post)
  async addWork(workData) {
    try {
      const docRef = await addDoc(worksCollection, workData);
      return docRef.id;
    } catch (error) {
      console.error("新增作品失敗:", error);
      throw error;
    }
  },

  // 3. 上傳圖片到 Storage 並回傳網址
  async uploadImage(file, folderPath = "projects") {
    try {
      // 產生一個唯一檔名避免覆蓋
      const uniqueFileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `${folderPath}/${uniqueFileName}`);

      // 上傳檔案
      const snapshot = await uploadBytes(storageRef, file);

      // 取得可供讀取的公開 URL
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (error) {
      console.error("圖片上傳失敗:", error);
      throw error;
    }
  },
  // ⭐️ 4. (全新加入) 上傳多張圖片 (給 designBlocks 使用)
  async uploadMultipleImages(files, folderPath = "projects") {
    try {
      // 因為 input 選擇多個檔案時傳來的是 FileList，我們將它轉成標準的 Array
      const filesArray = Array.from(files);

      // 建立一個包含所有「上傳任務」的陣列
      const uploadPromises = filesArray.map(async (file) => {
        // 為了避免同時上傳時檔名撞名，加上一段隨機亂碼
        const randomString = Math.random().toString(36).substring(7);
        const uniqueFileName = `${Date.now()}-${randomString}-${file.name}`;

        const storageRef = ref(storage, `${folderPath}/${uniqueFileName}`);

        // 執行上傳並取得網址
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return downloadUrl; // 回傳單一網址
      });

      // ⭐️ 關鍵魔法：Promise.all 會「同時」執行所有任務，並等待它們全部完成
      // 最終會回傳一個陣列，例如: ['https://...', 'https://...', 'https://...']
      const imageUrls = await Promise.all(uploadPromises);

      return imageUrls;
    } catch (error) {
      console.error("多圖上傳失敗:", error);
      throw error;
    }
  },
  // ⭐️ 5. 刪除作品 (Delete)
  async deleteWork(id) {
    try {
      // 找到該筆資料的參考位址
      const docRef = doc(db, COLLECTION_NAME, id);
      // 執行刪除
      await deleteDoc(docRef);
    } catch (error) {
      console.error("刪除作品失敗:", error);
      throw error;
    }
  },

  // ⭐️ 6. 更新作品 (Update)
  async updateWork(id, updateData) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      // 執行更新 (只會覆蓋你有傳入的欄位，不會洗掉沒改的資料)
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error("更新作品失敗:", error);
      throw error;
    }
  },

  // ⭐️ 7. 批次更新作品排序
  async updateWorksOrder(orderedWorks) {
    try {
      // 利用 Promise.all 同時發送多筆更新請求
      const updatePromises = orderedWorks.map((work, index) => {
        const docRef = doc(db, COLLECTION_NAME, work.id);
        // 將該作品在陣列中的位置 (index) 存為 sortOrder 欄位
        return updateDoc(docRef, { sortOrder: index });
      });

      await Promise.all(updatePromises);
    } catch (error) {
      console.error("更新排序失敗:", error);
      throw error;
    }
  },
  
  // ⭐️ 8. 切換作品的「首頁精選」狀態
  async toggleFeatured(id, currentStatus) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      // 將目前的狀態反轉 (true 變成 false，false 變成 true)
      await updateDoc(docRef, { isFeatured: !currentStatus });
    } catch (error) {
      console.error("切換精選狀態失敗:", error);
      throw error;
    }
  },
};
