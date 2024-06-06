/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import { useCanjear } from "../../shared/hooks/canjear/useCanjear.jsx";

import "./dashboardPage.css";
import { useUserDetails } from "../../shared/hooks";

export const DashboardPage = () => {
    const { getCanjear, allCanjear, isFetching: isCanjearFetching } = useCanjear();
    const { isLogged } = useUserDetails();

    useEffect(() => {
        getCanjear(isLogged);
    }, []);

    if (isCanjearFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content 
            canjear={allCanjear || []} getCanjear={getCanjear}
            />
        </div>
    );
};

