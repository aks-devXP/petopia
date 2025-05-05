import React, { useState } from 'react';
import { Eye, Settings, LogOut, User, Home, ChevronDown, Search, Download } from 'lucide-react';
import WelcomeBanner from './WelcomeBanner'
import DashboardSummary from './DashboardSummary';

export default function DashBoard() {
    
    const [showAll, setShowAll] = useState(false);
    const text = "Manage your appointments, patient records, and veterinary services for Petopia.";
  
    const appointments = [
        { name: "John Smith", petType: "Dog", dateTime: "5/7/2023 10:00 AM", status: "Completed", payment: "$75", document: "nr84uf43y3", rating: "⭐⭐⭐⭐⭐" },
        { name: "John Smith", petType: "Cat", dateTime: "2/11/2023 2:30 PM", status: "Completed", payment: "$60", document: "asws4uf433", rating: "⭐⭐⭐⭐" },
        { name: "John Smith", petType: "Bird", dateTime: "8/16/2023 9:15 AM", status: "Completed", payment: "$50", document: "awse2uf43y3", rating: "⭐⭐⭐⭐⭐" },
        { name: "John Smith", petType: "Hamster", dateTime: "1/15/2023 11:45 AM", status: "Completed", payment: "$45", document: "nr84uess2", rating: "⭐⭐⭐" },
        { name: "John Smith", petType: "Dog", dateTime: "8/21/2023 3:00 PM", status: "Completed", payment: "$75", document: "aswe2uf43y3", rating: "⭐⭐⭐⭐" },
        { name: "John Smith", petType: "Cat", dateTime: "9/18/2023 1:30 PM", status: "Completed", payment: "$60", document: "ased33erd3y3", rating: "⭐⭐⭐⭐⭐" },
        { name: "John Smith", petType: "Rabbit", dateTime: "7/11/2023 10:15 AM", status: "Completed", payment: "$55", document: "fsw32uf43y3", rating: "⭐⭐⭐⭐" },
        { name: "John Smith", petType: "Dog", dateTime: "5/19/2023 4:00 PM", status: "Completed", payment: "$75", document: "bgf123445fe", rating: "⭐⭐⭐" },
        { name: "John Smith", petType: "Fish", dateTime: "6/21/2023 9:30 AM", status: "Scheduled", payment: "$40", document: "fsw32uf43y3", rating: "N/A" },
        { name: "John Smith", petType: "Dog", dateTime: "5/30/2023 2:45 PM", status: "Ongoing", payment: "$75", document: "ased33erd3y3", rating: "N/A" },
    ];

    const displayedAppointments = showAll ? appointments : appointments.slice(0, 5);

    return (
        <div className="flex-1 p-4 text-black">
            <WelcomeBanner text={text} Name={"Lirili Larila"} />
            
            {/* Content can go here */}
            <div className="mt-6 bg-white rounded-lg shadow p-4 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
                <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                    <thead>
                    <tr className="border-b">
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Name</th>
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Pet Type</th>
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="py-2 px-3 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedAppointments.map((appointment, index) => (
                        <tr key={index} className={index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2 px-3 text-sm">{appointment.name}</td>
                        <td className="py-2 px-3 text-sm">{appointment.petType}</td>
                        <td className="py-2 px-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                            }`}>
                            {appointment.status}
                            </span>
                        </td>
                        <td className="py-2 px-3">
                            <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={18} />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
                {appointments.length > 5 && (
                    <div className="text-center py-3 mt-2">
                    <button 
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : "View More"}
                    </button>
                    </div>
                )}
                </div>
            </div>

            <DashboardSummary/>
        </div>
    )
}
