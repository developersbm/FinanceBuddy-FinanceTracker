import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/globalContext';
import styled from 'styled-components';
import { dollar } from '../utils/Icons';
import History from '../History/History';
import Chart from '../components/Chart/Chart';
import PieChart from '../components/Chart/PieChart';

const Dashboard = () => {
  const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled> 
    <h1 className='history-title'>Financial History</h1>      
    <div className="stats-con">
        <div className="chart-con">
          <div className="chart-container">
            <Chart />
            <PieChart />
          </div>
          <div className="amount-con">
            <div className="income">
              <h2>Total Income</h2>
              <p>
                {dollar} {totalIncome()}
              </p>
            </div>
            <div className="expense">
              <h2>Total Expense</h2>
              <p>
                {dollar} {totalExpenses()}
              </p>
            </div>
            <div className="balance">
              <h2>Total Balance</h2>
              <p className="total-balance">
                {dollar} {totalBalance()}
              </p>
            </div>
          </div>
        </div>
        <div className="history-con">
          <History />
          <h2 className="salary-title">
            Min <span>Income</span>Max
          </h2>
          <div className="salary-item">
            <p>${Math.min(...incomes.map((item) => item.amount))}</p>
            <p>${Math.max(...incomes.map((item) => item.amount))}</p>
          </div>
          <h2 className="salary-title">
            Min <span>Expense</span>Max
          </h2>
          <div className="salary-item">
            <p>${Math.min(...expenses.map((item) => item.amount))}</p>
            <p>${Math.max(...expenses.map((item) => item.amount))}</p>
          </div>
        </div>
      </div>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  .history-title {
    text-align: right;
    margin-right: 13pc;
    padding-bottom: 5px;
    font-size: 1.7rem;
  }
  .sub-title {
    margin-right: 2rem;
    text-align: right;
  }
  .main-title {
    display: grid;
  }
  .stats-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    margin-left: 2rem;
    .chart-con {
      .chart-container {
        display: flex;
        gap: 3rem;
      }
      .amount-con {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income {
          color: green !important;
        }
        .expense {
          color: red;
        }
        .income,
        .expense,
        .balance {
          background: white;
          height: 78px;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          width: 100%;
          p {
            font-size: 1.7rem;
            font-weight: 600;
            margin-bottom: 30px;
          }
          h2 {
            font-size: 1.5rem;
            margin-top: -10px;
            color: black !important;
          }
        }
        .balance {
          display: flex;
          flex-direction: column;
          align-items: left;
          p {
            color: var(--color-green);
            font-size: 1.7rem;
            margin-bottom: 28px;
          }
        }
      }
    }
    .history-con {
      margin-right: 20px;
      padding-right: 30px;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: white;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
