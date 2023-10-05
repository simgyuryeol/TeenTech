import React, {useState, useEffect}  from 'react';
import LoanDetail from '../../../components/Loan/LoanDetail';
// import LoanReview from '../../../components/Loan/LoanReview';
import axios from 'axios';


const base_URL = import.meta.env.VITE_SERVER_URL;
const accessToken = window.localStorage.getItem('accessToken')

const LoanCompleted: React.FC = () => {
    const [completedloans, setCompletedLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
          try {
            const response = await axios.get(base_URL + `/api/v1/loans/child/history`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                 }
            });
            console.log(response.data.data);
            setCompletedLoans(response.data.data);
          } catch (error) {
            console.log(error);
          }
        };
        // Creditdata();
        fetchLoans();
      }, []);

    return (
        <div className='mt-20'  style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f6f6f6" }}>
        <h2 className="fixed inset-x-0 top-10 z-50 left-0">지난 대출</h2>
        {completedloans.length > 0? (
          completedloans.map((loan, index) => (
                <LoanDetail key={index} loanId={loan.loanId} title={loan.title} amount={loan.amount} interestRate={loan.interestRate} period={loan.period} reason={loan.reason} state={loan.state}></LoanDetail>
                ))) : (<div className="flex justify-center items-center h-full">
                <p className="text-gray-500">대출정보가 없습니다.</p>
              </div>)}
        </div>
    )
};

export default LoanCompleted;