import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { JobTitleList } from './Components/JobTitleList';

function JobTitle({ auth, jobTitles }) {
    const { t } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => {
        setIsOpenModal(false);
        reset();
    };
    const openModal = () => {
        setIsOpenModal(true);
    };
    return (
        <AuthenticatedLayout user={auth.user} header={'Job Title List'}>
            <Head title="Empoyee" />
            <JobTitleList openModal={openModal} jobTitles={jobTitles} />
            <Modal show={isOpenModal} title='Create New Position' maxWidth='4xl' onClose={closeModal}>
                <h1>Employee Page</h1>
                <p>Welcome to the Employee Page!</p>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default JobTitle
