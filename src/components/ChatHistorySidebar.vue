<template>
    <div class="chat-sidebar">
      <h3>대화 기록</h3>
      <div
        v-for="(history, index) in chatHistories"
        :key="index"
        class="chat-history-item"
      >
        <strong>{{ history.query }}</strong>
        <p>{{ history.messages[1]?.content || '응답 없음' }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const chatHistories = ref([])
  
  const fetchChatHistories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/chat/histories')
      chatHistories.value = res.data.histories
    } catch (err) {
      console.error('대화 기록 불러오기 실패', err)
    }
  }
  
  defineExpose({ fetchChatHistories, chatHistories }) // 외부에서 접근 가능하도록
  </script>
  
  <style scoped>
  .chat-sidebar {
    width: 300px;
    background-color: white;
    padding: 1rem;
    border-left: 1px solid #ccc;
  }
  .chat-history-item {
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  </style>
  