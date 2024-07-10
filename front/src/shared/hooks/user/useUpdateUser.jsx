import { useState } from "react";
import { updateUser as updateUserRequest } from '../../../services';
import toast from "react-hot-toast";

export const useUpdateUser = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateUser = async (userData, token) => {
        setIsLoading(true);
        const response = await updateUserRequest(userData, token);
        setIsLoading(false);

        if (response.error) {
            toast.error(response.e?.response?.data || 'Ocurrió un error al actualizar el usuario');
            return { error: true };
        }

        toast.success('Usuario actualizado con éxito');
        return { error: false };
    };

    return {
        updateUser,
        isLoading
    };
};
