import DoughnutChart from "@/components/doughnutChart/DoughnutChart";
import "./HomeAdmin.scss";

function HomeAdmin() {
    const data = [
        {
            label: 'Card',
            value: 9063.02
        },
        {
            label: 'Un-Doi',
            value: 5334.23
        },
        {
            label: 'PayPoint',
            value: 1223.52
        }
    ]

    return (
        <div className="home-admin dashboard-page medium-gap">
            <div className="left">
                <div className="top">
                    <div className="button">
                        <i className="ri-arrow-left-s-line"></i>
                    </div>

                    <div className="search">
                        <i className="ri-search-line"></i>
                        <input type="text" placeholder="Caută" />
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
                    <div className="association">
                        <h3 className={`green`}>Cerna 18</h3>
                        <h3>1000</h3>
                        <h3 className='red'>200</h3>
                        <h3>1200</h3>
                        <i className="ri-arrow-right-line"></i>
                    </div>

                    <div className="association">
                        <h3 className={`green`}>Bradul 4</h3>
                        <h3>200</h3>
                        <h3 className='red'>700</h3>
                        <h3>900</h3>
                        <i className="ri-arrow-right-line"></i>
                    </div>
                </div>
            </div>

            <div className="right">
                <div className="banca">
                    <div className="title">
                        <h2>Bancă</h2>

                        <button className="button">
                            Retrage
                            <i className="ri-arrow-right-line"></i>
                        </button>
                    </div>
                    
                    <DoughnutChart data={data} />
                </div>

                <div className="cash">
                    <div className="title">
                        <h2>Cash</h2>

                        {/* <button className="button">
                            <h3>··</h3>
                        </button> */}
                    </div>

                    <div className="employee-list">
                        <div className="search">
                            <i className="ri-search-line"></i>
                            <input type="text" placeholder="Caută" />
                        </div>

                        <div className="employee">
                            <h3 className="name">Popescu Ion</h3>
                            <h3 className="green">1843.31</h3>
                            <i className="ri-arrow-right-line"></i>
                        </div>

                        <div className="employee">
                            <h3 className="name">Ionescu Maria</h3>
                            <h3 className="red">-679.43</h3>
                            <i className="ri-arrow-right-line"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
