<template>
  <div class="meeting-page">
    <div class="meeting-header">
      <div class="header-left">
      </div>
      
      <div class="header-content">
        <div class="header-title-wrapper">
          <h2>📝 회의록 요약</h2>
        </div>
        <p>회의록을 AI가 요약해드립니다. 음성 파일이나 텍스트를 업로드하세요.</p>
      </div>
      
      <div class="header-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </div>

    <div class="meeting-main">
      <!-- 요약 방식 선택 버튼 -->
      <div class="tab-buttons">
        <button :class="{ active: mode === 'audio' }" @click="mode = 'audio'">
          <span class="tab-icon">🎤</span>
          음성 요약
        </button>
        <button :class="{ active: mode === 'text' }" @click="mode = 'text'">
          <span class="tab-icon">📝</span>
          텍스트 요약
        </button>
      </div>

      <div class="meeting-content">
        <!-- 음성 요약 섹션 -->
        <div v-if="mode === 'audio'" class="input-section">
          <div class="section-card">
            <h3>🎤 음성 파일 업로드</h3>
            <p class="section-description">회의 녹음 파일을 업로드하면 AI가 내용을 분석하여 요약해드립니다.</p>
            
            <label class="file-upload-label">
              <input type="file" @change="handleFileUpload" class="file-input" />
              <div class="upload-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 upload-icon">
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                파일 선택하기
              </div>
              <div v-if="file" class="selected-file">
                <span>📁 {{ file.name }}</span>
              </div>
            </label>
            
            <button class="submit-button" @click="submitAudio" :disabled="!file">
              요약 요청
            </button>
          </div>
        </div>

        <!-- 텍스트 요약 섹션 -->
        <div v-if="mode === 'text'" class="input-section">
          <div class="section-card">
            <h3>🧾 텍스트 회의록 요약</h3>
            <p class="section-description">회의록 텍스트를 입력하면 AI가 내용을 분석하여 요약해드립니다.</p>
            
            <textarea 
              v-model="inputText" 
              placeholder="회의록 텍스트를 입력하세요..." 
              rows="6"
              class="text-input"
            ></textarea>
            
            <button class="submit-button" @click="submitText" :disabled="!inputText.trim()">
              요약 요청
            </button>
          </div>
        </div>

        <!-- 요약 결과 섹션 -->
        <div v-if="loading" class="result-section loading">
          <div class="section-card">
            <h3>⏳ 요약 중입니다...</h3>
            <p class="loading-message">파일의 길이에 따라 수 분까지 소요될 수 있습니다.</p>
            <div class="loading-animation"></div>
          </div>
        </div>

        <div v-else-if="summary" class="result-section">
          <div class="section-card">
            <h3>📋 요약 결과</h3>
            <div class="summary-content" v-html="summary.replace(/\n/g, '<br/>')"></div>
            
            <div class="result-actions">
              <button class="action-button copy-button" @click="copyToClipboard">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                  <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                  <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                </svg>
                복사하기
              </button>
            </div>
          </div>
        </div>
      </div>
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
    summary.value = summaryRes.summary;
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
const copyToClipboard = () => {
  // 복사할 텍스트는 summary 값
  const textToCopy = summary.value;
  
  // 클립보드에 복사
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert('요약 내용이 클립보드에 복사되었습니다.');
    })
    .catch(err => {
      console.error('복사 중 오류 발생:', err);
      alert('복사 중 오류가 발생했습니다.');
    });
};
</script>

<style scoped>
/* 기본 스타일 변수 */
:root {
  --pastel-blue-300: #93c5fd;
  --pastel-blue-400: #60a5fa;
  --pastel-blue-500: #3b82f6;
}

/* 전체 페이지 레이아웃 */
.meeting-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #0047AB, #87CEEB);
  font-family: 'Pretendard', sans-serif;
}

/* 헤더 스타일 */
.meeting-header {
  padding: 50px;
  color: white;
  box-shadow: 0 10px 25px rgba(159, 122, 234, 0.15);
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.header-content {
  flex: 1;
}

.header-title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.meeting-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
}

.meeting-header p {
  font-size: 1rem;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-top: 0;
}

/* 헤더 장식 효과 */
.header-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 150px;
  height: 150px;
  top: -70px;
  right: 10%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.circle-2 {
  width: 80px;
  height: 80px;
  bottom: -20px;
  right: 20%;
  background: rgba(255, 255, 255, 0.15);
}

.circle-3 {
  width: 40px;
  height: 40px;
  top: 50%;
  right: 30%;
  background: rgba(255, 255, 255, 0.12);
}

/* 메인 콘텐츠 영역 */
.meeting-main {
  flex: 1;
  background: white;
  margin-top: -20px;
  padding: 30px;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 2;
}

