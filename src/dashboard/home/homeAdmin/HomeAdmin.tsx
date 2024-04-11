import AdminStats from "./adminStats/AdminStats";
import Bank from './bank/Bank';
import Cash from "./cash/Cash";
import "./HomeAdmin.scss";

function HomeAdmin() {
    return (
        <div className="home-admin dashboard-page medium-gap">
            <AdminStats />

            <div className="right">
                <Bank />

                <Cash />
            </div>
        </div>
    );
}

export default HomeAdmin;
