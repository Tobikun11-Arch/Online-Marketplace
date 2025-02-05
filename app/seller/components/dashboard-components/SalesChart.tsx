import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { ChartData } from '../../types/product'

// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface DataChartProps {
    Chart?: ChartData[]
}

const SalesChart = ({ Chart }: DataChartProps) => {
    const data_sale = Chart?.map(data=> data.Sales)

    const data = {
        labels: ['October', 'November', 'December', 'January', 'February'], // X-axis labels
        datasets: [
        {
            label: 'Sales', // Label for the line
            data: [0, 0, 0, 0, data_sale], // Y-axis data points
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Line fill color
            borderWidth: 2, // Line thickness
            tension: 0.4, // Curve the line
        },
        ],
    }

    // Options for the chart (you can customize as needed)
    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top' as const, // Ensure position is one of the accepted values
        },

        },
    }

    return (
        <div className='w-full sm:h-72 flex justify-center'>
        <Line data={data} options={options} />
        </div>
    )
}

export default SalesChart
