import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import courseStore from '../../store/courseStore';

export default function EditCourse(){

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(null);
    const cStore = courseStore();

    // submit functions
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            cStore.updateCourse(e);
            handleShow();
        }
        setValidated(true); 
    }

    return(
        <>

        {/* Page Title */}
        <h1 className='title' align='center'>Edit Course: </h1>
        
        {/* Edit Course Form */}
        <Form 
            noValidate 
            validated={validated}
            style={{border: '1px solid black', padding: '1%', margin: '2%'}}
            onSubmit={handleSubmit}>
            
            {/* Title */}
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Course : </Form.Label>
                <Col sm="10">
                    <Form.Control
                        required 
                        name='title' 
                        type="text" 
                        placeholder="Course Title"
                        value={cStore.updateForm.title}
                        onChange={cStore.onChangeUpdateFrom}  />
                    <Form.Control.Feedback type="valid">
                        Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid title
                    </Form.Control.Feedback>
                </Col> 
            </Form.Group>

            {/* Description */}
            <Form.Group as={Row} className="mb-3" controlId="description">
                <Form.Label column sm="2">Description : </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        required
                        name='description' 
                        type="textarea" 
                        placeholder="Description"
                        value={cStore.updateForm.description}
                        onChange={cStore.onChangeUpdateFrom}  />
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid description
                        </Form.Control.Feedback>
                </Col> 
            </Form.Group>

            {/* Processing Fee */}
            <Form.Group as={Row} className="mb-3" controlId="processingFee">
                <Form.Label column sm="2">Processing Fee : </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        required
                        name='processingFee' 
                        type="number" 
                        placeholder="Processing Fee"
                        value={cStore.updateForm.processingFee}
                        onChange={cStore.onChangeUpdateFrom}  />
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid number
                        </Form.Control.Feedback>                    
                </Col> 
            </Form.Group>

            {/* Session Fee */}
            <Form.Group as={Row} className="mb-3" controlId="sessionFee">
                <Form.Label column sm="2">Session Fee : </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        required
                        name='sessionFee' 
                        type="number" 
                        placeholder="Session Fee"
                        value={cStore.updateForm.sessionFee}
                        onChange={cStore.onChangeUpdateFrom}  />
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid number
                        </Form.Control.Feedback>                    
                </Col> 
            </Form.Group>

            {/* Vehicle Types */}
            <Form.Group as={Row} className="mb-3" controlId="vehicleTypes">
                <Form.Label column sm="2">Vehicle Types : </Form.Label>
                <Col sm="10">
                    <Form.Control
                        required 
                        name='vehicleTypes' 
                        type="text" 
                        placeholder="Please use [,] to separate vehicle types"
                        value={cStore.updateForm.vehicleTypes}
                        onChange={cStore.onChangeUpdateFrom}  />
                    <Form.Control.Feedback type="valid">
                        Looks good!
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid vehicleTypes
                    </Form.Control.Feedback>
                </Col> 
            </Form.Group>

            {/* num_Of_Students_Enrolled */}
            <Form.Group as={Row} className="mb-3" controlId="num_Of_Students_Enrolled">
                <Form.Label column sm="2">Num Of Students Enrolled : </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        required
                        name='num_Of_Students_Enrolled' 
                        type="number" 
                        placeholder="Num Of Students Enrolled"
                        value={cStore.updateForm.num_Of_Students_Enrolled}
                        onChange={cStore.onChangeUpdateFrom}  />
                        <Form.Control.Feedback type="valid">
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid number
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
        <Link to={'/adminViewCourses'}>
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
                    <Modal.Title>{cStore.cmsgType}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cStore.cmsg}
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
