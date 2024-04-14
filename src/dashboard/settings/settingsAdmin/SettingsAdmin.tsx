import { useState, useEffect } from "react";
import DetailsFrame from "./detailsFrame/DetailsFrame";
import Association from "./association/Association";
import DataStructure from "@/data/dataStructure.json";
import "./SettingsAdmin.scss";
import agent from "@/api/agent";

interface DataStructure {
    id?: string;
    administrator?: string;
    name: string;
    associations: {
        id?: string;
        address?: string;
        county?: string;
        city?: string;
        name: string;
        blocks: {
            id?: string;
            name: string;
            stairs: {
                id?: string;
                name: string;
                apartments: {
                    id?: string;
                    name: string;
                }[];
            }[];
        }[];
    }[];
}

function SettingsAdmin({administrationID}: {administrationID: string} ) {
    const [APIData, setAPIData] = useState<any>(null);

    const [dataStructure, setDataStructure] = useState<DataStructure>();
    const [selectedElement, setSelectedElement] = useState([-1, -1, -1, -1]);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const administrationStructure = agent.AdminSettings.getAdministrationStructure(administrationID);
        administrationStructure.then((data) => {
            setDataStructure(data);
        });
    }, [administrationID]);

    useEffect(() => {
        setSelected(selectedElement[0] === -1);
    }, [selectedElement]);

    function saveClickHandle() {
        console.log(dataStructure);

        // TODO: save dataStructure to file/API
    }

    function resetHandle() {
        setDataStructure(DataStructure);
    }

    function removeClickHandle() {
        setDataStructure(prevDataStructure => {
            if (!prevDataStructure) return prevDataStructure;

            let newDataStructure = {...prevDataStructure};
            if (selectedElement[0] !== -1) {
                if (selectedElement[1] !== -1) {
                    if (selectedElement[2] !== -1) {
                        if (selectedElement[3] !== -1) {
                            newDataStructure.associations[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments.splice(selectedElement[3], 1);
                        } else {
                            newDataStructure.associations[selectedElement[0]].blocks[selectedElement[1]].stairs.splice(selectedElement[2], 1);
                        }
                    } else {
                        newDataStructure.associations[selectedElement[0]].blocks.splice(selectedElement[1], 1);
                    }
                } else {
                    newDataStructure.associations.splice(selectedElement[0], 1);
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
                            <h3>{dataStructure?.name}</h3>
                            
                            <div className="buttons">
                                <div className={`button ${selected ? 'active' : ''}`} onClick={addClickHandle}>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                        </div>

                        <div className="blocuri">
                            <div className="contentDiv">
                                { dataStructure?.associations.map((data: any, index: any) => { return (
                                    <Association
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
                                
                    {/* <DetailsFrame selectedElement={selectedElement} /> */}

                    <div className="save-popup-container active">
                        <div className="save-popup">
                            <div className="text">
                                <i className="ri-information-line"></i>
                                <h3>Unsaved changes</h3>
                            </div>

                            <div className="buttons">
                                <button onClick={resetHandle}>
                                    Reset
                                </button>

                                <button onClick={saveClickHandle}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsAdmin;
