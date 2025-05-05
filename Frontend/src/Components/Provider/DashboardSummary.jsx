import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IndianRupee, Users, Star } from 'lucide-react';

export default function DashboardSummary() {

  const generateDailyData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      data.push({
        date: date.getDate(),
        revenue: Math.floor(Math.random() * 20000) + 10000,
        patients: Math.floor(Math.random() * 15) + 5
      });
    }
    
    return data;
  };
  
  const [dailyData, setDailyData] = useState(generateDailyData());
  
  // Calculate summary values
  const totalRevenue = dailyData.reduce((sum, day) => sum + day.revenue, 0);
  const totalPatients = dailyData.reduce((sum, day) => sum + day.patients, 0);
  const rating = 4.8;
  
  // Previous month comparisons 
  const revenueChange = 5.2;
  const patientsChange = 9.3;
  const ratingChange = -0.6;

  return (
    <div className="space-y-6">

      {/* Summary Cards */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Revenue Card */}
          <div className="p-4 border border-black/20 rounded-2xl">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-200 rounded-full mr-2">
                <IndianRupee size={20} className="text-green-700" />
              </div>
              <span className="text-gray-600">Total Revenue</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-bold">₹ {totalRevenue.toLocaleString()}</span>
              <div className="flex items-center mt-1">
                <span className={`text-xs ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  <span className="mr-1">{revenueChange >= 0 ? '↑' : '↓'}</span>
                  {Math.abs(revenueChange)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last 30 days</span>
              </div>
            </div>
          </div>
          
          {/* Total Patients Card */}
          <div className="p-4 border border-black/20 rounded-2xl">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-full mr-2">
                <Users size={20} className="text-blue-600" />
              </div>
              <span className="text-gray-600">Patient Visited</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{totalPatients}</span>
              <div className="flex items-center mt-1">
                <span className={`text-xs ${patientsChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  <span className="mr-1">{patientsChange >= 0 ? '↑' : '↓'}</span>
                  {Math.abs(patientsChange)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last 30 days</span>
              </div>
            </div>
          </div>
          
          {/* Rating Card */}
          <div className="p-4 border border-black/20 rounded-2xl">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-yellow-100 rounded-full mr-2">
                <Star size={20} className="text-yellow-600" />
              </div>
              <span className="text-gray-600">Rating</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{rating.toFixed(1)}</span>
              <div className="flex items-center mt-1">
                <span className={`text-xs ${ratingChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  <span className="mr-1">{ratingChange >= 0 ? '↑' : '↓'}</span>
                  {Math.abs(ratingChange)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">vs last 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Balance</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-300 mr-1"></div>
              <span className="text-sm text-gray-600">Patients</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#0284c7" />
              <YAxis yAxisId="right" orientation="right" stroke="#93c5fd" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#0284c7" />
              <Bar yAxisId="right" dataKey="patients" name="Patients" fill="#93c5fd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}