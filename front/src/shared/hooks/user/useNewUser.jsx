import { useState } from "react";
import { newUser as continuarRequest} from '../../../services'
import toast from "react-hot-toast";

export const useNewUser = () => {
    const [isLoading, setIsLoading] = useState(false)

    const newUser = async ( username, password, email, dpi, nombre, direccion, telefono, trabajo, ingresos, monto, montoAhorro, montoCredito) => {

        const response = await continuarRequest({
            username,
            password,
            email, 
            dpi, 
            nombre, 
            direccion, 
            telefono, 
            trabajo, 
            ingresos, 
            monto,
            montoAhorro,
            montoCredito,
        })

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al registrarse, intentalo de nuevo')
        }

    }
    return{
        newUser,
        isLoading
    }
}