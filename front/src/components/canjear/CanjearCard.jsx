// CanjearCard.jsx
const imageUrl = 'https://www.msi-viking.com/sca-dev-2023-1-0/img/no_image_available.jpeg';

const CanjearAvatar = ({ url }) => {
    return (
        <div className="channels-img-container">
            <img src={url ? url : imageUrl} width='100%' height='100%' alt="Default img" />
        </div>
    );
};

export const CanjearCard = ({ data, navigateToStoreHandler }) => {

    const { name, _id, description, price, discountedPrice, imgUrl } = data;
    const handleNavigate = () => {
        navigateToStoreHandler(_id);
    };

    return (
        <div className="channels-card" onClick={handleNavigate}>
            <CanjearAvatar url={imgUrl} />
            <span className="channels-card-text price">Q{price}</span>
            <div className="channels-card-divider"></div> {}
            <span className="channels-card-title">{name}</span>
            <span className="channels-card-text description">{description}</span>
            {discountedPrice && <span className="channels-card-text discounted-price">{discountedPrice}</span>}
        </div>
    );
};
