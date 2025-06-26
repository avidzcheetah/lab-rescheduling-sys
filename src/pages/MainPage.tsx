import React from 'react';
import { Users, UserCheck, GraduationCap } from 'lucide-react';

interface MainPageProps {
  onRoleSelect: (role: 'student' | 'coordinator' | 'instructor') => void;
}

const MainPage: React.FC<MainPageProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Lab Rescheduling Management
          </h1>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
            Faculty of Engineering, University of Jaffna
          </h3>
          <p className="text-xl text-gray-600">
            Select your role to access the system
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            onClick={() => onRoleSelect('student')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-200"
          >
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Student</h3>
              <p className="text-gray-600 mb-6">
                Submit reschedule requests for your lab sessions
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Request lab rescheduling</li>
                  <li>• View request status</li>
                  <li>• Receive notifications</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            onClick={() => onRoleSelect('coordinator')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-green-200"
          >
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Subject Coordinator</h3>
              <p className="text-gray-600 mb-6">
                Review and approve reschedule requests
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Review requests</li>
                  <li>• Approve/Reject requests</li>
                  <li>• Manage lab schedules</li>
                </ul>
              </div>
            </div>
          </div>

          <div
            onClick={() => onRoleSelect('instructor')}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-orange-200"
          >
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Lab Instructor</h3>
              <p className="text-gray-600 mb-6">
                View approved requests and manage lab sessions
              </p>
              <div className="bg-orange-50 rounded-lg p-4">
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• View approved requests</li>
                  <li>• Create new schedules</li>
                  <li>• Track attendance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;