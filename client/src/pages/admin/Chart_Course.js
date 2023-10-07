import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const coursesData = [{
  "name": "C1235",
  "value": 25
},
{
  "name": "C1236",
  "value": 20
},
{
  "name": "C1234",
  "value": 10
},
{
  "name": "C1238",
  "value": 5
}]

export default function Chart_Course() {
  
 // Get Course Details
  const [courses, setCourses] = useState(null);
  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:80/course/forChart");
    setCourses(res.data.courses);
}
useEffect(() => {
    fetchCourses();
}) 

  return (
    <div>
        <center>
        <br/>
        <h1>Student Participation by Course</h1>
        <br/><br/>
          <PieChart width={400} height={400}>
            <Legend verticalAlign="top" />
            <Tooltip/>
            <Pie 
              data={coursesData} 
              dataKey="value" 
              cx="50%" 
              cy="50%" 
              outerRadius="75%" 
              innerRadius="60%" 
              fill="#0088FE" 
              label>
                {
                  coursesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                  ))
                }
              </Pie>
            </PieChart>
          </center>
      </div>
  );

  
}