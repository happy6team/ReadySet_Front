<template>
  <div class="chatbot-container">
    <!-- 채팅 사이드바 (대화 기록) -->
    <div class="chat-sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <div class="sidebar-header">
        <h3>대화 기록</h3>
        <button class="sidebar-close-btn" @click="toggleSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </button>
      </div>

      <div class="chat-history-list">
        <div v-if="chatHistories.length === 0" class="empty-history">
          <p>아직 저장된 대화가 없습니다.</p>
        </div>
        <div
          v-for="(history, index) in chatHistories"
          :key="index"
          class="history-item"
          :class="{ active: currentHistoryIndex === index }"
          @click="loadChatHistory(index)"
        >
          <div class="history-item-header">
            <span class="history-title">{{ history.title }}</span>
            <span class="history-date">{{ formatDate(history.date) }}</span>
          </div>
          <p class="history-preview">{{ history.preview }}</p>
        </div>
      </div>

      <div class="sidebar-actions">
        <button class="new-chat-btn" @click="startNewChat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
            />
          </svg>
          새 대화 시작하기
        </button>
      </div>
    </div>

    <!-- 챗봇 메인 컨테이너 -->
    <div class="chatbot-main-container">
      <!-- 챗봇 헤더 -->
      <div class="chatbot-header">
        <div class="header-content">
          <div class="header-title-wrapper">
            <h2>AI 챗봇 어시스턴트</h2>
          </div>
          <p>
            프로젝트 관련 질문이나 도움이 필요한 내용을 물어보세요. AI가 즉시
            답변해 드립니다.
          </p>
          
          <!-- 사이드바 토글 버튼 -->
          <button class="sidebar-toggle history-btn" @click="toggleSidebar">
            <span class="history-icon">🗂️</span>
            <span class="history-text">이전 대화 기록</span>
          </button>
        </div>

        <div class="header-decoration">
          <div class="decoration-circle circle-1"></div>
          <div class="decoration-circle circle-2"></div>
          <div class="decoration-circle circle-3"></div>
        </div>
      </div>

      <!-- 메인 채팅 영역 -->
      <div class="chat-main">
        <div class="chat-messages" ref="chatMessages">
          <!-- 빈 채팅일 때 표시 -->
          <div v-if="messages.length === 0" class="empty-chat">
            <div class="empty-illustration">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="robot-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
            </div>
            <h3>AI 챗봇에게 질문해보세요</h3>
            <p>
              프로젝트 관련 질문, 코드 검증, 문서 검색 등 다양한 도움을 받을 수
              있습니다.
            </p>
            <div class="suggestion-chips">
              <button
                class="chip"
                @click="applyQuestion('프로젝트 구조를 설명해줘')"
              >
                <span class="chip-icon">📂</span>
                프로젝트 구조를 설명해줘
              </button>
              <button
                class="chip"
                @click="applyQuestion('API 연동은 어떻게 하나요?')"
              >
                <span class="chip-icon">🔌</span>
                API 연동은 어떻게 하나요?
              </button>
              <button
                class="chip"
                @click="applyQuestion('이 코드를 최적화해줄래?')"
              >
                <span class="chip-icon">⚙️</span>
                이 코드를 최적화해줄래?
              </button>
              <button
                class="chip"
                @click="applyQuestion('데이터 구조 설계 조언이 필요해')"
              >
                <span class="chip-icon">📊</span>
                데이터 구조 설계 조언이 필요해
              </button>
            </div>
          </div>

          <template v-else>
            <!-- 채팅 메시지 출력 -->
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="message"
              :class="{
                'user-message': message.isUser,
                'bot-message': !message.isUser,
              }"
            >
              <div class="message-avatar">
                <div
                  class="avatar-image"
                  :class="{
                    'user-avatar': message.isUser,
                    'bot-avatar': !message.isUser,
                  }"
                >
                  <img
                    v-if="message.isUser"
                    :src="userAvatarImage"
                    alt="사용자"
                    class="avatar-img"
                  />
                  <img
                    v-else
                    :src="botAvatarImage"
                    alt="AI 봇"
                    class="avatar-img"
                  />
                </div>
              </div>

              <div class="message-content">
                <div class="message-header">
                  <span class="message-sender">{{
                    message.isUser ? userName : "AI 어시스턴트"
                  }}</span>
                  <span class="message-time">{{
                    formatTime(message.time)
                  }}</span>
                </div>

                <div
                  class="message-text"
                  v-html="formatMessage(message.text)"
                ></div>

                <!-- 출처 정보 -->
                <div
                  v-if="
                    !message.isUser &&
                    message.sources &&
                    message.sources.length > 0
                  "
                  class="message-sources"
                >
                  <span class="sources-label">출처:</span>
                  <div class="source-list">
                    <button
                      v-for="(source, sourceIndex) in [...message.sources].sort(
                        (a, b) => a.rank - b.rank
                      )"
                      :key="sourceIndex"
                      class="source-item"
                      @click="download(source.source)"
                    >
                      {{ source.rank }}위 📄 {{ source.filename }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 로딩 중인 AI 메시지 -->
            <div v-if="isLoading" class="message bot-message loading-message">
              <div class="message-avatar">
                <div class="avatar-image bot-avatar">
                  <img :src="botAvatarImage" alt="AI 봇" class="avatar-img" />
                </div>
              </div>
              <div class="message-content">
                <div class="message-header">
                  <span class="message-sender">AI 어시스턴트</span>
                  <span class="message-time">{{ formatTime(new Date()) }}</span>
                </div>
                <div class="message-text">
                  <span class="dot-typing"></span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 입력 영역 -->
        <div class="chat-input-container">
          <div class="input-wrapper">
            <textarea
              v-model="userInput"
              class="chat-input"
              placeholder="메시지를 입력하세요..."
              @keyup.enter.prevent="sendMessage"
              ref="chatInput"
              rows="1"
            ></textarea>
          </div>
          <button
            class="send-btn"
            :class="{ active: userInput.trim().length > 0 }"
            @click="sendMessage"
            :disabled="userInput.trim().length === 0"
          >
            <img src="/send.png" alt="전송" class="send-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from "vue";
import { sendChatMessage, getChatHistories } from "@/api/api";
import { downloadReport } from "@/api/reports";

// 아바타 이미지 경로 설정
const userAvatarImage = ref("/daeun_profile.png"); // 사용자 프로필 이미지 경로
const botAvatarImage = ref("/support.png"); // AI 봇 이미지 경로

// 반응형 상태 정의
const userInput = ref("");
const messages = ref([]);
const userName = ref("김신입");
const userInitial = ref(userName.value[0] || "김");
const sidebarOpen = ref(false);
const currentHistoryIndex = ref(-1);
const chatHistories = ref([]);
const isLoading = ref(false);

// 템플릿 참조
const chatInput = ref(null);
const chatMessages = ref(null);

// 사이드바 토글
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;

  if (sidebarOpen.value) {
    fetchChatHistoriesFromServer();
  }
};

