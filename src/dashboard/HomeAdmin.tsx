import "./styles/HomeAdmin.css"
import "./styles/CreateAssociation.css"
import { useState, useRef } from "react";
import DataStructure from "../data/dataStructure.json";
// import CreateAssociation from "./CreateAssociation";

function Apartments({apartments}: {apartments: any}) {
    const [active, setActive] = useState(true);
    const [maxHeight, setMaxHeight] = useState('1000px');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    function clickHandle() {
        setActive(!active);
    }

    return (
        <div className="apartments inactive" style={{maxHeight: active ? maxHeight : '0px'}} ref={contentRef}>
            {
                apartments.map((data: any, index: number) => {
                    return (
                        <div className="apartment" key={index}>
                            <div className="apartmentTitle">
                                <h3>{data.apartment}</h3>
                                {/* <i className="ri-add-line"></i> */}
                            </div>
                        </div>
                    );
                })
            }
        </div>
                
    );
}

function Stairs({title, apartments}: {title: any, apartments: any[]}) {
    const [active, setActive] = useState(true);
    const [maxHeight, setMaxHeight] = useState('1000px');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    function clickHandle() {
        setActive(!active);
    }

    return (
        <div className="stairs inactive" style={{maxHeight: active ? maxHeight : '0px'}} ref={contentRef}>
            <div className="stair">
                <div className="stairTitle" onClick={clickHandle}>
                    <h3>{title}</h3>
                    <i className="ri-add-line"></i>
                </div>

                <Apartments apartments={apartments} />
            </div>
        </div>
    );
}

function Bloc({title, stairs}: {title: any, stairs: any[]}) {
    const [active, setActive] = useState(true);
    const [maxHeight, setMaxHeight] = useState('1000px');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    function renderScari() {
        return (
            <div className={`stairs ${active ? '' : 'inactive'}`} style={{maxHeight: active ? maxHeight : '0px'}} ref={contentRef}>
                {stairs.map((data: any, index: any) => {
                    return (
                        <div className="stair">
                            <div className="stairTitle">
                                <h3>{data.stair}</h3>
                                <i className="ri-arrow-down-s-line"></i>
                            </div>
                            <Apartments key={index} apartments={data.apartments} />
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
        <div className="bloc" ref={titleRef}>
            <div className="blocTitle" onClick={clickHandle}>
                <h3>{title}</h3>
                <i className="ri-arrow-down-s-line"></i>
            </div>
            
            {
                // stairs.map((data: any, index: number) => {
                //     return (
                //         <Stairs key={index} title={data.stair} apartments={data.apartments} />
                //     );
                // })

                renderScari()
            }
        </div>
    );
}

function Blocuri() {
    var dataStructure: typeof DataStructure = DataStructure;
    console.log(dataStructure);

    return (
        <div className="blocuri">
            <div className="contentDiv">
            {dataStructure.map((bloc: any, index: any) => {
                return (
                    <Bloc key={index} title={bloc.block} stairs={bloc.stairs} />
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
