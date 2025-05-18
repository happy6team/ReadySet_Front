<template>
  <div class="admin-dashboard">
    <div class="welcome-card">
      <div class="welcome-content">
        <h2>📊 신입사원 부서 매칭 대시보드</h2>
        <p>인재의 특성과 능력을 고려하여 가장 적합한 부서에 배치해보세요.</p>
      </div>
    </div>

    <div class="match-section">
      <div class="section-header">
        <h3>프로젝트 선택 및 매칭 🔄</h3>
      </div>

      <div class="match-controls">
        <select
          v-model="selectedProject"
          class="department-select"
          :disabled="isLoading"
        >
          <option disabled value="">프로젝트를 선택하세요</option>
          <option v-for="project in projects" :key="project">
            {{ project }}
          </option>
        </select>
        <button
          @click="matchEmployees"
          class="match-button"
          :disabled="isLoading"
        >
          {{ isLoading ? "로딩 중..." : "신입사원 매칭하기" }}
        </button>
      </div>
    </div>

    <!-- 결과 카드 -->
    <div class="dashboard-sections" v-if="matchedEmployees.length">
      <div class="dashboard-section full-width">
        <div class="section-header">
          <h3>매칭 결과 🎯</h3>
          <span class="result-counter"
            >{{ currentIndex + 1 }} / {{ matchedEmployees.length }}</span
          >
        </div>

        <div class="employee-card">
          <div class="employee-header">
            <div class="employee-profile">
              <div class="profile-initial">
                {{ getInitial(currentEmployee.name) }}
              </div>
            </div>
            <div class="employee-title">
              <h3>{{ currentEmployee.name }}</h3>
              <span class="employee-badge">{{
                currentEmployee.department
              }}</span>
            </div>

            <!-- 직원 상세 정보 버튼 추가 -->
            <div class="detail-button-container">
              <button @click="showEmployeeDetail" class="detail-button">
                상세 정보
              </button>
            </div>
          </div>

          <div class="employee-content">
            <div class="employee-details">
              <div class="detail-row">
                <div class="detail-label">주요 역량</div>
                <div class="detail-value">
                  {{ currentEmployee.tech_skills }}
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-label">매칭 점수</div>
                <div class="detail-value">
                  {{ currentEmployee.total_score }}/10
                </div>
              </div>
            </div>

            <div class="score-details">
              <h4>평가 항목별 점수</h4>
              <div class="score-grid">
                <div class="score-item">
                  <div class="score-label">핵심 기술 일치도</div>
                  <div class="score-value">
                    {{ currentEmployee.scores?.tech_match || 0 }}/4.0
                  </div>
                </div>
                <div class="score-item">
                  <div class="score-label">실무 프로젝트 경험</div>
                  <div class="score-value">
                    {{ currentEmployee.scores?.project_experience || 0 }}/2.5
                  </div>
                </div>
                <div class="score-item">
                  <div class="score-label">자격증 및 전문 역량</div>
                  <div class="score-value">
                    {{ currentEmployee.scores?.certifications || 0 }}/2.0
                  </div>
                </div>
                <div class="score-item">
                  <div class="score-label">경력 적합성</div>
                  <div class="score-value">
                    {{ currentEmployee.scores?.career_fit || 0 }}/1.5
                  </div>
                </div>
              </div>
            </div>

            <div class="reason-section">
              <h4>선정 이유</h4>
              <ul class="reason-list">
                <li
                  v-for="(reason, index) in currentEmployee.reasons"
                  :key="index"
                >
                  {{ reason }}
                </li>
              </ul>
            </div>

            <div class="navigation-controls">
              <button
                @click="prevEmployee"
                :disabled="currentIndex === 0"
                class="nav-button prev"
              >
                ← 이전
              </button>
              <button
                @click="nextEmployee"
                :disabled="currentIndex === matchedEmployees.length - 1"
                class="nav-button next"
              >
                다음 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 안내 문구 -->
    <div class="dashboard-sections" v-else>
      <div class="dashboard-section full-width">
        <div class="empty-state">
          <img
            src="https://via.placeholder.com/120?text=📄"
            alt="매칭 시작"
            class="empty-icon"
          />
          <p class="info-text">프로젝트를 선택하고 매칭을 시작해보세요.</p>
          <p class="info-desc">
            프로젝트 특성과 신입사원의 역량을 고려한 최적의 매칭 결과를 확인할
            수 있습니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 직원 상세 정보 모달 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>신입사원 상세 정보</h2>
          <button @click="closeModal" class="close-button">&times;</button>
        </div>
        <div class="modal-body" v-if="employeeDetail">
          <div class="resume-container">
            <div class="resume-header">
              <div class="resume-profile">
                <div class="profile-initial-large">
                  {{ getInitial(employeeDetail.name) }}
                </div>
              </div>
              <div class="resume-title">
                <h2>{{ employeeDetail.name }}</h2>
                <div class="resume-position">
                  <span class="position-badge">{{
                    employeeDetail.position
                  }}</span>
                  <span class="department-badge">{{
                    employeeDetail.department
                  }}</span>
                </div>
                <p class="profile-summary">
                  {{ employeeDetail.profile_summary }}
                </p>
              </div>
            </div>

            <div class="resume-sections">
              <div class="resume-section">
                <h3>기본 정보</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">사번</div>
                    <div class="info-value">{{ employeeDetail.id }}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">입사일</div>
                    <div class="info-value">
                      {{ formatDate(employeeDetail.join_date) }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="resume-section">
                <h3>보유 기술</h3>
                <div class="skills-container">
                  <span
                    v-for="skill in employeeDetail.skills"
                    :key="skill"
                    class="skill-badge"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>

              <div class="resume-section">
                <h3>프로젝트 이력</h3>
                <ul class="project-list">
                  <li v-for="project in employeeDetail.projects" :key="project">
                    {{ project }}
                  </li>
                </ul>
              </div>

              <div class="resume-section">
                <h3>학력</h3>
                <div class="education-info">
                  <p>
                    <strong>{{ employeeDetail.education_school }}</strong
                    >,
                    {{ employeeDetail.education_degree }}
                    ({{ employeeDetail.education_graduation_year }}년 졸업)
                  </p>
                </div>
              </div>

              <div class="resume-section">
                <h3>자격증</h3>
                <ul class="certification-list">
                  <li v-for="cert in employeeDetail.certifications" :key="cert">
                    {{ cert }}
                  </li>
                </ul>
              </div>

              <div class="resume-section">
                <h3>언어 능력</h3>
                <ul class="language-list">
                  <li v-for="lang in employeeDetail.languages" :key="lang">
                    {{ lang }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/styles/AdminDashboard.css";
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const isLoading = ref(false);

// 프로젝트 목록
const projects = ref([]);

// 선택된 프로젝트
const selectedProject = ref("");

// 매칭된 신입사원 목록
const matchedEmployees = ref([]);

// 현재 보고 있는 카드 인덱스
const currentIndex = ref(0);

// 현재 신입사원 정보
const currentEmployee = computed(
  () => matchedEmployees.value[currentIndex.value] || {}
);

// 프로젝트 정보
const projectInfo = ref(null);

// 모달 상태
const showModal = ref(false);

// 직원 상세 정보
const employeeDetail = ref(null);

// 이름에서 첫 글자 가져오기 (프로필 이니셜용)
function getInitial(name) {
  return name ? name.charAt(0) : "";
}

// 날짜 포맷팅
function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
}

// 프로젝트 목록 가져오기
async function fetchProjects() {
  console.log("프로젝트 목록 가져오기 시작");
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8000/hr/projects");
    if (response.data && response.data.projects) {
      projects.value = response.data.projects;
    } else {
      console.error("API 응답 형식이 다릅니다:", response.data);
      // 기본 프로젝트 목록 (API 실패 시 폴백)
      projects.value = [
        "신규 사업 전략 수립 프로젝트",
        "웹 애플리케이션 개발",
        "모바일 앱 개발",
        "데이터 파이프라인 구축",
        "AI 모델 개발",
        "클라우드 인프라 구축",
      ];
    }
  } catch (error) {
    console.error("프로젝트 목록을 가져오는 중 오류 발생:", error);
    // 기본 프로젝트 목록 (API 실패 시 폴백)
    projects.value = [
      "신규 사업 전략 수립 프로젝트",
      "웹 애플리케이션 개발",
      "모바일 앱 개발",
      "데이터 파이프라인 구축",
      "AI 모델 개발",
      "클라우드 인프라 구축",
    ];
  } finally {
    isLoading.value = false;
  }
}

