import './SmallDoughnutChart.scss';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS, // Plugin,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

export default function SmallDoughnutChart() {
    const bodyStyle = getComputedStyle(document.body);
    const mainColor = bodyStyle.getPropertyValue('--mainColor').trim();
    const secondaryColor = bodyStyle.getPropertyValue('--color2Dark20').trim();
    const shadowColor = bodyStyle.getPropertyValue('--color2Dark20Transparent').trim();

    const overlappingSegments = {
        id: 'overlappingSegments',
        afterDatasetsDraw: (chart: any) => {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            const arc = meta.data[0] as any;

            // Calculate the angle at which the first data segment ends
            const endAngle = arc.startAngle + arc.circumference;

            // Calculate the positions of the dots
            const dotRadius = (arc.outerRadius - arc.innerRadius) / 2;
            const dot1X = arc.x + (arc.outerRadius - dotRadius) * Math.cos(arc.startAngle);
            const dot1Y = arc.y + (arc.outerRadius - dotRadius) * Math.sin(arc.startAngle);
            const dot2X = arc.x + (arc.outerRadius - dotRadius) * Math.cos(endAngle);
            const dot2Y = arc.y + (arc.outerRadius - dotRadius) * Math.sin(endAngle);
            // Calculate the radius of the dots based on the inner and outer radius

            // Draw the first dot
            ctx.beginPath();
            ctx.arc(dot1X, dot1Y, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = mainColor;
            ctx.fill();

            // Draw the second dot with a shadow
            ctx.beginPath();
            ctx.arc(dot2X, dot2Y, dotRadius, 0, Math.PI * 2);
            ctx.shadowColor = shadowColor;
            ctx.shadowBlur = dotRadius;
            const shadowOffset = 5;
            ctx.shadowOffsetX = shadowOffset * Math.cos(endAngle + Math.PI/2);
            ctx.shadowOffsetY = shadowOffset * Math.sin(endAngle + Math.PI/2);
            ctx.fill();

            // Reset the shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
    };

    const doughnutBackground = {
        id: 'doughnutBackground',
        beforeDraw: (chart: any) => {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            const arc = meta.data[0] as any;
    
            // Calculate the cutout radius
            const cutoutRadius = arc.outerRadius * 0.6;
    
            ctx.beginPath();
            ctx.arc(arc.x, arc.y, arc.outerRadius, 0, Math.PI * 2);
            ctx.arc(arc.x, arc.y, cutoutRadius, 0, Math.PI * 2, true);
            ctx.fillStyle = secondaryColor;
            ctx.fill();
        }
    };

    return (
        <div className="small-doughnut-chart">
            <Doughnut
                data={{
                    labels: ['filed', 'transparent'],
                    datasets: [
                        {
                            data: [75, 25],
                            backgroundColor: [mainColor, 'transparent'],
                            hoverBackgroundColor: [mainColor, 'transparent'],
                            borderWidth: 0,
                            borderRadius: 0,
                        }
                    ]
                }}

                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: "60%",
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                }}

                plugins={[
                    overlappingSegments,
                    doughnutBackground
                ]}

                // width={'100%'}
                // height={'100%'}
            />
        </div>
    );
}
