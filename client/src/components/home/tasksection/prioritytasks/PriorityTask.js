import { Col, Row } from "antd";
import Title from "../../../atoms/Title";
import {ReactComponent as LockIcon} from "../../../../styles/images/lock.svg"
import {getHours, getMinutes, format} from "date-fns"
import {Draggable} from "react-beautiful-dnd";

function ExtractTimeData(timeData) {
    let extracted;
    if(timeData.hasOwnProperty("start")) {
        if(!timeData.hasOwnProperty("end")) {
            throw "MUST HAVE END TIME IF HAVE START TIME"
        }
 
        extracted = `From ${format(timeData.start, "hh:mmaaa")} to ${format(timeData.end, "hh:mmaaa")}`
    }
    else if(timeData.hasOwnProperty("duration")) {
        let hrs = Math.floor(timeData.duration / 60)
        let mins = timeData.duration - 60 * hrs
        extracted = `Lasts ${hrs}hrs ${mins}min`
    }
    else {
        throw "MUST BE AT LEAST A DURATION OR START AND END TIME"
    }

    return extracted
}

function getBG(rank) {
    //maybe switch here. But this works too
    if(rank == 0) {
        return "#83C3D3"
    }
    else if(rank == 1) {
        return "#F5C731"
    }
    else if(rank == 1) {
        return "#C1C1C1"
    }
    else if(rank == 1) {
        return "#DC8733"
    }
    return "#E9E9E9"
}


function PriorityTask({task, index}) {
    let {name, timeData, rank} = task;
    return (
            <Draggable draggableId={"task " + task.id} index={index}>
            {provided => 
                <div ref={provided.innerRef}>
                    <Row className="priorityTask" justify="space-between" {...provided.draggableProps}>
                        <Col span={20} style={{height: "100%", backgroundColor: "#88AEED", borderRadius: "0.5em", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2em"}} {...provided.dragHandleProps}>
                            <Title text={name.trim().replace(/^\w/, (c) => c.toUpperCase())} weight={300}/>
                            <Title text={ExtractTimeData(timeData)} size={0.9} weight={300}/>
                        </Col>
                        <Col span={3} style={{height: "100%", display: "flex", justifyContent: "flex-end"}}>
                            <div style={{width: "4em", height: "4em", backgroundColor: getBG(rank), display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5em"}}>
                                {rank == 0 ? <LockIcon style={{transform: "scale(0.5)"}} /> : <p style={{fontSize: "1.8em", lineHeight: "1.8em", fontWeight: 500, margin: 0}}>{rank}</p>}
                            </div>
                        </Col>
                    </Row>
                </div>
                }
            </Draggable>
    )
}

export default PriorityTask;