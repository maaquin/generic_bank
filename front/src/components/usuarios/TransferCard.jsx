import { useDeleteFav } from '../../shared/hooks'
import { LoadingSpinner } from '../LoadingSpinner'

export const FavCard = ({ data, onClick }) => {

    const { _id, user1, user2 } = data;
    const { deleteFav, isLoading } = useDeleteFav()

    const delet = (id) => {
        console.log(id)
        deleteFav(id)
        if (isLoading) {
            return (
                <LoadingSpinner />
            )
        }
    }

    return (
        <div className="transfer-card" onClick={onClick}>
            <div className="add-user-fav">
                <i className="fa-solid fa-user"></i>
                <span>Nombre: </span>
                <p>{user2.nombre}</p>
            </div>
            <div className="add-user-fav">
                <i className="fa-solid fa-sack-dollar"></i>
                <span>Número de cuenta: </span>
                <p>{user2.cuenta}</p>
            </div>
        </div>
    );
};
