import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function MoodDashboard() {
  const { fetchWithAuth } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('week'); // week, month, all
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries();
    // eslint-disable-next-line
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetchWithAuth('https://mental-health-app-3xur.onrender.com/api/journals');
      if (response.status === 401) {
        navigate('/signin');
        return;
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        setError('Failed to load your journal data. Please sign in again.');
        setEntries([]);
        return;
      }
      setEntries(data);
    } catch (error) {
      setError('Failed to fetch entries.');
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  // Mood mapping for numerical values
  const moodValues = {
    '😊': 5, // Happy
    '😐': 3, // Neutral
    '😢': 1, // Sad
    '😠': 2, // Angry
    '😨': 1, // Anxious
  };

  const moodLabels = {
    '😊': 'Happy',
    '😐': 'Neutral',
    '😢': 'Sad',
    '😠': 'Angry',
    '😨': 'Anxious',
  };

  const moodColors = {
    '😊': '#10B981', // Green
    '😐': '#6B7280', // Gray
    '😢': '#3B82F6', // Blue
    '😠': '#EF4444', // Red
    '😨': '#F59E0B', // Yellow
  };

  // Process data for charts
  const processChartData = () => {
    if (!entries.length) return [];

    const now = new Date();
    const filteredEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const diffTime = Math.abs(now - entryDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (timeRange) {
        case 'week':
          return diffDays <= 7;
        case 'month':
          return diffDays <= 30;
        default:
          return true; // all time
      }
    });

    // Group by date and calculate average mood
    const groupedData = filteredEntries.reduce((acc, entry) => {
      const date = new Date(entry.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { entries: [], totalMood: 0, count: 0 };
      }
      acc[date].entries.push(entry);
      acc[date].totalMood += moodValues[entry.mood] || 0;
      acc[date].count += 1;
      return acc;
    }, {});

    // Convert to chart format
    return Object.entries(groupedData)
      .map(([date, data]) => ({
        date,
        averageMood: Math.round((data.totalMood / data.count) * 10) / 10,
        count: data.count,
        entries: data.entries
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Calculate mood distribution for pie chart
  const getMoodDistribution = () => {
    const distribution = {};
    entries.forEach(entry => {
      distribution[entry.mood] = (distribution[entry.mood] || 0) + 1;
    });

    return Object.entries(distribution).map(([mood, count]) => ({
      name: moodLabels[mood],
      value: count,
      mood: mood,
      color: moodColors[mood]
    }));
  };

  // Calculate statistics
  const getStats = () => {
    if (!entries.length) return {};

    const moodScores = entries.map(entry => moodValues[entry.mood] || 0);
    const averageMood = moodScores.reduce((a, b) => a + b, 0) / moodScores.length;
    
    const totalEntries = entries.length;
    const thisWeek = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    }).length;

    return {
      averageMood: Math.round(averageMood * 10) / 10,
      totalEntries,
      thisWeek,
      streak: calculateStreak()
    };
  };

  // Calculate current streak
  const calculateStreak = () => {
    if (!entries.length) return 0;

    const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
    const today = new Date().toDateString();
    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < 30; i++) { // Check last 30 days
      const dateStr = currentDate.toDateString();
      const hasEntry = sortedEntries.some(entry => 
        new Date(entry.date).toDateString() === dateStr
      );

      if (hasEntry) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const chartData = processChartData();
  const moodDistribution = getMoodDistribution();
  const stats = getStats();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading your mood data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600 font-medium">{error}</div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📊 Mood Tracking Dashboard</h2>
        <p className="text-gray-600">Visualize your emotional patterns and track your mental health journey</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center space-x-4">
        {['week', 'month', 'all'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              timeRange === range
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.averageMood || 0}</div>
          <div className="text-sm text-gray-600">Average Mood</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-2xl font-bold text-green-600">{stats.totalEntries || 0}</div>
          <div className="text-sm text-gray-600">Total Entries</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-2xl font-bold text-purple-600">{stats.thisWeek || 0}</div>
          <div className="text-sm text-gray-600">This Week</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-2xl font-bold text-orange-600">{stats.streak || 0}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trend Line Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Mood Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="averageMood"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Mood Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moodDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {moodDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Entry Count Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Daily Entry Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Empty State */}
      {!entries.length && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">No data yet</h3>
          <p className="text-gray-600 mb-6">Start journaling to see your mood trends and patterns.</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
          >
            Write Your First Entry
          </a>
        </div>
      )}
    </div>
  );
} 