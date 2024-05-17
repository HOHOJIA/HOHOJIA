import Swal, { SweetAlertIcon } from 'sweetalert2'

export default function useShowAlert() {
    const showAlert = (
        title: string,
        message: string,
        icon: SweetAlertIcon
    ) => {
        Swal.fire({
            title,
            text: message,
            icon,
        })
    }

    return showAlert
}
