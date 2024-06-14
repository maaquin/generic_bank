import { useState } from "react";
import toast from "react-hot-toast";
import { email as emailRequest } from "../../../services";

export const useEmail = () => {
    const [user, setUser] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getUser = async (email) => {
        setIsFetching(true);
        try {
            const userData = await emailRequest({ email });
            console.log(userData)
            if (userData.error) {
                toast.error(
                    userData.e?.userData?.data || 'Error ocurred when reading favs'
                );
            } else {
                setUser(userData.data);
            }
        } catch (error) {
            console.error('Error fetching:', error);
            toast.error('Error add a fav');
        } finally {
            setIsFetching(false);
        }
    };

    return {
        getUser,
        isFetching,
        user
    };
};
