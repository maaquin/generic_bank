import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AgregarCuenta } from './agregaCuenta';

export const Transferencia = () => {
  const [cuentasAgregadas, setCuentasAgregadas] = useState([]);
  const navigate = useNavigate();

  const handleAgregarCuenta = () => {
    navigate('/agregarCuenta');
  };

  const handleTransferir = (index) => {
    console.log("Transferir cuenta con índice:", index);
  };

  const renderCuentaAgregada = (cuenta, index) => (
    <div className="cuenta" key={index}>
      <div className="info-item">{cuenta.numeroCuenta}</div>
      <div className="info-item">{cuenta.dpi}</div>
      <div className="info-item">{cuenta.alias}</div>
      <div className="info-item">
        <button onClick={() => handleTransferir(index)}>Transferir</button>
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
