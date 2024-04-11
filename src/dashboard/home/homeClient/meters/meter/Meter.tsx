import { Counter } from '@/components/Interfaces';
import './Meter.scss';

export default function Meter({meter, submitValue, setSubmitValue}: {meter: Counter, submitValue: { id: string; value: string; }[], setSubmitValue: React.Dispatch<React.SetStateAction<{ id: string; value: string; }[]> >}) {
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
                    // placeholder={meter.oldValue} 
                    required
                    autoComplete='off'
                    min={meter.oldValue}
                    className={submitValue.find((submit) => submit.id === meter.id)?.value ? 'not-empty' : ''}
                    value={submitValue.find((submit) => submit.id === meter.id)?.value} onChange={(event) => {
                        var newSubmitValue = {
                            id: meter.id,
                            value: event.target.value
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
