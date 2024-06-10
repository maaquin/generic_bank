import { useState } from "react";
import toast from "react-hot-toast";
import { listFav } from "../../../services";

export const useListFav = () => {
    const [fav, setFav] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const getFav = async (isLogged) => {
        setIsFetching(true);
        try {
            if (isLogged) {
                const favData = await listFav(userId);
                if (favData.error) {
                    toast.error(
                        favData.e?.favData?.data || 'Error ocurred when reading favs'
                    );
                } else {
                    setFav(favData.data);
                }
            }
        } catch (error) {
            console.error('Error fetching fav:', error);
            toast.error('Error fetching fav');
        } finally {
            setIsFetching(false);
        }
    };

    return {
        getFav,
        isFetching,
        allFav: fav,
    };
};
