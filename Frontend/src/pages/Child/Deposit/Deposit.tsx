import React from 'react';
import Credit from '../../../components/Credit';
import { Link } from 'react-router-dom';

const Deposit: React.FC = () => {
    return (
        <div>
        <h2 className="fixed inset-x-0 top-10 z-50 left-0">자식 예금</h2>
        <div>
        <Credit></Credit>
        </div>
        <div className='border'>n등급을 위한 예금 금리 ~%</div>

        <div>가입한 예금 상품
            <Link to='/DepositDetail'>
            <div>예금 상품1</div>
            </Link>
            <div>예금 상품1</div>
        </div>
        <Link to="/DepositJoinDetail">
        <div>예금 가입하기</div>
        </Link>
        </div>
    )
};

export default Deposit;