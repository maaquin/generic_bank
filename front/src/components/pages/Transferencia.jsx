import React, { useState } from 'react';

export const Transferencia = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [remitenteId, setRemitenteId] = useState('');
  const [destinatarioId, setDestinatarioId] = useState('');
  const [monto, setMonto] = useState('');
  const [cuentasAgregadas, setCuentasAgregadas] = useState([]);

  const handleAgregarClick = () => {
    setMostrarFormulario(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaCuenta = { remitenteId, destinatarioId, monto };
    setCuentasAgregadas([...cuentasAgregadas, nuevaCuenta]);
    setRemitenteId('');
    setDestinatarioId('');
    setMonto('');
  };

  return (
    <div className="centrado">
      <h2 className="titulo">Transferencias</h2>
      <hr className="linea" />
      {!mostrarFormulario ? (
        <div className="cuadro">
          <span className="texto">Agregar una cuenta</span>
          <button onClick={handleAgregarClick}>Agregar</button>
          <hr className="linea" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="remitenteId">ID del Remitente:</label>
            <input type="text" id="remitenteId" value={remitenteId} onChange={(e) => setRemitenteId(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="destinatarioId">ID del Destinatario:</label>
            <input type="text" id="destinatarioId" value={destinatarioId} onChange={(e) => setDestinatarioId(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="monto">Monto:</label>
            <input type="number" id="monto" value={monto} onChange={(e) => setMonto(e.target.value)} required />
          </div>
          <button type="submit">Realizar Transferencia</button>
        </form>
      )}
      <div className="cuentas-agregadas">
        <h3>Cuentas agregadas</h3>
        <ul>
          {cuentasAgregadas.map((cuenta, index) => (
            <li key={index}>
              Remitente: {cuenta.remitenteId}, Destinatario: {cuenta.destinatarioId}, Monto: {cuenta.monto}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