// 신입사원 매칭 API 호출
async function matchEmployees() {
  if (!selectedProject.value) {
    alert("프로젝트를 선택해주세요!");
    return;
  }

  isLoading.value = true;
  try {
    // API 요청 데이터
    const requestData = {
      project_name: selectedProject.value,
      top_n: 3,
    };

    console.log("매칭 요청 데이터:", requestData);

    // API 호출
    const response = await axios.post(
      "http://localhost:8000/hr/project-matching",
      requestData
    );
    console.log("매칭 응답:", response.data);

    // 응답 데이터 처리
    if (response.data) {
      projectInfo.value = response.data.project_info;
      matchedEmployees.value = response.data.candidates || [];
      currentIndex.value = 0;
    } else {
      alert("매칭 결과를 가져오는데 실패했습니다.");
      matchedEmployees.value = [];
    }
  } catch (error) {
    console.error("신입사원 매칭 중 오류 발생:", error);
    alert("매칭 과정에서 오류가 발생했습니다.");
    matchedEmployees.value = [];
  } finally {
    isLoading.value = false;
  }
}

function nextEmployee() {
  if (currentIndex.value < matchedEmployees.value.length - 1) {
    currentIndex.value += 1;
  } else {
    alert("마지막 신입사원입니다.");
  }
}

