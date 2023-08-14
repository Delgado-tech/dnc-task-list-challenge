import { LuCheckSquare, LuSquare } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import './style.scss';

export interface ICheckbox {
    id: string,
    name?: string,
    checked?: boolean,
}

export default function Checkbox({ id, name, checked = false }: ICheckbox) {
    const inputRef = useRef<HTMLInputElement>(null);
    const checkboxRef = useRef<HTMLSpanElement>(null);
    const [checkIcon, setCheckIcon] = useState<any>(null);

    useEffect(() => {
        handleToggleIcon();
    }, []);

    const handleToggleIcon = () => {
        const checkbox = inputRef.current;

        if (checkbox) {
            checkbox.checked = !checkbox.checked;

            if (checkbox.checked) {
                setCheckIcon( <LuCheckSquare /> );
                checkboxRef.current?.classList.add("checkbox--checked");
            } else {
                setCheckIcon( <LuSquare /> );   
                checkboxRef.current?.classList.remove("checkbox--checked");         
            }
        }
    }
    
    return (
        <div className="checkbox">
            <span ref={checkboxRef} onClick={() => handleToggleIcon()}>{ checkIcon }</span>
            <input id={ id } name={ name ? name : id } ref={inputRef} type="checkbox" defaultChecked={checked}/>
        </div>
    );
}