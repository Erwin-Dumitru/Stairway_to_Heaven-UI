import HomeAdmin from './homeAdmin/HomeAdmin';
import HomeAssoc from './homeAssoc/HomeAssoc';
import HomeClient from './homeClient/HomeClient';
import { AddressContext } from '@/components/Context';

function Home() {
    return (
        <AddressContext.Consumer>
            {(context) => {
                return (() => {
                    if (context && context.currentAddress.type === "client") {
                        return <HomeClient />;
                    } else if (context && context.currentAddress.type === "admin") {
                        return <HomeAdmin />;
                    } else if (context && context.currentAddress.type === "association") {
                        return <HomeAssoc />;
                    }
                })();
            }}
        </AddressContext.Consumer>
    );
}

export default Home;
