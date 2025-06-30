import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Mail, Eye } from 'lucide-react';
import axios from 'axios';

interface RescheduleRequest {
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

interface CoordinatorPageProps {
  onBack: () => void;
}

const CoordinatorPage: React.FC<CoordinatorPageProps> = ({ onBack }) => {
  const [requests, setRequests] = useState<RescheduleRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RescheduleRequest | null>(null);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  // Mock data - replace with actual API calls
  
  useEffect(() => {

      // Test the PHP backend API - GET requests
      axios.get('http://localhost/schedule/src/services/database.php?action=get_requests')
        .then(response => {
          console.log('API Response:', response.data);
          setRequests(response.data);
         
        })
        .catch(error => {
          console.error('API Error:', error);
          alert('API call failed! Check console for details.');
        });
    
  }, []);

  const handleApprove = async (requestId: string) => {
    try {
      const response = await axios.post('http://localhost/schedule/src/services/database.php?action=update_status', {
        action: 'update_status',
        requestId: requestId,
        status: 'Approved'
      });
      console.log('API Response:', response.data);
      setRequests(prev => 
        prev.map(req => 
          req.Request_id === requestId 
            ? { ...req, status: 'Approved' as const }
            : req
        )
      );
      // Send email notification here
      // await sendEmailNotification(request, 'approved');
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to approve request. Please try again.');
    }
  };

  const handleReject = async (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.Request_id === requestId 
          ? { ...req, status: 'Rejected' as const }
          : req
      )
    );
    
    // Send email notification here
    // await sendEmailNotification(request, 'rejected');
  };

  const filteredRequests = requests.filter(req => 
    filter === 'All' ? true : req.status === filter
  );

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Rejected':
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
                      <p className="text-gray-800">{selectedRequest.student_id}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Name:</span>
                      <p className="text-gray-800">{selectedRequest.F_name + ' ' + selectedRequest.L_name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Email:</span>
                      <p className="text-gray-800">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Subject:</span>
                      <p className="text-gray-800">{selectedRequest.lab_name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Lab session:</span>
                      <p className="text-gray-800">{selectedRequest.lab_name}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Reason</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800">{selectedRequest.Reason}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
                  <div className="flex items-center space-x-4">
                    <span className={getStatusBadge(selectedRequest.status)}>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Submitted: {selectedRequest.created_at}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedRequest.status === 'Pending' && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => handleReject(selectedRequest.Request_id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(selectedRequest.Request_id)}
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
              {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
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
                  {status !== 'All' && (
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
                key={request.Request_id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {request.F_name + ' ' + request.L_name} ({request.student_id})
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
                    <p className="text-gray-800">{request.lab_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Lab Session:</span>
                    <p className="text-gray-800">{request.lab_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Instructor Name:</span>
                    <p className="text-gray-800">{request.Instructor_id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Submitted:</span>
                    <p className="text-gray-800">{request.created_at}</p>
                  </div>
                </div>

                {request.status === 'Pending' && (
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      onClick={() => handleReject(request.Request_id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(request.Request_id)}
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
                  {filter === 'All' 
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