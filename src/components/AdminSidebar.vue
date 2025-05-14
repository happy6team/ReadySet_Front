<template>
    <div class="admin-sidebar">
      <!-- 상단: 메뉴 영역 -->
      <div class="menu-section">
        <h2>관리자 메뉴</h2>
        <ul>
          <li><router-link to="/admin-dashboard">📊 신입 매칭</router-link></li>
          <li><router-link to="/admin-employees">👥 신입 리스트</router-link></li>
          <li><router-link to="/admin-settings">⚙️ 시스템 설정</router-link></li>
        </ul>
      </div>
  
      <!-- 하단: 고정 버튼 -->
      <div class="footer-section">
        <button class="footer-button">설정</button>
        <button class="footer-button">도움말</button>
        <button class="logout-button" @click="logout">로그아웃</button>

      </div>
    </div>
  </template>
  
  <script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    function logout() {
        localStorage.clear() // 로그인 상태 초기화
        router.push('/admin-login') // 로그인 페이지로 이동
    }
</script>

  
  <style scoped>
    .admin-sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        height: 100vh;
        background-color: #0b2f52;
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
  
  .menu-section h2 {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  
  .menu-section ul {
    list-style: none;
    padding: 0;
  }
  
  .menu-section li {
    margin-bottom: 15px;
  }
  
  .menu-section a {
    color: white;
    text-decoration: none;
  }
  
  .menu-section a:hover {
    text-decoration: underline;
  }
  
  .footer-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .footer-button,
  .logout-button {
    background: none;
    border: none;
    color: white;
    font-size: 0.95rem;
    text-align: left;
    cursor: pointer;
    padding: 6px 0;
  }
  
  .logout-button {
    margin-top: 10px;
    color: #f99;
    font-weight: bold;
  }
  </style>
  