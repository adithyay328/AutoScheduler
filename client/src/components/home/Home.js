import React from "react";
import Header from "../atoms/Header";
import TaskSection from "./tasksection/TaskSection";
import ToolSection from "./toolsection/ToolSection";
import { DragDropContext } from "react-beautiful-dnd";
import { differenceInMinutes } from "date-fns";


function Home() {
    let [tasks, setTasks] = React.useState(baseTasks);

    return (
        <DragDropContext
            onDragEnd = {(result) => onDragEnd(result, setTasks)}
        
        >
            <Header />
            {/* Container */}
            <div style={{paddingTop: "40px", width: "90%", margin: "auto"}}>
                <ToolSection />
                <TaskSection style={{ paddingTop: "30px" }} justify="space-between" tasks={tasks} setTasks={setTasks} />
            </div>
        </DragDropContext>
    )
}

export default Home;
