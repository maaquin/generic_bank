import { useState } from "react";
import {toast} from "react-hot-toast";
import { extra } from "../../../services";

export const useExtraDetails = () => {
    const [extraDetails, setExtraDetails] = useState();
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const getExtraDetails = async () => {
        const responseData = await extra({userId})

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información del usuario'
            )
        }
        setExtraDetails(responseData)
    }

    return{
        extraDetails,
        isFetching: !extraDetails,
        getExtraDetails
    }
}