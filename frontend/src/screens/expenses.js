import React, { useEffect } from 'react'
import IncomeItem from '../components/IncomeItem/IncomeItem';
import { useGlobalContext } from '../context/globalContext';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
const Expenses = () => {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [getExpenses])
    return (
        <div className="space-y-6">
            <div className="flex justify-center -mb-2">
                <div className="rounded-full bg-base-200/60 px-4 py-1.5 text-xs opacity-75 max-w-fit text-center">
                    ⚠️ Static demo. The API is not currently hosted. Submitting expenses will only update local state.
                </div>
            </div>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">Expenses</h1>
                    <p className="text-sm opacity-70">Track spending and keep it under control.</p>
                </div>
                <div className="rounded-box border border-base-200 bg-base-100 px-4 py-3 shadow-sm">
                    <div className="text-xs opacity-70">Total expenses</div>
                    <div className="text-xl font-extrabold text-error">${totalExpenses()}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="card border border-base-200 bg-base-100 shadow-sm lg:col-span-1">
                    <div className="card-body">
                        <h2 className="card-title">Add expense</h2>
                        <ExpenseForm />
                    </div>
                </div>

                <div className="card border border-base-200 bg-base-100 shadow-sm lg:col-span-2">
                    <div className="card-body">
                        <div className="flex items-baseline justify-between gap-3">
                            <h2 className="card-title">Expense entries</h2>
                            <span className="text-xs opacity-70">{expenses.length} total</span>
                        </div>

                        {expenses.length === 0 ? (
                            <div className="rounded-box border border-base-200 bg-base-100 p-6 text-center">
                                <div className="text-sm font-semibold">No expense entries yet</div>
                                <div className="text-sm opacity-70">Add your first expense on the left.</div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {expenses.map((expense) => {
                                    const { _id, title, amount, date, category, description, type } = expense;
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
                                            deleteItem={deleteExpense}
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
export default Expenses