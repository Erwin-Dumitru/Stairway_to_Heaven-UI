import { useEffect, useState } from 'react';
import DataStructure from '@/data/dataStructure.json';
import './Expenses.scss';

function Name({name, setName}: {name: string, setName: (name: string) => void}) {
    return (
        <div className="element">
            <input
                className="inputElement"
                type="text"
                key="Name"
                placeholder="Denumire"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
    );
}

function Kind({kind, setKind}: {kind: number, setKind: (kind: number) => void}) {
    const kinds = ["Contorizat", "Distribuit", "Fix"];
    const [selectedKind, setSelectedKind] = useState(kinds[kind]);

    return (
        <div className="element">
            {/* <input
                className="inputElement"
                type="text"
                key="Kind"
                placeholder="Tip"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
            /> */}

            <select
                className="inputElement"
                key="Kind"

            >
                {kinds.map((k) => (
                    <option key={k} value={k}>
                        {k}
                    </option>
                ))}
            </select>
        </div>
    );
}

function Division({division, setDivision}: {division: number, setDivision: (division: number) => void}) {
    const divisionElements = ["Apartament", "Persoană", "m²", "kWh", "m³"]; // ² ³
    return (
        <div className="element">
            <select
                className="inputElement"
                key="Division"
                value={divisionElements[division]}
                onChange={(e) => setDivision(divisionElements.indexOf(e.target.value))}
            >
                {divisionElements.map((element) => (
                    <option key={element} value={element}>
                        {element}
                    </option>
                ))}
            </select>
        </div>
    );
}

function Price({price, setPrice}: {price: number, setPrice: (price: number) => void}) {

    return (
        <div className="element">
            <input
                className="inputElement"
                type="number"
                key="Price"
                placeholder="Preț"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
        </div>
    );
}

function Rows({cheltuieli, setCheltuieli}: {cheltuieli: any, setCheltuieli: (cheltuieli: any) => void}) {
    function clickHandler(index: number) {
        setCheltuieli((prevCheltuieli: any) => prevCheltuieli.filter((_: any, i: number) => i !== index));
    }

    let isPair = cheltuieli.length % 2 === 0;

    return (
        <div>
            {cheltuieli.map((cheltuiala: any, index: number) => (
                // <div className={`cheltuiala ${(index + (isPair ? 1 : 0)) % 2 === 0 ? "colored" : ""}`} key={index}>
                <div className={`cheltuiala ${index % 2 === 0 ? "" : "colored"}`} key={index}>
                    <Name name={cheltuiala.name} setName={(name) => {
                        setCheltuieli((prevCheltuieli: any) => 
                            prevCheltuieli.map((cheltuiala: any, i: number) => {
                                if (i === index) {
                                    return {
                                        name: name,
                                        kind: cheltuiala.kind,
                                        division: cheltuiala.division,
                                        price: cheltuiala.price
                                    };
                                } else {
                                    return cheltuiala;
                                }
                            })
                        );

                    }} />

                    <Kind kind={cheltuiala.kind} setKind={(kind) => {
                        setCheltuieli((prevCheltuieli: any) =>
                            prevCheltuieli.map((cheltuiala: any, i: number) => {
                                if (i === index) {
                                    return {
                                        name: cheltuiala.name,
                                        kind: kind,
                                        division: cheltuiala.division,
                                        price: cheltuiala.price
                                    };
                                } else {
                                    return cheltuiala;
                                }
                            })
                        );
                    }} />

                    <Division division={cheltuiala.division} setDivision={(division) => {
                        setCheltuieli((prevCheltuieli: any) =>
                            prevCheltuieli.map((cheltuiala: any, i: number) => {
                                if (i === index) {
                                    return {
                                        name: cheltuiala.name,
                                        kind: cheltuiala.kind,
                                        division: division,
                                        price: cheltuiala.price
                                    };
                                } else {
                                    return cheltuiala;
                                }
                            })
                        );
                    }} />
                    
                    <Price price={cheltuiala.price} setPrice={(price) => {
                        setCheltuieli((prevCheltuieli: any) =>
                            prevCheltuieli.map((cheltuiala: any, i: number) => {
                                if (i === index) {
                                    return {
                                        name: cheltuiala.name,
                                        kind: cheltuiala.kind,
                                        division: cheltuiala.division,
                                        price: price
                                    };
                                } else {
                                    return cheltuiala;
                                }
                            })
                        );
                    }} />
                    
                    <button onClick={() => clickHandler(index)}>
                        <div className="icon">
                            <i className="ri-delete-bin-line"></i>
                        </div>
                    </button>
                </div>
            ))}
        </div>
    );
}

function Expenses() {
    const [cheltuieli, setCheltuieli] = useState([
        {
            name: "Apă rece",
            kind: 0,
            division: 5,
            price: 0
        },
        {
            name: "Apă caldă",
            kind: 0,
            division: 5,
            price: 0
        },
        {
            name: "Încălzire",
            kind: 0,
            division: 3,
            price: 0
        },
        {
            name: "Gaz",
            kind: 0,
            division: 4,
            price: 0
        },
        {
            name: "Electricitate",
            kind: 0,
            division: 4,
            price: 0
        },
        {
            name: "Salubritate",
            kind: 0,
            division: 4,
            price: 0
        },
        {
            name: "Întreținere",
            kind: 0,
            division: 4,
            price: 0
        }
    ]);

    function clickHandler() {
        setCheltuieli([...cheltuieli, {
            name: "",
            kind: 0,
            division: 0,
            price: 0
        }]);
    }

    return (
        <div className="listaCheltuieli">
            <h4>Cheltuieli</h4>

            <div className="cheltuieli">
                <div className="cheltuiala headerCheltuilei">
                    <div className="element">
                        <h6>Denumire</h6>
                    </div>
                    <div className="element">
                        <h6>Tip</h6>
                    </div>
                    <div className="element">
                        <h6>Împărțire</h6>
                    </div>
                    <div className="element">
                        <h6>Preț</h6>
                    </div>

                    <button onClick={clickHandler}>
                        <div className="icon">
                            <i className="ri-add-line"></i>
                        </div>
                    </button>
                </div>

                <Rows cheltuieli={cheltuieli} setCheltuieli={setCheltuieli} />
            </div>
        </div>
    );
}

export default Expenses;
