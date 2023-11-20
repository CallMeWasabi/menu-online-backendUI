import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { color } from "./themeColor";

export const swal = withReactContent(Swal);
export const offsetAsk = {
    confirmButtonText: "Yes",
    confirmButtonColor: color.lightGreen,
    showDenyButton: true,
    showLoaderOnConfirm: true,
    denyButtonText: "Cancle",
    denyButtonColor: color.dangerRed,
};
export const offsetTimer = {
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
}
