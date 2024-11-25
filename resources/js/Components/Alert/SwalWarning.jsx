import Swal from 'sweetalert2';

const SwalWarning = (title = null) => {
    Swal.fire({
        text: title,
        icon: 'warning',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
};

export default SwalWarning;