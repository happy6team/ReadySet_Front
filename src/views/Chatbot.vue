<template>
    <div class="chatbot-container">
      <div class="chatbot-header">
        <div class="header-content">
          <h2>AI 챗봇</h2>
          <p>질문하고 즉시 답변을 받아보세요. 프로젝트 관련 질문이나 도움이 필요한 내용을 물어보세요.</p>
        </div>
      </div>
      
      <div class="chatbot-content">
        <div class="chatbot-sidebar">
          <div class="history-header">
            <h3>대화 기록</h3>
            <button class="new-chat-btn" @click="startNewChat">
              <i class="fas fa-plus"></i>
              새 대화
            </button>
          </div>
          
          <div class="chat-history">
            <div 
              v-for="(chat, index) in chatHistory" 
              :key="index" 
              class="history-item"
              :class="{ 'active': currentChatIndex === index }"
              @click="loadChat(index)"
            >
              <div class="history-icon">
                <i class="fas fa-comment-dots"></i>
              </div>
              <div class="history-details">
                <h4>{{ chat.title }}</h4>
                <p>{{ formatDate(chat.date) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chat-main">
          <div class="chat-messages" ref="chatMessages">
            <div v-if="messages.length === 0" class="empty-chat">
              <div class="empty-illustration">
                <i class="fas fa-robot"></i>
              </div>
              <h3>AI 챗봇에게 질문해보세요</h3>
              <p>프로젝트 관련 질문, 코드 검증, 문서 검색 등 다양한 도움을 받을 수 있습니다.</p>
              <div class="suggestion-chips">
                <button class="chip" @click="applyQuestion('프로젝트 구조를 설명해줘')">
                  프로젝트 구조를 설명해줘
                </button>
                <button class="chip" @click="applyQuestion('API 연동은 어떻게 하나요?')">
                  API 연동은 어떻게 하나요?
                </button>
                <button class="chip" @click="applyQuestion('이 코드를 최적화해줄래?')">
                  이 코드를 최적화해줄래?
                </button>
              </div>
            </div>
            
            <template v-else>
              <div 
                v-for="(message, index) in messages" 
                :key="index" 
                class="message"
                :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }"
              >
                <div class="message-avatar">
                  <img :src="message.isUser ? '/daeun_profile.png' : '/ai_avatar.png'" :alt="message.isUser ? '사용자' : 'AI'">
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <span class="message-sender">{{ message.isUser ? '김신입' : 'AI 어시스턴트' }}</span>
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
                  <div v-if="!message.isUser" class="message-actions">
                    <button class="action-btn thumbs-up" title="유용한 답변">
                      <i class="fas fa-thumbs-up"></i>
                    </button>
                    <button class="action-btn thumbs-down" title="유용하지 않은 답변">
                      <i class="fas fa-thumbs-down"></i>
                    </button>
                    <button class="action-btn copy" title="복사하기">
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
          
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
              <div class="input-actions">
                <button class="attach-btn" title="파일 첨부">
                  <i class="fas fa-paperclip"></i>
                </button>
                <button class="code-btn" title="코드 삽입">
                  <i class="fas fa-code"></i>
                </button>
              </div>
            </div>
            <button 
              class="send-btn" 
              :class="{ 'active': userInput.trim().length > 0 }" 
              @click="sendMessage"
              :disabled="userInput.trim().length === 0"
            >
              <i class="fas fa-paper-plane"></i>
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
        chatHistory: [
          { title: '프로젝트 구조 질문', date: new Date(2025, 4, 7, 15, 30) },
          { title: 'API 연동 문제 해결', date: new Date(2025, 4, 6, 11, 45) },
          { title: '컴포넌트 재사용성 개선', date: new Date(2025, 4, 5, 9, 20) }
        ],
        currentChatIndex: null
      }
    },
    methods: {
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
          
          // 첫 메시지인 경우 대화 기록 추가
          if (this.currentChatIndex === null && this.messages.length === 2) {
            const title = userQuestion.length > 20 
              ? userQuestion.substring(0, 20) + '...' 
              : userQuestion;
            
            this.chatHistory.unshift({
              title: title,
              date: new Date()
            });
            this.currentChatIndex = 0;
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
      formatDate(date) {
        return new Intl.DateTimeFormat('ko-KR', {
          month: 'short',
          day: 'numeric'
        }).format(date);
      },
      formatTime(date) {
        return new Intl.DateTimeFormat('ko-KR', {
          hour: '2-digit',
          minute: '2-digit'
        }).format(date);
      },
      formatMessage(text) {
        // 실제로는 마크다운이나 코드 하이라이팅 라이브러리 사용 권장
        return text;
      },
      startNewChat() {
        this.messages = [];
        this.currentChatIndex = null;
      },
      loadChat(index) {
        // 실제로는 서버에서 대화 내용을 불러와야 함
        this.currentChatIndex = index;
        this.messages = [
          {
            isUser: true,
            text: '이 프로젝트의 구조를 설명해줄래?',
            time: new Date(2025, 4, 7, 15, 30)
          },
          {
            isUser: false,
            text: '본 프로젝트는 Vue.js 기반의 프론트엔드와 Node.js 백엔드로 구성되어 있습니다.<br><br>주요 구조는 다음과 같습니다:<br>- <code>components/</code>: 재사용 가능한 UI 컴포넌트<br>- <code>views/</code>: 페이지 컴포넌트<br>- <code>services/</code>: API 연동 및 비즈니스 로직<br>- <code>store/</code>: Vuex 상태 관리<br><br>CI/CD 파이프라인은 GitHub Actions를 통해 자동화되어 있으며, 테스트 후 AWS에 자동 배포됩니다.',
            time: new Date(2025, 4, 7, 15, 32),
            sources: [
              { title: '프로젝트 구조 문서', url: '#' },
              { title: '개발 가이드라인', url: '#' }
            ]
          }
        ];
      },
      applyQuestion(question) {
        this.userInput = question;
        this.$nextTick(() => {
          this.$refs.chatInput.focus();
        });
      }
    },
    mounted() {
      // 자동으로 입력창에 포커스
      this.$nextTick(() => {
        this.$refs.chatInput.focus();
      });
    }
  }
  </script>
  
  <style scoped>
  .chatbot-container {
    padding: 0;
    max-width: 1400px;
    margin: 0 auto;
    height: calc(100vh - 20px);
    display: flex;
    flex-direction: column;
    background-color: var(--background-light);
  }
  
  .chatbot-header {
    background: linear-gradient(135deg, #0047AB, #87CEEB);
    border-radius: 20px;
    padding: 30px;
    margin: 0 30px 30px;
    color: white;
    box-shadow: 0 8px 20px rgba(0, 71, 171, 0.15);
    position: relative;
    overflow: hidden;
  }
  
  .chatbot-header::before {
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -120px;
    right: -50px;
  }
  
  .header-content {
    position: relative;
    z-index: 2;
  }
  
  .chatbot-header h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .chatbot-header p {
    font-size: 1rem;
    opacity: 0.95;
    max-width: 600px;
    line-height: 1.6;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .chatbot-content {
    display: flex;
    flex: 1;
    gap: 30px;
    padding: 0 30px 30px;
    height: calc(100% - 140px);
    overflow: hidden;
  }
  
  .chatbot-sidebar {
    width: 300px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(165, 200, 225, 0.2);
    overflow: hidden;
  }
  
  .history-header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(165, 200, 225, 0.2);
  }
  
  .history-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333333;
  }
  
  .new-chat-btn {
    background-color: #0047AB;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .new-chat-btn:hover {
    background-color: #003d91;
    transform: translateY(-2px);
  }
  
  .new-chat-btn i {
    margin-right: 8px;
    font-size: 0.9rem;
  }
  
  .chat-history {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
  }
  
  .history-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .history-item:hover {
    background-color: rgba(165, 200, 225, 0.1);
  }
  
  .history-item.active {
    background-color: rgba(0, 71, 171, 0.08);
    border-left: 3px solid #0047AB;
  }
  
  .history-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: rgba(0, 71, 171, 0.1);
    color: #0047AB;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
  }
  
  .history-icon i {
    font-size: 1rem;
  }
  
  .history-details {
    flex: 1;
  }
  
  .history-details h4 {
    font-size: 0.9rem;
    font-weight: 500;
    color: #333333;
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .history-details p {
    font-size: 0.75rem;
    color: #666666;
  }
  
  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(165, 200, 225, 0.2);
    overflow: hidden;
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }
  
  .empty-chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666666;
    text-align: center;
    padding: 0 20px;
  }
  
  .empty-illustration {
    font-size: 4rem;
    color: rgba(0, 71, 171, 0.2);
    margin-bottom: 20px;
  }
  
  .empty-chat h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333333;
  }
  
  .empty-chat p {
    font-size: 1rem;
    color: #666666;
    margin-bottom: 25px;
    max-width: 500px;
    line-height: 1.6;
  }
  
  .suggestion-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
  .chip {
    background-color: rgba(0, 71, 171, 0.08);
    color: #0047AB;
    border: 1px solid rgba(0, 71, 171, 0.2);
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  
  .chip:hover {
    background-color: rgba(0, 71, 171, 0.15);
    transform: translateY(-2px);
  }
  
  .message {
    display: flex;
    margin-bottom: 25px;
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
  }
  
  .message-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .message-content {
    flex: 1;
    max-width: calc(100% - 55px);
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .message-sender {
    font-weight: 600;
    font-size: 0.95rem;
    color: #333333;
  }
  
  .message-time {
    font-size: 0.8rem;
    color: #999999;
  }
  
  .message-text {
    line-height: 1.6;
    font-size: 0.95rem;
    color: #444444;
    word-wrap: break-word;
  }
  
  .message-text code {
    font-family: 'Courier New', monospace;
    background-color: #f7f7f7;
    padding: 2px 5px;
    border-radius: 4px;
    color: #0047AB;
    font-size: 0.9em;
  }
  
  .message-text pre {
    background-color: #f7f7f7;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
    overflow-x: auto;
  }
  
  .message-text pre code {
    background-color: transparent;
    padding: 0;
    color: #333333;
    display: block;
  }
  
  .message-sources {
    margin-top: 10px;
    font-size: 0.85rem;
  }
  
  .sources-label {
    color: #666666;
    margin-right: 5px;
  }
  
  .source-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 5px;
  }
  
  .source-item {
    display: inline-block;
    color: #0047AB;
    background-color: rgba(0, 71, 171, 0.08);
    padding: 4px 10px;
    border-radius: 12px;
    text-decoration: none;
    font-size: 0.8rem;
    transition: all 0.2s ease;
  }
  
  .source-item:hover {
    background-color: rgba(0, 71, 171, 0.15);
    text-decoration: underline;
  }
  
  .message-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .message-content:hover .message-actions {
    opacity: 1;
  }
  
  .action-btn {
    background: none;
    border: none;
    color: #999999;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  
  .action-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .thumbs-up:hover, .thumbs-down:hover {
    color: #0047AB;
  }
  
  .copy:hover {
    color: #0047AB;
  }
  
  .user-message .message-content {
    background-color: rgba(0, 71, 171, 0.08);
    padding: 15px;
    border-radius: 18px 18px 2px 18px;
  }
  
  .bot-message .message-content {
    background-color: #f7f7f7;
    padding: 15px;
    border-radius: 18px 18px 18px 2px;
  }
  
  .chat-input-container {
    padding: 20px;
    border-top: 1px solid rgba(165, 200, 225, 0.2);
    display: flex;
    align-items: flex-end;
    gap: 15px;
  }
  
  .input-wrapper {
    flex: 1;
    background-color: #f7f7f7;
    border-radius: 20px;
    position: relative;
    display: flex;
    align-items: flex-end;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .input-wrapper:focus-within {
    background-color: #ffffff;
    border-color: #0047AB;
    box-shadow: 0 0 0 3px rgba(0, 71, 171, 0.1);
  }
  
  .chat-input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 15px;
    resize: none;
    max-height: 150px;
    font-size: 0.95rem;
    color: #444444;
    font-family: inherit;
    outline: none;
  }
  
  .input-actions {
    display: flex;
    padding: 0 10px 10px 0;
  }
  
  .attach-btn, .code-btn {
    background: none;
    border: none;
    color: #999999;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .attach-btn:hover, .code-btn:hover {
    color: #0047AB;
    background-color: rgba(0, 71, 171, 0.1);
  }
  
  .send-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #e0e0e0;
    color: #999999;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .send-btn.active {
    background-color: #0047AB;
    color: white;
  }
  
  .send-btn.active:hover {
    background-color: #003d91;
    transform: translateY(-2px);
  }
  
  .send-btn:disabled {
    cursor: not-allowed;
  }
  
  @media (max-width: 1024px) {
    .chatbot-content {
      flex-direction: column;
      height: calc(100% - 120px);
    }
    
    .chatbot-sidebar {
      width: 100%;
      height: 300px;
    }
    
    .chat-main {
      flex: 1;
    }
  }
  
  @media (max-width: 768px) {
    .chatbot-container {
      height: calc(100vh - 20px);
    }
    
    .chatbot-header {
      margin: 0 15px 20px;
      padding: 20px;
    }
    
    .chatbot-content {
      padding: 0 15px 15px;
    }
    
    .chatbot-header h2 {
      font-size: 1.5rem;
    }
    
    .chatbot-header p {
      font-size: 0.9rem;
    }
    
    .chat-input-container {
      padding: 15px;
    }
  }
  </style>