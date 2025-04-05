import React, { useReducer, useRef, useState } from "react";
import axios from "axios";
import { SwalAlert, SwalConfirm } from '@/Components/Alert/SwalAlert';
import { Inertia } from '@inertiajs/inertia';  // Correct import for Inertia

function EmployeeForm({ employee, setEmployee }) {
    const inputRef = useRef(null); // Reference for auto-focusing input
    const initialState = {
        id: employee.id,
        full_name: employee.full_name,
        mobile_number: employee.mobile_number,
        email: employee.email,
        date_of_birth: employee.date_of_birth,
        nationality: employee.nationality,
        department_id: employee.department_id,
        job_title_id: employee.job_title_id,
        position_id: employee.position_id,
        gender: employee.gender,
        blood_group: employee.blood_group,
        marital_status: employee.marital_status,
        date_of_joining: employee.date_of_joining
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_FIELD":
                return { ...state, [action.field]: action.value };
            case "SET_FIELDS":
                return { ...state, ...action.payload };
            case "RESET":
                return initialState;
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        dispatch({
            type: "SET_FIELD",
            field: e.target.name,
            value: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.full_name || !state.mobile_number || !state.date_of_birth) {
            SwalAlert("warning", "Please fill in all required fields!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/employee-update", state);
            console.log(response);
            if (response.data.status) {
                // setEmployee([response.data.data, ...employee]);
                dispatch({ type: "RESET" });
                inputRef.current.focus();
                // Use useNavigate() for redirection
                if (!response.data.status) {
                    SwalAlert("warning", "Employee ID not found!", "center");
                    return;
                }
                SwalAlert("success", response.data.message, "center");

                // SwalConfirm("Are you sure?", "Do you want to proceed?", "warning", () => {
                //     console.log("User confirmed! Proceeding...");
                //     // Redirect to the edit page
                //     // Inertia.visit(`/employee-edit/${response.data.id}`);
                //     const editUrl = `/employee-edit/${response.data.data.id}`;
                //     console.log("Navigating to:", editUrl);
                //     Inertia.visit(editUrl);
                //     // window open loaction editUrl 
                //     window.location.href = editUrl;  // Redirect to the URL in the same tab
                // });
            } else {
                SwalAlert("warning", response.data.message, "center");
                setLoading(false);
            }
        } catch (error) {
            let errorMessage = "Something went wrong!";

            // Check if response exists and has errors
            if (error.response?.data?.errors) {
                // Extract first error message
                const firstErrorKey = Object.keys(error.response.data.errors)[0]; // Get the first error field
                errorMessage = error.response.data.errors[firstErrorKey][0]; // Get the error message
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            SwalAlert("warning", errorMessage, "center");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-2 mx-auto dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                <div>
                    <label className="dark:text-gray-200">Name <span className="text-red-600">*</span></label>
                    <input
                        ref={inputRef}
                        name="full_name"
                        type="text"
                        value={state.full_name}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    />
                </div>
                <div>
                    <label className="dark:text-gray-200">Phone Number <span className="text-red-600">*</span></label>
                    <input
                        name="mobile_number"
                        type="text"
                        value={state.mobile_number}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    />
                </div>
                <div>
                    <label className="dark:text-gray-200">Email</label>
                    <input
                        name="email"
                        type="text"
                        value={state.email}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    />
                </div>
                <div>
                    <label className="dark:text-gray-200">Nationality</label>
                    <select
                        name="nationality"
                        id="nationality"
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    >
                        <option value="Bangladeshi">Bangladeshi</option>
                        <option value="Pakistani">Pakistani</option>
                        <option value="Maldhipi">Maldhipi</option>
                        <option value="Srilankan">Srilankan</option>
                        <option value="Nepali">Nepali</option>
                        <option value="Butani">Butani</option>
                        <option value="Indian">Indian</option>
                    </select>
                </div>
                <div>
                    <label className="dark:text-gray-200">Birth Date <span className="text-red-600">*</span></label>
                    <input
                        name="date_of_birth"
                        type="date"
                        value={state.date_of_birth}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    />
                </div>
                <div>
                    <label className="dark:text-gray-200">Department</label>
                    <select
                        name="department_id"
                        id="department_id"
                        value={state.department_id}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    >
                        <option value="1">HR</option>
                        <option value="2">Finance</option>
                        <option value="3">IT</option>
                    </select>
                </div>
                <div>
                    <label className="dark:text-gray-200">Position</label>
                    <select
                        name="position_id"
                        id="position_id"
                        value={state.position_id}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    >
                        <option value="1">Senior</option>
                        <option value="2">Mid-Level</option>
                        <option value="3">Junior</option>
                    </select>
                </div>
                <div>
                    <label className="dark:text-gray-200">Job Title</label>
                    <select
                        name="job_title_id"
                        id="job_title_id"
                        value={state.job_title_id}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    >
                        <option value="1">Manager</option>
                        <option value="2">Assistant Manager</option>
                        <option value="3"> Senior Developer</option>
                    </select>
                </div>
                <div>
                    <label className="dark:text-gray-200">Joining Date <span className="text-red-600">*</span></label>
                    <input
                        name="date_of_joining"
                        type="date"
                        value={state.date_of_birth}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    />
                </div>
                <div>
                    <label className="dark:text-gray-200">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="dark:text-gray-200">Blood Group</label>
                    <select
                        name="blood_group"
                        id="blood_group"
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    >
                        <option value="O">O</option>
                        <option value="B">B</option>
                        <option value="A">A</option>
                    </select>
                </div>
                <div>
                    <label className="dark:text-gray-200">Marital Status</label>
                    <select
                        name="marital_status"
                        id="marital_status"
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    >
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>
                    </select>
                </div>





            </div>
            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
                >
                    {loading ? "Updateing..." : "Update Employee"}
                </button>
            </div>
        </form>
    );
}

export default EmployeeForm;
