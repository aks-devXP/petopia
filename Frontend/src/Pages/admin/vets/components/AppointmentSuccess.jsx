import React from 'react';
import { CheckCircle2, Calendar, Clock, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AppointmentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointmentData = location.state?.appointmentData || {
    vetName: "Dr. John Doe",
    date: "March 15, 2024",
    time: "10:00 AM",
    fees: "2590"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1917] to-[#292524] flex items-center justify-center p-4">
      <div className="bg-[#3C2A21] rounded-2xl p-8 max-w-2xl w-full shadow-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#E5E5CB] mb-2">Appointment Confirmed!</h1>
          <p className="text-[#E5E5CB]/70">Your appointment has been successfully scheduled</p>
        </div>

        <div className="bg-[#1C1917] rounded-xl p-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#3C2A21] p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-[#E5E5CB]" />
              </div>
              <div>
                <p className="text-[#E5E5CB]/70 text-sm">Date</p>
                <p className="text-[#E5E5CB] font-medium">{appointmentData.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#3C2A21] p-3 rounded-lg">
                <Clock className="w-6 h-6 text-[#E5E5CB]" />
              </div>
              <div>
                <p className="text-[#E5E5CB]/70 text-sm">Time</p>
                <p className="text-[#E5E5CB] font-medium">{appointmentData.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#3C2A21] p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-[#E5E5CB]" />
              </div>
              <div>
                <p className="text-[#E5E5CB]/70 text-sm">Veterinarian</p>
                <p className="text-[#E5E5CB] font-medium">{appointmentData.vetName}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="w-full bg-[#E5E5CB] text-[#1C1917] font-semibold py-3 rounded-xl hover:bg-[#E5E5CB]/90 transition-colors"
          >
            View in My Appointments
          </button>
          <button
            onClick={() => navigate('/vet-docs')}
            className="w-full border border-[#E5E5CB] text-[#E5E5CB] font-semibold py-3 rounded-xl hover:bg-[#E5E5CB]/10 transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess; 