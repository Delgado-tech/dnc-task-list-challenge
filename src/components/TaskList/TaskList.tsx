import { TaskFakeDB } from '../../services/tasks-db.mock';
import Checkbox from '../Checkbox/Checkbox';
import { BiSolidTrashAlt, BiPlus } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Modal from "../../components/Modal/Modal";
import './style.scss';

export interface ITaskList {
    db: TaskFakeDB
}

//type TaskListOperation = "delete" | "update" | "insert" | "read";

export default function TaskList({ db }: ITaskList) {
    const [modal, setModal] = useState<any>(null);
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        callReadModal(1);
        const bodyStyle = document.querySelector("body")!.style;

        if(showModal) {
            bodyStyle.setProperty("overflow-y", "hidden");
        } else {
            bodyStyle.setProperty("overflow-y", "scroll");
        }

    }, [showModal]);

    function callReadModal(taskId: number) {
        const task = db.getData(taskId);

        setModal(
            <Modal 
                key={`modal${taskId}`} 
                show={showModal}
                cancelButton={{
                    text: "Fechar",
                    handler: () => {
                        setModal(null);
                        setShowModal(false);
                    }
                }}
            >
                <h2>{ task?.data.title }</h2>
                <p>{ task?.data.description }</p>
            </Modal>
        );
    }

    const tableData: any[] = [];
    db.getDatabase().map(task => {
        tableData.push(
            <tr id={`taskId:${task.id}`} key={task.id}>
                <td>{task.data.title ? task.data.title : `Tarefa ${task.id}`}</td>
                <td><Checkbox id={`ch${task.id}`} checked={ task.data.completed !== undefined ? task.data.completed : false } /></td>
                <td>
                    <MdEdit className="tasklist__icon"/>
                    <BiSolidTrashAlt className="tasklist__icon" />
                </td>
            </tr>
        );
    });

    return (
        <section className="tasklist">
            { modal }
            <table>
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Status</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    { tableData }
                    <tr>
                        <td>Nova tarefa...</td>
                        <td></td>
                        <td>
                            <BiPlus className="tasklist__icon" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}