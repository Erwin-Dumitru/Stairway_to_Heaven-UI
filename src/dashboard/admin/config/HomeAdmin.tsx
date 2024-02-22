import "./styles/HomeAdmin.css"
import "./styles/CreateAssociation.css"
import "../../styles/Dialog.css"
import { useState, useEffect, useRef } from "react";
import DataStructure from "../../../data/dataStructure.json";
import DetailsFrame from "./DetailsFrame";
// import CreateAssociation from "../../CreateAssociation";

function Apartment({index, data, selectedElement, setSelectedElement, isSelected}: {index: number, data: any, selectedElement: any[], setSelectedElement: any, isSelected: boolean}) {
    const [active, setActive] = useState(false);

    function clickHandle() {
        setSelectedElement([selectedElement[0], selectedElement[1], index]);
    }

    useEffect(() => {
        if (selectedElement && isSelected && selectedElement[2] === index) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [selectedElement]);

    return (
        <div className="apartment">
            <div className={`apartmentTitle ${active ? 'active' : ''}`} onClick={clickHandle}>
                <h3>{data.apartment}</h3>
                {/* <i className="ri-add-line"></i> */}
            </div>
        </div>
    );
}

function Stair({index, title, apartments, selectedElement, setSelectedElement, isSelected}: {index: number, title: any, apartments: any[], selectedElement: any[], setSelectedElement: any, isSelected: boolean}) {
    const [active, setActive] = useState(false);
    const [maxHeight, setMaxHeight] = useState('1000px');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current !== null) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, []);

    function clickHandle() {
        setSelectedElement([selectedElement[0], index, -1]);
    }

    useEffect(() => {
        if (selectedElement && isSelected && selectedElement[1] === index) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [selectedElement]);

    return (
        <div className="stair">
            <div className={`stairTitle ${active && selectedElement[2] === -1 ? 'active' : ''}`} ref={titleRef} onClick={clickHandle}>
                <h3>{title}</h3>
                <i className="ri-arrow-down-s-line" 
                // onClick={clickHandle}
                ></i>
            </div>

            <div className={`wrapper ${active ? 'active' : ''}`}>
                <div className="apartments">
                    { apartments.map((data: any, index: number) => { return (
                        <Apartment key={index} index={index} data={data} selectedElement={selectedElement} setSelectedElement={setSelectedElement} isSelected={selectedElement && selectedElement[2] === index} />
                    );})}
                </div>
            </div>
        </div>
    );
}

