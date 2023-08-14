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
        <div style={{display: show ? 'block' : 'none'}}>
            { children }
            {  
                confirmButton && (
                    <span onClick={() => {
                        confirmButton.handler();
                    }}>
                        {confirmButton.text ? confirmButton.text : "Sim"}
                    </span>
                )
            }
            { 
                cancelButton && (
                    <span onClick={() => {
                        cancelButton.handler();
                    }}>
                        {cancelButton.text ? cancelButton.text : "Não"}
                    </span>
                )
            }
        </div>
    );
}