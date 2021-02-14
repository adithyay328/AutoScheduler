import React from "react";
import { Col, Row } from "antd"
import Title from "../../../atoms/Title"
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "./Schedule.scss"
// import "react-big-calendar/lib/css/react-big-calendar.css";

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

const events = [
  { start: new Date(), end: new Date(), title: "special event" }
];

function Schedule({ curDate, tasks }) {
    // let [events, setEvents] = React.useState(tasks.map(task => ({
    //     title: task.name,
    //     startDate: task.timeData.start,
    //     endDate: task.timeData.start,
    //     allDay: false,
    //     resource: false
    // })))
    // console.log(events)

    return (
        <div>
            <Title style={{textAlign: "left", marginBottom: "1.5em"}} text="Schedule" size={1.5} weight={400} />
            <Row>
                <Col flex={1}>
                </Col>
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

// import React from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// const locales = {
//   "en-US": require("date-fns/locale/en-US")
// };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales
// });
// const myEventsList = [
//   { start: new Date(), end: new Date(), title: "special event" }
// ];
// export default function Schedule() {
//   return (
//     <div className="App">
//       <Calendar
//         localizer={localizer}
//         events={myEventsList}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//       />
//     </div>
//   );
// }