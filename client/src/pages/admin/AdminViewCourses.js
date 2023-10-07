import axios from "axios";
import React, { useEffect, useState } from 'react';
//import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import courseStore from '../../store/courseStore';

export default function ViewCourses(){

    const [show, setShow] = useState(false);
    const [courseId, setCourseId] = useState(null);

    const cStore = courseStore();
    const [courses, setCourses] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (_id) => {setShow(true); setCourseId(_id)}
    const handleDelete = () => {
        cStore.deleteCourse(courseId)
        setShow(false);
    }
    
    const fetchCourses = async () => {
        const res = await axios.get("http://localhost:80/course/view");
        setCourses(res.data.courses);
    }

    useEffect(() => {
        fetchCourses();
    })
    
    return (
        <>  
            <h1 className='title' align='center'>Courses </h1>

            <div className="d-flex justify-content-around" style={{margin: '1%'}}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Processing Fee</th>
                            <th>Session Fee</th>
                            <th>Num Of Students Enrolled</th>
                            <th>Vehicle Types</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Display courses using for each function */}
                    { courses && courses.map(course => (
                        <tr key={course._id}>
                            <td>{course.code}</td>
                            <td>{course.title}</td>
                            <td width='40%'>{course.description}</td>
                            <td>{course.processingFee}</td>
                            <td>{course.sessionFee}</td>
                            <td>{course.num_Of_Students_Enrolled}</td>
                            <td>{course.vehicleTypes.join(";")}</td>
                            <td 
                                align='center'
                                width='7%'> 
                                <Button 
                                    variant="success" 
                                    size="sm" 
                                    style={{margin: '1%'}}
                                    onClick={() => cStore.getCourse(course)}>
                                    <Link style={{color: 'white', textDecoration: 'none'}} to="/editCourse">
                                        &#9998; Edit 
                                    </Link>
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => handleShow(course._id)}>                            
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
                <Link style={{color: 'white', textDecoration: 'none'}} to="/addCourse">
                    + Add Course
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
                    <Modal.Title>Delete Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This action will permanently erase all data associated with this course. 
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