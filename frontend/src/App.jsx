import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/app.css'; // Import global styles

// Import all required pages/components
import StartPage from './pages/StartPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AdminPanel from './pages/AdminPanel';
import AdminTeacherManagement from './pages/AdminTeacherManagement';
import AdminStudentParentManagement from './pages/AdminStudentParentManagement';
import TeacherPanel from './pages/TeacherPanel';
import TeacherAssignments from './pages/TeacherAssignments';
import TeacherNotifications from './pages/TeacherNotifications';
import TeacherResults from './pages/TeacherResults';
import TeacherStudents from './pages/TeacherStudents';
import TeacherFeedback from './components/TeacherFeedback';
import StudentPanel from './pages/StudentPanel';
import StudentAssignments from './pages/StudentAssignments';
import ParentPanel from './pages/ParentPanel';

function App() {
  return (
    <Router>
      {/* Motion animation for smooth page transitions */}
      <motion.div 
        className="page-wrapper"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin Panel Routes */}
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/admin-teacher-management" element={<AdminTeacherManagement />} />
          <Route path="/admin-student-parent-management" element={<AdminStudentParentManagement />} />

          {/* Teacher Panel Routes */}
          <Route path="/teacher-panel" element={<TeacherPanel />} />
          <Route path="/teacher-assignments" element={<TeacherAssignments />} />
          <Route path="/teacher-notifications" element={<TeacherNotifications />} />
          <Route path="/teacher-results" element={<TeacherResults />} />
          <Route path="/teacher-students" element={<TeacherStudents />} />
          <Route path="/teacher-feedback" element={<TeacherFeedback />} />

          {/* Student Panel Routes */}
          <Route path="/student-panel" element={<StudentPanel />} />
          <Route path="/student-assignments" element={<StudentAssignments />} />

          {/* Parent Panel Route */}
          <Route path="/parent-panel" element={<ParentPanel />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;

