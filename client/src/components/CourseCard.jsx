import Card from 'react-bootstrap/Card';

function CourseCard({title, description, processingFee, sessionFee}) {
    return (
        <Card className="courseCard" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title><b>{title}</b></Card.Title>
                <hr/>
                <Card.Text>
                    <table>
                        <tr>
                            <td colSpan={2}>{description}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}><hr/></td>
                        </tr>
                        <tr>
                            <th>Processing Fee:</th>
                            <td>LKR {processingFee}</td>
                        </tr>
                        <tr>
                            <th>Session Fee:</th>
                            <td>LKR {sessionFee}</td>
                        </tr>
                    </table>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CourseCard;