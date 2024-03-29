import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

import { Chart as ChartJs, Tooltip } from 'chart.js';

ChartJs.register(Tooltip);

function PieChart() {
    const { incomes, expenses } = useGlobalContext();

    const incomeTotal = incomes.reduce((total, income) => total + income.amount, 0);
    const expenseTotal = expenses.reduce((total, expense) => total + expense.amount, 0);

    const data = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                label: 'Financial Overview',
                data: [incomeTotal, expenseTotal],
                backgroundColor: ['green', 'red'],
                hoverOffset: 4,
            },
        ],
        tooltips: {
            callbacks: {
                label: function(context) {
                    let label = context.label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += context.parsed.toFixed(2) + '%';
                    return label;
                }
            }
        }
    };

    return (
        <ChartStyled>
            <Center>
                <Pie data={data} />
            </Center>
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 0.5rem;
    border-radius: 10px;
    height: 170px;
    width: 300px;
    margin: 0 auto;
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export default PieChart;
