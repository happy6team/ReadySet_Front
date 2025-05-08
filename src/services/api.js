import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

// API 클라이언트 인스턴스 생성 (기본 설정)
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

// 채팅 메시지 전송 (FormData 사용)
export const sendChatMessage = async (message) => {
  // 유효성 검사
  if (!message || typeof message !== 'string' || message.trim() === '') {
    throw new Error('유효한 메시지를 입력해주세요.');
  }

  // FormData 생성 및 데이터 추가
  const formData = new FormData();
  formData.append('input_query', message.trim());

  // API 요청 전송git config --global pull.rebase false
  const response = await apiClient.post('/chat', formData);
  return response.data;
};

// 대화 기록 가져오기
export const getChatHistories = async () => {
  const response = await apiClient.get('/chat/histories');
  return response.data;
};

// 기본 객체로 모든 API 함수 내보내기
const apiService = {
  sendChatMessage,
  getChatHistories
};

export default apiService;