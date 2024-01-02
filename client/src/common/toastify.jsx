import { toast } from "react-toastify";

export const Toastify = (mode, msg) => {
  if (mode === "success") {
    toast.success(`${msg}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      bodyClassName: "toastBody",
    });
  } else if (mode === "fail") {
    toast.error(`${msg}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      bodyClassName: "toastBody",
    });
  }
};
