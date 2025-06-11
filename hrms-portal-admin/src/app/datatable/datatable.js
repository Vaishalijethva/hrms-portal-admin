import React from "react";
import DataTable from "react-data-table-component";

const columns = [
    {name: "Employee ID", selector: (row) => row.employeeid, sortable:true},
    {name: "Employee Name", selector: (row) => row.emoloyeename, sortable:true},
    {name: "Designtion", selector: (row) => row.designtion, sortable:true},
    {name: "Department", selector: (row) => row.department, sortable:true},
    {name: "Joining Date", selector: (row) => row.joiningdate, sortable:true},
    {name: "Email", selector: (row) => row.email, sortable: true},
    {name: "Phone", selector: (row) => row.phone, sortable:true},
    {name: "Employee Type", selector: (row) => row.employeetype, sortable:true}
]

const data = [
    {employeeid: '1234694', employeename: 'Alex Taylor', designtion: 'UI/UX Designer', department: 'Software Web', joiningdate: '02/05/2023', email: 'alex@email.com', phone: '+91 0000000000', employeetype: 'Permanent' }
]

export default function DataTable(){

     return(
        <>
        <div>

            <DataTable title="Employee Data" columns={columns} data={data} pagination highlighOnHover />
        </div>

        </>
     )
}