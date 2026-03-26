import React from 'react'
import { useGlobalContext } from '../context/globalContext';

function History() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <div className="space-y-2">
            {history.map((item) =>{
                const {_id, title, amount, type} = item

                return (
                    <div key={_id} className="flex items-center justify-between rounded-box border border-base-200 bg-base-100 px-4 py-3 hover:bg-base-200/30">
                        <p className="truncate font-semibold">
                            {title}
                        </p>

                        <p className={type === 'income' ? 'font-bold text-success' : 'font-bold text-error'}>
                            {type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default History