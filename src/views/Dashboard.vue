<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <div class="welcome-card">
        <div class="welcome-content">
          <h2>환영합니다, 김신입님! 👋</h2>
          <p>AI 멘토링 시스템을 통해 신속하게 팀에 적응하고 실무 역량을 키워보세요.</p>
          <div class="action-buttons">
            <button class="primary-btn">
              <i class="fas fa-play-circle"></i>
              시작하기
            </button>
            <button class="secondary-btn">
              <i class="fas fa-book"></i>
              가이드 보기
            </button>
          </div>
        </div>

      </div>
    </div>
    
    <div class="project-intro-section">
      <div class="project-card">
        <div class="project-header">
          <div class="project-icon">
            <i class="fas fa-rocket"></i>
          </div>
          <div class="project-title">
            <h3>신입사원 온보딩 AI 플랫폼 프로젝트</h3>
            <span class="project-badge">진행중</span>
          </div>
        </div>
        <div class="project-content">
          <p>당신은 현재 <span class="highlight">신입사원 온보딩 지원 AI 플랫폼</span> 프로젝트에 배정되었습니다.<br> 이 프로젝트는 신입사원이 팀 프로젝트에 빠르게 적응하고 실무에 즉시 투입될 수 있도록 AI 기반 실시간 사수 멘토링 시스템을 구축하는 것을 목표로 합니다.</p>
          <div class="project-stats">
            <div class="stat-item">
              <div class="stat-value">14</div>
              <div class="stat-label">팀원</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">32</div>
              <div class="stat-label">일차</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">67%</div>
              <div class="stat-label">진행률</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="quick-actions">
      <h3>빠른 실행 메뉴 ⚡</h3>
      <div class="action-cards">
        <div class="action-card" @click="chatbot()">
          <div class="action-icon">
            <i class="fas fa-comments"></i>
          </div>
          <div class="action-info">
            <h4>AI 챗봇</h4>
            <p>질문하고 즉시 답변받기</p>
          </div>
          <div class="action-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
        
        <div class="action-card" @click="meetings()">
          <div class="action-icon meeting-icon">
            <i class="fas fa-microphone"></i>
          </div>
          <div class="action-info">
            <h4>회의록 생성</h4>
            <p>음성 회의 기록 및 요약</p>
          </div>
          <div class="action-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-sections">
      <div class="dashboard-section full-width">
        <div class="section-header">
          <h3>최근 활동 🕒</h3>
          <button class="view-all">전체보기 <i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-comment-alt"></i>
            </div>
            <div class="activity-content">
              <h4>"프론트엔드 API 연동 방법" 질문에 답변 받음</h4>
              <p>10분 전</p>
            </div>
            <div class="activity-tag ai-tag">AI 챗봇</div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-file-download"></i>
            </div>
            <div class="activity-content">
              <h4>"프로젝트 가이드라인" 문서 다운로드</h4>
              <p>2시간 전</p>
            </div>
            <div class="activity-tag doc-tag">문서</div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-clipboard-list"></i>
            </div>
            <div class="activity-content">
              <h4>"주간 팀 미팅" 회의록 요약 생성</h4>
              <p>어제</p>
            </div>
            <div class="activity-tag meeting-tag">회의록</div>
          </div>
          
          <div class="activity-item">
            <div class="activity-icon">
              <i class="fas fa-code"></i>
            </div>
            <div class="activity-content">
              <h4>"Vue 컴포넌트 최적화" 문서 검토</h4>
              <p>2일 전</p>
            </div>
            <div class="activity-tag tech-tag">기술</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 라우터 인스턴스 가져오기
const router = useRouter();

// 페이지 이동 함수
const chatbot = () => {
  router.push('/chatbot');
};

const meetings = () => {
  router.push('/meeting');
};
</script>


<style scoped>
.dashboard-container {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--background-light);
}

.welcome-section {
  margin-bottom: 40px;
}

.welcome-card {
  background: linear-gradient(135deg, #0047AB, #87CEEB);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 25px rgba(122, 167, 199, 0.25);
  position: relative;
  overflow: hidden;
}

.welcome-card::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -150px;
  right: -50px;
}

.welcome-card::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  bottom: -100px;
  left: 10%;
}

.welcome-content {
  flex: 0 0 60%;
  z-index: 2;
}

.welcome-content h2 {
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-content p {
  font-size: 1.1rem;
  color: #ffffff;
  margin-bottom: 30px;
  line-height: 1.7;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.action-buttons {
  display: flex;
  gap: 20px;
}

.primary-btn, .secondary-btn {
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.primary-btn {
  background-color: #ffffff;
  color: #7aa7c7;
  border: none;
}

.primary-btn:hover {
  background-color: #f8f8f8;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.secondary-btn {
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  backdrop-filter: blur(5px);
}

.secondary-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.primary-btn i, .secondary-btn i {
  margin-right: 12px;
  font-size: 1.2rem;
}

.welcome-image {
  flex: 0 0 35%;
  max-height: 250px;
  z-index: 2;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.welcome-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* 프로젝트 소개 섹션 */
.project-intro-section {
  margin-bottom: 40px;
}

.project-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(122, 167, 199, 0.15);
  border: 1px solid rgba(165, 200, 225, 0.2);
  transition: all 0.3s ease;
}

.project-card:hover {
  box-shadow: 0 12px 30px rgba(122, 167, 199, 0.25);
  border-color: rgba(165, 200, 225, 0.4);
  transform: translateY(-5px);
}

.project-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.project-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f7d8d4, #f5a5a5);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  box-shadow: 0 5px 15px rgba(245, 165, 165, 0.2);
}

.project-icon i {
  font-size: 1.8rem;
  color: white;
}

.project-title {
  flex: 1;
}

.project-title h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333333;
}

.project-badge {
  display: inline-block;
  padding: 5px 12px;
  background: linear-gradient(135deg, #a5c8e1, #7aa7c7);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 3px 8px rgba(122, 167, 199, 0.2);
}

.project-content {
  color: #555555;
  line-height: 1.7;
}

.project-content p {
  margin-bottom: 25px;
  font-size: 1.05rem;
}

.highlight {
  color: #7aa7c7;
  font-weight: 600;
  position: relative;
  z-index: 1;
}

.highlight::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background-color: rgba(165, 200, 225, 0.2);
  z-index: -1;
  border-radius: 3px;
}

.project-stats {
  display: flex;
  justify-content: start;
  gap: 30px;
  padding-top: 10px;
  margin-top: 20px;
  border-top: 1px dashed rgba(122, 167, 199, 0.3);
}

.stat-item {
  text-align: center;
  background-color: rgba(165, 200, 225, 0.1);
  padding: 15px 25px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background-color: rgba(165, 200, 225, 0.2);
  transform: translateY(-3px);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #7aa7c7;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.85rem;
  color: #666666;
  font-weight: 500;
}

/* 빠른 실행 메뉴 섹션 */
.quick-actions {
  margin-bottom: 40px;
}

.quick-actions h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333333;
  position: relative;
  padding-bottom: 10px;
}

