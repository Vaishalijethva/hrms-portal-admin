import React,{useState} from "react";
import dynamic from "next/dynamic"; 
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StaffDistributionChart() { 
    const series = [{ 
        data: [420, 200, 300]
    }];

    const options = {
        chart: {
            type: "bar",
            toolbar: {show: false}
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 6, 
                border: 1,
                borderRadiusApplication: "left",
                barHeight: '25%',
            }
        },
        dataLabels: { 
            enabled: false
        },
        xaxis: {
            categories: ["Permanent", "Deputed", "Contracted"],
        }, 
        colors: ['#0E99FF'],
        grid: {
            xaxis: { line: {show: true}},
            yaxis: { lines: {show: true}},
        }
    }
    return (
        <>
        <div className="bg-white rounded-lg p-4 shadow w-full">
            <h2 className="text-lg font-semibold mb-2">Staff Distribution</h2>
            <Chart options={options} series={series} type="bar" height={300} />
        </div>
        </>
    )
}