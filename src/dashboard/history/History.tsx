import HistoryAdmin from "./historyAdmin/HistoryAdmin";
import HistoryClient from "./historyClient/HistoryClient";
import "./History.scss"

function History() {
    if (true) {
        return <HistoryClient />;
    } else {
        return <HistoryAdmin />;
    }
}

export default History;
