import {useDeleteFav} from '../../shared/hooks'
import {LoadingSpinner} from '../LoadingSpinner'

export const FavCard = ({ data }) => {

    const { _id, user1, user2 } = data;
    const { deleteFav, isLoading } = useDeleteFav()

    const delet = (id) => {
        deleteFav(id)
        if(isLoading){
            return (
                <LoadingSpinner/>
            )
        }
    }

    return (
        <div className="fav-card">
            <i className="fa-solid fa-user-tie"></i>
            <span className="fav-card-text">{user2}</span>
            <button onClick={delet}>
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    );
};
