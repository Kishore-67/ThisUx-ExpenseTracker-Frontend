import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import '../styles/Reports.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA66CC', '#33B5E5'];

function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
  const token = localStorage.getItem('token');

  axios.get('http://localhost:5000/api/transactions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      setTransactions(res.data);
      processCharts(res.data);
    })
    .catch((err) => {
      console.error("Error fetching transactions:", err);
    });
}, []);

  const processCharts = (data) => {
    const monthly = {};
    const category = {};
    let total = 0;

    data.forEach((t) => {
      if (t.type !== 'expense') return;

      const date = new Date(t.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();

      const monthKey = `${month} ${year}`;
      monthly[monthKey] = (monthly[monthKey] || 0) + Math.abs(t.amount);

      category[t.category] = (category[t.category] || 0) + Math.abs(t.amount);

      total += Math.abs(t.amount);
    });

    const monthlyArr = Object.entries(monthly).map(([name, value]) => ({ name, value }));
    const categoryArr = Object.entries(category).map(([name, value]) => ({ name, value }));

    setBarData(monthlyArr);
    setPieData(categoryArr);
    setTotalExpense(total);
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Reports</h2>
        <div className="filters">
          <select><option>All Months</option></select>
          <select><option>All Years</option></select>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h4>Expenses by Month</h4>
          <BarChart width={400} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1e90ff" />
          </BarChart>
        </div>

        <div className="chart-card">
          <h4>Expense by Categories</h4>
          <PieChart width={300} height={250}>
            <Pie
              data={pieData}
              cx={150}
              cy={120}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>
      </div>

      <div className="table-section">
        <h4>Expenses by Category</h4>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>% of Total</th>
            </tr>
          </thead>
          <tbody>
            {pieData.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>₹{item.value.toLocaleString()}</td>
                <td>{((item.value / totalExpense) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
