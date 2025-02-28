import React, { useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Swal from 'sweetalert2'

export default function InvoiceLayout({ user, header, children, props }) {
    const { flash, errors } = usePage().props;
    useEffect(() => {
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
            {children}
        </div>
    );
}
