import { Col, Row } from "antd"
import Title from "../../../atoms/Title"
import {differenceInMinutes, setHours} from "date-fns";
import PriorityTask from "./PriorityTask";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ReactComponent as PlusSquare } from "../../../../styles/images/plus_square.svg"




function openModal(setTasks) {
    return;
}

function PriorityTasks({ tasks, setTasks }) {
    return (
        <div>
            <Title style={{textAlign: "left", marginBottom: "1.5em"}} text="Priorities" size={1.5} weight={400} />
            <Droppable droppableId={"PriorityTaskDroppable"}>
                {provided => 
                    <div 
                        ref = {provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((v,i) => <PriorityTask task={v} key={v.id} index={i} />)}
                        {provided.placeholder}
                    </div>
                }   
            </Droppable>
            <Row className="priorityTask" justify="space-between">
                <Col onClick={() => openModal(setTasks) }span={20} style={{ height: "100%", backgroundColor: "#88AEED", borderRadius: "0.5em", display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "2em 0"}} >
                    <PlusSquare style={{transform: "scale(0.5)"}} />
                </Col>
            </Row>
            
        </div>
    )
}

export default PriorityTasks