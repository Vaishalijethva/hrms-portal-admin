"use client";
import React,{ useState } from "react";
import Link from "next/link";
import { Calendar, ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// Custom Select Component
const CustomSelect = ({
  options = [],
  placeholder = "Select",
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-2 text-left border border-[#D4D4D4] bg-[#FFF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-500">{value || placeholder}</span>
        <ChevronDown className="w-4 h-4 text-gray-500 text-[#0E99FF]" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#FFF] border border-[#D4D4D4] rounded-md shadow-lg overflow-hidden">
          {options.map((option) => (
            <div
              key={option}
              className="px-3 py-2 cursor-pointer hover:bg-[#9DD7FF]"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom File Upload Component
const FileUpload = ({ onChange }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileSelection = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Create preview for image files
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }

      // Call the parent onChange function
      if (onChange) {
        onChange(selectedFile);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full border border-gray-300 rounded-md">
      <div className="flex flex-col items-center justify-center p-4">
        {preview ? (
          <div className="w-20 h-20 mb-2 overflow-hidden border rounded-md">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 mb-2 text-gray-400 flex items-center justify-center border border-dashed rounded-md">
            <svg
              className="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <p className="text-sm text-gray-500">
          {file ? file.name : "No file chosen"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          (Only GIF, PNG, JPEG, PDF, BMP and JPG format allow. Max Size Allow 5
          Mb.)
        </p>
        <button
          type="button"
          className="px-3 py-1 mt-2 text-sm text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
          onClick={() => document.getElementById("file-upload").click()}
        >
          Choose File
        </button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileSelection}
          accept=".gif,.png,.jpeg,.jpg,.pdf,.bmp"
        />
      </div>
    </div>
  );
};

// DatePicker Component
const DatePicker = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
    </div>
  );
};

// Main EmployeeInformationForm Component
const EmployeeInformationForm = () => {
  const [activeTab, setActiveTab] = useState("Primary Details");
  const [progress, setProgress] = useState(75);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    employeeCode: "E16216",
    joinDate: "28/08/2018",
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    nameAsPerAadhaar: "Aayushi Shyamanand",
    fatherName: "Shyamanand Sah",
    employmentType: "",
    unit: "HR",
    division: "Workman",
    department: "Section IX",
    designation: "Assistant",
    workLocation: "Head Office",
    dateOfBirth: "",
    gender: "",
    religion: "",
    nationality: "",
    serviceAgreement: "",
    aadhaarNo: "",
    panNo: "",
    esicNo: "",
    uanNo: "",
    pfNo: "",
    maritalStatus: "",
    bloodGroup: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileChange = (selectedFile) => {
    // Check file size (5MB limit)
    const fileSizeInMB = selectedFile.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    // Set file in form data
    setFormData({
      ...formData,
      profilePhoto: selectedFile,
    });
  };

  const tabs = [
    "Primary Details",
    "Contact & Bank Details",
    "Employment",
    "Family",
    "Other",
  ];

  const genderOptions = ["Male", "Female", "Other"];
  const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Others"];
  const nationalityOptions = ["Indian", "Others"];
  const employmentTypeOptions = ["Full-time", "Part-time", "Contract"];
  const serviceAgreementOptions = ["Yes", "No"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const salutationOptions = ["Mr.", "Mrs.", "Ms.", "Dr."];

  const [showModel, setShowModal] = useState(false);

  return (
    <div className="bg-[#F8FBFE] p-6 rounded-lg shadow-sm overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-700 mb-[5px]">
            Employee Information
          </h1>
          <div className="flex items-center text-sm text-[#888888] text-[12px] leading-[14px] font-normal">
            <span>Employee Dashboard</span>
            <span className="mx-2 bg-[#0E99FF] border border-transparent w-[5px] h-[5px] rounded-[50%]"></span>
            <span>Employee Management</span>
            <span className="mx-2 bg-[#0E99FF] border border-transparent w-[5px] h-[5px] rounded-[50%]"></span>
            <span className="inline text-[#323232] ">Employee Information</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3 text-sm">{progress}% Progress</div>
          <div className="w-16 h-16 rounded-full relative">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeDasharray={`${progress}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div>
        {activeTab === "Primary Details" && (
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {/* Profile Photo */}
              <div className="col-span-1">
                <div className="mb-1 text-sm font-medium">Profile Photo</div>
                <FileUpload onChange={handleFileChange} />
              </div>

              {/* First Row */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="mb-1 text-sm font-medium">
                      Employee Code <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.employeeCode}
                      onChange={(e) =>
                        handleInputChange("employeeCode", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Join Date <span className="text-red-500">*</span>
                    </div>
                    <DatePicker
                      value={formData.joinDate}
                      onChange={(value) => handleInputChange("joinDate", value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Salutation <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                </div>
                {/* Name Fields */}
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      First Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Middle Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={(e) =>
                        handleInputChange("middleName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Aadhaar and Father Name */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Name As Per Aadhaar <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.nameAsPerAadhaar}
                    onChange={(e) =>
                      handleInputChange("nameAsPerAadhaar", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Father Name <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.fatherName}
                    onChange={(e) =>
                      handleInputChange("fatherName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Employment Type <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={employmentTypeOptions}
                    placeholder="Select"
                    value={formData.employmentType}
                    onChange={(value) => handleInputChange("employmentType", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Unit <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                  />
                </div>
              </div>

              {/* Unit, Division, Department */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Division <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.division}
                    onChange={(e) => handleInputChange("division", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["HR", "Finance", "Operations", "IT", "Section IX"]}
                    placeholder="Select"
                    value={formData.department}
                    onChange={(value) => handleInputChange("department", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Designation <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Work Location <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["Head Office", "Branch Office", "Remote"]}
                    placeholder="Select"
                    value={formData.workLocation}
                    onChange={(value) => handleInputChange("workLocation", value)}
                  />
                </div>
              </div>

              {/* Work Location, DOB, Gender */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </div>
                  <DatePicker
                    value={formData.dateOfBirth}
                    onChange={(value) => handleInputChange("dateOfBirth", value)}
                    placeholder="--/--/----"
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Gender <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={genderOptions}
                    placeholder="Select"
                    value={formData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Religion <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={religionOptions}
                    placeholder="Select"
                    value={formData.religion}
                    onChange={(value) => handleInputChange("religion", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Nationality <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={nationalityOptions}
                    placeholder="Select"
                    value={formData.nationality}
                    onChange={(value) => handleInputChange("nationality", value)}
                  />
                </div>
              </div>

              {/* Nationality, Service Agreement, Aadhaar */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Service Agreement <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={serviceAgreementOptions}
                    placeholder="Select"
                    value={formData.serviceAgreement}
                    onChange={(value) =>
                      handleInputChange("serviceAgreement", value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Aadhaar No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter aadhaar no."
                    value={formData.aadhaarNo}
                    onChange={(e) => handleInputChange("aadhaarNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    PAN No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PAN no."
                    value={formData.panNo}
                    onChange={(e) => handleInputChange("panNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">ESIC No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter ESIC no."
                    value={formData.esicNo}
                    onChange={(e) => handleInputChange("esicNo", e.target.value)}
                  />
                </div>
              </div>

              {/* ESIC, UAN, PF */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">UAN No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter UAN no."
                    value={formData.uanNo}
                    onChange={(e) => handleInputChange("uanNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">PF No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PF no."
                    value={formData.pfNo}
                    onChange={(e) => handleInputChange("pfNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">Marital Status</div>
                  <CustomSelect
                    options={maritalStatusOptions}
                    placeholder="Select"
                    value={formData.maritalStatus}
                    onChange={(value) => handleInputChange("maritalStatus", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Blood Group <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={bloodGroupOptions}
                    placeholder="Select"
                    value={formData.bloodGroup}
                    onChange={(value) => handleInputChange("bloodGroup", value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="col-span-4 flex space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setShowModal(true)}
                >
                  Save & Next
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Contact & Bank Details" && (
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-4">
            Contact & Bank Details
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {/* Profile Photo */}
              <div className="col-span-1">
                <div className="mb-1 text-sm font-medium">Profile Photo</div>
                <FileUpload onChange={handleFileChange} />
              </div>

              {/* First Row */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="mb-1 text-sm font-medium">
                      Employee Code <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.employeeCode}
                      onChange={(e) =>
                        handleInputChange("employeeCode", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Join Date <span className="text-red-500">*</span>
                    </div>
                    <DatePicker
                      value={formData.joinDate}
                      onChange={(value) => handleInputChange("joinDate", value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Salutation <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                </div>
                {/* Name Fields */}
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      First Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Middle Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={(e) =>
                        handleInputChange("middleName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Aadhaar and Father Name */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Name As Per Aadhaar <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.nameAsPerAadhaar}
                    onChange={(e) =>
                      handleInputChange("nameAsPerAadhaar", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Father Name <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.fatherName}
                    onChange={(e) =>
                      handleInputChange("fatherName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Employment Type <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={employmentTypeOptions}
                    placeholder="Select"
                    value={formData.employmentType}
                    onChange={(value) => handleInputChange("employmentType", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Unit <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                  />
                </div>
              </div>

              {/* Unit, Division, Department */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Division <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.division}
                    onChange={(e) => handleInputChange("division", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["HR", "Finance", "Operations", "IT", "Section IX"]}
                    placeholder="Select"
                    value={formData.department}
                    onChange={(value) => handleInputChange("department", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Designation <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Work Location <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["Head Office", "Branch Office", "Remote"]}
                    placeholder="Select"
                    value={formData.workLocation}
                    onChange={(value) => handleInputChange("workLocation", value)}
                  />
                </div>
              </div>

              {/* Work Location, DOB, Gender */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </div>
                  <DatePicker
                    value={formData.dateOfBirth}
                    onChange={(value) => handleInputChange("dateOfBirth", value)}
                    placeholder="--/--/----"
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Gender <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={genderOptions}
                    placeholder="Select"
                    value={formData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Religion <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={religionOptions}
                    placeholder="Select"
                    value={formData.religion}
                    onChange={(value) => handleInputChange("religion", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Nationality <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={nationalityOptions}
                    placeholder="Select"
                    value={formData.nationality}
                    onChange={(value) => handleInputChange("nationality", value)}
                  />
                </div>
              </div>

              {/* Nationality, Service Agreement, Aadhaar */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Service Agreement <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={serviceAgreementOptions}
                    placeholder="Select"
                    value={formData.serviceAgreement}
                    onChange={(value) =>
                      handleInputChange("serviceAgreement", value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Aadhaar No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter aadhaar no."
                    value={formData.aadhaarNo}
                    onChange={(e) => handleInputChange("aadhaarNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    PAN No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PAN no."
                    value={formData.panNo}
                    onChange={(e) => handleInputChange("panNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">ESIC No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter ESIC no."
                    value={formData.esicNo}
                    onChange={(e) => handleInputChange("esicNo", e.target.value)}
                  />
                </div>
              </div>

              {/* ESIC, UAN, PF */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">UAN No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter UAN no."
                    value={formData.uanNo}
                    onChange={(e) => handleInputChange("uanNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">PF No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PF no."
                    value={formData.pfNo}
                    onChange={(e) => handleInputChange("pfNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">Marital Status</div>
                  <CustomSelect
                    options={maritalStatusOptions}
                    placeholder="Select"
                    value={formData.maritalStatus}
                    onChange={(value) => handleInputChange("maritalStatus", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Blood Group <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={bloodGroupOptions}
                    placeholder="Select"
                    value={formData.bloodGroup}
                    onChange={(value) => handleInputChange("bloodGroup", value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="col-span-4 flex space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setShowModal(true)}
                >
                  Save & Next
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Employment" && (
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-4">
            {/* Contact & Bank Details */}
            {activeTab}
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {/* Profile Photo */}
              <div className="col-span-1">
                <div className="mb-1 text-sm font-medium">Profile Photo</div>
                <FileUpload onChange={handleFileChange} />
              </div>

              {/* First Row */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="mb-1 text-sm font-medium">
                      Employee Code <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.employeeCode}
                      onChange={(e) =>
                        handleInputChange("employeeCode", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Join Date <span className="text-red-500">*</span>
                    </div>
                    <DatePicker
                      value={formData.joinDate}
                      onChange={(value) => handleInputChange("joinDate", value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Salutation <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                </div>
                {/* Name Fields */}
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      First Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Middle Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={(e) =>
                        handleInputChange("middleName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Aadhaar and Father Name */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Name As Per Aadhaar <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.nameAsPerAadhaar}
                    onChange={(e) =>
                      handleInputChange("nameAsPerAadhaar", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Father Name <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.fatherName}
                    onChange={(e) =>
                      handleInputChange("fatherName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Employment Type <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={employmentTypeOptions}
                    placeholder="Select"
                    value={formData.employmentType}
                    onChange={(value) => handleInputChange("employmentType", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Unit <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                  />
                </div>
              </div>

              {/* Unit, Division, Department */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Division <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.division}
                    onChange={(e) => handleInputChange("division", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["HR", "Finance", "Operations", "IT", "Section IX"]}
                    placeholder="Select"
                    value={formData.department}
                    onChange={(value) => handleInputChange("department", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Designation <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Work Location <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["Head Office", "Branch Office", "Remote"]}
                    placeholder="Select"
                    value={formData.workLocation}
                    onChange={(value) => handleInputChange("workLocation", value)}
                  />
                </div>
              </div>

              {/* Work Location, DOB, Gender */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </div>
                  <DatePicker
                    value={formData.dateOfBirth}
                    onChange={(value) => handleInputChange("dateOfBirth", value)}
                    placeholder="--/--/----"
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Gender <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={genderOptions}
                    placeholder="Select"
                    value={formData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Religion <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={religionOptions}
                    placeholder="Select"
                    value={formData.religion}
                    onChange={(value) => handleInputChange("religion", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Nationality <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={nationalityOptions}
                    placeholder="Select"
                    value={formData.nationality}
                    onChange={(value) => handleInputChange("nationality", value)}
                  />
                </div>
              </div>

              {/* Nationality, Service Agreement, Aadhaar */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Service Agreement <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={serviceAgreementOptions}
                    placeholder="Select"
                    value={formData.serviceAgreement}
                    onChange={(value) =>
                      handleInputChange("serviceAgreement", value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Aadhaar No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter aadhaar no."
                    value={formData.aadhaarNo}
                    onChange={(e) => handleInputChange("aadhaarNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    PAN No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PAN no."
                    value={formData.panNo}
                    onChange={(e) => handleInputChange("panNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">ESIC No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter ESIC no."
                    value={formData.esicNo}
                    onChange={(e) => handleInputChange("esicNo", e.target.value)}
                  />
                </div>
              </div>

              {/* ESIC, UAN, PF */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">UAN No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter UAN no."
                    value={formData.uanNo}
                    onChange={(e) => handleInputChange("uanNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">PF No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PF no."
                    value={formData.pfNo}
                    onChange={(e) => handleInputChange("pfNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">Marital Status</div>
                  <CustomSelect
                    options={maritalStatusOptions}
                    placeholder="Select"
                    value={formData.maritalStatus}
                    onChange={(value) => handleInputChange("maritalStatus", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Blood Group <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={bloodGroupOptions}
                    placeholder="Select"
                    value={formData.bloodGroup}
                    onChange={(value) => handleInputChange("bloodGroup", value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="col-span-4 flex space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setShowModal(true)}
                >
                  Save & Next
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Family" && (
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-4">
            {/* Contact & Bank Details */}
            {activeTab}
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {/* Profile Photo */}
              <div className="col-span-1">
                <div className="mb-1 text-sm font-medium">Profile Photo</div>
                <FileUpload onChange={handleFileChange} />
              </div>

              {/* First Row */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="mb-1 text-sm font-medium">
                      Employee Code <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.employeeCode}
                      onChange={(e) =>
                        handleInputChange("employeeCode", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Join Date <span className="text-red-500">*</span>
                    </div>
                    <DatePicker
                      value={formData.joinDate}
                      onChange={(value) => handleInputChange("joinDate", value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Salutation <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                </div>
                {/* Name Fields */}
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      First Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Middle Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={(e) =>
                        handleInputChange("middleName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Aadhaar and Father Name */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Name As Per Aadhaar <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.nameAsPerAadhaar}
                    onChange={(e) =>
                      handleInputChange("nameAsPerAadhaar", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Father Name <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.fatherName}
                    onChange={(e) =>
                      handleInputChange("fatherName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Employment Type <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={employmentTypeOptions}
                    placeholder="Select"
                    value={formData.employmentType}
                    onChange={(value) => handleInputChange("employmentType", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Unit <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                  />
                </div>
              </div>

              {/* Unit, Division, Department */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Division <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.division}
                    onChange={(e) => handleInputChange("division", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["HR", "Finance", "Operations", "IT", "Section IX"]}
                    placeholder="Select"
                    value={formData.department}
                    onChange={(value) => handleInputChange("department", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Designation <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Work Location <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["Head Office", "Branch Office", "Remote"]}
                    placeholder="Select"
                    value={formData.workLocation}
                    onChange={(value) => handleInputChange("workLocation", value)}
                  />
                </div>
              </div>

              {/* Work Location, DOB, Gender */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </div>
                  <DatePicker
                    value={formData.dateOfBirth}
                    onChange={(value) => handleInputChange("dateOfBirth", value)}
                    placeholder="--/--/----"
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Gender <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={genderOptions}
                    placeholder="Select"
                    value={formData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Religion <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={religionOptions}
                    placeholder="Select"
                    value={formData.religion}
                    onChange={(value) => handleInputChange("religion", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Nationality <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={nationalityOptions}
                    placeholder="Select"
                    value={formData.nationality}
                    onChange={(value) => handleInputChange("nationality", value)}
                  />
                </div>
              </div>

              {/* Nationality, Service Agreement, Aadhaar */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Service Agreement <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={serviceAgreementOptions}
                    placeholder="Select"
                    value={formData.serviceAgreement}
                    onChange={(value) =>
                      handleInputChange("serviceAgreement", value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Aadhaar No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter aadhaar no."
                    value={formData.aadhaarNo}
                    onChange={(e) => handleInputChange("aadhaarNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    PAN No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PAN no."
                    value={formData.panNo}
                    onChange={(e) => handleInputChange("panNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">ESIC No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter ESIC no."
                    value={formData.esicNo}
                    onChange={(e) => handleInputChange("esicNo", e.target.value)}
                  />
                </div>
              </div>

              {/* ESIC, UAN, PF */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">UAN No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter UAN no."
                    value={formData.uanNo}
                    onChange={(e) => handleInputChange("uanNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">PF No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PF no."
                    value={formData.pfNo}
                    onChange={(e) => handleInputChange("pfNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">Marital Status</div>
                  <CustomSelect
                    options={maritalStatusOptions}
                    placeholder="Select"
                    value={formData.maritalStatus}
                    onChange={(value) => handleInputChange("maritalStatus", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Blood Group <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={bloodGroupOptions}
                    placeholder="Select"
                    value={formData.bloodGroup}
                    onChange={(value) => handleInputChange("bloodGroup", value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="col-span-4 flex space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setShowModal(true)}
                >
                  Save & Next
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Other" && (
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-4">
            {/* Contact & Bank Details */}
            {activeTab}
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {/* Profile Photo */}
              <div className="col-span-1">
                <div className="mb-1 text-sm font-medium">Profile Photo</div>
                <FileUpload onChange={handleFileChange} />
              </div>

              {/* First Row */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="mb-1 text-sm font-medium">
                      Employee Code <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.employeeCode}
                      onChange={(e) =>
                        handleInputChange("employeeCode", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Join Date <span className="text-red-500">*</span>
                    </div>
                    <DatePicker
                      value={formData.joinDate}
                      onChange={(value) => handleInputChange("joinDate", value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Salutation <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                </div>
                {/* Name Fields */}
                <div className="col-span-4 grid grid-cols-3 gap-6">
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      First Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Middle Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={(e) =>
                        handleInputChange("middleName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Aadhaar and Father Name */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Name As Per Aadhaar <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.nameAsPerAadhaar}
                    onChange={(e) =>
                      handleInputChange("nameAsPerAadhaar", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Father Name <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.fatherName}
                    onChange={(e) =>
                      handleInputChange("fatherName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Employment Type <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={employmentTypeOptions}
                    placeholder="Select"
                    value={formData.employmentType}
                    onChange={(value) => handleInputChange("employmentType", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Unit <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                  />
                </div>
              </div>

              {/* Unit, Division, Department */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Division <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.division}
                    onChange={(e) => handleInputChange("division", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["HR", "Finance", "Operations", "IT", "Section IX"]}
                    placeholder="Select"
                    value={formData.department}
                    onChange={(value) => handleInputChange("department", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Designation <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Work Location <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={["Head Office", "Branch Office", "Remote"]}
                    placeholder="Select"
                    value={formData.workLocation}
                    onChange={(value) => handleInputChange("workLocation", value)}
                  />
                </div>
              </div>

              {/* Work Location, DOB, Gender */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Date of Birth <span className="text-red-500">*</span>
                  </div>
                  <DatePicker
                    value={formData.dateOfBirth}
                    onChange={(value) => handleInputChange("dateOfBirth", value)}
                    placeholder="--/--/----"
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Gender <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={genderOptions}
                    placeholder="Select"
                    value={formData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Religion <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={religionOptions}
                    placeholder="Select"
                    value={formData.religion}
                    onChange={(value) => handleInputChange("religion", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Nationality <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={nationalityOptions}
                    placeholder="Select"
                    value={formData.nationality}
                    onChange={(value) => handleInputChange("nationality", value)}
                  />
                </div>
              </div>

              {/* Nationality, Service Agreement, Aadhaar */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Service Agreement <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={serviceAgreementOptions}
                    placeholder="Select"
                    value={formData.serviceAgreement}
                    onChange={(value) =>
                      handleInputChange("serviceAgreement", value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Aadhaar No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter aadhaar no."
                    value={formData.aadhaarNo}
                    onChange={(e) => handleInputChange("aadhaarNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    PAN No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PAN no."
                    value={formData.panNo}
                    onChange={(e) => handleInputChange("panNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">ESIC No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter ESIC no."
                    value={formData.esicNo}
                    onChange={(e) => handleInputChange("esicNo", e.target.value)}
                  />
                </div>
              </div>

              {/* ESIC, UAN, PF */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">UAN No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter UAN no."
                    value={formData.uanNo}
                    onChange={(e) => handleInputChange("uanNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">PF No.</div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter PF no."
                    value={formData.pfNo}
                    onChange={(e) => handleInputChange("pfNo", e.target.value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">Marital Status</div>
                  <CustomSelect
                    options={maritalStatusOptions}
                    placeholder="Select"
                    value={formData.maritalStatus}
                    onChange={(value) => handleInputChange("maritalStatus", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Blood Group <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={bloodGroupOptions}
                    placeholder="Select"
                    value={formData.bloodGroup}
                    onChange={(value) => handleInputChange("bloodGroup", value)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="col-span-4 flex space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setShowModal(true)}
                >
                  Save & Next
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>


      {showModel && ( 
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000008c] bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-[600px]">
            <button onClick={() => setShowModal(false)} className=" float-right right-0">
              {/* Cancel */}
              <FontAwesomeIcon icon={faXmark} className="text-gray-700" />
            </button>
            

            <div className="flex items-center justify-center flex-col mt-[24px] text-center">
                <div className="thumb-icon bg-[#E6F4FF] rounded-full w-[120px] h-[120px] flex items-center justify-center mb-[30px]" >
                    <FontAwesomeIcon icon={faThumbsUp} className="text-[#0E99FF] text-[50px]"/>
                </div>
                <h4 className="text-[20px] leading-[24px] font-bold text-[#323232] mb-[5px]">Initial Profile Details Saved!</h4>
                <p className="text-[16px] leading-[20px] font-normal text-[#323232] pt-[5px] pb-[20px]">You’ve completed the first step of the employee profile setup. What would you like to do next?</p>

                <div className=" flex items-center justify-center my-[10px]">
                  <button
                    type="button"
                    className="text-[16px] leading-[16px] font-normal px-[20px] py-[10px] bg-[#0E99FF] text-white rounded-md border border-[#0E99FF] hover:bg-[#0e7eff] mr-[10px]" >
                    Complete This Profile
                  </button>
                  <button
                    type="button"
                    className="text-[16px] leading-[16px] font-normal px-[20px] py-[10px] bg-transparent border border-[#888888] text-[#888888] rounded-md hover:bg-[#a9aaaa] hover:text-[#000] ml-[10px]" >
                    Create New Profile
                  </button>
                </div>

                <Link href="/" className="text-[#323232] text-[14px] leading-[22px] font-normal mt-[10px] inline underline hover:text-[#0E99FF]">Go to Dashboard</Link>
            </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default EmployeeInformationForm;
