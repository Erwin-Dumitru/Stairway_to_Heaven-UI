import HomeClient from './homeClient/HomeClient';
import HomeAdmin from './homeAdmin/HomeAdmin';
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
                    }
                })();
            }}
        </AddressContext.Consumer>
    );
}

export default Home;
