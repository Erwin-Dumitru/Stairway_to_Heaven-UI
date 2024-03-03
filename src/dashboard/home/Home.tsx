import HomeClient from './homeClient/HomeClient';
import HomeAdmin from './homeAdmin/HomeAdmin';

function Home() {
    if (true) { // TODO: check the user role using the context
        return <HomeClient />;
    } else {
        return <HomeAdmin />;
    }
}

export default Home;
