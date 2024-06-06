import React, { useEffect, useState } from 'react';
import { useExtraDetails } from '../../shared/hooks'
import { LoadingSpinner } from '../LoadingSpinner'

export const Cuentas = () => {
    const { isFetching, getExtraDetails, extraDetails } = useExtraDetails();

    useEffect(() => {
        const fetchData = async () => {
            await getExtraDetails();
        };
        fetchData();
    }, []);

    const handleTransferir = () => {
        console.log('Transferir');
    };

    if (isFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="cuentas-container">
            <div className="barra-superior">
                <h3>Cuentas</h3>
            </div>
            <div className="info-adicional usuario-info">
                {extraDetails ? (
                    <div>
                        <p>Nombre: {extraDetails.data.userData.nombre}</p>
                        <p>No. Cuenta: {extraDetails.data.userData.cuenta}</p>
                        <p>Saldo disponible: {extraDetails.data.userData.monto}</p>
                        <button onClick={handleTransferir}>Transferir</button> 
                    </div>
                ) : (
                    <p>Cargando información adicional...</p>
                )}
            </div>
        </div>
    );
    
};    