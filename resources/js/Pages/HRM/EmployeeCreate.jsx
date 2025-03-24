import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { EmployeeList } from './Components/EmployeeList';
import EmployeeForm from './Components/EmployeeForm';

function EmployeeCreate({ auth, employs }) {
    const { t } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [employees, setEmployees] = useState(employs);
    const closeModal = () => {
        setIsOpenModal(false);
    };
    const openModal = () => {
        setIsOpenModal(true);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={'Employee List'}>
            <Head title="Empoyee" />
            <EmployeeList {...{ openModal, employees }} />
            <Modal {...{ show: isOpenModal, title: 'Create New Employee', maxWidth: '4xl', onClose: closeModal }} >
                <EmployeeForm {...{ employees, setEmployees }} />
            </Modal>
        </AuthenticatedLayout>
    )
}

export default EmployeeCreate
