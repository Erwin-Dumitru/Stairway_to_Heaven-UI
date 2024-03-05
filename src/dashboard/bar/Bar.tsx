import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Bar.scss";
import { AddressContextType } from "@/components/Interfaces";
import { AddressContext } from "@/components/Context";

function Bar() {
    const [maxHeight, setMaxHeight] = useState('0px');
    const [openAdress, setOpenAdress] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (contentRef.current !== null) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, []);

    function RenderAdresses(addressContext: AddressContextType | undefined) {
        if (!addressContext) return null;

        let addressesList = [];
        for (let i = 0; i < addressContext.addresses.length; i++) {
            addressesList.push(
                <div key={i}>
                    <div className="address" onClick={ () => {
                        addressContext.setCurrentAddress(addressContext.addresses[i]); 
                        setOpenAdress(false);
                    }}>
                        { addressContext.addresses[i].name }
                        <span>{ addressContext.addresses[i].type }</span>
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

    const location = useLocation();

    let title;
    switch (location.pathname) {
        case '/dashboard':
            title = 'Home';
            break;
        case '/dashboard/history':
            title = 'History';
            break;
        case '/dashboard/chat':
            title = 'Chat';
            break;
        case '/dashboard/settings':
            title = 'Settings';
            break;
        default:
            title = '';
    }

    return (
        <div className="bar">
            <h1 id="barTitle">
                {title}
            </h1>
            
            <AddressContext.Consumer>
                {(context) => (
                    <div className="addressSelector" ref={addressRef}>
                        <div className="currentAddress" onClick={() => { setOpenAdress(!openAdress); }}>
                            { context ? context.currentAddress.name : '' }
                            <i className="ri-arrow-down-s-line"></i>
                        </div>

                        { RenderAdresses(context) }
                    </div>
                )}
            </AddressContext.Consumer>

            <div className="notifications">
                <i className="ri-notification-3-line"></i>
            </div>

            <Link to="/" className="imgNav" id="profileImg">
                <img src="/src/assets/User-2.svg" alt="Bloc Logo" />
            </Link>
        </div>
    );
}

export default Bar;
