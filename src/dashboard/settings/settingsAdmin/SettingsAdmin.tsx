import { useState, useEffect } from "react";
import DataStructure from "@/data/dataStructure.json";
import DetailsFrame from "./detailsFrame/DetailsFrame";
import "./SettingsAdmin.scss";
// import { count } from "console";
// import "./CreateAssociation.scss"
// import "../Dialog.scss"

function Apartment({elementAddress, data, selectedElement, setSelectedElement, removeClickHandle}: {elementAddress: number[], data: any, selectedElement: any[], setSelectedElement: any, removeClickHandle: any}) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(selectedElement && elementAddress && selectedElement[0] === elementAddress[0] && selectedElement[1] === elementAddress[1] && selectedElement[2] === elementAddress[2] && selectedElement[3] === elementAddress[3]);
    }, [selectedElement]);

    return (
        <div className="apartment">
            <div className={`apartmentTitle ${active ? 'active' : ''}`} onClick={() => setSelectedElement(elementAddress)}>
                <h3>{`Apartament ${data.apartment}`}</h3>

                <div className="buttons">
                    <div className={`button ${active ? 'active' : ''}`} onClick={removeClickHandle}>
                        <i className="ri-delete-bin-line"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Stair({elementAddress, title, apartments, selectedElement, setSelectedElement, addClickHandle, removeClickHandle}: {elementAddress: number[], title: any, apartments: any[], selectedElement: any[], setSelectedElement: any, addClickHandle: any, removeClickHandle: any}) {
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

function Bloc({elementAddress, title, stairs, selectedElement, setSelectedElement, addClickHandle, removeClickHandle}: {elementAddress: number[], title: any, stairs: any[], selectedElement: any[], setSelectedElement: any, addClickHandle: any, removeClickHandle: any}) {
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

function Address({elementAddress, title, blocks, selectedElement, setSelectedElement, addClickHandle, removeClickHandle}: {elementAddress: number[], title: any, blocks: any[], selectedElement: any[], setSelectedElement: any, addClickHandle: any, removeClickHandle: any}) {
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
                { blocks.map((data: any, index: any) => { return (
                    <Bloc 
                        key={index}
                        elementAddress={[elementAddress[0], index, -1, -1]}
                        title={data.block}
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

function SettingsAdmin() {
    const [dataStructure, setDataStructure] = useState(DataStructure);
    const [selectedElement, setSelectedElement] = useState([-1, -1, -1, -1]);
    const [selected, setSelected] = useState(false);
    // const [numeAsociatie, setNumeAsociatie] = useState("");

    // useEffect(() => {
    //     if (dataStructure.administrator !== "") {
    //         setNumeAsociatie(dataStructure.name);
    //     } else {
    //         setNumeAsociatie("Asociație");
    //     }
    // }, [dataStructure]);

    useEffect(() => {
        setSelected(selectedElement[0] === -1);
    }, [selectedElement]);

    // function saveClickHandle() {
    //     console.log(dataStructure);

    //     // TODO: save dataStructure to file/API
    // }

    function removeClickHandle() {
        setDataStructure(prevDataStructure => {
            let newDataStructure = {...prevDataStructure};
            if (selectedElement[0] !== -1) {
                if (selectedElement[1] !== -1) {
                    if (selectedElement[2] !== -1) {
                        if (selectedElement[3] !== -1) {
                            newDataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments.splice(selectedElement[3], 1);
                        } else {
                            newDataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs.splice(selectedElement[2], 1);
                        }
                    } else {
                        newDataStructure.addresses[selectedElement[0]].blocks.splice(selectedElement[1], 1);
                    }
                } else {
                    newDataStructure.addresses.splice(selectedElement[0], 1);
                }
            }
            return newDataStructure;
        });
    }

    function addClickHandle() {
        var newElement = {
            address: "New",
            county: '',
            city: '',
            name: "New",
            blocks: [
                {
                    block: "New",
                    stairs: [
                        {
                            stair: "New",
                            apartments: [
                                {
                                    apartment: "New"
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        setDataStructure(prevDataStructure => {
            let newDataStructure = JSON.parse(JSON.stringify(prevDataStructure));
            if (selectedElement[0] === -1) {
                newDataStructure.addresses.push(newElement);
            } else if (selectedElement[1] === -1) {
                newDataStructure.addresses[selectedElement[0]].blocks.push(newElement.blocks[0]);
            } else if (selectedElement[2] === -1) {
                newDataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs.push(newElement.blocks[0].stairs[0]);
            } else {
                newDataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments.push(newElement.blocks[0].stairs[0].apartments[0]);
            }
            return newDataStructure;
        });
    }

    return (
        <div className="settings dashboard-page dashboard-container">
            <div className="settingsSection">
                <div className="createAssociation">
                    <div className="associationContent">
                        <div className={`associationTitle ${selected ? 'active' : ''}`} onClick={() => setSelectedElement([-1, -1, -1, -1])}>
                            {/* <h3>{numeAsociatie}</h3> */}
                            <h3>{dataStructure.name}</h3>
                            
                            <div className="buttons">
                                <div className={`button ${selected ? 'active' : ''}`} onClick={addClickHandle}>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                        </div>

                        <div className="blocuri">
                            <div className="contentDiv">
                                { dataStructure.addresses.map((data: any, index: any) => { return (
                                    <Address
                                        key={index}
                                        elementAddress={[index, -1, -1, -1]}
                                        title={data.name}
                                        blocks={data.blocks}
                                        selectedElement={selectedElement} 
                                        setSelectedElement={setSelectedElement}
                                        addClickHandle={addClickHandle}
                                        removeClickHandle={removeClickHandle}
                                    />
                                );})}
                            </div>
                        </div>

                        {/* <div className="actionButtons">
                            <button onClick={saveClickHandle}>
                                <h3>Salvează</h3>
                            </button>
                                
                            <button onClick={addClickHandle}>
                                <h3>Adaugă</h3>
                            </button>
                                
                            <button onClick={removeClickHandle}>
                                <div className="icon">
                                    <i className="ri-delete-bin-line"></i>
                                </div>
                            </button>
                        </div> */}
                    </div>
                                
                    <DetailsFrame selectedElement={selectedElement} />
                </div>

            </div>
        </div>
    );
}

export default SettingsAdmin;
