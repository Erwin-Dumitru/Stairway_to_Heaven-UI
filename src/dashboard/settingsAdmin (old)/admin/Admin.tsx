
// import CreateAssociation from "../../CreateAssociation";
import { useState, useEffect } from "react";
import DataStructure from "@/data/dataStructure.json";
import DetailsFrame from "./detailsFrame/DetailsFrame";
import "./Admin.scss"
// import "./CreateAssociation.scss"
// import "../Dialog.scss"

function Apartment({elementAddress, data, selectedElement, setSelectedElement}: {elementAddress: number[], data: any, selectedElement: any[], setSelectedElement: any}) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(selectedElement && elementAddress && selectedElement[0] === elementAddress[0] && selectedElement[1] === elementAddress[1] && selectedElement[2] === elementAddress[2] && selectedElement[3] === elementAddress[3]);
    }, [selectedElement]);

    return (
        <div className="apartment">
            <div className={`apartmentTitle ${active ? 'active' : ''}`} onClick={() => setSelectedElement(elementAddress)}>
                <h3>{`Apartament ${data.apartment}`}</h3>
            </div>
        </div>
    );
}

function Stair({elementAddress, title, apartments, selectedElement, setSelectedElement}: {elementAddress: number[], title: any, apartments: any[], selectedElement: any[], setSelectedElement: any}) {
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
                <i className="ri-arrow-down-s-line" ></i>
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
                        />
                    );})}
                </div>
            </div>
        </div>
    );
}

function Bloc({elementAddress, title, stairs, selectedElement, setSelectedElement}: {elementAddress: number[], title: any, stairs: any[], selectedElement: any[], setSelectedElement: any}) {
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
                <i className="ri-arrow-down-s-line" ></i>
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
                        />
                    )})}
                </div>
            </div>
        </div>
    );
}

function Address({elementAddress, title, blocks, selectedElement, setSelectedElement}: {elementAddress: number[], title: any, blocks: any[], selectedElement: any[], setSelectedElement: any}) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(selectedElement[0] === elementAddress[0] && selectedElement[1] === -1);
    }, [selectedElement]);

    return (
        <div className="address">
            <div className={`addressTitle ${selected ? 'active' : ''}`} onClick={() => setSelectedElement(elementAddress)}>
                <h3>{title}</h3>
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
                    />
                );})}
            </div>
        </div>
    );
}

// function AddElementModal({dialogRef, selectedElement, setSelectedElement}: {dialogRef: any, selectedElement: any, setSelectedElement: any}) {
//     useEffect(() => {
//         const dialog = dialogRef.current;
//         if (dialog) {
//             dialog.addEventListener("click", (event: any) => {
//                 if (event.target === dialog) {
//                     dialog.classList.add("isClosing");
//                     dialog.addEventListener("webkitAnimationEnd", function handleAnimationEnd() {
//                         dialog.classList.remove("isClosing");
//                         dialog.close();
//                         dialog.removeEventListener("webkitAnimationEnd", handleAnimationEnd, false);
//                     }, false);
//                 }
//             });
//         }
//     }, [dialogRef]);
    
//     function AddElement() {
//         if (selectedElement[0] === -1) {
//             return (
//                 <div className="addElement">
//                     <h1>Adaugă bloc</h1>

//                     <form>
//                         <input type="text" placeholder="Bloc" />
//                         <button type="submit">Adaugă</button>
//                     </form>

//                     <button onClick={() => dialogRef.current?.close()}>Închide</button>
//                 </div>
//             );
//         } else if (selectedElement[1] === -1) {
//             return (
//                 <div className="addElement">
//                     <h1>Adaugă scară</h1>
//                     <button onClick={() => dialogRef.current?.close()}>Închide</button>
//                 </div>
//             );
//         } else if (selectedElement[2] === -1) {
//             return (
//                 <div className="addElement">
//                     <h1>Adaugă apartament</h1>
//                     <button onClick={() => dialogRef.current?.close()}>Închide</button>
//                 </div>
//             );
//         } else {
//             return (
//                 <div className="addElement">
//                     <h1>Adaugă element</h1>
//                     <button onClick={() => dialogRef.current?.close()}>Închide</button>
//                 </div>
//             );
//         }
//     }

//     return (
//         <dialog className="addElementModal" ref={dialogRef}>
//             <AddElement />
//         </dialog>
//     );
// }

function CreateAssociation() {
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

    function saveClickHandle() {
        console.log(dataStructure);

        // TODO: save dataStructure to file/API
    }

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
        setDataStructure(prevDataStructure => {
            let newDataStructure = {...prevDataStructure};
            if (selectedElement[0] === -1) {
                // newDataStructure.addresses.push({address: "New address", city: "New city", name: "New address", blocks: []});
            } else if (selectedElement[1] === -1) {
                newDataStructure.addresses[selectedElement[0]].blocks.push({block: "New block", stairs: []});
            } else if (selectedElement[2] === -1) {
                newDataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs.push({stair: "New stair", apartments: []});
            } else {
                newDataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments.push({apartment: "New apartment"});
            }
            return newDataStructure;
        });
    }

    return (
        <div className="createAssociation">
            <div className="associationContent">
                <div className={`associationTitle ${selected ? 'active' : ''}`} onClick={() => setSelectedElement([-1, -1, -1, -1])}>
                    {/* <h3>{numeAsociatie}</h3> */}
                    <h3>Asociație</h3>
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
                            />
                        );})}
                    </div>
                </div>

                <div className="actionButtons">
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
                </div>
            </div>

            <DetailsFrame selectedElement={selectedElement} />
        </div>
    );
}

export default CreateAssociation;
