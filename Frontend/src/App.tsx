import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pheader from "./components/Header/Pheader";
import Pmain from "./pages/Parents/Pmain";
import PchildDetail from "./pages/Parents/PchildDetail";
import Ptransfer from "./pages/Parents/Ptransfer";
import Pinterest from "./pages/Parents/Pinterest";
import Palba from "./pages/Parents/Palba";
import Pdeposit from "./pages/Parents/Pdeposit";
import PaccountBook from "./pages/Parents/Paccountbook";
import PaccountbookDetail from "./pages/Parents/PaccountbookDetail";
import Pquiz from "./pages/Parents/Pquiz";
import Plotto from "./pages/Parents/Plotto";
import Ploan from "./pages/Parents/Ploan/Ploan";
import Ploandetail from "./pages/Parents/Ploan/Ploandetail";
import Header from "./components/Header/Header";
import Main from "./pages/Child/Main";
import AccountBook from "./pages/Child/AccountBook/AccountBook";
import AccountBookDetail from "./pages/Child/AccountBook/AccountBookDetail";
import AccountBookAdd from "./pages/Child/AccountBook/AccountBookAdd";
import Alba from "./pages/Child/Alba/Alba";
import AlbaCompleted from "./pages/Child/Alba/AlbaCompleted";
import Deposit from "./pages/Child/Deposit/Deposit";
import DepositJoinDetail from "./pages/Child/Deposit/DepositJoinDetail";
import DepositJoinSuccess from "./pages/Child/Deposit/DepositJoinSuccess";
import DepositDetail from "./pages/Child/Deposit/DepositDetail";
import Loan from "./pages/Child/Loan/Loan";
import LoanCompleted from "./pages/Child/Loan/LoanCompleted";
import Quiz from "./pages/Child/Quiz/Quiz";
import QuizList from "./pages/Child/Quiz/QuizList";
import QuizPlay from "./pages/Child/Quiz/QuizPlay";
import QuizCommentary from "./pages/Child/Quiz/QuizCommentary";
import Stock from "./pages/Child/Stock/Stock";
import StockMarket from "./pages/Child/Stock/StockMarket";
import StockDetail from "./pages/Child/Stock/StockDetail";
import StockTradingList from "./pages/Child/Stock/StockTradingList";
import Lotto from "./pages/Child/Lotto/Lotto";
import LottoChange from "./pages/Child/Lotto/LottoChange";
import Bot from "./pages/Child/Bot/Bot";
import BotChat from "./pages/Child/Bot/BotChat";
import Mypage from "./pages/Child/Mypage";
import LoginRedirect from "./pages/Login/LoginRedirect";
import LoginRedirect2 from "./pages/Login/LoginRedirect2";
import { useRecoilValue } from "recoil";
import { stateAtom } from "./recoil/stateAtom";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/Login/NotFound";

const App: React.FC = () => {
  const state = useRecoilValue(stateAtom).id

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oauth/redirect" element={<LoginRedirect />} />
          <Route path="/oauth/redirect2" element={<LoginRedirect2 />} />
          {/* 부모 */}
          <Route path="/Pmain" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Pmain key="pmain-component"/>]}/>}/>
          <Route path="/Pchilddetail/:id" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <PchildDetail key="pchilddetail" />]}/>}/>
          <Route path="/Ptransfer" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Ptransfer key="ptransfer"/>]}/>}/>
          <Route path="/Pinterest" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Pinterest key="pinterest"/>]}/>}/>
          <Route path="/Palba" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Palba key="palba"/>]}/>}/>
          <Route path="/Pdeposit" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Pdeposit key="pdeposit"/>]}/>}/>
          <Route path="/Paccountbook" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <PaccountBook key="paccountbook"/>]}/>}/>
          <Route path="/PaccountbookDetail" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <PaccountbookDetail key="paccountbookdetail"/>]}/>}/>
          <Route path="/Pquiz" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Pquiz key="pquiz"/>]}/>}/>
          <Route path="/Plotto" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Plotto key="plotto"/>]}/>}/>
          <Route path="/Ploan" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Ploan key="ploan"/>]}/>}/>
          <Route path="/Ploandetail" element={<PrivateRoute state={state} authenticated={1} component={[<Pheader key="pheader-component"/>, <Ploandetail key="ploandetail"/>]}/>}/>

          {/* 자식 */}
          <Route path="/Main" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Main key="main"/>]}/>}/>
          <Route path="/Mypage" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Mypage key="mypage"/>]}/>}/>
          <Route path="/AccountBook" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <AccountBook key="accountbook"/>]}/>}/>
          <Route path="/AccountBookDetail" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <AccountBookDetail key="accountbookdetail"/>]}/>}/>
          <Route path="/AccountBookAdd" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <AccountBookAdd key="accountbook"/>]}/>}/>
          <Route path="/Alba" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Alba key="alba"/>]}/>}/>
          <Route path="/AlbaCompleted" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <AlbaCompleted key="albacompleted"/>]}/>}/>
          <Route path="/Deposit" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Deposit key="deposit"/>]}/>}/>
          <Route path="/DepositJoinDetail" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <DepositJoinDetail key="depositjoindetail"/>]}/>}/>
          <Route path="/DepositJoinSuccess" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <DepositJoinSuccess key="depositjoinsuccess"/>]}/>}/>
          <Route path="/DepositDetail/:id" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <DepositDetail key="depoisitdetail"/>]}/>}/>
          <Route path="/Loan" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Loan key="loan" totalInProgressLoanCount={0} totalLoanBalance={0} inProgressLoanList={[]} loanLimitation={0}/>]}/>}/>
          <Route path="/LoanCompleted" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <LoanCompleted key="loancompleted"/>]}/>}/>
          <Route path="/Quiz" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Quiz key="quiz"/>]}/>}/>
          <Route path="/QuizList/:eng" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <QuizList key="quizlist"/>]}/>}/>
          <Route path="/QuizPlay/:eng" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <QuizPlay key="quizplay"/>]}/>}/>
          <Route path="/QuizCommentary/:eng" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <QuizCommentary key="quizcommentary"/>]}/>}/>
          <Route path="/Stock" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Stock key="stock"/>]}/>}/>
          <Route path="/StockMarket" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <StockMarket key="stockmarket"/>]}/>}/>
          <Route path="/StockDetail/:companyName" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <StockDetail key="stockdetail"/>]}/>}/>
          <Route path="/StockTradingList" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <StockTradingList key="stocktradinglist" />]}/>}/>
          <Route path="/Lotto" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Lotto key="lotto"/>]}/>}/>
          <Route path="/LottoChange" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <LottoChange key="lottochange"/>]}/>}/>
          <Route path="/Bot" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <Bot key="bot"/>]}/>}/>
          <Route path="/BotChat" element={<PrivateRoute state={state} authenticated={0} component={[<Header key="header-component"/>, <BotChat key="botchat"/>]}/>}/>
          <Route path="/*" element={<NotFound key="notfound"/>} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
