import SettingsAdmin from "./settingsAdmin/SettingsAdmin";
import SettingsAssoc from "./settingsAssoc/SettingsAssoc";
import SettingsClient from "./settingsClient/SettingsClient";
import { AddressContext } from "@/components/Context";
import "./Settings.scss";

function Settings() {
    return (
        <AddressContext.Consumer>
            {(context) => {
                return (() => {
                    if (context && context.currentAddress.type === "admin") {
                        return <SettingsAdmin />;
                    } else if (context && context.currentAddress.type === "association") {
                        return <SettingsAssoc />;
                    } else if (context && context.currentAddress.type === "client") {
                        return <SettingsAdmin />;
                        return <SettingsClient />;
                    }
                })();
            }}
        </AddressContext.Consumer>
    );
}

export default Settings;
