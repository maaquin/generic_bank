import toast from "react-hot-toast";
export const validateConfirmPassword = (pass, confPass) => {

    if (pass !== confPass) {
        toast('Passwords do not match', {
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