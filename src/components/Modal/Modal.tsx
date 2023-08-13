import './style.scss';

export interface IModal {
    children: any
}

export default function Modal({children}: IModal) {
    return (
        <div>
            {children}
        </div>
    );
}