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
        <h3>부서 선택 및 매칭 🔄</h3>
      </div>

      <div class="match-controls">
        <select
          v-model="selectedDepartment"
          class="department-select"
          :disabled="isLoading"
        >
          <option disabled value="">부서를 선택하세요</option>
          <option v-for="dept in departments" :key="dept">{{ dept }}</option>
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
              <span class="employee-badge">{{ currentEmployee.major }}</span>
            </div>
          </div>

          <div class="employee-content">
            <div class="employee-details">
              <div class="detail-row">
                <div class="detail-label">성격</div>
                <div class="detail-value">
                  {{ currentEmployee.personality }}
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-label">희망 부서</div>
                <div class="detail-value">{{ currentEmployee.preference }}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">이력서</div>
                <div class="detail-value">{{ currentEmployee.resume }}</div>
              </div>
            </div>

            <div class="reason-section">
              <h4>선정 이유</h4>
              <p>{{ currentEmployee.reason }}</p>
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
          <p class="info-text">부서를 선택하고 매칭을 시작해보세요.</p>
          <p class="info-desc">
            부서 특성과 신입사원의 역량을 고려한 최적의 매칭 결과를 확인할 수
            있습니다.
          </p>
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

// 부서 목록
const departments = ref([]);
//const departments = ['데이터 분석팀', 'AI 개발팀', '백엔드 팀', '프론트엔드 팀', '스마트팜 운영팀', 'IoT 센서팀']

// 선택된 부서
const selectedDepartment = ref("");

// 매칭된 신입사원 목록
const matchedEmployees = ref([]);

// 현재 보고 있는 카드 인덱스
const currentIndex = ref(0);

// 현재 신입사원 정보
const currentEmployee = computed(
  () => matchedEmployees.value[currentIndex.value] || {}
);

// 이름에서 첫 글자 가져오기 (프로필 이니셜용)
function getInitial(name) {
  return name ? name.charAt(0) : "";
}

// 부서 목록 가져오기
async function fetchDepartments() {
  console.log("호출을 하긴하는거지");
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:8000/hr/projects");
    if (response.data && response.data.projects) {
      departments.value = response.data.projects;
    } else {
      console.error("API 응답 형식이 다릅니다:", response.data);
      // 기본 부서 목록 (API 실패 시 폴백)
      departments.value = [
        "데이터 분석팀",
        "AI 개발팀",
        "백엔드 팀",
        "프론트엔드 팀",
        "스마트팜 운영팀",
        "IoT 센서팀",
      ];
    }
  } catch (error) {
    console.error("부서 목록을 가져오는 중 오류 발생:", error);
    // 기본 부서 목록 (API 실패 시 폴백)
    departments.value = [
      "데이터 분석팀",
      "AI 개발팀",
      "백엔드 팀",
      "프론트엔드 팀",
      "스마트팜 운영팀",
      "IoT 센서팀",
    ];
  } finally {
    isLoading.value = false;
  }
}

