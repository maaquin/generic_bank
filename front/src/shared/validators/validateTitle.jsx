import toast from "react-hot-toast";
export const validateTitle = (title) => {
  if (title.length <= 3 && title.length >= 100) {
    toast('Invalid title 3-100', {
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