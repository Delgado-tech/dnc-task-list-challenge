import { TaskFakeDB } from '../../services/tasks-db.mock';
import './style.scss';

export interface ITaskList {
    db: TaskFakeDB
}

export default function TaskList({ db }: ITaskList) {

    return (
        <div>

        </div>
    );
}