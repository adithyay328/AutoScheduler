<<<<<<< HEAD
import Header from '../atoms/Header'
=======
import Header from "../atoms/Header";
import TaskSection from "./tasksection/TaskSection";
import ToolSection from "./toolsection/ToolSection";

>>>>>>> client-dev-2

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
