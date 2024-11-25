import Swal from 'sweetalert2';

const SwalAlert = (icon, title = null, postion = 'top-end') => {
    Swal.fire({
        text: title,
        icon: icon,
        position: postion,
        toast: postion == 'center' ? false : true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
};

export default SwalAlert;