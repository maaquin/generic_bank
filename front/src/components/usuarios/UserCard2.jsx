import { useDeleteFav } from '../../shared/hooks'
import { LoadingSpinner } from '../LoadingSpinner'

export const UserCard = ({ data }) => {

    const { nombre, cuenta, uid } = data;
    const { deleteFav, isLoading } = useDeleteFav()

    const delet = (id) => {
        deleteFav(id)
        if (isLoading) {
            return (
                <LoadingSpinner />
            )
        }
    }

    return (
        <div className="fav-card2">
            <i className="fa-solid fa-user"></i>
            <span className='fav-car-title'>Nombre: </span>
            <span className="fav-card-text">{nombre}</span>
            <span className='fav-car-title'>Cuenta: </span>
            <span className="fav-card-text">{cuenta}</span>
            <span className="btn-info" role="button" onClick={() => edit(uid)}>
                <i className="fa-solid fa-info" style={{ color: '#fff' }}></i>
            </span>
            <span className="btn-edit" role="button" onClick={() => edit(uid)}>
                <i className="fa-solid fa-pen" style={{ color: '#fff' }}></i>
            </span>
            <span className="btn-delete" role="button" onClick={() => delet(uid)}>
                <i className="fa-solid fa-trash" style={{ color: '#fff' }}></i>
            </span>
        </div>
    );
};
