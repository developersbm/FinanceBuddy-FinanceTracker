import React, { useCallback, useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://127.0.0.1:5001/api/v1/";

const GlobalContext = React.createContext()

const mockIncomes = [
    {
        _id: 'mock-income-1',
        title: 'Salary',
        amount: 4200,
        date: new Date().toISOString(),
        category: 'salary',
        description: 'Monthly paycheck',
        type: 'income',
        createdAt: new Date().toISOString(),
    },
    {
        _id: 'mock-income-2',
        title: 'Freelance project',
        amount: 850,
        date: new Date(Date.now() - 86400000 * 6).toISOString(),
        category: 'freelancing',
        description: 'Client invoice',
        type: 'income',
        createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
]

const mockExpenses = [
    {
        _id: 'mock-expense-1',
        title: 'Groceries',
        amount: 124.35,
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        category: 'groceries',
        description: 'Weekly groceries',
        type: 'expense',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
        _id: 'mock-expense-2',
        title: 'Subscriptions',
        amount: 19.99,
        date: new Date(Date.now() - 86400000 * 10).toISOString(),
        category: 'subscriptions',
        description: 'Streaming service',
        type: 'expense',
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
]

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    const getIncomes = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`)
            setIncomes(response.data)
        } catch (err) {
            // Fallback to mock data for local/demo usage when backend is not running.
            setIncomes(mockIncomes)
        }
    }, [])

    // Calculate incomes
    const addIncome = useCallback(async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income)
            setError(null)
            getIncomes()
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to add income')
        }
    }, [getIncomes])

    const deleteIncome = useCallback(async (id) => {
        if (String(id).startsWith('mock-')) {
            setIncomes((prev) => prev.filter((i) => i._id !== id))
            return
        }
        await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }, [getIncomes])

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + Number(income.amount || 0)
        })

        return totalIncome;
    }


    //calculate expenses
    const getExpenses = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            setExpenses(response.data)
        } catch (err) {
            // Fallback to mock data for local/demo usage when backend is not running.
            setExpenses(mockExpenses)
        }
    }, [])

    const addExpense = useCallback(async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense)
            setError(null)
            getExpenses()
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to add expense')
        }
    }, [getExpenses])

    const deleteExpense = useCallback(async (id) => {
        if (String(id).startsWith('mock-')) {
            setExpenses((prev) => prev.filter((e) => e._id !== id))
            return
        }
        await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }, [getExpenses])

    const totalExpenses = () => {
        let total = 0;
        expenses.forEach((expense) =>{
            total = total + Number(expense.amount || 0)
        })

        return total;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}