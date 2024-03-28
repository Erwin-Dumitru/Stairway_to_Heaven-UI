import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useHover } from "@uidotdev/usehooks";
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

const DoughnutChart = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const mainColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--mainBack')
        .trim(); // trim is used to remove spaces from the start and end

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.style.height = `${chartRef.current.offsetWidth * 1}px`;
        }
    }, []);

    const [chartText, setChartText] = useState("Total");
    const [chartPercent, setChartPercent] = useState("12 173.42");
    
    const chartData = {
        labels: ["Apa rece", "Apa calda", "Salubritate"],
        datasets: [
            {
                data: [12, 19, 3],
                backgroundColor: [
                    "rgb(154, 208, 194)",
                    "rgb(45, 149, 150)",
                    "rgb(38, 80, 115)",
                ],
                // hoverBackgroundColor: [
                //     "rgb(154, 208, 194)",
                //     "rgb(45, 149, 150)",
                //     "rgb(38, 80, 115)",
                // ],
                // borderColor: [
                //     "rgba(255, 99, 132, 1)",
                //     "rgba(54, 162, 235, 1)",
                //     "rgba(255, 206, 86, 1)",
                // ],
                borderAlign: "inner" as const,
                // borderColor: "transparent",
                borderColor: mainColor,
                hoverBorderColor: mainColor,
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
            {/* <div className="totalText">
                <span>Total</span>
                <h4>127.64</h4>
            </div> */}
            
            <div className="halfChatText">
                <span>{chartText}</span>
                {chartPercent}
            </div>
        </div>
    );
}


export default DoughnutChart;
