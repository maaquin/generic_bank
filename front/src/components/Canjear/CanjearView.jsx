// CanjearView.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CanjearDescription } from "./CanjearDescription";
import { useCanjearDetails } from "../../shared/hooks/canjear/useCanjearDetails";
import { LoadingSpinner } from "../LoadingSpinner";

export const ImgCanjear = ({ imgUrl }) => {
    return (
        <div className="channel-video-container">
            <img src={imgUrl} width='100%' height='100%' alt="Canjear Image" />
        </div>
    );
};

export const CanjearView = () => {
    const { isFetching, getCanjearDetails, canjearDetails } = useCanjearDetails();
    const { id } = useParams();

    useEffect(() => {
        getCanjearDetails(id);
    }, [id, getCanjearDetails]);

    if (isFetching) {
        return <LoadingSpinner />;
    }

    if (!canjearDetails) {
        return <div>No canjear details available.</div>;
    }

    return (
        <div className="channel-container">
            <div className="channel-video-description-section">
                <ImgCanjear imgUrl={canjearDetails.imgUrl} />
                <div className="channel-description-box2">
                    <CanjearDescription
                        canjearId={canjearDetails._id}
                        name={canjearDetails.name}
                        description={canjearDetails.description}
                        price={canjearDetails.price}
                        discountedPrice={canjearDetails.discountedPrice}
                    />
                </div>
            </div>
        </div>
    );
};
