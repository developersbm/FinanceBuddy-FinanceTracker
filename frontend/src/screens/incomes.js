import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/globalContext';
import Form from '../components/Form/Form';
import IncomeItem from '../components/IncomeItem/IncomeItem';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext()

    useEffect(() =>{
        getIncomes()
    }, [getIncomes])
    return (
        <div className="space-y-6">
            <div className="flex justify-center -mb-2">
                <div className="rounded-full bg-base-200/60 px-4 py-1.5 text-xs opacity-75 max-w-fit text-center">
                    ⚠️ Static demo. The API is not currently hosted. Submitting incomes will only update local state.
                </div>
            </div>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">Incomes</h1>
                    <p className="text-sm opacity-70">Track and add income sources.</p>
                </div>
                <div className="rounded-box border border-base-200 bg-base-100 px-4 py-3 shadow-sm">
                    <div className="text-xs opacity-70">Total income</div>
                    <div className="text-xl font-extrabold text-success">${totalIncome()}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="card border border-base-200 bg-base-100 shadow-sm lg:col-span-1">
                    <div className="card-body">
                        <h2 className="card-title">Add income</h2>
                        <Form />
                    </div>
                </div>

                <div className="card border border-base-200 bg-base-100 shadow-sm lg:col-span-2">
                    <div className="card-body">
                        <div className="flex items-baseline justify-between gap-3">
                            <h2 className="card-title">Income entries</h2>
                            <span className="text-xs opacity-70">{incomes.length} total</span>
                        </div>

                        {incomes.length === 0 ? (
                            <div className="rounded-box border border-base-200 bg-base-100 p-6 text-center">
                                <div className="text-sm font-semibold">No income entries yet</div>
                                <div className="text-sm opacity-70">Add your first income on the left.</div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {incomes.map((income) => {
                                    const { _id, title, amount, date, category, description, type } = income;
                                    return (
                                        <IncomeItem
                                            key={_id}
                                            id={_id}
                                            title={title}
                                            description={description}
                                            amount={amount}
                                            date={date}
                                            type={type}
                                            category={category}
                                            indicatorColor="hsl(var(--su))"
                                            deleteItem={deleteIncome}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Income