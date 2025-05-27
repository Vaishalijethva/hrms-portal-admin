import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; 
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TenurePieChart() { 
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
      }, []);

    const series = [18, 20, 22, 26, 31];
    const options = {
        width: 380,
        chart: {
        type: "polarArea",
        offsetY: 30,
        offsetX: 0,
        },
        labels: ["0-3 Years", "3-5 Years", "5-10 Years", "10-15 Years", "15+ Years"],
        fill: {
            opacity: 1, 
            colors: ["#0E99FF", "#F35D82", "#8559DE", "#F6AF81", "#192C5E"],
        },
        // stroke : {width: 1},
        stroke : { show: false},
        
        legend: {
            show:true,
            position: "right",
            fontSize: "14px",
            offsetY: 50,
            offserX: 50,
            labels: {
                colors: "#323232",
                useSeriesColors: false,
            },
            markers: { width: 12,
                height: 12,
                radius: 6},
        },
        plotOptions: {
            polarArea: {
                rings: {
                  strokeWidth: 0
                },
                spokes: {
                  strokeWidth: 0
                },
            }
        },
        dataLabels: {
            enabled: false
        }
        
    };
    return(
        <>
        <div className="bg-white rounded-lg p-4 shadow w-full">
            <h2 className="text-lg font-semibold mb-2">Employee Tenure Breakdown</h2>
            <div className="relative w-full h-[250px]">
                <div id="chart">
                    {isClient && (
                    <Chart options={options} series={series} type="polarArea" height={300} />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}