function matchEmployees() {
  if (!selectedDepartment.value) {
    alert("부서를 선택해주세요!");
    return;
  }

  // 더미 데이터 - 실제로는 API 호출로 대체될 예정
  const dummyData = {
    "AI 개발팀": [
      {
        name: "김다은",
        major: "컴퓨터공학",
        personality: "성실하고 꼼꼼함, 새로운 기술에 대한 호기심이 많음",
        preference: "AI 개발팀",
        resume: "딥러닝 프로젝트 3건, 자연어 처리 연구 경험",
        reason:
          "딥러닝 프로젝트 경험이 풍부하고 희망 부서와 일치함. 꼼꼼한 성격으로 AI 모델 검증에 적합함.",
      },
      {
        name: "박준호",
        major: "인공지능학",
        personality: "창의적이고 도전적인 문제 해결을 즐김",
        preference: "AI 개발팀",
        resume: "컴퓨터 비전 관련 논문 발표, 스마트 농업 AI 프로젝트 참여",
        reason:
          "스마트팜 관련 AI 프로젝트 경험이 있어 도메인 이해도가 높고, 연구 역량이 뛰어남.",
      },
      {
        name: "이소현",
        major: "데이터사이언스",
        personality: "분석적이고 논리적인 사고, 팀워크 중시",
        preference: "데이터 분석팀",
        resume: "머신러닝 모델 개발 경험, 데이터 시각화 프로젝트 다수",
        reason:
          "AI 모델 개발과 데이터 처리 능력이 뛰어나 생육 환경 최적화 알고리즘 개발에 적합함.",
      },
    ],
    "데이터 분석팀": [
      {
        name: "이재웅",
        major: "산업공학",
        personality: "분석적 사고가 뛰어나며 체계적인 문제 해결 능력",
        preference: "데이터 분석팀",
        resume: "대용량 공정 데이터 분석 경험, 통계 모델링 프로젝트",
        reason:
          "공정 데이터 분석 경험이 있어 스마트팜 데이터 분석에 바로 투입 가능함.",
      },
      {
        name: "최유진",
        major: "통계학",
        personality: "꼼꼼하고 끈기 있는 태도, 데이터 시각화에 관심이 많음",
        preference: "데이터 분석팀",
        resume: "농업 데이터 분석 인턴, R과 Python 활용 능력 우수",
        reason:
          "농업 데이터 분석 경험이 있어 도메인 지식이 있으며, 뛰어난 통계 역량 보유.",
      },
    ],
    "백엔드 팀": [
      {
        name: "홍길동",
        major: "소프트웨어공학",
        personality: "논리적이고 문제해결 지향적",
        preference: "백엔드 팀",
        resume: "Spring Boot 기반 API 개발, MSA 아키텍처 설계 경험",
        reason:
          "백엔드 개발 경험이 풍부하며 MSA 아키텍처 지식이 있어 확장 가능한 시스템 구축에 적합함.",
      },
      {
        name: "정민우",
        major: "컴퓨터공학",
        personality: "책임감이 강하고 꼼꼼함",
        preference: "프론트엔드 팀",
        resume: "Node.js, MongoDB, AWS 활용한 서버 구축 경험",
        reason:
          "클라우드 서비스 경험이 있어 스마트팜 시스템의 안정적인 운영에 기여할 수 있음.",
      },
    ],
    "프론트엔드 팀": [
      {
        name: "김지은",
        major: "시각디자인",
        personality: "창의적이고 사용자 중심적 사고",
        preference: "프론트엔드 팀",
        resume: "Vue.js, React 프레임워크 활용한 대시보드 개발 경험",
        reason: "대시보드 개발 경험이 있어 스마트팜 모니터링 UI 개발에 적합함.",
      },
      {
        name: "이태영",
        major: "컴퓨터공학",
        personality: "세심하고 디테일 지향적",
        preference: "프론트엔드 팀",
        resume: "UX/UI 디자인 경험, JavaScript 프레임워크 능숙",
        reason:
          "UX 디자인 경험으로 사용자 친화적인 인터페이스 개발에 기여할 수 있음.",
      },
    ],
    "스마트팜 운영팀": [
      {
        name: "송미라",
        major: "농업생명공학",
        personality: "책임감이 강하고 현장 중심적 사고",
        preference: "스마트팜 운영팀",
        resume: "스마트팜 인턴십, 식물 생육 모니터링 연구",
        reason: "농업 도메인 지식과 스마트팜 경험을 갖춰 운영 최적화에 적합함.",
      },
      {
        name: "강동훈",
        major: "환경공학",
        personality: "실용적이고 문제 해결 능력이 뛰어남",
        preference: "IoT 센서팀",
        resume: "환경 센서 네트워크 구축 프로젝트 참여",
        reason:
          "환경 센서 경험이 있어 스마트팜 운영에 필요한 데이터 수집 체계 구축에 도움이 됨.",
      },
    ],
    "IoT 센서팀": [
      {
        name: "박상현",
        major: "전자공학",
        personality: "기술적 호기심이 많고 꼼꼼함",
        preference: "IoT 센서팀",
        resume: "아두이노 기반 센서 네트워크 개발, LoRa 통신 활용 프로젝트",
        reason:
          "센서 네트워크 개발 경험이 있어 스마트팜 센서 시스템 구축에 즉시 기여 가능함.",
      },
      {
        name: "임정훈",
        major: "임베디드시스템",
        personality: "분석적이고 효율성 중시",
        preference: "IoT 센서팀",
        resume: "저전력 센서 네트워크 설계, 원격 모니터링 시스템 개발",
        reason:
          "저전력 센서 네트워크 설계 경험으로 효율적인 모니터링 시스템 구축에 적합함.",
      },
    ],
  };

  // 선택한 부서에 맞는 신입사원 목록 가져오기
  matchedEmployees.value = dummyData[selectedDepartment.value] || [];
  currentIndex.value = 0;
}

function nextEmployee() {
  if (currentIndex.value < matchedEmployees.value.length - 1) {
    currentIndex.value += 1;
  } else {
    alert("마지막 신입사원입니다.");
  }
}

function prevEmployee() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
}

// 컴포넌트 마운트 시 부서 목록 가져오기
onMounted(() => {
  fetchDepartments();
});
</script>
