import React, { useState } from 'react';
import '../css/Store.css';

// 상품 목록
const products = [
  { id: 1, name: '문화상품권', price: 1, image: '/images/문화상품권.jpg' },
  { id: 2, name: '영화관람권', price: 1, image: '/images/영화관람권.jpg' },
  { id: 3, name: '편의점상품권', price: 1, image: '/images/편의점상품권.jpg' },
  { id: 4, name: '배달앱금액권', price: 1, image: '/images/배달앱금액권.jpg' },
  { id: 5, name: '커피교환권', price: 1, image: '/images/커피교환권.jpg' },
  { id: 6, name: '보조배터리', price: 1, image: '/images/보조배터리.jpg' },
  { id: 7, name: '여행용세트', price: 1, image: '/images/여행용세트.jpg' },
  { id: 8, name: '기부', price: 1, image: '/images/기부.png' },
];

const voters = [
  { name: '김석진', rrn: '1234567' },
  { name: '이재희', rrn: '1234567' },
  { name: '최찬희', rrn: '1234567' },
  { name: '함영준', rrn: '1234567' },
  { name: '손흥민', rrn: '1111111' },
  { name: '카리나', rrn: '2222222' },
  { name: '고윤정', rrn: '3333333' },
  { name: '배수지', rrn: '4444444' },
  { name: '강호동', rrn: '5555555' },
  { name: '유재석', rrn: '6666666' },
];

const qrMap = {
  '문화상품권': '/images/문화상품권QR.png',
  '영화관람권': '/images/영화관람권QR.png',
  '편의점상품권': '/images/편의점상품권QR.png',
  '배달앱금액권': '/images/배달앱교환권QR.png',
  '커피교환권': '/images/커피교환권QR.png',
  '보조배터리': '/images/보조배터리QR.png',
  '여행용세트': '/images/여행용세트QR.png',
  '기부': '/images/기부QR.png',
};

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formName, setFormName] = useState('');
  const [formRrn, setFormRrn] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const openModal = (item) => {
    setSelected(item);
    setFormName('');
    setFormRrn('');
    setError('');
    setAuthenticated(false);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = () => {
    if (!formName.trim() || formRrn.length !== 7) {
      setError('이름과 정확한 주민번호 뒷자리 7자리를 입력하세요.');
      return;
    }
    const ok = voters.some(v => v.name === formName && v.rrn === formRrn);
    if (!ok) {
      setError('등록된 유권자가 아닙니다.');
      return;
    }
    setAuthenticated(true);
    setError('');
  };

  return (
    <div className="store-container">
      <h1 className="store-title">TOKEN STORE</h1>
      <div className="store-banner">
        <img src="/images/토큰 배너.png" alt="배너 이미지" />
      </div>
      <div className="product-grid">
        {products.map(item => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} className="product-image" />
            <div className="product-name">{item.name}</div>
            <div className="product-price">{item.price} Token</div>
            <button className="buy-button" onClick={() => openModal(item)}>
              구매하기
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selected.name} 구매</h2>

            {!authenticated ? (
              <>
                {error && <div className="modal-error">{error}</div>}
                <input
                  type="text"
                  placeholder="이름"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="주민번호 뒷자리 7자리"
                  maxLength={7}
                  value={formRrn}
                  onChange={e => setFormRrn(e.target.value)}
                />
                <div className="modal-buttons">
                  <button onClick={closeModal}>취소</button>
                  <button onClick={handleSubmit}>인증하기</button>
                </div>
              </>
            ) : (
              <>
                <p>구매되었습니다!</p>
                <img
                  src={qrMap[selected.name]}
                  alt="QR 코드"
                  className="qr-image"
                />
                <div className="modal-buttons">
                  <button onClick={closeModal}>닫기</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Store;
