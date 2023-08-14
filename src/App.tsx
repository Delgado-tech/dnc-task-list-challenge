import { useState } from 'react';
import Header from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import TaskList from "./components/TaskList/TaskList";
import { TaskFakeDB, startTasks } from "./services/tasks-db.mock";
import './app.scss';

const db = new TaskFakeDB();
db.Insert(startTasks);

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />
      <main>
        <h1 className="--font-display">Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
        <TaskList db={db} />
      </main>
    </>
  )
}

