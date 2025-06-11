"use client";
import React,{useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import addicon from "../../../public/images/Icon-ion-add-circle-outline.svg";
import excelicon from "../../../public/images/excel.svg";
import pdficon from "../../../public/images/pdf.svg";
import Select from "react-select";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
// import {useTable} from "react-table";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function EmployeeListing() {

    const [designations, setDesignations] = useState([]);
    const [department, setDepartment] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = [
                'UI/UX Designer',
                'Project Manager',
                'HR Manager',
                'MEAN Stack Developer',
                'QA Engineer',
                'Sr. BDE',
                'Software Developer',
                'Data Scientist',
                'Business Analyst',
            ];
            setDesignations(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDepartment = async () => {
            const data = [
                'Software Web',
                '.Net',
                'HR',
                'Development',
                'Quality Assurance',
                'Sales',
            ];
            setDepartment(data);
        }
        fetchDepartment();
    }, []);

    const employeeData= [
        {
            id: '1234964',
            name: 'Alex Taylor',
            image: '/images/profile-img.png', 
            designation: 'UI/UX Designer',
            department: 'Software Web',
            joiningDate: '02/05/2023',
            email: 'alex@email.com',
            phone: '+91 0000000000',
            type: 'Permanent',

        }, 
        {
            id: '1234964',
            name: 'Casey Morgan',
            image: '/images/profile-img.png',
            designation: 'Project Manager',
            department: '.Net',
            joiningDate: '15/01/2015',
            email: 'casey.morgan@email.com',
            phone: '+91 0000000000',
            type: 'Permanent',
        },
        {
            id: '1234964',
            name: 'Sam Rivers',
            image: '/images/profile-img.png',
            designation: 'HR Manager',
            department: 'HR',
            joiningDate: '18/08/2018',
            email: 'sam.005@email.com',
            phone: '+91 0000000000',
            type: 'Deputed',
        },
        {
            id: '1234964',
            name: 'Jordan Lee',
            image: '/images/profile-img.png',
            designation: 'MEAN Stack Developer',
            department: 'Development',
            joiningDate: '27/03/2021',
            email: 'jordan@gmail.com',
            phone: '+91 0000000000',
            type: 'Deputed',
        },
        {
            id: '1234964',
            name: 'jamie Parker',
            image: '/images/profile-img.png',
            designation: 'QA Engineer',
            department: 'Quality Assurance',
            joiningDate: '02/05/2023',
            email: 'jamiewalker-8@gmail.com',
            phone: '+91 0000000000',
            type: 'Contracted',
        },
        {
            id: '1234964',
            name: 'william Brown',
            image: '/images/profile-img.png',
            designation: 'Sr. BDE',
            department: 'Sales',
            joiningDate: '16/09/2019',
            email: 'willliam@gmail.com',
            phone: '+91 0000000000',
            type: 'Contracted',
        },
        {
            id: '1234964',
            name: 'Grace Hall',
            image: '/images/profile-img.png',
            designation: 'Software Developer',
            department: 'Development',
            joiningDate: '24/09/2022',
            email: 'grace.hall@email.com',
            phone: '+91 0000000000',
            type: 'Remote',

        },
    ];

    const statusColor = (type) =>{
        switch (type) {
            case 'Permanent':
                return 'bg-[#CDECCF] text-[#27A22F]';
            case 'Deputed':
                return 'bg-[#DADCFD] text-[#585FDC]';
            case 'Contracted':
                return 'bg-[#E6F4FF] text-[#0E99FF]';
            case 'Remote':
                return 'bg-[#F6E4FC] text-[#B951DE]';
            default:
                return 'bg-gray-500 text-[#000]';
        }
    }

    // State for selected designation and department
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    // Filter employee data based on search term, designation, and department
    const filteredData = employeeData.filter((emp) => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            emp.name.toLowerCase().includes(search) ||
            emp.designation.toLowerCase().includes(search) ||
            emp.department.toLowerCase().includes(search) ||
            emp.email.toLowerCase().includes(search);

        const matchesDesignation = selectedDesignation
            ? emp.designation === selectedDesignation.value
            : true;
        const matchesDepartment = selectedDepartment
            ? emp.department === selectedDepartment.value
            : true;

        return matchesSearch && matchesDesignation && matchesDepartment;
    });

    // Pagination state and logic moved to main component
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // const totalData = employeeData.length;
    // const totalPages = Math.ceil(totalData / rowsPerPage);

    const handleGoToPageOne = () => setCurrentPage(1);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleRowsChange = (selectedOption) => {
        // if (selectedOption && selectedOption.value) {
            setRowsPerPage(selectedOption.value);
            setCurrentPage(1);
        // }
    };

    // Paginate filtered data
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const totalData = filteredData.length;
    const totalPages = Math.ceil(totalData / rowsPerPage);


    const options = [
        {value: 10, label: '10'},
        {value: 20, label: '20'},
        {value: 50, label: '50'},
        {value: 100, label: '100'},
    ]


    const handleChange = (selectedOption) => {
    console.log("Selected:", selectedOption);
    };

    // Handlers for select changes
    const handleDesignationChange = (option) => {
        setSelectedDesignation(option);
        setCurrentPage(1);
    };
    const handleDepartmentChange = (option) => {
        setSelectedDepartment(option);
        setCurrentPage(1);
    };

    // Reset filters
    const handleReset = () => {
        setSearchTerm('');
        setSelectedDesignation(null);
        setSelectedDepartment(null);
        setCurrentPage(1);
    };

    //export excel 
    const exportToExcel = () => {
        const wsData = employeeData.map((emp, index) => (
            {
                "Sr No" : index + 1,
                "Employee ID" : emp.id,
                "Name": emp.name,
                "Designation": emp.designation,
                "Department" : emp.department,
                "JoiningDate" : emp.joiningDate,
                "email" : emp.email, 
                "phone" : emp.phone,
                "Type" : emp.type
            }
        ));
        const worksheet = XLSX.utils.json_to_sheet(wsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

        XLSX.writeFile(workbook, "employee_list.xlsx");
    }

    //export pdf
    const exportToPDF = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "Sr No",
            "Employee ID",
            "Name",
            "Designation", 
            "Department",
            "Joining Date",
            "Email",
            "Phone",
            "Type"
        ];

        const tableRows = employeeData.map((emp, index) => [
            index + 1,
            emp.id,
            emp.name,
            emp.designation,
            emp.department,
            emp.joiningDate,
            emp.email,
            emp.phone,
            emp.type
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            style: {fontSize:8},
        });

        doc.text("Employee List", 14, 15);
        doc.save("employee_list.pdf");
    }

    return (
        <>
            <div className="p-[20px] bg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Employee Listing</h1>
                    <Link href="/EmployeeInformationForm" className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                         <Image src={addicon} alt="add icon" className="mr-[10px]"/> Create New Employee
                    </Link>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <div className="flex gap-4 items-center justify-start  ">
                        <input
                            type="text"
                            placeholder="Search here"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 max-w-[256px]"
                        />
                        <Select
                            options={designations.map(d => ({ label: d, value: d }))}
                            value={selectedDesignation}
                            onChange={handleDesignationChange}
                            isClearable
                            placeholder="Select Designation"
                            className="w-full h-[45px] text-[14px] px-0 py-0"
                            classNamePrefix="custom-select h-[45px]"
                        />
                        <Select
                            options={department.map(d => ({ label: d, value: d }))}
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            isClearable
                            placeholder="Select Department"
                            className="w-full h-[45px] text-[14px] px-0 py-0"
                            classNamePrefix="custom-select h-[45px]"
                        />
                        <div className="flex gap-3">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => setCurrentPage(1)}
                            >
                                Search
                            </button>
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>
                        <div className="flex items-center w-full justify-end gap-2">
                            <span className="text-[14px] leading-[16px] ">Export :</span>
                            <div className="export-type flex items-center justify-center gap-2 border border-[#0E99FF] rounded-[100%] px-2 py-2 w-[36px] h-[36px] cursor-pointer" onClick={exportToExcel}>
                                <Image src={excelicon} alt="Export to Excel" />
                            </div>
                            <div className="export-type flex items-center justify-center gap-2 border border-[#0E99FF] rounded-[100%] px-2 py-2 w-[36px] h-[36px] cursor-pointer" onClick={exportToPDF}>
                                <Image src={pdficon} alt="export to pdf" />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto mt-4 bg-white shadow rounded-md">
                        <table className="min-w-full text-sm text-left text-gray-700 w-full">
                            <thead className="bg-[#E6F4FF] text-[#323232] uppercase text-xs w-full">
                                <tr>
                                    <th className="py-[13px] pl-[20px]">Sr. No.</th>
                                    <th className="py-[13px] pl-[20px]">Employee ID</th>
                                    <th className="py-[13px] pl-[20px]">Employee Name</th>
                                    <th className="py-[13px] pl-[20px]">Designation</th>
                                    <th className="py-[13px] pl-[20px]">Department</th>
                                    <th className="py-[13px] pl-[20px]">Joining Date</th>
                                    <th className="py-[13px] pl-[20px]">Email</th>
                                    <th className="py-[13px] pl-[20px]">Phone</th>
                                    <th className="py-[13px] pl-[20px]">Employment Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((emp, index) =>(
                                    <tr key={index} className="border-t border-[#D4D4D4] first:border-t-0">
                                        <td className="py-[13px] pl-[20px]">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                        <td className="py-[13px] pl-[20px]">{emp.id}</td>
                                        <td className="py-[13px] pl-[20px] flex items-center"><img src={emp.image} alt="" className="w-8 h-8 rounded-full mr-[10px]" />{emp.name}</td>
                                        <td className="py-[13px] pl-[20px]">{emp.designation}</td>
                                        <td className="py-[13px] pl-[20px]">{emp.department}</td>
                                        <td className="py-[13px] pl-[20px]">{emp.joiningDate}</td>
                                        <td className="py-[13px] pl-[20px]">{emp.email}</td>
                                        <td className="py-[13px] pl-[20px]">{emp.phone}</td>
                                        <td className="py-[13px] pl-[20px]"><span className={`px-3 py-1 text-xs rounded-[5px] ${statusColor(emp.type)}`}>{emp.type}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between gap-6 mt-[15px]">
                        <div className="flex items-center">
                            <span className="whitespace-nowrap mr-[15px]">Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, totalData)} of {totalData} records</span>
                            <span className="mr-2">Show</span>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2"
                                value={rowsPerPage}
                                onChange={e => {
                                    setRowsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={handlePrev} className="pl-[20px] pr-[25px] py-[9px] border rounded hover:bg-gray-100 cursor-pointer" disabled={currentPage === 1}> <FontAwesomeIcon icon={faAngleLeft}  className="pr-[10px]"/> Previous Page </button>
                            <button onClick={handleNext} className="pl-[25px] pr-[20px] py-[9px] bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" disabled={currentPage === totalPages}>  Next Page <FontAwesomeIcon icon={faAngleRight}  className="pl-[10px]"/></button>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={handleGoToPageOne} className="underline text-[#0E99FF]">Go to Page 1</button>
                            <span>{currentPage} of {totalPages}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}