import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './Admin.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        const token = adminInfo ? adminInfo.token : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('/api/admin/dashboard-stats', config);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="admin-overview-container">Loading...</div>;
  if (error) return <div className="admin-overview-container">Error: {error}</div>;

  const chartData = {
    labels: ['Users', 'Listings', 'Contact Messages'],
    datasets: [
      {
        label: 'Count',
        data: [stats.userCount, stats.listingCount, stats.contactMessageCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Overview Statistics',
      },
    },
  };

  return (
    <div className="admin-overview-container">
      <h2>Admin Dashboard Overview</h2>
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.userCount}</p>
        </div>
        <div className="stat-card">
          <h3>Total Listings</h3>
          <p>{stats.listingCount}</p>
        </div>
        <div className="stat-card">
          <h3>Total Contact Messages</h3>
          <p>{stats.contactMessageCount}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-item">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="chart-item">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;