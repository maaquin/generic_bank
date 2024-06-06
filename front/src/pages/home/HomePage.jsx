import React from 'react';
import useHome from '../../shared/hooks/user/useHome';

export const HomePage = () => {

    const { user, loading, error } = useHome();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user: {error.message}</p>;

    
}
