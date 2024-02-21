// import React from "react"; 
import { useState, useEffect, useRef } from "react";
import "./styles/Bar.css";

function Bar({addresses, currentAddress, setCurrentAddress}: {addresses: string[], currentAddress: string, setCurrentAddress: Function}) {
    const [maxHeight, setMaxHeight] = useState('0px');
    const [openAdress, setOpenAdress] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    
    
    useEffect(() => {
        if (contentRef.current !== null) {
            // set the max height of the address list to the height of the address multiplied by the number of addresses
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, []);

    // a function that recive the adresses list and return a list of divs with the adresses
    function renderAdresses() {
        let addressesList = [];
        for (let i = 0; i < addresses.length; i++) {
            addressesList.push(
                <div key={i}>
                <div className="address" onClick={ () => { setCurrentAddress(addresses[i]); setOpenAdress(false); }}>
                    { addresses[i] }
                </div>
                </div>
            );
        }

        return (
            <div className={`addressList ${openAdress? '' : 'inactive'}`} style={{maxHeight: openAdress ? maxHeight : '0px'}} ref={contentRef}>
                {addressesList}
            </div>
        );
    }

    let addressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (event: any) => {
            if (addressRef.current && !addressRef.current.contains(event.target)) {
                setOpenAdress(false);
            }
        }

        document.body.addEventListener("click", handler);

        return () => {
            document.body.removeEventListener("click", handler);
        }
    }, []);

    return (
        <div className="bar">
            <h1 id="barTitle">Home</h1>
            
            <div className="addressSelector" ref={addressRef}>
                <div className="currentAddress" onClick={() => { setOpenAdress(!openAdress); }}>
                    {currentAddress} <i className="ri-arrow-down-s-line"></i>
                </div>
                {renderAdresses()}
            </div>

            <div className="notifications">
                <i className="ri-notification-3-line"></i>
            </div>
            
            <a href="/" className="imgNav" id="profileImg">
                <img src="../assets/User-2.svg" alt="Bloc Logo" />
            </a>
        </div>
    );
}

export default Bar;
