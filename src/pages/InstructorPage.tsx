import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Plus, Mail } from 'lucide-react';

interface ApprovedRequest {
  id: number;
  studentId: string;
  studentName: string;
  email: string;
  subject: string;
  originalDate: string;
  originalTime: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  approvedAt: string;
}

interface LabSchedule {
  id: number;
  date: string;
  timeSlot: string;
  subject: string;
  labId: number;
  labName: string;
  location: string;
  coordinatorId: string;
  students: string[];
}

interface InstructorPageProps {
  onBack: () => void;
}

const InstructorPage: React.FC<InstructorPageProps> = ({ onBack }) => {
  const [approvedRequests, setApprovedRequests] = useState<ApprovedRequest[]>([]);
  const [schedules, setSchedules] = useState<LabSchedule[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    date: '',
    timeSlot: '',
    subject: '',
    labId: 1,
    labName: 'Computer Lab 1',
    location: 'Building A, Room 101',
    coordinatorId: 'COORD001',
    students: [] as string[]
  });

  // Mock data
  useEffect(() => {
    const mockApprovedRequests: ApprovedRequest[] = [
      {
        id: 1,
        studentId: '22E008',
        studentName: 'WITHARANA A.D.S.',
        email: '2022e008@eng.jfn.ac.lk',
        subject: 'Database Systems Lab 03',
        originalDate: '2025-03-16',
        originalTime: '09:00',
        preferredDate: '2025-04-19',
        preferredTime: '08:00',
        reason: 'Family emergency',
        approvedAt: '2025-03-18'
      }
    ];

    const mockSchedules: LabSchedule[] = [
      {
        id: 1,
        date: '2025-05-19',
        timeSlot: '08:00-11:00',
        subject: 'Database Systems Lab 02',
        labId: 1,
        labName: 'Computer Lab 1',
        location: 'Building A, Room 101',
        coordinatorId: 'COORD001',
        students: ['22E065']
      }
    ];

    setApprovedRequests(mockApprovedRequests);
    setSchedules(mockSchedules);
  }, []);

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const schedule: LabSchedule = {
      id: schedules.length + 1,
      ...newSchedule,
      timeSlot: `${newSchedule.timeSlot}-${addHours(newSchedule.timeSlot, 2)}`
    };

    setSchedules(prev => [...prev, schedule]);
    
    // Send email notifications to students
    // await sendScheduleNotifications(schedule);
    
    setShowCreateForm(false);
    setNewSchedule({
      date: '',
      timeSlot: '',
      subject: '',
      labId: 1,
      labName: 'Computer Lab 1',
      location: 'Building A, Room 101',
      coordinatorId: 'COORD001',
      students: []
    });
  };

  const addHours = (time: string, hours: number): string => {
    const [hour, minute] = time.split(':').map(Number);
    const newHour = (hour + hours) % 24;
    return `${newHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showCreateForm) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Schedule List
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Create New Schedule</h1>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Lab Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newSchedule.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="timeSlot"
                    value={newSchedule.timeSlot}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={newSchedule.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter subject name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lab
                  </label>
                  <select
                    name="labId"
                    value={newSchedule.labId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value={1}>Computer Lab 1 - Building A, Room 101</option>
                    <option value={2}>Computer Lab 2 - Building A, Room 102</option>
                    <option value={3}>Physics Lab - Building B, Room 201</option>
                    <option value={4}>Chemistry Lab - Building B, Room 301</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coordinator ID
                  </label>
                  <input
                    type="text"
                    name="coordinatorId"
                    value={newSchedule.coordinatorId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter coordinator ID"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Instructor Portal</h1>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Schedule
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Approved Reschedule Requests</h2>
              
              {approvedRequests.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Approved Requests</h3>
                  <p className="text-gray-500">No reschedule requests have been approved yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {approvedRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-green-50 border border-green-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {request.studentName} ({request.studentId})
                        </h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Approved
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Subject:</span>
                          <p className="text-gray-800">{request.subject}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Original:</span>
                          <p className="text-gray-800">{request.originalDate} at {request.originalTime}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Preferred:</span>
                          <p className="text-gray-800">{request.preferredDate} at {request.preferredTime}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Approved:</span>
                          <p className="text-gray-800">{request.approvedAt}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <span className="font-medium text-gray-600">Reason:</span>
                        <p className="text-gray-800 mt-1">{request.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Lab Schedules</h2>
              
              {schedules.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Schedules Created</h3>
                  <p className="text-gray-500">Create your first lab schedule to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {schedule.subject}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Scheduled
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Date & Time:</span>
                          <p className="text-gray-800">{schedule.date} - {schedule.timeSlot}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Lab:</span>
                          <p className="text-gray-800">{schedule.labName}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Location:</span>
                          <p className="text-gray-800">{schedule.location}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Students:</span>
                          <p className="text-gray-800">{schedule.students.length} enrolled</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-1" />
                          Send Notifications
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;