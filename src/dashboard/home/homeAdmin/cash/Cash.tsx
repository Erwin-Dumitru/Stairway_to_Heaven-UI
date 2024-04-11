import { useEffect, useRef, useState } from 'react';
import { SmallModal } from '@/components/modal/Modal';
import CashModal from './cashModal/CashModal';
import './Cash.scss';

export default function Cash() {
    const data = [
        {
            name: 'Popescu Ion',
            value: 1843.31,
        },
        {
            name: 'Ionescu Maria',
            value: -679.43,
        },
        {
            name: 'Vasilescu George',
            value: 0,
        }
    ];

    const dialogRef = useRef<HTMLDialogElement>(null);
    const [filtered, setFiltered] = useState(data);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setFiltered(data.filter(employee => employee.name.toLowerCase().includes(search.toLowerCase())));
    }, [search]);

    return (
        <div className="cash">
            <div className="title">
                <h2>Cash</h2>

                {/* <button className="button">
                    <h3>··</h3>
                </button> */}
            </div>

            <div className="search">
                <i className="ri-search-line"></i>
                <input type="text" placeholder="Caută" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="employee-list">
                {filtered.map((employee, index) => {
                    return (
                        <div className="employee" key={index} onClick={() => dialogRef.current?.showModal()}>
                            <h3 className="name">
                                {employee.name}
                            </h3>

                            <h3 className={(employee.value > 0 && 'green') || (employee.value < 0 && 'red') || ''}>
                                {employee.value}
                            </h3>

                            <i className="ri-arrow-right-line"></i>
                        </div>
                    );
                })}
            </div>

            <SmallModal dialogRef={dialogRef}>
                <CashModal dialogRef={dialogRef} />
            </SmallModal>
        </div>
    );
}
