import React,{useEffect, useState} from 'react';
import LoanDetail from '../../../components/Loan/LoanDetail';
import axios from 'axios';


const base_URL = import.meta.env.VITE_SERVER_URL;

const Ploandetail: React.FC = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    const [completedloans, setCompletedLoans] = useState([]);
    const childId = 34
    useEffect(() => {
        const fetchLoans = async () => {
          try {
            const response = await axios.get(base_URL + `/api/v1/loans/parent/history/${childId}`,{
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    return (
        <div>
            <h2 className='mt-20'>지난 대출</h2>
            {completedloans? (completedloans.map((loan, index) => (
                <LoanDetail key={index} loanId={loan.loanId} title={loan.title} amount={loan.amount} interestRate={loan.interestRate} period={loan.period} reason={loan.reason} state={loan.state}></LoanDetail>
                ))) : ('')}
        </div>
    )
};

export default Ploandetail;