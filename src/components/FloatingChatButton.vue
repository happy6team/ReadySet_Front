<template>
    <button class="floating-chat-btn" @click="$emit('click')">
      <i class="fas fa-comment-dots"></i>
      <span>AI 챗봇</span>
    </button>
  </template>
  
  <script>
  export default {
    name: 'FloatingChatButton'
  }
  </script>
  
  <style scoped>
  .floating-chat-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: auto;
    height: 55px;
    border-radius: 30px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 99;
    transition: all 0.3s ease;
  }
  
  .floating-chat-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  .floating-chat-btn i {
    font-size: 1.5rem;
    margin-right: 10px;
  }
  
  .floating-chat-btn span {
    font-weight: 600;
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    .floating-chat-btn {
      width: 55px;
      padding: 0;
    }
    
    .floating-chat-btn span {
      display: none;
    }
    
    .floating-chat-btn i {
      margin-right: 0;
    }
  }
  </style>