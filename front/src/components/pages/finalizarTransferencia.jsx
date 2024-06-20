import React, { useState, useEffect } from 'react';

export const FinalizarTransferenciaModal = ({ isOpen, onClose, cuenta, tipoCuenta }) => {
  const [selectedAccountType, setSelectedAccountType] = useState(tipoCuenta);
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    if (cuenta) {
      setSelectedAccountType(tipoCuenta);
      updateAccountNumber(tipoCuenta);
    }
  }, [cuenta, tipoCuenta]);

  const updateAccountNumber = (accountType) => {
    if (cuenta) {
      let newAccountNumber = 'No disponible';
      if (accountType === 'ahorro' && cuenta.cuentaAhorro && cuenta.cuentaAhorro.numeroCuenta) {
        newAccountNumber = cuenta.cuentaAhorro.numeroCuenta;
      } else if (accountType === 'credito' && cuenta.cuentaCredito && cuenta.cuentaCredito.numeroCuenta) {
        newAccountNumber = cuenta.cuentaCredito.numeroCuenta;
      } else if (accountType === 'monetaria' && cuenta.cuenta) {
        newAccountNumber = cuenta.cuenta;
      }
      setAccountNumber(newAccountNumber);
      console.log(`Updated account number for ${accountType}: ${newAccountNumber}`);
    }
  };

  const handleAccountTypeChange = (e) => {
    const accountType = e.target.value;
    setSelectedAccountType(accountType);
    updateAccountNumber(accountType);
  };


  const handleTransfer = () => {
    if (!selectedAccountType) {
      alert('Por favor, seleccione un tipo de cuenta.');
      return;
    }
    console.log(`Transferencia confirmada a la cuenta ${accountNumber} (${selectedAccountType})`);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Finalizar Transferencia</h2>
        <p>Nombre: {cuenta?.nombre || 'No disponible'}</p>
        <p>Número de cuenta: {accountNumber}</p>
        
        <div className="select-account-type">
          <label htmlFor="accountType">Tipo de cuenta: </label>
          <select id="accountType" value={selectedAccountType} onChange={handleAccountTypeChange}>
            <option value="ahorro">Ahorro</option>
            <option value="credito">Crédito</option>
            <option value="monetaria">Monetaria</option>
          </select>
        </div>
        
        <button onClick={onClose}>Cerrar</button>
        <button onClick={handleTransfer}>Confirmar Transferencia</button>
      </div>
    </div>
  );
};
