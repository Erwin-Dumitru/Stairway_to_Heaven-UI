import {useEffect, useState} from 'react';
import Apartment from './apartment/Apartment';
import './Stair.scss';

export default function Stair({elementAddress, title, apartments, selectedElement, setSelectedElement, addClickHandle, removeClickHandle}: {elementAddress: number[], title: any, apartments: any[], selectedElement: any[], setSelectedElement: any, addClickHandle: any, removeClickHandle: any}) {
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setActive(selectedElement && elementAddress && selectedElement[0] === elementAddress[0] && selectedElement[1] === elementAddress[1] && selectedElement[2] === elementAddress[2]);
        setSelected(selectedElement && elementAddress && selectedElement[0] === elementAddress[0] && selectedElement[1] === elementAddress[1] && selectedElement[2] === elementAddress[2] && selectedElement[3] === -1);
    }, [selectedElement]);

    return (
        <div className="stair">
            <div className={`stairTitle ${selected ? 'active' : ''}`} onClick={() => setSelectedElement(elementAddress)}>
                <h3>{`Scara ${title}`}</h3>

                <div className="buttons">
                    <div className={`button ${selected ? 'active' : ''}`} onClick={removeClickHandle}>
                        <i className="ri-delete-bin-line"></i>
                    </div>

                    <div className={`button ${selected ? 'active' : ''}`} onClick={addClickHandle}>
                        <i className="ri-add-line"></i>
                    </div>
                </div>

                <i className="ri-arrow-down-s-line arrow-down" ></i>
            </div>

            <div className={`wrapper ${active ? 'active' : ''}`}>
                <div className="apartments">
                    { apartments.map((data: any, index: number) => { return (
                        <Apartment
                            key={index}
                            elementAddress={[elementAddress[0], elementAddress[1], elementAddress[2], index]}
                            data={data}
                            selectedElement={selectedElement}
                            setSelectedElement={setSelectedElement}
                            removeClickHandle={removeClickHandle}
                        />
                    );})}
                </div>
            </div>
        </div>
    );
}
