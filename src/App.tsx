import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import TaskList from "./components/TaskList/TaskList";
import { TaskFakeDB, startTasks } from "./services/tasks-db.mock";

const db = new TaskFakeDB();
db.Insert(startTasks);

export default function App() {

  return (
    <>
      <Header />
      <p>Otimize seu tempo e se organize com o nosso Planejador Diário.</p>
      <TaskList db={db} />

      <Modal>
        <p>Red</p>
      </Modal>
    </>
  )
}

