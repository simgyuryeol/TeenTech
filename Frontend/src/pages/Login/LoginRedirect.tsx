import React,{ useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { Link, useNavigate } from 'react-router-dom';

// const base_URL = import.meta.env.VITE_SERVER_URL;

const Login2: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = new URL(window.location.href).searchParams.get('token');
        window.localStorage.setItem('accessToken', accessToken);
        // if (accessToken){
        //     navigate('../main');
        // }else{
        //     navigate('../');
        // }
    })
    return (
        <div className=''>
        <h2>로그인 리다이렉트 페이지</h2>
        </div>
    )
};

export default Login2;