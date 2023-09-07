import React from 'react';
import { Link } from 'react-router-dom';


const Login: React.FC = () => {
    return (
        <div>

        <h2>로그인페이지</h2>
        <Link to='/Main'><span>로그인</span></Link>
        </div>
    )
};

export default Login;