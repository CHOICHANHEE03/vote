import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from './frontend/component/NavBar';
import SignUp from './frontend/component/SignUp';
import SignUpList from './frontend/component/SignUpList'
import Main from './frontend/page/Main';
import Voter from './frontend/page/Voter';
import Vote from './frontend/page/Vote';
import API from '../src/frontend/page/API';
import Pledge from './frontend/page/Pledge';
import Store from './frontend/page/Store';
import Footer from './frontend/component/Footer'
import AdminLogin from './frontend/admin/AdminLogin';
import SystemInit from './frontend/admin/SystemInit';
import RegisterCandidate from './frontend/admin/RegisterCandidate';
import CandidateList from './frontend/admin/CandidateList';
import RealTime from './frontend/admin/RealTime';
import Products from './frontend/admin/Products';
import ProducksList from './frontend/admin/ProducksList';
import VoteResult from './frontend/admin/VoteResult';
import Result from './frontend/page/Result';





function App() {
  
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

const Layout = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");


  return (
    <>
      {!isAdminPath && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <API />
            <Main />
          </>
        } />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignUpList" element={<SignUpList />} />
        <Route path="/Voter" element={<Voter />} />
        <Route path="/Pledge" element={<Pledge />} />
        <Route path="/Vote" element={<Vote />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/Result" element={<Result />} />

        {/* 아래는 관리자 전용 페이지들 */}
        <Route path="/admin/AdminLogin" element={<AdminLogin />} />
        <Route path="/admin/SystemInit" element={<SystemInit />} />
        <Route path="/admin/RegisterCandidate" element={<RegisterCandidate />} />
        <Route path="/admin/CandidateList" element={<CandidateList />} />
        <Route path="/admin/RealTime" element={<RealTime />} />
        <Route path='/admin/Products' element={<Products />} />
        <Route path='/admin/ProductsList' element={<ProducksList />} />
        <Route path='/admin/VoteResult' element={<VoteResult />} />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
};


export default App;
