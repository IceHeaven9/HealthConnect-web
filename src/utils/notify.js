import { toast } from "react-toastify";

export const notify = (message) =>
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: "#ffffff",
      color: "#000000",
      fontSize: "16px",
    },
  });
