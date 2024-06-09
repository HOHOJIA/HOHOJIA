import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export default function useShowAlert() {
  const showAlert = (
    title: string,
    message: string,
    icon: SweetAlertIcon
  ): Promise<SweetAlertResult> => {
    return Swal.fire({
      title,
      text: message,
      icon,
    });
  };

  return showAlert;
}
