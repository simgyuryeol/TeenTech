import React from 'react';
import Modal from '../../../components/Common/Modal';
import DepositList from '../../../components/Deposit/DepositList';

const DepositJoinSuccess: React.FC = () => {
    return (
        <Modal>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden bg-white rounded-xl  w-[70%] sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <div className="p-4 flex flex-col items-center justify-center">
                <div className='flex justify-end w-full'>
                    <p className='mr-2'>x</p>
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
                            <div className="flex justify-around w-[100%] mt-1 mb-4">
                                <p className='ml-5'>만기 지급액:</p>
                                <p className='mr-4'>100,000원</p>
                            </div>
                        </DepositList>
                    </div>
                </div>
                <div className='border-2 m-2 mt-4 p-2 rounded-md'>확인</div>
            </div>
            </div>
        </Modal>
    )
};

export default DepositJoinSuccess;