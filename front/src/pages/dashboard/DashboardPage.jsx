/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Content } from "../../components/dashboard/Content";
import {  } from "../../shared/hooks";

import "./dashboardPage.css";
import { useParams } from "react-router-dom";

export const DashboardPage = () => {

    return (
        <div className="dashboard-container">
            <Navbar />
            <Content/>
        </div>
    );
};

