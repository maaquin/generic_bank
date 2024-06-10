import { useState } from "react";
import { addFav as addFavRequest} from '../../../services'
import toast from "react-hot-toast";

export const useAddFav = () => {
    const [isLoading, setIsLoading] = useState(false)
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const addFav = async( user2 ) => {
        const response = await addFavRequest({
            user1: userId,
            user2
        })

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error')
        }

    }
    return{
        addFav,
        isLoading
    }
}