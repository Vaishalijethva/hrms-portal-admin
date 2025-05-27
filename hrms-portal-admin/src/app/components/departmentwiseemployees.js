import React, {useState, useEffect} from "react";
import dynamic from "next/dynamic"; 
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DepartmentWiseEmployees() {
    const [isOpen, setIsOpen] = useState(true);
    
    useEffect(() => {
        setIsOpen(true);
            }, 
        []);

    const chartOptions = {
        chart: {
            type: "bar",
            height: 300, 
            toolbar: {show: false},
        },
        plotOptions: {
            bar: {
                columnWidth: "35%", 
                borderRadius: 6,
                borderRadiusApplication: "end",
            }
        },
        dataLabels: {
            enabled: false,
        },
        color: ["#1890FF"],
        xaxis: {
            categories: ["Accounts", "Admin", "AI/ML", "Sales", "HR", "Java", "Mobile", ".Net", "NOC", "PHP", "QA", "Soft. Web"],
            labels: {
                style: {
                    fontSize: "12px",
                    fontWeight: 500,
                    colors: "#555555",
                },
            },
        },
        yaxis: {
            title: { text: "" },
            labels: {
                style: {
                    fontSize: "12px",
                    fontWeight: 500,
                    colors: "#555555",
                },
            },
        },
        grid: {
            // strokeDashArray: 4,
            borderColor: "#E5E7EB"
        },
        tooltip: {
            y: {
                formatter: (val) =>` ${val} Employees`,
            },
        },
    };

    const chartSeries = [
        {
            name: "Employees", 
            data: [20, 33, 37, 25, 14, 24, 30, 36, 17, 38, 23, 28],
        },
    ];

    return(
        <>
        <div className={`bg-white p-4 rounded-xl shadow w-full col-span-2 ${isOpen ? 'max-w-[984px] ' : 'max-w-[800px]'}  mr-[15px] mx-auto `}>
            <h2 className="text-sm font-semibold mb-3">Department wise Employees</h2>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={300}
            />
        </div>
        </>
    )
}