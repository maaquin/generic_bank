import { useState } from "react";
import { deleteUser as deleteUserRequest} from '../../../services'
import toast from "react-hot-toast";

export const useDeleteUser = () => {
    const [isLoading, setIsLoading] = useState(false)

    const deleteUser = async(favId) => {
        const response = await deleteUserRequest(favId)

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error')
        }

    }
    return{
        deleteUser,
        isLoading
    }
}