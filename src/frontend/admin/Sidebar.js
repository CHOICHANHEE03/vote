import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/Sidebar.css';

const Sidebar = ({ selected }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { key: 'system', label: '시스템 초기화', icon: '⚙️', path: '/admin/SystemInit'},
        { key: 'register', label: '후보자 등록', icon: '👤', path: '/admin/RegisterCandidate'},
        { key: 'list', label: '후보자 목록 조회', icon: '📄', path: '/admin/CandidateList'},
        { key: 'status', label: '투표 현황 조회', icon: '🔍', path: '/admin/RealTime'},
        { key: 'voteResult', label: '결과 조회', icon: '📊', path: '/admin/voteResult'},
        { key: 'product', label: '상품 등록', icon: '🛒',  path: '/admin/Products'},
        { key: 'productsList', label: '상품 목록 조회', icon: '📄',  path: '/admin/ProductsList'}
    ];

    return (
        <div className="sidebar">
        <div
            className="sidebar-title"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
        >
            관리자
        </div>
        {menuItems.map(item => (
            <div
            key={item.key}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
            </div>
        ))}
        </div>
    );
};

export default Sidebar;
