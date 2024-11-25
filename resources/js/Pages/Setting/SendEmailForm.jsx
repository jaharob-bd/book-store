import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SwalAlert from '@/Components/Alert/SwalAlert';
// import layout
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Select from 'react-select';
import Swal from 'sweetalert2';

function SendEmailForm(props) {
    const [user, setUser] = useState(props.auth.user);
    const [ccOptions, setCcOptions] = useState([]);
    const [bccOptions, setBccOptions] = useState([]);
    const [formData, setFormData] = useState({ cc: '', bcc: '' });

    const emailOptions = [
        { value: 'dummy1@example.com', label: 'dummy1@example.com' },
        { value: 'dummy2@example.com', label: 'dummy2@example.com' },
        { value: 'dummy3@example.com', label: 'dummy3@example.com' },
        { value: 'dummy4@example.com', label: 'dummy4@example.com' },
        { value: 'dummy5@example.com', label: 'dummy5@example.com' },
        { value: 'dummy6@example.com', label: 'dummy6@example.com' },
        { value: 'dummy7@example.com', label: 'dummy7@example.com' },
        { value: 'dummy8@example.com', label: 'dummy8@example.com' },
        { value: 'dummy9@example.com', label: 'dummy9@example.com' }
    ];

    useEffect(() => {
        // Initialize CC and BCC options from props
        setCcOptions(props.cc || []);
        setBccOptions(props.bcc || []);
    }, [props.cc, props.bcc]);

    const handleCcChange = (selectedOptions) => {
        const selectedEmails = selectedOptions ? selectedOptions.map(option => option.value).join(',') : '';
        setFormData(prev => ({
            ...prev,
            cc: selectedEmails,
        }));
        setCcOptions(selectedOptions);
    };

    const handleBccChange = (selectedOptions) => {
        const selectedEmails = selectedOptions ? selectedOptions.map(option => option.value).join(',') : '';
        setFormData(prev => ({
            ...prev,
            bcc: selectedEmails,
        }));
        setBccOptions(selectedOptions);
    };

    const validateForm = () => {
        if (!ccOptions.length && !formData.cc) {
            Swal.fire('Error', 'Please select at least one CC email.', 'error');
            return false;
        }
        if (!bccOptions.length && !formData.bcc) {
            Swal.fire('Error', 'Please select at least one BCC email.', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const cc = formData.cc ? formData.cc : ccOptions.map(option => option.value).join(',');
        const bcc = formData.bcc ? formData.bcc : bccOptions.map(option => option.value).join(',');

        const data = { cc, bcc };
        console.log('Submitting:', data);

        router.post('/store-email', data, {
            onSuccess: () => {
                Swal.fire('Success', 'Email sent successfully', 'success');
                setFormData({ cc: '', bcc: '' });
                setCcOptions([]);
                setBccOptions([]);
            },
            onError: () => {
                Swal.fire('Error', 'Failed to send email.', 'error');
            }
        });
    };

    return (
        <AuthenticatedLayout user={user} header={'Product List'}>
            <Head title={'Email Setting' - + ''} />
            <form onSubmit={handleSubmit}>
                <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-gray-100">
                    <table className="table w-full">
                        <tbody>
                            <tr>
                                <td className="w-3/10 align-top">
                                    <label
                                        className="block text-gray-600 font-bold mb-3 pr-4"
                                        htmlFor="cc"
                                    >
                                        CC <span className="text-red-600">*</span>
                                    </label>
                                </td>
                                <td className="w-7/10 align-top">
                                    <Select
                                        isMulti
                                        name="cc"
                                        options={emailOptions}
                                        className="form-input block w-full focus:bg-white p-1 align-right"
                                        value={ccOptions}
                                        onChange={handleCcChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="w-3/10 align-top">
                                    <label
                                        className="block text-gray-600 font-bold mb-3 pr-4"
                                        htmlFor="bcc"
                                    >
                                        BCC <span className="text-red-600">*</span>
                                    </label>
                                </td>
                                <td className="w-7/10 align-top">
                                    <Select
                                        isMulti
                                        name="bcc"
                                        options={emailOptions}
                                        className="form-input block w-full focus:bg-white p-1 align-right"
                                        value={bccOptions}
                                        onChange={handleBccChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="md:flex md:datas-center pt-2">
                        <div className="md:w-1/3" />
                        <div className="md:w-2/3">
                            <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>

        </AuthenticatedLayout>
    );
}

export default SendEmailForm;