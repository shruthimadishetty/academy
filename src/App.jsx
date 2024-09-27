import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Authentication/Register/Register";
import Login from "./Authentication/Login/Login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import DashboardOfAdmin from "./pages/AdminDashboard/Dashboard_Admin/DashboardOfAdmin";
import StudentOfAdmin from "./pages/AdminDashboard/Student-Admin/StudentOfAdmin";
import TeacherOfAdmin from "./pages/AdminDashboard/Teacher_Admin/TeacherOfAdmin";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="dashboard" element={<DashboardOfAdmin />} />
            <Route path="teachers" element={<TeacherOfAdmin />} />
            <Route path="students" element={<StudentOfAdmin />} />
          </Route>
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
