import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Bar.scss";
// import { AddressContextType } from "@/components/Interfaces";
import { AddressContext } from "@/components/Context";

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
                        <div className="currentAddress" onClick={() => { setOpenAddress(!openAddress); }}>
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
    if (!props.addressContext) return null;

    function clientClick(address: any) {
        props.addressContext.setCurrentAddress(address);
        props.setOpenAddress(false);
    }

    function adminClick() {
        props.addressContext.setCurrentAddress(props.addressContext.addresses[1]);
        props.setOpenAddress(false);
    }

    return (
        <div className={`wrapper1 ${props.openAddress ? 'active' : ''}`}>
            <div className="addressList">
                { props.addressContext.addresses.map((address: any, index: number) => (
                    <div key={index} className="address" onClick={() => {
                            address.type === 'client' ? clientClick(address) : adminClick();
                        }}>
                            
                        <div className="addressName">
                            { address.name }
                            <span>{ address.type }</span>
                        </div>

                        { address.type === 'admin' ? <i className="ri-arrow-right-s-line"></i> : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

function AdminList(props: any) {
    return (
        <div className="adminList">

        </div>
    );
}
