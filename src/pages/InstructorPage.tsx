import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Plus, Mail } from 'lucide-react';
import axios from 'axios';

interface ApprovedRequest {
  Request_id: string;
  student_id: string;
  F_name: string;
  L_name: string;
  email: string;
  Reason: string;
  status: string;
  created_at: string;
  Instructor_id: string;
  coordinator_id: string;
  lab_name: string;
}

interface LabSchedule {
  Schedule_id: string;
  Date: string;
  Time_Slot: string;
  Subject: string;
  Lab_id: string;
  Lab_name: string;
  Location: string;
  coordinator_id: string;
  students?: string[];
}

interface InstructorPageProps {
  onBack: () => void;
}

const InstructorPage: React.FC<InstructorPageProps> = ({ onBack }) => {
  const [approvedRequests, setApprovedRequests] = useState<ApprovedRequest[]>([]);
  const [schedules, setSchedules] = useState<LabSchedule[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState<LabSchedule>(
    {
      Schedule_id: '',
      Date: '',
      Time_Slot: '',
      Subject: '',
      Lab_id: '',
      Lab_name: '',
      Location: '',
      coordinator_id: '',
      students: []
    }
  );

  // Mock data
  useEffect(() => {
    axios.get('http://localhost/schedule/src/services/database.php?action=get_requests')
      .then(response => {
      console.log('API Response:', response.data);
      // Filter only approved requests
      const approved = response.data.filter((req: any) => req.status === 'Approved');
      setApprovedRequests(approved);
      })
      .catch(error => {
      console.error('API Error:', error);
      alert('API call failed! Check console for details.');
      });

      axios.get('http://localhost/schedule/src/services/database.php?action=get_schedules')
      .then(response => {
      console.log('API Response:', response.data);
      // Sort schedules by date descending and take the 10 most recent
      const sortedSchedules = response.data
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setSchedules(sortedSchedules);

      })
      .catch(error => {
      console.error('API Error:', error);
      alert('API call failed! Check console for details.');
      });

  }, []);

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data to match PHP backend expectations
    const postData = {
      action: 'create_schedule',
      data: {
        date: newSchedule.Date,
        timeSlot: `${newSchedule.Time_Slot}-${addHours(newSchedule.Time_Slot, 2)}`,
        subject: newSchedule.Lab_name, // Assuming Lab_name is used as subject
        labId: newSchedule.Lab_id,
        coordinatorId: newSchedule.coordinator_id
      }
    };

    axios.post('http://localhost/schedule/src/services/database.php?action=create_schedule', postData)
      .then(response => {
      console.log('Schedule created:', response.data);
      // Optionally update local state with new schedule
      setSchedules(prev => [
        ...prev,
        {
        ...newSchedule,
        Schedule_id: response.data.id?.toString() || (prev.length + 1).toString(),
        Date: newSchedule.Date,
        Time_Slot: postData.data.timeSlot,
        Subject: postData.data.subject,
        Lab_id: postData.data.labId,
        Lab_name: newSchedule.Lab_name,
        Location: newSchedule.Location,
        coordinator_id: newSchedule.coordinator_id,
        students: newSchedule.students || []
        }
      ]);
      alert('Schedule created successfully!');
      })
      .catch(error => {
      console.error('Error creating schedule:', error);
      alert('Failed to create schedule. Please try again.');
      });

    // Optionally send notifications here

    setShowCreateForm(false);
    setNewSchedule({
      Schedule_id: '',
      Date: '',
      Time_Slot: '',
      Subject: '',
      Lab_id: '',
      Lab_name: '',
      Location: '',
      coordinator_id: '',
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
                    type="Date"
                    name="Date"
                    value={newSchedule?.Date}
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
                    name="Time_Slot"
                    value={newSchedule.Time_Slot}
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
                    name="Lab_name"
                    value={newSchedule.Lab_name}
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
                  <input
                    type="text"
                    name="Location"
                    value={newSchedule.Location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter lab name"
                  />
                </div>

                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lab ID
                  </label>
                  <input
                    type="text"
                    name="Lab_id"
                    value={newSchedule.Lab_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Enter lab name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coordinator ID
                  </label>
                  <input
                    type="text"
                    name="coordinator_id"
                    value={newSchedule.coordinator_id}
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
                      key={request.Request_id}
                      className="bg-green-50 border border-green-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {request.F_name+ request.L_name} ({request.student_id})
                        </h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Approved
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                
                        <div>
                          <span className="font-medium text-gray-600">Lab:</span>
                          <p className="text-gray-800">{request.lab_name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Coordinator:</span>
                          <p className="text-gray-800">{request.coordinator_id}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Submitted:</span>
                          <p className="text-gray-800">{request.created_at}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <span className="font-medium text-gray-600">Reason:</span>
                        <p className="text-gray-800 mt-1">{request.Reason}</p>
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
                      key={schedule.Schedule_id}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {schedule.Lab_name}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          Scheduled
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Date & Time:</span>
                          <p className="text-gray-800">{schedule.Date} - {schedule.Time_Slot}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Lab:</span>
                          <p className="text-gray-800">{schedule.Lab_name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Location:</span>
                          <p className="text-gray-800">{schedule.Location}</p>
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