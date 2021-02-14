import React from "react";
import { Col, Row } from "antd";
import ShiftIcon from "../ShiftIcon";
import {format, addDays} from "date-fns";

function ToolSection() {
    let [curDate, setCurDate] = React.useState(new Date())
    return (
        <div>
            <Row justify="space-between">
                <Col span={10}>
                    <Row>
                        <input placeholder="Search for a date" style={{borderRadius: "5px", border: "1px solid gray", paddingLeft: "20px", width: "70%"}}/>
                        <ShiftIcon direction="left" onClick={() => setCurDate(curDate => addDays(curDate, -1))} />
                        <ShiftIcon onClick={() => setCurDate(curDate => addDays(curDate, 1))} />
                    </Row>
                </Col>
                <Col span={5}>
                    <p style={{fontSize: "1.5em", textAlign: "right"}}>{format(curDate, "PPP")}</p>
                </Col>
            </Row>
        </div>
    )
}

export default ToolSection