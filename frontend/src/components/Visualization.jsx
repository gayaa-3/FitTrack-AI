import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
} from 'recharts'
import { format, parseISO } from 'date-fns'

const sampleWorkoutLogs = [
  { date: '2025-07-01', weightLifted: 200, type: 'strength', name: 'Squats' },
  { date: '2025-07-03', weightLifted: 150, type: 'strength', name: 'Deadlift' },
  { date: '2025-07-04', weightLifted: 0, type: 'cardio', name: 'Running' },
  { date: '2025-07-05', weightLifted: 100, type: 'strength', name: 'Bench Press' },
  { date: '2025-07-07', weightLifted: 180, type: 'strength', name: 'Overhead Press' },
]

export default function WorkoutDashboard() {
  const [typeFilter, setTypeFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })

  const filteredData = sampleWorkoutLogs.filter(log => {
    const matchType = !typeFilter || log.type === typeFilter
    const matchName = !nameFilter || log.name.toLowerCase().includes(nameFilter.toLowerCase())
    const matchDate = (!dateRange.from || new Date(log.date) >= new Date(dateRange.from)) &&
                      (!dateRange.to || new Date(log.date) <= new Date(dateRange.to))
    return matchType && matchName && matchDate
  })

  const weightData = filteredData.map(log => ({
    date: format(parseISO(log.date), 'MMM dd'),
    weightLifted: log.weightLifted,
  }))

  const weeklyFrequency = Object.values(
  filteredData.reduce((acc, log) => {
    const week = format(parseISO(log.date), 'yyyy-ww')
    acc[week] = (acc[week] || 0) + 1
    return acc
  }, {})
).map((freq, index) => ({
  week: `Week ${index + 1}`,
  sessions: freq,
}))


  const calendarData = filteredData.map(log => log.date)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="border rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-col gap-3">
          <select
            className="border p-2 rounded"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
          </select>

          <input
            className="border p-2 rounded"
            placeholder="Exercise Name"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />

          <input
            type="date"
            className="border p-2 rounded"
            onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded"
            onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
          />
        </div>
      </div>

      <div className="border rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Total Weight Lifted Over Time</h2>
        <LineChart width={400} height={250} data={weightData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weightLifted" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </div>

      <div className="border rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Weekly Workout Frequency</h2>
        <BarChart width={400} height={250} data={weeklyFrequency}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sessions" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="border rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Workout Calendar</h2>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(31)].map((_, i) => {
            const dateStr = `2025-07-${String(i + 1).padStart(2, '0')}`
            const isWorkoutDay = calendarData.includes(dateStr)
            return (
              <div
                key={i}
                className={`h-10 w-10 flex items-center justify-center rounded text-sm ${
                  isWorkoutDay ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                {i + 1}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
