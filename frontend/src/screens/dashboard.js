import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/globalContext';
import styled from 'styled-components'
import { dollar } from '../utils/Icons';
import History from '../History/History';
import Chart from '../components/Chart/Chart';

const Dashboard = () => {
  const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
  
  useEffect(() => {
    getIncomes()
    getExpenses()
  }, [])

  return (
    <DashboardStyled>
        <div className="header-container">
        <h1 className="main-title">All Transactions</h1>
        <h1 className="sub-title">Recent History</h1>
        </div>
        <div className="stats-con">
            <div className='chart-con'>
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
                        <p>
                            {dollar} {totalBalance()}
                        </p>
                    </div>
                </div>
            </div>
            <div className="history-con">
                <History />
                <h2 className="salary-title">Min <span>Income</span>Max</h2>
                <div className="salary-item">
                    <p>
                        ${Math.min(...incomes.map(item => item.amount))}
                    </p>
                    <p>
                        ${Math.max(...incomes.map(item => item.amount))}
                    </p>
                </div>
                <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                <div className="salary-item">
                    <p>
                        ${Math.min(...expenses.map(item => item.amount))}
                    </p>
                    <p>
                        ${Math.max(...expenses.map(item => item.amount))}
                    </p>
                </div>
            </div>
        </div>
</DashboardStyled>
  );
};

const DashboardStyled = styled.div`
    .header-container {
    display: flex;
    justify-content: space-between;
    }
    .sub-title {
    margin-right: 2rem;
    text-align: right;
    }
    .main-title {
        margin-left: 2rem;
        display: grid;
    }
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 3rem;
        margin-left: 2rem;
        h1 {
            font-size: 30px;
        }
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: linear-gradient(to bottom right, lightgreen, lightblue);
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    width: 80%;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            margin-right: 20px;
            padding-right: 30px;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: linear-gradient(to bottom right, lightgreen, lightblue);
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard;
