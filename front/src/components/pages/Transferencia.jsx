import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FavCard } from '../usuarios/TransferCard';
import { FinalizarTransferenciaModal } from './finalizarTransferencia';

export const Transferencia = ({ fav }) => {
  console.log("fav: ", fav)
  const location = useLocation();
  const { cuenta, tipoCuenta, monto } = location.state || {};
  console.log("cuenta: ", cuenta)
  console.log("tipoCuenta: ", tipoCuenta)
  console.log("monto: ", monto)
  const [inputValue, setInputValue] = useState('');
  const [selectedCuenta, setSelectedCuenta] = useState(null);
  console.log("selectedCuenta", selectedCuenta)
  const [selectedTipoCuenta, setSelectedTipoCuenta] = useState('cuenta');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCardClick = (cuenta, tipoCuenta) => {
    setSelectedCuenta(cuenta);
    console.log("cuenta", cuenta)
    setSelectedTipoCuenta(tipoCuenta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCuenta(null);
  };

  const filteredFav = fav.filter(favo =>
    favo.user2?.nombre.toLowerCase().includes(inputValue.toLowerCase())
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
        <div className="grid-container">
          {filteredFav.length > 0 ? (
            filteredFav.map((favo, index) => (
              <FavCard key={index} data={favo} onClick={() => handleCardClick(favo.user2, 'cuenta')} />
            ))
          ) : (
            <p className="nonono">No hay ninguna cuenta con ese nombre</p>
          )}
        </div>
      </div>
      {selectedCuenta && (
        <FinalizarTransferenciaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          cuenta={selectedCuenta}
          tipoCuenta={selectedTipoCuenta}
          tipo={tipoCuenta}
        />
      )}
    </div>
  );
};
