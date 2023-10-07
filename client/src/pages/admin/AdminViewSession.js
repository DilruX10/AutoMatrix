import axios from "axios";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import sessionStore from '../../store/sessionStore';

export default function ViewSessions(){

    
    const cStore = sessionStore();
    const [sessions, setSessions] = useState(null);
    
    const fetchSessions = async () => {
        const res = await axios.get("http://localhost:80/session/view");
        setSessions(res.data.sessions);
    }

    useEffect(() => {
        fetchSessions();
    })
    
    return (
        <>
            <h1 className='title' align='center'>Sessions </h1>
            
            <div className="d-flex justify-content-around" style={{margin: '1%'}}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Package Price</th>
                            <th>Num Of Students Enrolled</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Display notes using for each function */}
                    { sessions && sessions.map(session => (
                        <tr key={session._id}>
                            <td>{session.code}</td>
                            <td>{session.title}</td>
                            <td>{session.description}</td>
                            <td>{session.pkgPrice}</td>
                            <td>{session.num_Of_Students_Enrolled}</td>
                            <td align='center'> 
                                <Button 
                                    variant="success" 
                                    size="sm" 
                                    style={{margin: '1%'}}
                                    onClick={() => cStore.getSession(session)}>
                                    <Link style={{color: 'white', textDecoration: 'none'}} to="/editSession">
                                        &#9998; Edit 
                                    </Link>
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => cStore.deleteSession(session._id)}>                            
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
        </>
    )
}