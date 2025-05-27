import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function GenderRatioChart() {
    const [ischartshow, setIsChartShow] = useState(true);

    useEffect(() => { setIsChartShow(true)}, []);

    const male = 851;
    const female = 387;
    const total = male + female;

    const series = [male, female];
    // const percentages = series.map((val) => Math.round((val / total) * 100));
    const options = {
        chart: {
            type: "donut",
            height: 300, 
            // width: "100%", 
            // offsetY: 20,
        },
        labels: ["Male", "Female"],
        legend: { show: false },
        stroke: {
            // width: 0,
        },
        colors: ["#2196F3", "#1A237E"],
        dataLabels: {
            enabled: true,
            // formatter: (val) => `${Math.round(val)}%`,
            style: {
                fontSize: "12px",
                fontWeight: "bold",
            },
            dropShadow: {
                enabled: false,
            },
        },
        plotOptions: {
            pie: {
                startAngle: -90, // Start angle for half-circle
                endAngle: 90, // End angle for half-circle
                offsetY: 0, // Adjusted for centering
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        // name: { show: false },
                        // value: {
                        //     show: true,
                        //     fontSize: "22px",
                        //     fontWeight: "bold",
                        //     color: "#000",
                        //     offsetY: 20,
                        //     formatter: () => "100%",
                        // },
                        total: {
                            show: false,
                        },
                    },
                },
            },
        },
        tooltip: {
            enabled: false,
        },
        stroke: {
            width: 0,
          },
    };

    return (
<>
        



        <div className="bg-white rounded-lg p-4 shadow w-full">
            {ischartshow && (
                <>
                <h2 className="text-lg font-semibold mb-2">Gender Ratio</h2>
                <div className="relative w-full h-[250px]">
                    <Chart options={options} series={series} type="donut" height={400} /> {/* Adjusted height */}
                </div>
                <div className="flex items-start justify-around mt-2 text-center">
                    <div>
                        <p className="text-sm text-gray-500">Total Employees</p>
                        <p className="text-xl font-bold">{total}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Male</p>
                        <p className="text-xl font-bold">{male}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Female</p>
                        <p className="text-xl font-bold">{female}</p>
                    </div>
                </div>
                </>
            )}
        </div>
        </>
    );
   
}
