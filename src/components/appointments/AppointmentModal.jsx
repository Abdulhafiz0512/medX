import React from 'react';
import { X, CheckCircle, Clock, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

const AppointmentModal = ({
  isOpen,
  onClose,
  doctor,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onConfirm,
  availability,
  bookingSuccess,
}) => {
  if (!isOpen) return null;

  const availableDates = Object.keys(availability || {});
  const availableTimes = selectedDate ? availability[selectedDate] : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {bookingSuccess ? 'Appointment Booked!' : 'Book an Appointment'}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {bookingSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Appointment Confirmed!</h4>
              <p className="text-gray-600">
                Your appointment with Dr. {doctor?.name?.split(' ')[1]} on {selectedDate} at {selectedTime} has been confirmed.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center">
                  <img 
                    src={doctor?.image} 
                    alt={doctor?.name} 
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">Dr. {doctor?.name?.split(' ')[1]}</h4>
                    <p className="text-sm text-gray-500">{doctor?.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableDates.map((date) => {
                      const dateObj = new Date(date);
                      const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNum = dateObj.getDate();
                      const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
                      
                      return (
                        <button
                          key={date}
                          onClick={() => onDateSelect(date)}
                          className={`py-2 px-1 text-sm rounded-md ${
                            selectedDate === date 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div className="font-medium">{day}</div>
                          <div className="text-lg font-bold">{dayNum}</div>
                          <div className="text-xs">{month}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => onTimeSelect(time)}
                          className={`py-2 text-sm rounded-md ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>30 min</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{doctor?.clinic}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Consultation Fee</span>
                    <span className="font-medium text-gray-900">$120</span>
                  </div>
                  <Button 
                    onClick={onConfirm}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Appointment
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
