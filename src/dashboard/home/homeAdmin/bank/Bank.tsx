import DoughnutChart from "@/components/doughnutChart/DoughnutChart";
import './Bank.scss';

export default function Bank() {
    const data = [
        {
            label: 'Card',
            value: 9063.02
        },
        {
            label: 'Un-Doi',
            value: 5334.23
        },
        {
            label: 'PayPoint',
            value: 1223.52
        }
    ]

    return (
        <div className="bank">
            <div className="title">
                <h2>Bancă</h2>

                <button className="button">
                    Retrage
                    <i className="ri-arrow-right-line"></i>
                </button>
            </div>
            
            <DoughnutChart data={data} />
        </div>
    );
}
