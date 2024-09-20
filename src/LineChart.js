import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registering components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const downsampleData = (data, targetPoints) => {
    const blockSize = Math.floor(data.length / targetPoints);
    const downsampledData = [];
    const downsampledIndices = [];

    for (let i = 0; i < data.length; i += blockSize) {
        const dataBlock = data.slice(i, i + blockSize);
        const averageData = dataBlock.reduce((sum, value) => sum + value, 0) / dataBlock.length;
        downsampledData.push(averageData);
        downsampledIndices.push(i);
    }

    return { downsampledData, downsampledIndices };
};

const LineChart = ({ chartData = [] }) => {
    const targetPoints = 1000;
    const initialLabels = chartData.map((_, index) => index);
    const { downsampledData, downsampledIndices } = chartData.length > targetPoints
        ? downsampleData(chartData, targetPoints)
        : { downsampledData: chartData, downsampledIndices: initialLabels };

    const data = {
        labels: downsampledIndices.length > 0 ? downsampledIndices : [...Array(10).keys()],
        datasets: [
            {
                label: 'Samples',
                data: downsampledData.length > 0 ? downsampledData : [0, 0, 0, 0, 0, 0, 0],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 1)', // Solid color for line
                borderWidth: 1, // Thin line
                tension: 0.4, // Smooth line
                pointRadius: 0, // No points
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'File Upload Data Chart',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
