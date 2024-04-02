import './Meters.scss'

interface Meters {
    name: string,
    place: string,
    last_index: string
}

export default function Meters() {
    const meters: Meters[] = [ // TODO: Replace with API call
        {
            name: 'Apă Rece',
            place: 'Bucătărie',
            last_index: '9874'
        },
        {
            name: 'Apă Rece',
            place: 'Baie',
            last_index: '0523'
        },
        {
            name: 'Apă Caldă',
            place: 'Bucătărie',
            last_index: '4637'
        },
        {
            name: 'Apă Caldă',
            place: 'Baie',
            last_index: '4320'
        }
    ]

    return (
        <div className="meters">
            <div className="metersTitle">
                <h2>Meters</h2>
            </div>

            <div className="metersField">
                <RenderMeters meters={meters} />
            </div>
        </div>
    )
}

function RenderMeters({meters}: {meters: Meters[]}) {
    // TODO: Add meters.last_index to the element

    return meters.map((meter, index) => {
        return (
            <form key={index}>
                <label>
                    {meter.name} <br />
                    <span>{meter.place}</span>
                </label>

                <div className="metersFieldInput">
                    <input type="number" placeholder="New value" />
                    <button><i className="ri-upload-line"></i></button>
                </div>
            </form>
        )
    })
}
