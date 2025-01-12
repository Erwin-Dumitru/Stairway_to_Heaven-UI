import './Expenses.scss';
import ApartmentsSelector from './apartmentsSelector/ApartmentsSelector';
import Counter from '@/assets/Counter.png';
import Distribution from '@/assets/Distribution.png';

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
                    <div className="checkbox">
                        <input type="checkbox" />
                    </div>
                    {/* <div className="type"></div> */}
                    {/* <h3>Tip</h3> */}

                    <div className="field">
                        <h3>Nume</h3>
                    </div>

                    <div className="field">
                        <h3>Apartamente</h3>
                    </div>

                    <div className="field">
                        <h3>Unitate</h3>
                    </div>

                    <div className="field">
                        <h3>Individual</h3>
                    </div>

                    <div className="field">
                        <h3>Total</h3>
                    </div>
                    <div className="add">
                        <i className="ri-add-line"></i>
                    </div>
                </div>

                {data.map((expense, index) => {
                    if (expense.stair !== stair || !show) return null;
                    return (
                        <div className={`expense ${index % 2 === 0 ? 'even' : 'odd'}`} 
                            key={index}>
                            
                            <div className="checkbox">
                                <input type="checkbox" />
                            </div>

                            <div className="field">
                                <div className="type">
                                    <img src={expense.kind === 'Contorizat' ? Counter : Distribution} alt="type" />
                                </div>
                                
                                <h3>{expense.name}</h3>
                            </div>

                            {/* <div className="field selector">
                                <div className="selected">
                                    <h3>15/48</h3>
                                </div>

                                <div className="dropdown">
                                    <div className="groups">
                                        <div className="group">
                                            <h3>Tot</h3>
                                        </div>
                                    </div>

                                    <div className="apartments">
                                        <div className="apartment">
                                            <h3>15</h3>
                                        </div>

                                        <div className="apartment">
                                            <h3>16</h3>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="field overflow">
                                <ApartmentsSelector />
                            </div>
                            
                            <div className="field">
                                <h3>{expense.unit}</h3>
                            </div>

                            <div className="field">
                                {/* <h3>{expense.individualAmount.toFixed(2)}</h3> */}
                                <input type="number" value={expense.individualAmount.toFixed(2)} />
                            </div>

                            <div className="field">
                                {/* <h3>{expense.totalAmount.toFixed(2)}</h3> */}
                                <input type="number" value={expense.totalAmount.toFixed(2)} />
                            </div>
                            
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
