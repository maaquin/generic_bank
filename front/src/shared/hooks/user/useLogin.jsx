import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from '../../../services'
import toast from "react-hot-toast";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const login = async (email, password) => {
        const response = await loginRequest({
            email,
            password
        })

        setIsLoading(false)

        if (response.error) {
            const error = toast.error(response.e?.response?.data || 'Ocurrio un error al iniciar sesion, intentalo de nuevo')
            return error
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails))

        navigate('/')
    }
    return {
        login,
        isLoading
    }
}