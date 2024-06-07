import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AgregarCuenta } from './agregaCuenta';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TransferIcon from '@mui/icons-material/TransferWithinAStation';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Transferencia = () => {
  const [cuentasAgregadas, setCuentasAgregadas] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleAgregarCuenta = () => {
    navigate('/agregarCuenta');
  };

  const handleTransferir = (index) => {
    console.log("Transferir cuenta con índice:", index);
  };

  const handleEliminar = (index) => {
    const nuevasCuentas = cuentasAgregadas.filter((_, i) => i !== index);
    setCuentasAgregadas(nuevasCuentas);
  };

  const handleEditar = (index) => {
    console.log("Editar cuenta con índice:", index);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderCuentaAgregada = (cuenta, index) => (
    <div className="cuenta" key={index}>
      <div className="info-item">{cuenta.numeroCuenta}</div>
      <div className="info-item">{cuenta.dpi}</div>
      <div className="info-item">{cuenta.alias}</div>
      <div className="info-item">
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className="transferencia-icon"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleTransferir(index)} className="transferir-button">
              <TransferIcon />
              Transferir
            </MenuItem>
            <MenuItem onClick={() => handleEliminar(index)} className="cancelar-button">
              <DeleteIcon />
              Eliminar
            </MenuItem>
            <MenuItem onClick={() => handleEditar(index)} className="editar-button">
              <EditIcon />
              Editar
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="centrado">
      <h2 className="titulo">Transferencias</h2>
      <hr className="linea" />
      <div className="barra">
        <span className="texto">Agregar una cuenta</span>
        <button onClick={handleAgregarCuenta}>Agregar</button>
        <AgregarCuenta setCuentasAgregadas={setCuentasAgregadas} />
      </div>
      <div className="cuentas-agregadas">
        <h3>Cuentas agregadas</h3>
        <div className="user-info-card">
          <div className="header-container">
            <div className="info-item info-header">No. Cuenta</div>
            <div className="info-item info-header">DPI</div>
            <div className="info-item info-header">Alias</div>
            <div className="info-item info-header">Opciones</div>
          </div>
          {cuentasAgregadas.map(renderCuentaAgregada)}
        </div>
      </div>
    </div>
  );
};
