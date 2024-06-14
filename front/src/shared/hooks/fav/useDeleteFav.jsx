import { useState } from "react";
import { deleteFav as deleteFavRequest } from '../../../services/api.jsx';
import toast from "react-hot-toast";

export const useDeleteFav = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteFav = async (favId) => {
        setIsLoading(true);
        const response = await deleteFavRequest(favId);
        setIsLoading(false);

        if (response.error) {
            return toast.error(response.error?.response?.data || 'Ocurrio un error');
        }

        toast.success('Favorito eliminado correctamente');
        return response; 
    };

    return {
        deleteFav,
        isLoading
    };
};
