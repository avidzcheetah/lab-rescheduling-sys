import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import StudentPage from './pages/StudentPage';
import CoordinatorPage from './pages/CoordinatorPage';
import InstructorPage from './pages/InstructorPage';

type UserRole = 'main' | 'student' | 'coordinator' | 'instructor';

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('main');

  const renderPage = () => {
    switch (currentRole) {
      case 'student':
        return <StudentPage onBack={() => setCurrentRole('main')} />;
      case 'coordinator':
        return <CoordinatorPage onBack={() => setCurrentRole('main')} />;
      case 'instructor':
        return <InstructorPage onBack={() => setCurrentRole('main')} />;
      default:
        return <MainPage onRoleSelect={setCurrentRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {renderPage()}
    </div>
  );
}

export default App;