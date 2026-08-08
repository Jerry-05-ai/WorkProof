import { useCallback } from 'react';
import toast from 'react-hot-toast';

export const useToast = () => {
  const showSuccess = useCallback((message) => {
    toast.success(message);
  }, []);

  const showError = useCallback((message) => {
    toast.error(message);
  }, []);

  const showInfo = useCallback((message) => {
    toast(message, {
      icon: 'ℹ️',
    });
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
  };
};