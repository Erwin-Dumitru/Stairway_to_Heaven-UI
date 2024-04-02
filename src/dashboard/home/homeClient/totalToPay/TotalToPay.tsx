import DoughnutChart from './doughnutChart/DoughnutChart';
import './TotalToPay.scss'

export default function TotalToPay() {
    return (
        <div className="totalToPay">
            <div className="totalToPayTitle">
                <h2>Invoice Total</h2>
                
                <button className="totalToPayButton">
                    PAY
                    <i className="ri-arrow-right-line"></i>
                </button>
            </div>

            <DoughnutChart />
        </div>
    )
}
