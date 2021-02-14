import { Col, Row } from "antd"
import PriorityTasks from "./prioritytasks/PriorityTasks"
import Schedule from "./schedule/Schedule"

function TaskSection({ tasks, curDate, setTasks, ...props }) {
    return (
        <Row {...props}>
            <Col span={11}>
                <Schedule curDate={curDate} tasks={tasks} />
            </Col>
            <Col span={11}>
                <PriorityTasks tasks={tasks} setTasks={setTasks} />
            </Col>
        </Row>
    )
}

export default TaskSection