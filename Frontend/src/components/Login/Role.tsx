import React, {useState, useRef}  from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from "../Common/Modal";
import axios from 'axios';

interface RoleProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    closeModal: (value: any) => void;
  }

  const base_URL = import.meta.env.VITE_SERVER_URL;

  const Role: React.FC<RoleProps> = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('ROLE_PARENT');
    const rolehandle = (value) => {
            setRole(value)
    }
    const values = ['부모', '자녀'];
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPwChecked, setShowPwChecked] = useState(false)
    const passwordRef = useRef(null)
    const handleShowPwChecked = async () => {
        const password = await passwordRef.current
        if (password === null) return

        setShowPwChecked(!isShowPwChecked)
        if(!isShowPwChecked) {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    }

    const roledata = () => {
        axios
          .post(base_URL + `/api/v1/users/add-extra-information`, {
            role,
            name,
            password,
          })
          .then(response => {
            console.log(response.data.data);
            if (role === 'ROLE_PARENT'){
                navigate('../pmain')
            }
            else{
                navigate('../main')
            }
          })
          .catch(error => {
            console.log(role);
            console.log(name);
            console.log(password);
            console.log(error);
          });
      };

  return (
    <div className="overflow-hidden relative">
        <Modal>
        <div className='w-[95%]'>
            <h2 className="flex justify-center text-2xl mb-2">신규 유저 정보</h2>
            <div className='border border-gray-400 rounded-md pl-5 pr-5'>

            <div className="mt-4 flex">
              <label htmlFor="depositInterest" className="flex text-lg mr-6">
                사용 형태
              </label>
              <div className='flex justify-center'>
              <div className="flex items-center">
                {['ROLE_PARENT', 'ROLE_CHILD'].map((value, index) => (
                  <button
                  key={index}
                  id={`role${value}`}
                  name="role"
                  value={(value)}
                  onClick={() => rolehandle((value))}
                  className={`p-1 border-black mr-2 ${
                    role === (value) ? "bg-gray-700 text-white" : ""
                  }`}>
                    {`${values[index]}`}
                  </button>
                ))}
              </div>
              </div>
            </div>

            <div className='mt-2 pt-2 flex'>
                <label htmlFor='name' className='flex w-[100%] text-lg'>이름</label>
                <input className='border rounded-md flex text-center' type='text' id='name' placeholder='이름' value={name} onChange={e=> setName(e.target.value)} required/>
            </div>
            <div className='mt-2 pt-2 flex'>
                <label htmlFor='name' className='flex w-[100%] text-lg'>비밀번호</label>
                <input className='border rounded-md flex text-center' type="password" id="password" name="password" placeholder="비밀번호" value={password} ref={passwordRef} onChange={e=> setPassword(e.target.value)} required/>
            </div>
            <div className='flex flex-col mb-2'>
                <label className='flex'>
                <input className='flex' type='checkbox' onChange={handleShowPwChecked} />
                <span className='flex'>비밀번호 보기</span>
                </label>
            </div>
        </div>
        <div className='border rounded-md shadow-md mr-10 ml-10 mt-2 left-[10%] h-[5%]' style={{backgroundColor:'#ABC3D0'}}>
        <div className='flex justify-center m-2 text-black font-bold'  onClick={roledata}>정보 저장하기</div>
        </div>
        </div>
        </Modal>
    </div>
  );
};

export default Role;