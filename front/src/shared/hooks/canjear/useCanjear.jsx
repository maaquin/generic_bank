// shared/hooks/canjear/useCanjear.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { getCanjear as getCanjearRequest } from "../../../services/api";

export const useCanjear = () => {
    const [canjear, setCanjear] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getCanjear = async () => {
        setIsFetching(true);
        try {
            const canjearData = await getCanjearRequest();
            if (canjearData.error) {
                toast.error(
                    canjearData.e?.response?.data || 'Error ocurred when reading stores'
                );
            } else {
                setCanjear(canjearData.data);
            }
        } catch (error) {
            console.error('Error fetching canjear:', error);
            toast.error('Error fetching canjear');
        } finally {
            setIsFetching(false);
        }
    };

    return {
        getCanjear,
        isFetching,
        allCanjear: canjear,
    };
};
