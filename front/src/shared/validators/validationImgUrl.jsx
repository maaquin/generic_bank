import toast from "react-hot-toast";
export const validationImgUrl = (url) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/

  if (!regex.test(url)) {
    toast('Invalid url', {
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