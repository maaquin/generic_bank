import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/navbar.png';
import { useUserDetails, useUserSettings } from '../../shared/hooks';
import { first } from '../../services/api'
import { LoadingSpinner } from '../LoadingSpinner';

const NavLogo = ({ onClickHandler }) => {
    return (
        <span className="nav-logo-container" onClick={onClickHandler}>
            <img className="nav-logo" src={logo} alt="Logo" />
            <span className='nav-title'>Banco</span>
        </span>
    );
};

const NavButton = ({ text, icon, onClickHandler, isActive }) => {
    return (
        <span className={`nav-button ${isActive ? 'active' : ''}`} onClick={onClickHandler}>
            <i className={icon} style={{ color: '#000000' }}></i>
            <span>{text}</span>
        </span>
    );
};

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [activeButton, setActiveButton] = useState('');
    const { user, fetching } = useUserSettings();
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleNavigate = (path, button) => {
        setActiveButton(button);
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        setActiveButton('');
    };

    if (userId && fetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className={`nav-container ${collapsed ? 'collapsed' : ''}`}>
            <NavLogo onClickHandler={toggleCollapse} />
            <div className="nav-buttons-container">
                <NavButton
                    text="Home"
                    icon="fa-solid fa-house-chimney"
                    onClickHandler={() => handleNavigate('/', '')}
                    isActive={activeButton === ''}
                />
                <NavButton
                    text="Divisas"
                    icon="fa-solid fa-money-bill"
                    onClickHandler={() => handleNavigate('/divisa', 'divisa')}
                    isActive={activeButton === 'divisa'}
                />
                {!isLogged ? (
                    <NavButton
                        text="Log in"
                        icon="fa-solid fa-right-to-bracket"
                        onClickHandler={async () => {
                            await first();
                            handleNavigate('/auth', 'login');
                        }}
                        isActive={activeButton === 'login'}
                    />
                ) : (
                    <>
                        {user.role === 'CLIENT_ROLE' ? (
                            <div className="mini-buttons-container">
                                <NavButton
                                    text="Canjear"
                                    icon="fa-solid fa-bag-shopping"
                                    onClickHandler={() => handleNavigate('/canjear', 'canjear')}
                                    isActive={activeButton === 'canjear'}
                                />
                                <NavButton
                                    text="Favoritos"
                                    icon="fa-solid fa-star"
                                    onClickHandler={() => handleNavigate('/favoritos', 'favoritos')}
                                    isActive={activeButton === 'favoritos'}
                                />
                            </div>
                        ) : (
                            <div className="mini-buttons-container">
                                <NavButton
                                    text="Transferencia"
                                    icon="fa-solid fa-piggy-bank"
                                    onClickHandler={() => handleNavigate('/cuentas', 'cuentas')}
                                    isActive={activeButton === 'cuentas'}
                                />
                                <NavButton
                                    text="Settings"
                                    icon="fa-solid fa-gear"
                                    onClickHandler={() => handleNavigate('/settings', 'settings')}
                                    isActive={activeButton === 'settings'}
                                />
                                <NavButton
                                    text="Log out"
                                    icon="fa-solid fa-right-from-bracket"
                                    onClickHandler={handleLogout}
                                    isActive={activeButton === 'logout'}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};