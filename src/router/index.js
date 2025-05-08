import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Chatbot from '../views/Chatbot.vue';
import Meeting from '../views/Meeting.vue';
import ReportView from '../views/ReportView.vue';


const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/chatbot',
    name: 'Chatbot',
    component: Chatbot
  },
  { path: '/meeting', 
    name: 'Meeting', 
    component: Meeting 
  },
  {
    path: '/documents',             
    name: 'Documents',
    component: ReportView
  },

  // 다른 라우트 설정...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;