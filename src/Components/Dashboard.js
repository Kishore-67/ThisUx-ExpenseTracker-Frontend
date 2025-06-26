import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { toast } from 'react-toastify';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [lastMonthTransactions, setLastMonthTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    
    return {
      start: firstDayCurrentMonth,
      end: lastDayCurrentMonth
    };
  };

  const filterCurrentMonthTransactions = (transactions) => {
    const { start, end } = getCurrentMonthRange();
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });
  };

  const fetchData = async () => {
  try {
    const token = localStorage.getItem('token'); // ✅ Get token

    if (!token) {
      console.warn('⚠️ No token found. User not logged in.');
      return;
    }

    const res = await axios.get('https://expensetracker-backend-9d1y.onrender.com/api/transactions', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = res.data;

    setTransactions(data);

    // Filter transactions for current month only
    const currentMonthData = filterCurrentMonthTransactions(data);
    setLastMonthTransactions(currentMonthData);

    // Calculate totals
    let totalIncome = 0;
    let totalExpense = 0;

    currentMonthData.forEach((item) => {
      const amount = Number(item.amount);
      if (item.type === 'income') totalIncome += amount;
      else if (item.type === 'expense') totalExpense += amount;
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
  } catch (err) {
    console.error('❌ Error fetching data:', err);
  }
};

  // Get current month name for display
  const getCurrentMonthName = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Calculate category totals for last month expenses only
  const categoryTotals = lastMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(categoryTotals),
        backgroundColor: ['#4e73df', '#1cc88a', '#f6c23e', '#36b9cc', '#e74a3b'],
      },
    ],
  };

  // Calculate daily expenses for last month
  const getDaysInLastMonth = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return lastMonth.getDate();
  };

  const dailyExpenses = new Array(getDaysInLastMonth()).fill(0);
  const dailyLabels = [];
  
  // Generate labels for days in last month
  for (let i = 1; i <= getDaysInLastMonth(); i++) {
    dailyLabels.push(i.toString());
  }

  // Calculate daily expenses
  lastMonthTransactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const day = new Date(t.date).getDate();
      dailyExpenses[day - 1] += t.amount;
    });

  const barData = {
    labels: dailyLabels,
    datasets: [
      {
        label: `Daily Expenses - ${getCurrentMonthName()}`,
        data: dailyExpenses,
        backgroundColor: '#4e73df',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { 
        display: true,
        text: `Daily Expenses for ${getCurrentMonthName()}`
      },
    },
    scales: {
      y: { beginAtZero: true },
      x: { 
        title: {
          display: true,
          text: 'Day of Month'
        }
      }
    },
  };
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this transaction?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchData(); // refresh the data
    toast.success("Successfully Deleted !")
  } catch (err) {
    console.error("Failed to delete transaction:", err);
    toast.error("Failed to Delete transaction !");
  }
};

const handleEdit = (transaction) => {
  const newAmount = prompt("Enter new amount", transaction.amount);
  if (newAmount && !isNaN(newAmount)) {
    axios.put(`http://localhost:5000/api/transactions/${transaction._id}`, {
      ...transaction,
      amount: Number(newAmount)
    })
    
    .then(() => {
    toast.success("Transaction updated successfully!");
    fetchData();
  })
    .catch(err => {
      
      console.error("Failed to update:", err);
      toast.error("Failed to update transaction.");
      })

  }
  else{
    toast.warn("Enter a Valid Data!")
  }
};


  return (
    <>
      <div className="header-cards">
        <div className="card total-income">
          <h3>Total Income ({getCurrentMonthName()})</h3>
          <p>₹{income.toLocaleString()}</p>
        </div>
        <div className="card total-expense">
          <h3>Total Expenses ({getCurrentMonthName()})</h3>
          <p>₹{expense.toLocaleString()}</p>
        </div>
        <div className="card balance">
          <h3>Balance ({getCurrentMonthName()})</h3>
          <p style={{ color: (income - expense) >= 0 ? '#1cc88a' : '#e74a3b' }}>
            ₹{(income - expense).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h4>Expense Categories - {getCurrentMonthName()}</h4>
          {Object.keys(categoryTotals).length > 0 ? (
            <Pie data={pieData} />
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No expenses recorded for {getCurrentMonthName()}
            </div>
          )}
        </div>
        <div className="chart-box">
          <h4>Daily Expenses - {getCurrentMonthName()}</h4>
          {lastMonthTransactions.some(t => t.type === 'expense') ? (
            <Bar data={barData} options={barOptions} />
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              No expenses recorded for {getCurrentMonthName()}
            </div>
          )}
        </div>
      </div>

      <div className="expense-table">
        <h4>Recent Expenses - {getCurrentMonthName()}</h4>
        <table>
          <thead>
  <tr>
    <th>Date</th>
    <th>Category</th>
    <th>Amount</th>
    <th>Notes</th>
    <th style={{ textAlign: 'center' }}>Actions</th>
  </tr>
</thead>

         <tbody>
  {lastMonthTransactions
    .filter((t) => t.type === 'expense')
    .slice(-10)
    .reverse()
    .map((t, idx) => (
      <tr key={idx}>
        <td>{new Date(t.date).toLocaleDateString()}</td>
        <td>{t.category}</td>
        <td>₹{t.amount.toLocaleString()}</td>
        <td className="notes">{t.notes || '-'}</td>
        <td>
          <div className="action-buttons">
            <button onClick={() => handleEdit(t)} className="edit-btn">Edit</button>
            <button onClick={() => handleDelete(t._id)} className="delete-btn">Delete</button>
          </div>
        </td>
      </tr>
    ))}
</tbody>


        </table>
        {lastMonthTransactions.filter(t => t.type === 'expense').length === 0 && (
          <div style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>
            No expenses recorded for {getCurrentMonthName()}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;