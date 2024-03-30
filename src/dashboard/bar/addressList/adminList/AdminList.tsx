import { useEffect, useState } from 'react';
import { association } from '@/components/Interfaces';
import removeAccents from 'remove-accents';

export default function AdminList(props: any) {
    const [shownData, setShownData] = useState<association[] | undefined>(props.adminData);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!props.adminData) return;

        setShownData(props.adminData.filter((address: association) => {
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
    }, [search, props.adminData]);

    return (
        <div className={`adminList ${props.active ? 'active' : ''} ${props.openAddress ? 'open' : ''}`}>
            <div className="title">
                <div className="backButton" onClick={() => { props.setIsAdmin(false); }}>
                    <i className="ri-arrow-left-s-line"></i>
                </div>
                
                <div className="addressElement" onClick={() => {
                    props.setCurrentAddress({
                        name: props.administration,
                        type: "admin"
                    });
                    props.setOpenAddress(false);
                }}>
                    { props.administration }
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
                { shownData && shownData?.length > 0 && shownData.map((address: association, index: number) => (
                    <div key={index} 
                        className={`addressElement 
                            ${address.notifications ? 'notify' : ''} 
                            ${address.done ? 'green' : ''}`
                        }
                        onClick={ () => { // Set the current association
                            props.setCurrentAddress({
                                name: address.name,
                                type: "association"
                            });
                            props.setOpenAddress(false);
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
