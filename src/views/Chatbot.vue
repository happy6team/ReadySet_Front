<template>
    <div class="chatbot-container">
      <!-- 채팅 사이드바 (대화 기록) -->
      <div class="chat-sidebar" :class="{ 'sidebar-open': sidebarOpen }">
        <div class="sidebar-header">
          <h3>대화 기록</h3>
          <button class="sidebar-close-btn" @click="toggleSidebar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
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
            :class="{ 'active': currentHistoryIndex === index }"
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            새 대화 시작하기
          </button>
        </div>
      </div>
      
      <!-- 챗봇 메인 컨테이너 -->
      <div class="chatbot-main-container">
        <!-- 챗봇 헤더 -->
        <div class="chatbot-header">
          <div class="header-left">
            <button class="sidebar-toggle" @click="toggleSidebar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div class="header-content">
            <div class="header-title-wrapper">
              <h2>AI 챗봇 어시스턴트</h2>
            </div>
            <p>프로젝트 관련 질문이나 도움이 필요한 내용을 물어보세요. AI가 즉시 답변해 드립니다.</p>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="robot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <line x1="8" y1="16" x2="8" y2="16" />
                  <line x1="16" y1="16" x2="16" y2="16" />
                </svg>
              </div>
              <h3>AI 챗봇에게 질문해보세요</h3>
              <p>프로젝트 관련 질문, 코드 검증, 문서 검색 등 다양한 도움을 받을 수 있습니다.</p>
              <div class="suggestion-chips">
                <button class="chip" @click="applyQuestion('프로젝트 구조를 설명해줘')">
                  <span class="chip-icon">📂</span>
                  프로젝트 구조를 설명해줘
                </button>
                <button class="chip" @click="applyQuestion('API 연동은 어떻게 하나요?')">
                  <span class="chip-icon">🔌</span>
                  API 연동은 어떻게 하나요?
                </button>
                <button class="chip" @click="applyQuestion('이 코드를 최적화해줄래?')">
                  <span class="chip-icon">⚙️</span>
                  이 코드를 최적화해줄래?
                </button>
                <button class="chip" @click="applyQuestion('데이터 구조 설계 조언이 필요해')">
                  <span class="chip-icon">📊</span>
                  데이터 구조 설계 조언이 필요해
                </button>
              </div>
            </div>
            
            <!-- 메시지 표시 영역 -->
            <template v-else>
              <div 
                v-for="(message, index) in messages" 
                :key="index" 
                class="message"
                :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }"
              >
                <div class="message-avatar">
                  <div class="avatar-image" :class="{ 'user-avatar': message.isUser, 'bot-avatar': !message.isUser }">
                    <span v-if="message.isUser">{{ userInitial }}</span>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path d="M16.5 7.5h-9v9h9v-9z" />
                      <path fill-rule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-sender">{{ message.isUser ? userName : 'AI 어시스턴트' }}</span>
                    <span class="message-time">{{ formatTime(message.time) }}</span>
                  </div>
                  <div class="message-text" v-html="formatMessage(message.text)"></div>
                  <div v-if="!message.isUser && message.sources && message.sources.length > 0" class="message-sources">
                    <span class="sources-label">출처:</span>
                    <div class="source-list">
                      <a 
                        v-for="(source, sourceIndex) in message.sources" 
                        :key="sourceIndex" 
                        :href="source.url" 
                        target="_blank" 
                        class="source-item"
                      >
                        {{ source.title }}
                      </a>
                    </div>
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
                @keydown.enter.prevent="sendMessage"
                ref="chatInput"
                rows="1"
              ></textarea>
            </div>
            <button 
              class="send-btn" 
              :class="{ 'active': userInput.trim().length > 0 }" 
              @click="sendMessage"
              :disabled="userInput.trim().length === 0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    name: 'ChatbotView',
    data() {
      return {
        userInput: '',
        messages: [],
        userName: '김신입',
        userInitial: '김',
        sidebarOpen: false,
        currentHistoryIndex: -1,
        chatHistories: [
          // 샘플 대화 기록 (실제로는 localStorage나 서버에서 가져올 것)
          {
            id: 1,
            title: '프로젝트 구조 문의',
            date: new Date(2025, 4, 7),
            preview: '프로젝트의 구조와 파일 시스템에 대한 문의',
            messages: [
              {
                isUser: true,
                text: '프로젝트 구조를 설명해줘',
                time: new Date(2025, 4, 7, 14, 30)
              },
              {
                isUser: false,
                text: "본 프로젝트는 Vue.js 기반의 프론트엔드와 Node.js 백엔드로 구성되어 있습니다.<br><br>주요 구조는 다음과 같습니다:<br>- <code>components/</code>: 재사용 가능한 UI 컴포넌트<br>- <code>views/</code>: 페이지 컴포넌트<br>- <code>services/</code>: API 연동 및 비즈니스 로직<br>- <code>store/</code>: Vuex 상태 관리<br><br>CI/CD 파이프라인은 GitHub Actions를 통해 자동화되어 있으며, 테스트 후 AWS에 자동 배포됩니다.",
                time: new Date(2025, 4, 7, 14, 31),
                sources: [
                  { title: '프로젝트 구조 문서', url: '#' },
                  { title: '개발 가이드라인', url: '#' }
                ]
              }
            ]
          },
          {
            id: 2,
            title: 'API 연동 질문',
            date: new Date(2025, 5, 1),
            preview: 'API 연동 방법과 인증 처리에 대한 질문',
            messages: [
              {
                isUser: true,
                text: 'API 연동은 어떻게 하나요?',
                time: new Date(2025, 5, 1, 10, 15)
              },
              {
                isUser: false,
                text: "API 연동은 <code>axios</code> 라이브러리를 사용합니다. <code>/services/api.js</code> 파일에 기본 설정이 있으며, 인증 토큰은 자동으로 처리됩니다.<br><br>예시 코드:<br><pre><code>import api from '@/services/api';\n\nasync function fetchData() {\n  try {\n    const response = await api.get('/endpoint');\n    return response.data;\n  } catch (error) {\n    console.error('API 오류:', error);\n  }\n}</code></pre>",
                time: new Date(2025, 5, 1, 10, 16),
                sources: [
                  { title: 'API 문서', url: '#' },
                  { title: 'Axios 가이드', url: '#' }
                ]
              }
            ]
          },
          {
            id: 3,
            title: '코드 최적화 도움',
            date: new Date(2025, 5, 5),
            preview: '코드 최적화 방법에 대한 문의',
            messages: [
              {
                isUser: true,
                text: '이 코드를 최적화해줄래?',
                time: new Date(2025, 5, 5, 16, 20)
              },
              {
                isUser: false,
                text: "코드 최적화를 위한 몇 가지 제안을 드리겠습니다:<br><br>1. <strong>불필요한 렌더링 줄이기</strong>: Vue의 computed 속성이나 메모이제이션을 활용하세요.<br>2. <strong>비동기 컴포넌트</strong>: 큰 컴포넌트는 비동기적으로 로드하세요.<br>3. <strong>가상 스크롤링</strong>: 대량의 데이터를 표시할 때 사용하세요.<br><br>예시:<br><pre><code>// 최적화 전\ncomponents: {\n  HeavyComponent\n}\n\n// 최적화 후\ncomponents: {\n  HeavyComponent: () => import('./HeavyComponent.vue')\n}</code></pre>",
                time: new Date(2025, 5, 5, 16, 21),
                sources: [
                  { title: 'Vue 최적화 가이드', url: '#' },
                  { title: '성능 모니터링 도구', url: '#' }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
      },
      
      sendMessage() {
        if (this.userInput.trim() === '') return;
        
        // 사용자 메시지 추가
        this.messages.push({
          isUser: true,
          text: this.userInput,
          time: new Date()
        });
        
        const userQuestion = this.userInput;
        this.userInput = '';
        
        // 입력창 높이 초기화
        this.$nextTick(() => {
          this.$refs.chatInput.style.height = 'auto';
        });
        
        // AI 응답 시뮬레이션 (실제로는 API 호출)
        setTimeout(() => {
          let response = "죄송합니다만, 현재 해당 질문에 대한 답변을 준비 중입니다. 잠시 후 다시 시도해주세요.";
          let sources = [];
          
          // 샘플 응답 (실제로는 서버에서 받아옴)
          if (userQuestion.includes('프로젝트 구조')) {
            response = "본 프로젝트는 Vue.js 기반의 프론트엔드와 Node.js 백엔드로 구성되어 있습니다.<br><br>주요 구조는 다음과 같습니다:<br>- <code>components/</code>: 재사용 가능한 UI 컴포넌트<br>- <code>views/</code>: 페이지 컴포넌트<br>- <code>services/</code>: API 연동 및 비즈니스 로직<br>- <code>store/</code>: Vuex 상태 관리<br><br>CI/CD 파이프라인은 GitHub Actions를 통해 자동화되어 있으며, 테스트 후 AWS에 자동 배포됩니다.";
            sources = [
              { title: '프로젝트 구조 문서', url: '#' },
              { title: '개발 가이드라인', url: '#' }
            ];
          } else if (userQuestion.includes('API')) {
            response = "API 연동은 <code>axios</code> 라이브러리를 사용합니다. <code>/services/api.js</code> 파일에 기본 설정이 있으며, 인증 토큰은 자동으로 처리됩니다.<br><br>예시 코드:<br><pre><code>import api from '@/services/api';\n\nasync function fetchData() {\n  try {\n    const response = await api.get('/endpoint');\n    return response.data;\n  } catch (error) {\n    console.error('API 오류:', error);\n  }\n}</code></pre>";
            sources = [
              { title: 'API 문서', url: '#' },
              { title: 'Axios 가이드', url: '#' }
            ];
          } else if (userQuestion.includes('코드') && userQuestion.includes('최적화')) {
            response = "코드 최적화를 위한 몇 가지 제안을 드리겠습니다:<br><br>1. <strong>불필요한 렌더링 줄이기</strong>: Vue의 computed 속성이나 메모이제이션을 활용하세요.<br>2. <strong>비동기 컴포넌트</strong>: 큰 컴포넌트는 비동기적으로 로드하세요.<br>3. <strong>가상 스크롤링</strong>: 대량의 데이터를 표시할 때 사용하세요.<br><br>예시:<br><pre><code>// 최적화 전\ncomponents: {\n  HeavyComponent\n}\n\n// 최적화 후\ncomponents: {\n  HeavyComponent: () => import('./HeavyComponent.vue')\n}</code></pre>";
            sources = [
              { title: 'Vue 최적화 가이드', url: '#' },
              { title: '성능 모니터링 도구', url: '#' }
            ];
          } else if (userQuestion.includes('데이터 구조') || userQuestion.includes('설계')) {
            response = "데이터 구조 설계 시 고려해야 할 사항들입니다:<br><br>1. <strong>정규화 vs 비정규화</strong>: 데이터 접근 패턴에 따라 적절히 선택하세요.<br>2. <strong>확장성</strong>: 미래의 기능 확장을 고려한 설계가 필요합니다.<br>3. <strong>일관성</strong>: 네이밍과 구조의 일관성을 유지하세요.<br><br>프로젝트에서는 다음과 같은 구조를 추천합니다:<br><pre><code>// 사용자 데이터 모델\n{\n  id: string,\n  profile: {\n    name: string,\n    role: string,\n    team: string\n  },\n  preferences: {\n    theme: string,\n    notifications: boolean\n  },\n  activity: {\n    lastLogin: timestamp,\n    completedTasks: number\n  }\n}</code></pre>";
            sources = [
              { title: '데이터 모델링 모범 사례', url: '#' },
              { title: 'NoSQL vs SQL 비교', url: '#' }
            ];
          }
          
          // AI 메시지 추가
          this.messages.push({
            isUser: false,
            text: response,
            time: new Date(),
            sources: sources
          });
          
          // 스크롤 최하단으로 이동
          this.$nextTick(() => {
            this.scrollToBottom();
          });
          
          // 현재 대화가 새로운 대화라면 히스토리에 저장
          if (this.currentHistoryIndex === -1) {
            this.saveChatHistory();
          } else {
            // 기존 대화라면 히스토리 업데이트
            this.updateChatHistory();
          }
        }, 1000);
        
        // 스크롤 최하단으로 이동
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      
      scrollToBottom() {
        const chatContainer = this.$refs.chatMessages;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      },
      
      formatTime(date) {
        return new Intl.DateTimeFormat('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }).format(date);
      },
      
      formatDate(date) {
        return new Intl.DateTimeFormat('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(date);
      },
      
      formatMessage(text) {
        // 실제로는 마크다운이나 코드 하이라이팅 라이브러리 사용 권장
        return text;
      },
      
      applyQuestion(question) {
        this.userInput = question;
        this.$nextTick(() => {
          this.$refs.chatInput.focus();
        });
      },
      
      // 대화 기록 관련 메소드
      loadChatHistory(index) {
        // 현재 대화가 저장되지 않았다면 먼저 저장
        if (this.messages.length > 0 && this.currentHistoryIndex === -1) {
          if (confirm('현재 대화를 저장하시겠습니까?')) {
            this.saveChatHistory();
          }
        }
        
        this.currentHistoryIndex = index;
        this.messages = [...this.chatHistories[index].messages];
        this.toggleSidebar();
        
        // 스크롤 최하단으로 이동
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      
      startNewChat() {
        // 현재 대화가 저장되지 않았고 메시지가 있다면 저장 여부 확인
        if (this.messages.length > 0 && this.currentHistoryIndex === -1) {
          if (confirm('현재 대화를 저장하시겠습니까?')) {
            this.saveChatHistory();
          }
        }
        
        this.messages = [];
        this.currentHistoryIndex = -1;
        this.toggleSidebar();
      },
      
      saveChatHistory() {
        if (this.messages.length < 2) return; // 최소한 질문과 답변이 있어야 함
        
        // 대화 기록 제목 생성 (첫 질문을 기반으로)
        const firstQuestion = this.messages.find(m => m.isUser)?.text || '';
        const title = firstQuestion.length > 20 
          ? firstQuestion.substring(0, 20) + '...' 
          : firstQuestion;
        
        // 미리보기 생성
        const preview = firstQuestion.length > 40 
          ? firstQuestion.substring(0, 40) + '...' 
          : firstQuestion;
        
        // 새로운 대화 기록 객체 생성
        const newHistory = {
          id: Date.now(), // 고유 ID
          title: title,
          date: new Date(),
          preview: preview,
          messages: [...this.messages]
        };
        
        // 히스토리 배열에 추가 (실제 구현에선 localStorage나 서버에 저장)
        this.chatHistories.unshift(newHistory);
        this.currentHistoryIndex = 0;
        
        // 실제 앱에서는 localStorage나 서버에 저장하는 코드가 추가되어야 함
        // localStorage.setItem('chatHistories', JSON.stringify(this.chatHistories));
      },
      
      updateChatHistory() {
        if (this.currentHistoryIndex === -1) return;
        
        // 현재 히스토리 업데이트
        this.chatHistories[this.currentHistoryIndex].messages = [...this.messages];
        this.chatHistories[this.currentHistoryIndex].date = new Date();
        
        // 실제 앱에서는 localStorage나 서버에 저장하는 코드가 추가되어야 함
        // localStorage.setItem('chatHistories', JSON.stringify(this.chatHistories));
      },
      
      // 대화 기록 삭제 (추가 기능)
      deleteHistory(index) {
        if (confirm('이 대화 기록을 삭제하시겠습니까?')) {
          this.chatHistories.splice(index, 1);
          if (this.currentHistoryIndex === index) {
            this.currentHistoryIndex = -1;
            this.messages = [];
          } else if (this.currentHistoryIndex > index) {
            this.currentHistoryIndex--;
          }
          
          // 실제 앱에서는 localStorage나 서버에 저장하는 코드가 추가되어야 함
          // localStorage.setItem('chatHistories', JSON.stringify(this.chatHistories));
        }
      }
    },
    mounted() {
      // 자동으로 입력창에 포커스
      this.$nextTick(() => {
        this.$refs.chatInput.focus();
      });
      
      // 실제 앱에서는 localStorage에서 대화 기록을 불러오는 코드가 필요함
      // const savedHistories = localStorage.getItem('chatHistories');
      // if (savedHistories) {
      //   this.chatHistories = JSON.parse(savedHistories);
      // }
    }
  }
  </script>
  
  <style scoped>
  .chatbot-container {
    display: flex;
    height: calc(100vh - 50px);
    position: relative;
    background: linear-gradient(135deg, #0047AB, #87CEEB);
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
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1); /* 왼쪽으로 그림자 */
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
    -webkit-line-clamp: 2;
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
  
  .header-left {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  
  .sidebar-toggle {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  
  .sidebar-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .sidebar-toggle svg {
    width: 24px;
    height: 24px;
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
  
  .header-title-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .header-icon {
    background-color: rgba(255, 255, 255, 0.2);
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  
  .header-icon svg {
    width: 24px;
    height: 24px;
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
  }
  
  .chip::before {
    content: '';
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
  
  .bot-avatar svg {
    width: 22px;
    height: 22px;
  }
  
  .message-content {
    flex: 1;
    max-width: calc(100% - 60px);
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
    font-family: 'Fira Code', 'Menlo', 'Monaco', monospace;
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
    content: 'Code';
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
  
  .message-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .message-content:hover .message-actions {
    opacity: 1;
  }
  
  .action-btn {
    background: none;
    border: none;
    color: #888;
    padding: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 32px;
    height: 32px;
  }
  
  .action-btn:hover {
    background-color: #f0f7ff;
    color: var(--pastel-blue-500);
    transform: scale(1.1);
  }
  
  .user-message .message-content {
    background: linear-gradient(to right, #f0f7ff, #eef2ff);
    padding: 16px 20px;
    border-radius: 0 18px 18px 18px;
    box-shadow: 0 3px 10px rgba(96, 165, 250, 0.08);
    border: 1px solid rgba(96, 165, 250, 0.15);
  }
  
  .bot-message .message-content {
    background: white;
    padding: 16px 20px;
    border-radius: 18px 0 18px 18px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    border: 1px solid #f0f0f0;
    border-left: 3px solid var(--pastel-blue-300);
  }
  
  .bot-message .message-content::after {
    content: '';
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
  
  /* 입력 영역 스타일 */
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
  
  .input-actions {
    display: flex;
    padding: 0 10px 12px 0;
    gap: 6px;
  }
  
  .input-action-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
  
  .input-action-btn:hover {
    color: var(--pastel-blue-500);
    background-color: #f0f7ff;
    transform: scale(1.1);
  }
  
  .send-btn {
    width: 50px;
    height: 50px;
    border-radius: 16px;
    background: #e5e7eb;
    color: #888;
    border: none;
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
    
    .message-content {
      max-width: calc(100% - 50px);
    }
  }
  
  /* 사용자 정의 변수: 파스텔 블루 테마 */
  :root {
    --pastel-blue-100: #e0f2fe;
    --pastel-blue-200: #bae6fd;
    --pastel-blue-300: #93c5fd;
    --pastel-blue-400: #60a5fa;
    --pastel-blue-500: #3b82f6;
  }
  
  /* 애니메이션 효과 */
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  </style>