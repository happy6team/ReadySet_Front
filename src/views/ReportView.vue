<template>
    <div class="report-page">
      <h2>📄 추천 문서 목록</h2>
      <ul>
        <li v-for="report in reports" :key="report.source">
          <button @click="download(report.source)">
            📥 {{ report.filename || '이름 없는 파일' }}
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { fetchReportList, downloadReport } from '@/api/reports';
  
  const reports = ref([]);
  
  onMounted(async () => {
    try {
      const res = await fetchReportList();
      reports.value = res.sources;
    } catch (err) {
      console.error('문서 목록 가져오기 실패:', err);
      alert('문서 목록을 불러오는 데 실패했습니다.');
    }
  });
  
  const download = async (source) => {
    try {
      await downloadReport(source);
    } catch (err) {
      console.error('파일 다운로드 실패:', err);
      alert('파일 다운로드 중 오류가 발생했습니다.');
    }
  };
  </script>
  
  <style scoped>
  .report-page {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    font-family: 'Pretendard', sans-serif;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li + li {
    margin-top: 10px;
  }
  
  button {
    padding: 10px 16px;
    border: none;
    background-color: #3b82f6;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    width: 100%; /* ← 너비 전체 사용 */
    text-align: left; /* ← 텍스트 왼쪽 정렬 */
    white-space: normal; /* ← 줄바꿈 허용 */
    word-break: break-all; /* ← 긴 단어도 줄바꿈 */
    overflow-wrap: break-word; /* ← 줄바꿈 보조 */
  }
  
  button:hover {
    background-color: #2563eb;
  }
  </style>
  