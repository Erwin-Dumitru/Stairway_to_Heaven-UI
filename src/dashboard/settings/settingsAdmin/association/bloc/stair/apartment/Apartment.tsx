import { useEffect, useState } from 'react';
import './Apartment.scss';

export default function Apartment({elementAddress, name, selectedElement, setSelectedElement, removeClickHandle}: {elementAddress: number[], name: any, selectedElement: any[], setSelectedElement: any, removeClickHandle: any}) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(selectedElement && elementAddress && selectedElement[0] === elementAddress[0] && selectedElement[1] === elementAddress[1] && selectedElement[2] === elementAddress[2] && selectedElement[3] === elementAddress[3]);
    }, [selectedElement]);

    return (
        <div className="apartment">
            <div className={`apartmentTitle ${active ? 'active' : ''}`} onClick={() => setSelectedElement(elementAddress)}>
                <h3>{`Apartament ${name}`}</h3>

                <div className="buttons">
                    <div className={`button ${active ? 'active' : ''}`} onClick={removeClickHandle}>
                        <i className="ri-delete-bin-line"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
