'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Total Revenue',
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const SimpleChart = () => (
  <div>
    <Line data={data} options={options} />
  </div>
);

export default SimpleChart;