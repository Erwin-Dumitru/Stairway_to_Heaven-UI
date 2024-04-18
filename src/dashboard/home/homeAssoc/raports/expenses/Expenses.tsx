import './Expenses.scss';

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

export default function Expenses({ data, stair, show }: { data: DataType[], stair: string, show: boolean }) {
    return (
        <div className="raports-expenses">
            {/* <div className="top">
                <div className="title">
                    <span>Cheltuieli</span>
                    <span>{stair}</span>
                </div>
                <div className="button">
                    <i className="ri-equalizer-2-line"></i>
                </div>
            </div>

            <div className="collumns">
                <span>Grup</span>
                <span>Nume</span>
                <span>Tip</span>
                <span>Unitate</span>
                <span>Cantitate individuală</span>
                <span>Cantitate totală</span>
                <span>Finalizat</span>
            </div> */}

            <div className="expenses-list">
                <div className='expense header'>
                    <input type="checkbox" />
                    <h3>Nume</h3>
                    <h3>Tip</h3>
                    <h3>Unitate</h3>
                    <h3>Individual</h3>
                    <h3>Total</h3>
                    <div className="add">
                        <i className="ri-add-line"></i>
                    </div>
                </div>

                {data.map((expense, index) => {
                    if (expense.stair !== stair || !show) return null;
                    return (
                        <div className={`expense ${index % 2 === 0 ? 'even' : 'odd'}`} 
                            key={index}>
                            <input type="checkbox" />
                            {/* <span>{expense.group}</span> */}
                            <h3>{expense.name}</h3>
                            <h3>{expense.kind}</h3>
                            <h3>{expense.unit}</h3>
                            <h3>{expense.individualAmount.toFixed(2)}</h3>
                            <h3>{expense.totalAmount.toFixed(2)}</h3>
                            {/* {expense.finished ? <i className="ri-checkbox-circle-fill"></i> : <i className="ri-close-circle-fill"></i>} */}
                            <div className="add">
                                <h4>••</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
