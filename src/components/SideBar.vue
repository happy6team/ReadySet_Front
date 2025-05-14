<template>
  <div class="sidebar" :class="{ 'open': isOpen }">
    <div class="sidebar-header">
      <div class="logo">
        <h2>ReadySet</h2>
      </div>
    </div>
    
    <div class="user-profile">
      <div class="avatar">
        <img src="/daeun_profile.png" alt="프로필" />
      </div>
      <div class="user-info">
        <h3>김신입</h3>
        <p>프론트엔드 개발팀</p>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <ul>
        <li :class="{ active: route.path === '/dashboard' }">
          <router-link to="/dashboard">
            <i class="fas fa-home"></i>
            <span>대시보드</span>
          </router-link>
        </li>
        <li :class="{ active: route.path === '/chatbot' }">
          <router-link to="/chatbot">
            <i class="fas fa-comments"></i>
            <span>AI 챗봇</span>
          </router-link>
        </li>
        <li :class="{ active: route.path === '/meeting' }">
          <router-link to="/meeting">
            <i class="fas fa-microphone"></i>
            <span>회의록 관리</span>
          </router-link>
        </li>
        <li :class="{ active: route.path === '/reports' }">
          <router-link to="/reports">
            <i class="fas fa-file-alt"></i>
            <span>문서 관리</span>
          </router-link>
        </li>

      </ul>
    </nav>

    <div class="logout-section">
      <button class="logout-btn" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
        <span>로그아웃</span>
      </button>
    </div>
    
    <div class="sidebar-footer">
      <button class="settings-btn">
        <i class="fas fa-cog"></i>
        <span>설정</span>
      </button>
      <button class="help-btn">
        <i class="fas fa-question-circle"></i>
        <span>도움말</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter} from 'vue-router';
const route = useRoute();
const router = useRouter();

defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
});

function logout() {
  localStorage.clear();  // 사용자 정보 초기화 (필요 시)
  router.push('/');      // startpage로 이동
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background: #F5F7FA;
  color: #3E4C59;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #E4E7EB;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar:not(.open) {
  transform: translateX(-100%);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 22px 25px;
  border-bottom: 1px solid #E4E7EB;
}

.logo {
  display: flex;
  align-items: center;
}

.logo h2 {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #0047AB;
  background: linear-gradient(to right, #0047AB, #3A7BD5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.user-profile {
  margin: 20px 20px 15px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  background: #FFFFFF;
  border: 2px solid #E4E7EB;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info h3 {
  font-size: 1.05rem;
  margin-bottom: 3px;
  font-weight: 600;
  color: #2D3748;
}

.user-info p {
  font-size: 0.8rem;
  color: #718096;
  font-weight: 400;
}

.sidebar-nav {
  flex: 1;
  padding: 0 15px;
  overflow-y: auto;
  margin: 5px 0 15px;
}

.sidebar-nav::-webkit-scrollbar {
  width: 3px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background-color: #D9DCE1;
  border-radius: 10px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background-color: #C5C9D0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
}

.sidebar-nav li {
  margin-bottom: 2px;
}

.sidebar-nav li a {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #4A5568;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1.05rem;
}

.sidebar-nav li a:hover {
  background-color: #EBEDF0;
  color: #2D3748;
}

.sidebar-nav li.active a {
  background-color: #0080ffec;
  color: white;
  font-weight: 800;
}

.sidebar-nav li i {
  font-size: 1.05rem;
  margin-right: 12px;
  width: 20px;
  text-align: center;
  color: #718096;
  transition: all 0.2s ease;
}

.sidebar-nav li.active i {
  color: white;
}

.sidebar-nav li a:hover i {
  color: #3A7BD5;
}

.sidebar-footer {
  padding: 15px 20px 20px;
  border-top: 1px solid #E4E7EB;
  display: flex;
  gap: 10px;
}

.settings-btn, .help-btn {
  background: #EBEDF0;
  border: none;
  border-radius: 6px;
  color: #4A5568;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 12px;
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
}

.settings-btn:hover, .help-btn:hover {
  background: #DFE3E8;
  color: #2D3748;
}

.settings-btn i, .help-btn i {
  margin-right: 8px;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .sidebar {
    width: 240px;
  }
  
  .sidebar-header {
    padding: 18px 20px;
  }
  
  .logo h2 {
    font-size: 1.2rem;
  }
}

.logout-section {
    padding: 0 20px 10px;
  }

  .logout-btn {
    width: 100%;
    background: #FFECEC;
    border: none;
    border-radius: 6px;
    color: #D9534F;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px 12px;
    transition: all 0.2s ease;
    font-size: 0.85rem;
    font-weight: 500;
    justify-content: center;
  }

  .logout-btn:hover {
    background: #F8D7DA;
    color: #C9302C;
  }

  .logout-btn i {
    margin-right: 8px;
    font-size: 0.95rem;
  }
</style>