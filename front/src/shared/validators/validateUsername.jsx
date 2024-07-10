import toast from "react-hot-toast";
export const validateUsername = (username) => {
    const regex = /^\S{1,18}$/

    if (!regex.test(username)) {
        toast('Invalid username', {
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