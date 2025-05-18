<template>
  <div class="admin-employees">
    <div class="welcome-card">
      <div class="welcome-content">
        <h2>👥 신입사원 리스트</h2>
        <p>우리 회사 신입사원들의 자세한 정보를 확인해보세요.</p>
      </div>
    </div>

    <!-- 필터링 섹션 -->
    <div class="filter-section">
      <div class="filter-controls">
        <div class="filter-control">
          <label for="department-filter">부서:</label>
          <select
            id="department-filter"
            v-model="filters.department"
            @change="fetchEmployees(1)"
          >
            <option value="">전체 부서</option>
            <option
              v-for="dept in availableDepartments"
              :key="dept"
              :value="dept"
            >
              {{ dept }}
            </option>
          </select>
        </div>
        <!-- <div class="filter-control">
          <label for="position-filter">직책:</label>
          <select
            id="position-filter"
            v-model="filters.position"
            @change="fetchEmployees(1)"
          >
            <option value="">전체 직책</option>
            <option v-for="pos in availablePositions" :key="pos" :value="pos">
              {{ pos }}
            </option>
          </select>
        </div> -->
      </div>
    </div>

    <div class="employee-table-section">
      <div class="section-header">
        <h3>신입사원 정보 📋</h3>
        <div class="section-header-right">
          <span class="employee-counter">총 {{ pagination.total }}명</span>
          <div class="per-page-selector">
            <label for="size-filter">표시:</label>
            <select
              id="size-filter"
              v-model="pagination.size"
              @change="fetchEmployees(1)"
            >
              <option value="5">5명</option>
              <option value="10">10명</option>
              <option value="20">20명</option>
              <option value="50">50명</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 로딩 인디케이터 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>데이터를 불러오는 중...</p>
      </div>

      <div v-else class="table-container">
        <table v-if="employees.length > 0">
          <thead>
            <tr>
              <th>프로필</th>
              <th>이름</th>
              <th>학력</th>
              <!-- <th>직책</th> -->
              <th>희망 부서</th>
              <!-- <th>입사일</th> -->
              <th>보유 스킬</th>
              <th>자세히 보기</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(emp, index) in employees"
              :key="emp.id"
              class="employee-row"
            >
              <td>
                <div class="employee-profile">
                  <div class="profile-initial">{{ getInitial(emp.name) }}</div>
                </div>
              </td>
              <td>
                <strong>{{ emp.name }}</strong>
              </td>
              <td>{{ emp.education_degree }}</td>
              <!-- <td>{{ emp.position }}</td>  직책 -->
              <td>
                <span class="department-badge">{{ emp.department }}</span>
              </td>
              <!-- <td>{{ formatDate(emp.join_date) }}</td> -->
              <td>
                <div class="skills-container">
                  <span
                    v-for="(skill, i) in getTopSkills(emp.skills, 3)"
                    :key="i"
                    class="skill-badge"
                  >
                    {{ skill }}
                  </span>
                  <span
                    v-if="emp.skills && emp.skills.length > 3"
                    class="skill-more"
                    >+{{ emp.skills.length - 3 }}</span
                  >
                </div>
              </td>
              <td>
                <button class="view-button" @click="openModal(emp)">
                  상세보기
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 빈 상태 표시 (직원이 없을 경우) -->
        <div class="empty-state" v-if="employees.length === 0">
          <img
            src="https://via.placeholder.com/120?text=📄"
            alt="직원 없음"
            class="empty-icon"
          />
          <p class="info-text">등록된 신입사원이 없습니다.</p>
          <p class="info-desc">신입사원이 등록되면 이 곳에 표시됩니다.</p>
        </div>
      </div>

      <!-- 페이지네이션 컨트롤 -->
      <div class="pagination-controls" v-if="pagination.total_pages > 1">
        <button
          class="pagination-btn"
          :disabled="!pagination.has_prev"
          @click="fetchEmployees(pagination.page - 1)"
        >
          &lt; 이전
        </button>

        <div class="pagination-pages">
          <button
            v-for="p in displayedPages"
            :key="p"
            class="page-btn"
            :class="{ active: p === pagination.page }"
            @click="fetchEmployees(p)"
          >
            {{ p }}
          </button>
        </div>

        <button
          class="pagination-btn"
          :disabled="!pagination.has_next"
          @click="fetchEmployees(pagination.page + 1)"
        >
          다음 &gt;
        </button>
      </div>
    </div>

    <!-- 통계 섹션 추가 -->
    <div class="stats-section" v-if="employees.length > 0">
      <div class="section-header">
        <h3>부서별 현황 요약 📊</h3>
      </div>
      <div class="stats-cards">
        <div
          v-for="(count, dept) in departmentCounts"
          :key="dept"
          class="stat-card"
        >
          <div class="stat-icon">{{ getDepartmentIcon(dept) }}</div>
          <div class="stat-content">
            <div class="stat-value">{{ count }}</div>
            <div class="stat-label">{{ dept }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 상세보기 모달 -->
    <div v-if="selectedEmployee" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>📄 {{ selectedEmployee.name }}님의 상세 정보</h3>

        <div class="modal-section">
          <h4>기본 정보</h4>
          <p><strong>직책:</strong> {{ selectedEmployee.position }}</p>
          <p><strong>부서:</strong> {{ selectedEmployee.department }}</p>
          <p>
            <strong>입사일:</strong>
            {{ formatDate(selectedEmployee.join_date) }}
          </p>
        </div>

        <div class="modal-section">
          <h4>학력 정보</h4>
          <p><strong>학위:</strong> {{ selectedEmployee.education_degree }}</p>
          <p><strong>학교:</strong> {{ selectedEmployee.education_school }}</p>
          <p>
            <strong>졸업년도:</strong>
            {{ selectedEmployee.education_graduation_year }}
          </p>
        </div>

        <div class="modal-section">
          <h4>보유 스킬</h4>
          <div class="modal-skills">
            <span
              v-for="(skill, i) in selectedEmployee.skills || []"
              :key="i"
              class="skill-badge"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <div class="modal-section">
          <h4>프로젝트 이력</h4>
          <ul class="project-list">
            <li
              v-for="(project, i) in selectedEmployee.projects || []"
              :key="i"
            >
              {{ project }}
            </li>
          </ul>
        </div>

        <div class="modal-section">
          <h4>자격증</h4>
          <ul class="cert-list">
            <li
              v-for="(cert, i) in selectedEmployee.certifications || []"
              :key="i"
            >
              {{ cert }}
            </li>
          </ul>
        </div>

        <div class="modal-section">
          <h4>언어 능력</h4>
          <p>
            {{
              selectedEmployee.languages
                ? selectedEmployee.languages.join(", ")
                : "-"
            }}
          </p>
        </div>

        <div class="modal-section">
          <h4>프로필 요약</h4>
          <p>{{ selectedEmployee.profile_summary || "-" }}</p>
        </div>

        <button class="modal-close-btn" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import "@/assets/styles/AdminEmployees.css";

// 상태 관리
const selectedEmployee = ref(null);
const employees = ref([]);
const loading = ref(false);
const error = ref(null);

// 필터 상태 관리
const filters = ref({
  department: "",
  position: "",
});

// 페이지네이션 상태 관리
const pagination = ref({
  page: 1,
  size: 10,
  total: 0,
  total_pages: 0,
  has_next: false,
  has_prev: false,
});

// API 기본 URL
const API_BASE_URL = "http://localhost:8000/hr";

// 직원 데이터 가져오기
async function fetchEmployees(page = 1) {
  loading.value = true;
  error.value = null;

  try {
    // 페이지 설정
    pagination.value.page = page;

    // URL 파라미터 구성
    const params = new URLSearchParams();
    params.append("page", pagination.value.page);
    params.append("size", pagination.value.size);

    if (filters.value.department) {
      params.append("department", filters.value.department);
    }

    if (filters.value.position) {
      params.append("position", filters.value.position);
    }

    const response = await axios.get(`${API_BASE_URL}`, { params });

    // 데이터 및 페이지네이션 정보 업데이트
    employees.value = response.data.items || [];
    pagination.value.total = response.data.total || 0;
    pagination.value.total_pages = response.data.total_pages || 0;
    pagination.value.has_next = response.data.has_next || false;
    pagination.value.has_prev = response.data.has_prev || false;

    // 선택된 직원이 있으면 최신 데이터로 업데이트
    if (selectedEmployee.value) {
      const updatedEmployee = employees.value.find(
        (emp) => emp.id === selectedEmployee.value.id
      );
      if (updatedEmployee) {
        selectedEmployee.value = updatedEmployee;
      }
    }
  } catch (err) {
    console.error("직원 데이터를 가져오는 중 오류 발생:", err);
    error.value = "직원 데이터를 가져오는 중 오류가 발생했습니다.";
    employees.value = [];
  } finally {
    loading.value = false;
  }
}

// 부서 및 직책 목록 가져오기
const availableDepartments = ref([]);
const availablePositions = ref([]);

async function fetchFilterOptions() {
  try {
    // 임시 데이터 (실제로는 API에서 가져와야 함)
    availableDepartments.value = [
      "디자인팀",
      "인프라팀",
      "전략기획팀",
      "해외사업팀",
      "재무팀",
      "영업팀",
      "제품기획팀",
    ];
    availablePositions.value = [
      "UI 디자이너",
      "시스템 관리자",
      "신사업 기획자",
      "글로벌 파트너십 매니저",
      "자금 담당자",
      "리전 세일즈 매니저",
      "제품 기획자",
      "IT 운영 매니저",
      "예산 관리자",
      "혁신 전략가",
    ];
  } catch (err) {
    console.error("필터 옵션을 가져오는 중 오류 발생:", err);
  }
}

// 부서별 직원 수 계산
const departmentCounts = computed(() => {
  const counts = {};
  employees.value.forEach((emp) => {
    if (counts[emp.department]) {
      counts[emp.department]++;
    } else {
      counts[emp.department] = 1;
    }
  });
  return counts;
});

// 표시할 페이지 번호 계산 (최대 5개)
const displayedPages = computed(() => {
  const totalPages = pagination.value.total_pages;
  const currentPage = pagination.value.page;

  if (totalPages <= 5) {
    // 전체 페이지가 5개 이하면 모두 표시
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // 현재 페이지를 중심으로 최대 5개 페이지 표시
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = startPage + 4;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - 4, 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});

// 이름에서 첫 글자 가져오기 (프로필 이니셜용)
function getInitial(name) {
  return name ? name.charAt(0) : "";
}

// 상위 n개 스킬만 표시
function getTopSkills(skills, n) {
  return skills ? skills.slice(0, n) : [];
}

// 날짜 포맷 변환
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
}

// 부서별 아이콘 지정
function getDepartmentIcon(department) {
  const icons = {
    디자인팀: "🎨",
    개발팀: "💻",
    마케팅팀: "📢",
    인사팀: "👥",
    기획팀: "📋",
    영업팀: "🤝",
    인프라팀: "🌐",
    전략기획팀: "📊",
    해외사업팀: "🌍",
    재무팀: "💰",
    제품기획팀: "📱",
  };
  return icons[department] || "🏢";
}

function openModal(employee) {
  selectedEmployee.value = employee;
}

function closeModal() {
  selectedEmployee.value = null;
}

// 컴포넌트 마운트시 데이터 로드
onMounted(() => {
  fetchEmployees();
  fetchFilterOptions();
});
</script>

<style scoped>
/* 기존 CSS에 추가할 스타일 */
.department-badge {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.skill-badge {
  background-color: #e3f2fd;
  color: #1565c0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.skill-more {
  color: #666;
  font-size: 0.8rem;
  margin-left: 4px;
}

/* 모달 내부 스타일 */
.modal-content {
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
}

.modal-section {
  margin-bottom: 20px;
}

.modal-section h4 {
  margin-bottom: 10px;
  color: #1976d2;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 5px;
}

.modal-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.project-list,
.cert-list {
  margin: 0;
  padding-left: 20px;
}

.project-list li,
.cert-list li {
  margin-bottom: 5px;
}

/* 필터 스타일 */
.filter-section {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.filter-controls {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-control label {
  font-weight: 600;
  color: #555;
}

.filter-control select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: white;
  min-width: 150px;
}

/* 페이지네이션 스타일 */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  gap: 12px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.pagination-btn:not(:disabled):hover {
  background-color: #f5f5f5;
}

.pagination-pages {
  display: flex;
  gap: 8px;
}

.page-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn.active {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.page-btn:not(.active):hover {
  background-color: #f5f5f5;
}

/* 로딩 스타일 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 테이블 헤더 스타일 수정 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.per-page-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.per-page-selector select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
