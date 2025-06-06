import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from '../images/vote_logo.png';
import '../css/NavBar.css';

const Navbar = () => {
    const [endedAt, setEndedAt] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVotingStatus = async () => {
        try {
            const res = await fetch("http://192.168.56.101:8001/public/votingStatus");
            let data = await res.json();
            if (typeof data === "string") data = JSON.parse(data);

            if (data.initializedAt && data.durationMinutes) {
            const start = new Date(data.initializedAt);
            const end = new Date(start.getTime() + data.durationMinutes * 60000);
            setEndedAt(end);
            }
        } catch (error) {
            console.error("투표 종료 시간 불러오기 실패", error);
        }
        };

        fetchVotingStatus();
    }, []);

    const formatTimeLeft = (ms) => {
        const totalSec = Math.floor(ms / 1000);
        const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
        const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
        const secs = String(totalSec % 60).padStart(2, '0');
        return `${hrs}시간 ${mins}분 ${secs}초`;
    };

    const handleResultClick = (e) => {
        const now = new Date();
        if (!endedAt) {
        e.preventDefault();
        alert("투표 종료 시간을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        return;
        }

        if (now < endedAt) {
        e.preventDefault();
        const msLeft = endedAt.getTime() - now.getTime();
        const timeLeft = formatTimeLeft(msLeft);
        const endTimeStr = `${endedAt.getFullYear()}-${endedAt.getMonth() + 1}-${endedAt.getDate()} ${endedAt.getHours()}:${String(endedAt.getMinutes()).padStart(2, '0')}`;
        alert(`⚠️ 투표가 아직 종료되지 않았습니다.\n종료 예정 시각: ${endTimeStr}\n남은 시간: ${timeLeft}`);
        }
        // else: 정상 이동
    };

    return (
        <nav className="navbar">
        <div className="nav-logo">
            <Link to="/">
            <img src={logo} alt="logo" />
            </Link>
        </div>
        <div className="nav-links">
            <Link to="/Pledge">후보자 공약</Link>
            <Link to="/Voter">투표하기</Link>
            <Link to="/Result" onClick={handleResultClick}>투표결과</Link>
            <Link to="/Store">구매하기</Link>
        </div>
        </nav>
    );
};

export default Navbar;
