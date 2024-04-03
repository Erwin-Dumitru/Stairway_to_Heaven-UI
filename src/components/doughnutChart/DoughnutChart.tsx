import { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Plugin,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import "./DoughnutChart.scss";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

function DoughnutChart({data}: {data: {label: string, value: number}[]}) {
    const chartRef = useRef<HTMLDivElement>(null);
    const mainColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--mainBack')
        .trim(); // trim is used to remove spaces from the start and end

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.style.height = `${chartRef.current.offsetWidth * 1}px`;
        }

        window.addEventListener("resize", () => {
            if (chartRef.current) {
                chartRef.current.style.height = `${chartRef.current.offsetWidth * 1}px`;
            }
        });

        return () => {
            window.removeEventListener("resize", () => {
                if (chartRef.current) {
                    chartRef.current.style.height = `${chartRef.current.offsetWidth * 1}px`;
                }
            });
        };
    }, []);

    let total = 0.0;
    for (let i = 0; i < data.length; i++) {
        total += data[i].value;
    }
    // Add space after the thousands separator
    let total_string = total.toFixed(2);
    for (let i = total_string.length - 6; i > 0; i -= 3) {
        total_string = total_string.slice(0, i) + " " + total_string.slice(i);
    }


    const [chartText, setChartText] = useState("Total");
    const [chartPercent, setChartPercent] = useState(total_string);

    data.sort((a, b) => b.value - a.value);

    if (data.length > 5) {
        let other = 0;

        for (let i = 4; i < data.length; i++) {
            other += data[i].value;
        }
        
        data = data.slice(0, 4);
        data.push({label: "Altele", value: other});
    }

    const labels = data.map((item) => item.label);
    const values = data.map((item) => item.value);
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    "rgb(154, 208, 194)",
                    "rgb(45, 149, 150)",
                    "rgb(20, 78, 94)",
                    "rgb(15, 49, 76)",
                    "rgb(4, 31, 53)",
                ],
                // hoverBackgroundColor: [
                //     "rgb(154, 208, 194)",
                //     "rgb(45, 149, 150)",
                //     "rgb(38, 80, 115)",
                // ],
                // borderColor: [
                //     "rgb(154, 208, 194)",
                //     "rgb(45, 149, 150)",
                //     "rgb(20, 78, 94)",
                //     "rgb(15, 49, 76)",
                //     "rgb(4, 31, 53)",
                // ],
                // borderAlign: "inner" as const,
                // borderColor: "transparent",
                // borderColor: mainColor,
                // hoverBorderColor: mainColor,
                borderWidth: 0,
                // borderRadius: 2000,
                // borderRadius: 13,
                // spacing: 10,
                circumference: 180,
                rotation: -90,
            },
        ],
    };

    const plugins: Plugin<'doughnut', unknown>[] = [{
        id: "hoverLabel",
        beforeDraw: function(chart: any) {
            var text = chartText;
            var percent = chartPercent;
            var activeElements = chart.getActiveElements();

            if (activeElements.length > 0) {
                var activeElement = activeElements[0];
                var index = activeElement.index;
                var totalValue = 0;
                for (var i = 0; i < chartData.datasets[0].data.length; i++) {
                    totalValue += chartData.datasets[0].data[i];
                }
                text = chartData.labels[index];
                // add the data to the text
                // text += ": " + chartData.datasets[0].data[index];
                percent = (chartData.datasets[0].data[index] / totalValue * 100).toFixed(2) + "%";
            }

            setChartText(text);
            setChartPercent(percent);
        },
    }];
 
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    };

    return (
        <div className="halfChart">
            <Doughnut data={chartData} options={options} plugins={plugins} />
            
            <div className="halfChatText">
                <span>{chartText}</span>
                {chartPercent}
            </div>
        </div>
    );
}


export default DoughnutChart;
