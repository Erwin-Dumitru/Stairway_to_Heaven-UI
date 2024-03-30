import HistoryAdmin from "./historyAdmin/HistoryAdmin";
import HistoryAssoc from "./historyAssoc/HistoryAssoc";
import HistoryClient from "./historyClient/HistoryClient";
import { AddressContext } from "@/components/Context";
import "./History.scss"

function History() {
    return (
        <AddressContext.Consumer>
            {(context) => {
                return (() => {
                    if (context && context.currentAddress.type === "client") {
                        return <HistoryClient />;
                    } else if (context && context.currentAddress.type === "association") {
                        return <HistoryAssoc />;
                    } else if (context && context.currentAddress.type === "admin") {
                        return <HistoryAdmin />;
                    }
                })();
            }}
        </AddressContext.Consumer>
    );
}

export default History;
