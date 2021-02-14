import React from "react";
import Header from "../atoms/Header";
import TaskSection from "./tasksection/TaskSection";
import ToolSection from "./toolsection/ToolSection";
import { DragDropContext } from "react-beautiful-dnd";
import { format, parse, startOfWeek, getDay, differenceInMinutes } from "date-fns";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

function getFirstNonFixed(tasks) {
    let index = tasks.findIndex(v => v.rank == 1);
    index = (index == -1) ? 0 : index;
    return index;
}

function onDragEnd(result, setTasks) {
    const { destination, source, draggableId } = result;

    if (!destination) {
        return;
    }

    if ((source.droppableId == destination.droppableId) && (source.index == destination.index)) {
        return;
    }
    setTasks(tasks => {
        //first non fixed task
        let initIndex = getFirstNonFixed(tasks); 

        let srcIndex = source.index
        //update array positions
        //cannot move ranked task above a fixed task
        if (srcIndex < initIndex) {
            return tasks;
        }
        
        //cannnot move fixed task below ranked task
        console.log(initIndex)
        let destIndex = (destination.index >= initIndex) ? destination.index : initIndex;
        //check if source index and destination index are same (since we did a cutoff source could change)
        if (srcIndex == destIndex) {
            return tasks;
        }
        
        //create copy of tasks
        let tmp = tasks.splice(srcIndex, 1)
        tasks.splice(destIndex, 0, tmp[0])

        //update rankings
        if (srcIndex < destIndex) {
            for (let i = srcIndex; i < destIndex; i++) {
                tasks[i].rank -= 1;
            }
            tasks[destIndex].rank = tasks[destIndex - 1].rank + 1 ;
        }
        else if (srcIndex > destIndex) {
            for (let i = destIndex + 1; i <= srcIndex; i++) {
                tasks[i].rank += 1;
            }
            tasks[destIndex].rank = tasks[destIndex + 1].rank - 1;
        }
        return tasks
    })
}

const baseTasks = [
    {id: 0, name: "school",
    timeData: {
        start: new Date(2021, 1, 14, 8, 30),
        end: new Date(2021, 1, 14, 14, 30),
        duration: differenceInMinutes(new Date(2021, 2, 14, 14, 30), new Date(2021, 2, 13, 8, 30))
    },
    rank: 0    
},
    {id: 1, name: "chores",
    timeData: {
        duration: differenceInMinutes(new Date(2021, 2, 13, 8, 50), new Date(2021, 2, 13, 8, 0))
    },
        rank: 1
    },
    {id: 2, name: "games",
    timeData: {
        duration: differenceInMinutes(new Date(2021, 2, 13, 8, 50), new Date(2021, 2, 13, 8, 0))
    },
    rank: 2}
]

function Home() {
    let [tasks, setTasks] = React.useState(baseTasks);
    let [curDate, setCurDate] = React.useState(new Date())

    return (
        <DragDropContext
            onDragEnd = {(result) => onDragEnd(result, setTasks)}
        
        >
            <Header />
            {/* Container */}
            <div style={{paddingTop: "40px", width: "90%", margin: "auto"}}>
                <ToolSection curDate={curDate} setCurDate={setCurDate} />
                <TaskSection curDate={curDate} style={{ paddingTop: "30px" }} justify="space-between" tasks={tasks} setTasks={setTasks} />
            </div>
        </DragDropContext>
    )
}

export default Home;
