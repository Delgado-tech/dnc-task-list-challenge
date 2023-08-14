import { TaskFakeDB } from '../../services/tasks-db.mock';
import Checkbox from '../Checkbox/Checkbox';
import './style.scss';

export interface ITaskList {
    db: TaskFakeDB
}

export default function TaskList({ db }: ITaskList) {

    const tableData: any[] = [];
    db.getDatabase().map(task => {
        tableData.push(
            <tr id={`taskId:${task.id}`} key={task.id}>
                <td>{task.data.title ? task.data.title : `Tarefa ${task.id}`}</td>
                <td><Checkbox id={`ch${task.id}`} checked={ task.data.completed !== undefined ? task.data.completed : false } /></td>
                <td>
                    <img src="" alt="deletar"/>
                    <img src="" alt="editar"/>
                </td>
            </tr>
        );
    });

    return (
        <section>
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
                            <img src="" alt="adicionar"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}