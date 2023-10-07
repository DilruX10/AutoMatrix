import axios from "axios";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import sessionStore from '../../store/sessionStore';

export default function ViewSchedule(){

    const [show, setShow] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    
    const sStore = sessionStore();
    const [sessions, setSessions] = useState(null);
    
    const handleClose = () => setShow(false);
    const handleShow = (_id) => {setShow(true); setSessionId(_id)}

    const handleDelete = () => {
        sStore.deleteSession(sessionId)
        setShow(false);
    }

    const fetchSessions = async () => {
        const res = await axios.get("http://localhost:80/session/view");
        setSessions(res.data.sessions);
    }
    
    useEffect(() => {
        fetchSessions();
    })
    
    return (
        <>
            <h1 className='title' align='center'>Schedule </h1>
            
            <div className="d-flex justify-content-around" style={{margin: '1%'}}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Day of The Week</th>
                            <th>Max Students</th>
                            <th>Course</th>
                            <th>Instructor</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Display notes using for each function */}
                    { sessions && sessions.map(session => (
                        <tr key={session._id}>
                            <td>{session.code}</td>
                            <td>{session.start_time}</td>
                            <td>{session.end_time}</td>
                            <td>{session.dayOfTheWeek}</td>
                            <td>{session.max_Students}</td>
                            <td>{session.course}</td>
                            <td>{session.instructor}</td>
                            <td align='center'> 
                                <Button 
                                    variant="success" 
                                    size="sm" 
                                    style={{margin: '1%'}}
                                    onClick={() => sStore.getSession(session)}>
                                    <Link style={{color: 'white', textDecoration: 'none'}} to="/editSession">
                                        &#9998; Edit 
                                    </Link>
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleShow(session._id)}>                            
                                    🗑️ Delete 
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <div align="right">
                <Button variant="primary" style={{ margin: '1%'}}>
                <Link style={{color: 'white', textDecoration: 'none'}} to="/addSession">
                    + Add Session
                </Link>
                </Button>
            </div>

            {/* Delete Model */}
            <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This action will permanently erase all data associated with this session. 
                    Do you want to continue with this action?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="warning" onClick={handleDelete}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}