// 메시지 전송
const sendMessage = async () => {
  if (userInput.value.trim() === "") return;

  // 사용자 메시지 추가
  messages.value.push({
    isUser: true,
    text: userInput.value,
    time: new Date(),
  });

  const userQuestion = userInput.value;
  userInput.value = "";

  // 입력창 높이 초기화
  await nextTick(() => {
    adjustTextareaHeight();
  });

  // 스크롤 최하단으로 이동
  await nextTick(() => {
    scrollToBottom();
  });

  // API 호출 시작 - 로딩 상태 설정
  isLoading.value = true;

  try {
    // API 서비스를 사용하여 메시지 전송
    const data = await sendChatMessage(userQuestion);
    if (data.messages?.length > 0) {
      const aiMessage = data.messages[0];

      // AI 메시지 추가
      messages.value.push({
        isUser: false,
        text: aiMessage.content,
        time: new Date(),
        sources: aiMessage.sources || [],
      });
    } else {
      throw new Error("응답 형식이 올바르지 않습니다.");
    }
  } catch (error) {
    console.error("API 호출 오류:", error);

    // 오류 메시지 표시
    messages.value.push({
      isUser: false,
      text: "죄송합니다만, 서버와 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      time: new Date(),
      sources: [],
    });
  } finally {
    isLoading.value = false;

    // 현재 대화가 새로운 대화라면 히스토리에 저장
    if (currentHistoryIndex.value === -1 && messages.value.length > 1) {
      saveChatHistory();
    } else if (currentHistoryIndex.value !== -1) {
      // 기존 대화라면 히스토리 업데이트
      updateChatHistory();
    }

    // 스크롤 최하단으로 이동
    await nextTick(() => {
      scrollToBottom();
    });
  }
};

// 스크롤 최하단으로 이동
const scrollToBottom = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
  }
};

// 텍스트 영역 높이 조절
const adjustTextareaHeight = () => {
  if (chatInput.value) {
    chatInput.value.style.height = "0px";
    chatInput.value.style.height = chatInput.value.scrollHeight + "px";
  }
};

