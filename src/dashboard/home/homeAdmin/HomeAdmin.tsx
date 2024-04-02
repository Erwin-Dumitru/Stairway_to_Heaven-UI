import "./HomeAdmin.scss";

function HomeAdmin() {
    return (
        <div className="home-admin dashboard-page medium-gap">
            <div className="left">
                <div className="top">
                    <div className="button">
                        <i className="ri-arrow-left-line"></i>
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

                </div>

                <div className="cash">

                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
