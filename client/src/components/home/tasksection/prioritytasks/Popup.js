import { Divider, InputNumber } from "antd";
import React from "react";
import ButtonComponent from "../../../atoms/ButtonComponent";
import InputComponent from "../../../atoms/InputComponent";
import FormWrapper from "../../../base/wrappers/FormWrapper";
import NumberInput from "./NumberInput";
import TimeInput from "./TimeInput";

function updateTasks(tasks, newTask) {
    //always make a new copy (never mutate original state)
    tasks = [...tasks];
    let idx = tasks.findIndex(v => v.rank > newTask.rank);

    //otherwise
    if (idx == -1) {
        newTask.rank = tasks.length > 0 ? tasks[tasks.length - 1] + 1 : 1;
        return [...tasks, newTask]
    }
    else {
        if (newTask.rank == 0) {
            tasks.splice(idx, 0, newTask)
        }
        else {
            if (idx > 0) {
                idx -= 1;
            }
            tasks.splice(idx, 0, newTask)
            for (let i = idx + 1; i < tasks.length; i++) {
                tasks[i].rank += 1;
            }
        }
        return tasks;
    }
}

function onFinish(name, hrs, mins, times, rank, setTasks, setPopup) {
    let duration = hrs * 60 + mins;
    // checks
    if (name != "") {
        let timeData = {
            duration
        }
        if (times.length == 2) {
            timeData = { ...timeData, start: times[0], end: times[1] }
        }

        setTasks(tasks => {
            let newTask = {
                id: tasks.length,
                name,
                timeData,
                rank
            }
            let tasklist = updateTasks(tasks, newTask)
            return tasklist;
        })
        setPopup(false)
    }
    //create error
}

function onFinishFailed(errorInfo) {
    console.error("ERROR")
}

function extractNumbers(v) {
    let extracted = String(v).trim().replace(" ", "").match(/\d+/);
    if (extracted == null) {
        return null;
    }
    else {
        return parseInt(extracted[0]);
    }
}

function Popup({ setTasks, data, setPopup }) {
    let [name, setName] = React.useState("")
    let [hrs, setHrs] = React.useState(0);
    let [mins, setMins] = React.useState(30);
    let [times, setTimes] = React.useState([])
    let [rank, setRank] = React.useState(0)

    React.useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
        setPopup(false)
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

    return (
        <div className="popup" >
            <FormWrapper
            onFinish={(values) => onFinish(name, hrs, mins, times, rank, setTasks, setPopup)}
            onFinishFailed={onFinishFailed}
            >
                <InputComponent
                    label="Task Name"
                    name="Task Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />

                <TimeInput
                    label="Time"
                    name="Time"
                    onChangeTimeRange={vals => setTimes(vals.map(v => v._d))}
                    onChangeTimeHrs={v => {
                        let res = extractNumbers(v);
                        if (res != null) {
                            setHrs(res)
                        }
                    }}
                    onChangeTimeMins={v => {
                        let res = extractNumbers(v);
                        if (res != null) {
                            setMins(res)
                        }
                    }}
                    hrs={hrs}
                    mins={mins}
                />
                <Divider type="horizontal" style={{ width: "90%", margin: "0.7em"}} />

                <NumberInput
                        label="Rank (0 for fixed)"
                        name="Rank"
                    width="100%"
                    onChange={v => setRank(v)}
                    defValue={rank}

                />

                <ButtonComponent
                    type="primary"
                    htmlType="submit"
                    buttontext="Done"
                />
        </FormWrapper>
        </div>
    )
}

export default Popup;