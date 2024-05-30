import toast from "react-hot-toast";
export const validateDescription = (description) => {
  if (description.length <= 5 && description.length >= 2000) {
    toast('Invalid description 5-2000', {
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