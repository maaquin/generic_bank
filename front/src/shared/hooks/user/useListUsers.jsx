import { useState } from "react";
import toast from "react-hot-toast";
import { users } from "../../../services";

export const useListUsers = () => {
    const [user, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getUser = async (isLogged) => {
        setIsFetching(true);
        try {
            if (isLogged) {
                const data = await users();
                console.log(data)
                if (data.error) {
                    toast.error(
                        data.e?.data?.data || 'Error ocurred when reading'
                    );
                } else {
                    setUsers(data.data);
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
        getUser,
        isFetching,
        allUser: user,
    };
};
