import { useState, useEffect, useLayoutEffect } from "react";
import { useHover } from "@uidotdev/usehooks";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Plugin,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import "./styles/DoughnutChart.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

const DoughnutChart = () => {
    var element: any = document.getElementsByClassName("halfChartText")[0];
    var child: HTMLElement = document.getElementsByClassName("halfChartTextChild")[0] as HTMLElement;;
    var parentColor: any;

    useLayoutEffect(() => {
        var parent = document.getElementsByClassName("totalToPay")[0];
        parentColor = window.getComputedStyle(parent).backgroundColor;
        element = document.getElementsByClassName("halfChartText")[0];
        child = document.getElementsByClassName("halfChartTextChild")[0] as HTMLElement;

        
        element.ontransitionstart = () => {
            if (element.classList.contains("inactive")) {
                child.style.visibility = "hidden";
            }
        };
        element.ontransitionend = () => {
            if (!element.classList.contains("inactive")) {
                child.style.visibility = "visible";
            }
        };
    }, []);

    // useLayoutEffect(() => {
    //     element = document.getElementsByClassName("halfChartText")[0];
    //     child = document.getElementsByClassName("halfChartTextChild")[0] as HTMLElement;

        
    //     element.ontransitionstart = () => {
    //         if (element.classList.contains("inactive")) {
    //             child.style.visibility = "hidden";
    //         }
    //     };
    //     element.ontransitionend = () => {
    //         if (!element.classList.contains("inactive")) {
    //             child.style.visibility = "visible";
    //         }
    //     };
    // });

    const [chartText, setChartText] = useState("");
    const [colorText, setColorText] = useState<any>(parentColor);
    const [finalChartText, setFinalChartText] = useState("");
    const [finalColorText, setFinalColorText] = useState<any>(parentColor);
    const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false);

    // if halfChartText is not hovered by the mouse, set the finalColorText to colorText
    const [ref, isHovered] = useHover<HTMLDivElement>();

    useEffect(() => {
        if (!isHovered) {
            setFinalChartText(chartText);
            setFinalColorText(colorText);
            if (element && !element.classList.contains("inactive")) {
                element.classList.add("inactive");
            }
        }
    }, [colorText, isHovered]);
    
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
                hoverBackgroundColor: [
                    "rgb(154, 208, 194)",
                    "rgb(45, 149, 150)",
                    "rgb(38, 80, 115)",
                ],
                // borderColor: [
                //     "rgba(255, 99, 132, 1)",
                //     "rgba(54, 162, 235, 1)",
                //     "rgba(255, 206, 86, 1)",
                // ],
                borderWidth: 0,
                circumference: 180,
                rotation: -90,
            },
        ],
    };

    const plugins: Plugin<'doughnut', unknown>[] = [{
        id: "hoverLabel",
        beforeDraw: function(chart: any) {
            // var isActive = false;
            var text = "";
            // var parent = document.getElementsByClassName("totalToPay")[0];
            // var color = window.getComputedStyle(parent).backgroundColor;
            var color = parentColor;
            var element = document.getElementsByClassName("halfChartText")[0];
            // var color = "white";
            var activeElements = chart.getActiveElements();
            if (activeElements.length > 0) {
                var activeElement = activeElements[0];
                var index = activeElement.index;
                text = chartData.labels[index];
                // add the data to the text
                text += ": " + chartData.datasets[0].data[index];
                color = chartData.datasets[0].backgroundColor[index];
                // if (element && element.classList.contains("inactive")) {
                //     element.classList.remove("inactive");
                // }
                // isActive = true;
                if (!isHovered && element.classList.contains("inactive")) {
                    element.classList.remove("inactive");
                }
            }
            
            // if (element && !element.classList.contains("inactive") && !isActive) {
            //     element.classList.add("inactive");
            // }

            setChartText(text);
            setColorText(color);
        },
    }];
 
    const options = {
        // cutout: "69%",
        cutout: "0%",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        responsive: true,
        // maintainAspectRatio: false,
        animation: isInitialAnimationComplete ? false : {
            duration: 1000, // Set the initial animation duration (in milliseconds)
            onComplete: function() {
                // This function is called when the animation is completed
                // You can perform any additional actions here
                // For example, you can stop the animations after the first animation is done
                setIsInitialAnimationComplete(true);
            }
        }
    };

    return (
        <div className="halfChart">
            <Doughnut data={chartData} options={options} plugins={plugins} />
            <div className="totalText">
                <span>Total</span>
                <h4>127.64</h4>
            </div>
            <div className="halfChartChild">
                <div ref={ref} className="halfChartText inactive" style={{backgroundColor: finalColorText}}>
                    <div className="halfChartTextChild">
                        <div className="halfChartTextChildChild">
                            <h4>{finalChartText}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default DoughnutChart;
