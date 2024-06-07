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
  const [anchorEl, setAnchorEl] = useState({});
  const [alternarColor, setAlternarColor] = useState(false);
  const navigate = useNavigate();

  const handleAgregarCuenta = () => {
    navigate('/agregaCuenta');
    setAlternarColor((prevAlternarColor) => !prevAlternarColor);
  };
  

  const handleTransferir = (index) => {
    console.log("Transferir cuenta con índice:", index);
  };

  const handleEliminar = (index) => {
    const nuevasCuentas = cuentasAgregadas.filter((_, i) => i !== index);
    setCuentasAgregadas(nuevasCuentas);
    setAnchorEl({});
  };
  
  const handleClick = (event, index) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = (index) => {
    setAnchorEl({ [index]: null });
  };

  const renderCuentaAgregada = (cuenta, index, color) => (
    <div className="cuenta" key={index} style={{ backgroundColor: color }}>
      <div className="info-item">{cuenta.numeroCuenta}</div>
      <div className="info-item">{cuenta.dpi}</div>
      <div className="info-item">{cuenta.alias}</div>
      <div className="info-item">
        <div>
          <IconButton
            aria-label="more"
            aria-controls={`long-menu-${index}`}
            aria-haspopup="true"
            onClick={(event) => handleClick(event, index)}
            className="transferencia-icon">
            <MoreVertIcon />
          </IconButton>
          <Menu
            id={`long-menu-${index}`}
            anchorEl={anchorEl[index]}
            open={Boolean(anchorEl[index])}
            onClose={() => handleClose(index)}
          >
            <MenuItem onClick={() => handleTransferir(index)} className="transferir-button">
              <TransferIcon />
              Transferir
            </MenuItem>
            <MenuItem onClick={() => handleEliminar(index)} className="cancelar-button">
              <DeleteIcon />
              Eliminar
            </MenuItem>
            <MenuItem onClick={() => handleEliminar(index)} className="editar-button">
              <EditIcon />
              Editar
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );

  const renderCuentasAgregadas = () => {
    let color = '#ffffff'; 
    return cuentasAgregadas.map((cuenta, index) => {
      color = alternarColor ? '#f5f5f5' : color;
      return renderCuentaAgregada(cuenta, index, color);
    });
  };

  return (
    <div className="centrado">
      <h2 className="titulo">Transferencias</h2>
      <hr className="linea" />
      <div className="barra">
        <span className="texto">Agregar una cuenta</span>
        <button onClick={handleAgregarCuenta}>Agregar</button>
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
          {renderCuentasAgregadas()}
        </div>
      </div>
    </div>
  );
};