.quick-actions h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 60px;
  background: linear-gradient(90deg, #a5c8e1, #7aa7c7);
  border-radius: 2px;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.action-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(165, 200, 225, 0.2);
}

.action-card:first-child {
  background: linear-gradient(45deg, rgba(165, 200, 225, 0.1), rgba(165, 200, 225, 0.05));
}

.action-card:nth-child(2) {
  background: linear-gradient(45deg, rgba(247, 216, 212, 0.1), rgba(247, 216, 212, 0.05));
}

.action-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: linear-gradient(to top, #a5c8e1, #7aa7c7);
  transition: height 0.4s ease;
}

.action-card:nth-child(2)::before {
  background: linear-gradient(to top, #f7d8d4, #f5a5a5);
}

.action-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: rgba(165, 200, 225, 0.4);
}

.action-card:hover::before {
  height: 100%;
}

.action-icon {
  width: 65px;
  height: 65px;
  border-radius: 16px;
  background: linear-gradient(135deg, #a5c8e1, #7aa7c7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  box-shadow: 0 8px 15px rgba(122, 167, 199, 0.25);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.meeting-icon {
  background: linear-gradient(135deg, #f7d8d4, #f5a5a5);
  box-shadow: 0 8px 15px rgba(245, 165, 165, 0.25);
}

.action-card:hover .action-icon {
  transform: scale(1.1) rotate(5deg);
}

.action-icon i {
  font-size: 1.8rem;
  color: white;
}

.action-info {
  flex: 1;
}

.action-info h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333333;
}

.action-info p {
  font-size: 0.95rem;
  color: #666666;
  line-height: 1.5;
}

.action-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7aa7c7;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  opacity: 0.7;
}

.action-card:nth-child(2) .action-arrow {
  color: #f5a5a5;
}

.action-card:hover .action-arrow {
  background-color: white;
  transform: translateX(5px);
  opacity: 1;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
}

/* 최근 활동 섹션 */
.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.dashboard-section {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(165, 200, 225, 0.2);
}

.dashboard-section.full-width {
  grid-column: 1 / -1;
}

.dashboard-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #a5c8e1, #7aa7c7);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.section-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333333;
}

.view-all {
  background: none;
  border: none;
  color: #7aa7c7;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 20px;
}

.view-all:hover {
  background-color: rgba(165, 200, 225, 0.1);
  color: #7aa7c7;
}

.view-all i {
  margin-left: 5px;
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.view-all:hover i {
  transform: translateX(3px);
}

.activity-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(248, 250, 252, 0.7);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
}

.activity-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  background-color: white;
  border-color: rgba(165, 200, 225, 0.3);
}

.activity-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #a5c8e1, #7aa7c7);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  box-shadow: 0 5px 10px rgba(122, 167, 199, 0.2);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.activity-item:hover .activity-icon {
  transform: scale(1.1);
}

.activity-icon i {
  font-size: 1.3rem;
  color: white;
}

.activity-content {
  flex: 1;
}

.activity-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333333;
  line-height: 1.4;
}

.activity-content p {
  font-size: 0.85rem;
  color: #666666;
  font-weight: 500;
}

.activity-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.ai-tag {
  background-color: rgba(165, 200, 225, 0.2);
  color: #7aa7c7;
}

.doc-tag {
  background-color: rgba(125, 211, 252, 0.2);
  color: #0284c7;
}

.meeting-tag {
  background-color: rgba(245, 165, 165, 0.2);
  color: #f5a5a5;
}

.tech-tag {
  background-color: rgba(129, 140, 248, 0.2);
  color: #6366f1;
}

@media (max-width: 1024px) {
  .activity-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .welcome-card {
    flex-direction: column;
    padding: 30px 25px;
  }
  
  .welcome-content {
    flex: 1 1 auto;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .welcome-content h2 {
    font-size: 1.8rem;
  }
  
  .welcome-content p {
    font-size: 1rem;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .welcome-image {
    flex: 1 1 auto;
    margin-top: 20px;
  }
  
  .action-cards {
    grid-template-columns: 1fr;
  }
  
  .project-stats {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 20px 15px;
  }
  
  .primary-btn, .secondary-btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
  
  .action-icon {
    width: 50px;
    height: 50px;
  }
  
  .action-icon i {
    font-size: 1.5rem;
  }
}
</style>