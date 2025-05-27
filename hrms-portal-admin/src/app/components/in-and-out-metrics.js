import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic"; 
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function InOutMetrics(){
    const [isClient, setIsClient] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        // setIsClient(true);
        setIsOpen(true);
    }, []);
    const options = {
        chart: {
          type: "bar",
          height: 300,
          stacked: false,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: "35%",
            borderRadius: 6,
            borderRadiusApplication: "end",
          },
        },
        colors: ["#1890FF", "#A0AEC0"], // Blue and Gray
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          labels: {
            style: {
              fontSize: "12px",
              colors: "#000",
            },
          },
        },
        yaxis: {
        //   min: -15,
        //   max: 20,
          labels: {
            style: {
              fontSize: "12px",
              colors: "#6B7280",
            },
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          
          markers: {
            radius: 4,
          },
          labels: {
            colors: "#333",
          },
        },
        grid: {
          borderColor: "#E5E7EB",
          strokeDashArray: 4,
          borderRadiusApplication: "end",
        },
        tooltip: {
          y: {
            formatter: (val) => `${Math.abs(val)} Employees`,
          },
        },
      };
    
      const series = [
        {
          name: "Employees Hired",
          data: [10, 7, 9, 13, 11, 10, 5, 15],
        },
        {
          name: "Employees Left",
          data: [-4, -6, -4, -7, -12, -6, -3, -8],
        },
      ];
    

    return(
        <>
        <div className={`bg-white p-4 rounded-xl shadow ${isOpen ? 'max-w-[482px]' : 'max-w-[400px]'} w-full `}>
          <h2 className="text-sm font-semibold mb-3">In and Out Metrics</h2>
          <Chart options={options} series={series} type="bar" height={300} />
        </div>
        </>
    )
}