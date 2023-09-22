import React from 'react';
import Modal from '../../../components/Common/Modal';
import DepositList from '../../../components/Deposit/DepositList';
import { Link } from 'react-router-dom';

const DepositJoinSuccess: React.FC = () => {
    return (
        <Modal>
            <div className="">
            <div className="p-4 flex flex-col items-center justify-center">
                <div className='flex justify-end w-full'>
                    <Link to='/deposit'>
                    <p className='mr-2 text-black'>x</p>
                    </Link>
                </div>
                <div className="text-center">
                    <div className='flex justify-center'>
                        <img src='src/assets/success.png' width={'30%'}></img>
                    </div>
                    <p className="mt-4">예금 상품에</p>
                    <p className="m-0 mb-10">성공적으로 가입했어요.</p>
                </div>
                <div className='w-[100%] border-2 rounded-lg'>
                    <div className='w-[100%]'>
                        <DepositList>
                            <div className="flex justify-around w-[100%] mt-1">
                                <p className='ml-5'>만기 지급액:</p>
                                <p className='mr-4'>100,000원</p>
                            </div>
                        </DepositList>
                    </div>
                </div>
                <Link to = '/deposit'>
                <div className='border-2 m-2 mt-4 p-2 rounded-md text-black'>확인</div>
                </Link>
            </div>
            </div>
        </Modal>
    )
};

export default DepositJoinSuccess;