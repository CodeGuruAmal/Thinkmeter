import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],
  addToast: ({
    title,
    description,
    variant = "success",
    action,
    position = "top-right",
  }) => {
    const id = Date.now();
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id, title, description, variant, action, position },
      ],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
