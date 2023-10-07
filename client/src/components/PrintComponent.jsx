import React from "react";
import "../styles/print.css";

const sessionData = [{
    "scode": "S40175",
    "ram": 7,
    "eam": 3,
    "mam": 10
    },
    {
    "scode": "S77989",
    "ram": 8,
    "eam": 7,
    "mam": 10
    },
    {
    "scode": "S86371",
    "ram": 10,
    "eam": 0,
    "mam": 10
    },
    {
    "scode": "S86471",
    "ram": 10,
    "eam": 0,
    "mam": 10
    },
    {
    "scode": "S22594",
    "ram": 9,
    "eam": 1,
    "mam": 10
    },
    {
    "scode": "S86571",
    "ram": 6,
    "eam": 4,
    "mam": 10
    },
    {
    "scode": "S86871",
    "ram": 7,
    "eam": 3,
    "mam": 10
    },
    {
    "scode": "S22574",
    "ram": 8,
    "eam": 2,
    "mam": 10
    }]
    
const sessionDayData = [
    {
    "day": "Monday",
    "ram": 10,
    "eam": 10,
    "Max amount": 20
    },
    {
    "day": "Tuesday",
    "ram": 15,
    "eam": 5,
    "Max amount": 20
    },{
    "day": "Wednesday",
    "ram": 13,
    "eam": 7,
    "Max amount": 20
    },{
    "day": "Thursday",
    "ram": 18,
    "eam": 2,
    "Max amount": 20
    },{
    "day": "Friday",
    "ram": 20,
    "eam": 0,
    "Max amount": 20
    }
    ]
    
export default class ComponentToPrint extends React.Component {
    render() {
      return (
        <div style={{margin: "2%"}}>
            <center>
                <h2>Lesson Management - Summary Report</h2>
            </center>            
            <br/>
            <h4>Student Participation by Course</h4>
            <br/>
            <center>
                <table class="ptable">
                    <thead class="pth">
                    <th class="pth">Course Code</th>
                    <th class="pth">Title</th>
                    <th class="pth">Student Percentage</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="ptd">CS1234</td>
                        <td class="ptd">Training Program For Four-Wheel Vehicles</td>
                        <td class="ptd">41.667%</td>
                    </tr>
                    <tr>
                        <td class="ptd">CS1235</td>
                        <td class="ptd">Training Program For Motorcycles</td>
                        <td class="ptd">33.334%</td>
                    </tr>
                    <tr>
                        <td class="ptd">CS1236</td>
                        <td class="ptd">Training Program For Threee-Wheels And Scooters</td>
                        <td class="ptd">16.667%</td>
                    </tr>
                    <tr>
                        <td class="ptd">CS1238</td>
                        <td class="ptd">Training Program For All Common Vehicles</td>
                        <td class="ptd">8.334%</td>
                    </tr>
                    </tbody>
                </table>
            </center>
            <br/><br/>
            <h4>Student Participation For Session</h4>
            <br/>
            <center>
                <table class="ptable">
                    <thead class="pth">
                    <th class="pth">Session Code</th>
                    <th class="pth">Reserved amount</th>
                    <th class="pth">Empty amount</th>
                    <th class="pth">Max amount</th>
                    </thead>
                    <tbody>
                        {
                            sessionData.map(s => (
                                <tr>
                                    <td class="ptd">{s.scode}</td>
                                    <td class="ptd">{s.ram}</td>
                                    <td class="ptd">{s.eam}</td>
                                    <td class="ptd">{s.mam}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </center>
            <br/><br/>
            <h4>Student Participation By Day</h4>
            <br/>
            <center>
                <table class="ptable">
                    <thead class="pth">
                    <th class="pth">Day</th>
                    <th class="pth">Reserved amount</th>
                    <th class="pth">Empty amount</th>
                    <th class="pth">Max amount</th>
                    </thead>
                    <tbody>
                    {
                            sessionDayData.map(s => (
                                <tr>
                                    <td class="ptd">{s.day}</td>
                                    <td class="ptd">{s.ram}</td>
                                    <td class="ptd">{s.eam}</td>
                                    <td class="ptd">{s["Max amount"]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </center>
        </div>
      );
    }
  }
  
  