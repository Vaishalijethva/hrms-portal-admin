"use client";
import React,{ useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronDown, Images } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import {editicon} from "../../../public/images/editicon.svg"
import Select from "react-select";

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
        <ChevronDown className="w-4 h-4 font-bold text-[#0E99FF]" />
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
    corporatemobileno: "",
    corporateemailaddress: "",
    personalmobileno: "",
    personalemail: "",
    blockno: "",
    buildingname: "",
    streetaddress1: "",
    streetaddress2: "",
    pincode: "",
    ifsccode: "",
    bankaccountno: "",
    noticeperiod: "",
    retirementage: "",
    probationperiod: "",
    name:"",
    contactno: "",


  });



  // const handleInputChange = (field, value) => {
  //   setFormData({
  //     ...formData,
  //     [field]: value,
  //   });
  // };
const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

     if (errors[field] && value.trim()) {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  }
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

  const [supervisions, setSupervisions] = useState([
    {startDate: "", endDate: "", headofdepartment: "", reportingmanager: "" },
  ]);

  const [previousemployee, setPreviousemployee] = useState([
    {startDate:"", endDate: "", companyname:"", designation: ""},
  ]);

  const [familymember, setFamilymember] = useState([
    {name: "", relation: "", gender: "", dateofbirth: "", maritalstatus: "", contactno: "", contactedemergency: ""},
  ])

  const handleSupervisionChange = (index, field, value) => {
    const updated = [...supervisions];
    updated[index][field] = value; 
    setSupervisions(updated);
  }
  const handlePreviousemployeeChange = (index, field, value) => {
    const updated = [...previousemployee];
    updatedList[index][field] = value;
    setPreviousemployee(updated);
  }

  const handleFamilyChange = (index, field, value) => {
    const updated = [...familymember];
    updatefamilymember[index][field] = value;
    setFamilymember(updated);
  }

  const addSupervision = () => {
    setSupervisions([
      ...supervisions, 
      { startDate: "", endDate: "", headofdepartment: "", reportingmanager: ""},
    ])
  }
  const deleteSupervision = (indexToDelete) => {
    const updated = supervisions.filter((_, i) => i !== indexToDelete);
    setSupervisions(updated);
  };

  const addFamilymember = () => {
    setFamilymember([
      ...familymember,
      {name: "", relation: "", gender: "", dateofbirth: "", maritalstatus: "", contactno: "", contactedemergency: "" },
    ])
  }

  const deleteFamilymember = (indexToDelete) => {
    const updated = familymember.filter((_, i) => i !== indexToDelete);
    setFamilymember(updated);
  }
  // const addPreviousemployee = () => {
  //   setPreviousemployee([
  //     ...previousemployee,
  //     { startDate: "", endDate: "", companyname: "", designation: ""},
  //   ])
  // }

  const tabs = [
    "Primary Details",
    "Contact & Bank Details",
    "Employment",
    "Family",
    "Other",
  ];

  const contactedemergency = ["yes", "No"];
  const [selectedRadioButton, setSelectedRadioButton] = useState("");
  const genderOptions = ["Male", "Female", "Other"];
  const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Others"];
  const nationalityOptions = ["Indian", "Others"];
  const employmentTypeOptions = ["Full-time", "Part-time", "Contract"];
  const serviceAgreementOptions = ["Yes", "No"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const salutationOptions = ["Mr.", "Mrs.", "Ms.", "Dr."];
  const addresstype = ["permanent", "work"];
  const country = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Austrian Empire*", "Azerbaijan", "Baden*", "Bahamas, The", "Bahrain", "Bangladesh", "Barbados", "Bavaria*", "Belarus", "Belgium", "Belize", "Benin (Dahomey)", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Brunswick and Lüneburg*", "Bulgaria", "Burkina Faso (Upper Volta)", "Burma", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands, The", "Central African Republic", "Central American Federation* ", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo Free State, The* ", "Cook Islands", "Costa Rica", "Cote d’Ivoire (Ivory Coast)", "Croatia", "Cuba", "Cyprus", "Czechia", "Czechoslovakia*", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Duchy of Parma, The*", "East Germany (German Democratic Republic)* ", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Federal Government of Germany (1848-49)*", "Fiji", "Finland", "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Grand Duchy of Tuscany, The* ", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Hanover*", "Hanseatic Republics*", "Hawaii*", "Hesse*", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kingdom of Serbia/Yugoslavia*", "Kiribati", "Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Lew Chew (Loochoo)*", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mecklenburg-Schwerin*", "Mecklenburg-Strelitz* ", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia",
  "Nassau*", "Nauru", "Nepal", "Netherlands, The", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "North German Confederation*", "North German Union*", "North Macedonia", "Norway", "Oldenburg*", "Oman", "Orange Free State*", "Pakistan", "Palau", "Panama", "Papal States* ", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Piedmont-Sardinia*", "Poland", "Portugal", "Qatar", "Republic of Genoa*", "Republic of Korea (South Korea)", "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Schaumburg-Lippe*", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands, The", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Texas*", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Two Sicilies*", "Uganda", "Ukraine", "Union of Soviet Socialist Republics*", "United Arab Emirates, The", "United Kingdom, The", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Württemberg*", "Yemen", "Zambia", "Zimbabwe"]
  const state = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Maharashtra", "Madhya Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman & Nicobar (UT)", "Chandigarh (UT)", "Dadra & Nagar Haveli and Daman & Diu (UT)", "Delhi [National Capital Territory (NCT)]", "Jammu & Kashmir (UT)", "Ladakh (UT)", "Lakshadweep (UT)", "Puducherry (UT)"]
  const city = [ "Port Blair","Adoni", "Amaravati", "Anantapur", "Chandragiri", "Chittoor", "Dowlaiswaram", "Eluru", "Guntur", "Kadapa","Kakinada", "Kurnool", "Machilipatnam", "Nagarjunakoṇḍa", "Rajahmundry", "Srikakulam", "Tirupati", "Vijayawada", "Visakhapatnam", "Vizianagaram", "Yemmiganur", "Itanagar", "Dhuburi", "Dibrugarh", "Dispur", "Guwahati", "Jorhat", "Nagaon", "Sivasagar", "Silchar", "Tezpur", "Tinsukia", "Ara", "Barauni", "Begusarai", "Bettiah", "Bhagalpur", "Bihar Sharif", "Bodh Gaya", "Buxar", "Chapra", "Darbhanga", "Dehri", "Dinapur Nizamat", "Gaya", "Hajipur", "Jamalpur", "Katihar", "Madhubani", "Motihari", "Munger", "Muzaffarpur", "Patna", "Purnia", "Pusa", "Saharsa", "Samastipur"]
  const bankname =[ "Bank of Baroda", "State Bank of india", "Bank of India", "HDFC Bank", "ICICI Bank"]
  const bankbranchname = ["Main", "Maninagar", "Naherunagar", "Vadaj"]
  const relation = ["father", "mother", "sister", "brother"]
  const gender = ["Female", "Male", "Other"]
  const maritalstatus = ["Unmarried", "Married", "Diocese"]

  const [showModel, setShowModal] = useState(false);
  const [openModel, setOpenModel] = useState(false);
 const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};

      if(!formData.employeeCode.trim()) {newErrors.employeeCode = "Employee Code is required";}
      if(!formData.joinDate.trim()) { newErrors.joinDate = "Join Date is required"; }
      if(!formData.salutation.trim()) { newErrors.salutation = "Salutation is required"; }
      if(!formData.firstName.trim()) { newErrors.firstName = "First Name is required"; }
      if(!formData.middleName.trim()) { newErrors.middleName = "Middle Name is required"; }
      if(!formData.lastName.trim()) { newErrors.lastName = "Last Name is required"; }
      if(!formData.nameAsPerAadhaar.trim()) { newErrors.nameAsPerAadhaar = "Name as per Aadhaar is required"; }
      if(!formData.fatherName.trim()) { newErrors.fatherName = "Father's Name is required"; }
      if(!formData.employmentType.trim()) { newErrors.employmentType = "Employment Type is required"; }
      if(!formData.unit.trim()) { newErrors.unit = "Unit is required"; }
      if(!formData.division.trim()) { newErrors.division = "Division is required"; }
      if(!formData.department.trim()) { newErrors.department = "Department is required"; }
      if(!formData.designation.trim()) { newErrors.designation = "Designation is required"; }
      if(!formData.workLocation.trim()) { newErrors.workLocation = "Work Location is required"; }
      if(!formData.dateOfBirth.trim()) { newErrors.dateOfBirth = "Date of Birth is required"; }
      if(!formData.gender.trim()) { newErrors.gender = "Gender is required"; }
      if(!formData.religion.trim()) { newErrors.religion = "Religion is required"; }
      if(!formData.nationality.trim()) { newErrors.nationality = "Nationality is required"; }
      if(!formData.serviceAgreement.trim()) { newErrors.serviceAgreement = "Service Agreement is required"; }
      if(!formData.aadhaarNo.trim()) { newErrors.aadhaarNo = "Aadhaar Number is required"; }
      if(!formData.panNo.trim()) { newErrors.panNo = "PAN Number is required"; }
      if(!formData.esicNo.trim()) { newErrors.esicNo = "ESIC Number is required"; }
      if(!formData.uanNo.trim()) { newErrors.uanNo = "UAN Number is required"; }
      if(!formData.pfNo.trim()) { newErrors.pfNo = "PF Number is required"; }
      if(!formData.maritalStatus.trim()) { newErrors.maritalStatus = "Marital Status is required"; }
      if(!formData.bloodGroup.trim()) { newErrors.bloodGroup = "Blood Group is required"; }

      if(!formData.corporatemobileno.trim()) { newErrors.corporatemobileno = "Corporate Mobile Number is required"; }
      if(!formData.corporateemailaddress.trim()) { newErrors.corporateemailaddress = "Corporate Email Address is required"; }

       setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
    }


    
  //   const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //   } else {
  //     setErrors({});
  //     setShowModal(true);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowModal(true);
    }
  };

    
  /* edit details table */
  useEffect(() =>  {
   const supervisiondata= [
    { 
      startDate: "09/10/2024",
      endDate: "09/10/2025",
      headofdepartment: "Michael McCoy",
      reportingmanager: "John Yeager", 
    }
   ];
    setSupervisionList(supervisiondata);
   }, []);

  useEffect(() => {
  const previousemployeedata = [
    {
      startDate: "09/10/2024",
      endDate: "09/10/2025",
      companyname: "Lorem ipsum dolor",
      designation: "Lorem Ipsum", 
    }
  ];
  setPreviousemployee(previousemployeedata);
  }, []);

  useEffect(() => {
  const familydata = [
    {
      name: "Michael McCoy",
      relation: "Father",
      gender: "Male",
      dob: "23/04/1971",
      maritalstatus: "Married",
      contactno: "+91 00000 00000"
    },
    {
      name: "Rose McCoy",
      relation: "Mother",
      gender: "Female",
      dob: "17/01/1974",
      maritalstatus: "Married",
      contactno: "+91 00000 00000"
    }
  ];
  setFamilymember(familydata);
  }, [])

  // const goToPreviousTab = () => {
  //   if(activeTab > 0) {
  //     setActiveTab(activeTab - 1);
  //   }
  // }
  const [supervisionList, setSupervisionList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviousemployeeEditModalOpen, setIsPreviousemployeeEditModalOpen] = useState(false);
  const [isFamilyEditModalOpen, setIsFamilyEditModalOpen] = useState(false);
  // const [editData, setEditData] = useState(null);
  // const [previousemployee, setPreviousEmployee] = useState([]);
  const [editData, setEditData] = useState({ startDate: '', endDate: '', headofdepartment: '', reportingmanager: '', });
  const [editIndex, setEditIndex] = useState(null);
  const [previousemployeeeditData, setPreviousemployeeEditData] = useState({ startDate: '', endDate: '', companyname: '', designation: '', });
  const [previousemployeeeditIndex, setPreviousemployeeEditIndex] = useState(null)
  const [familyeditData, setFamilyEditData] = useState({ name: '', relation: '', gender: '', dob: '', maritalstatus: '', contactno: ''});
  const [familyeditIndex, setFamilyEditIndex] = useState(null)
  const handleSave = () => {
  const updated = [...supervisionList];
  updated[editIndex] = editData;
  setSupervisionList(updated);
  setIsEditModalOpen(false);
  };

  const handlePrevEmpSave = () => {
    const updatedList = [...previousemployee];
    updatedList[previousemployeeeditIndex] = previousemployeeeditData;
    setPreviousemployeeEditData(false);
    setPreviousemployee(updatedList);
    setIsPreviousemployeeEditModalOpen(false);
  };

  const handleFamilySave = () => {
    const updatefamilymember = [...familymember];
    updatefamilymember[familyeditIndex] = familyeditData;
    setFamilyEditData(false);
    setFamilymember(updatefamilymember);
    setIsFamilyEditModalOpen(false);
  }

  


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
          // <div>
          <form onSubmit={handleSubmit}>
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
                     {errors.employeeCode && (<p className="text-red-500 text-sm">{errors.employeeCode}</p>)}
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
                    {errors.joinDate && (<p className="text-red-500 text-sm">{errors.joinDate}</p>)}
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
                    {errors.salutation && (<p className="text-red-500 text-sm">{errors.salutation}</p>)}
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
                    {errors.firstName && (<p className="text-red-500 text-sm">{errors.firstName}</p>)}
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
                    {errors.middleName && (<p className="text-red-500 text-sm">{errors.middleName}</p>)}
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
                    {errors.lastName && (<p className="text-red-500 text-sm">{errors.lastName}</p>)}
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
                  {errors.nameAsPerAadhaar && (<p className="text-red-500 text-sm">{errors.nameAsPerAadhaar}</p>)}
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
                  {errors.fatherName && (<p className="text-red-500 text-sm">{errors.fatherName}</p>)}
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
                  {errors.employmentType && (<p className="text-red-500 text-sm">{errors.employmentType}</p>)}
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
                  {errors.unit && (<p className="text-red-500 text-sm">{errors.unit}</p>)}
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
                  {errors.division && (<p className="text-red-500 text-sm">{errors.division}</p>)}
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
                  {errors.department && (<p className="text-red-500 text-sm">{errors.department}</p>)}
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
                  {errors.designation && (<p className="text-red-500 text-sm">{errors.designation}</p>)}
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
                  {errors.workLocation && (<p className="text-red-500 text-sm">{errors.workLocation}</p>)}
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
                  {errors.dateOfBirth && (<p className="text-red-500 text-sm">{errors.dateOfBirth}</p>)}
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
                  {errors.gender && (<p className="text-red-500 text-sm">{errors.gender}</p>)}
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
                  {errors.religion && (<p className="text-red-500 text-sm">{errors.religion}</p>)}
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
                  {errors.nationality && (<p className="text-red-500 text-sm">{errors.nationality}</p>)}
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
                  {errors.serviceAgreement && (<p className="text-red-500 text-sm">{errors.serviceAgreement}</p>)}
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
                  {errors.aadhaarNo && (<p className="text-red-500 text-sm">{errors.aadhaarNo}</p>)}
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
                  {errors.panNo && (<p className="text-red-500 text-sm">{errors.panNo}</p>)}
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
                  {errors.esicNo && (<p className="text-red-500 text-sm">{errors.esicNo}</p>)}
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
                  {errors.uanNo && (<p className="text-red-500 text-sm">{errors.uanNo}</p>)}
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
                  {errors.pfNo && (<p className="text-red-500 text-sm">{errors.pfNo}</p>)}
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">Marital Status</div>
                  <CustomSelect
                    options={maritalStatusOptions}
                    placeholder="Select"
                    value={formData.maritalStatus}
                    onChange={(value) => handleInputChange("maritalStatus", value)}
                  />
                  {errors.maritalStatus && (<p className="text-red-500 text-sm">{errors.maritalStatus}</p>)}
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
                  {errors.bloodGroup && (<p className="text-red-500 text-sm">{errors.bloodGroup}</p>)}
                </div>
              </div>

              {/* Buttons */}
              <div className="col-span-4 flex space-x-2 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer" 
                  // onClick={() => setShowModal(true)}
                  // onClick={() => {
                  //   // if (validateForm()) {
                  //     setShowModal(true);
                  //   // }
                  // }}
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
            
          {/* </div> */}
          </form>
          
        )}
        {activeTab === "Contact & Bank Details" && (
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-4">
            Contact & Bank Details
            </h2>
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-6">
              {/* First Row */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div className="col-span-4 grid grid-cols-4 gap-6">
                  <div className="col-span-1">
                    <div className="mb-1 text-sm font-medium">
                      Corporate Mobile No. <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.corporatemobileno}
                      onChange={(e) =>
                        handleInputChange("corporatemobileno", e.target.value)
                      }
                      placeholder="+91 0000000000"
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Corporate Email Address <span className="text-red-500">*</span>
                    </div>
                    {/* <DatePicker
                      value={formData.joinDate}
                      onChange={(value) => handleInputChange("joinDate", value)}
                      placeholder="DD/MM/YYYY"
                    /> */}
                    <input type="email" className="w-full px-3 py-2 border rounded-md" value={formData.corporateemailaddress} onChange={(e) => handleInputChange("corporate email address", e.target.value)} placeholder="aaa@gmail.com" required />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Personal Mobile No. <span className="text-red-500">*</span>
                    </div>
                    {/* <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    /> */}
                     <input type="number" className="w-full px-3 py-2 border rounded-md" value={formData.personalmobileno} onChange={(e) => handleInputChange("Personal Mobile No.", e.target.value)} placeholder="+91 00000 00000" required />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                        Personal Email<span className="text-red-500">*</span>
                    </div>
                    <input type="email" className="w-full px-3 py-2 border rounded-md" value={formData.employeeCode} onChange={(e) => handleInputChange("employeeCode", e.target.value)} placeholder="aaa@gmail.com" required />
                  </div>
                </div>
                {/* Name Fields */}
                <div className="col-span-4 grid grid-cols-4 gap-6">
                   <div>
                    <div className="mb-1 text-sm font-medium">
                      Address Type <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={addresstype}
                      placeholder="Select"
                      value={formData.addresstype}
                      onChange={(value) => handleInputChange("Address Type", value)} 
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Block No. <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="00"
                      value={formData.middleName}
                      onChange={(e) =>
                        handleInputChange("BlockNo", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Building Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Lorem ipsum"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("BuildingName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Street Address 1 <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter Street Address"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("Enter Street Address", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Aadhaar and Father Name */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Street Address 2 <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.nameAsPerAadhaar}
                    onChange={(e) =>
                      handleInputChange("Street Address 2", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Area Name <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.fatherName}
                    onChange={(e) =>
                      handleInputChange("Area Name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Country <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={country}
                    placeholder="Select"
                    value={formData.country}
                    onChange={(value) => handleInputChange("country", value)} 
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    State <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={state}
                    placeholder="Select"
                    value={formData.state}
                    onChange={(value) => handleInputChange("State", value)} 
                  />
                </div>
              </div>

              {/* Unit, Division, Department */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                  <div className="mb-1 text-sm font-medium">
                    City <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={city}
                    placeholder="Select"
                    value={formData.city}
                    onChange={(value) => handleInputChange("city", value)} 
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Pin Code <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("Pincode", e.target.value)}
                  />
                </div>
               
              </div>

              {/* Work Location, DOB, Gender */}
              <div className="col-span-4 grid grid-cols-4 gap-6  border-0 border-t-2 border-t-[#D4D4D4] pt-5">
              <h2 className="text-md font-medium text-gray-700 mb-1">
                   Contact & Bank Details
                </h2>
              
              </div>
              <div className="col-span-4 grid grid-cols-4 gap-6  ">
                
                <div>
                  <div className="mb-1 text-sm font-medium">
                    IFSC Code <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.ifsccode}
                    onChange={(e) => handleInputChange("IFSC Code", e.target.value)}
                    placeholder="XXXX0000000"
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Bank Name <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={bankname}
                    placeholder="Select"
                    value={formData.bankname}
                    onChange={(value) => handleInputChange("Bank Name", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Bank Branch Name <span className="text-red-500">*</span>
                  </div>
                  <CustomSelect
                    options={bankbranchname}
                    placeholder="Select"
                    value={formData.bankbranchname}
                    onChange={(value) => handleInputChange("Bank Branch Name", value)}
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Bank A/C No. <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.bankaccountno}
                    onChange={(e) => handleInputChange("Bank Account No.", e.target.value)}
                    placeholder="Enter bank A/C no."
                  />
                </div>
              </div>

              {/* Nationality, Service Agreement, Aadhaar
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
              </div> */}

              {/* ESIC, UAN, PF */}
              {/* <div className="col-span-4 grid grid-cols-4 gap-6">
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
              </div>  */}

              {/* Buttons */}
              <div className="col-span-4 flex space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-[#888888] text-[#888888] rounded-md hover:bg-[#888888] hover:text-[#FFF] transition-all delay-75 ease-in-out cursor-pointer"
                  onClick={() => {
                    // Go to previous tab
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                >
                  Previous Page
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" 
                  // onClick={() => setShowModal(true)}
                   onClick={() => {
                    // Go to next tab
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
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
            </form>
          </div>
        )}
        {activeTab === "Employment" && (
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-4">
            {/* Contact & Bank Details */}
            Job
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {/* First Row */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div className="col-span-4 grid grid-cols-4 gap-6">
                  <div className="col-span-1">
                    <div className="mb-1 text-sm font-medium">
                     Employment Type <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Service Type <span className="text-red-500">*</span>
                    </div>
                    {/* <DatePicker
                      value={formData.joinDate}
                      onChange={(value) => handleInputChange("joinDate", value)}
                      placeholder="DD/MM/YYYY"
                    /> */}
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Notice Period <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Notice Period"
                      value={formData.noticeperiod}
                      onChange={(e) =>
                        handleInputChange("Notice Period", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Retirement Age <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Notice Period"
                      value={formData.noticeperiod}
                      onChange={(e) =>
                        handleInputChange("Notice Period", e.target.value)
                      }
                    />
                  </div>
                </div>
                {/* Name Fields */}
                <div className="col-span-4 grid grid-cols-4 gap-6">
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Probation Period <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Probation Period"
                      value={formData.probationperiod}
                      onChange={(e) =>
                        handleInputChange("Probation Period", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Shift Effective Date <span className="text-red-500">*</span>
                    </div>
                   <DatePicker
                      value={formData.shifteffectivedate}
                      onChange={(value) => handleInputChange("Shift Effective Date", value)}
                      placeholder="DD/MM/YYYY"
                    /> 
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Shift <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Week Off Effective Date <span className="text-red-500">*</span>
                    </div>
                    <DatePicker
                      value={formData.shifteffectivedate}
                      onChange={(value) => handleInputChange("Shift Effective Date", value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>
              </div>
              {/*  Weekly Off Pattern */}
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                    <div className="mb-1 text-sm font-medium">
                      Weekly Off Pattern <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={salutationOptions}
                      placeholder="Select"
                      value={formData.salutation}
                      onChange={(value) => handleInputChange("salutation", value)} 
                    />
                  </div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              {/* Superior */}
              {supervisions.map((sup, index) => (
                <div key={index} className="col-span-4 grid grid-cols-4 gap-6">
                  <div  className="col-span-4 grid grid-cols-4 gap-6  border-t-2 border-t-[#D4D4D4] pt-[20px]">
                    <div>
                      <h2 className="text-md font-medium text-gray-700 mb-1">
                        Superior {index + 1}
                      </h2>

                    </div>
                    <div></div>
                    <div></div>
                    <div className="text-end">
                      {supervisions.length > 1 && (
                          <button type="button" onClick={() => deleteSupervision(index)} className="text-red-500 cursor-pointer" title="Romove this supervision"><FontAwesomeIcon icon={faXmark} /></button>
                      )}
                    </div>
                  </div>
                
                  <div className="col-span-4 grid grid-cols-4 gap-6 ">
                    <div>
                      <div className="mb-1 text-sm font-medium">
                        Start Date <span className="text-red-500">*</span>
                      </div>
                      <DatePicker
                          value={sup.startDate}
                          onChange={(value) => handleInputChange("startDate", value)}
                          placeholder="DD/MM/YYYY"
                        />
                    </div>
                    <div>
                      <div className="mb-1 text-sm font-medium">
                        End Date <span className="text-red-500">*</span>
                      </div>
                      <DatePicker
                          value={formData.joinDate}
                          onChange={(value) => handleInputChange("endDate", value)}
                          placeholder="DD/MM/YYYY"
                        />
                    </div>
                    <div>
                      <div className="mb-1 text-sm font-medium">
                        Head of Department <span className="text-red-500">*</span>
                      </div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        value={formData.headofdepartment}
                        onChange={(e) =>
                          handleInputChange("Head of Department", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <div className="mb-1 text-sm font-medium">
                        Reporting Manager <span className="text-red-500">*</span>
                      </div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        value={formData.reportingmanager}
                        onChange={(e) =>
                          handleInputChange("Reporting Manager", e.target.value)
                        }
                      />
                    </div>
                  </div>

                
                  <div className="col-span-4 grid grid-cols-4 gap-6">
                    <div>
                      <div className="mb-1 text-sm font-medium">
                        Authorization Date <span className="text-red-500">*</span>
                      </div>
                      <DatePicker
                        value={formData.authorizationdate}
                        onChange={(value) => handleInputChange("authorizationdate", value)}
                        placeholder="--/--/----"
                      />
                    </div>
                  </div>
                </div>

              
              ))}

              <div className="col-span-4 flex space-x-2 mt-0">
                <button type="button" className="mt-4 px-4 py-2 bg-[#0E99FF] text-white rounded-md hover:bg-[#0e7eff] cursor-pointer" onClick={addSupervision} > + Add Supervision </button>
                <button type="button" className="mt-4 px-4 py-2 bg-white border border-[#888888] rounded-[4px] cursor-pointer hover:bg-[#888888]" >Clear </button>
              </div>

              {/* table */}
                <div className="col-span-4 grid gap-6 ">
                  <div className="col-span-4 grid gap-6 border-b-2 border-b-[#D4D4D4] pb-[25px]">
                    <div className="overflow-x-auto mt-2 bg-white shadow rounded-md">
                      <table className="w-full text-sm text-left text-gray-700 ">
                        <thead className="bg-[#C9E8FE] text-[#323232] uppercase text-xs w-full">
                          <tr>
                            <th className="py-[13px] pl-[20px]">Sr. No.</th>
                            <th className="py-[13px] pl-[20px]">Start Date</th>
                            <th className="py-[13px] pl-[20px]">End Date</th>
                            <th className="py-[13px] pl-[20px]">Head of Department</th>
                            <th className="py-[13px] pl-[20px]">Reporting Manager</th>
                            <th className="py-[13px] pl-[20px]">Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {supervisionList.map((row, index) => (
                          <tr key={index}>
                            <td className="py-[13px] pl-[20px]">{index + 1}</td>
                            <td className="py-[13px] pl-[20px]">{row.startDate}</td>
                            <td className="py-[13px] pl-[20px]">{row.endDate}</td>
                            <td className="py-[13px] pl-[20px]">{row.headofdepartment}</td>
                            <td className="py-[13px] pl-[20px]">{row.reportingmanager}</td>
                            <td className="py-[13px] pl-[20px]">
                            <img
                              src="/images/editicon.svg"
                              alt="editicon"
                              className="cursor-pointer"
                              onClick={() => {
                              setEditData(row);
                              setEditIndex(index);
                              setIsEditModalOpen(true);
                              }}
                            />
                            </td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* popup modal*/}
                    {isEditModalOpen && (

                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000050] bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                          <h2 className="text-lg font-semibold mb-4">Edit Privouse Employee Details</h2>
                            <div className="mb-4">
                              <input type="date" value={editData?.startDate || ''} onChange={(e) => setEditData({
                                ...editData, startDate: e.target.value
                              })} className="w-full border p-2 rounded" />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium">End Date</label>
                              <input type="date" value={editData?.endDate || ''} onChange={(e) => setEditData({ ...editData, endDate: e.target.value})} className="w-full border p-2 rounded"/>
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium">Head of Department</label>
                              <input type="text" value={editData?.headofdepartment || ''} onChange={(e) => setEditData({ ...editData, headofdepartment: e.target.value})} className="w-full border p-2 rounded" />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium">Reporting Manager</label>
                              <input type="text" value={editData?.reportingmanager || ''} onChange={(e) => setEditData({ ...editData, reportingmanager: e.target.value})} className="w-full border p-2 rounded"/>
                            </div>            

                            <div className="flex justify-end gap-2">
                              <button className="px-4 py-2 border border-[#888888]" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}> Save </button>
                            </div>
                        </div>
                      </div>
                    )} 
                </div>

              {/* previous employment*/}
              <div className="col-span-4 grid grid-cols-4  gap-6">
                  <div>
                    <h2 className="text-md font-medium text-gray-700 mb-1">Previous Employment</h2>
                  </div>
                  <div>

                  </div>
                  <div>

                  </div>
                  <div>

                  </div>
              </div>
              <div className="col-span-4 grid grid-cols-4 gap-6">
                <div>
                   <div className="mb-1 text-sm font-medium">
                      From Date <span className="text-red-500">*</span>
                    </div>
                    <DatePicker
                      value={formData.fromDate}
                      onChange={(value) => handleInputChange("fromdate", value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                      To Date <span className="text-red-500">*</span>
                    </div>
                    <DatePicker
                      value={formData.fromDate}
                      onChange={(value) => handleInputChange("fromdate", value)}
                      placeholder="DD/MM/YYYY"
                    />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Company Name <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter Company Name"
                    value={formData.companyname}
                    onChange={(e) =>
                      handleInputChange("Company Name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <div className="mb-1 text-sm font-medium">
                    Designation <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter Designation"
                    value={formData.designation}
                    onChange={(e) =>
                      handleInputChange("Designation", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* table */}
              <div className="col-span-4 grid gap-6 ">
                <div className="col-span-4 grid gap-6">
                  <div className="overflow-x-auto mt-2 bg-white shadow rounded-md">
                    <table className="w-full text-sm text-left text-gray-700 ">
                      <thead className="bg-[#C9E8FE] text-[#323232] uppercase text-xs w-full">
                        <tr>
                          <th className="py-[13px] pl-[20px]">Sr. No.</th>
                          <th className="py-[13px] pl-[20px]">Start Date</th>
                          <th className="py-[13px] pl-[20px]">End Date</th>
                          <th className="py-[13px] pl-[20px]">Company Name</th>
                          <th className="py-[13px] pl-[20px]">Designation</th>
                          <th className="py-[13px] pl-[20px]">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previousemployee.map((row, index) => (
                        <tr key={index}>
                          <td className="py-[13px] pl-[20px]">{index + 1}</td>
                          <td className="py-[13px] pl-[20px]">{row.startDate}</td>
                          <td className="py-[13px] pl-[20px]">{row.endDate}</td>
                          <td className="py-[13px] pl-[20px]">{row.companyname}</td>
                          <td className="py-[13px] pl-[20px]">{row.designation}</td>
                          <td className="py-[13px] pl-[20px]"><img src="/images/editicon.svg" alt="editicon" className="cursor-pointer"  onClick={() => {
                              setPreviousemployeeEditData(row);
                              setPreviousemployeeEditIndex(index);
                              setIsPreviousemployeeEditModalOpen(true);}} /></td>
                        </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* popup modal*/}
                  {isPreviousemployeeEditModalOpen && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000050] bg-opacity-50">
                      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                         <h2 className="text-lg font-semibold mb-4">Edit Supervision</h2>
                          <div className="mb-4">
                            <input type="date" value={previousemployeeeditData?.startDate || ''} onChange={(e) => setPreviousemployeeEditData({
                              ...previousemployeeeditData, startDate: e.target.value
                            })} className="w-full border p-2 rounded" />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium">End Date</label>
                            <input type="date" value={previousemployeeeditData?.endDate || ''} onChange={(e) => setPreviousemployeeEditData({ ...previousemployeeeditData, endDate: e.target.value})} className="w-full border p-2 rounded"/>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium">Company Name</label>
                            <input type="text" value={previousemployeeeditData?.companyname || ''} onChange={(e) => setPreviousemployeeEditData({ ...previousemployeeeditData, companyname: e.target.value})} className="w-full border p-2 rounded" />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium">Designation</label>
                            <input type="text" value={previousemployeeeditData?.designation || ''} onChange={(e) => setPreviousemployeeEditData({ ...previousemployeeeditData, designation: e.target.value})} className="w-full border p-2 rounded"/>
                          </div>            

                          <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 border border-[#888888]" onClick={() => setIsPreviousemployeeEditModalOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handlePrevEmpSave}> Save </button>
                          </div>
                      </div>
                    </div>
                  )}
              </div>

              {/* Buttons */}
              <div className="col-span-4 flex space-x-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-[#888888] text-[#888888] rounded-md hover:bg-[#888888] hover:text-[#FFF] transition-all delay-75 ease-in-out cursor-pointer"
                  onClick={() => {
                    // Go to previous tab
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                >
                  Previous Page
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => {
                    // Go to next tab
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
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
          // </div>
        )}
        {activeTab === "Family" && (
          <div>
            <h2 className="text-md font-medium text-gray-700 mb-4">
            {/* Contact & Bank Details */}
            {activeTab}
            </h2>
            <div className="grid grid-cols-4 gap-6">
            
              {/* First Row */}
              {familymember.map((family, index) => (
              <div key={index} className="col-span-4 grid grid-cols-4 gap-6">
                <div className="col-span-4 grid grid-cols-4 gap-6">
                  <div>
                    {familymember.length > 1 && (
                          <h2>{activeTab} Details {index}</h2>
                      )}
                  </div>
                  <div></div>
                  <div></div>
                  <div className="text-end">
                  
                      {familymember.length > 1 && (
                          <button type="button" onClick={() => deleteFamilymember(index)} className="text-red-500 cursor-pointer" title="Romove this supervision"><FontAwesomeIcon icon={faXmark} /></button>
                      )}
                  </div>
                </div>
                <div className="col-span-4 grid grid-cols-4 gap-6">
                  <div className="col-span-1">
                    <div className="mb-1 text-sm font-medium">
                      Name <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={family.name}
                      placeholder="Enter name"
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Relation <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={relation}
                      placeholder="Select"
                      value={family.relation}
                      onChange={(value) => handleInputChange("relation", value)} 
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Gender <span className="text-red-500">*</span>
                    </div>
                    <CustomSelect
                      options={gender}
                      placeholder="Select"
                      value={formData.gender}
                      onChange={(value) => handleInputChange("Gender", value)} 
                    />
                  </div>
                  <div>
                     <div className="mb-1 text-sm font-medium">
                      Date of Birth <span className="text-red-500">*</span>
                    </div>
                     <DatePicker
                      value={formData.joinDate}
                      onChange={(value) => handleInputChange("joinDate", value)}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>
                {/* Name Fields */}
                <div className="col-span-4 grid grid-cols-4 gap-6">
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Marital Status<span className="text-red-500">*</span>
                    </div>
                   <CustomSelect
                      options={maritalstatus}
                      placeholder="Select"
                      value={formData.maritalstatus}
                      onChange={(value) => handleInputChange("Marital Status", value)} 
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Contact No. <span className="text-red-500">*</span>
                    </div>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter contact no."
                      value={formData.contactno}
                      onChange={(e) =>
                        handleInputChange("Contact No", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <div className="mb-1 text-sm font-medium">
                      Can be Contacted in Emergency? <span className="text-red-500">*</span>
                    </div>
                    {contactedemergency.map((option, index) => (
                      <label key={index} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      className=" mr-[5px]"
                      // placeholder="Enter last name"
                      value={option}
                      checked={selectedRadioButton === option}
                      onChange={(e) =>
                        setSelectedRadioButton( e.target.value)
                      }
                    />
                    <div className="text-sm font-medium">{option}</div>
                    </label>
                    ))}
                  </div>
                </div>
                
              </div>
              ))}

              <div className="col-span-4 flex space-x-2 mt-0">
                <button type="button" className="mt-4 px-4 py-2 bg-[#0E99FF] text-white rounded-md hover:bg-[#0e7eff] cursor-pointer" onClick={addFamilymember} > + Add Member </button>
                <button type="button" className="mt-4 px-4 py-2 bg-white border border-[#888888] rounded-[4px] cursor-pointer hover:bg-[#888888] hover:text-[#FFF]" >Clear </button>
              </div>

              {/* Table*/}
             <div className="col-span-4 grid gap-6 ">
                  <div className="col-span-4 grid gap-6 border-b-2 border-b-[#D4D4D4] pb-[25px]">
                    <div className="overflow-x-auto mt-2 bg-white shadow rounded-md">
                      <table className="w-full text-sm text-left text-gray-700 ">
                        <thead className="bg-[#C9E8FE] text-[#323232] uppercase text-xs w-full">
                          <tr>
                            <th className="py-[13px] pl-[20px]">Sr. No.</th>
                            <th className="py-[13px] pl-[20px]">Name</th>
                            <th className="py-[13px] pl-[20px]">Relation</th>
                            <th className="py-[13px] pl-[20px]">Gender</th>
                            <th className="py-[13px] pl-[20px]">DOB</th>
                            <th className="py-[13px] pl-[20px]">Marital Status</th>
                            <th className="py-[13px] pl-[20px]">Contact No.</th>
                            <th className="py-[13px] pl-[20px]">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {familymember.map((row, index) => (
                          <tr key={index}>
                            <td className="py-[13px] pl-[20px]">{index + 1}</td>
                            <td className="py-[13px] pl-[20px]">{row.name}</td>
                            <td className="py-[13px] pl-[20px]">{row.relation}</td>
                            <td className="py-[13px] pl-[20px]">{row.gender}</td>
                            <td className="py-[13px] pl-[20px]">{row.dob}</td>
                            <td className="py-[13px] pl-[20px]">{row.maritalstatus}</td>
                            <td className="py-[13px] pl-[20px]">{row.contactno}</td>
                            <td className="py-[13px] pl-[20px]">
                            <img
                              src="/images/editicon.svg"
                              alt="editicon"
                              className="cursor-pointer"
                              onClick={() => {
                              setFamilyEditData(row);
                              setFamilyEditIndex(index);
                              setIsFamilyEditModalOpen(true);
                              }}
                            />
                            </td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* popup modal*/}
                    {isFamilyEditModalOpen && (

                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000050] bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                          <h2 className="text-lg font-semibold mb-4">Edit Family Details</h2>
                            <div className="mb-4">
                              <label className="block text-sm font-medium">Name</label>
                              <input type="text" value={familyeditData?.name || ''} onChange={(e) => setFamilyEditData({
                                ...familyeditData, name: e.target.value
                              })} className="w-full border p-2 rounded" />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium">Relation</label>
                              <input type="text" value={familyeditData?.relation || ''} onChange={(e) => setFamilyEditData({ ...familyeditData, relation: e.target.value})} className="w-full border p-2 rounded"/>
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium">Gender</label>
                              <input type="text" value={familyeditData?.gender || ''} onChange={(e) => setFamilyEditData({ ...familyeditData, gender: e.target.value})} className="w-full border p-2 rounded" />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium">Date Of Birth</label>
                              <input type="date" value={familyeditData?.dob || ''} onChange={(e) => setFamilyEditData({ ...familyeditData, dob: e.target.value})} className="w-full border p-2 rounded"/>
                            </div>  

                            <div className="mb-4">
                              <label className="block text-sm font-medium">Marital Status</label>
                              <input type="text" value={familyeditData?.maritalstatus || ''} onChange={(e) => setFamilyEditData({ ...familyeditData, maritalstatus: e.target.value})} className="w-full border p-2 rounded"/>
                            </div> 

                            <div className="mb-4">
                              <label className="block text-sm font-medium">Contact No.</label>
                              <input type="text" value={familyeditData?.contactno || ''} onChange={(e) => setFamilyEditData({ ...familyeditData, contactno: e.target.value})} className="w-full border p-2 rounded"/>
                            </div>          

                            <div className="flex justify-end gap-2">
                              <button className="px-4 py-2 border border-[#888888]" onClick={() => setIsFamilyEditModalOpen(false)}>Cancel</button>
                              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleFamilySave}> Save </button>
                            </div>
                        </div>
                      </div>
                    )} 
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
                  className="px-4 py-2 border border-[#888888] text-[#888888] rounded-md hover:bg-[#888888] hover:text-[#FFF] transition-all delay-75 ease-in-out cursor-pointer"
                  onClick={() => {
                    // Go to previous tab
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                >
                  Previous Page
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => {
                    // Go to next tab
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
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
                    required
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer" onClick={() => setOpenModel(true)}
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
                    className="text-[16px] leading-[16px] font-normal px-[20px] py-[10px] bg-[#0E99FF] text-white rounded-md border border-[#0E99FF] hover:bg-[#0e7eff] mr-[10px] cursor-pointer" >
                    Complete This Profile
                  </button>
                  <button
                    type="button"
                    className="text-[16px] leading-[16px] font-normal px-[20px] py-[10px] bg-transparent border border-[#888888] text-[#888888] rounded-md hover:bg-[#a9aaaa] hover:text-[#000] ml-[10px] cursor-pointer" >
                    Create New Profile
                  </button>
                </div>

                <Link href="/" className="text-[#323232] text-[14px] leading-[22px] font-normal mt-[10px] inline underline hover:text-[#0E99FF]">Go to Dashboard</Link>
            </div>
            </div>
          </div>
      )}

      {openModel && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000008c] bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg py-[60px] px-6 w-[90%] max-w-[600px] relative">
            <button onClick={() => setOpenModel(false)} className=" float-right right-0 absolute top-4 right-4">
              {/* Cancel */}
              <FontAwesomeIcon icon={faXmark} className="text-gray-700" />
            </button>

            <div className="flex items-center justify-center flex-col mt-[24px] text-center">
                <div className="thumb-icon bg-[#E6F4FF] rounded-full w-[120px] h-[120px] flex items-center justify-center mb-[30px]" >
                    <FontAwesomeIcon icon={faThumbsUp} className="text-[#0E99FF] text-[50px]"/>
                </div>
                <h4 className="text-[20px] leading-[24px] font-bold text-[#323232] mb-[5px]">Profile Successfully Created</h4>
                <p className="text-[16px] leading-[20px] font-normal text-[#323232] pt-[5px] pb-[20px]">You’ve successfully completed the employee profile setup What would you like to do next?</p>

                <div className=" flex items-center justify-center my-[10px]">
                  <a href="/"
                    
                    className="text-[16px] leading-[16px] font-normal px-[20px] py-[10px] bg-[#0E99FF] text-white rounded-md border border-[#0E99FF] hover:bg-[#0e7eff] mr-[10px] cursor-pointer" >
                    Go to Dashboard
                  </a>
                  <a href="/EmployeeInformationForm"
                    //  onClick={() => setActiveCard("nextmodule") }
                    className="text-[16px] leading-[16px] font-normal px-[20px] py-[10px] bg-transparent border border-[#888888] text-[#888888] rounded-md hover:bg-[#a9aaaa] hover:text-[#000] ml-[10px] cursor-pointer" >
                    Create New Profile
                  </a>
                </div>

                {/* <Link href="/" className="text-[#323232] text-[14px] leading-[22px] font-normal mt-[10px] inline underline hover:text-[#0E99FF]">Go to Dashboard</Link> */}
            </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default EmployeeInformationForm;
