import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { EmployeeList } from './Components/EmployeeList';

function Department({ auth }) {
    const { t } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [products, setProducts] = useState([]);
    const closeModal = () => {
        setIsOpenModal(false);
        reset();
    };
    const openModal = () => {
        setIsOpenModal(true);
    };
    return (
        <AuthenticatedLayout user={auth.user} header={'Department'}>
            <Head title="Department" />
            <EmployeeList openModal={openModal} products={products} />
            <Modal show={isOpenModal} title='Create New Product' maxWidth='4xl' onClose={closeModal}>
                <h1>Employee Page</h1>
                <p>Welcome to the Employee Page!</p>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default Department
