import { useDeleteFav } from '../../shared/hooks';
import { LoadingSpinner } from '../LoadingSpinner';

export const FavCard = ({ data, onClick }) => {
    const { _id, user1, user2 } = data;
    const { deleteFav, isLoading } = useDeleteFav();

    const handleDelete = (id) => {
        console.log(id);
        deleteFav(id);
    };

    console.log('user2 data:', user2);

    return (
        <div className="transfer-card" onClick={onClick}>
            <div className="add-user-fav">
                <i className="fa-solid fa-user"></i>
                <span>Nombre: </span>
                <p>{user2.nombre}</p>
            </div>
            <div className="add-user-fav">
                <i className="fa-solid fa-sack-dollar"></i>
                <span>Número de cuenta (Monetaria): </span>
                <p>{user2.cuenta || 'N/A'}</p>
            </div>
            <div className="add-user-fav">
                <i className="fa-solid fa-piggy-bank"></i>
                <span>Número de cuenta (Ahorro): </span>
                <p>{user2?.cuentaAhorro || 'N/A'}</p>
            </div>
            <div className="add-user-fav">
                <i className="fa-solid fa-credit-card"></i>
                <span>Número de cuenta (Crédito): </span>
                <p>{user2?.cuentaCredito || 'N/A'}</p>
            </div>
        </div>
    );
};
