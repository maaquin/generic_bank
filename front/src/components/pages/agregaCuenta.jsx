import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AgregarCuenta = ({ setCuentasAgregadas }) => {
  const navigate = useNavigate();
  const [nuevaCuenta, setNuevaCuenta] = useState({ numeroCuenta: '123123', dpi: '123123', alias: 'jorge' });

  const handleAgregarCuenta = () => {
    setCuentasAgregadas(prevCuentas => [...prevCuentas, nuevaCuenta]);
    navigate('/transferencia');
  };

  return (
    <div>
      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        No. Cuenta: <input type="text" value={nuevaCuenta.numeroCuenta} readOnly />
      </div>
      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        DPI: <input type="text" value={nuevaCuenta.dpi} readOnly />
      </div>
      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        Alias: <input type="text" value={nuevaCuenta.alias} readOnly />
      </div>
      <button onClick={handleAgregarCuenta}>Agregar cuenta</button>
    </div>
  );
};
