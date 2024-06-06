import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { useExtraDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

export const Cuentas = () => {
  const { isFetching, getExtraDetails, extraDetails } = useExtraDetails();
  const navigate = useNavigate(); // Define useNavigate

  useEffect(() => {
    const fetchData = async () => {
      await getExtraDetails();
    };
    fetchData();
  }, []);

  const handleTransferir = () => {
    navigate('/transferencia'); // Navega a la ruta /transferencia
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
          <div className="user-info-card">
            <div className="header-container">
              <div className="info-item info-header">No. Cuenta</div>
              <div className="info-item info-header">Nombre</div>
              <div className="info-item info-header">Saldo disponible</div>
              <div className="info-item info-header">Opciones</div>
            </div>
            <div className="user-data">
              <div className="info-item">
                {extraDetails.data.userData.cuenta}
              </div>
              <div className="info-item">
                {extraDetails.data.userData.nombre}
              </div>
              <div className="info-item">
                {extraDetails.data.userData.monto}
              </div>
              <div className="info-item">
                <button onClick={handleTransferir}>Transferir</button>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando información adicional...</p>
        )}
      </div>
    </div>
  );
};
