import { useState } from 'react';
import './Meter.scss';

export default function Meter({meter, submitValue, setSubmitValue}: {meter: Counter, submitValue: { id: string; value: string; }[], setSubmitValue: React.Dispatch<React.SetStateAction<{ id: string; value: string; }[]> >}) {
    var value = submitValue.find((submit) => submit.id === meter.id)?.value || '';
    const [isEmpty, setIsEmpty] = useState<boolean>(true);

    return (
        <div className="meter">
            <label htmlFor={meter.id} className={meter.location ? '' : 'noLocation'} >
                {meter.name} <br />
                <span>{meter.location}</span>
            </label>

            <div className="metersFieldInput">
                <input 
                    id={meter.id}
                    type="number"  
                    required
                    autoComplete='off'
                    min={meter.oldValue}
                    className={isEmpty ? '' : 'not-empty'}
                    value={value} 
                    onChange={(event) => {
                        var newSubmitValue = {
                            id: meter.id,
                            value: event.target.value
                        }

                        if (event.target.value === '') {
                            setIsEmpty(true);
                        } else {
                            setIsEmpty(false);
                        }
                    
                        setSubmitValue(submitValue.map((submit) => {
                            if (submit.id === meter.id) {
                                return newSubmitValue;
                            } else {
                                return submit;
                            }
                        }));
                    }
                } />

                <label htmlFor={meter.id} className="placeholder-label">
                    {meter.oldValue}
                </label>
            </div>
        </div>
    );
}
