import Raports from "./raports/Raports";
import Stats from "./stats/Stats";
import Individuals from "./individuals/Individuals";
import "./HomeAssoc.scss"

export default function HomeAssoc() {
    return (
        <div className="home-assoc dashboard-page medium-gap">
            <Raports />

            <div className="right">
                <Stats />
                <Individuals />
            </div>
        </div>
    );
}
