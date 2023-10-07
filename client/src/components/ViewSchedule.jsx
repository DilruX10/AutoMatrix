import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Table from 'react-bootstrap/Table';

function InstructorSchedule(props) {
  const { data } = props;
  
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Session ID</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Vehicle Type</th>
          <th>Vehicle Assigned</th>
          <th>Num Of Students</th>
          <th>Max Num Of Students</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.column1}</td>
            <td>{row.column2}</td>
            <td>{row.column3}</td>
            <td>{row.column4}</td>
            <td>{row.column5}</td>
            <td>{row.column6}</td>
            <td>{row.column7}</td>
            <td>{row.column8}</td>
          </tr>
        ))}
      </tbody>
    </Table >
  );
}

export default InstructorSchedule;
