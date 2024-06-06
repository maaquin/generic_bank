import { useState, useEffect } from 'react';
import { getUserHome } from '../../services/api';

const useUsers = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const result = await getUserHome();
            if (result.error) {
                setError(result.e);
                setLoading(false);
            } else {
                setUser(result.user || []); 
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

export default useUsers;