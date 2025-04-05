import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import EmployeeEditForm from './Components/EmployeeEditForm';

function EmployeeEdit({ auth, employs }) {
    const { t } = useTranslation();
    const [employee, setEmployee] = useState(employs);

    return (
        <AuthenticatedLayout user={auth.user} header={'Employee List'}>
            <Head title="Employee" />
            <EmployeeEditForm {...{ employee, setEmployee }} />            
        </AuthenticatedLayout>
    )
}

export default EmployeeEdit
