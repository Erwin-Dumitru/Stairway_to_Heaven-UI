import Expenses from "./expenses/Expenses";
import TotalToPay from "./totalToPay/TotalToPay";
import Meters from "./meters/Meters";
import "./HomeClient.scss";

function HomeClient({data}: {data: ApartmentData}) {
    let meters: Counter[];

    if (data) {
        meters = data.counters.map(counter => {
            return {
                id: counter.id,
                name: counter.name,
                location: counter.location,
                oldValue: counter.oldValue
            };
        });
    } else {
        meters = [
            {
                id: '1',
                name: 'Apă Rece',
                location: 'Bucătărie',
                oldValue: '9874'
            },
            {
                id: '2',
                name: 'Apă Rece',
                location: 'Baie',
                oldValue: '0523'
            },
            {
                id: '3',
                name: 'Apă Caldă',
                location: 'Bucătărie',
                oldValue: '4637'
            },
            {
                id: '4',
                name: 'Apă Caldă',
                location: 'Baie',
                oldValue: '4320'
            },
            {
                id: '6',
                name: 'Gaz',
                // location: '',
                oldValue: '5678'
            }
        ];
    }

    return (
        <div className="home dashboard-page medium-gap">
            <Expenses />

            <div className="right">
                <TotalToPay />
                
                <Meters meters={meters} />
            </div>
        </div>
    );
}

export default HomeClient;
