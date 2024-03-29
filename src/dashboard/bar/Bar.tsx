import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Bar.scss";
// import { AddressContextType } from "@/components/Interfaces";
import { AddressContext } from "@/components/Context";
import adminData from "@/data/administration.json";

export default function Bar() {
    const [openAddress, setOpenAddress] = useState(false);

    let addressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (event: any) => {
            if (addressRef.current && !addressRef.current.contains(event.target)) {
                setOpenAddress(false);
            }
        }

        document.body.addEventListener("click", handler);

        return () => {
            document.body.removeEventListener("click", handler);
        }
    }, []);

    const location = useLocation().pathname;
    let title;
    switch (location) {
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
                        <div className="1currentAddress addressElement" onClick={() => { setOpenAddress(!openAddress); }}>
                            { context ? context.currentAddress.name : '' }
                            <i className="ri-arrow-down-s-line"></i>
                        </div>
            
                        <AdressList addressContext={context || null} setOpenAddress={setOpenAddress} openAddress={openAddress} />
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

function AdressList(props: any) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [administration, setAdministration] = useState<any>('');

    if (!props.addressContext) return null;

    function clientClick(address: any) {
        props.addressContext.setCurrentAddress(address);
        props.setOpenAddress(false);
    }

    function adminClick(address: any) {
        setIsAdmin(true);
        setAdministration(address.name);
    }

    return (
        <div className={`dropdown ${props.openAddress ? 'active' : ''}`}>
            <div className="dropdownWrapper">
                <div className={`addressList ${isAdmin ? '' : 'active'}`}>
                    <div className="addressListScroll">
                        { props.addressContext.addresses.map((address: any, index: number) => (
                            <div key={index} className={`addressElement ${address.type === 'admin' ? 'notify' : ''}`} onClick={() => {
                                    address.type === 'client' ? clientClick(address) : adminClick(address);
                                }}>
                                { address.name }
                                { address.type === 'admin' ? <i className="ri-arrow-right-s-line"></i> : null}
                            </div>
                        ))}
                    </div>
                </div>

                <AdminList active={isAdmin} setIsAdmin={setIsAdmin} administration={administration} />
            </div>
        </div>
    );
}

function AdminList(props: any) {
    return (
        <div className={`adminList ${props.active ? 'active' : ''}`}>
            <div className="title">
                <div className="backButton" onClick={() => { props.setIsAdmin(false); }}>
                    <i className="ri-arrow-left-s-line"></i>
                </div>
                <div className="addressElement">
                    { props.administration }
                </div>
            </div>

            <div className="search">
                <input type="text" placeholder="Caută" />
                <i className="ri-search-line"></i>
            </div>

            <div className="addressListScroll">
                { adminData.map((address: any, index: number) => (
                    <div key={index} className={
                        `addressElement 
                        ${address.notifications ? 'notify' : ''} 
                        ${address.done ? 'green' : ''}`
                    }>
                        { address.name }
                    </div>
                ))}
            </div>
        </div>
    );
}
