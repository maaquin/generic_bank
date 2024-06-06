import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useCanjear, useUserDetails, useListFav } from "../../shared/hooks";

import "./dashboardPage.css";

export const DashboardPage = () => {

    const { getCanjear, allCanjear, isFetching: isCanjearFetching } = useCanjear();
    const { getFav, allFav, isFetching: isFavFetching } = useListFav();
    const { isLogged } = useUserDetails();

    useEffect(() => {
        getCanjear(isLogged);
        getFav(isLogged);
    }, []);

    if (isCanjearFetching || isFavFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content
                canjear={allCanjear || []} getCanjear={getCanjear}
                fav={allFav || []} getFav={getCanjear}
            />
        </div>
    );
};

