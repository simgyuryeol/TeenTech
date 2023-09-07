import React from 'react';
import { Link } from 'react-router-dom';

const Main: React.FC = () => {
    return (
        <div>
        <h2>자식-메인</h2>
        <Link to='/AccountBook'><span>가계부</span></Link>
        <Link to='/Alba'><span>아르바이트</span></Link>
        <Link to='/Deposit'><span>예금</span></Link>
        <Link to='/Loan'><span>대출</span></Link>
        <Link to='/Quiz'><span>퀴즈</span></Link>
        <Link to='/Stock'><span>주식</span></Link>
        <Link to='/Lotto'><span>복권</span></Link>
        <Link to='/Bot'><span>틴구</span></Link>
        </div>
    )
};

export default Main;