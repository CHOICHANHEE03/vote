import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      clearTimeout(timeoutRef.current);
      navigate('/admin/AdminLogin');
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000); // 2초 내에 3번 클릭해야 이동
  };

  return (
    <footer className="footer" onClick={handleClick} style={{ cursor: 'pointer' }}>
      © 2025, Made by K-Digital Training 3기<br />
      Team: "삼삼오오" Members: 김석진, 이재희, 최찬희, 함영준
    </footer>
  );
};

export default Footer;