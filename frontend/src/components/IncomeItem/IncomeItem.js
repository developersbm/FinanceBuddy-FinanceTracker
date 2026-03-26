import React from 'react'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    return (
        <div className="card border border-base-200 bg-base-100 shadow-sm">
            <div className="card-body gap-3 p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-box bg-base-200 text-lg">
                            {type === 'expense' ? expenseCatIcon() : categoryIcon()}
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ background: indicatorColor || 'transparent' }}
                                />
                                <h3 className="truncate text-base font-bold">{title}</h3>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm opacity-80">
                                <span className="flex items-center gap-2">{dollar} {amount}</span>
                                <span className="flex items-center gap-2">{calender} {dateFormat(date)}</span>
                                {description ? (
                                    <span className="flex items-center gap-2">{comment}{description}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-ghost btn-sm btn-circle text-error"
                        aria-label="Delete"
                        onClick={() => deleteItem(id)}
                    >
                        {trash}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default IncomeItem