function Bloc({index, title, stairs, selectedElement, setSelectedElement}: {index: number, title: any, stairs: any[], selectedElement: any[], setSelectedElement: any}) {
    const [active, setActive] = useState(false);
    const [maxHeight, setMaxHeight] = useState('100%');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (contentRef.current !== null) {
    //         setMaxHeight(`${contentRef.current.scrollHeight}px`);
    //     }
    // }, [contentRef.current ? contentRef.current.scrollHeight : null]);

    function clickHandle() {
        setSelectedElement([index, -1, -1]);
    }

    useEffect(() => {
        if (selectedElement && selectedElement[0] === index) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [selectedElement]);

    return (
        <div className="bloc" ref={titleRef}>
            <div className={`blocTitle ${active && selectedElement[1] === -1 ? 'active' : ''}`} onClick={clickHandle}>
                <h3>{title}</h3>
                <i className="ri-arrow-down-s-line" 
                // onClick={clickHandle}
                ></i>
            </div>
            
            <div className={`wrapper ${active ? 'active' : ''}`}>
                <div className={`stairs ${active ? 'active' : ''}`} ref={contentRef}>
                    {stairs.map((data: any, index: any) => { return (
                        <Stair 
                            key={index} 
                            index={index} 
                            title={data.stair} 
                            apartments={data.apartments} 
                            selectedElement={selectedElement} 
                            setSelectedElement={setSelectedElement} 
                            isSelected={selectedElement && selectedElement[1] === index} 
                        />
                    )})}
                </div>
            </div>
        </div>
    );
}

function AddElementModal({dialogRef, selectedElement, setSelectedElement}: {dialogRef: any, selectedElement: any, setSelectedElement: any}) {
    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.addEventListener("click", (event: any) => {
                if (event.target === dialog) {
                    dialog.classList.add("isClosing");
                    dialog.addEventListener("webkitAnimationEnd", function handleAnimationEnd() {
                        dialog.classList.remove("isClosing");
                        dialog.close();
                        dialog.removeEventListener("webkitAnimationEnd", handleAnimationEnd, false);
                    }, false);
                }
            });
        }
    }, [dialogRef]);
    
    function AddElement() {
        if (selectedElement[0] === -1) {
            return (
                <div className="addElement">
                    <h1>Adaugă bloc</h1>

                    <form>
                        <input type="text" placeholder="Bloc" />
                        <button type="submit">Adaugă</button>
                    </form>

                    <button onClick={() => dialogRef.current?.close()}>Închide</button>
                </div>
            );
        } else if (selectedElement[1] === -1) {
            return (
                <div className="addElement">
                    <h1>Adaugă scară</h1>
                    <button onClick={() => dialogRef.current?.close()}>Închide</button>
                </div>
            );
        } else if (selectedElement[2] === -1) {
            return (
                <div className="addElement">
                    <h1>Adaugă apartament</h1>
                    <button onClick={() => dialogRef.current?.close()}>Închide</button>
                </div>
            );
        } else {
            return (
                <div className="addElement">
                    <h1>Adaugă element</h1>
                    <button onClick={() => dialogRef.current?.close()}>Închide</button>
                </div>
            );
        }
    }

    return (
        <dialog className="addElementModal" ref={dialogRef}>
            <AddElement />
        </dialog>
    );
}

function CreateAssociation() {
    const [dataStructure, setDataStructure] = useState(DataStructure);
    const [selectedElement, setSelectedElement] = useState([-1, -1, -1]);
    const dialogRef = useRef<HTMLDialogElement>(null);

    function addClickHandle() {
        dialogRef.current?.showModal();
    }

    return (
        <div className="createAssociation">
            <div className="subsectionContent">
                <div className="subsectionTitle">
                    <h2 onClick={() => setSelectedElement([-1, -1, -1])}>Blocuri</h2>
                    <i className="ri-add-line" onClick={addClickHandle}></i>
                    <AddElementModal dialogRef={dialogRef} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
                </div>

                <div className="blocuri">
                    <div className="contentDiv">
                        { dataStructure.map((bloc: any, index: any) => { return (
                            <Bloc key={index} index={index} title={bloc.block} stairs={bloc.stairs} selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
                        );})}
                    </div>
                </div>
            </div>

            <DetailsFrame selectedElement={selectedElement} />

            {/* <div className="detailsSection">
                <div className="subsectionTitle">
                    <h2>
                        {selectedElement[0] + " " + selectedElement[1] + " " + selectedElement[2]}
                    </h2>
                </div>
            </div> */}
        </div>
    );
}

function HomeAdmin({currentAddress}: {currentAddress: string}) {
    if (true) { // TODO: verifica daca administratia nu a fost creata
        // const dialogRef = useRef<HTMLDialogElement>(null);
        const [isClicked, setIsClicked] = useState(true);

        if (isClicked) {
            return (
                <div className="homeAdmin">
                    <CreateAssociation />
                </div>
            );
        }

        return (
            <div className="homeAdmin">
                <div className="create">
                    {/* <CreateAssociation dialogRef={dialogRef} /> */}
                    <h2>Administrația nu a fost creată</h2>
                    {/* <button onClick={() => dialogRef.current?.showModal()}>Creează</button> */}
                    <button onClick={() => setIsClicked(true)}>Creează</button>
                </div>
            </div>
        );
    }

    return (
        <div className="homeAdmin">
            <h1>Home admin</h1>
        </div>
    );
}

export default HomeAdmin;
