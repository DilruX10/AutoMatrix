import axios from "axios";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function ViewSchedule(){

    const [userCode, setUserCode] = useState();
    
    const [sessions, setSessions] = useState(null);
    // week days
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    const fetchSessions = async (e) => {
        e.preventDefault();
        const res = await axios.get(`http://localhost:80/session/viewTimetable?code=${userCode}`);
        setSessions(res.data.sessions);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setUserCode(e.target.value);
    };
    
    return (
        <>  
        
        <Form noValidate className="d-flex" style={{margin: '1%'}} onSubmit={fetchSessions}>

                        <Form.Control 
                            required
                            name='userCode' 
                            type="text" 
                            onChange={handleChange}
                            value={userCode}
                            placeholder="Enter code here..."
                            className="mb-5"/>
                            <Form.Control.Feedback type="valid">
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid id
                            </Form.Control.Feedback>
                    <Button 
                        style={{ margin: '1%', width: '10%'}} 
                        type='submit' 
                        variant="outline-success"
                        className="mb-5"> 
                        &#128269; Search
                    </Button>                    
        </Form>

        {/* Timetable */}
            <h1 className='title' align='center'>Timetable: </h1>
            
            <div className="d-flex justify-content-around" style={{margin: '1%'}}>
                {/* Display Timetable */}
                    { days.map(day => (
                        <div style={{border: '1px solid black', width: "20%", padding: "1%", margin: '1%'}}>
                            <p><center>{day}</center></p>
                                { sessions && sessions.filter(function (session){
                                return session.dayOfTheWeek === day;
                                }).map(session => (
                                    <Card style={{margin: '1%'}} ><Card.Body>
                                        <ul>
                                        <li>Code: {session.code}</li>
                                        <li>Time: {session.start_time} - {session.end_time}</li>
                                        <li>Course: {session.course}</li>
                                        </ul>
                                    </Card.Body></Card>
                            ))}
                        </div>
                    ))}
            </div>
        </>
    )
}