import { Col, Row } from "antd"
import PriorityTasks from "./prioritytasks/PriorityTasks"
import Schedule from "./schedule/Schedule"

function TaskSection({ tasks, setTasks, ...props }) {
    return (
        <Row {...props}>
            <Col span={11}>
                <Schedule />
            </Col>
            <Col span={11}>
                <PriorityTasks tasks={tasks} setTasks={setTasks} />
            </Col>
        </Row>
    )
}

export default TaskSection