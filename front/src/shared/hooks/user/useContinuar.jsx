import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { continuar as continuarRequest} from '../../../services'
import toast from "react-hot-toast";

export const useContinuar = () => {
    const [isLoading, setIsLoading] = useState(false)

    const userDetailsString = localStorage.getItem("user");
    const userDetails = JSON.parse(userDetailsString);
    const email = userDetails.email;

    const navigate = useNavigate()

<<<<<<< HEAD
    const continuar = async( dpi, nombre, direccion, telefono, trabajo, ingresos, monto ) => {
=======
    const continuar = async( dpi, nombre, direccion, telefono, trabajo, ingresos, monto, cuenta, montoAhorro, montoCredito) => {
>>>>>>> developer
        const response = await continuarRequest({
            email, 
            dpi, 
            nombre, 
            direccion, 
            telefono, 
            trabajo, 
            ingresos, 
            monto,
            cuenta,
            montoAhorro,
            montoCredito,
        })

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error al registrarse, intentalo de nuevo')
        }

        navigate('/')
    }
    return{
        continuar,
        isLoading
    }
}