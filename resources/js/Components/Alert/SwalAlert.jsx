import Swal from 'sweetalert2';

export const SwalAlert = (icon, title = null, postion = 'top-end') => {
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

export const SwalConfirm = (title, text, icon, callback) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        position: "center",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed && typeof callback === "function") {
            callback(); // Execute the function if user confirms
        }
    });
};

// export default SwalConfirm;