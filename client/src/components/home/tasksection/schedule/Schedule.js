import { Col, Row } from "antd"
import Title from "../../../atoms/Title"

function Schedule() {
    return (
        <div>
            <Title style={{textAlign: "left", marginBottom: "1.5em"}} text="Schedule" size={1.5} weight={400} />
            <Row>
                <Col flex={1}>
                </Col>
                <Col flex={4} style={{backgroundColor: "blue"}}>

                </Col>
            </Row>
        </div>
    )
}

export default Schedule