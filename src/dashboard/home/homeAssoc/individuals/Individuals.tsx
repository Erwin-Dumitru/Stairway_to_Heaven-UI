import { useEffect, useRef, useState } from 'react';
import './Individuals.scss';

interface DataType {
    name: string;
    amount: number;
    groups: string[];
}

export default function Individuals() {
    const groups = [
        "Sc. 123",
        "Sc. 124",
        "Sc. 125"
    ];
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);
    const [apartmentsSearch, setApartmentsSearch] = useState('');

    const data: DataType[] = [
        {
            name: 'Ap. 1',
            amount: 100,
            groups: [groups[0], groups[1]]
        },
        {
            name: 'Ap. 2',
            amount: 200,
            groups: [groups[0], groups[2]]
        },
        {
            name: 'Ap. 3',
            amount: 300,
            groups: [groups[1], groups[2]]
        },
        {
            name: 'Ap. 4',
            amount: 400,
            groups: [groups[0], groups[1], groups[2]]
        }
    ];

    const [open, setOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // don't display the arrow on hover if the text is overflowing
        const selectElement = selectRef.current;
        if (!selectElement) return;

        const h3Element = selectElement.querySelector('h3');
        const iElement = selectElement.querySelector('i');

        if (!h3Element || !iElement) return;

        const handleMouseOver = () => {
            var isOverflowing = h3Element.offsetWidth < h3Element.scrollWidth;
            if (isOverflowing) {
                iElement.style.display = 'none';
            }
        };

        const handleMouseOut = () => {
            iElement.style.display = 'block';
        };

        selectElement.addEventListener('mouseover', handleMouseOver);
        selectElement.addEventListener('mouseout', handleMouseOut);

        // close the dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            selectElement.removeEventListener('mouseover', handleMouseOver);
            selectElement.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <div className="individuals">
            <div className="top">
                <div className="search">
                    <i className="ri-search-line"></i>
                    <input type="text" placeholder="Caută" value={apartmentsSearch} onChange={(e) => setApartmentsSearch(e.target.value)} />
                </div>

                <div className="select" ref={dropdownRef}>
                    <div className="selected" ref={selectRef} onClick={() => setOpen(!open)}>
                        <h3>{selectedGroup}</h3>
                        <i className="ri-arrow-down-s-line"></i>
                    </div>

                    <div className={`dropdown ${open && 'open'}`}>
                        {groups.map((group, index) => {
                            return (
                                <div className="item" key={index} onClick={() => { setSelectedGroup(group); setOpen(false); }}>
                                    <h3>{group}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="list">
                {data.map((individual, index) => {
                    if (!individual.groups.includes(selectedGroup) || !individual.name.toLowerCase().includes(apartmentsSearch.toLowerCase())) return null;
                    return (
                        <div className="apartment" key={index}>
                            <h3 className='name'>{individual.name}</h3>
                            <h3>{individual.amount}</h3>
                            <i className="ri-arrow-right-line"></i>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
