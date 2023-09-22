import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Steps } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import BotModal from '../../../components/Bot/BotModal';

  const Deposit: React.FC = () => {
    return (
      <div className='flex'style={{ width: '100%' }}>
        <Link to='/deposit' className='text-white'>
            {/* <Icon className='text-md' icon='arcticons:httpshortcuts'/>  */}
            💰예금 페이지로 바로 가기</Link>
      </div>
    )}
  const Laon: React.FC = () => {
    return (
      <div style={{ width: '100%' }}>
        <Link to='/loan' className='text-white'>💸대출 페이지로 바로 가기</Link>
      </div>
    )}
  const Accountbook: React.FC = () => {
    return (
      <div style={{ width: '100%' }}>
        <Link to='/accountbook' className='text-white'>📅가계부 쓰러 가기</Link>
      </div>
    )}
  const Alba: React.FC = () => {
    return (
      <div style={{ width: '100%' }}>
        <Link to='/alba' className='text-white'>🏃‍♂️아르바이트 하러 가기</Link>
      </div>
    )}
  const Quiz: React.FC = () => {
    return (
      <div style={{ width: '100%' }}>
        <Link to='/quiz' className='text-white'>💯퀴즈 풀러 가기</Link>
      </div>
    )}
  const Stock: React.FC = () => {
    return (
      <div style={{ width: '100%' }}>
        <Link to='/stock' className='text-white'>📈주식 페이지로 바로 가기</Link>
      </div>
    )}
  const Lotto: React.FC = () => {
    return (
      <div style={{ width: '100%' }}>
        <Link to='/lotto' className='text-white'>🎰복권 추첨하러 가기</Link>
      </div>
    )}

    interface DepositReviewProps {
    steps?: Steps;
    }
    const DepositReview: React.FC<DepositReviewProps> = ({ steps }) => {
        const [state, setState] = useState({ depositName: '', depositMoney: '',  depositDate: '', });
        const interestrate = 2;
        const deposittotal = 10100;

        useEffect(() => {
          if (steps) {
            const { depositName, depositMoney, depositDate } = steps;
            setState({ depositName: depositName.value, depositMoney: depositMoney.value, depositDate: depositDate.value,});
          }
        }, [steps]);
      
        return (
          <div style={{ width: '100%' }}>
            <h3 className='mb-1 font-bold'>예금 신청서</h3>
            <div>
              <div>
                <div className='mb-1'>
                  <div className='font-bold'>예금 이름</div>
                  <div>{state.depositName}</div>
                </div>
                <div className='mb-1'>
                  <div className='font-bold'>예금 금액</div>
                  <div>{state.depositMoney}원</div>
                </div>
                <div className='mb-1'>
                  <div className='font-bold'>예금 기간</div>
                  <div>{state.depositDate}</div>
                </div>
                <div className='mb-1'>
                  <div className='font-bold'>1주 이자율</div>
                  <div>{interestrate}%</div>
                </div>
                <div className='mb-1'>
                  <div className='font-bold'>만기 지급액</div>
                  <div>{deposittotal}</div>
                </div>
              </div>
            </div>
          </div>
        )} 

    DepositReview.propTypes = {
        steps : PropTypes.object,
     };

    interface LoanReviewProps {
    steps?: Steps;
    }
    const LoanReview: React.FC<LoanReviewProps> = ({ steps }) => {
        const [state, setState] = useState({ loanName: '', loanMoney: '', reason: '', loanDate: '', repayment:'' });
      
        useEffect(() => {
          if (steps) {
            const { loanName, loanMoney, reason, loanDate, repayment } = steps;
            setState({ loanName: loanName.value, loanMoney: loanMoney.value, reason: reason.value, loanDate: loanDate.value, repayment: repayment.value });
          }
        }, [steps]);
      
        return (
          <div style={{ width: '100%' }}>
            <h3 className='font-bold'>대출 신청서</h3>
            <div>
              <div>
                <div>
                  <div className='font-bold'>대출 이름</div>
                  <div>{state.loanName}</div>
                </div>
                <div>
                  <div className='font-bold'>대출 금액</div>
                  <div>{state.loanMoney}원</div>
                </div>
                <div>
                  <div className='font-bold'>대출 사유</div>
                  <div>{state.reason}</div>
                </div>
                <div>
                  <div className='font-bold'>상환 기간</div>
                  <div>{state.loanDate}</div>
                </div>
                <div>
                  {/* <div className='font-bold'>상환 방법</div>
                  <div>{state.repayment}</div> */}
                </div>
              </div>
            </div>
          </div>
        )} 

    LoanReview.propTypes = {
        steps : PropTypes.object,
     };


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const Chatbotmain = (_closeModal:any) => {
    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#374957',
        headerFontColor: '#fff',
        headerFontSize: '30px',
        botBubbleColor: '#5B869C',
        botFontColor: '#fff',
        userBubbleColor: '#EBF0F3',
        userFontColor: '#4a4a4a',
      };

       
        return (
            <BotModal>
                <div id="chatbot-container" style={{ width: '100%', height: '100%' }} >
                    <ThemeProvider theme={theme}>
                        {/* <div className='flex justify-end'>
                        <Icon onClick={props.closeModal} className='text-2xl' icon='mdi:close'/>
                        </div> */}
                    <ChatBot
                        //   avatarStyle = ''  
                        headerTitle= '틴구❤'
                        botAvatar= 'src/assets/강아지.png'
                        hideUserAvatar= 'true'
                        steps={[
                            {
                                id: '0',
                                message: '안녕? 무엇이 궁금하냐 멍?',
                                trigger: 'select',
                            },
                            {
                                id: 'select',
                                options: [
                                    { value: '예금', label: '💰예금', trigger: 'deposit' },
                                    { value: '대출', label: '💸대출', trigger: 'loan' },
                                    { value: '가계부', label: '📅가계부', trigger: 'accountbook' },
                                    { value: '아르바이트', label: '🏃‍♂️아르바이트', trigger: 'alba' },
                                    { value: '퀴즈', label: '💯퀴즈', trigger: 'quiz' },
                                    { value: '주식', label: '📈주식', trigger: 'stock' },
                                    { value: '복권', label: '🎰복권', trigger: 'lotto' },
                                ],
                            },
//////////예금////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                id: 'deposit',
                                component: <Deposit />,
                                asMessage: true,
                                trigger: 'deposit1',
                            },
                            {
                                id: 'deposit1',
                                message: '예금이 궁금해? 예금은 은행에 돈을 맡기는 거야',
                                trigger: 'deposit2',
                            },
                            {
                                id: 'deposit2',
                                options: [
                                    { value: '더 알아보기', label: '더 알아보기', trigger: 'deposit3' },
                                    { value: '예금가입', label: '예금 가입하기', trigger: 'depositcreate' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'deposit3',
                                message: '돈을 맡기면, 맡긴 기간만큼 이자라는 걸 받을 수 있어!',
                                trigger: 'deposit4',
                            },
                            {
                                id: 'deposit4',
                                options: [
                                    { value: '이자', label: '이자가 뭐야?', trigger: 'deposit5' },
                                    { value: '예금가입', label: '예금 가입하기', trigger: 'depositcreate' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'deposit5',
                                message: '이자는 빌린 돈에 대한 사용료라고 볼 수 있어. 우리가 맡긴 돈을 맡긴 기간동안 은행에서 사용하고 사용료를 주는거지! 이자에는 단리와 복리가 있어.',
                                trigger: 'deposit6',
                            },
                            {
                                id: 'deposit6',
                                options: [
                                    { value: '단리', label: '단리', trigger: 'deposit7' },
                                    { value: '복리', label: '복리', trigger: 'deposit8' },
                                    { value: '예금가입', label: '예금 가입하기', trigger: 'depositcreate' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'deposit7',
                                message: '단리는 처음 맡긴 돈(원금)에 대한 이자만 적용하는거야.',
                                trigger: 'deposit7-1',
                            },
                            {
                                id: 'deposit7-1',
                                message: '예를 들어, 연10% 짜리 예금에 만원을 2년동안 넣었다면',
                                trigger: 'deposit7-2',
                            },
                            {
                                id: 'deposit7-2',
                                message: '1년 째에 천원. 2년 째에도 천원. 총 (10,000 x 10% x 2) = 2,000원의 이자가 붙지!',
                                trigger: 'deposit6',
                            },
                            {
                                id: 'deposit8',
                                message: '복리는 원금에 대한 이자뿐만 아니라 그 이자에도 이자가 적용되는거야.',
                                trigger: 'deposit8-1',
                            },
                            {
                                id: 'deposit8-1',
                                message: '예를 들어, 연10% 짜리 예금에 만원을 2년동안 넣었다면, 첫 1년은 (10,000 x 10% = 1,000) 천원의 이자가 붙지만',
                                trigger: 'deposit8-2',
                            },
                            {
                                id: 'deposit8-2',
                                message: '2년 째에는 원금 만원에 1년 째에 받은 천원을 더해서 (11,000x 10% = 1100) 천백원의 이자가 붙어.',
                                trigger: 'deposit8-3',
                            },
                            {
                                id: 'deposit8-3',
                                message: '그래서 복리는 총 2100원의 이자가 생겨. 단리일 때보다 더 많은 이자를 받을 수 있어',
                                trigger: 'deposit6',
                            },
                            {
                                id: 'depositcreate',
                                options: [
                                    { value: '페이지이동', label: '예금 페이지로 이동', trigger: 'depositgo' },
                                    { value: '가입', label: '챗으로 예금 가입하기', trigger: 'depositcreate2' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'depositgo',
                                component: <Deposit />,
                                asMessage: true,
                            },
                            {
                                id: 'depositcreate2',
                                message: '안녕? 예금 가입을 도와줄게!',
                                trigger: 'depositcreate3',
                              },
                              {
                                id: 'depositcreate3',
                                message: '예금 이름을 입력해줘. 예금에 대해 기억하기 쉬우면 좋겠지?',
                                trigger: 'depositName',
                              },
                              {
                                id: 'depositName',
                                user: true,
                                trigger: 'depositcreate4',
                              },
                              {
                                id: 'depositcreate4',
                                message: '좋아. {previousValue} 예금에 얼마를 넣을거야?! 금액을 입력해줘',
                                trigger: 'depositMoney',
                              },
                              {
                                  id: 'depositMoney',    
                                  user: true,
                                  trigger: 'depositcreate5',
                                  validator: (value: number) => {
                                    if (isNaN(value)) {
                                      return '숫자만 입력해주세요!';
                                    } else if (value < 5000) {
                                      return '5000원 이상만 가능합니다';
                                    } else if (value > 100000) {
                                      return `${value}원? 너무 많아!`;
                                    }
                                    return true;
                                  },
                                },
                                {
                                  id: 'depositcreate5',
                                  message: '좋아. 너는 {previousValue}원을 얼마동안 맡길거야?',
                                  trigger: 'depositDate',
                                },
                                  {
                                  id: 'depositDate',
                                  options: [
                                      { value: '1주', label: '1주', trigger: 'depositcreate9' },
                                      { value: '2주', label: '2주', trigger: 'depositcreate9' },
                                      { value: '3주', label: '3주', trigger: 'depositcreate9' },
                                      { value: '4주', label: '4주', trigger: 'depositcreate9' },
                                  ],
                                  },
                                // {
                                //   id: 'depositcreate7',
                                //   message: `{previousValue}동안 `,
                                //   trigger: 'depositcreate8',
                                // },
                                //   {
                                //   id: 'depositcreate8',
                                //   options: [
                                //     { value: '취소', label: '취소', trigger: '0' },
                                //       { value: '확인', label: '확인', trigger: 'depositcreate9' },
                                //     //   { value: '일시 상환', label: '일시 상환', trigger: 'loancreate8' },
                                //   ],
                                //   },
                              {
                                id: 'depositcreate9',
                                message: '좋아! 답변을 확인했어!',
                                trigger: 'depositreview',
                              },
                              {
                                id: 'depositreview',
                                component: <DepositReview />,
                                asMessage: true,
                                trigger: 'depositupdate',
                              },
                              {
                                id: 'depositupdate',
                                message: '혹시 수정하고 싶은 부분 있어?',
                                trigger: 'depositupdate-question',
                              },
                              {
                                id: 'depositupdate-question',
                                options: [
                                  { value: '0', label: '예금 취소할래', trigger: '0' },
                                  { value: '1', label: '응 수정할래', trigger: 'depositupdate-yes' },
                                  { value: '2', label: '아니 괜찮아. 예금 신청할래', trigger: 'depositsuccess' },
                                ],
                              },
                              {
                                id: 'depositupdate-yes',
                                message: '무슨 항목을 수정하고 싶어?',
                                trigger: 'depositupdate-fields',
                              },
                              {
                                id: 'depositupdate-fields',
                                options: [
                                  { value: 'depositName', label: '예금 이름', trigger: 'update-depositName' },
                                  { value: 'depositMoney', label: '예금 금액', trigger: 'update-depositMoney' },
                                  { value: 'depositDate', label: '예금 기간', trigger: 'update-depositDate' },
                                ],
                              },
                              {
                                id: 'update-depositName',
                                message: '변경할 예금 이름을 입력해줘',
                                trigger: 'update-depositName2',
                              },
                              {
                                id: 'update-depositName2',
                                update: 'depositName',
                                trigger: 'depositcreate9',
                              },
                              {
                                id: 'update-depositMoney',
                                message: '변경할 예금 금액을 입력해줘',
                                trigger: 'update-depositMoney2',
                              },
                              {
                                id: 'update-depositMoney2',
                                update: 'depositMoney',
                                trigger: 'depositcreate9',
                              },
                              {
                                id: 'update-depositDate',
                                message: '변경할 예금 기간을 선택해줘',
                                trigger: 'update-depositDate2',
                              },
                              {
                                id: 'update-depositDate2',
                                update: 'depositDate',
                                trigger: 'depositcreate9',
                              },
                            //   {
                            //     id: 'update-loanDate',
                            //     message: '변경할 상환 기간을 선택해줘',
                            //     trigger: 'update-loanDate2',
                            //   },
                            //   {
                            //     id: 'update-loanDate2',
                            //     update: 'loanDate',
                            //     trigger: 'loancreate8',
                            //   },
                              {
                                id: 'depositsuccess',
                                message: '좋아, 예금가입이 완료되었어!',
                                trigger: 'select',
                              },
//////////대출////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                id: 'loan',
                                component: <Laon />,
                                asMessage: true,
                                trigger: 'loan1',
                            },
                            {
                                id: 'loan1',
                                message: '대출이 궁금해? 대출은 은행에서 돈을 빌리는 거야',
                                trigger: 'loan2',
                            },
                            {
                                id: 'loan2',
                                options: [
                                    { value: '더 알아보기', label: '더 알아보기', trigger: 'loan3' },
                                    { value: '가입', label: '대출 신청하기', trigger: 'loancreate' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'loan3',
                                message: '돈을 공짜로 빌릴 수는 없어. 돈을 빌리면 이자를 내야하고 기간 안에 꼭 갚아야해',
                                trigger: 'loan4',
                            },
                            {
                                id: 'loan4',
                                options: [
                                    { value: '더 알아보기', label: '더 알아보기', trigger: 'loan5' },
                                    { value: '가입', label: '대출 신청하기', trigger: 'loancreate' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'loan5',
                                message: '기간 안에 갚지 못하면, 신용등급이 떨어져.',
                                trigger: 'loan6',
                            },
                            {
                                id: 'loan6',
                                options: [
                                    { value: '신용 등급', label: '신용 등급이 뭐야?', trigger: 'loan7' },
                                    { value: '가입', label: '대출 신청하기', trigger: 'loancreate' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'loan7',
                                message: '신용 등급은 믿을 수 있는 사람인가 평가하는 수치야. 신용등급이 낮으면 은행에서 돈을 빌리지 못하거나 이자가 비싸질 수 있어. 그래서 신용 등급이 떨어지지 않도록 하는건 아주 중요한 일이야',
                                trigger: 'loan8',
                            },
                            {
                                id: 'loan8',
                                options: [
                                    { value: '가입', label: '대출 신청하기', trigger: 'loancreate' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'loancreate',
                                options: [
                                    { value: '대출페이지이동', label: '대출 페이지로 이동', trigger: 'loango' },
                                    { value: '가입', label: '챗으로 대출 신청하기', trigger: 'loancreate2' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'loango',
                                component: <Laon />,
                                asMessage: true,
                            },
                            {
                                id: 'loancreate2',
                                message: '안녕? 대출 신청을 도와줄게!',
                                trigger: 'loancreate3',
                              },
                              {
                                id: 'loancreate3',
                                message: '대출 이름을 입력해줘. 기억하기 쉬우면 좋겠지?',
                                trigger: 'loanName',
                              },
                              {
                                id: 'loanName',
                                user: true,
                                trigger: 'loancreate4',
                              },
                              {
                                id: 'loancreate4',
                                message: '좋아. {previousValue} 대출로 얼마를 빌릴거야?! 금액을 입력해줘.',
                                trigger: 'loanMoney',
                              },
                              {
                                  id: 'loanMoney',    
                                  user: true,
                                  trigger: 'loancreate5',
                                  validator: (value: number) => {
                                    if (isNaN(value)) {
                                      return '숫자만 입력해주세요!';
                                    } else if (value < 5000) {
                                      return '5000원 이상만 가능합니다';
                                    } else if (value > 100000) {
                                      return `${value}원? 너무 많아!`;
                                    }
                                    return true;
                                  },
                                },
                                {
                                  id: 'loancreate5',
                                  message: '좋아. {previousValue}원을 빌리는 이유가 뭐야?',
                                  trigger: 'reason',
                                },
                                {
                                  id: 'reason',
                                  user: true,
                                  trigger: 'loancreate6',
                                },
                                {
                                  id: 'loancreate6',
                                  message: '언제까지 갚을거야?',
                                  trigger: 'loanDate',
                                },
                                  {
                                  id: 'loanDate',
                                  options: [
                                      { value: '1달 후', label: '1달 후', trigger: 'loancreate8' },
                                      { value: '2달 후', label: '2달 후', trigger: 'loancreate8' },
                                      { value: '3달 후', label: '3달 후', trigger: 'loancreate8' },
                                  ],
                                  },
                                // {
                                //   id: 'loancreate7',
                                //   message: '어떻게 갚을거야?',
                                //   trigger: 'repayment',
                                // },
                                //   {
                                //   id: 'repayment',
                                //   options: [
                                //       { value: '분할 상환', label: '분할 상환', trigger: 'loancreate8' },
                                //       { value: '일시 상환', label: '일시 상환', trigger: 'loancreate8' },
                                //   ],
                                //   },
              
                              {
                                id: 'loancreate8',
                                message: '좋아! 답변을 확인했어!',
                                trigger: 'loanreview',
                              },
                              {
                                id: 'loanreview',
                                component: <LoanReview />,
                                asMessage: true,
                                trigger: 'loanupdate',
                              },
                              {
                                id: 'loanupdate',
                                message: '혹시 수정하고 싶은 부분 있어?',
                                trigger: 'loanupdate-question',
                              },
                              {
                                id: 'loanupdate-question',
                                options: [
                                  { value: '0', label: '대출 신청 안할래', trigger: '0' },
                                  { value: '1', label: '응 수정할래', trigger: 'loanupdate-yes' },
                                  { value: '2', label: '아니 괜찮아. 대출신청 할래', trigger: 'loansuccess' },
                                ],
                              },
                              {
                                id: 'loanupdate-yes',
                                message: '무슨 항목을 수정하고 싶어?',
                                trigger: 'loanupdate-fields',
                              },
                              {
                                id: 'loanupdate-fields',
                                options: [
                                  { value: 'loanName', label: '대출 이름', trigger: 'update-loanName' },
                                  { value: 'loanMoney', label: '대출 금액', trigger: 'update-loanMoney' },
                                  { value: 'reason', label: '대출 사유', trigger: 'update-reason' },
                                  { value: 'loanDate', label: '상환 기간', trigger: 'update-loanDate' },
                                  // { value: 'repayment', label: '상환 방법', trigger: 'update-repayment' },
                                ],
                              },
                              {
                                id: 'update-loanName',
                                message: '변경할 대출 이름을 입력해줘',
                                trigger: 'update-loanName2',
                              },
                              {
                                id: 'update-loanName2',
                                update: 'loanName',
                                trigger: 'loancreate8',
                              },
                              {
                                id: 'update-loanMoney',
                                message: '변경할 대출 금액을 입력해줘',
                                trigger: 'update-loanMoney2',
                              },
                              {
                                id: 'update-loanMoney2',
                                update: 'loanMoney',
                                trigger: 'loancreate8',
                              },
                              {
                                id: 'update-reason',
                                message: '변경할 대출 사유를 입력해줘',
                                trigger: 'update-reason2',
                              },
                              {
                                id: 'update-reason2',
                                update: 'reason',
                                trigger: 'loancreate8',
                              },
                              {
                                id: 'update-loanDate',
                                message: '변경할 상환 기간을 선택해줘',
                                trigger: 'update-loanDate2',
                              },
                              {
                                id: 'update-loanDate2',
                                update: 'loanDate',
                                trigger: 'loancreate8',
                              },
                              {
                                id: 'update-repayment',
                                message: '변경할 상환 방법을 선택해줘',
                                trigger: 'update-repayment2',
                              },
                              {
                                id: 'update-repayment2',
                                update: 'repayment',
                                trigger: 'loancreate8',
                              },
                              {
                                id: 'loansuccess',
                                message: '좋아, 대출신청이 완료되었어!',
                                trigger: 'select',
                              },
//////////가계부////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                id: 'accountbook',
                                component: <Accountbook/>,
                                asMessage: true,
                                trigger: 'accountbook1',
                            },
                            {
                                id: 'accountbook1',
                                message: '가계부가 궁금해? 가계부는 니가 쓴 돈이나 번 돈을 정리 할 수 있는 페이지야',
                                trigger: 'accountbook2',
                            },
                            {
                                id: 'accountbook2',
                                options: [
                                    { value: '더 알아보기', label: '더 알아보기', trigger: 'accountbook3' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'accountbook3',
                                message: '가계부 페이지에 들어가서 가계부를 작성하고 싶은 날짜를 누르면 가계부를 작성할 수 있어. 더 알고싶어?',
                                trigger: 'accountbook4',
                            },
                            {
                                id: 'accountbook4',
                                options: [
                                    { value: '수입', label: '수입', trigger: 'income' },
                                    { value: '지출', label: '지출', trigger: 'spending' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'income',
                                message: '수입에서는 용돈, 아르바이트, 퀴즈, 투자 등 네가 번 금액을 알 수 있어',
                                trigger: 'accountbook5',
                            },
                            {
                                id: 'accountbook5',
                                options: [
                                    { value: '지출', label: '지출', trigger: 'spending' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'spending',
                                message: '지출에서는 니가 쓴 돈을 필요소비, 욕구소비로 나눠서 정리할 수 있어',
                                trigger: 'spending1',
                            },
                            {
                                id: 'spending1',
                                options: [
                                    { value: '필요 소비', label: '필요 소비', trigger: 'needs' },
                                    { value: '욕구 소비', label: '욕구 소비', trigger: 'wants' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'needs',
                                message: '필요소비는 무언가가 꼭 필요해서 사는 행동이야(ex: 학용품)',
                                trigger: 'needs1',
                            },
                            {
                                id: 'needs1',
                                options: [
                                    { value: '욕구 소비', label: '욕구 소비', trigger: 'wants' },
                                    { value: '수입', label: '수입', trigger: 'income' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'wants',
                                message: '욕구소비는 꼭 필요하지는 않지만, 먹고싶거나 재미를 위해 구매하는 행동이야(ex: 탕후루)',
                                trigger: 'wants1',
                            },
                            {
                                id: 'wants1',
                                options: [
                                    { value: '필요 소비', label: '필요 소비', trigger: 'needs' },
                                    { value: '수입', label: '수입', trigger: 'income' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
//////////아르바이트////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                id: 'alba',
                                component: <Alba/>,
                                asMessage: true,
                                trigger: 'alba1',
                            },
                            {
                                id: 'alba1',
                                message: '아르바이트가 궁금해? 아르바이트에서는 부모님이 시키는 일을 성공하면 용돈을 받을 수 있어',
                                trigger: 'alba2',
                            },
                            {
                                id: 'alba2',
                                options: [
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                    { value: '더 알아보기', label: '더 알아보기', trigger: 'alba3' },
                                ],
                            },
                            {
                                id: 'alba3',
                                message: '아르바이트를 성공하면, 용돈과 복권을 받을 수 있어.',
                                trigger: 'alba4',
                            },
                            {
                                id: 'alba4',
                                options: [
                                    { value: '복권', label: '복권', trigger: 'lotto' },
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
//////////퀴즈////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                id: 'quiz',
                                component: <Quiz/>,
                                asMessage: true,
                                trigger: 'quiz1',
                            },
                            {
                                id: 'quiz1',
                                message: '퀴즈가 궁금해? 퀴즈는 직접 풀어봐! 퀴즈를 잘 맞히면 용돈을 더 받을 수 있을지도?!',
                                trigger: 'quiz2',
                            },
                            {
                                id: 'quiz2',
                                options: [
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
//////////주식////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                id: 'stock',
                                component: <Stock />,
                                asMessage: true,
                                trigger: 'stock1',
                            },
                            {
                                id: 'stock1',
                                message: '주식이 궁금해? 예를 들어, 놀이공원이 하나 있어. 놀이공원 주인은 이 놀이공원의 일부를 잘개 쪼개서 사람들에게 팔았어. 이 조각을 산 사람들은 다시 팔 수도 있어. 이 조각난 놀이공원이 주식이야.',
                                trigger: 'stock2',
                            },
                            {
                                id: 'stock2',
                                options: [
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                    { value: '더 알아보기', label: '더 알아보기', trigger: 'stock3' },
                                ],
                            },
                            {
                                id: 'stock3',
                                message: '놀이공원이 인기가 많아서 사람이 많이 온다면, 조각난 놀이공원의 가격이 올라. 인기가 없어서 사람이 적게 온다면 가격이 떨어져. 조각을 살 때 가격보다, 팔 때 가격이 비싸다면 그만큼의 이득을 볼 수 있어.',
                                trigger: 'stock4',
                            },
                            {
                              id: 'stock4',
                              options: [
                                  { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                  { value: '더 알아보기', label: '더 알아보기', trigger: 'stock5' },
                              ],
                          },
                          {
                            id: 'stock5',
                            message: '주식은 기업의 소유권의 일부야. 기업의 주식을 갖고있다면, 그 기업의 소유권을 조금 갖고 있는거야. 그래서 회사가 운영을 잘하면 너도 이익을 얻게 될 수 있어. 그러나 회사가 운영을 잘한다고해서, 항상 주식 가격이 오르는건 아니야.',
                            trigger: 'stock6',
                        },                            
                        {
                          id: 'stock6',
                          options: [
                              { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                              { value: '더 알아보기', label: '더 알아보기', trigger: 'stock7' },
                          ],
                       },
                       {
                        id: 'stock7',
                        message: '전염병이 발생하거나, 사람들이 돈이 없다거나, 놀이공원보다 재미있는 온라인게임이 있다면, 놀이공원의 운영과 관계없이 사람들이 잘 가지 않겠지?',
                        trigger: 'stock8',
                      },
                        {
                          id: 'stock8',
                          options: [
                              { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                              { value: '더 알아보기', label: '더 알아보기', trigger: 'stock9' },
                          ],
                       },
                       {
                        id: 'stock9',
                        message: '주식은 손해를 볼 수도 있어. 그래서 주식을 구매할 때는 여러 방면에서 생각해보고 신중해야해.',
                        trigger: 'stock10',
                      },
                      {
                        id: 'stock10',
                        options: [
                            { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                            { value: '더 알아보기', label: '더 알아보기', trigger: 'stockgo' },
                        ],
                     },
                     {
                      id: 'stockgo',
                      component: <Stock/>,
                      asMessage: true,
                  },
//////////복권////////////////////////////////////////////////////////////////////////////////////////////
                            {
                                id: 'lotto',
                                component: <Lotto/>,
                                asMessage: true,
                                trigger: 'lotto1',
                            },
                            {
                                id: 'lotto1',
                                message: '복권이 궁금해? 아르바이트를 통해 얻은 복권 교환권으로 복권을 살 수 있어! 가서 원하는 숫자를 골라봐!',
                                trigger: 'lotto2',
                            },
                            {
                                id: 'lotto2',
                                options: [
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                    { value: '더 알아보기', label: '더 알아보기', trigger: 'lotto3' },
                                ],
                            },
                            {
                                id: 'lotto3',
                                message: '복권에 당첨되면 용돈을 더 받을 수 있어! 아르바이트를 열심히 하면 좋겠지?',
                                trigger: 'lotto4',
                            },
                            {
                                id: 'lotto4',
                                options: [
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                    { value: '더 알아보기', label: '더 알아보기', trigger: 'lotto5' },
                                ],
                            },
                            {
                                id: 'lotto5',
                                message: '복권이란건 원래 돈을 주고 사는 거야! 나라에서 이 돈들을 모아서 복권당첨금을 분배하고, 나머지는 금액은 기부에 쓰여!',
                                trigger: 'lotto6',
                            },
                            {
                                id: 'lotto6',
                                options: [
                                    { value: '그만 알아보기', label: '그만 알아보기', trigger: '0' },
                                ],
                            },
                            {
                                id: 'end-message',
                                message: '잘가!',
                                end: true,
                            },
                        ]}
                        />
                    </ThemeProvider>
            </div>
            </BotModal>
          );
        }

export default Chatbotmain; 