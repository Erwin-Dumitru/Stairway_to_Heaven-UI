import { useEffect, useState } from "react";
import DataStructure from "../../data/dataStructure.json";
import "./styles/DetailsFrame.css";

function DetailsFrame({selectedElement}: {selectedElement: any[]}) {
    const [dataStructure, setDataStructure] = useState<any>();
    const [admin, setAdmin] = useState("");
    const [association, setAssociation] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [blockNumber, setBlockNumber] = useState("");
    const [stairNumber, setStairNumber] = useState("");
    const [apartmentNumber, setApartmentNumber] = useState("");
    const [penality, setPenality] = useState("");

    function setData() {
        if (selectedElement[0] !== -1 && dataStructure) {
            setAdmin(dataStructure.administrator);
            setAssociation(dataStructure.name);
            if (dataStructure.addresses[selectedElement[0]]) {
                setAddress(dataStructure.addresses[selectedElement[0]].address);
                setCity(dataStructure.addresses[selectedElement[0]].city);
                setName(dataStructure.addresses[selectedElement[0]].name);
                if (dataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]]) {
                    setBlockNumber(dataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].block);
                    if (dataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]]) {
                        setStairNumber(dataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].stair);
                        if (dataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments[selectedElement[3]]) {
                            setApartmentNumber(dataStructure.addresses[selectedElement[0]].blocks[selectedElement[1]].stairs[selectedElement[2]].apartments[selectedElement[3]].apartment);
                        }
                    }
                }
            }
        }
    }

    // useEffect(() => {
    //     Promise.resolve(setDataStructure(DataStructure))
    //         .then(() => {
    //             setData();
    //         });
    // }, [selectedElement]);

    useEffect(() => {
        setDataStructure(DataStructure);
    }, []);

    useEffect(() => {
        setData();
    }, [selectedElement, dataStructure]);

    function Details() {
        if (dataStructure === undefined) {
            return <div></div>;
        } else if (selectedElement[0] === -1) {
            return (
                <div className="details">
                    <div>
                        <h4>Admin</h4>
                        <input type="text" placeholder="Admin" value={admin} onChange={(e) => setAdmin(e.target.value)} />
                    </div>

                    <div>
                        <h4>Name</h4>
                        <input type="text" placeholder="Name" value={association} onChange={(e) => setAssociation(e.target.value)} />
                    </div>
                </div>
            );
        } else if (selectedElement[1] === -1) {
            return (
                <div className="details">
                    <div>
                        <h4>Adresă</h4>
                        <input type="text" placeholder="Adresă" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div>
                        <h4>Oraș</h4>
                        <input type="text" placeholder="Oraș" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div>
                        <h4>Nume</h4>
                        <input type="text" placeholder="Nume" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
            );
        } else if (selectedElement[2] === -1) {
            return (
                <div className="details">
                    <div>
                        <h4>Număr bloc</h4>
                        <input type="text" placeholder="Număr bloc" value={blockNumber} onChange={(e) => setBlockNumber(e.target.value)} />
                    </div>
                </div>
            );
        } else if (selectedElement[3] === -1) {
            return (
                <div className="details">
                    <div>
                        <h4>Număr scară</h4>
                        <input type="text" placeholder="Număr scară" value={stairNumber} onChange={(e) => setStairNumber(e.target.value)} />
                    </div>

                    <div>
                        <h4>Penalizări</h4>
                        <input type="decimal" placeholder="Penalități" value={penality} onChange={(e) => {
                            if (e.target.value.match(/^[0-9]*$/)) {
                                setPenality(e.target.value);
                            }
                        }} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="details">
                    <div>
                        <h4>Număr apartament</h4>
                        <input type="text" placeholder="Număr apartament" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} />
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="detailsFrame">
            <Details />
        </div>
    );
}

export default DetailsFrame;
