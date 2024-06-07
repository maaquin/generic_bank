import React, { useState } from 'react';

export const AgregarCuenta = ({ cuentasExistente, setCuentasAgregadas }) => {
  const [nuevaCuenta, setNuevaCuenta] = useState({ numeroCuenta: '', dpi: '' });
  const [consultaExitosa, setConsultaExitosa] = useState(false);
  const [cuentaConsultada, setCuentaConsultada] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaCuenta(prevCuenta => ({
      ...prevCuenta,
      [name]: value
    }));
  };

  const handleConsultarCuenta = () => {
    if (!nuevaCuenta.numeroCuenta || !nuevaCuenta.dpi) {
      setError('Ambos campos son necesarios para realizar la consulta.');
      return;
    }
    const cuentaExistente = cuentasExistente.find(
      cuenta => cuenta.numeroCuenta === nuevaCuenta.numeroCuenta || cuenta.dpi === nuevaCuenta.dpi
    );
    if (cuentaExistente) {
      setCuentaConsultada(cuentaExistente);
      setConsultaExitosa(true);
    } else {
      setConsultaExitosa(false);
    }
    setError('');
  };
  
  return (
    <div>
      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        No. Cuenta: <input type="text" name="numeroCuenta" value={nuevaCuenta.numeroCuenta} onChange={handleInputChange} />
      </div>
      <div style={{ display: 'inline-block', marginRight: '10px' }}>
        DPI: <input type="text" name="dpi" value={nuevaCuenta.dpi} onChange={handleInputChange} />
      </div>
      <button onClick={handleConsultarCuenta}>Consultar cuenta</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {consultaExitosa ? (
        <div>
          <p>La cuenta existe:</p>
          <p>Número de Cuenta: {cuentaConsultada.numeroCuenta}</p>
          <p>DPI: {cuentaConsultada.dpi}</p>
          <p>Alias: {cuentaConsultada.alias}</p>
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};
