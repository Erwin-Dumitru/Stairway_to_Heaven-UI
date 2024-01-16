import "./styles/HomeAdmin.css"
import "./styles/CreateAssociation.css"
import { useState, useRef } from "react";
import DataStructure from "../data/dataStructure.json";
// import CreateAssociation from "./CreateAssociation";

function Stair({stair}: {stair: any}) {
    const [active, setActive] = useState(false);
    const [maxHeight, setMaxHeight] = useState('0px');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    function renderApartments() {
        return (
            <div className={`apartments ${active ? '' : 'inactive'}`} style={{maxHeight: active ? maxHeight : '0px'}} ref={contentRef}>
                {stair.apartamente.map((apartment: any, index: number) => {
                    return (
                        <div className="apartment" key={index}>
                            <div className="apartmentTitle">
                                <h3>{apartment.name}</h3>
                                {/* <i className="ri-add-line"></i> */}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    function clickHandle() {
        setActive(!active);
    }

    return (
        <div className="stair" ref={titleRef}>
            <div className="stairTitle" onClick={clickHandle}>
                <h3>{stair.name}</h3>
                <i className="ri-arrow-down-s-line"></i>
            </div>
            {renderApartments()}
        </div>
    );
}

function Bloc({bloc}: {bloc: any}) {
    const [active, setActive] = useState(false);
    const [maxHeight, setMaxHeight] = useState('0px');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    function renderScari() {
        return (
            <div className={`scari ${active ? '' : 'inactive'}`} style={{maxHeight: active ? maxHeight : '0px'}} ref={contentRef}>
                {bloc.scari.map((scara: any, index: number) => {
                    return (
                        <div>
                            <h1>Scara</h1>
                        </div>
                        // <Stair key={index} stair={scara} />
                    );
                })}
            </div>
        );
    }

    function clickHandle() {
        setActive(!active);
    }

    return (
        <div className="bloc" ref={titleRef}>
            <div className="blocTitle" onClick={clickHandle}>
                <h3>{bloc.name}</h3>
                <i className="ri-arrow-down-s-line"></i>
            </div>
            {renderScari()}
        </div>
    );
}

function Blocuri() {
    var dataStructure: typeof DataStructure = DataStructure;
    console.log(dataStructure);

    return (
        <div className="blocuri">
            <div className="contentDiv">
            {dataStructure.map((bloc, index) => {
                return (
                    <Bloc key={index} bloc={bloc} />
                );
            })}
            </div>
        </div>
    );

    return (
        <div className="blocuri">
            <div className="contentDiv">
            <div className="bloc">
                <div className="blocTitle">
                    <h3>Bloc 1</h3>
                    <i className="ri-add-line"></i>
                </div>

                {/* <div className="stairs" style={{maxHeight: '0px'}}> */}
                <div className="stairs">
                    <div className="stair">
                        <div className="stairTitle">
                            <h3>Scara 1</h3>
                            <i className="ri-add-line"></i>
                        </div>

                        <div className="apartments">
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 1</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 2</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 3</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stair">
                        <div className="stairTitle">
                            <h3>Scara 2</h3>
                            <i className="ri-add-line"></i>
                        </div>

                        <div className="apartments">
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 1</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 2</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 3</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stair">
                        <div className="stairTitle">
                            <h3>Scara 3</h3>
                            <i className="ri-add-line"></i>
                        </div>

                        <div className="apartments">
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 1</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 2</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 3</h3>
                                    {/* <i className="ri-add-line"></i> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bloc">
                <div className="blocTitle">
                    <h3>Bloc 1</h3>
                    <i className="ri-add-line"></i>
                </div>

                {/* <div className="stairs" style={{maxHeight: '0px'}}> */}
                <div className="stairs">
                    <div className="stair">
                        <div className="stairTitle">
                            <h3>Scara 1</h3>
                            <i className="ri-add-line"></i>
                        </div>

                        <div className="apartments">
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 1</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 2</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 3</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stair">
                        <div className="stairTitle">
                            <h3>Scara 2</h3>
                            <i className="ri-add-line"></i>
                        </div>

                        <div className="apartments">
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 1</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 2</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 3</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stair">
                        <div className="stairTitle">
                            <h3>Scara 3</h3>
                            <i className="ri-add-line"></i>
                        </div>

                        <div className="apartments">
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 1</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 2</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                            <div className="apartment">
                                <div className="apartmentTitle">
                                    <h3>Apartament 3</h3>
                                    <i className="ri-add-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

function CreateAssociation() {
    return (
        <div className="createAssociation">
            <div className="subsectionContent">
                <div className="subsectionTitle">
                    <h2>Blocuri</h2>
                    <i className="ri-add-line"></i>
                </div>
                <Blocuri />
            </div>
            <div className="apartamente">
                <div className="subsectionTitle">
                    <h2></h2>
                </div>
            </div>
        </div>
    );
}

function HomeAdmin({currentAddress}: {currentAddress: string}) {
    if (true) { // TODO: verifica daca administratia nu a fost creata
        const dialogRef = useRef<HTMLDialogElement>(null);
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
