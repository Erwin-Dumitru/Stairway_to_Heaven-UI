import { useState } from 'react';
import AdminList from './adminList/AdminList';

interface Props {
    openAddress: boolean;
    setOpenAddress: any;
    addressContext: any;
}

export default function AdressList({openAddress, setOpenAddress, addressContext}: Props) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [administration, setAdministration] = useState<any>();
    const [adminData, setAdminData] = useState<Association[] | undefined>();

    if (!addressContext) return null;

    function clientClick(address: (Apartment | Administration)) {
        // if (window.location.pathname !== '/dashboard') {
        //     window.location.href = '/dashboard';
        // }
        
        addressContext.setCurrentAddress({
            id: address.id,
            name: address.name,
            type: "client"
        });
        setOpenAddress(false);
    }

    function adminClick(address: (Apartment | Administration)) {
        setIsAdmin(true);
        setAdministration({
            id: address.id,
            name: address.name
        });
        setAdminData((address as Administration).associations);
    }

    return (
        <div className={`dropdown ${openAddress ? 'active' : ''}`}>
            <div className="dropdownWrapper">
                <div className={`addressList ${isAdmin ? '' : 'active'} ${openAddress ? 'open' : ''}`}>
                    <div className="addressListScroll">
                    { addressContext && addressContext.addresses && addressContext.addresses.map((address: (Apartment | Administration), index: number) => {
                            let isAdministration = (address as Administration).associations;

                            return (
                                <div key={index} className={`addressElement ${address.notifications ? 'notify' : ''}`} onClick={() => {
                                        isAdministration ? adminClick(address) : clientClick(address);
                                    }}>
                                    { address.name }
                                    { isAdministration ? <i className="ri-arrow-right-s-line"></i> : null}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <AdminList
                    active={isAdmin}
                    setIsAdmin={setIsAdmin}
                    openAddress={openAddress}
                    setOpenAddress={setOpenAddress}
                    administration={administration}
                    setCurrentAddress={addressContext.setCurrentAddress}
                    adminData={adminData}
                />
            </div>
        </div>
    );
}
