import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../css/Result.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const VoteResult = () => {
    const [results, setResults] = useState(null);
    const [voteRate, setVoteRate] = useState(0);
    const [startedAt, setStartedAt] = useState("");
    const [endedAt, setEndedAt] = useState("");

    const formatDate = (dateObj) => {
        if (!(dateObj instanceof Date)) return "";
        return `${dateObj.getFullYear()}년 ${String(
        dateObj.getMonth() + 1
        ).padStart(2, "0")}월 ${String(dateObj.getDate()).padStart(
        2,
        "0"
        )}일 ${String(dateObj.getHours()).padStart(2, "0")}시 ${String(
        dateObj.getMinutes()
        ).padStart(2, "0")}분`;
    };

    useEffect(() => {
        const fetchVoteResults = async () => {
        try {
            const response = await fetch(
            "http://192.168.56.101:8001/public/votingStatus"
            );
            const raw = await response.text();
            const parsed = JSON.parse(raw);
            const data = typeof parsed === "string" ? JSON.parse(parsed) : parsed;

            if (data && Array.isArray(data.candidates)) {
            setResults(data.candidates);
            } else {
            console.warn("candidates가 배열이 아닙니다:", data.candidates);
            setResults([]);
            }

            if ("participationRate" in data) {
            const rate = parseFloat(data.participationRate.replace("%", ""));
            if (!isNaN(rate)) setVoteRate(rate);
            }

            if (data.initializedAt && data.durationMinutes) {
            const start = new Date(data.initializedAt);
            const end = new Date(start.getTime() + data.durationMinutes * 60000);
            setStartedAt(start);
            setEndedAt(end);
            }
        } catch (error) {
            console.error("투표 결과 불러오기 실패했습니다.:", error);
            setResults([]);
        }
        };

        fetchVoteResults();
    }, []);

    if (results === null) return <div>결과 불러오는 중...</div>;
    if (results.length === 0) return <div>표를 집계할 데이터가 없습니다.</div>;

    const labels = results.map((r) => `${r.id}번 ${r.name}`);
    const dataValues = results.map((r) => parseFloat(r.votePercentage));
    const backgroundColors = [
        "#FF3B30",
        "#007AFF",
        "#FFD60A",
        "#A2845E",
        "#9B59B6",
        "#BDC3C7",
    ];

    const data = {
        labels,
        datasets: [
        {
            data: dataValues,
            backgroundColor: backgroundColors,
            borderWidth: 1,
        },
        ],
    };

    const donutStyle = {
        background: `conic-gradient(#4caf50 ${voteRate}%, #ccc ${voteRate}% 100%)`,
        transition: "background 1s ease-in-out",
    };

    return (
        <div className="result-wrapper">
        <h1 className="result-main-title">투표 결과 현황</h1>

        <div className="result-graphs">
            <div className="result-graph">
            <div className="donut2" style={donutStyle}>
                <div className="donut2-center">
                <p className="circle2-title">실시간 투표율</p>
                <p className="circle2-percent">{voteRate.toFixed(2)}%</p>
                </div>
            </div>
            <div className="vote-times">
                <p>투표 시작일: {formatDate(startedAt)}</p>
                <p>투표 종료일: {formatDate(endedAt)}</p>
            </div>
            </div>

            <div className="result-graph">
            <div style={{ width: "100%", height: "200px" }}>
                <Doughnut
                data={data}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                        boxWidth: 12,
                        padding: 8,
                        },
                    },
                    },
                }}
                />
            </div>

            <div className="result-summary">
                {results.map((r, idx) => (
                <div key={idx}>
                    {idx + 1}위 : 기호 {r.id}번 {r.name} -{" "}
                    {r.voteCount.toLocaleString()}표 ({r.votePercentage})
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    );
};

export default VoteResult;
