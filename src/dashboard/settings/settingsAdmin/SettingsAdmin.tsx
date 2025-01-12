import { useState, useEffect } from "react";
import DetailsFrame from "./detailsFrame/DetailsFrame";
import Association from "./association/Association";
import DataStructure from "@/data/dataStructure.json";
import SavePopUp from "./savePopUp/SavePopUp";
import "./SettingsAdmin.scss";
// import agent from "@/api/agent";
// import { set } from "mobx";

interface DataStructure {
    id?: string;
    administrator?: string;
    name: string;
    associations: Association[];
}

interface Association {
    id?: string;
    name: string;
    blocks: Bloc[];
}

interface Bloc {
    id?: string;
    name: string;
    stairs: Stair[];
}

interface Stair {
    id?: string;
    name: string;
    apartments: Apartment[];
}

interface Apartment {
    id?: string;
    name: string;
}

function SettingsAdmin({administrationID}: {administrationID: string} ) {
    const [lastStructureAction, setLastStructureAction] = useState('create');
    const [modifyMode, setModifyMode] = useState<boolean>(false);
    const [APIData, setAPIData] = useState<any>(null);

    const [dataStructure, setDataStructure] = useState<DataStructure>();
    const [selectedElement, setSelectedElement] = useState([-1, -1, -1, -1]);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        // const administrationStructure = agent.AdminSettings.getAdministrationStructure(administrationID);
        // administrationStructure.then((data) => {
        //     setDataStructure(data);
        // });

        const fetchData = async () => {
            // const data = await agent.AdminSettings.getAdministrationStructure(administrationID);
            // setAPIData(data);
            // setDataStructure(data);

            setAPIData(DataStructure);
            setDataStructure(DataStructure);
        }

        fetchData();
    }, [administrationID]);

    useEffect(() => {
        setSelectedElement((prevSelectedElement) => {
            if (!prevSelectedElement) return [-1, -1, -1, -1];
            if (!dataStructure) return prevSelectedElement;

            let lenghts = [
                dataStructure.associations.length,
                dataStructure.associations[prevSelectedElement[0]]?.blocks.length,
                dataStructure.associations[prevSelectedElement[0]]?.blocks[prevSelectedElement[1]]?.stairs.length,
                dataStructure.associations[prevSelectedElement[0]]?.blocks[prevSelectedElement[1]]?.stairs[prevSelectedElement[2]]?.apartments.length
            ];

            if (lastStructureAction === 'add') {
                if (prevSelectedElement[0] === -1) return [lenghts[0] - 1, -1, -1, -1];

                if (prevSelectedElement[1] === -1) return [prevSelectedElement[0], lenghts[1] - 1, -1, -1];

                if (prevSelectedElement[2] === -1) return [prevSelectedElement[0], prevSelectedElement[1], lenghts[2] - 1, -1];

                return [prevSelectedElement[0], prevSelectedElement[1], prevSelectedElement[2], lenghts[3] - 1]; 
            } else if (lastStructureAction === 'delete') {
                console.log('delete');

                if (prevSelectedElement[0] === -1) return [-1, -1, -1, -1];
                let prev = [...prevSelectedElement];

                let index = 0;
                if (prevSelectedElement[2] === -1) index = 1;
                else if (prevSelectedElement[3] === -1) index = 2;
                else index = 3;

                if (lenghts[index] === 0) {
                    prev[index] = -1;
                    return prev;
                } else if (prev[index] === lenghts[index]) {
                    prev[index] -= 1;
                    return prev;
                } else {
                    return prev;
                }
            } else return [-1, -1, -1, -1];
        });
        
        // if dataStructure is different from APIData, then setModifyMode to true
        if (JSON.stringify(dataStructure) !== JSON.stringify(APIData)) {
            setModifyMode(true);
        } else {
            setModifyMode(false);
        }
    }, [dataStructure]);

    useEffect(() => {
        setSelected(selectedElement[0] === -1);
        console.log(selectedElement);
    }, [selectedElement]);

    function saveClickHandle() {
        console.log(dataStructure);

        // TODO: save dataStructure to file/API
    }

    function resetHandle() {
        setLastStructureAction('create');
        setDataStructure(APIData);
    }

    function removeClickHandle() {
        setDataStructure(prevDataStructure => {
            setLastStructureAction('delete');

            if (!prevDataStructure) return prevDataStructure;
    
            let newDataStructure = JSON.parse(JSON.stringify(prevDataStructure));
            if (selectedElement[0] !== -1) {
                if (selectedElement[1] === -1) {
                    // Remove selected association
                    newDataStructure.associations = newDataStructure.associations.filter((_: any, index: number) => index !== selectedElement[0]);
                } else if (selectedElement[2] === -1) {
                    // Remove selected block
                    newDataStructure.associations[selectedElement[0]].blocks = newDataStructure.associations[selectedElement[0]].blocks.filter((_: any, index: number) => index !== selectedElement[1]);
                } else if (selectedElement[3] === -1) {
                    // Remove selected stair
                    newDataStructure.associations[selectedElement[0]].blocks[selectedElement[1]].stairs = newDataStructure.associations[selectedElement[0]].blocks[selectedElement[1]].stairs.filter((_: any, index: number) => index !== selectedElement[2]);
                } else {
                    // Remove selected apartment
                    newDataStructure.associations[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments = newDataStructure.associations[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments.filter((_: any, index: number) => index !== selectedElement[3]);
                }
            }
    
            return newDataStructure;
        });
    }

    function addClickHandle() {
        var newApartment = {
            name: "New"
        };

        var newStair = {
            name: "New",
            apartments: [ newApartment ]
        };

        var newBlock = {
            name: "New",
            stairs: [ newStair ]
        };

        var newAssociation = {
            name: "New",
            blocks: [ newBlock ]
        };

        setDataStructure(prevDataStructure => {
            setLastStructureAction('add');

            let newDataStructure = JSON.parse(JSON.stringify(prevDataStructure));
            if (selectedElement[0] === -1) {
                newDataStructure.associations.push(newAssociation);
            } else if (selectedElement[1] === -1) {
                newDataStructure.associations[selectedElement[0]].blocks.push(newBlock);
            } else if (selectedElement[2] === -1) {
                newDataStructure.associations[selectedElement[0]].blocks[selectedElement[1]].stairs.push(newStair);
            } else {
                newDataStructure.associations[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments.push(newApartment);
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
                                
                    <DetailsFrame selectedElement={selectedElement} />

                    <SavePopUp open={modifyMode} saveClickHandle={saveClickHandle} resetHandle={resetHandle} />
                </div>
            </div>
        </div>
    );
}

export default SettingsAdmin;
