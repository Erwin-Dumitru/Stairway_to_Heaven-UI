import HomeAdmin from './homeAdmin/HomeAdmin';
import HomeAssoc from './homeAssoc/HomeAssoc';
import HomeClient from './homeClient/HomeClient';
import { AddressContext } from '@/components/Context';

function Home() {

    return (
        <AddressContext.Consumer>
            {(context) => {
                return (() => {
                    let type = context ? context.currentAddress ? context.currentAddress.type : '' : '';
                    if (type === "client") {
                        return <HomeClient />;
                    } else if (type === "admin") {
                        return <HomeAdmin />;
                    } else if (type === "association") {
                        return <HomeAssoc />;
                    }
                })();
            }}
        </AddressContext.Consumer>
    );
}

export default Home;
