import "./styles/HomeAdmin.css"
import "./styles/CreateAssociation.css"
import { useState, useEffect, useRef } from "react";
import DataStructure from "../../../data/dataStructure.json";
// import CreateAssociation from "./CreateAssociation";

function Apartment({data}: {data: any}) {
    const [active, setActive] = useState(true);

    function clickHandle() {
        setActive(!active);
    }

    return (
        <div className="apartment">
            <div className="apartmentTitle">
                <h3>{data.apartment}</h3>
                {/* <i className="ri-add-line"></i> */}
            </div>
        </div>
    );
}

function Stair({title, apartments}: {title: any, apartments: any[]}) {
    const [active, setActive] = useState(true);
    const [maxHeight, setMaxHeight] = useState('1000px');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current !== null) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, []);

    function clickHandle() {
        setActive(!active);
    }

    return (
        <div className="stair">
            <div className="stairTitle">
                <h3>{title}</h3>
                <i className="ri-arrow-down-s-line" onClick={clickHandle}></i>
            </div>
            

            <div className={`wrapper ${active ? 'active' : ''}`}>
                <div className="apartments">
                    { apartments.map((data: any, index: number) => { return (
                        <Apartment key={index} data={data} />
                    );})}
                </div>
            </div>
        </div>
    );
}

function Bloc({title, stairs}: {title: any, stairs: any[]}) {
    const [active, setActive] = useState(true);
    const [maxHeight, setMaxHeight] = useState('100%');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (contentRef.current !== null) {
    //         setMaxHeight(`${contentRef.current.scrollHeight}px`);
    //     }
    // }, [contentRef.current ? contentRef.current.scrollHeight : null]);

    function clickHandle() {
        setActive(!active);
    }

    return (
        <div className="bloc" ref={titleRef}>
            <div className="blocTitle">
                <h3>{title}</h3>
                <i className="ri-arrow-down-s-line" onClick={clickHandle}></i>
            </div>
            
            <div className={`wrapper ${active ? 'active' : ''}`}>
                <div className={`stairs ${active ? 'active' : ''}`} ref={contentRef}>
                    {stairs.map((data: any, index: any) => { return (
                        <Stair key={index} title={data.stair} apartments={data.apartments} />
                    )})}
                </div>
            </div>
        </div>
    );
}

function CreateAssociation() {
    var dataStructure: typeof DataStructure = DataStructure;

    return (
        <div className="createAssociation">
            <div className="subsectionContent">
                <div className="subsectionTitle">
                    <h2>Blocuri</h2>
                    <i className="ri-add-line"></i>
                </div>

                <div className="blocuri">
                    <div className="contentDiv">
                        { dataStructure.map((bloc: any, index: any) => { return (
                            <Bloc key={index} title={bloc.block} stairs={bloc.stairs} />
                        );})}
                    </div>
                </div>
            </div>

            <div className="apartamente">
                <div className="subsectionTitle">
                    <h2>
                        Apartamente
                    </h2>
                </div>
            </div>
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
