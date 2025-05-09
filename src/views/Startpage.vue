<template>
    <div class="start-container">
      <div class="particles">
        <div v-for="n in 20" :key="n" class="particle"></div>
      </div>
      
      <div class="start-card">
        <div class="glowing-effect"></div>
        
        <div class="start-content">
          <div class="logo-animated">
            <div class="logo-icon">
              <!-- FontAwesome 아이콘 대신 이미지로 변경 -->
              <img src="/support.png" alt="로고" class="logo-image" />
              <!-- 빤짝이는 효과 요소 추가 -->
              <div class="sparkle-effect"></div>
            </div>
          </div>
          
          <div class="start-header">
            <h1>ReadySet</h1>
            <p>AI 사수가 곁에서 이끌어주는 온보딩 멘토링 시스템</p>
          </div>
          
          <div class="form-container">
            <div class="input-group">
              <div class="input-wrapper">
                <i class="fas fa-user"></i>
                <input 
                  type="text" 
                  id="username" 
                  v-model="username" 
                  placeholder="이름을 입력하세요"
                  @keyup.enter="focusProjectNumber"
                />
              </div>
            </div>
            
            <div class="input-group">
              <div class="input-wrapper">
                <i class="fas fa-hashtag"></i>
                <input 
                  type="text" 
                  id="projectNumber" 
                  v-model="projectNumber" 
                  placeholder="프로젝트 번호를 입력하세요"
                  @keyup.enter="login"
                  ref="projectNumberInput"
                />
              </div>
            </div>
            
            <button class="start-btn" @click="login">
              <span>시작하기</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>&copy; 2025 신입사원 온보딩 AI 플랫폼 | <a href="#">이용약관</a> | <a href="#">개인정보처리방침</a></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const username = ref('');
  const projectNumber = ref('');
  const projectNumberInput = ref(null);
  
  function focusProjectNumber() {
    if (username.value.trim() !== '') {
      projectNumberInput.value.focus();
    }
  }
  
  // 로그인 함수 단순화 - 입력 값 검증 없이 바로 대시보드로 이동
  function login() {
    // 입력 값에 관계없이 바로 대시보드 페이지로 이동
    router.push('/dashboard');
  }
  
  onMounted(() => {
    // 파티클 애니메이션 설정
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const size = Math.random() * 15 + 5;
      const speed = Math.random() * 2 + 1;
      const translateX = Math.random() * 100 - 50;
      const translateY = Math.random() * 100 - 50;
      const opacity = Math.random() * 0.7 + 0.3;
      const delay = Math.random() * 2;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.animation = `floatParticle ${speed}s ease-in-out infinite`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.transform = `translate(${translateX}vw, ${translateY}vh)`;
    });
    
    // 카드 애니메이션 효과 추가
    document.querySelector('.start-card').classList.add('appear');
    
    // 빤짝이는 효과 생성
    createSparkles();
  });
  
  // 빤짝이는 효과 생성 함수
  function createSparkles() {
    const sparkleContainer = document.querySelector('.sparkle-effect');
    if (!sparkleContainer) return; // 요소가 없을 경우 처리
    
    // 기존 내용 초기화
    sparkleContainer.innerHTML = '';
    
    // 빤짝이는 별 생성
    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // 랜덤 위치 설정
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = Math.random() * 5 + 2;
      const delay = Math.random() * 2;
      
      sparkle.style.left = `${left}%`;
      sparkle.style.top = `${top}%`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.animationDelay = `${delay}s`;
      
      sparkleContainer.appendChild(sparkle);
    }
  }
  </script>
  
  <style scoped>
  .start-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #001c46 0%, #0047AB 100%);
    padding: 20px;
    position: relative;
    overflow: hidden;
  }
  
  /* 파티클 애니메이션 */
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }
  
  .particle {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.2);
    pointer-events: none;
  }
  
  @keyframes floatParticle {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(10px, -20px);
    }
  }
  
  .start-card {
    width: 90%;
    max-width: 480px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    padding: 40px;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    z-index: 2;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .start-card.appear {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* 글로잉 효과 */
  .glowing-effect {
    position: absolute;
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    background: radial-gradient(
      circle at center,
      rgba(135, 206, 235, 0.2) 0%,
      rgba(0, 71, 171, 0.1) 25%,
      transparent 70%
    );
    z-index: -1;
    animation: rotateGlow 15s linear infinite;
  }
  
  @keyframes rotateGlow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .start-content {
    position: relative;
    z-index: 2;
  }
  
  .logo-animated {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
  
  .logo-icon {
    width: 90px;
    height: 90px;
    background: rgba(0, 71, 171, 0.3); /* 배경 투명도 조정 */
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(0, 71, 171, 0.5),
                0 0 20px rgba(135, 206, 235, 0.7);
    position: relative;
    animation: logoFloat 6s ease-in-out infinite;
    z-index: 1;
    overflow: hidden; /* 이미지가 넘치지 않도록 설정 */
  }
  
  /* 이미지 스타일 */
  .logo-image {
    width: 90%;
    height: 90%;
    object-fit: contain;
    position: relative;
    z-index: 2;
    animation: imagePulse 3s ease-in-out infinite;
    filter: drop-shadow(0 0 8px rgba(135, 206, 235, 0.8));
  }
  
  @keyframes imagePulse {
    0%, 100% {
      filter: drop-shadow(0 0 8px rgba(135, 206, 235, 0.8));
      transform: scale(1);
    }
    50% {
      filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.9));
      transform: scale(1.05);
    }
  }
  
  /* 빤짝이는 효과 */
  .sparkle-effect {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    pointer-events: none;
  }
  
  .sparkle {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    animation: sparkle 4s ease-in-out infinite;
  }
  
  @keyframes sparkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
    80% {
      opacity: 0;
      transform: scale(1.5);
    }
  }
  
  .logo-icon::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    z-index: 1;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes logoFloat {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    25% {
      transform: translateY(-10px) rotate(-3deg);
    }
    75% {
      transform: translateY(8px) rotate(3deg);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.3);
      opacity: 0;
    }
  }
  
  .start-header {
    text-align: center;
    margin-bottom: 35px;
  }
  
  .start-header h1 {
    font-size: 2.3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 15px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    letter-spacing: -0.5px;
  }
  
  .start-header p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin: 0 auto;
  }
  
  .form-container {
    margin: 0 auto;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .input-wrapper {
    position: relative;
    transition: all 0.3s ease;
  }
  
  .input-wrapper:hover {
    transform: translateY(-2px);
  }
  
  .input-wrapper i {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #0047AB;
    font-size: 1.2rem;
    z-index: 2;
  }
  
  .input-group input {
    width: 100%;
    padding: 18px 20px 18px 50px;
    border: none;
    border-radius: 16px;
    font-size: 1.05rem;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    color: #333;
    font-weight: 500;
  }
  
  .input-group input:focus {
    outline: none;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15), 
                0 0 0 3px rgba(0, 71, 171, 0.4);
    background-color: white;
  }
  
  .input-group input::placeholder {
    color: #888;
    font-weight: 400;
  }
  
  .start-btn {
    width: 100%;
    padding: 18px;
    border: none;
    border-radius: 16px;
    background: #0047AB;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2),
                0 5px 10px rgba(0, 71, 171, 0.5);
    margin-top: 35px;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  
  .start-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.4s ease;
    z-index: -1;
  }
  
  .start-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 35px rgba(0, 0, 0, 0.3),
                0 10px 15px rgba(0, 71, 171, 0.5);
    background: #0052cc;
  }
  
  .start-btn:hover::before {
    animation: shineEffect 1.5s ease-in-out;
  }
  
  @keyframes shineEffect {
    100% {
      left: 100%;
    }
  }
  
  .start-btn span {
    margin-right: 10px;
  }
  
  .start-btn i {
    transition: transform 0.3s ease;
  }
  
  .start-btn:hover i {
    transform: translateX(5px);
  }
  
  .footer {
    margin-top: 40px;
    text-align: center;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    z-index: 2;
  }
  
  .footer a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer a:hover {
    color: white;
    text-decoration: underline;
  }
  
  /* 반응형 디자인 */
  @media (max-width: 576px) {
    .start-card {
      padding: 30px 25px;
    }
    
    .start-header h1 {
      font-size: 2rem;
    }
    
    .logo-icon {
      width: 75px;
      height: 75px;
    }
    
    .input-group input {
      padding: 16px 20px 16px 45px;
    }
    
    .start-btn {
      padding: 16px;
    }
  }
  </style>