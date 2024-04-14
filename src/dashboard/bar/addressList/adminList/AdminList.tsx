import { useEffect, useState } from 'react';
import removeAccents from 'remove-accents';

interface Props {
    active: boolean;
    setIsAdmin: any;
    openAddress: boolean;
    setOpenAddress: any;
    administration: {id: string, name: string} | undefined;
    setCurrentAddress: any;
    adminData: Association[] | undefined;
}

export default function AdminList({active, setIsAdmin, openAddress, setOpenAddress, administration, setCurrentAddress, adminData}: Props) {
    const [shownData, setShownData] = useState<Association[] | undefined>(adminData);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!adminData) return;

        setShownData(adminData.filter((address: Association) => {
            let searchArray = removeAccents(search.toLowerCase()).split(' ');
            let nameArray = removeAccents(address.name.toLowerCase()).split(' ');
            let cityArray = removeAccents(address.city.toLowerCase()).split(' ');
            let countyArray = removeAccents(address.county.toLowerCase()).split(' ');

            return searchArray.every((word: string) => {
                return nameArray.some((nameWord: string) => {
                    return nameWord.includes(word);
                }) || cityArray.some((cityWord: string) => {
                    return cityWord.includes(word);
                }) || countyArray.some((countyWord: string) => {
                    return countyWord.includes(word);
                }) || address.countyCode.toLowerCase().includes(word);
            });
        }));
    }, [search, adminData]);

    return (
        <div className={`adminList ${active ? 'active' : ''} ${openAddress ? 'open' : ''}`}>
            <div className="title">
                <div className="backButton" onClick={() => { setIsAdmin(false); }}>
                    <i className="ri-arrow-left-s-line"></i>
                </div>
                
                <div className="addressElement" onClick={() => {
                    setCurrentAddress({
                        id: administration ? administration.id : '',
                        name: administration ? administration.name : '',
                        type: "admin"
                    });
                    setOpenAddress(false);
                }}>
                    { administration ? administration.name : '' }
                </div>
            </div>

            <div className="search">
                <input
                    type="text"
                    placeholder="Caută"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); }}
                />
                <i className="ri-search-line"></i>
            </div>

            <div className="addressListScroll">
                { shownData && shownData?.length > 0 && shownData.map((address: Association, index: number) => (
                    <div key={index} 
                        className={`addressElement 
                            ${address.notifications ? 'notify' : ''} 
                            ${address.done ? 'green' : ''}`
                        }
                        onClick={ () => { // Set the current association
                            setCurrentAddress({
                                parent: administration?.id,
                                id: address.id,
                                name: address.name,
                                type: "association"
                            });
                            setOpenAddress(false);
                        }
                    }>
                        <div className="addressName">
                            { address.name }
                            <span>{ address.countyCode } - { address.city }</span>
                        </div>
                    </div>
                )) || <div className="noAssociations">Nu există asociații</div>}
            </div>
        </div>
    );
}
