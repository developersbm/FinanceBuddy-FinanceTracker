import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/globalContext';
import { useTheme } from '../../context/themeContext';

import { Chart as ChartJs, Tooltip, ArcElement, Legend } from 'chart.js';

ChartJs.register(Tooltip, ArcElement, Legend);

function PieChart() {
    const { incomes, expenses } = useGlobalContext();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const tickColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)';

    const incomeTotal = incomes.reduce((total, income) => total + Number(income.amount || 0), 0);
    const expenseTotal = expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0);

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Financial Overview',
                data: [incomeTotal, expenseTotal],
                backgroundColor: ['#22c55e', '#ef4444'],
                hoverBackgroundColor: ['#16a34a', '#dc2626'],
                borderWidth: 0,
                hoverOffset: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    color: tickColor,
                    font: { size: 12 },
                    padding: 16,
                },
            },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#fff',
                titleColor: isDark ? '#e2e8f0' : '#0f172a',
                bodyColor: isDark ? '#94a3b8' : '#475569',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderWidth: 1,
                callbacks: {
                    label: (context) => {
                        const label = context.label ? `${context.label}: ` : '';
                        const value = context.parsed;
                        return `${label}$${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <div className="card mx-auto border border-base-200 bg-base-100 shadow-sm h-full w-full">
            <div className="card-body flex flex-col">
                <div className="flex items-baseline justify-between gap-3 flex-none">
                    <h2 className="card-title">Overview</h2>
                    <span className="text-xs opacity-60">Income vs expenses</span>
                </div>
                <div className="flex flex-1 w-full items-center justify-center py-2">
                    <div className="h-48 w-full max-w-xs md:h-64">
                        <Pie data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PieChart;