// 시간 형식 지정
const formatTime = (date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// 날짜 형식 지정
const formatDate = (date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

// 메시지 형식 지정 (마크다운/코드 처리)
const formatMessage = (text) => {
  if (!text) return "";
  return text
    .replace(/\n/g, "<br/>") // 줄바꿈 처리
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"); // **볼드체** 처리
};

// 질문 적용
const applyQuestion = (question) => {
  userInput.value = question;
  nextTick(() => {
    if (chatInput.value) {
      chatInput.value.focus();
      adjustTextareaHeight();
    }
  });
};

// 대화 기록 불러오기
const loadChatHistory = (index) => {
  // 현재 대화가 저장되지 않았다면 먼저 저장
  if (messages.value.length > 0 && currentHistoryIndex.value === -1) {
    if (confirm("현재 대화를 저장하시겠습니까?")) {
      saveChatHistory();
    }
  }

  currentHistoryIndex.value = index;
  messages.value = [...chatHistories.value[index].messages];
  toggleSidebar();

  // 스크롤 최하단으로 이동
  nextTick(() => {
    scrollToBottom();
  });
};

// 새 대화 시작
const startNewChat = () => {
  // 현재 대화가 저장되지 않았고 메시지가 있다면 저장 여부 확인
  if (messages.value.length > 0 && currentHistoryIndex.value === -1) {
    if (confirm("현재 대화를 저장하시겠습니까?")) {
      saveChatHistory();
    }
  }

  messages.value = [];
  currentHistoryIndex.value = -1;
  toggleSidebar();
};

// 대화 기록 저장
const saveChatHistory = () => {
  if (messages.value.length < 2) return; // 최소한 질문과 답변이 있어야 함

  // 대화 기록 제목 생성 (첫 질문을 기반으로)
  const firstQuestion = messages.value.find((m) => m.isUser)?.text || "";
  const title =
    firstQuestion.length > 20
      ? firstQuestion.substring(0, 20) + "..."
      : firstQuestion;

  // 미리보기 생성
  const preview =
    firstQuestion.length > 40
      ? firstQuestion.substring(0, 40) + "..."
      : firstQuestion;

  // 새로운 대화 기록 객체 생성
  const newHistory = {
    id: Date.now(), // 고유 ID
    title: title,
    date: new Date(),
    preview: preview,
    messages: [...messages.value],
  };

  // 히스토리 배열에 추가
  chatHistories.value.unshift(newHistory);
  currentHistoryIndex.value = 0;

  // 실제 앱에서는 localStorage나 서버에 저장하는 코드 추가
  // localStorage.setItem('chatHistories', JSON.stringify(chatHistories.value));
};

// 대화 기록 업데이트
const updateChatHistory = () => {
  if (currentHistoryIndex.value === -1) return;

  // 현재 히스토리 업데이트
  chatHistories.value[currentHistoryIndex.value].messages = [...messages.value];
  chatHistories.value[currentHistoryIndex.value].date = new Date();

  // 실제 앱에서는 localStorage나 서버에 저장하는 코드 추가
  // localStorage.setItem('chatHistories', JSON.stringify(chatHistories.value));
};

// 대화 기록 삭제
const deleteHistory = (index) => {
  if (confirm("이 대화 기록을 삭제하시겠습니까?")) {
    chatHistories.value.splice(index, 1);
    if (currentHistoryIndex.value === index) {
      currentHistoryIndex.value = -1;
      messages.value = [];
    } else if (currentHistoryIndex.value > index) {
      currentHistoryIndex.value--;
    }

    // 실제 앱에서는 localStorage나 서버에 저장하는 코드 추가
    // localStorage.setItem('chatHistories', JSON.stringify(chatHistories.value));
  }
};

// 서버에서 대화 기록 가져오기
const fetchChatHistoriesFromServer = async () => {
  try {
    const data = await getChatHistories();
    const serverHistories = data.histories;

    chatHistories.value = serverHistories.map((history, idx) => {
      const question = history.query;
      const answer =
        history.messages.find((msg) => msg.type === "AIMessage")?.content || "";

      return {
        id: Date.now() + idx,
        title: question.length > 20 ? question.slice(0, 20) + "..." : question,
        date: new Date(), // 서버 날짜가 없으므로 현재 시간
        preview: answer.length > 40 ? answer.slice(0, 40) + "..." : answer,
        messages: history.messages.map((msg) => ({
          isUser: msg.type === "HumanMessage",
          text: msg.content,
          time: new Date(),
        })),
      };
    });
  } catch (err) {
    console.error("✅ 대화 기록 불러오기 실패:", err);
  }
};

// 출처 다운로드
const download = async (source) => {
  try {
    await downloadReport(source);
  } catch (err) {
    console.error("❌ 파일 다운로드 실패:", err);
    alert("파일 다운로드 중 오류가 발생했습니다.");
  }
};

// userInput이 변경될 때마다 높이 조절
watch(userInput, () => {
  nextTick(adjustTextareaHeight);
});

// isLoading이 true로 바뀔 때마다 스크롤을 맨 아래로 이동
watch(isLoading, (val) => {
  if (val) {
    nextTick(() => {
      scrollToBottom();
    });
  }
});

// 컴포넌트 마운트 시 실행
onMounted(() => {
  // 자동으로 입력창에 포커스
  if (chatInput.value) {
    chatInput.value.focus();
    adjustTextareaHeight();
  }
});
</script>

<style scoped>
/* 기본 컨테이너 */
.chatbot-container {
  display: flex;
  height: calc(100vh - 50px);
  position: relative;
  background: linear-gradient(135deg, #0047ab, #87ceeb);
  overflow: hidden;
}

/* 사이드바 스타일 */
.chat-sidebar {
  position: fixed;
  top: 0;
  right: -320px; /* 오른쪽 바깥으로 숨김 */
  width: 320px;
  height: 100%;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-sidebar.sidebar-open {
  right: 0; /* 열린 상태에서 오른쪽에 고정 */
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #f8faff, #eef2ff);
}

.sidebar-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--pastel-blue-500);
  margin: 0;
}

.sidebar-close-btn {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.sidebar-close-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.sidebar-close-btn svg {
  width: 20px;
  height: 20px;
}

.chat-history-list {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}

.empty-history {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 0.9rem;
}

.history-item {
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f8faff;
  border: 1px solid #f0f0f0;
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: var(--pastel-blue-300);
}

.history-item.active {
  background: linear-gradient(to right, #f0f7ff, #eef2ff);
  border-color: var(--pastel-blue-300);
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.1);
}

.history-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
}

.history-title {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.history-date {
  font-size: 0.7rem;
  color: #888;
  white-space: nowrap;
}

.history-preview {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.sidebar-actions {
  padding: 15px;
  border-top: 1px solid #f0f0f0;
}

.new-chat-btn {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--pastel-blue-400), #9f7aea);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.new-chat-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
}

.new-chat-btn svg {
  width: 18px;
  height: 18px;
}

/* 챗봇 메인 컨테이너 */
.chatbot-main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  transition: all 0.3s ease;
}

/* 헤더 스타일 */
.chatbot-header {
  padding: 50px;
  color: white;
  box-shadow: 0 10px 25px rgba(159, 122, 234, 0.15);
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
}

/* 헤더 내용 */
.header-content {
  position: relative;
  width: 100%;
}

.header-title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.chatbot-header h2 {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
}

.chatbot-header p {
  font-size: 1rem;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  margin-top: 0;
}

/* 대화 기록 버튼 스타일 */
.sidebar-toggle.history-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-toggle.history-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.history-icon {
  font-size: 2.2rem;
}

.history-text {
  font-size: 1rem;
  font-weight: 500;
}

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

/* 메인 채팅 영역 */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  margin-top: -20px;
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 2;
}

.chat-messages {
  flex: 10;
  overflow-y: auto;
  padding: 30px;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 20px;
}

/* 빈 채팅 상태 */
.empty-chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  text-align: center;
  padding: 20px;
}

