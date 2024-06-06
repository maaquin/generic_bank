import React, { useState } from 'react';
import axios from 'axios'; 

export const Transferencia = () => {
    const [remitenteId, setRemitenteId] = useState('');
    const [destinatarioId, setDestinatarioId] = useState('');
    const [monto, setMonto] = useState('');
    const [agregarCuenta, setAgregarCuenta] = useState(false);

    const handleAgregarCuenta = () => {
        setAgregarCuenta(true); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/banco/transferencia', {
                remitenteId,    
                destinatarioId,
                monto,
                signo: 'transferencia' 
            });

            console.log(response.data);

            setRemitenteId('');
            setDestinatarioId('');
            setMonto('');
        } catch (error) {
            console.error('Error al realizar la transferencia:', error);
        }
    };

    return (
        <div>
            <h2>Transferencia</h2>
            {agregarCuenta ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="destinatarioId">ID del Destinatario:</label>
                        <input type="text" id="destinatarioId" value={destinatarioId} onChange={(e) => setDestinatarioId(e.target.value)} required />
                    </div>
                    <button type="submit">Guardar Cuenta</button>
                </form>
            ) : (
                <button onClick={handleAgregarCuenta}>Agregar Cuenta</button>
            )}
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
        </div>
    );
};
