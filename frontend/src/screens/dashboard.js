import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/globalContext';
import { dollar } from '../utils/Icons';
import History from '../History/History';
import Chart from '../components/Chart/Chart';
import PieChart from '../components/Chart/PieChart';

const Dashboard = () => {
  const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  const balance = totalBalance();
  const balanceColor = balance >= 0 ? 'text-success' : 'text-error';

  return (
    <div className="space-y-8">
      <div className="flex justify-center -mb-2">
        <div className="rounded-full bg-base-200/60 px-4 py-1.5 text-xs opacity-75 max-w-fit text-center">
          ⚠️ Static demo. The API is not currently hosted. Data shown is local mock data.
        </div>
      </div>

      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-sm opacity-60">Your financial overview at a glance.</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card border border-base-200 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="card-body py-5">
            <div className="flex items-center gap-2 text-sm opacity-60 mb-1">
              <i className="fa-solid fa-arrow-trend-up text-success" />
              Total Income
            </div>
            <div className="text-3xl font-extrabold text-success">
              {dollar}&nbsp;{totalIncome()}
            </div>
          </div>
        </div>

        <div className="card border border-base-200 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="card-body py-5">
            <div className="flex items-center gap-2 text-sm opacity-60 mb-1">
              <i className="fa-solid fa-arrow-trend-down text-error" />
              Total Expenses
            </div>
            <div className="text-3xl font-extrabold text-error">
              {dollar}&nbsp;{totalExpenses()}
            </div>
          </div>
        </div>

        <div className="card border border-base-200 bg-base-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="card-body py-5">
            <div className="flex items-center gap-2 text-sm opacity-60 mb-1">
              <i className="fa-solid fa-wallet" />
              Net Balance
            </div>
            <div className={`text-3xl font-extrabold ${balanceColor}`}>
              {dollar}&nbsp;{balance}
            </div>
          </div>
        </div>
      </div>

      {/* Chart row — full width */}
      <Chart />

      {/* Bottom section: Pie chart + activity + ranges side by side */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Left: Pie chart */}
        <PieChart />

        {/* Right: Recent activity + ranges */}
        <div className="flex flex-col gap-6">

          {/* Recent activity */}
          <div className="card border border-base-200 bg-base-100 shadow-sm flex-1">
            <div className="card-body gap-4">
              <div className="flex items-baseline justify-between">
                <h2 className="card-title">Recent Activity</h2>
                <span className="text-xs opacity-60">Latest transactions</span>
              </div>
              <History />
            </div>
          </div>

          {/* Ranges */}
          <div className="card border border-base-200 bg-base-100 shadow-sm">
            <div className="card-body gap-4">
              <h2 className="card-title">Ranges</h2>

              {/* Income range */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">Income range</div>
                  <div className="text-xs opacity-60">Min / Max</div>
                </div>
                <div className="flex items-center justify-between rounded-box border border-base-200 bg-base-200/40 px-4 py-3">
                  <span className="font-semibold text-success">
                    ${incomes.length ? Math.min(...incomes.map((i) => i.amount)) : 0}
                  </span>
                  <span className="text-xs opacity-40">—</span>
                  <span className="font-semibold text-success">
                    ${incomes.length ? Math.max(...incomes.map((i) => i.amount)) : 0}
                  </span>
                </div>
              </div>

              {/* Expense range */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">Expense range</div>
                  <div className="text-xs opacity-60">Min / Max</div>
                </div>
                <div className="flex items-center justify-between rounded-box border border-base-200 bg-base-200/40 px-4 py-3">
                  <span className="font-semibold text-error">
                    ${expenses.length ? Math.min(...expenses.map((e) => e.amount)) : 0}
                  </span>
                  <span className="text-xs opacity-40">—</span>
                  <span className="font-semibold text-error">
                    ${expenses.length ? Math.max(...expenses.map((e) => e.amount)) : 0}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
