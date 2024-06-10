import React, { useState } from 'react';

export const Transferencia = () => {
  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, index) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = (index) => {
    setAnchorEl({ [index]: null });
  };

  const handleTransferir = (index) => {
    console.log("Transferir cuenta con índice:", index);
  };

  const handleEliminar = (index) => {
    console.log("Eliminar cuenta con índice:", index);
    setAnchorEl({});
  };
  
  return (
    <div className="centrado">
      <h2 className="titulo">Transferencias</h2>
      <hr className="linea" />
      <div className="barra"></div>
      <div className="cuentas-agregadas">
        <h3>Cuentas agregadas</h3>
        <div className="user-info-card">
          <div className="header-container">
            <div className="info-item info-header">No. Cuenta</div>
            <div className="info-item info-header">DPI</div>
            <div className="info-item info-header">Alias</div>
            <div className="info-item info-header">Opciones</div>
          </div>
        </div>
      </div>
    </div>
  );
};
