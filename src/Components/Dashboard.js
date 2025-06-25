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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions');
      const data = res.data;

      setTransactions(data);

      var totalIncome  =0;
      var totalExpense = 0;

      data.forEach((item) => {
        const amount = Number(item.amount);
        if (item.type === 'income') totalIncome += amount;
        else if (item.type === 'expense') totalExpense += amount;
      });

      setIncome(totalIncome);
      setExpense(totalExpense);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const categoryTotals = transactions
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

  const monthlyExpenses = new Array(12).fill(0);
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      const month = new Date(t.date).getMonth();
      monthlyExpenses[month] += t.amount;
    });

  const barData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlyExpenses,
        backgroundColor: '#4e73df',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <>
      <div className="header-cards">
        <div className="card total-income">
          <h3>Total Income</h3>
          <p>₹{income.toLocaleString()}</p>
        </div>
        <div className="card total-expense">
          <h3>Total Expenses</h3>
          <p>₹{expense.toLocaleString()}</p>
        </div>
        <div className="card balance">
          <h3>Balance</h3>
          <p>₹{(income - expense).toLocaleString()}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h4>Expense Categories</h4>
          <Pie data={pieData} />
        </div>
        <div className="chart-box">
          <h4>Monthly Expenses</h4>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className="expense-table">
        <h4>Recent Expense</h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .filter((t) => t.type === 'expense')
              .slice(-5)
              .reverse()
              .map((t, idx) => (
                <tr key={idx}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td>{t.category}</td>
                  <td>₹{t.amount.toLocaleString()}</td>
                  <td className="notes">{t.notes || '-'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
