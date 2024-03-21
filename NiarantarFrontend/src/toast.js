
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export const showSuccess = (message, options = {}) => {
  toast.success(message, options);
};

export const showError = (message, options = {}) => {
  toast.error(message, options);
};

export default Toast;
