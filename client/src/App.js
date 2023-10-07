import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminHome from './AdminHome'
import AdminLogin from './adminLogin'
import './App.css'
import HomePage from './HomePage'
import NavBar from './NavBar'
import EditStudent from './studentComponents/editStudent'
import StudentProfileCard from './studentComponents/StudentCard'
import StudentLogin from './studentComponents/studentLogin'
import StudentDetails from './studentDetails'
// DSK
import AddCourse from './pages/admin/AddCourse'
import AddSession from './pages/admin/AddSession'
import AddStudentSession from './pages/admin/AddStudentSession'
import AdminLMHome from './pages/admin/AdminHome'
import AdminViewCourses from './pages/admin/AdminViewCourses'
import AdminViewSchedule from './pages/admin/AdminViewSchedule'
import ChartCourse from './pages/admin/Chart_Course'
import EditCourse from './pages/admin/EditCourse'
import EditSession from './pages/admin/EditSession'
import EditStudentSession from './pages/admin/EditStudentSession'
import ViewStudentSession from './pages/admin/ViewStudentSession'
import LessonsPage from './pages/LessonsPage'
import ViewTimetable from './pages/ViewTimetable'


const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {/* Start - Sabeel */}
          <Route path='/' element={<HomePage />} />
          <Route path='/adminHome' element={<AdminHome />} />
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/studentdetails' element={<StudentDetails />} />
          <Route path='/editStudent/:id' element={<EditStudent />} />
          <Route path='/login' element={<StudentLogin />} />
          <Route path='/studentCard' element={<StudentProfileCard />} />
          {/* End - DSK */}

          {/* Start - DSK */}
          
          <Route path='/adminLMHome' element={<AdminLMHome />} />
          <Route path='/lessons' element={<LessonsPage />} />
          <Route path='/viewTimetable' element={<ViewTimetable />} />

          {/* Courses */}
					<Route path='/adminViewCourses' element={<AdminViewCourses />} /><Route path='/addCourse' element={<AddCourse />} />
					<Route path='/editCourse' element={<EditCourse />} />

					{/* Sessions */}
					<Route path='/adminViewSchedule' element={<AdminViewSchedule />} />
					<Route path='/addSession' element={<AddSession />} />
					<Route path='/editSession' element={<EditSession />} />

					{/* Student-Session */}
					<Route path='/viewStudentSession' element={<ViewStudentSession />} />
					<Route path='/addStudentSession' element={<AddStudentSession />} />
					<Route path='/editStudentSession' element={<EditStudentSession />} />
          
          {/* End - DSK */}
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
