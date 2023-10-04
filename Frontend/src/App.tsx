import React, { useEffect } from "react";
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

const App: React.FC = () => {


  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oauth/redirect" element={<LoginRedirect />} />
          <Route path="/oauth/redirect2" element={<LoginRedirect2 />} />
          {/* 부모 */}
          <Route
            path="/Pmain"
            element={[
              <Pheader key="pheader-component" />,
              <Pmain key="pmain-component" />,
            ]}
          />
          <Route
            path="/Pchilddetail/:id"
            element={[
              <Pheader key="pheader-component" />,
              <PchildDetail key="pchilddetail-component" />,
            ]}
          />
          <Route
            path="/Ptransfer"
            element={[
              <Pheader key="pheader-component" />,
              <Ptransfer key="ptransfer-component" />,
            ]}
          />
          <Route
            path="/Pinterest"
            element={[
              <Pheader key="pheader-component" />,
              <Pinterest key="pinterest-component" />,
            ]}
          />
          <Route
            path="/Palba"
            element={[
              <Pheader key="pheader-component" />,
              <Palba key="palba-component" />,
            ]}
          />
          <Route
            path="/Pdeposit"
            element={[
              <Pheader key="pheader-component" />,
              <Pdeposit key="pdeposit-component" />,
            ]}
          />
          <Route
            path="/Paccountbook"
            element={[
              <Pheader key="pheader-component" />,
              <PaccountBook key="paccountbook-component" />,
            ]}
          />
          <Route
            path="/PaccountbookDetail"
            element={[
              <Pheader key="pheader-component" />,
              <PaccountbookDetail key="paccountbookDetail-component" />,
            ]}
          />
          <Route
            path="/Pquiz"
            element={[
              <Pheader key="pheader-component" />,
              <Pquiz key="pquiz-component" />,
            ]}
          />
          <Route
            path="/Plotto"
            element={[
              <Pheader key="pheader-component" />,
              <Plotto key="plotto-component" />,
            ]}
          />
          <Route
            path="/Ploan"
            element={[
              <Pheader key="pheader-component" />,
              <Ploan key="ploan-component" />,
            ]}
          />
          <Route
            path="/Ploandetail"
            element={[
              <Pheader key="pheader-component" />,
              <Ploandetail key="ploandetail-component" />,
            ]}
          />

          {/* 자식 */}
          <Route
            path="/Main"
            element={[
              <Header key="header-component" />,
              <Main key="main-component" />,
            ]}
          />
          <Route
            path="/Mypage"
            element={[
              <Header key="header-component" />,
              <Mypage key="mypage-component" />,
            ]}
          />
          <Route
            path="/AccountBook"
            element={[
              <Header key="header-component" />,
              <AccountBook key="accountbook-component" />,
            ]}
          />
          <Route
            path="/AccountBookDetail"
            element={[
              <Header key="header-component" />,
              <AccountBookDetail key="accountbookdetail-component" />,
            ]}
          />
          <Route
            path="/AccountBookAdd"
            element={[
              <Header key="header-component" />,
              <AccountBookAdd key="accountbookadd-component" />,
            ]}
          />
          <Route
            path="/Alba"
            element={[
              <Header key="header-component" />,
              <Alba key="alba-component" />,
            ]}
          />
          <Route
            path="/AlbaCompleted"
            element={[
              <Header key="header-component" />,
              <AlbaCompleted key="albacompleted-component" />,
            ]}
          />
          <Route
            path="/Deposit"
            element={[
              <Header key="header-component" />,
              <Deposit key="deposit-component" />,
            ]}
          />
          <Route
            path="/DepositJoinDetail"
            element={[
              <Header key="header-component" />,
              <DepositJoinDetail key="depositjoindetail-component" />,
            ]}
          />
          <Route
            path="/DepositJoinSuccess"
            element={[
              <Header key="header-component" />,
              <DepositJoinSuccess key="depositjoinsuccess-component" />,
            ]}
          />
          <Route
            path="/DepositDetail/:id"
            element={[
              <Header key="header-component" />,
              <DepositDetail key="depositdetail-component" />,
            ]}
          />
          <Route
            path="/Loan"
            element={[
              <Header key="header-component" />,
              // <Loan key="loan-component" totalInProgressLoanCount={0} totalLoanBalance={0} inProgressLoanList={[]} />,
              <Loan key="loan-component" totalInProgressLoanCount={0} totalLoanBalance={0} inProgressLoanList={[]} loanLimitation={0} />,
            ]}
          />
          <Route
            path="/LoanCompleted"
            element={[
              <Header key="header-component" />,
              <LoanCompleted key="loancompleted-component" />,
            ]}
          />
          <Route
            path="/Quiz"
            element={[
              <Header key="header-component" />,
              <Quiz key="quiz-component" />,
            ]}
          />
          <Route
            path="/QuizList/:eng"
            element={[
              <Header key="header-component" />,
              <QuizList key="quizlist-component" />,
            ]}
          />
          <Route
            path="/QuizPlay/:eng"
            element={[
              <Header key="header-component" />,
              <QuizPlay key="quizplay-component" />,
            ]}
          />
          <Route
            path="/QuizCommentary/:eng"
            element={[
              <Header key="header-component" />,
              <QuizCommentary key="quizcommentary-component" />,
            ]}
          />
          <Route
            path="/Stock"
            element={[
              <Header key="header-component" />,
              <Stock key="stock-component" />,
            ]}
          />
          <Route
            path="/StockMarket"
            element={[
              <Header key="header-component" />,
              <StockMarket key="stockmarket-component" />,
            ]}
          />
          <Route
            path="/StockDetail/:companyName"
            element={[
              <Header key="header-component" />,
              <StockDetail key="stockdetail-component" />,
            ]}
          />
          <Route
            path="/StockTradingList"
            element={[
              <Header key="header-component" />,
              <StockTradingList key="stocktradinglist-component" />,
            ]}
          />
          <Route
            path="/Lotto"
            element={[
              <Header key="header-component" />,
              <Lotto key="lotto-component" />,
            ]}
          />
          <Route
            path="/LottoChange"
            element={[
              <Header key="header-component" />,
              <LottoChange key="lottochange-component" />,
            ]}
          />
          <Route
            path="/Bot"
            element={[
              <Header key="header-component" />,
              <Bot key="bot-component" />,
            ]}
          />
          <Route
            path="/BotChat"
            element={[
              <Header key="header-component" />,
              <BotChat key="botchat-component" />,
            ]}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
