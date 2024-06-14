import { FavCard } from "../favoritos/FavCard";
import { useState, useEffect } from "react";
import { useEmail, useAddFav, useDeleteFav } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import Modal from "react-modal";

export const Favoritos = ({ fav, onFavUpdate }) => {
    const [inputValue, setInputValue] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [newFavAdded, setNewFavAdded] = useState(false);

    const { getUser, isFetching, user } = useEmail();
    const { addFav, isLoading } = useAddFav();
    const { deleteFav, isLoading: isDeleting } = useDeleteFav();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEmailInput('');
    };

    const searchUser = async () => {
        await getUser(emailInput);
    };

    const handleAddFav = async (userId) => {
        if (userId) {
            await addFav(userId);
            closeModal();
            setNewFavAdded(true);
        }
    };

    const handleDeleteFav = async (favId) => {
        await deleteFav(favId);
        onFavUpdate(); 
    };

    useEffect(() => {
        if (newFavAdded) {
            onFavUpdate();
            setNewFavAdded(false);
        }
    }, [newFavAdded, onFavUpdate]);

    const filteredFav = fav.filter(favo =>
        favo.user2.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <>
            <div className="channels-container">
                <span className="title-supreme">Tus usuarios favoritos</span>
                <div className="buscador-box">
                    <input
                        type="text"
                        name="buscador"
                        placeholder="Buscar..."
                        className="buscador"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className="fav-box">
                    <button className="add-btn" onClick={openModal}>
                        Add user <i className="fa-solid fa-user-plus"></i>
                    </button>
                    {filteredFav.length > 0 ? (
                        filteredFav.map((favo, index) => (
                            <div key={index}>
                                <FavCard data={favo} onFavUpdate={onFavUpdate}  />
                            </div>
                        ))
                    ) : (
                        <p className="nonono">Parece que aún no has agregado ningún usuario favorito.</p>
                    )}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Add Favorite User"
                className="Modal"
                overlayClassName="Overlay"
            >
                <span className="btn-close" role="button" onClick={closeModal}>
                    <i className="fa-solid fa-xmark" style={{ color: '#fff' }}></i>
                </span>
                <div className="modal-title-box">
                    <h2>Agregar Usuario Favorito</h2>
                </div>
                <div className="input-fav-box">
                    <input
                        type="email"
                        placeholder="Ingresa el email del usuario"
                        className="imput-fav"
                        value={emailInput}
                        onChange={handleEmailChange}
                    />
                    <span className="btn-buscar" role="button" onClick={searchUser}>
                        <i className="fa-solid fa-magnifying-glass" style={{ color: '#fff' }}></i>
                    </span>
                </div>
                {isFetching && <LoadingSpinner />}
                {!isFetching && user.length === 0 && (
                    <p>No se encontraron resultados.</p>
                )}
                {!isFetching && user.length > 0 && (
                    user.map((u) => (
                        <div className="add-fav" key={u.uid} onClick={() => handleAddFav(u.uid)}>
                            <div className="add-user-fav">
                                <i className="fa-regular fa-user"></i>
                                <p>{u.nombre}</p>
                            </div>
                            <div className="add-user-fav">
                                <i className="fa-regular fa-envelope"></i>
                                <p>{u.email}</p>
                            </div>
                        </div>
                    ))
                )}
            </Modal>
        </>
    );
};
