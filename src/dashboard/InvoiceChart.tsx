import { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Plugin,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import "./styles/InvoiceChart.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

function InvoiceChart({selectedInvoice}: {selectedInvoice: {month: number, year: number}}) {
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

    var chartData = {
        labels: ["Apă caldă", "Apă rece", "Încălzire", "Electricitate", "Altele"],
        datasets: [
            {
                data: [19, 12, 5, 3, 2],
                backgroundColor: [
                    "#9ad0c2",
                    "#64b2ac",
                    "#2D9596",
                    "#2a7284",
                    "#265073",
                ],
                hoverBackgroundColor: [
                    "#9ad0c2",
                    "#64b2ac",
                    "#2D9596",
                    "#2a7284",
                    "#265073",
                ],
                borderAlign: "inner" as const,
                // borderColor: "transparent",
                borderColor: mainColor,
                hoverBorderColor: mainColor,
                borderWidth: 3,
                borderRadius: 2000,
                // borderRadius: 13,
                // spacing: 10,
            }
        ]
    };

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
        <div className="invoiceChart" ref={chartRef}>
            <Doughnut data={chartData} options={options} plugins={plugins} />
            <div className="chartText">
                <span>{chartText}</span>
                {chartPercent}
            </div>
        </div>
    )
}

export default InvoiceChart;