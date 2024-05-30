import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest} from '../../../services'
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const register = async(username, password, email) => {
        const response = await registerRequest({
            username,
            password,
            email
        })

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al registrarse, intentalo de nuevo')
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails))

        navigate('/')
    }
    return{
        register,
        isLoading
    }
}