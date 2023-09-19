import React from "react";

const Mypage: React.FC = () => {
  return (
    <div className="pt-24">
      <section>
        <div>인증코드</div>
        <input placeholder="인증코드" style={{ borderRadius: "15px" }}></input>
      </section>
      <section>
        <div>틴구사진</div>
        <button>틴구변경</button>
      </section>
    </div>
  );
};

export default Mypage;
