import { useEffect, useState } from 'react';
import Bloc from './bloc/Bloc';
import './Association.scss';

export default function Association({elementAddress, title, blocks, selectedElement, setSelectedElement, addClickHandle, removeClickHandle}: {elementAddress: number[], title: any, blocks: any[], selectedElement: any[], setSelectedElement: any, addClickHandle: any, removeClickHandle: any}) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(selectedElement[0] === elementAddress[0] && selectedElement[1] === -1);
    }, [selectedElement]);

    return (
        <div className="address">
            <div className={`addressTitle ${selected ? 'active' : ''}`} onClick={() => setSelectedElement(elementAddress)}>
                <h3>{title}</h3>

                <div className="buttons">
                    <div className={`button ${selected ? 'active' : ''}`} onClick={removeClickHandle}>
                        <i className="ri-delete-bin-line"></i>
                    </div>
                    
                    <div className={`button ${selected ? 'active' : ''}`} onClick={addClickHandle}>
                        <i className="ri-add-line"></i>
                    </div>
                </div>
            </div>

            <div className="blocks">
                { blocks?.map((data: any, index: any) => { return (
                    <Bloc 
                        key={index}
                        elementAddress={[elementAddress[0], index, -1, -1]}
                        title={data.name}
                        stairs={data.stairs}
                        selectedElement={selectedElement}
                        setSelectedElement={setSelectedElement}
                        addClickHandle={addClickHandle}
                        removeClickHandle={removeClickHandle}
                    />
                );})}
            </div>
        </div>
    );
}
