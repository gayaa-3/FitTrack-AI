

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import './WorkVisualization.css';

const lineChartData = [
  { date: 'Jul 1', weightLifted: 200 },
  { date: 'Jul 3', weightLifted: 150 },
  { date: 'Jul 4', weightLifted: 0 },
  { date: 'Jul 5', weightLifted: 100 },
  { date: 'Jul 7', weightLifted: 180 },
];

const barChartData = [
  { week: 'Week 1', count: 4 },
  { week: 'Week 2', count: 1 },
  { week: 'Week 3', count: 5 },
];

const calendarData = [
  '2025-07-01',
  '2025-07-03',
  '2025-07-04',
  '2025-07-05',
  '2025-07-07',
];

const CalendarView = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const daysArray = [...Array(daysInMonth)].map((_, index) => {
    const day = index + 1;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isWorkoutDay = calendarData.includes(dateStr);

    return (
      <div
        key={day}
        className={`calendar-day ${isWorkoutDay ? 'workout-day' : ''}`}
      >
        {day}
      </div>
    );
  });

  return (
    <div className="card calendar-container">
      <h3>Workout Calendar</h3>
      <div className="calendar-grid">{daysArray}</div>
    </div>
  );
};

const WorkVisualization = () => {
  return (
    <div className="dashboard-container">
      <div className="card filters">
        <h3>Filters</h3>
        <select><option>All Types</option></select>
        <input type="text" placeholder="Exercise Name" />
        <input type="date" />
        <input type="date" />
      </div>

      <div className="card line-chart">
        <h3>Total Weight Lifted Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineChartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weightLifted" stroke="#6C63FF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card bar-chart">
        <h3>Weekly Workout Frequency</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barChartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#71c285" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <CalendarView />
    </div>
  );
};

export default WorkVisualization;
