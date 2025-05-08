<template>
    <div class="meeting-page">
      <h2>📝 회의록 요약</h2>
  
      <!-- 요약 방식 선택 버튼 -->
      <div class="tab-buttons">
        <button :class="{ active: mode === 'audio' }" @click="mode = 'audio'">🎤 음성 요약</button>
        <button :class="{ active: mode === 'text' }" @click="mode = 'text'">📝 텍스트 요약</button>
      </div>
  
      <!-- 음성 요약 섹션 -->
      <div v-if="mode === 'audio'" class="section">
        <h3>🎤 음성 파일 업로드</h3>
        <input type="file" @change="handleFileUpload" />
        <button @click="submitAudio">요약 요청</button>
      </div>
  
      <!-- 텍스트 요약 섹션 -->
      <div v-if="mode === 'text'" class="section">
        <h3>🧾 텍스트 회의록 요약</h3>
        <textarea v-model="inputText" placeholder="회의록 텍스트를 입력하세요..." rows="6"></textarea>
        <button @click="submitText">요약 요청</button>
      </div>
  
      <!-- 요약 결과 -->
      <div v-if="loading" class="section loading">
        <h3>⏳ 요약 중입니다...</h3> <h3>파일의 길이에 따라 수 분 까지 소요됩니다.</h3>
      </div>

      <div v-else-if="summary" class="section">
        <h3>📋 요약 결과</h3>
        <p>{{ summary }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { uploadAudioFile, summarizeAudio, summarizeText } from '@/api/meeting';
  
  const mode = ref('audio');
  const file = ref(null);
  const inputText = ref('');
  const summary = ref('');
  const loading = ref(false);
  
  watch(mode, () => {
    summary.value = '';
    inputText.value = '';   
    file.value = null;    
  });

  const handleFileUpload = (event) => {
    file.value = event.target.files[0];
  };
  
  const submitAudio = async () => {
    if (!file.value) {
        alert("파일을 먼저 선택해주세요.");
        return;
    }

    try {
        loading.value = true;
        const uploadRes = await uploadAudioFile(file.value);
        const fileId = uploadRes.file_id;
        const summaryRes = await summarizeAudio(fileId);
        summary.value = summaryRes.transcription;
    } catch (error) {
        console.error("❌ 음성 요약 오류:", error);
        alert("음성 요약 중 오류가 발생했습니다.");
    } finally {
        loading.value = false;
    }
  };

  const submitText = async () => {
    if (!inputText.value.trim()) {
        alert("텍스트를 입력해주세요.");
        return;
    }

    console.log("🟡 submitText 실행됨");
    
    try {
        loading.value = true;
        const summaryRes = await summarizeText(inputText.value);
        console.log("🟢 요약 성공:", summaryRes);
        summary.value = summaryRes.summary;
    } catch (error) {
        console.error("❌ 텍스트 요약 오류:", error);
        alert("텍스트 요약 중 오류가 발생했습니다.");
    } finally {
        loading.value = false;
    }
};


  </script>
  
  
  <style scoped>
  .meeting-page {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    background: linear-gradient(135deg, #f8faff, #eef2ff);
    min-height: 100vh;
    font-family: 'Pretendard', sans-serif;
  }
  
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .tab-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .tab-buttons button {
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    border: 2px solid #ddd;
    background: white;
    color: black;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .tab-buttons button.active {
    background: #60a5fa;
    color: white;
    border-color: #60a5fa;
  }
  
  .section {
    background: white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 2rem;
    box-shadow: 0 6px 20px rgba(96, 165, 250, 0.1);
    border: 1px solid #e5e7eb;
  }
  
  .section h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  input[type="file"],
  textarea {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    padding: 12px;
    font-size: 1rem;
    margin-top: 0.5rem;
    background-color: #f9fafb;
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  button {
    margin-top: 1rem;
    padding: 12px 20px;
    border-radius: 12px;
    background: linear-gradient(135deg, #60a5fa, #9f7aea);
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
  }
  
  p {
    font-size: 1rem;
    color: #444;
    line-height: 1.6;
  }
  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #4b5563;
  }

  .loading::after {
    content: '';
    display: block;
    margin: 20px auto;
    width: 36px;
    height: 36px;
    border: 4px solid #ccc;
    border-top-color: #60a5fa;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
        transform: rotate(360deg);
    }
  }

  </style>
  