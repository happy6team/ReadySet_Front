<template>
    <div class="admin-employees">
      <div class="welcome-card">
        <div class="welcome-content">
          <h2>👥 신입사원 리스트</h2>
          <p>우리 회사에 지원한 신입사원들의 정보를 확인해보세요.</p>
        </div>
      </div>
  
      <div class="employee-table-section">
        <div class="section-header">
          <h3>신입사원 정보 📋</h3>
          <span class="employee-counter">총 {{ employees.length }}명</span>
        </div>
  
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>프로필</th>
                <th>이름</th>
                <th>전공</th>
                <th>성격</th>
                <th>희망 부서</th>
                <th>이력서</th>
                <th>자세히 보기</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(emp, index) in employees" :key="index" class="employee-row">
                <td>
                  <div class="employee-profile">
                    <div class="profile-initial">{{ getInitial(emp.name) }}</div>
                  </div>
                </td>
                <td><strong>{{ emp.name }}</strong></td>
                <td>
                  <span class="major-badge">{{ emp.major }}</span>
                </td>
                <td>{{ emp.personality }}</td>
                <td>
                  <span class="preference-badge">{{ emp.preference }}</span>
                </td>
                <td>{{ emp.resume }}</td>
                <td>
                    <button class="view-button" @click="openModal(emp)">상세보기</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- 빈 상태 표시 (직원이 없을 경우) -->
        <div class="empty-state" v-if="employees.length === 0">
          <img src="https://via.placeholder.com/120?text=📄" alt="직원 없음" class="empty-icon" />
          <p class="info-text">등록된 신입사원이 없습니다.</p>
          <p class="info-desc">신입사원이 등록되면 이 곳에 표시됩니다.</p>
        </div>
      </div>
  
      <!-- 통계 섹션 추가 -->
      <div class="stats-section">
        <div class="section-header">
          <h3>지원 현황 요약 📊</h3>
        </div>
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon cs-icon">👨‍💻</div>
            <div class="stat-content">
              <div class="stat-value">2</div>
              <div class="stat-label">IT 전공자</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon ai-icon">🧠</div>
            <div class="stat-content">
              <div class="stat-value">1</div>
              <div class="stat-label">AI 지원자</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon data-icon">📊</div>
            <div class="stat-content">
              <div class="stat-value">1</div>
              <div class="stat-label">데이터 분석 지원자</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon total-icon">🌟</div>
            <div class="stat-content">
              <div class="stat-value">3</div>
              <div class="stat-label">총 지원자</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 상세보기 모달 -->
        <div v-if="selectedEmployee" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <h3>📄 {{ selectedEmployee.name }}님의 이력서 상세보기</h3>
            <p><strong>전공:</strong> {{ selectedEmployee.major }}</p>
            <p><strong>성격:</strong> {{ selectedEmployee.personality }}</p>
            <p><strong>희망 부서:</strong> {{ selectedEmployee.preference }}</p>
            <p><strong>이력서 요약:</strong></p>
            <p>{{ selectedEmployee.resume }}</p>
            <button class="modal-close-btn" @click="closeModal">닫기</button>
        </div>
        </div>

    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import '@/assets/styles/AdminEmployees.css'

    const selectedEmployee = ref(null)

    // 신입사원 데이터
    const employees = ref([
        {
        name: '김다은',
        major: '컴퓨터공학',
        personality: '성실하고 꼼꼼함',
        preference: 'AI 개발팀',
        resume: '다양한 딥러닝 프로젝트 수행'
        },
        {
        name: '이재웅',
        major: '산업공학',
        personality: '분석적 사고',
        preference: '데이터 분석팀',
        resume: '공정 데이터 분석 경험 다수'
        },
        {
        name: '최민주',
        major: '정보보호학과',
        personality: '차분하고 논리적',
        preference: '보안 솔루션팀',
        resume: '보안 컨설팅 인턴 경험'
        },
    ])
    
    // 이름에서 첫 글자 가져오기 (프로필 이니셜용)
    function getInitial(name) {
        return name ? name.charAt(0) : '';
    }
    function openModal(employee) {
        selectedEmployee.value = employee
    }

    function closeModal() {
        selectedEmployee.value = null
    }

  </script>