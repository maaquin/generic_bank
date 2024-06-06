import toast from "react-hot-toast";
export const validatePassword = (password) => {
    const regex = /^\S{6,20}$/

    if (!regex.test(password)) {
        toast('Invalid password structure 6 - 20', {
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