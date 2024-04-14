import { useEffect, useState } from 'react';
import Stair from './stair/Stair';
import './Bloc.scss'

export default function Bloc({elementAddress, title, stairs, selectedElement, setSelectedElement, addClickHandle, removeClickHandle}: {elementAddress: number[], title: any, stairs: any[], selectedElement: any[], setSelectedElement: any, addClickHandle: any, removeClickHandle: any}) {
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setActive(selectedElement[0] === elementAddress[0] && selectedElement[1] === elementAddress[1]);
        setSelected(selectedElement[0] === elementAddress[0] && selectedElement[1] === elementAddress[1] && selectedElement[2] === -1);
    }, [selectedElement]);

    return (
        <div className="bloc">
            <div className={`blocTitle ${selected ? 'active' : ''}`} onClick={() => setSelectedElement(elementAddress)}>
                <h3>{`Bloc ${title}`}</h3>

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
                <div className={`stairs ${active ? 'active' : ''}`}>
                    {stairs.map((data: any, index: any) => { return (
                        <Stair 
                            key={index} 
                            elementAddress={[elementAddress[0], elementAddress[1], index, -1]}
                            title={data.stair} 
                            apartments={data.apartments} 
                            selectedElement={selectedElement} 
                            setSelectedElement={setSelectedElement}
                            addClickHandle={addClickHandle}
                            removeClickHandle={removeClickHandle}
                        />
                    )})}
                </div>
            </div>
        </div>
    );
}
