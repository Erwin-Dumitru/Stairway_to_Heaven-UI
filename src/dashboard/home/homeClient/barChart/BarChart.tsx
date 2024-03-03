import { Bar } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";
import expensesPerMonth from "@/data/expensesPerMonth.json";
import "./BarChart.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

function mixColor(maxValue: number = 100, darkeningFactor: number = 0) {
    return (ctx: any) => {
        // const color1 = { r: 38, g: 80, b: 115 }; // low
        const color1 = { r: 45, g: 149, b: 150 }; // low
        const color2 = { r: 154, g: 208, b: 194 }; // high
        // const color1 = { r: 119, g: 221, b: 119 }; // low
        // const color2 = { r: 174, g: 198, b: 207 }; // high // blue
        // const color2 = { r: 255, g: 179, b: 71 }; // high // orange
        // const color2 = { r: 253, g: 253, b: 150 }; // high // yellow
        const factor = ctx.parsed.y / maxValue;

        const r = Math.round( ((color2.r - color1.r) * factor + color1.r) * (1 - darkeningFactor) );
        const g = Math.round( ((color2.g - color1.g) * factor + color1.g) * (1 - darkeningFactor) );
        const b = Math.round( ((color2.b - color1.b) * factor + color1.b) * (1 - darkeningFactor) );

        return `rgb(${r}, ${g}, ${b})`;
    };
}

function BarChart({period}: {period: number}) {
    const labels = expensesPerMonth.map((expense) => {
        let month = "";
        switch (expense.month) {
            case 1:
                month = "Jan";
                break;
            case 2:
                month = "Feb";
                break;
            case 3:
                month = "Mar";
                break;
            case 4:
                month = "Apr";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "Jun";
                break;
            case 7:
                month = "Jul";
                break;
            case 8:
                month = "Aug";
                break;
            case 9:
                month = "Sep";
                break;
            case 10:
                month = "Oct";
                break;
            case 11:
                month = "Nov";
                break;
            case 12:
                month = "Dec";
                break;
        }
    
        let year = expense.year % 100;
    
        return `${month} '${year}`;
    });
    
    let maxBarValue = 0;
    expensesPerMonth.forEach((expense) => {
        if (expense.amount > maxBarValue) {
            maxBarValue = expense.amount;
        }
    });
    
    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                min: labels[labels.length - period],
                // offset: true,
            },
            y: {
                ticks: {
                    callback: (tickValue: string | number) => {
                        return typeof tickValue === 'number' ? `${tickValue}` : tickValue;
                    }
                },
                border: {
                    color: "#fff0",
                },
                grid: {
                    color: "#ffffff22",
                    borderDash: [50, 50],
                    drawBorder: false,
                },
            },
        },
        // // Set the dimensions of the chart
        maintainAspectRatio: false,
        // width: 400, // specify the width of the chart
        // height: 100, // specify the height of the chart
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            bar: {
                backgroundColor: mixColor(maxBarValue, 0),
                borderColor: mixColor(maxBarValue, 0.2),
                borderWidth: 3
            }
        }
    };
    
    const data = {
        labels,
        datasets: [
            {
                // label: "",
                data: expensesPerMonth.map((expense) => expense.amount),
                borderRadius: 20,
                borderSkipped: false,
            },
        ],
    };

    return (
        <div className="barChart">
            <Bar options={options} data={data} />
        </div>
    );
}

export default BarChart;
