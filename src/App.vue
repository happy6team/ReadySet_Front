<template>
  <div class="app-container">
    <!-- 사이드바 조건부 렌더링 -->
    <template v-if="!hideSidebar">
      <AdminSidebar v-if="isAdminRoute" />
      <SideBar 
        v-else 
        :isOpen="sidebarOpen" 
        @toggle="toggleSidebar" 
      />
    </template>

    <div 
      class="main-content" 
      :class="{ 
        'sidebar-open': sidebarOpen && !isAdminRoute && !hideSidebar,
        'full-width': hideSidebar 
      }"
    >
      <router-view />
    </div>
  </div>
</template>



<script>
import SideBar from './components/SideBar.vue';
import AdminSidebar from './components/AdminSidebar.vue';

export default {
  name: 'App',
  components: {
    SideBar,
    AdminSidebar
  },
  data() {
    return {
      sidebarOpen: true,
      userName: '김신입'
    };
  },
  computed: {
    isAdminRoute() {
      // admin-login은 제외, admin-dashboard 등만 해당
      return this.$route.path.startsWith('/admin') && this.$route.path !== '/admin-login';
    },
    hideSidebar() {
      // startpage와 admin-login에서는 사이드바를 숨김
      return this.$route.path === '/' || this.$route.path === '/admin-login';
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  }
}
</script>

<style>
:root {
  --primary-color: #a5c8e1; /* 파스텔 블루 */
  --primary-light: #f7d8d4;
  --primary-dark: #7aa7c7;
  --accent-color: #f5a5a5; /* 보완색 */
  --text-primary: #333333;
  --text-secondary: #666666;
  --background-light: #f8fafc;
  --background-card: #ffffff;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
}

body {
  background-color: var(--background-light);
  color: var(--text-primary);
}

.app-container {
  display: flex;
  min-height: 100vh;
  align-items: stretch;
}

.main-content {
  flex: 1;
  padding: 0;
  transition: margin-left 0.3s ease;
  margin-left: 250px;
}

.main-content.sidebar-open {
  margin-left: 250px;
}

/* 사이드바 없을 때 전체 너비 사용하도록 추가 */
.main-content.full-width {
  margin-left: 0;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .main-content.sidebar-open {
    margin-left: 250px;
  }
}
</style>