import { useState } from "react";
import { transferencia as transferenciaRequest} from '../../../services'
import toast from "react-hot-toast";

export const useTransferencia = () => {
    const [isLoading, setIsLoading] = useState(false)

    const transferencia = async( userId, monto, signo, cuenta ) => {
        const response = await transferenciaRequest({
            userId,
            monto, 
            signo, 
            cuenta
        })

        setIsLoading(false)

        if(response.error){
            return toast.error(response.e?.response?.data || 'Ocurrio un error')
        }

    }
    return{
        transferencia,
        isLoading
    }
}