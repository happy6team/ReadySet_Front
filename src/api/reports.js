import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const fetchReportList = async () => {
  const res = await axios.get(`${API_BASE}/reports`);
  return res.data;
};

export const downloadReport = async (source) => {
    const encoded = encodeURIComponent(source.replace(/\\/g, '/')); // 역슬래시 → 슬래시 변경 후 인코딩
    const url = `${API_BASE}/reports/download?source=${encoded}`;
  
    const res = await axios.post(url, null, {
      responseType: 'blob',
    });
  
    // 파일 다운로드 처리
    const blob = new Blob([res.data], { type: res.headers['content-type'] });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
  
    // Content-Disposition 헤더에서 파일명 추출
    const disposition = res.headers['content-disposition'];
    const filenameMatch = disposition?.match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n]*)/i);
    const filename = filenameMatch ? decodeURIComponent(filenameMatch[1]) : 'downloaded.pdf';
  
    link.download = filename;
    link.click();
  };
  