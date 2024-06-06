import { useState } from "react";
import toast from "react-hot-toast"
import { updateUser } from "../../../services"

export const useUpdateSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUser] = useState([]);

    const user = async (email, role, hotel) => {
        setIsLoading(true);
        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

        try {
            const response = await updateUser({
                email,
                role,
                hotel
            }, token);

            setIsLoading(false);

            if (response.error) {
                toast.error(response.e?.response?.data || 'Ocurrio un error al modificar el user');
            } else {
                toast.success('User modificado exitosamente');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Ocurrió un error');
        }
    }

    return {
        user,
        isLoading,
        users
    }
}