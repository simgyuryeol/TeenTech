import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Bot from '../Child/Bot/Bot';

// const base_URL = import.meta.env.VITE_SERVER_URL;
const Login: React.FC = () => {
    // const host_URL = base_URL;
    // const navigate = useNavigate();
    // const REST_API_KEY = 'bcc910424083e0bff90934f55e89a8ea'; // RestAPI 키
    // const REDIRECT_URI = base_URL + '/login2'; // redirect 주소
    // const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao'; // redirect 주소
    // const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
    const Backserver_URI = 'http://192.168.30.201:8080';
    const REDIRECT_URI = 'http://localhost:5173/oauth/redirect'; // redirect 주소
    const KAKAO_AUTH_URI = `${Backserver_URI}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
    // const KAKAO_AUTH_URI = `http://192.168.30.201:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:5173/oauth/redirect`;
    return (
        <div className=''>
            <h2>로그인페이지</h2>
            <div className=''>
                <Link to='/Main'><span>로그인</span></Link>
            </div>
            <div><Bot></Bot></div>

            <div className="fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden bg-white rounded-xl w-[70%] sm:w-[70%] md:w-[50%] lg:w-[30%]">
                <Link to={KAKAO_AUTH_URI}>
                    <img src='src/assets/kakao_login_large_narrow.png' width={'100%'} alt=''></img>
                </Link>
            </div>
        </div>
    )
};

export default Login;