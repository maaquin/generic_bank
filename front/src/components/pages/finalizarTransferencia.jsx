import React, { useState, useEffect } from 'react';
import { useTransferencia } from '../../shared/hooks'

export const FinalizarTransferenciaModal = ({ isOpen, onClose, cuenta, tipoCuenta, tipo }) => {
  const [selectedAccountType, setSelectedAccountType] = useState(tipoCuenta);
  const [type, setType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [transferDetails, setTransferDetails] = useState(null);
  const [totalTransferToday, setTotalTransferToday] = useState(0);
  const { transferencia, isLoading } = useTransferencia();

  useEffect(() => {
    if (cuenta) {
      updateAccountNumber(selectedAccountType);
    }
  }, [cuenta, selectedAccountType]);

  const updateAccountNumber = (accountType) => {
    let accountNum = '';
    let accountName = cuenta?.nombre || '';
    let type = '';
    switch (accountType) {
      case 'cuenta':
        accountNum = cuenta.cuenta || '';
        type = 'cuenta';
        break;
      case 'cuentaAhorro':
        accountNum = cuenta?.cuentaAhorro || '';
        type = 'cuentaAhorro';
        break;
      case 'cuentaCredito':
        accountNum = cuenta?.cuentaCredito || '';
        type = 'cuentaCredito';
        break;
      default:
        accountNum = '';
    }
    setAccountNumber(accountNum);
    setAccountName(accountName);
    setType(type);
  };

  const handleAccountTypeChange = (e) => {
    const accountType = e.target.value;
    setSelectedAccountType(accountType);
    updateAccountNumber(accountType);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleTransfer = () => {
    if (!selectedAccountType) {
      alert('Por favor, seleccione un tipo de cuenta.');
      return;
    }
    if (!amount) {
      alert('Por favor, ingrese un monto para transferir.');
      return;
    }

    const transferAmount = parseFloat(amount);

    if (transferAmount > 2000) {
      alert('No puede transferir más de Q2000 en una sola transferencia.');
      return;
    }

    if (transferAmount > cuenta.saldo) {
      alert('El monto a transferir excede el saldo disponible en la cuenta.');
      return;
    }

    if (totalTransferToday + transferAmount > 10000) {
      alert('Ha excedido el límite diario de transferencia de Q10000.');
      return;
    }

    const details = {
      debitAccount: {
        number: accountNumber,
        name: accountName
      },
      date: new Date().toLocaleString(),
      amount: transferAmount.toFixed(2)
    };

    console.log(`Transferencia confirmada de ${transferAmount} a la cuenta ${accountNumber} (${selectedAccountType})`);

    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;
    transferencia(userId, transferAmount, 'resta', tipo);
    transferencia(cuenta._id, transferAmount, 'suma', type);

    setTransferDetails(details);
    setIsSuccess(true);
    setTotalTransferToday(totalTransferToday + transferAmount);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div>
          <h2>Finalizar Transferencia</h2>
          <div className="account-info">
            <p>Nombre: {cuenta?.nombre}</p>
            <p>Número de cuenta: {accountNumber}</p>
          </div>
        </div>
        {isSuccess && transferDetails ? (
          <>
            <div className="success-message">
              <p>______</p>
            </div>
            <div className="transfer-details">
              <h4>Transferencia fue realizada exitosamente.</h4>
              <p>Fecha y hora: {transferDetails.date}</p>
              <p>Cuenta debitada: {transferDetails.debitAccount.number} {transferDetails.debitAccount.name}</p>
              <p>Monto debitado: Q. {transferDetails.amount}</p>
              <button onClick={onClose}>Regresar</button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-content">
              <div className="transfer-actions">
                <div className="select-account-type">
                  <label htmlFor="accountType">Tipo de cuenta: </label>
                  <select id="accountType" value={selectedAccountType} onChange={handleAccountTypeChange}>
                    <option value="cuenta">Monetaria</option>
                    <option value="cuentaAhorro">Ahorro</option>
                    <option value="cuentaCredito">Crédito</option>
                  </select>
                </div>
                <div className="enter-amount">
                  <label htmlFor="amount">Monto a transferir: </label>
                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Ingrese el monto"
                  />
                </div>
                <div className="modal-buttons">
                  <button onClick={onClose}>Cerrar</button>
                  <button onClick={handleTransfer}>Confirmar Transferencia</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
