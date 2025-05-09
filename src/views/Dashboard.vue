<template>
  <div class="dashboard-container">
    <div class="welcome-section">
      <div class="welcome-card">
        <div class="welcome-content">
          <h2>환영합니다, 김신입님! 👋</h2>
          <p>AI 사수가 실시간으로 곁에서 이끌어주어 신입사원의 첫 실무 경험을 든든하게 지원합니다.</p>
          <!-- 버튼 제거함 -->
        </div>
      </div>
    </div>
    
    <div class="project-intro-section">
      <div class="project-card">
        <div class="project-header">
          <div class="project-icon">
            <img src="/support.png" alt="프로젝트" class="project-image" />
          </div>
          <div class="project-title">
            <h3>차세대 한국형 스마트팜 개발 프로젝트</h3>
            <span class="project-badge">진행중</span>
          </div>
        </div>
        <div class="project-content">
          <p>당신은 현재 <span class="highlight">차세대 한국형 스마트팜 개발</span> 프로젝트에 배정되었습니다.<br> 이 프로젝트는 고령화·노동력 부족 해결을 위해 IoT·빅데이터·AI·로봇 융합으로 생육 환경 최적화 및 생산성 향상으로 농가 소득 증대와 수출 기반 마련을 목표로 합니다.</p>
          <div class="project-stats">
            <div class="stat-item">
  <div class="stat-value">도메인 용어 설명</div>
  <div class="stat-label">익숙하지 않은 용어, 쉽게 풀어 알려드려요.</div>
</div>
<div class="stat-item">
  <div class="stat-value">회의록 자동 생성</div>
  <div class="stat-label">음성 회의를 텍스트로 자동 정리해 드려요.</div>
</div>
<div class="stat-item">
  <div class="stat-value">코드 검수 서비스</div>
  <div class="stat-label">코드가 요구사항에 맞는지 확인해 드려요.</div>
</div>
<div class="stat-item">
  <div class="stat-value">담당자 매칭</div>
  <div class="stat-label">질문에 맞는 담당자를 바로 연결해요.</div>
</div>

          </div>
        </div>
      </div>
    </div>
    
    <div class="quick-actions">
      <h3>빠른 실행 메뉴 ⚡</h3>
      <div class="action-cards">
        <div class="action-card enhanced" @click="chatbot()">
          <div class="action-icon">
            <img src="/chatbot.png" alt="AI 챗봇" class="icon-image" />
          </div>
          <div class="action-info">
            <h4>AI 챗봇</h4>
            <p>질문하고 즉시 답변받기</p>
          </div>
          <!-- 동그라미 화살표 제거함 -->
        </div>
        
        <div class="action-card enhanced" @click="meetings()">
          <div class="action-icon meeting-icon">
            <img src="/report.png" alt="회의록 생성" class="icon-image" />
          </div>
          <div class="action-info">
            <h4>회의록 생성</h4>
            <p>음성 회의 기록 및 요약</p>
          </div>
          <!-- 동그라미 화살표 제거함 -->
        </div>
      </div>
    </div>
    
    <div class="dashboard-sections">
      <div class="dashboard-section full-width">
        <div class="section-header">
          <h3>최근 활동 🕒</h3>
        </div>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-content">
              <h4>"프론트엔드 API 연동 방법" 질문에 답변 받음</h4>
              <p>10분 전</p>
            </div>
            <div class="activity-tag ai-tag">AI 챗봇</div>
          </div>
          
          <div class="activity-item">
            <div class="activity-content">
              <h4>"프로젝트 가이드라인" 문서 다운로드</h4>
              <p>2시간 전</p>
            </div>
            <div class="activity-tag doc-tag">문서</div>
          </div>
          
          <div class="activity-item">
            <div class="activity-content">
              <h4>"주간 팀 미팅" 회의록 요약 생성</h4>
              <p>어제</p>
            </div>
            <div class="activity-tag meeting-tag">회의록</div>
          </div>
          
          <div class="activity-item">
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

const goToReports = () => {
  router.push('/reports');
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
  flex: 0 0 100%; /* 버튼 제거하면서 너비 확장 */
  z-index: 2;
  text-align: center; /* 텍스트 중앙 정렬 */
}

