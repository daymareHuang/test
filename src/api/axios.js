// src/api/axios.js

import axios from 'axios';

// 創建 axios 實例
const instance = axios.create({
    baseURL: 'http://localhost:8000/api/', // 根據你的後端 API 地址調整
    timeout: 10000, // 設定請求超時時間（10秒）
});

// 在每個請求中附加 Authorization 標頭
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // 從 localStorage 獲取 JWT token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // 設置 Authorization 標頭
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
