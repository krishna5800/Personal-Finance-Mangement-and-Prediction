import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const Home = () => {
  useEffect(() => {
    // Data for daily expenses 
    const dailyExpensesData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Daily Expenses',
          data: [500, 400, 600, 700, 300, 450], // Example data
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Data for category-wise expenses
    const categoryWiseData = {
      labels: ['Food', 'Transport', 'Housing', 'Entertainment', 'Healthcare'],
      datasets: [
        {
          label: 'Category-wise Expenses',
          data: [3000, 1500, 4000, 1200, 800], 
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    
    const ctxDaily = document.getElementById('dailyExpensesChart').getContext('2d');
    new Chart(ctxDaily, {
      type: 'line', 
      data: dailyExpensesData,
    });

    
    const ctxCategory = document.getElementById('categoryWiseChart').getContext('2d');
    new Chart(ctxCategory, {
      type: 'doughnut',
      data: categoryWiseData,
    });
  }, []);

  return (
    <div>
      <h1>Expense Overview</h1>
      <div>
        <h2>Daily Expenses</h2>
        <canvas id="dailyExpensesChart"></canvas>
      </div>
      <div>
        <h2>Category-wise Expenses</h2>
        <canvas id="categoryWiseChart"></canvas>
      </div>
    </div>
  );
};

export default Home;
