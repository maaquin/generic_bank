import { useUserDetails } from "../../shared/hooks";

export const CanjearDescription = ({
    name,
    productId,
    description,
    price,
    discountedPrice,
}) => {
    const { isLogged } = useUserDetails();

    return (
        <div className="channel-description-container">
            <div className="channel-description-title-box">
                <span className="channel-description-title">
                    {name}
                </span>
                <div className="channel-description-item">
                    <span className="channel-description-title2">Price:</span>
                    <span className="channel-description price">Q{price}</span>
                </div>
            </div>
            <div className="channel-description-box">
                <div className="channel-description-item">
                    <span className="channel-description-title2">Description:</span>
                    <span className="channel-description">{description}</span>
                </div>

                {discountedPrice && (
                    <div className="channel-description-item">
                        <span className="channel-description-title2">Discounted Price:</span>
                        <span className="channel-description discounted-price">{discountedPrice}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
