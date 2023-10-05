import React, {useState, useEffect}  from 'react';
import LoanStatus from '../../../components/Loan/LoanStatus';
import LoanReview from '../../../components/Loan/LoanReview';
// import LoanList from '../../../components/Loan/LoanList';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue,} from 'recoil';
import { childIdAtom } from '../../../recoil/childIdAtom';

const base_URL = import.meta.env.VITE_SERVER_URL;
const accessToken = window.localStorage.getItem('accessToken')

interface Loan {
    totalInProgressLoanCount: number;
    totalLoanBalance: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inProgressLoanList: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    applyLoanList: any[];
    loanLimitation: number;
  }

const Ploan: React.FC = () => {
    const [loans, setLoans] = useState<Partial<Loan>>({});
    const childId= useRecoilValue(childIdAtom).id
    const totalInProgressLoanCount = loans.totalInProgressLoanCount;
    const totalLoanBalance = loans.totalLoanBalance;
    const loanList = loans.inProgressLoanList;
    const applyloanList = loans.applyLoanList;
    const LoanLimitation = loans.loanLimitation;

    useEffect(() => {
        const fetchLoans = async () => {
          try {
            const response = await axios.get(base_URL + `/api/v1/loans/parent/summary/${childId}`,{
              headers: {
                Authorization: `Bearer ${accessToken}`,
             }
            });
            console.log(response.data.data);
            setLoans(response.data.data);
            console.log(response.data.data.inProgressLoanList)
            console.log(response.data.data.applyLoanList)
          } catch (error) {
            console.log(error);
          }
        };
        // Creditdata();
        fetchLoans();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div>
            <h2 className='mt-10'>부모 대출 페이지</h2>
            <div className='mt-2 mb-2 flex flex-col'>
                <LoanStatus totalInProgressLoanCount={totalInProgressLoanCount} totalLoanBalance={totalLoanBalance} loanLimitation={LoanLimitation}>
                    
                </LoanStatus>
                <Link to='/ploandetail'>
                    <p className='mt-2 mr-6 text-xs flex justify-end'>지난 대출 보기</p>
                </Link>
            </div>
            <hr className='border-2'></hr>
            <div>
                <p className='text-3xl'>대출 신청서</p>
                {applyloanList? (applyloanList.map((loan, index) => (
                <LoanReview key={index} loanId={loan.loanId} title={loan.title} amount={loan.amount} interestRate={loan.interestRate} period={loan.period} reason={loan.reason}></LoanReview>
                ))) : (<div className="flex justify-center items-center h-full">
                <p className="text-gray-500">대출 신청이 없습니다.</p>
              </div>)}
            </div>
            <hr className='border-2'></hr>
            <div>
                <p className='text-3xl'>대출 리스트</p>
                {loanList? (loanList.map((loan, index)=>(
                    <div key={index} className='border w-[90%] ml-[5%] p-4 bg-white rounded-md shadow-md flex flex-col items-start mb-1'>
                        {/* 상태: 대출중 */}
                    <div>대출명: {loan.title}</div>
                      <div>대출금액: {loan.initialBalance.toLocaleString()}원 (원금{loan.amount.toLocaleString()}원+이자{loan.initialBalance - loan.amount}원)</div>
                    <div>남은 상환 금액: { loan.lastBalance}</div>
                    {/* <div>{loan.loanId}</div> */}
                    <div>만료일: {loan.maturityDate}</div>
                    </div>
                ))):(<div className="flex justify-center items-center h-full">
                <p className="text-gray-500">진행중인 대출이 없습니다.</p>
              </div>)}
                {/* {loanList? (loanList.map((loan, index)=>(
                    <LoanList children={undefined} children2={undefined} ></LoanList>
                ))):('')} */}
            </div>
        </div>
    )
};

export default Ploan;