import './style.scss';

export interface IModal {
    children: any,
    show: boolean,
    confirmButton?: {
        text?: string,
        handler: Function
    },
    cancelButton?: {
        text?: string,
        handler: Function
    },
}

export default function Modal({children, show, confirmButton, cancelButton}: IModal) {
    return (
        <div className="modal" style={{display: show ? 'block' : 'none'}}>
            <div className="modal__wrapper">
                { children }
                <div className="modal__emptySpace"></div>
                <div className="modal__button-cta">
                    { 
                        cancelButton && (
                            <button className="modal__button modal__button--cancel" onClick={() => {
                                cancelButton.handler();
                            }}>
                                {cancelButton.text ? cancelButton.text : "Não"}
                            </button>
                        )
                    }
                    {  
                        confirmButton && (
                            <button className="modal__button modal__button--confirm" onClick={() => {
                                confirmButton.handler();
                            }}>
                                {confirmButton.text ? confirmButton.text : "Sim"}
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}