import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExtraDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

export const Cuentas = () => {
  const { isFetching, getExtraDetails, extraDetails } = useExtraDetails();
  console.log("extraDetails: ", extraDetails)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getExtraDetails();
    };
    fetchData();
  }, []);

  const handleTransferir = (cuenta, tipoCuenta, monto) => {
    navigate('/transferencia', { state: { cuenta, tipoCuenta, monto } });
  };


  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="cuentas-container">
      <div className="barra-superior">
        <h3>Cuentas</h3>
      </div>
      {extraDetails && (
        <>
          <div className="info-adicional usuario-info">
            <h3>Cuenta Monetaria</h3>
            <div className="user-info-card">
              <div className="header-container">
                <div className="info-item info-header">No. Cuenta</div>
                <div className="info-item info-header">Nombre</div>
                <div className="info-item info-header">Saldo disponible</div>
                <div className="info-item info-header">Opciones</div>
              </div>
              <div className="user-data">
                <div className="info-item">{extraDetails.data.userData.cuenta}</div>
                <div className="info-item">{extraDetails.data.userData.nombre}</div>
                <div className="info-item">{extraDetails.data.userData.monto}</div>
                <div className="info-item">
                  <button onClick={() => handleTransferir(extraDetails.data.userData, 'cuenta', extraDetails.data.userData.monto)}>Transferir</button>
                </div>
              </div>
            </div>
          </div>
          <div className="info-adicional usuario-info">
            <h3>Cuenta de Ahorro</h3>
            <div className="user-info-card">
              <div className="header-container">
                <div className="info-item info-header">No. Cuenta</div>
                <div className="info-item info-header">Nombre</div>
                <div className="info-item info-header">Saldo disponible</div>
                <div className="info-item info-header">Opciones</div>
              </div>
              <div className="user-data">
                <div className="info-item">{extraDetails.data.userData.cuentaAhorro.numeroCuenta}</div>
                <div className="info-item">{extraDetails.data.userData.nombre}</div>
                <div className="info-item">{extraDetails.data.userData.cuentaAhorro.monto}</div>
                <div className="info-item">
                  <button onClick={() => handleTransferir(extraDetails.data.userData, 'cuentaAhorro', extraDetails.data.userData.cuentaAhorro.monto)}>Transferir</button>
                </div>
              </div>
            </div>
          </div>
          <div className="info-adicional usuario-info">
            <h3>Cuenta de Crédito</h3>
            <div className="user-info-card">
              <div className="header-container">
                <div className="info-item info-header">No. Cuenta</div>
                <div className="info-item info-header">Nombre</div>
                <div className="info-item info-header">Saldo disponible</div>
                <div className="info-item info-header">Opciones</div>
              </div>
              <div className="user-data">
                <div className="info-item">{extraDetails.data.userData.cuentaCredito.numeroCuenta}</div>
                <div className="info-item">{extraDetails.data.userData.nombre}</div>
                <div className="info-item">{extraDetails.data.userData.cuentaCredito.monto}</div>
                <div className="info-item">
                  <button onClick={() => handleTransferir(extraDetails.data.userData, 'cuentaCredito', extraDetails.data.userData.cuentaCredito.monto)}>Transferir</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
