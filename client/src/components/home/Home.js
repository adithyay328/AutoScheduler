import Header from "../atoms/Header";
import TaskSection from "./tasksection/TaskSection";
import ToolSection from "./toolsection/ToolSection";


function Home() {
    return (
        <>
            <Header />
            {/* Container */}
            <div style={{paddingTop: "40px", width: "90%", margin: "auto"}}>
                <ToolSection />
                <TaskSection />
            </div>
        </>
    )
}

export default Home;
