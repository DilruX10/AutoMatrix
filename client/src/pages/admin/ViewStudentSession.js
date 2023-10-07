import axios from "axios";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import studentSessionStore from '../../store/studentSessionStore';

export default function ViewStudentSession(){

    const [show, setShow] = useState(false);
    const [studentSessionId, setStudentSessionId] = useState(null);
    
    const ssStore = studentSessionStore();
    const [studentSessions, setStudentSessions] = useState(null);
    
    const handleClose = () => setShow(false);
    const handleShow = (_id) => {setShow(true); setStudentSessionId(_id)}

    const handleDelete = () => {
        ssStore.deleteStudentSession(studentSessionId)
        setShow(false);
    }

    const fetchStudentSessions = async () => {
        const res = await axios.get("http://localhost:80/studentSession/view");
        setStudentSessions(res.data.studentSessions);
    }
    
    useEffect(() => {
        fetchStudentSessions();
    })
    
    return (
        <>
            <h1 className='title' align='center'>Student-Session Table </h1>
            
            <div className="d-flex justify-content-around" style={{margin: '1%'}}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student Code</th>
                            <th>Session Code</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Display reocrds using for each function */}
                    { studentSessions && studentSessions.map(studentSession => (
                        <tr key={studentSession._id}>
                            <td>{studentSession._id}</td>
                            <td>{studentSession.studentCode}</td>
                            <td>{studentSession.sessionCode}</td>
                            <td align='center'> 
                                <Button 
                                    variant="success" 
                                    size="sm" 
                                    style={{margin: '1%'}}
                                    onClick={() => ssStore.getStudentSession(studentSession)}>
                                    <Link style={{color: 'white', textDecoration: 'none'}} to="/editStudentSession">
                                        &#9998; Edit 
                                    </Link>
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleShow(studentSession._id)}>                            
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
                <Link style={{color: 'white', textDecoration: 'none'}} to="/addStudentSession">
                    + Add Record
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
                    <Modal.Title>Delete Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This action will permanently erase all data associated with this record. 
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