import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Mail, Eye } from 'lucide-react';

interface RescheduleRequest {
  id: number;
  studentId: string;
  studentName: string;
  email: string;
  subject: string;
  currentDate: string;
  currentTime: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface CoordinatorPageProps {
  onBack: () => void;
}

const CoordinatorPage: React.FC<CoordinatorPageProps> = ({ onBack }) => {
  const [requests, setRequests] = useState<RescheduleRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RescheduleRequest | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockRequests: RescheduleRequest[] = [
      {
        id: 1,
        studentId: '22E108',
        studentName: 'RAVISH W.',
        email: '2022e108@eng.jfn.ac.lk',
        subject: 'Computer Networks Lab',
        currentDate: '2025-01-15',
        currentTime: '10:00',
        preferredDate: '2025-01-18',
        preferredTime: '14:00',
        reason: 'Medical appointment conflict',
        status: 'pending',
        createdAt: '2025-01-15'
      },
      {
        id: 2,
        studentId: '22E008',
        studentName: 'WITHARANA A.D.S.',
        email: '2022e008@eng.jfn.ac.lk',
        subject: 'Database Systems Lab 03',
        currentDate: '2025-03-16',
        currentTime: '09:00',
        preferredDate: '2025-04-19',
        preferredTime: '11:00',
        reason: 'Family emergency',
        status: 'approved',
        createdAt: '2025-03-17'
      },
      {
        id: 3,
        studentId: '20E097',
        studentName: 'SIVAKUMAR R.',
        email: '2020e097@eng.jfn.ac.lk',
        subject: 'Web Development Lab',
        currentDate: '2025-05-17',
        currentTime: '15:00',
        preferredDate: '2025-05-20',
        preferredTime: '10:00',
        reason: 'Job interview',
        status: 'pending',
        createdAt: '2025-05-08'
      }
    ];
    setRequests(mockRequests);
  }, []);

  const handleApprove = async (requestId: number) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved' as const }
          : req
      )
    );
    
    // Send email notification here
    // await sendEmailNotification(request, 'approved');
  };

  const handleReject = async (requestId: number) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const }
          : req
      )
    );
    
    // Send email notification here
    // await sendEmailNotification(request, 'rejected');
  };

  const filteredRequests = requests.filter(req => 
    filter === 'all' ? true : req.status === filter
  );

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (selectedRequest) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-8">
              <button
                onClick={() => setSelectedRequest(null)}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Requests
              </button>
              <h1 className="text-3xl font-bold text-gray-800">Request Details</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Student ID:</span>
                      <p className="text-gray-800">{selectedRequest.studentId}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Name:</span>
                      <p className="text-gray-800">{selectedRequest.studentName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Email:</span>
                      <p className="text-gray-800">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Subject:</span>
                      <p className="text-gray-800">{selectedRequest.subject}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Schedule</h3>
                  <div className="bg-red-50 rounded-lg p-4 space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Date:</span>
                      <p className="text-gray-800">{selectedRequest.currentDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Time:</span>
                      <p className="text-gray-800">{selectedRequest.currentTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferred Schedule</h3>
                  <div className="bg-green-50 rounded-lg p-4 space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Date:</span>
                      <p className="text-gray-800">{selectedRequest.preferredDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Time:</span>
                      <p className="text-gray-800">{selectedRequest.preferredTime}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Reason</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800">{selectedRequest.reason}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
                  <div className="flex items-center space-x-4">
                    <span className={getStatusBadge(selectedRequest.status)}>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Submitted: {selectedRequest.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedRequest.status === 'pending' && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => handleReject(selectedRequest.id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(selectedRequest.id)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Coordinator Portal</h1>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reschedule Requests</h2>
            
            <div className="flex space-x-4 mb-6">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                      {requests.filter(req => req.status === status).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {request.studentName} ({request.studentId})
                    </h3>
                    <span className={getStatusBadge(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Subject:</span>
                    <p className="text-gray-800">{request.subject}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Current:</span>
                    <p className="text-gray-800">{request.currentDate} at {request.currentTime}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Preferred:</span>
                    <p className="text-gray-800">{request.preferredDate} at {request.preferredTime}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Submitted:</span>
                    <p className="text-gray-800">{request.createdAt}</p>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      onClick={() => handleReject(request.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </button>
                  </div>
                )}
              </div>
            ))}

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No requests found</h3>
                <p className="text-gray-500">
                  {filter === 'all' 
                    ? 'No reschedule requests have been submitted yet.'
                    : `No ${filter} requests found.`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorPage;