import { useEffect, useState } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useCanjear, useUserDetails, useListFav, useListUsers } from "../../shared/hooks";

import "./dashboardPage.css";
import './css/home.css';
import './css/divisa.css';
import './css/transferencia.css'

export const DashboardPage = () => {

    const { getCanjear, allCanjear, isFetching: isCanjearFetching } = useCanjear();
    const { getFav, allFav, isFetching: isFavFetching } = useListFav();
    const { getUser, allUser, isFetching: isUserFetching } = useListUsers();
    const { isLogged } = useUserDetails();

    const [favUpdated, setFavUpdated] = useState(false);
    const handleFavUpdate = () => {
        setFavUpdated(!favUpdated);
    };

    useEffect(() => {
        getCanjear(isLogged);
        getFav(isLogged);
        getUser(isLogged);
    }, [favUpdated]);

    if (isCanjearFetching || isFavFetching || isUserFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content
                canjear={allCanjear || []}
                fav={allFav || []} updateFav={handleFavUpdate}
                user={allUser || []}
            />
        </div>
    );
};

