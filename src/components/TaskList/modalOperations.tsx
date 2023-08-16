import Modal from "../Modal/Modal";
import { TaskFakeDB } from '../../services/tasks-db.mock';

function callReadModal(taskId: number, handler: { db: TaskFakeDB, setModal: Function, setShowModal: Function }) {
    const task = handler.db.getData(taskId);
    handler.setShowModal(true);

    handler.setModal(
        <Modal 
            key={`modalRead:${taskId}`} 
            show={true}
            cancelButton={{
                text: "Fechar",
                handler: () => {
                    handler.setModal(null);
                    handler.setShowModal(false);
                }
            }}
        >
            <h1>Visualização da tarefa</h1>
            <div className="modal__content">
                <p> 
                    <span className="modal__content-status">
                        Status: { task?.data.completed ? (
                            <span className="modal__content-status--completed">Concluído</span>
                        ) : (
                            <span>Pendente</span>
                        )}
                    </span>
                    <br />
                    <span>Título:</span> { task?.data.title }
                </p>
                <p><span>Descrição:</span> { task?.data.description }</p>
            </div>
        </Modal>
    );

    
}

function callDeleteModal(taskId: number, handler: { db: TaskFakeDB, setModal: Function, setShowModal: Function }) {
    const task = handler.db.getData(taskId);
    handler.setShowModal(true);

    handler.setModal(
        <Modal 
            key={`modalDelete:${taskId}`} 
            show={true}
            cancelButton={{
                handler: () => {
                    handler.setModal(null);
                    handler.setShowModal(false);
                }
            }}
            confirmButton={{
                handler: () => {
                    handler.db.Delete(taskId);
                    handler.setModal(null);
                    handler.setShowModal(false);
                }
            }}
        >
            <h1>Deseja excluir esse item?</h1>
            <div className="modal__content">
                <p> 
                    <span className="modal__content-status">
                        Status: { task?.data.completed ? (
                            <span className="modal__content-status--completed">Concluído</span>
                        ) : (
                            <span>Pendente</span>
                        )}
                    </span>
                    <br />
                    <span>Título:</span> { task?.data.title }
                </p>
                <p><span>Descrição:</span> { task?.data.description }</p>
            </div>
        </Modal>
    );

    
}

function callInsertModal(handler: { db: TaskFakeDB, setModal: Function, setShowModal: Function }) {
    handler.setShowModal(true);

    handler.setModal(
        <Modal 
            key={`modalInsert`} 
            show={true}
            cancelButton={{
                text: "Cancelar",
                handler: () => {
                    handler.setModal(null);
                    handler.setShowModal(false);
                }
            }}
            confirmButton={{
                text: 'Adicionar',
                handler: () => {
                    const form = document.querySelector(".modal__form") as HTMLFormElement;
                    const taskInputTitle = form.querySelector("#modal__form-title") as HTMLInputElement;
                    const taskInputDescription = form.querySelector("#modal__form-description") as HTMLInputElement;

                    handler.db.Insert([{
                        title: taskInputTitle.value !== "" ? taskInputTitle.value : `Tarefa ${handler.db.getCurrentId() + 1}`,
                        description: taskInputDescription.value,
                        completed: false
                    }]);

                    handler.setModal(null);
                    handler.setShowModal(false);

                }
            }}
        >
            <h1>Adicionar uma Tarefa</h1>
            <div className="modal__content">
                <form className="modal__form">
                    <div className="modal__input">
                        <label htmlFor="modal__form-title" >Título</label>
                        <input id="modal__form-title" name="title" type="text" maxLength={32}/>
                    </div>
                    <div className="modal__input">
                        <label htmlFor="modal__form-description">Descrição</label>
                        <textarea id="modal__form-description" name="description" maxLength={500}></textarea>
                    </div>
                </form>
            </div>
        </Modal>
    );

    
}

function callUpdateModal(taskId: number, handler: { db: TaskFakeDB, setModal: Function, setShowModal: Function }) {
    const task = handler.db.getData(taskId)!;
    handler.setShowModal(true);

    handler.setModal(
        <Modal 
            key={`modalUpdate:${taskId}`} 
            show={true}
            cancelButton={{
                handler: () => {
                    handler.setModal(null);
                    handler.setShowModal(false);
                }
            }}
            confirmButton={{
                handler: () => {
                    const form = document.querySelector(".modal__form") as HTMLFormElement;
                    const taskInputTitle = form.querySelector("#modal__form-title") as HTMLInputElement;
                    const taskInputDescription = form.querySelector("#modal__form-description") as HTMLInputElement;

                    handler.db.Update({
                        id: task.id,
                        data: {
                            title: taskInputTitle.value !== "" ? taskInputTitle.value : `Tarefa ${handler.db.getCurrentId() + 1}`,
                            description: taskInputDescription.value,
                        }
                    });

                    handler.setModal(null);
                    handler.setShowModal(false);

                }
            }}
        >
            <h1>Deseja editar esse item?</h1>
            <div className="modal__content">
                <form className="modal__form">
                    <div className="modal__input">
                        <label htmlFor="modal__form-title" >Título</label>
                        <input id="modal__form-title" name="title" type="text" maxLength={32} defaultValue={task?.data.title}/>
                    </div>
                    <div className="modal__input">
                        <label htmlFor="modal__form-description">Descrição</label>
                        <textarea id="modal__form-description" name="description" maxLength={500} defaultValue={task?.data.description}></textarea>
                    </div>
                </form>
            </div>
        </Modal>
    );

    
}

function updateTaskStatus(taskId: number, checkboxId: string, handler: { db: TaskFakeDB, setModal: Function, setShowModal: Function }) {
    const checkbox = document.getElementById(checkboxId) as HTMLInputElement;

    handler.db.Update({id: taskId, data: {
        completed: checkbox.checked
    }});

    handler.setModal(null);
    handler.setShowModal(false);
}

export default { callReadModal, callDeleteModal, callInsertModal, callUpdateModal, updateTaskStatus };