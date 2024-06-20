import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExtraDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

export const Cuentas = () => {
  const { isFetching, getExtraDetails, extraDetails } = useExtraDetails();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getExtraDetails();
    };
    fetchData();
  }, []);

  const handleTransferir = () => {
    navigate('/transferencia');
  };

  if (isFetching) {
    return <LoadingSpinner />;
  }

  const renderAccountInfo = (cuenta, nombre, monto, tipoCuenta) => (
    <div className="user-info-card">
      <div className="header-container">
        <div className="info-item info-header">No. Cuenta</div>
        <div className="info-item info-header">Nombre</div>
        <div className="info-item info-header">Saldo disponible</div>
        <div className="info-item info-header">Opciones</div>
      </div>
      <div className="user-data">
        <div className="info-item">{cuenta}</div>
        <div className="info-item">{nombre}</div>
        <div className="info-item">{monto}</div>
        <div className="info-item">
          <button onClick={() => handleTransferir(tipoCuenta)}>Transferir</button>
        </div>
      </div>
    </div>
  );

  if (!extraDetails) {
    return <p>Cargando información adicional...</p>;
  }

  const { userData } = extraDetails.data;

  return (
    <div className="cuentas-container">
      <div className="barra-superior">
        <h3>Cuentas</h3>
        <h3>Cuenta Monetaria</h3>
      </div>
      <div className="info-adicional usuario-info">
        {renderAccountInfo(userData.cuenta, userData.nombre, userData.monto, "monetaria")}
      </div>
      <div className="barra-superior">
        <h3>Cuenta de Ahorro</h3>
      </div>
      <div className="info-adicional usuario-info">
        {renderAccountInfo(userData.cuentaAhorro.numeroCuenta, userData.nombre, userData.cuentaAhorro.monto, "ahorro")}
      </div>
      <div className="barra-superior">
        <h3>Cuenta de Crédito</h3>
      </div>
      <div className="info-adicional usuario-info">
        {renderAccountInfo(userData.cuentaCredito.numeroCuenta, userData.nombre, userData.cuentaCredito.monto, "credito")}
      </div>
    </div>
  );
};
