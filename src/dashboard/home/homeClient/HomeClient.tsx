import Expenses from "./expenses/Expenses";
import TotalToPay from "./totalToPay/TotalToPay";
import Meters from "./meters/Meters";
import "./HomeClient.scss";

function HomeClient() {
    return (
        <div className="home dashboard-page medium-gap">
            <Expenses />

            <div className="right">
                <TotalToPay />
                
                <Meters />
            </div>
        </div>
    );
}

export default HomeClient;
