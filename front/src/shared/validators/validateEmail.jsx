import toast from "react-hot-toast";
export const validationEmail = (email) => {
  const regex = /\S+@\S+\.\S+/

  if (!regex.test(email)) {
    toast('Invalid email', {
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