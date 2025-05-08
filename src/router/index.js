// import { createRouter, createWebHistory } from 'vue-router'

// import Dashboard from './views/Dashboard.vue'
// import Chatbot from './views/Chatbot.vue'

// // 라우터 설정
// const routes = [
//     { path: '/', component: Dashboard },
//     { path: '/chatbot', component: Chatbot },
//   //   { path: '/meetings', component: Meetings },
//   ]
  
//   const router = createRouter({
//     history: createWebHistory(),
//     routes
//   })

// export default router;


import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Chatbot from '../views/Chatbot.vue';
import Meeting from '../views/Meeting.vue';

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

  // 다른 라우트 설정...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;