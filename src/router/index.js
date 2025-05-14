import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Chatbot from '../views/Chatbot.vue';
import Meeting from '../views/Meeting.vue';
import ReportView from '../views/ReportView.vue';
import Startpage from '../views/Startpage.vue';
import AdminLogin from '../views/AdminLogin.vue';


const routes = [
  {
    path: '/',
    name: 'startpage',
    component: Startpage,
    meta: { hideSidebar: true }
  },
  {
    path: '/dashboard',
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
    path: '/reports',             
    name: 'ReportView',
    component: ReportView
  },
  { path: '/admin-login', 
    name: 'AdminLogin', 
    component: AdminLogin,
    meta: { hideSidebar: true } 
  },

  // 다른 라우트 설정...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;