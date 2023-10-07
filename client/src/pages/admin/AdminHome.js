import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ReactToPrint from "react-to-print";
import ChartBar from "../../components/Chart_Bar";
import ChartCourse from "../../components/Chart_Course";
import ComponentToPrint from "../../components/PrintComponent";

function AdminHome() {
	let componentRef = useRef();

    return (
        <div>
            <div style={{ margin: '1%'}} className="d-flex justify-content-center">
                <h1>Lesson Management - Admin</h1>
            </div>
            
                <div style={{ margin: '1%'}} className="d-flex justify-content-start">
                    
                </div>
                <div style={{ margin: '1%'}} className="d-flex justify-content-evenly">
                    <Button variant="primary" style={{ margin: '1%'}}>
                        <Link style={{color: 'white', textDecoration: 'none'}} to="/adminViewCourses">
                            Courses Management
                        </Link>
                    </Button>
                    <Button variant="primary" style={{ margin: '1%'}}>
                        <Link style={{color: 'white', textDecoration: 'none'}} to="/adminViewSchedule">
                            Session Management
                        </Link>
                    </Button>
                    <Button variant="primary" style={{ margin: '1%'}}>
                        <Link style={{color: 'white', textDecoration: 'none'}} to="/viewStudentSession">
                            Manage Student-Session Records
                        </Link>
                    </Button>
                    <Button variant="primary" style={{ margin: '1%'}}>
                        <Link style={{color: 'white', textDecoration: 'none'}} to="/viewTimetable">
                            View Timetable
                        </Link>
                    </Button>
                    <ReactToPrint
                    trigger={() => <Button variant="primary" style={{ margin: '1%'}} >Download Summary Report</Button>}
                    content={() => componentRef}
                    />
                    <div style={{ display: "none" }}>
                        <ComponentToPrint ref={(el) => (componentRef = el)} />
                    </div>
                </div>
                <br/>
                <div style={{ margin: '1%'}} className="d-flex justify-content-evenly">
                    <ChartBar/>
                    <ChartCourse/>
                </div>
                
        </div>          
    )
}
    
    export default AdminHome;