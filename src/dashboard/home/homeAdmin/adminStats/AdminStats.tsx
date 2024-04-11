import SmallDoughnutChart from "@/components/smallDoughnutChart/SmallDoughnutChart";
import AssociationsDetails from "./associationsDetails/AssociationsDetails";
import './AdminStats.scss';

export default function AdminStats() {
    return (
        <div className="admin-stats">
            <div className="first">
                <div className="container profit">
                    <div className="up">
                        <div className="left">
                            <h3>Profit Administrație</h3>
                            <h2>
                                14 543.93
                                <span> / luna</span>
                            </h2>

                            <h3 className="value">
                                22.40
                                <span> / ap.</span>
                            </h3>
                        </div>
                    </div>

                    <div className="down">
                        <div className="text">
                            <h3>Încasat</h3>
                            <h3>10 386.11</h3>
                        </div>

                        <div className="bar">
                            <div className="progress" style={{width: '80%'}}></div>
                        </div>
                    </div>
                </div>

                <div className="container incasari">
                    <div className="up">
                        <div className="left">
                            <h3>De încasat</h3>
                            <h2>14 543.93</h2>
                        </div>

                        {/* <div className="chart">
                            <SmallDoughnutChart />
                        </div> */}
                    </div>

                    <div className="middle">
                        <div className="left">
                            <div className="stat">
                                <h4>Cheltuieli</h4>

                                <h2>4 543.93</h2>
                            </div>

                            <div className="stat">
                                <h4>Fonduri</h4>

                                <h2>6 400.00</h2>
                            </div>

                            <div className="stat">
                                <h4>Restanțe</h4>

                                <h2>3 700.00</h2>
                            </div>
                        </div>
                        
                        <div className="bar-stat">
                            <div className="progress" id="a" style={{height: 'calc(35% + var(--smallGap))'}}></div>
                            <div className="progress" id="b" style={{height: 'calc(27% + var(--smallGap))'}}></div>
                            <div className="progress" id="c" style={{height: 'calc(38% + var(--smallGap))'}}></div>
                        </div>
                    </div>

                    {/* <div className="down">
                        <h3>
                            Medie: 32.40
                            <span> / apartament</span>
                        </h3>
                    </div> */}
                </div>

                <div className="container closed-months">
                    <div className="up">
                        <div className="left">
                            <h3>Luni închise</h3>
                            <h2>14<span> / 324</span></h2>
                        </div>

                        <div className="chart">
                            <SmallDoughnutChart />
                        </div>
                    </div>
                    
                    {/* <div className="down">
                        <h3>
                            Medie: 32.40
                            <span> / apartament</span>
                        </h3>
                    </div> */}
                </div>
            </div>

            <AssociationsDetails />
        </div>
    );
}
