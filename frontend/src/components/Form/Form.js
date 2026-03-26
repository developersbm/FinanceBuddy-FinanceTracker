import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import { plus } from '../../utils/Icons';


function Form() {
    const { addIncome, error, setError } = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category,description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addIncome(inputState)
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div role="alert" className="alert alert-error py-3">
                    <span className="text-sm">{error}</span>
                </div>
            )}

            <input
                type="text"
                value={title}
                name="title"
                placeholder="Income title"
                onChange={handleInput('title')}
                className="input input-bordered w-full"
            />

            <input
                value={amount}
                type="text"
                name="amount"
                placeholder="Amount"
                onChange={handleInput('amount')}
                className="input input-bordered w-full"
            />

            <DatePicker
                id="date"
                placeholderText="Select date"
                selected={date}
                dateFormat="dd/MM/yyyy"
                onChange={(pickedDate) => {
                    setInputState({ ...inputState, date: pickedDate });
                }}
                className="input input-bordered w-full"
            />

            <select
                required
                value={category}
                name="category"
                id="category"
                onChange={handleInput('category')}
                className="select select-bordered w-full"
            >
                <option value="" disabled>Select category</option>
                <option value="salary">Salary</option>
                <option value="freelancing">Freelancing</option>
                <option value="investments">Investments</option>
                <option value="stocks">Stocks</option>
                <option value="bitcoin">BitCoin</option>
                <option value="bank">Bank Transfer</option>
                <option value="other">Other</option>
            </select>

            <textarea
                name="description"
                value={description}
                placeholder="Description (optional)"
                id="description"
                rows={4}
                onChange={handleInput('description')}
                className="textarea textarea-bordered w-full"
            />

            <button type="submit" className="btn btn-primary w-full">
                {plus}
                Add income
            </button>
        </form>
    )
}
export default Form