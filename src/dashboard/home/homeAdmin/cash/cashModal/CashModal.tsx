import { useState } from 'react';
import SmallDoughnutChart from '@/components/smallDoughnutChart/SmallDoughnutChart';
import './CashModal.scss';

export default function CashModal(dialogRef: any) {
    const [selector, setSelector] = useState('current');

    const data = [
        {
            id: 1,
            name: 'Achiziție 1',
            date: '01-09-2021',
            time: '12:00:00',
            info: 'Detalii despre achiziție 1',
            value: -100.00
        },
        {
            id: 2,
            name: 'Achiziție 2',
            date: '02-09-2021',
            time: '12:00:00',
            info: 'Detalii despre achiziție 2',
            value: -200.00
        },
        {
            id: 3,
            name: 'Achiziție 3',
            date: '03-09-2021',
            time: '12:00:00',
            info: 'Detalii despre achiziție 3',
            value: -300.00
        },
        {
            id: 4,
            name: 'Achiziție 4',
            date: '04-09-2021',
            time: '12:00:00',
            info: 'Detalii despre achiziție 4',
            value: -400.00
        },
        {
            id: 5,
            name: 'Achiziție 5',
            date: '05-09-2021',
            time: '12:00:00',
            info: 'Detalii despre achiziție 5',
            value: -500.00
        },
        {
            id: 6,
            name: 'Achiziție 6',
            date: '06-09-2021',
            time: '12:00:00',
            info: 'Detalii despre achiziție 6',
            value: -600.00
        }
    ];

    return (
        <div className="cash-modal">
            <div className="cash-expenses">
                {/* <div className="selector">
                    <div className={`button ${selector === 'current' && 'active'}`} onClick={() => setSelector('current')}>
                        <h3>Curente</h3>
                    </div>

                    <div className={`button ${selector === 'historic' && 'active'}`} onClick={() => setSelector('historic')}>
                        <h3>Istoric</h3>
                    </div>
                </div> */}

                <div className="header">
                    <div className="date-picker">
                        <div className="selected-date">
                            <h3>01-09-2021</h3>
                            <h3>&mdash;</h3>
                            <h3>12:00:00</h3>
                        </div>


                    </div>

                    <button className="new-payment">
                        <h3>Add</h3>
                    </button>

                    <button className='close-button'>
                        <i className="ri-close-line"></i>
                    </button>
                </div>

                <div className="expenses-list">
                    {/* <div className="expense">
                        <h3 className="name">Achiziție 1</h3>
                        <h3 className="value">-100.00</h3>

                        <i className="ri-arrow-right-s-line"></i>
                    </div> */}

                    {data.map((expense, index) => {
                        return (
                            <div className="expense" key={index}>
                                <h3>{expense.date}</h3>
                                <h3>{expense.value}</h3>

                                <i className="ri-arrow-right-s-line"></i>
                            </div>
                        );
                    })}
                </div>

                <div className="total">
                    <h3>Total:</h3>
                    <h3>-2100.00</h3>
                </div>

                {/* <div className="buttons">
                    <button className="cancel">
                        <h3>Cancel</h3>
                    </button>

                    <button className="add">
                        <h3>Add</h3>
                    </button>
                </div> */}
            </div>
        </div>
    );
}
