import { useDeleteFav } from '../../shared/hooks'
import { LoadingSpinner } from '../LoadingSpinner'

export const FavCard = ({ data, onFavUpdate }) => {

    const { _id, user1, user2 } = data;
    const { deleteFav, isLoading } = useDeleteFav()

    const handleDeleteFav = async (favId) => {
        await deleteFav(favId);
        onFavUpdate(); 
    };

    return (
        <div className="fav-card">
            <i className="fa-solid fa-user-tie"></i>
            <span className='fav-car-title'>Nombre: </span>
            <span className="fav-card-text">{user2.nombre}</span>
            <span className='fav-car-title'>Cuenta: </span>
            <span className="fav-card-text">{user2.cuenta}</span>
            <span className="btn-delete" role="button" onClick={() => handleDeleteFav(_id)}>
                <i className="fa-solid fa-trash" style={{ color: '#fff' }}></i>
            </span>
        </div>
    );
};
