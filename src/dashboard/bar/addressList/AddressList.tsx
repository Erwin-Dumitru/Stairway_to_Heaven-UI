import { useState } from 'react';
import { Address, association } from '@/components/Interfaces';
import AdminList from './adminList/AdminList';

export default function AdressList(props: any) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [administration, setAdministration] = useState<any>('');
    const [adminData, setAdminData] = useState<association[] | undefined>();

    if (!props.addressContext) return null;

    function clientClick(address: Address) {
        props.addressContext.setCurrentAddress({
            name: address.name,
            type: "client"
        });
        props.setOpenAddress(false);
    }

    function adminClick(address: Address) {
        setIsAdmin(true);
        setAdministration(address.name);
        setAdminData(address.administrations);
    }

    return (
        <div className={`dropdown ${props.openAddress ? 'active' : ''}`}>
            <div className="dropdownWrapper">
                <div className={`addressList ${isAdmin ? '' : 'active'} ${props.openAddress ? 'open' : ''}`}>
                    <div className="addressListScroll">
                        { props.addressContext.addresses.map((address: Address, index: number) => (
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
                    openAddress={props.openAddress}
                    setOpenAddress={props.setOpenAddress}
                    administration={administration}
                    setCurrentAddress={props.addressContext.setCurrentAddress}
                    adminData={adminData}
                />
            </div>
        </div>
    );
}
