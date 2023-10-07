import axios from "axios";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import studentSessionStore from '../../store/studentSessionStore';

export default function AddStudentSession(){
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(null);
    
    // get a array of sessions for select menu
    const [sessions, setSessions] = useState(null);
    const fetchSessions = async () => {
        const res = await axios.get("http://localhost:80/session/view");
        setSessions(res.data.sessions);
    }
    useEffect(() => {
        fetchSessions();
    })

    // call student-session store
    const ssStore = studentSessionStore();

    // submit functions
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            ssStore.createStudentSession(e);
            handleShow();
        }
        setValidated(true); 
    }

    return(
        <>

        {/* Page Title */}
        <h1 className='title' align='center'>Add Record: </h1>
        
        {/* Add Record Form */}
        <Form 
            noValidate 
            validated={validated}
            style={{border: '1px solid black', padding: '1%', margin: '2%'}}
            onSubmit={handleSubmit}>
        
            {/* Student Code */}
            <Form.Group as={Row} className="mb-3" controlId="studentCode">
                <Form.Label column sm="2">Student Code : </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        required
                        name='studentCode' 
                        type="text" 
                        placeholder="Student Code"
                        value={ssStore.createForm.studentCode}
                        onChange={ssStore.onChangeCreateFrom}  />
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid student code
                        </Form.Control.Feedback>                    
                </Col> 
            </Form.Group>

            {/* Session Code */}
            <Form.Group as={Row} className="mb-3" controlId="sessionCode">
                <Form.Label column sm="2">Session Code : </Form.Label>
                <Col sm="10">
                    <Form.Select 
                        required
                        name='sessionCode' 
                        type="text" 
                        placeholder="Session Code"
                        value={ssStore.createForm.sessionCode}
                        onChange={ssStore.onChangeCreateFrom}  >
                            {sessions && sessions.map(session => (
                                <option value={session.code}>{session.code}</option>
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
        
        <Link to={'/ViewStudentSession'}>
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
                    <Modal.Title>{ssStore.smsgType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {ssStore.smsg}
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