/* 탭 버튼 스타일 */
.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.tab-buttons button {
  padding: 14px 28px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #e5e7eb;
  background: white;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.tab-buttons button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(96, 165, 250, 0.1);
  border-color: #93c5fd;
  color: #3b82f6;
}

.tab-buttons button.active {
  background: linear-gradient(135deg, #0047AB, #60a5fa);
  color: white;
  box-shadow: 0 8px 15px rgba(0, 71, 171, 0.2);
}

.tab-icon {
  font-size: 1.3rem;
}

/* 콘텐츠 레이아웃 */
.meeting-content {
  max-width: 800px;
  margin: 0 auto;
}

/* 카드 섹션 스타일 */
.section-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.section-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #0047AB, #87CEEB);
}

.section-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 71, 171, 0.1);
}

.section-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 12px;
  color: #0047AB;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-description {
  color: #555;
  margin-bottom: 25px;
  font-size: 1rem;
  line-height: 1.6;
}

/* 파일 업로드 스타일 */
.file-upload-label {
  display: block;
  margin-bottom: 20px;
  cursor: pointer;
}

.file-input {
  display: none;
}

.upload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px;
  background: linear-gradient(to right, #f0f7ff, #eef2ff);
  border: 1px dashed #93c5fd;
  border-radius: 12px;
  color: #60a5fa;
  font-weight: 500;
  transition: all 0.3s ease;
}

.upload-button:hover {
  background: linear-gradient(to right, #e1effe, #dbeafe);
  transform: translateY(-2px);
}

.upload-icon {
  width: 20px;
  height: 20px;
}

.selected-file {
  margin-top: 12px;
  padding: 12px;
  background-color: #f8faff;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #333;
}

/* 텍스트 입력 스타일 */
.text-input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  font-size: 1rem;
  line-height: 1.7;
  resize: vertical;
  min-height: 180px;
  background-color: rgba(0, 71, 171, 0.02);
  transition: all 0.25s ease;
  margin-bottom: 25px;
  font-family: inherit;
  color: #333;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.03);
}

.text-input:focus {
  outline: none;
  border-color: #0047AB;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(0, 71, 171, 0.1);
}

/* 버튼 스타일 */
.submit-button {
  padding: 16px 32px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0047AB, #87CEEB);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.05rem;
  display: block;
  width: 100%;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.3), rgba(255,255,255,0));
  transition: all 0.6s ease;
  z-index: -1;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 71, 171, 0.25);
}

.submit-button:hover::before {
  left: 100%;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  background: linear-gradient(135deg, #6c87a9, #a7c5d9);
}

.submit-button:disabled::before {
  display: none;
}

/* 로딩 상태 스타일 */
.loading-message {
  text-align: center;
  color: #4b5563;
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.loading-animation {
  width: 60px;
  height: 60px;
  border: 5px solid rgba(0, 71, 171, 0.1);
  border-top-color: #0047AB;
  border-radius: 50%;
  margin: 30px auto;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  position: relative;
}

.loading-animation::before,
.loading-animation::after {
  content: '';
  position: absolute;
  border-radius: 50%;
}

.loading-animation::before {
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border: 4px solid transparent;
  border-bottom-color: #87CEEB;
  animation: spin 1.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 요약 결과 스타일 */
.summary-content {
  background-color: rgba(135, 206, 235, 0.05);
  padding: 25px;
  border-radius: 16px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #333;
  border: 1px solid rgba(0, 71, 171, 0.1);
  margin-bottom: 25px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.summary-content::before {
  content: '요약';
  position: absolute;
  top: -12px;
  left: 20px;
  background: white;
  padding: 5px 15px;
  font-size: 0.8rem;
  color: #0047AB;
  border-radius: 30px;
  border: 1px solid rgba(0, 71, 171, 0.1);
  font-weight: 600;
}

/* 결과 액션 버튼 */
.result-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.action-button svg {
  width: 20px;
  height: 20px;
}

.copy-button {
  background-color: rgba(0, 71, 171, 0.08);
  color: #0047AB;
}

.copy-button:hover {
  background-color: rgba(0, 71, 171, 0.12);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 71, 171, 0.1);
}

.download-button {
  background-color: rgba(135, 206, 235, 0.15);
  color: #0078a8;
}

.download-button:hover {
  background-color: rgba(135, 206, 235, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(135, 206, 235, 0.2);
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .meeting-header {
    padding: 30px 20px;
  }
  
  .meeting-header h2 {
    font-size: 1.5rem;
  }
  
  .meeting-main {
    padding: 20px 15px;
  }
  
  .tab-buttons {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .tab-buttons button {
    flex: 1;
    min-width: 140px;
    justify-content: center;
    font-size: 0.9rem;
    padding: 12px 15px;
  }
  
  .section-card {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .upload-button {
    padding: 15px;
    height: 80px;
  }
  
  .result-actions {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .tab-buttons {
    flex-direction: column;
  }
  
  .tab-buttons button {
    width: 100%;
  }
}
</style>