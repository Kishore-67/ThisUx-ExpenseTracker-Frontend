// Transaction.js
import React, { useState } from 'react';
import '../styles/Transaction.css';
import { toast } from 'react-toastify';

const Transaction = () => {
  const [expense, setExpense] = useState({
    date: '',
    amount: '',
    category: '',
    notes: '',
  });

  const [income, setIncome] = useState({
    date: '',
    amount: '',
    category: '',
    notes: '',
  });

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleIncomeChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

const handleSubmit = async (type, data) => {
  try {
    // 🔐 Get the token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('User not authenticated.');
      return;
    }

    // 📨 Send POST request with token in header
    const response = await fetch('https://expensetracker-backend-9d1y.onrender.com/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ Attach token
      },
      body: JSON.stringify({ ...data, type }),
    });

    if (response.ok) {
      toast.success(`${type === 'expense' ? 'Expense' : 'Income'} added successfully!`);

      type === 'expense'
        ? setExpense({ date: '', amount: '', category: '', notes: '' })
        : setIncome({ date: '', amount: '', category: '', notes: '' });
    } else {
      toast.error('Failed to add transaction. Try again!');
    }
  } catch (err) {
    console.error(err);
    toast.error('Server error while submitting transaction.');
  }
};


  return (
    <div className="transaction-form-section">
      <div className="transaction-card">
        <h2>Expense</h2>
        <form className="transaction-form" onSubmit={(e) => { e.preventDefault(); handleSubmit('expense', expense); }}>
          <label>Date</label>
          <input type="date" name="date" value={expense.date} onChange={handleExpenseChange} />

          <label>Amount</label>
          <input type="number" name="amount" placeholder="Enter amount" value={expense.amount} onChange={handleExpenseChange} />

          <label>Category</label>
          <select name="category" value={expense.category} onChange={handleExpenseChange}>
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="transport">Transport</option>
            <option value="Other">Other</option>
          </select>

          <label>Notes</label>
          <textarea name="notes" placeholder="Write notes..." value={expense.notes} onChange={handleExpenseChange} />

          <button type="submit">Add Expense</button>
        </form>
      </div>

      <div className="transaction-card">
        <h2>Income</h2>
        <form className="transaction-form" onSubmit={(e) => { e.preventDefault(); handleSubmit('income', income); }}>
          <label>Date</label>
          <input type="date" name="date" value={income.date} onChange={handleIncomeChange} />

          <label>Amount</label>
          <input type="number" name="amount" placeholder="Enter amount" value={income.amount} onChange={handleIncomeChange} />

          <label>Source</label>
          <select name="category" value={income.category} onChange={handleIncomeChange}>
            <option value="">Select Source</option>
            <option value="salary">Salary</option>
            <option value="freelance">Freelance</option>
            <option value="other">Other</option>
          </select>

          <label>Notes</label>
          <textarea name="notes" placeholder="Write notes..." value={income.notes} onChange={handleIncomeChange} />

          <button type="submit">Add Income</button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
