import { useState } from 'react';
import { useDeleteFav } from '../../shared/hooks';
import { LoadingSpinner } from '../LoadingSpinner';
import Modal from "react-modal";

export const UserCard = ({ data, onFavUpdate }) => {
    const { nombre, cuenta, uid, username, role, email, cuentaAhorro, cuentaCredito, direccion, dpi, ingresos, montoIngresos, telefono, trabajo } = data;
    const { deleteFav, isLoading } = useDeleteFav();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentUserData, setCurrentUserData] = useState(null);

    const openModal = (userData) => {
        setCurrentUserData(userData);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentUserData(null);
    };

    const delet = (id) => {
        deleteFav(id);
        if (isLoading) {
            return (
                <LoadingSpinner />
            );
        }
    }

    return (
        <>
            <div className="fav-card2">
                <i className="fa-solid fa-user"></i>
                <span className='fav-car-title'>Nombre: </span>
                <span className="fav-card-text">{nombre}</span>
                <span className='fav-car-title'>Cuenta: </span>
                <span className="fav-card-text">{cuenta}</span>
                <span className="btn-info" role="button" onClick={() => openModal(data)}>
                    <i className="fa-solid fa-info" style={{ color: '#fff' }}></i>
                </span>
                <span className="btn-edit" role="button" onClick={() => edit(uid)}>
                    <i className="fa-solid fa-pen" style={{ color: '#fff' }}></i>
                </span>
                <span className="btn-delete" role="button" onClick={() => delet(uid)}>
                    <i className="fa-solid fa-trash" style={{ color: '#fff' }}></i>
                </span>
            </div>

            {currentUserData && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="User Information"
                    className="modal"
                    overlayClassName="Overlay"
                >
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <div className='modal-content'>
                                <div className='modal-title-box'>
                                    <h2>Información del Usuario</h2>
                                    <span className="btn-close2" role="button" onClick={closeModal}>
                                        <i className="fa-solid fa-xmark" style={{ color: '#fff' }}></i>
                                    </span>
                                </div>
                                <p><strong>Username:</strong> {currentUserData.username}</p>
                                <p><strong>Role:</strong> {currentUserData.role}</p>
                                <p><strong>Email:</strong> {currentUserData.email}</p>
                                <p><strong>Cuenta:</strong> {currentUserData.cuenta}</p>
                                <p><strong>Cuenta de Ahorro:</strong> {currentUserData.cuentaAhorro.numeroCuenta}</p>
                                <p><strong>Monto de Ahorro:</strong> {currentUserData.cuentaAhorro.monto}</p>
                                <p><strong>Cuenta de Crédito:</strong> {currentUserData.cuentaCredito.numeroCuenta}</p>
                                <p><strong>Monto de Crédito:</strong> {currentUserData.cuentaCredito.monto}</p>
                                <p><strong>Dirección:</strong> {currentUserData.direccion}</p>
                                <p><strong>DPI:</strong> {currentUserData.dpi}</p>
                                <p><strong>Ingresos:</strong> {currentUserData.ingresos}</p>
                                <p><strong>Monto de Ingresos:</strong> {currentUserData.montoIngresos}</p>
                                <p><strong>Nombre:</strong> {currentUserData.nombre}</p>
                                <p><strong>Teléfono:</strong> {currentUserData.telefono}</p>
                                <p><strong>Trabajo:</strong> {currentUserData.trabajo}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};