import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AddressContext } from "@/components/Context";
import AdressList from "./addressList/AddressList";
import userProfile from "@/assets/User-2.svg";
import "./Bar.scss";

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

    // Update the title based on the current location
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
                            { context ? (context.currentAddress ? context.currentAddress.name : '') : '' }
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
                <img src={userProfile} alt="User Profile" />
            </Link>
        </div>
    );
}
