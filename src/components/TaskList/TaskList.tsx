import { TaskFakeDB } from '../../services/tasks-db.mock';
import Checkbox from '../Checkbox/Checkbox';
import { BiSolidTrashAlt, BiPlus } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import './style.scss';
import modalOperation from './modalOperations';

export interface ITaskList {
    db: TaskFakeDB
}

export default function TaskList({ db }: ITaskList) {
    const [modal, setModal] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [checkboxToggle, setCheckboxToggle] = useState(false);

    const modalOperationHandlers = {
        db: db,
        setModal: setModal,
        setShowModal: setShowModal
    };

    useEffect(() => {
        const body = document.querySelector("body") as HTMLBodyElement;

        const handleClickOutsideModalBox = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("modal")) {
                setShowModal(false);
                setModal(null);
            }
        }

        if(showModal) {
            window.addEventListener("click", handleClickOutsideModalBox);
            body.style.setProperty("overflow-y", "hidden");
        } else {
            body.style.setProperty("overflow-y", "scroll");
        }

        return () => {
            window.removeEventListener("click", handleClickOutsideModalBox);
        }

    }, [showModal]);

    useEffect(() => {}, [checkboxToggle]);

    const tableData: any[] = [];
    db.getDatabase().map(task => {
        const checked = task.data.completed !== undefined ? task.data.completed : false;

        tableData.push(
            <tr id={`taskId:${task.id}`} key={task.id} className="tasklist__row">
                <td 
                    onClick={() => modalOperation.callReadModal(task.id, modalOperationHandlers)} className="tasklist__item"
                    style={checked ? {textDecoration: "line-through", color: "gray"} : {textDecoration: "none", color: "white"}}
                >
                    {task.data.title ? task.data.title : `Tarefa ${task.id}`}
                </td>
                <td>
                    <span onClick={() => {
                        modalOperation.updateTaskStatus(task.id, `ch${task.id}`, modalOperationHandlers);
                        setCheckboxToggle(!checkboxToggle);
                    }}>
                        <Checkbox id={`ch${task.id}`} checked={ task.data.completed !== undefined ? task.data.completed : false } />
                    </span>
                </td>
                <td>
                    <MdEdit className="tasklist__icon" onClick={() => modalOperation.callUpdateModal(task.id, modalOperationHandlers)}/>
                    <BiSolidTrashAlt className="tasklist__icon" onClick={() => modalOperation.callDeleteModal(task.id, modalOperationHandlers)}/>
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
                    <tr><td></td></tr>
                    { tableData }
                    <tr className="tasklist__row">
                        <td colSpan={3} className="tasklist__item tasklist__item-add" onClick={() => modalOperation.callInsertModal(modalOperationHandlers)}>
                            <p>
                                Nova tarefa...
                                <BiPlus className="tasklist__icon" />    
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}
