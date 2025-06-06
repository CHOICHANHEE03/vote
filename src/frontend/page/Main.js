import React, { useEffect, useState } from 'react';
import '../css/Main.css';

const bannerImages = [
  "/images/이준석 배너.png",
  "/images/이재명 배너.png",
  "/images/김문수 배너.png",
  "/images/권영국 배너.png",
  "/images/황교안 배너.png",
  "/images/송진호 배너.png"
];

const candidates = [
  { id: 1, name: "이재명", number: 1, image: "/images/이재명프로필.png" },
  { id: 2, name: "김문수", number: 2, image: "/images/김문수프로필.png" },
  { id: 4, name: "이준석", number: 4, image: "/images/이준석프로필.png" },
  { id: 5, name: "권영국", number: 5, image: "/images/권영국프로필.png" },
  { id: 7, name: "황교안", number: 7, image: "/images/황교안프로필.png" },
  { id: 8, name: "송진호", number: 8, image: "/images/송진호프로필.png" }
];

function Main() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [voteRate, setVoteRate] = useState(0);
const [startedAt, setStartedAt] = useState('');
const [endedAt, setEndedAt] = useState('');

const formatDate = (dateObj) => {
  if (!(dateObj instanceof Date)) return '';
  return `${dateObj.getFullYear()}년 ${String(dateObj.getMonth() + 1).padStart(2, '0')}월 ${String(dateObj.getDate()).padStart(2, '0')}일 ${String(dateObj.getHours()).padStart(2, '0')}시 ${String(dateObj.getMinutes()).padStart(2, '0')}분`;
};

useEffect(() => {
  const fetchVoteRate = async () => {
    try {
      const response = await fetch("http://192.168.56.101:8001/public/votingStatus", {
        method: 'GET',
        headers: { 'Cache-Control': 'no-cache' }
      });

      let data = await response.json();

      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      console.log("✅ 투표율 응답 데이터:", data);

      if (data && typeof data === 'object') {
        if ('participationRate' in data) {
          const rate = parseFloat(data.participationRate.replace('%', ''));
          if (!isNaN(rate)) setVoteRate(rate);
        }

        if (data.initializedAt && data.durationMinutes) {
          const start = new Date(data.initializedAt);
          const end = new Date(start.getTime() + data.durationMinutes * 60000);
          setStartedAt(start);
          setEndedAt(end);
        }
      }
    } catch (error) {
      console.error("실시간 투표율 불러오기 실패:", error);
    }
  };

  fetchVoteRate();
  const interval = setInterval(fetchVoteRate, 10000);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const slider = setInterval(() => {
    setCurrentBanner(prev => (prev + 1) % bannerImages.length);
  }, 3000); // 3초마다 넘김

  return () => clearInterval(slider);
}, []);

  const donutStyle = {
    background: `conic-gradient(#4caf50 ${voteRate}%, #ccc ${voteRate}% 100%)`,
    transition: 'background 1s ease-in-out'
  };

  return (
    <div className="main-container">
      <div className="banner">
        <img src={bannerImages[currentBanner]} alt="배너" className="banner-img" />
      </div>

      <h2 className="section-title">21대 대통령 선거 후보자</h2>

      <div className="candidate-grid-wrapper">
        <div className="candidate-grid">
          {candidates.map((c) => (
            <div key={c.id} className="candidate-wrapper">
              <div className="candidate-card">
                <div className="image-box">
                  <img src={c.image} alt={`${c.name} 후보자`} />
                </div>
                <div className="text-box">
                  기호 {c.number}번 {c.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="vote-box">
        <div className="vote-info">
          <p>투표 시작일: {formatDate(startedAt)}</p>
          <p>투표 종료일: {formatDate(endedAt)}</p>
        </div>
        <div className="vote-chart">
          <div className="donut" style={donutStyle}>
            <div className="donut-center">
              <p className="circle-title">실시간 투표율</p>
              <p className="circle-percent">{voteRate.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
