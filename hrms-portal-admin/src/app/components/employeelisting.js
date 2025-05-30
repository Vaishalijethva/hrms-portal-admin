import React, {useState} from "react";
import Link from "next/link";

export default function EmployeeListing() {
    return (
        <>
            <div className="">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Employee Listing</h1>
                    <Link href="/EmployeeInformationForm" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        
                    </Link>
                </div>

                {/* <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Position</th>
                            <th className="border px-4 py-2">Department</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        <tr>
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">John Doe</td>
                            <td className="border px-4 py-2">Software Engineer</td>
                            <td className="border px-4 py-2">Engineering</td>
                            <td className="border px-4 py-2">
                                <Link href="/edit/1" className="text-blue-500 hover:underline">Edit</Link> | 
                                <Link href="/delete/1" className="text-red-500 hover:underline ml-2">Delete</Link>
                            </td>
                        </tr>
                       
                    </tbody>
                </table> */}
            </div>
        </>
    )
}