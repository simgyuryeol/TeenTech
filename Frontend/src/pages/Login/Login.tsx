import React from 'react';
import { Link } from 'react-router-dom';
// import Bot from '../Child/Bot/Bot';
import kakaoImg from "../../assets/kakao_login_large_narrow.png"
import teentech from "../../assets/Teen-Tech2.mp4"

const base_URL = import.meta.env.VITE_SERVER_URL;
const Login: React.FC = () => {
    // const Backserver_URI = 'http://192.168.30.201:8080';
    const Backserver_URI = base_URL;
    const REDIRECT_URI = 'https://j9e207.p.ssafy.io/oauth/redirect'; // redirect 주소
    // const REDIRECT_URI = `${base_URL}/oauth/redirect`; // redirect 주소
    const KAKAO_AUTH_URI = `${Backserver_URI}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
    // const KAKAO_AUTH_URI = `http://192.168.30.201:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:5173/oauth/redirect`;
    // const KAKAO_AUTH_URI = "http://j9e207.p.ssafy.io/oauth2/authorization/kakao?redirect_uri=http://localhost:5173/oauth/redirect";
    return (
        <div className='w-[100vw] h-[100vh]' style={{backgroundColor:'#B6DBEE'}}>
            <div className='p-[50px]'></div>
            <div className='flex justify-center ml-[10%] w-[80vw] h-[50vh]'>
                <video muted autoPlay>
                    <source src={teentech} type='video/mp4' width={'100%'} height={'100vh'}/>
                </video>
            </div>
            <div className=''>
                {/* <Link to='/Main'><span>로그인</span></Link> */}
            </div>
            <div className="fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-xl w-[70%] sm:w-[70%] md:w-[50%] lg:w-[30%]">
                <Link to={KAKAO_AUTH_URI}>
                    <img src={kakaoImg} width={'100%'} alt=''></img>
                </Link>
            </div>
            {/* <div className='flex items-end h-[30%]'><Bot /></div> */}
        </div>
    )
};

export default Login;
