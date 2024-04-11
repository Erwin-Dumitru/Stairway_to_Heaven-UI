import { useEffect, useState } from 'react';
import './AssociationsDetails.scss';

export default function AssociationsDetails() {
    const data = [
        {
            id: 1,
            name: 'Cerna 18',
            county: "Timiș",
            countyCode: "TM",
            city: "Timișoara",
            done: true,
            apartments: 10,
            paid: 1000,
            debts: 200
        },
        {
            id: 2,
            name: 'Bradul 4',
            county: "Timiș",
            countyCode: "TM",
            city: "Timișoara",
            done: false,
            apartments: 20,
            paid: 200,
            debts: 700
        }
    ];

    const [associations, setAssociations] = useState(data);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setAssociations(data.filter(association => association.name.toLowerCase().includes(search.toLowerCase())));
    }, [search]);

    return (
        <div className="associations-details">
                <div className="top">
                <div className="search">
                    <i className="ri-search-line"></i>
                    <input type="text" placeholder="Caută" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="button">
                    <i className="ri-equalizer-2-line"></i>
                </div>
            </div>

            <div className="collumns">
                <span>Asociație</span>
                <span>Achitat</span>
                <span>Restanțe</span>
                <span>Total</span>
            </div>

            <div className="association-list">
                {associations.map((association, index) => {
                    return (
                        <div className="association" key={index}>
                            <h3 className={association.done ? 'green' : ''}>
                                {association.name}
                            </h3>
                            
                            <h3>
                                {association.paid.toFixed(2)}
                            </h3>
                            
                            <h3 className='red'>
                                {association.debts.toFixed(2)}
                            </h3>
                            
                            <h3>
                                {(association.paid + association.debts).toFixed(2)}
                            </h3>
                            
                            <i className="ri-arrow-right-line"></i>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
