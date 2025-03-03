import { useEffect } from "react";
import { X } from "lucide-react";
import { useToastStore } from "../store/toast.store.js";

const Toast = ({ id, title, description, variant, action, closeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, closeToast]);

  const removeToast = useToastStore((state) => state.removeToast);

  return (
    // <div
    //   className={`relative w-80 p-2 rounded-md flex flex-col gap-1
    // ${
    //   variant === "success"
    //     ? "bg-green-600 text-white"
    //     : "bg-red-600 text-white"
    // }
    //   `}
    // >
    //   <div className="flex justify-between items-center">
    //     <h4 className="font-semibold">{title}</h4>
    //     {/* <button
    //       onClick={() => removeToast(id)}
    //       className="text-white hover:opacity-80"
    //     >
    //       <X size={15} />
    //     </button> */}
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <p className="text-sm">{description}</p>

    // {action && (
    //   <button
    //     onClick={() => removeToast(id)}
    //     className=" py-1 px-3 text-sm font-medium bg-white/20 rounded-md hover:bg-white/30"
    //   >
    //     {action}
    //   </button>
    // )}
    //   </div>
    // </div>

    <div
      className={`relative w-96 p-3 rounded-md flex justify-between items-center ${
        variant === "success"
          ? "bg-base-200 border-base-300 border "
          : "bg-red-900"
      }`}
    >
      <div className="flex flex-col gap-1">
        <h4 className="font-Gilroy-Semibold text-[.8rem]">{title}</h4>
        <p className="text-xs text-base-content/75 font-Gilroy-Medium">
          {description}
        </p>
      </div>

      {action && (
        <button
          onClick={() => removeToast(id)}
          className="py-1 px-3 text-xs font-Gilroy-Medium bg-white/20 rounded-md hover:bg-white/30"
        >
          {action}
        </button>
      )}
    </div>
  );
};

export default Toast;
