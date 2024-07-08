import { useState } from "react";
import toast from "react-hot-toast";
import { getCanjearDetails as getCanjearDetailsRequest } from "../../../services/api";

export const useCanjearDetails = () => {
    const [canjearDetails, setCanjearDetails] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getCanjearDetails = async (id) => {
        setIsFetching(true);
        try {
            const responseData = await getCanjearDetailsRequest(id);
            if (responseData.error) {
                toast.error(
                    responseData.e?.response?.data ||
                    'Error al cargar la información del canjear'
                );
            } else {
                setCanjearDetails(responseData.data);
            }
        } catch (error) {
            console.error('Error fetching canjear details:', error);
            toast.error('Error fetching canjear details');
        } finally {
            setIsFetching(false);
        }
    };

    return {
        canjearDetails,
        isFetching,
        getCanjearDetails,
    };
};