.empty-illustration {
  margin-bottom: 20px;
}

.robot-icon {
  width: 80px;
  height: 80px;
  color: rgba(96, 165, 250, 0.2);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.empty-chat h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
  background: linear-gradient(135deg, var(--pastel-blue-500), #9f7aea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.empty-chat p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 25px;
  max-width: 500px;
  line-height: 1.6;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  max-width: 600px;
}

.chip {
  background: linear-gradient(to right, #f0f7ff, #eef2ff);
  color: var(--pastel-blue-500);
  border: none;
  border-radius: 16px;
  padding: 12px 18px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(96, 165, 250, 0.1);
  position: relative;
  overflow: hidden;
  width: 280px;
  justify-content: center;
}

.chip::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4));
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.chip:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
}

.chip:hover::before {
  transform: translateX(100%);
}

.chip-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

/* 메시지 스타일 */
.message {
  display: flex;
  margin-bottom: 24px;
  animation: fadeInUp 0.4s ease;
  position: relative;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-avatar {
  margin-right: 15px;
}

.avatar-image {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar {
  background: linear-gradient(135deg, var(--pastel-blue-400), #9f7aea);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.bot-avatar {
  background: linear-gradient(135deg, #f8faff, #eef2ff);
  color: var(--pastel-blue-500);
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.message-content {
  flex: 1;
  max-width: calc(100% - 110px);
  position: relative;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.message-sender {
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
}

.message-time {
  font-size: 0.8rem;
  color: #888;
}

.message-text {
  line-height: 1.6;
  font-size: 0.98rem;
  color: #444;
  word-wrap: break-word;
}

.message-text code {
  font-family: "Fira Code", "Menlo", "Monaco", monospace;
  background-color: #f5f7fb;
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--pastel-blue-500);
  font-size: 0.9em;
}

.message-text pre {
  background-color: #f5f7fb;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  position: relative;
}

.message-text pre::before {
  content: "Code";
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(96, 165, 250, 0.1);
  color: var(--pastel-blue-500);
  padding: 2px 8px;
  font-size: 0.7rem;
  border-bottom-left-radius: 6px;
  font-weight: 600;
}

.message-text pre code {
  background-color: transparent;
  padding: 0;
  color: #444;
  display: block;
  font-size: 0.85rem;
}

.message-sources {
  margin-top: 12px;
  font-size: 0.85rem;
}

.sources-label {
  color: #666;
  margin-right: 5px;
  font-weight: 500;
}

.source-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.source-item {
  display: inline-block;
  color: var(--pastel-blue-500);
  background-color: #f0f7ff;
  padding: 6px 12px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(96, 165, 250, 0.15);
}

.source-item:hover {
  background-color: #e1effe;
  box-shadow: 0 2px 6px rgba(96, 165, 250, 0.15);
  transform: translateY(-2px);
}

/* 사용자/봇 메시지 스타일 */
.user-message {
  flex-direction: row-reverse;
}

.user-message .message-avatar {
  margin-left: 12px;
  margin-right: 0;
}

.user-message .message-content {
  background: linear-gradient(to right, #f0f7ff, #eef2ff);
  padding: 16px 20px;
  border-radius: 18px;
  box-shadow: 0 3px 10px rgba(96, 165, 250, 0.08);
  border: 1px solid rgba(96, 165, 250, 0.15);
}

.user-message .message-content::after {
  content: "";
  position: absolute;
  top: 16px;
  right: -6px;
  width: 12px;
  height: 12px;
  background: linear-gradient(to right, #f0f7ff, #eef2ff);
  border: 1px solid rgba(96, 165, 250, 0.15);
  transform: rotate(45deg);
  border-left: none;
  border-bottom: none;
}

.bot-message .message-content {
  background: white;
  padding: 16px 20px;
  border-radius: 18px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.bot-message .message-content::after {
  content: "";
  position: absolute;
  top: 20px;
  left: -8px;
  width: 16px;
  height: 16px;
  background: white;
  border-left: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  transform: rotate(45deg);
  border-bottom-left-radius: 4px;
}

/* 입력 영역 */
.chat-input-container {
  padding: 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: #f8faff;
}

.input-wrapper {
  flex: 1;
  background-color: white;
  border-radius: 16px;
  position: relative;
  display: flex;
  align-items: flex-end;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.input-wrapper:focus-within {
  border-color: var(--pastel-blue-300);
  box-shadow: 0 3px 15px rgba(96, 165, 250, 0.15);
  transform: translateY(-2px);
}

.chat-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 16px;
  resize: none;
  max-height: 150px;
  font-size: 1rem;
  color: #444;
  font-family: inherit;
  outline: none;
  border-radius: 16px;
}

.send-btn {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: #e5e7eb;
  color: #888;
  border: 2px solid #0047ab2c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.send-btn.active {
  background: linear-gradient(135deg, var(--pastel-blue-400), #9f7aea);
  color: white;
}

.send-btn.active:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 5px 15px rgba(96, 165, 250, 0.3);
}

.send-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.send-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

/* 로딩 창 */
.dot-typing::after {
  content: "●";
  animation: dots 1s steps(4, end) infinite;
  font-size: 0.8rem;
  color: var(--pastel-blue-500);
}

@keyframes dots {
  0% { content: "●"; }
  33% { content: "●●"; }
  66% { content: "●●●"; }
  100% { content: "●"; }
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  .chat-sidebar {
    width: 280px;
  }

  .chatbot-header {
    padding: 20px;
  }

  .chatbot-header h2 {
    font-size: 1.4rem;
  }

  .chatbot-header p {
    font-size: 0.9rem;
  }

  .chat-messages {
    padding: 20px;
  }

  .chat-input-container {
    padding: 15px;
  }

  .avatar-image {
    width: 36px;
    height: 36px;
  }
  
  .sidebar-toggle.history-btn {
    padding: 6px 12px;
  }
  
  .history-text {
    display: none; /* 모바일에서는 아이콘만 표시 */
  }
}
</style>