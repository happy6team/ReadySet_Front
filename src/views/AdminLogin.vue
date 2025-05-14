<template>
    <div class="admin-login-container">
      <div class="login-card">
        <h2>관리자 로그인</h2>
        <p class="subtitle">신입사원 매칭 관리를 위해 로그인해주세요</p>
  
        <div class="input-group">
          <input 
            type="text" 
            v-model="adminName" 
            placeholder="이름을 입력하세요"
          />
        </div>
  
        <div class="input-group">
          <input 
            type="password" 
            v-model="adminPassword" 
            placeholder="비밀번호를 입력하세요"
            @keyup.enter="handleLogin"
          />
        </div>
  
        <button class="login-btn" @click="handleLogin">로그인</button>

        <div class="back-link">
            <button @click="goToStart">신입사원 로그인으로 돌아가기</button>
        </div>
      </div>

    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const adminName = ref('')
  const adminPassword = ref('')
  const router = useRouter()
  
  function handleLogin() {
    // 더미 로그인 - 추후 FastAPI 연동
    if (adminName.value === 'admin' && adminPassword.value === '1234') {
      router.push('/admin-dashboard')
    } else {
      alert('로그인 정보가 올바르지 않습니다.')
    }
  }

  function goToStart() {
    router.push('/')
  }

  </script>
  
  <style scoped>
  .admin-login-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #001c46 0%, #0047AB 100%);
  }
  
  .login-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 24px;
    padding: 40px 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 90%;
    max-width: 400px;
  }
  
  .login-card h2 {
    color: white;
    margin-bottom: 10px;
    font-size: 1.8rem;
  }
  
  .subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    margin-bottom: 30px;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .input-group input {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    border: none;
    font-size: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .input-group input::placeholder {
    color: #888;
  }
  
  .login-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    background: #0047AB;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .login-btn:hover {
    background: #0059d4;
  }

  .back-link {
    margin-top: 20px;
    text-align: center;
  }

  .back-link button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .back-link button:hover {
    color: white;
  }

  </style>
  