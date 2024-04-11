import { useState } from 'react';
import { Address, Association } from '@/components/Interfaces';
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

    function clientClick(address: Address) {
        addressContext.setCurrentAddress({
            id: address.id,
            name: address.name,
            type: "client"
        });
        setOpenAddress(false);
    }

    function adminClick(address: Address) {
        setIsAdmin(true);
        setAdministration({
            id: address.id,
            name: address.name
        });
        setAdminData(address.administrations);
    }

    return (
        <div className={`dropdown ${openAddress ? 'active' : ''}`}>
            <div className="dropdownWrapper">
                <div className={`addressList ${isAdmin ? '' : 'active'} ${openAddress ? 'open' : ''}`}>
                    <div className="addressListScroll">
                        { addressContext.addresses.map((address: Address, index: number) => (
                            <div key={index} className={`addressElement ${address.notifications ? 'notify' : ''}`} onClick={() => {
                                    address.administrations ? adminClick(address) : clientClick(address);
                                }}>
                                { address.name }
                                { address.administrations ? <i className="ri-arrow-right-s-line"></i> : null}
                            </div>
                        ))}
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
