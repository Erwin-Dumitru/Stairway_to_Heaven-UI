import DoughnutChart from '@/components/doughnutChart/DoughnutChart';
import './TotalToPay.scss'

export default function TotalToPay() {
    const data = [
        {
            label: 'Apă caldă',
            value: 90
        },
        {
            label: 'Apă rece',
            value: 97.41
        },
        {
            label: 'Salubritate',
            value: 80
        },
        {
            label: 'Întreținere',
            value: 60
        },
        {
            label: 'Încălzire',
            value: 40
        },
        {
            label: 'Electricitate',
            value: 30
        },
        {
            label: 'Administrație',
            value: 20
        }
    ]

    return (
        <div className="totalToPay">
            <div className="totalToPayTitle">
                <h2>Invoice Total</h2>
                
                <button className="totalToPayButton">
                    Pay
                    <i className="ri-arrow-right-line"></i>
                </button>
            </div>

            <DoughnutChart data={data} />
        </div>
    )
}
