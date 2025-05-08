<template>
    <div class="top-navbar">
      <div class="left-section">
        <button class="menu-toggle" @click="$emit('toggle-sidebar')">
          <i class="fas fa-bars"></i>
        </button>
        <div class="page-title">
          <h1>대시보드</h1>
        </div>
      </div>
      
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="검색어를 입력하세요..." />
      </div>
      
      <div class="right-section">
        <div class="notifications">
          <button class="notification-btn">
            <i class="fas fa-bell"></i>
            <span class="badge">3</span>
          </button>
        </div>
        
        <div class="user-menu">
          <div class="user-greeting">안녕하세요, {{ userName }}님!</div>
          <div class="avatar">
            <img src="../assets/avatar.jpg" alt="프로필" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TopNavBar',
    props: {
      userName: {
        type: String,
        default: '사용자'
      }
    }
  }
  </script>
  
  <style scoped>
  .top-navbar {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
    background-color: var(--background-card);
    box-shadow: var(--shadow-sm);
  }
  
  .left-section {
    display: flex;
    align-items: center;
  }
  
  .menu-toggle {
    background: none;
    border: none;
    font-size: 1.2rem;
    margin-right: 20px;
    cursor: pointer;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background 0.3s ease;
  }
  
  .menu-toggle:hover {
    background-color: var(--primary-light);
  }
  
  .page-title h1 {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .search-bar {
    flex: 0 1 400px;
    position: relative;
    margin: 0 20px;
  }
  
  .search-bar i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
  }
  
  .search-bar input {
    width: 100%;
    height: 40px;
    padding: 0 15px 0 40px;
    border-radius: 20px;
    border: 1px solid #e0e0e0;
    background-color: var(--background-light);
    transition: all 0.3s ease;
  }
  
  .search-bar input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(165, 200, 225, 0.3);
  }
  
  .right-section {
    display: flex;
    align-items: center;
  }
  
  .notifications {
    margin-right: 20px;
    position: relative;
  }
  
  .notification-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .notification-btn:hover {
    background-color: var(--primary-light);
    color: var(--primary-dark);
  }
  
  .badge {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--accent-color);
    color: white;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .user-menu {
    display: flex;
    align-items: center;
  }
  
  .user-greeting {
    margin-right: 15px;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .user-menu .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--primary-color);
    cursor: pointer;
  }
  
  .user-menu .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>