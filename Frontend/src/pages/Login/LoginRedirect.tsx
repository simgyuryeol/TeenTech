import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import base64 from 'base-64';
import Role from '../../components/Login/Role';

// const base_URL = import.meta.env.VITE_SERVER_URL;

const Login2: React.FC = () => {
    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const [payload, Setpayload] = useState('');
    const targetKey = 'auth';
    const regex = new RegExp(`"${targetKey}":"([^"]+)"`);
    const match = payload.match(regex);
    const auth = match ? match[1] : '';
    const navigate = useNavigate();
    
    useEffect(() => {
        const accessToken = new URL(window.location.href).searchParams.get('token');
        window.localStorage.setItem('accessToken', accessToken);
        const payload = accessToken.substring(accessToken.indexOf('.')+1, accessToken.lastIndexOf('.'));
        const dec = base64.decode(payload);
        Setpayload(dec)
        if (auth === 'ROLE_USER'){
            handleOpen(1)
        }
        else if (auth === 'ROLE_PARENT'){
            navigate('../Pmain');
        }else if (auth === 'ROLE_CHILD'){
            navigate('../main');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])
    return (
        <div className=''>
        <h2>로그인 리다이렉트 페이지</h2>
        <div>{auth}</div>
        <Link to='/'>홈으로</Link>
        {open === 1 && <Role closeModal={handleOpen} ></Role>}
        </div>
    )
};

export default Login2;