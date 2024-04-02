import { useState } from 'react';
import BarChart from './barChart/BarChart';
import './Expenses.scss';

type PeriodKey = "6M" | "1Y" | "3Y" | "5Y" | "All";

type Periods = {
    [key in PeriodKey]: number;
};

export default function Expenses() {
    var periods: Periods = {
        "6M": 6,
        "1Y": 12,
        "3Y": 36,
        "5Y": 60,
        "All": 0,
    }

    const [period, setPeriod] = useState<PeriodKey>(Object.keys(periods)[0] as PeriodKey);

    return (
        <div className="expenses">
            <div className="graphMenu">
                <h2>Expenses</h2>
                <RenderPeriod periods={periods} period={period} setPeriod={setPeriod} />
            </div>

            <BarChart period={Number(periods[period])} />
        </div>
    )
}

function RenderPeriod(props: any) {
    return (
        <div className="range">
            {Object.keys(props.periods).map((key, index) => {
                return (
                    <h3 key={index}
                        className={key === props.period ? "active" : ""}
                        onClick={() => {
                            props.setPeriod(key as PeriodKey);
                        }}
                    >
                        {key}
                    </h3>
                );
            })}
        </div>
    );
}
