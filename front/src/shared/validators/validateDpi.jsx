import toast from "react-hot-toast";
export const validateDpi = (dpi) => {
  if (dpi.length !== 13) {
    toast('Invalid dpi 13 numbers', {
      icon: '❌',
      style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#333',
      },
    });
    return false;
  }
  return true;
}