import Toast from "react-native-toast-message";

export const ToastMessage = {
  showErrorMessage: (title) => {
    Toast.show({
      text1: title,
      type: "error",
    });
  },

  showSuccessMessage: (title) => {
    Toast.show({
      text1: title,
      type: "success",
    });
  },
};
