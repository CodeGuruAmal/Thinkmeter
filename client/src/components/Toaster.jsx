import { useToastStore } from "../store/toast.store.js";
import Toast from "./Toast.jsx";

const Toaster = ({ position = "top-right" }) => {
  const { toasts, removeToast } = useToastStore();

  const getPositionClass = () => {
    switch (position) {
      case "top-left":
        return "top-5 left-5";
      case "top-right":
        return "top-5 right-5";
      case "bottom-left":
        return "bottom-5 left-5";
      case "bottom-right":
        return "bottom-5 right-5";
      case "bottom-center":
        return "bottom-5 left-1/2 transform -translate-x-1/2";
      case "top-center":
        return "top-5 left-1/2 transform -translate-x-1/2";
      default:
        return "top-5 right-5";
    }
  };

  return (
    <div className={`fixed ${getPositionClass()} flex flex-col gap-3 z-50`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export default Toaster;
