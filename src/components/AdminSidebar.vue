<template>
    <div class="admin-sidebar">
      <h2>관리자 메뉴</h2>
      <ul>
        <li><router-link to="/admin-dashboard">📊 신입 매칭</router-link></li>
        <li><router-link to="/admin-employees">👥 신입 리스트</router-link></li>
        <li><router-link to="/admin-settings">⚙️ 시스템 설정</router-link></li>
      </ul>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .admin-sidebar {
    width: 250px;
    background-color: #0b2f52;
    color: white;
    padding: 20px;
    height: 100vh;
  }
  
  .admin-sidebar h2 {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  
  .admin-sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .admin-sidebar li {
    margin-bottom: 15px;
  }
  
  .admin-sidebar a {
    color: white;
    text-decoration: none;
  }
  
  .admin-sidebar a:hover {
    text-decoration: underline;
  }
  </style>
  