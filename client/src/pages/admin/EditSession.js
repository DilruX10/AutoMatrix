import axios from "axios";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import sessionStore from '../../store/sessionStore';

export default function EditSession(){

    // week days
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(null);
    
    // get a array of courses for select menu
    const [courses, setCourses] = useState(null);
    const fetchCourses = async () => {
        const res = await axios.get("http://localhost:5000/course/view");
        setCourses(res.data.courses);
    }
    useEffect(() => {
        fetchCourses();
    })

    // call session and course stores
    const sStore = sessionStore();

    // submit functions
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            sStore.updateSession(e);
            handleShow();
        }
        setValidated(true); 
    }

    return(
        <>

        {/* Page Title */}
        <h1 className='title' align='center'>Edit Session: </h1>
        
        {/* Add Course Form */}
        <Form 
            noValidate 
            validated={validated}
            style={{border: '1px solid black', padding: '1%', margin: '2%'}}
            onSubmit={handleSubmit}>
            
            {/* Start_time */}
            <Form.Group as={Row} className="mb-3" controlId="start_time">
                <Form.Label column sm="2">Session Start Time: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        required 
                        name='start_time' 
                        type="time" 
                        placeholder="Session Start Time"
                        value={sStore.updateForm.start_time}
                        onChange={sStore.onChangeUpdateFrom}  
                        min="08:00"
                        max="16:00" />
                    <Form.Control.Feedback type="valid">
                        Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid time. Should be between 08:00 AM and 04:00 PM
                    </Form.Control.Feedback>
                </Col> 
            </Form.Group>

            {/* end_time */}
            <Form.Group as={Row} className="mb-3" controlId="end_time">
                <Form.Label column sm="2">Session End Time : </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        required
                        name='end_time' 
                        type="time" 
                        placeholder="Session End Time"
                        value={sStore.updateForm.end_time}
                        onChange={sStore.onChangeUpdateFrom}  
                        min="08:00"
                        max="16:00" />
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid time. Should be between 08:00 AM and 04:00 PM
                        </Form.Control.Feedback>
                </Col> 
            </Form.Group>

            {/* dayOfTheWeek */}
            <Form.Group as={Row} className="mb-3" controlId="dayOfTheWeek">
                <Form.Label column sm="2">Day Of The Week : </Form.Label>
                <Col sm="10">
                    <Form.Select 
                        required
                        name='dayOfTheWeek' 
                        type="text" 
                        placeholder="Day Of The Week"
                        value={sStore.updateForm.dayOfTheWeek}
                        onChange={sStore.onChangeUpdateFrom}
                        >
                            {days.map(dayOfTheWeek => (
                                <option value={dayOfTheWeek}>{dayOfTheWeek}</option>
                            ))}
                    </Form.Select>
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid day of the week
                        </Form.Control.Feedback>                    
                </Col> 
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="course">
                <Form.Label column sm="2">Course : </Form.Label>
                <Col sm="10">
                    <Form.Select 
                        required
                        name='course' 
                        type="text" 
                        placeholder="Course"
                        value={sStore.updateForm.course}
                        onChange={sStore.onChangeUpdateFrom}  >
                            {courses && courses.map(course => (
                                <option value={course.code}>{course.title}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid day of the week
                        </Form.Control.Feedback>                    
                </Col> 
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="max_Students">
                <Form.Label column sm="2">Max Students : </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        required
                        name='max_Students' 
                        type="number" 
                        placeholder="Max Students"
                        value={sStore.updateForm.max_Students}
                        onChange={sStore.onChangeUpdateFrom}  />
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid number
                        </Form.Control.Feedback>                    
                </Col> 
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="instructor">
                <Form.Label column sm="2">Instructor : </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        required
                        name='instructor' 
                        type="text" 
                        placeholder="Instructor"
                        value={sStore.updateForm.instructor}
                        onChange={sStore.onChangeUpdateFrom}  />
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid instructor
                        </Form.Control.Feedback>                    
                </Col> 
            </Form.Group>
            
            {/* Submit and Clear Buttons */}
            <div style={{margin: '1%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Button 
                    style={{ margin: '1%', width: "70%"}} 
                    type='submit' 
                    variant="primary"
                    > 
                    &#10004; Submit 
                </Button>
                <Button 
                    style={{ margin: '1%', width: "70%"}} 
                    type='reset' 
                    variant="secondary"> 
                    &#10006; Clear 
                </Button>
            </div>
        </Form>
        
        <Link to={'/adminViewSchedule'}>
            <Button 
                style={{ margin: '1%'}} 
                variant="warning"> 
                    Back 
            </Button>
        </Link>

        {/* Success Model */}
        <Modal 
                show={show} 
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{sStore.smsgType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {sStore.smsg}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
    </>
    ) 

}