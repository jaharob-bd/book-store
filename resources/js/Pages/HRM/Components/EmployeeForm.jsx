import React, { useReducer, useRef, useState } from "react";
import axios from "axios";
import { SwalAlert, SwalConfirm } from '@/Components/Alert/SwalAlert';
import { Inertia } from '@inertiajs/inertia';  // Correct import for Inertia

const initialState = {
    full_name: "",
    mobile_number: "",
    email: "",
    date_of_birth: "",
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

function EmployeeForm({ employees, setEmployees }) {
    const inputRef = useRef(null); // Reference for auto-focusing input
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        dispatch({
            type: "SET_FIELD",
            field: e.target.name,
            value: e.target.value,
        });
    };

    const validation = (field, title) => {
        if (!field) {
          SwalAlert("warning", `Please fill in ${title} !`);
          return false; // Return false if validation fails
        }
        return true; // Return true if validation passes
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!validation(state.full_name, 'Full Name')) {
          return; // Stop submission if validation fails
        }
      
        if (!validation(state.mobile_number, 'Mobile Number')) {
          return; // Stop submission if validation fails
        }
      
        if (!validation(state.date_of_birth, 'Birth Date')) {
          return; // Stop submission if validation fails
        }

        try {
            setLoading(true);
            const response = await axios.post("/employee-store", state);
            console.log(response.data.status);
            if (response.data.status) {
                setEmployees([response.data.data, ...employees]);
                dispatch({ type: "RESET" });
                inputRef.current.focus();
                // validation id
                if (!response.data.data.id) {
                    SwalAlert("warning", "Employee ID not found!", "center");
                    return;
                }
                // Use useNavigate() for redirection   
                SwalConfirm("Are you sure?", "Do you want to proceed?", "warning", () => {
                    const editUrl = `/employee-edit/${response.data.data.id}`;
                    Inertia.visit(editUrl);
                    window.location.href = editUrl;
                });
            } else {
                SwalAlert("warning", response.data.message, "center");
                setLoading(false);
            }
        } catch (error) {
            let errorMessage = "Something went wrong !";

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
                    <label className="dark:text-gray-200">Birth Date <span className="text-red-600">*</span></label>
                    <input
                        name="date_of_birth"
                        type="date"
                        value={state.date_of_birth}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:ring"
                    />
                </div>
                {/* add more field */}
            </div>
            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
                >
                    {loading ? "Saving..." : "Save Employee"}
                </button>
            </div>
        </form>
    );
}

export default EmployeeForm;
