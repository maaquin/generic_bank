import { useState } from 'react';
import { useDeleteUser, useUpdateUser } from '../../shared/hooks';
import { LoadingSpinner } from '../LoadingSpinner';
import Modal from "react-modal";
Modal.setAppElement('#root');

export const UserCard = ({ data, onFavUpdate, token }) => {
    const { nombre, cuenta, uid, username, role, email, cuentaAhorro, cuentaCredito, direccion, dpi, ingresos, montoIngresos, telefono, trabajo } = data;
    const { deleteUser, isLoading: isDeleting } = useDeleteUser();
    const { updateUser, isLoading: isUpdating } = useUpdateUser();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});

    const openModal = (userData) => {
        setCurrentUserData(userData);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentUserData(null);
    };

    const openEditModal = (userData) => {
        setEditedUserData(userData);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setEditedUserData({});
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditSubmit = async () => {
        const result = await updateUser(editedUserData, token);
        if (!result.error) {
            onFavUpdate(); 
            closeEditModal(); 
        }
    };
    const delet = async (userId) => {
        const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este usuario?');

        if (confirmDelete) {
            await deleteUser(userId);
            onFavUpdate();
        }
    };

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
                <span className="btn-edit" role="button" onClick={() => openEditModal(data)}>
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

            {editModalIsOpen && (
                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={closeEditModal}
                    contentLabel="Edit User Information"
                    className="modal"
                    overlayClassName="Overlay"
                >
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <div className='modal-content'>
                                <div className='modal-title-box'>
                                    <h2>Editar Información del Usuario</h2>
                                    <span className="btn-close2" role="button" onClick={closeEditModal}>
                                        <i className="fa-solid fa-xmark" style={{ color: '#fff' }}></i>
                                    </span>
                                </div>
                                <label>Username: 
                                <input type="text" name="username" value={editedUserData.username} onChange={handleEditChange} />
                                </label>
                                <label>Role:
                                <input type="text" name="role" value={editedUserData.role} onChange={handleEditChange} />
                                </label>
                                <label>Cuenta:
                                <input type="text" name="cuenta" value={editedUserData.cuenta} onChange={handleEditChange} />
                                </label>
                                <label>Cuenta de Ahorro:
                                <input type="text" name="cuentaAhorro" value={editedUserData.cuentaAhorro.numeroCuenta} onChange={handleEditChange} />
                                </label>
                                <label>Monto de Ahorro:
                                <input type="text" name="cuentaAhorroMonto" value={editedUserData.cuentaAhorro.monto} onChange={handleEditChange} />
                                </label>
                                <label>Cuenta de credito:
                                <input type="text" name="cuentaCredito" value={editedUserData.cuentaCredito.numeroCuenta} onChange={handleEditChange} />
                                </label>
                                <label>Monto de credito:
                                <input type="text" name="cuentaCreditoMonto" value={editedUserData.cuentaCredito.monto} onChange={handleEditChange} />
                                </label>
                                <label>Dirección:
                                <input type="text" name="direccion" value={editedUserData.direccion} onChange={handleEditChange} />
                                </label>
                                <label>Ingresos:
                                <input type="text" name="ingresos" value={editedUserData.ingresos} onChange={handleEditChange} />
                                </label>
                                <label>Monto de ingresos:
                                <input type="text" name="montoIngresos" value={editedUserData.montoIngresos} onChange={handleEditChange} />
                                </label>
                                <label>Nombre:
                                <input type="text" name="nombre" value={editedUserData.nombre} onChange={handleEditChange} />
                                </label>
                                <label>Teléfono:
                                <input type="text" name="telefono" value={editedUserData.telefono} onChange={handleEditChange} />
                                </label>
                                <label>Trabajo:
                                <input type="text" name="trabajo" value={editedUserData.trabajo} onChange={handleEditChange} />
                                </label>
                                <button onClick={handleEditSubmit}>Guardar Cambios</button>
                                {isUpdating && <LoadingSpinner />}
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};
