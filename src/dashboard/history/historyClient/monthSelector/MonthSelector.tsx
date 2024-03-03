import { useState, useEffect, useRef } from 'react';
import './MonthSelector.scss';

function MonthSelector({year, months, selectedInvoice, setSelectedInvoice}: {year:string, months:number[], selectedInvoice: {month: number, year: number}, setSelectedInvoice: Function}) {
    const [active, setActive] = useState(false);
    const [maxHeight, setMaxHeight] = useState('0px');
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current !== null) {
            setMaxHeight(`${contentRef.current.scrollHeight}px`);
        }
    }, []);

    function clickHandle() {
        setActive(!active);
    }

    function renderMonths() {
        return (
            <div className={`months ${active ? '' : 'inactive'}`} style={{maxHeight: active ? maxHeight : '0px'}} ref={contentRef}>
                {months.map((month) => {
                    let months = [
                        "January", "February", "March", "April", "May", "June", "July", "August", 
                        "September", "October", "November", "December"
                    ];
                    let monthName = months[month - 1];
                    let currentInvoice = {
                        month: month,
                        year: parseInt(year)
                    };

                    return (
                        <div
                            key={`${currentInvoice.month}-${currentInvoice.year}`}
                            className={`month ${
                                (selectedInvoice.month === currentInvoice.month && selectedInvoice.year === currentInvoice.year)?
                                'selected' : ''}`
                            }
                            onClick={() => {
                                setSelectedInvoice(currentInvoice);
                            }
                        }>
                            {monthName}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="year" ref={titleRef}>
            <div className="yearTitle" onClick={clickHandle}>
                <h3>{year}</h3>
                <i className="ri-arrow-down-s-line"></i>
            </div>
            {renderMonths()}
        </div>
    );
}

export default MonthSelector;
