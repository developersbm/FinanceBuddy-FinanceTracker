import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <HistoryStyled>
            {history.map((item) =>{
                const {_id, title, amount, type} = item

                return (
                    <div key={_id} className="history-item">
                        <p style={{ fontWeight: 'bold', color: 'black' }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'income' ? 'green' : 'red'
                        }}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    h2 {
        font-size: 30px;
    }
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .history-item{
        background: white;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History