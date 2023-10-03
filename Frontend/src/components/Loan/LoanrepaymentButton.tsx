import React, { useState, ReactNode } from 'react';
import Loanrepayment from './Loanrepayment';

interface LoanrepaymentButtonProps{
    loanId: number;
}

const LoanrepaymentButton: React.FC<LoanrepaymentButtonProps> = (props) => {

    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div className=''>
            <p onClick={() => handleOpen(1)} className=''>상환하기</p>
            {open === 1 && (
            <Loanrepayment loanId={props.loanId} closeModal={handleOpen}>
            </Loanrepayment>
             )}
        </div>
    )
};

export default LoanrepaymentButton;