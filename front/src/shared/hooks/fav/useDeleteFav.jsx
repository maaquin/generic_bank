import { useState } from "react";
import { deleteFav as deleteFavRequest} from '../../../services'
import toast from "react-hot-toast";

export const useDeleteFav = () => {
    const [isLoading, setIsLoading] = useState(false)

    const deleteFav = async(favId) => {
        const response = await deleteFavRequest(favId)

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error')
        }

    }
    return{
        deleteFav,
        isLoading
    }
}