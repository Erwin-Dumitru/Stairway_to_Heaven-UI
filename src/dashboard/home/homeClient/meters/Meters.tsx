import { useEffect, useState } from 'react';
import { Counter, SubmitCounter } from '@/components/Interfaces';
import Meter from './meter/Meter';
import './Meters.scss'

export default function Meters({meters}: {meters: Counter[]}) {
    const [submitValue, setSubmitValue] = useState<SubmitCounter[]>( // SubmitCounter = { id: string; value: string; }
        meters.map(meter => (
            { id: meter.id, value: '' }
        )
    ));

    // useEffect(() => {
    //     meters.forEach((meter) => {
    //         var newSubmitValue = {
    //             id: meter.id,
    //             value: ''
    //         }
    //         setSubmitValue(prevSubmitValue => [...prevSubmitValue, newSubmitValue]);
    //     })
    // }, [meters]);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO: Validate the data before sending it to the server

        // TODO: Send the data to the server
        console.log(submitValue);

        // Or send the data to the server separately
        // submitValue.forEach((submit) => {
        //     console.log(submit);
        // });

        // Reset the form after submitting
        setSubmitValue(meters.map(meter => ({ id: meter.id, value: '' })));
    };

    return (
        <form className="meters" onSubmit={submitHandler}>
            <div className="metersTitle">
                <h2>Meters</h2>

                <button className="metersButton" type="submit">
                    Send
                    <i className="ri-send-plane-fill"></i>
                </button>
            </div>

            <div className="metersList">
                {meters.map((meter, index) => {
                    return (
                        <Meter key={index} meter={meter} submitValue={submitValue} setSubmitValue={setSubmitValue} />
                    );
                })}
            </div>
        </form>
    )
}
