import axios from "axios";
import React, { useEffect, useState } from 'react';
import Coursecard from '../components/CourseCard';
import '../styles/HomePage.css';
import '../styles/LessonsPage.css';

const LessonsPage = () => {

  // Get Course Details
  const [courses, setCourses] = useState(null);
  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:80/course/view");
    setCourses(res.data.courses);
}
useEffect(() => {
    fetchCourses();
})

  return (
    <div>
      <h1 Style="margin-bottom: 1%" class='title' align='center'>Driving Lessons</h1>
      <p class='description'>We offer a variety of driving lessons for all skill levels.</p>
      <div Style="margin-top: 4%" className="d-flex justify-content-around">
        
        {/* Display courses using for each function */}
        {courses && courses.map(course => (
          <Coursecard 
            title={course.title} 
            description={course.description}
            processingFee={course.processingFee}
            sessionFee={course.sessionFee}
            />
        ))}
      </div>
    </div>
  )
}

export default LessonsPage
