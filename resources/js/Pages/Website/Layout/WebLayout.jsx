// WebLayout.jsx
import React, {useEffect } from 'react';
import Header from '../Partials/Header';
import Footer from '../Partials/Footer';
import Nav from '../Partials/Nav';
import '../../../../css/main.css'
import ActionButton from '../Partials/ActionButton';
import { Link, usePage } from '@inertiajs/react'
import Swal from 'sweetalert2'

export default function WebLayout({ auth, children }) {
    const { flash, errors } = usePage().props;

    useEffect(() => {
        // Effect to handle sidebar state on component mount
        if (flash) {
            // validation error
            if (flash.failed) {
                Swal.fire({
                    text: flash.failed,
                    icon: 'error',
                });
            }
            if (flash.warning) {
                Swal.fire({
                    text: flash.warning,
                    icon: 'warning',
                    timer: 5000,
                    timerProgressBar: true,
                });
            }
            if (flash.success) {
                Swal.fire({
                    text: flash.success,
                    icon: 'success',
                    timer: 5000,
                    timerProgressBar: true,
                });
            }
        }
        if (errors) {
            if (errors && Object.keys(errors).length > 0) {
                const errorMessages = '<ul>' + Object.values(errors).map(err => `<li>${err}</li>`).join('') + '</ul>';
                Swal.fire({
                    title: 'Validation Errors!',
                    html: errorMessages,
                    icon: 'error',
                    timer: 5000,
                    timerProgressBar: true,
                });
            }
        }
    }, [flash, errors]);
    return (
        <div>
            <Header auth={auth.user} />
            <Nav auth={auth.user} />
            <ActionButton />
            <main>{children}</main>
            <Footer />
        </div>
    );
}