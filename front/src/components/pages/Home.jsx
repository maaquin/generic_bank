import React, { useState } from 'react';
import Modal from "react-modal";
import { UserCard } from '../usuarios/UserCard';
import { useUserDetails, useUserSettings } from "../../shared/hooks";
import { LoadingSpinner } from '../LoadingSpinner';
import { useNavigate } from "react-router-dom";

const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 11) {
        return "Good Morning";
    } else if (hours >= 11 && hours < 13) {
        return "Good Midday";
    } else if (hours >= 13 && hours < 18) {
        return "Good Afternoon";
    } else if (hours >= 18 && hours < 22) {
        return "Good Evening";
    } else if (hours >= 22 || hours < 1) {
        return "Good Night";
    } else {
        return "Good Midnight";
    }
};

export const Home = ({ usuarios, onUserUpdate }) => {
    console.log(usuarios);
    const [inputValue, setInputValue] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { isLogged } = useUserDetails();
    const { user, fetching } = useUserSettings();
    const navigate = useNavigate();

    const handleUserTypeSelection = (userType) => {
        if (userType === "me") {
            navigate("/you");
        } else {
            navigate("/someone");
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (fetching) {
        return <LoadingSpinner />;
    }

    const filteredUser = usuarios?.filter(use =>
        use.nombre?.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="home-container">
            {!isLogged ? (
                <div>
                    <h1>hola, primero debes hacer login</h1>
                </div>
            ) : (
                <>
                    {user.role === 'CLIENT_ROLE' ? (
                        <>
                            <div className="welcome">
                                <h1>
                                    {getGreeting()},
                                </h1>
                                <div className='user'>
                                    {user.nombre}
                                </div>
                            </div>
                            <div className='cuentas-box'>
                                <div className="monetaria">
                                    <div className='cuenta-box'>
                                        <div className="cuenta-title">Saldo monetaria</div>
                                        <div className="cuenta">{user.cuenta}</div>
                                    </div>
                                    <div className="balance">{user.monto} Q</div>
                                </div>
                                <div className="monetaria">
                                    <div className='cuenta-box'>
                                        <div className="cuenta-title">Monto ahorro</div>
                                        <div className="cuenta">{user.cuenta}</div>
                                    </div>
                                    <div className="balance">{user.monto} Q</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">Credit card</div>
                                <div className="balance">{user.monto} Q</div>
                                <div className="card-number">{user.cuenta}</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="channels-container">
                                <span className="title-supreme">Usuarios</span>
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
                                    {filteredUser && filteredUser.length > 0 ? (
                                        filteredUser.map((favo, index) => (
                                            <UserCard key={index} data={favo} />
                                        ))
                                    ) : (
                                        <p className="nonono">Parece que aún no hay usuarios, pero si estas tu ya hay, asi que debe ser un error de conexion con backend o data base xddddddd</p>
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
                                <h1>hola</h1>
                            </Modal>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
