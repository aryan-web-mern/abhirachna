export const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "DELETE_TOAST":
      const updatedToasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
      return {
        ...state,
        toasts: updatedToasts,
      };
    case "POP_TOAST":
      return {
        ...state,
        toasts: state.toasts.slice(0, -1)
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
