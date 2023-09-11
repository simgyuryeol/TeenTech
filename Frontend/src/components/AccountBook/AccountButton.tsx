import React from "react";
import { Link } from "react-router-dom";

const AccountBotton: React.FC = () => { 
    return (
        <div style={{display:"flex", justifyContent:"flex-end"}}>
            <Link to='/AccountBookAdd' style={{marginRight:'10px'}}>가계부 수정</Link>
            <Link to='/AccountBookAdd'>가계부 쓰기</Link>
        </div>
    )
}

export default AccountBotton;