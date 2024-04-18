import { useEffect, useRef, useState } from 'react';
import Expenses from './expenses/Expenses';
import './Raports.scss';

interface DataType {
    group: string;
    stair: string;
    name: string;
    kind: string;
    unit: string;
    individualAmount: number;
    totalAmount: number;
    finished: boolean;
}

export default function Raports() {
    const stairs = [
        "Sc. 123",
        "Sc. 124",
        "Sc. 125"
    ];
    const [selectedStair, setSelectedStair] = useState(stairs[0]);
    const data: DataType[] = [
        {
            group: "Scara",
            stair: "Sc. 123",
            name: "Apa rece",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 123",
            name: "Apa calda",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 123",
            name: "Gaze",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: false
        },
        {
            group: "Scara",
            stair: "Sc. 123",
            name: "Salubritate",
            kind: "Distribuit",
            unit: "pers",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 124",
            name: "Apa rece",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 124",
            name: "Apa calda",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 124",
            name: "Gaze",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: false
        },
        {
            group: "Scara",
            stair: "Sc. 124",
            name: "Salubritate",
            kind: "Distribuit",
            unit: "pers",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 125",
            name: "Apa rece",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 125",
            name: "Apa calda",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 125",
            name: "Gaze",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: false
        },
        {
            group: "Scara",
            stair: "Sc. 125",
            name: "Distribuit",
            kind: "Distribuit",
            unit: "pers",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        },
        {
            group: "Scara",
            stair: "Sc. 125",
            name: "Gaze",
            kind: "Contorizat",
            unit: "mc",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: false
        },
        {
            group: "Scara",
            stair: "Sc. 125",
            name: "Salubritate",
            kind: "Distribuit",
            unit: "pers",
            individualAmount: 10.48,
            totalAmount: 104.80,
            finished: true
        }
    ];
    const [section, setSection] = useState(false);
    const selectorRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

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
            if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
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
        <div className="raports">
            <div className="top">
                <div className="select" ref={selectorRef}>
                    <div className="selected" ref={selectRef} onClick={() => setOpen(!open)}>
                        <h3>{selectedStair}</h3>
                        <i className="ri-arrow-down-s-line"></i>
                    </div>

                    <div className={`dropdown ${open && 'open'}`}>
                        {stairs.map((stair, index) => {
                            return (
                                <div className="item" key={index} onClick={() => { setSelectedStair(stair); setOpen(false); }}>
                                    <h3>{stair}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="switch">
                    <div className="item" onClick={() => setSection(false)}>
                        <h3>Cheltuieli</h3>
                    </div>

                    <div className="item" onClick={() => setSection(true)}>
                        <h3>Fonduri</h3>
                    </div>

                    <div className={`background ${section ? 'right' : ''}`} />
                </div>

                <div className="buttons">
                    <div className="button">
                        <h3>Închide</h3>
                    </div>

                    <div className="button elipsis">
                        <h3>••</h3>
                    </div>
                </div>
            </div>

            <Expenses data={data} stair={selectedStair  } show={!section} />
        </div>
    );
}
