import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'
import { useTheme } from '../../context/themeContext'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes, expenses} = useGlobalContext()
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
    const tickColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'

    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34,197,94,0.15)',
                pointBackgroundColor: '#22c55e',
                tension: .3,
                fill: true,
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239,68,68,0.12)',
                pointBackgroundColor: '#ef4444',
                tension: .3,
                fill: true,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12,
                    color: tickColor,
                    font: { size: 12 },
                },
            },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#fff',
                titleColor: isDark ? '#e2e8f0' : '#0f172a',
                bodyColor: isDark ? '#94a3b8' : '#475569',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: { color: gridColor },
                ticks: { color: tickColor, font: { size: 11 } },
            },
            y: {
                grid: { color: gridColor },
                ticks: { color: tickColor, font: { size: 11 } },
            },
        },
    }


    return (
        <div className="card border border-base-200 bg-base-100 shadow-sm">
            <div className="card-body">
                <div className="flex items-baseline justify-between gap-3">
                    <h2 className="card-title">Income vs Expenses</h2>
                    <span className="text-xs opacity-60">Last recorded entries</span>
                </div>
                <div className="h-64 w-full">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    )
}
export default Chart