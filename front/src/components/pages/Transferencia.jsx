import React, { useState } from 'react';
import { FavCard } from '../usuarios/TransferCard';
import { FinalizarTransferenciaModal } from './finalizarTransferencia';

export const Transferencia = ({ fav }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedCuenta, setSelectedCuenta] = useState(null);
  const [selectedTipoCuenta, setSelectedTipoCuenta] = useState('monetaria'); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCardClick = (cuenta, tipoCuenta) => {
    setSelectedCuenta(cuenta);
    setSelectedTipoCuenta(tipoCuenta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCuenta(null);
  };

  const filteredFav = fav.filter(favo =>
    favo.user2.nombre.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="centrado">
      <h2 className="titulo">Transferencias</h2>
      <hr className="linea" />
      <div className="buscador-box">
        <input
          type="text"
          className="buscador"
          placeholder="Buscar cuentas..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="cuentas-agregadas">
        <h3>Cuentas agregadas</h3>
        {filteredFav.length > 0 ? (
          filteredFav.map((favo, index) => (
            <FavCard key={index} data={favo} onClick={() => handleCardClick(favo.user2, 'monetaria')} />
          ))
        ) : (
          <p className="nonono">No hay ninguna cuenta con ese nombre</p>
        )}
      </div>
      {selectedCuenta && (
        <FinalizarTransferenciaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          cuenta={selectedCuenta}
          tipoCuenta={selectedTipoCuenta}
        />
      )}
    </div>
  );
};
