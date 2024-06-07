import { useEffect, useState } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useCanjear, useUserDetails, useListFav } from "../../shared/hooks";

import "./dashboardPage.css";

export const DashboardPage = () => {

    const { getCanjear, allCanjear, isFetching: isCanjearFetching } = useCanjear();
    const { getFav, allFav, isFetching: isFavFetching } = useListFav();
    const { isLogged } = useUserDetails();

    const [favUpdated, setFavUpdated] = useState(false);
    const handleFavUpdate = () => {
        setFavUpdated(!favUpdated);
    };

    useEffect(() => {
        getCanjear(isLogged);
        getFav(isLogged);
    }, [favUpdated]);

    if (isCanjearFetching || isFavFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content
                canjear={allCanjear || []}
                fav={allFav || []} updateFav={handleFavUpdate}
            />
        </div>
    );
};