.welcome-content h2 {
  font-size: 2.5rem; /* 조금 더 크게 */
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-content p {
  font-size: 1.2rem; /* 조금 더 크게 */
  color: #ffffff;
  margin-bottom: 10px; /* 버튼 제거로 마진 줄임 */
  line-height: 1.7;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* 너무 넓지 않게 제한 */
  margin-left: auto;
  margin-right: auto;
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
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  overflow: hidden;
}

.project-icon .project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
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
  justify-content: center; /* 가운데 정렬로 변경 */
  gap: 30px;
  padding-top: 10px;
  margin-top: 20px;
  border-top: 1px dashed rgba(122, 167, 199, 0.3);
  flex-wrap: wrap; /* 화면 크기에 따라 여러 줄로 표시되도록 설정 */
}

.stat-item {
  text-align: center;
  background-color: rgba(165, 200, 225, 0.1);
  padding: 15px 25px;
  border-radius: 12px;
  transition: all 0.3s ease;
  flex: 0 0 calc(25% - 30px); /* 4개 아이템 균등하게 배치 (갭 고려) */
  min-width: 200px; /* 최소 너비 설정 */
}

.stat-item:hover {
  background-color: rgba(165, 200, 225, 0.2);
  transform: translateY(-3px);
}

.stat-value {
  font-size: 1.2rem; /* 크기 조정 */
  font-weight: 700;
  color: #7aa7c7;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.85rem;
  color: #666666;
  font-weight: 500;
}

/* 빠른 실행 메뉴 섹션 - 강화됨 */
.quick-actions {
  margin-bottom: 40px;
}

.quick-actions h3 {
  font-size: 1.8rem; /* 더 크게 변경 */
  font-weight: 700;
  margin-bottom: 25px; /* 더 넓게 */
  color: #333333;
  position: relative;
  padding-bottom: 15px;
  text-align: center; /* 중앙 정렬 */
}

.quick-actions h3::after {
  content: '';
  position: absolute;
  left: 50%; /* 중앙으로 이동 */
  transform: translateX(-50%); /* 중앙 정렬 보정 */
  bottom: 0;
  height: 4px; /* 조금 더 두껍게 */
  width: 100px; /* 더 넓게 */
  background: linear-gradient(90deg, #a5c8e1, #7aa7c7);
  border-radius: 2px;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 20px;
}

/* 액션 카드 강화 */
.action-card.enhanced {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 35px; /* 패딩 증가 */
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08); /* 그림자 강화 */
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(165, 200, 225, 0.3); /* 테두리 두껍게 */
  min-height: 150px; /* 최소 높이 설정 */
}

.action-card.enhanced:first-child {
  background: linear-gradient(45deg, rgba(165, 200, 225, 0.15), rgba(165, 200, 225, 0.05));
}

.action-card.enhanced:nth-child(2) {
  background: linear-gradient(45deg, rgba(247, 216, 212, 0.15), rgba(247, 216, 212, 0.05));
}

.action-card.enhanced::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 6px; /* 더 두껍게 */
  height: 0;
  background: linear-gradient(to top, #a5c8e1, #7aa7c7);
  transition: height 0.4s ease;
}

.action-card.enhanced:nth-child(2)::before {
  background: linear-gradient(to top, #f7d8d4, #f5a5a5);
}

.action-card.enhanced:hover {
  transform: translateY(-10px) scale(1.03); /* 더 크게 움직임 */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); /* 더 강한 그림자 */
  border-color: rgba(165, 200, 225, 0.6);
}

.action-card.enhanced:hover::before {
  height: 100%;
}

.action-card.enhanced .action-icon {
  width: 80px; /* 더 크게 */
  height: 80px; /* 더 크게 */
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px; /* 더 많은 여백 */
  transition: all 0.3s ease;
  flex-shrink: 0;
  overflow: hidden;
}

.action-card.enhanced:hover .action-icon {
  transform: scale(1.15) rotate(8deg); /* 더 크게 회전 */
}

.action-card.enhanced .action-icon .icon-image {
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 12px;
}

.action-card.enhanced .action-info {
  flex: 1;
}

.action-card.enhanced .action-info h4 {
  font-size: 1.5rem; /* 더 크게 */
  font-weight: 700;
  margin-bottom: 10px;
  color: #333333;
}

.action-card.enhanced .action-info p {
  font-size: 1.1rem; /* 더 크게 */
  color: #666666;
  line-height: 1.5;
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


.activity-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.activity-item {
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
  
  .project-stats {
    gap: 20px;
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
  
  .action-cards {
    grid-template-columns: 1fr;
  }
  
  .project-stats {
    flex-direction: column;
    gap: 15px;
  }
  
  .stat-item {
    min-width: unset;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 20px 15px;
  }
  
  .action-card.enhanced {
    padding: 25px 20px;
  }
  
  .action-card.enhanced .action-icon {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 1200px) {
  .action-cards {
    grid-template-columns: 1fr;
  }
}
</style>