// 직원 상세 정보 가져오기
async function showEmployeeDetail() {
  if (!currentEmployee.value || !currentEmployee.value.id) {
    alert("직원 정보를 찾을 수 없습니다.");
    return;
  }

  isLoading.value = true;
  try {
    // 직원 ID로 상세 정보 가져오기
    const response = await axios.get(
      `http://localhost:8000/hr/${currentEmployee.value.id}`
    );

    employeeDetail.value = response.data;
    showModal.value = true;
  } catch (error) {
    console.error("직원 상세 정보를 가져오는 중 오류 발생:", error);
    showModal.value = true;
  } finally {
    isLoading.value = false;
  }
}

// 모달 닫기
function closeModal() {
  showModal.value = false;
}

function prevEmployee() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
}

// 컴포넌트 마운트 시 프로젝트 목록 가져오기
onMounted(() => {
  fetchProjects();
});
</script>

<style scoped>
/* 기존 스타일 유지 */

/* 점수 세부 정보 스타일 */
.score-details {
  margin: 20px 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.score-details h4 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #1976d2;
  font-size: 1rem;
}

.score-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.score-item {
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.score-label {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 4px;
}

.score-value {
  font-weight: 600;
  color: #1976d2;
}

/* 이유 목록 스타일 */
.reason-list {
  margin: 0;
  padding-left: 20px;
}

.reason-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* 상세 정보 버튼 스타일 */
.detail-button-container {
  display: flex;
  justify-content: center;
  margin: 0;
}

.detail-button {
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-button:hover {
  background-color: #1976d2;
}

/* 모달 스타일 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

/* 이력서 스타일 */
.resume-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.resume-header {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.profile-initial-large {
  width: 80px;
  height: 80px;
  background-color: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  border-radius: 50%;
}

.resume-title h2 {
  margin: 0 0 8px 0;
  font-size: 1.8rem;
  color: #333;
}

.resume-position {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.position-badge,
.department-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
}

.position-badge {
  background-color: #e3f2fd;
  color: #1976d2;
}

.department-badge {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.profile-summary {
  margin: 0;
  color: #555;
  line-height: 1.5;
}

.resume-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.resume-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
}

.resume-section h3 {
  margin: 0 0 16px 0;
  color: #1976d2;
  font-size: 1.2rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 4px;
}

.info-value {
  font-weight: 500;
  color: #333;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-badge {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
}

.project-list,
.certification-list,
.language-list {
  margin: 0;
  padding-left: 20px;
}

.project-list li,
.certification-list li,
.language-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.education-info {
  margin: 0;
}

.education-info p {
  margin: 0;
  line-height: 1.5;
}
</style>
