import React from "react";
import { Col, Row } from "antd"
import Title from "../../../atoms/Title"
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Schedule.scss"
// @import "react-big-calendar/lib/sass/styles";

const locales = {
  "en-US": require("date-fns/locale/en-US")
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

function MyToolBar() {
    return <div>

    </div>
}

function SlotPropStyle(date) {
    return {
        style:  { height: "2em" }
    }   
}


function Schedule({ curDate, tasks }) {

    React.useEffect(() => {
        console.log(tasks)
    }, [tasks])

    let events = tasks.map(task => ({
        title: task.name,
        start: task.timeData.start,
        end: task.timeData.end,
        allDay: false,
        resource: false
    }))

    return (
        <div>
            <Title style={{textAlign: "left", marginBottom: "1.5em"}} text="Schedule" size={1.5} weight={400} />
            <Row>
                <Col flex={4} style={{}}>
                    <Calendar
                        // components={{ toolbar: MyToolBar }}
                        slotPropGetter={SlotPropStyle}
                        date={curDate}
                        toolbar={false}
                        localizer={localizer}
                        events={events}
                        defaultView={Views.DAY}
                        scrollToTime={true}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 600, overflowY: "scroll" }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Schedule