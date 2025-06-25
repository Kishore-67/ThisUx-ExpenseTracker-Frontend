// Reports.js
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend,
} from 'recharts';
import '../styles/Reports.css';

const barData = [
  { name: 'Jan', value: 15000 },
  { name: 'Feb', value: 25000 },
  { name: 'Mar', value: 20000 },
  { name: 'Apr', value: 32000 },
  { name: 'May', value: 40000 },
  { name: 'Jun', value: 28000 },
  { name: 'Jul', value: 35000 },
];

const pieData = [
  { name: 'Rent', value: 12000 },
  { name: 'Salaries', value: 9000 },
  { name: 'Utilities', value: 6000 },
  { name: 'Office', value: 3000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Reports() {
  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Reports</h2>
        <div className="filters">
          <select><option>April</option></select>
          <select><option>2025</option></select>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h4>Expenses by Month</h4>
          <BarChart width={400} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#007bff" />
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
            <tr><td>Rent</td><td>₹12,000</td><td>40.0%</td></tr>
            <tr><td>Salaries</td><td>₹9,000</td><td>26.0%</td></tr>
            <tr><td>Utilities</td><td>₹6,000</td><td>20.0%</td></tr>
            <tr><td>Office</td><td>₹3,000</td><td>13.0%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
