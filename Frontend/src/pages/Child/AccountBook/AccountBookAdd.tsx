import React, { useState, useEffect } from 'react';

const Data = [
    {
        case1: '마트',
        case2: '씨유',
        case3: -2000,
        case4: '욕구'
    },
    {
        case1: '퀴즈',
        case2: '퀴즈용돈',
        case3: 1000,
        case4: '수입'
    },
    {
        case1: '음료',
        case2: '할리스',
        case3: -5500,
        case4: '욕구'
    }
]

const Data2 = [
    { 
        q1: '학교 준비물이에요',
        point:1
    },
    { 
        q1: '배가 너무 고팠어요',
        point:1
    },
    { 
        q1: '배는 안고픈데 먹고싶었어요',
        point:2
    },
    { 
        q1: '친구 선물이에요',
        point:1
    },
    { 
        q1: '멋져서 / 예뻐서 샀어요',
        point:2
    },
    { 
        q1: '필요한데 없어서 샀어요',
        point:1
    },
]

const AccountBookAdd: React.FC = () => {
    const [priceSum, setPriceSum] = useState(0);

    useEffect(() => {
        const sum = Data.reduce((acc, item) => acc + item.case3, 0);
        setPriceSum(sum);
    }, []);

    return (
    <div style={{ marginTop:'50px', width:'100%', height:'100vh', display:'flex', flexDirection:'column',flexWrap:'wrap',alignItems:'center' }}>
            <div>2023.08.30 수</div>
        <div style={{width:'90%', display:'flex', flexDirection:'column'}}>
            <div style={{backgroundColor:'gray',alignItems:'center',justifyContent:'center'}}>
                <div style={{ borderBottomWidth: '2px',borderBottomStyle:'dashed', borderBottomColor: 'white', padding: '10px'}}>
                    [가계부]
                </div>
                {Data.map((item, index) => (
                    <div style={{borderBottomWidth: '2px',borderBottomStyle:'dashed', borderBottomColor: 'white', padding: '10px'}}>
                        <div key={index} style={{display:'flex', justifyContent:'space-between'}}>
                            <div>{item.case1}</div>
                            <div>{item.case2}</div>
                            <div>{item.case3}</div>
                        </div>
                        <div style={{display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
                            {item.case3 < 0 ? (
                                Data2.map((qitem, qindex) => (
                                    <label key={qindex} style={{flexBasis:'50%'}}>
                                        <input type='radio'/>
                                        {qitem.q1}
                                    </label>
                                ))
                            ) : (
                              <></>  
                            )}
                        </div>
                    </div>
                ))}
                <div>
                    <div>합계</div>
                    <div>{priceSum}</div>
                </div>
                </div>
                </div>
            <h2>가계부 작성 페이지</h2>
        </div>
    )
};

export default AccountBookAdd;