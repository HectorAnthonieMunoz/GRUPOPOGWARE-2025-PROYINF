import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import SimulacionForm from "../components/SimulacionForm";
import SimulacionPreview from "../components/SimulacionPreview";
import HistorialSimulaciones from "../components/HistorialSimulaciones";
import { formatCurrency, formatPercent, formatDate, generarTablaAmortizacion } from "../utils/simulacionUtils";
import styles from "../styles/simulacionStyles";
import useSimulacion from "../hooks/useSimulacion";

export default function SimulacionPage() {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  // ESTADOS NUEVOS PARA LA HU 1
  const [ingresos, setIngresos] = useState("");
  const [deudas, setDeudas] = useState("0");

  const {
    monto,
    setMonto,
    plazo,
    setPlazo,
    simulacion,
    loading,
    error,
    success,
    historial,
    mostrarTodoHistorial,
    loadingHistorial,
    vistaPrevia,
    mostrarAmortizacion,
    setMostrarAmortizacion,
    handleSimular,
    handleLimpiar,
    handleEliminar,
    handleVerMas,
    handleSeleccionarSimulacion,
    CONFIG,
  } = useSimulacion(user);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>💰 Simulador de Crédito</h1>
        <p style={styles.subtitle}>Simula tu crédito y conoce las condiciones al instante</p>
      </div>

      {simulacion && (
        <div style={{
          background: "#e0f2fe",
          color: "#075985",
          padding: 12,
          borderRadius: 10,
          margin: "0 0 16px",
          fontWeight: 600,
        }}>
          🔁 Revisitando simulación #{simulacion.id}
        </div>
      )}

      {error && <div style={styles.alertError}>❌ {error}</div>}
      {success && <div style={styles.alertSuccess}>{success}</div>}

      <div style={styles.mainGrid}>
        <SimulacionForm
          monto={monto}
          setMonto={setMonto}
          plazo={plazo}
          setPlazo={setPlazo}
          // Props de la HU 1
          ingresos={ingresos}
          setIngresos={setIngresos}
          deudas={deudas}
          setDeudas={setDeudas}
          handleSimular={(e) => {
            e.preventDefault();
            // Le pasamos al hook los datos originales + los financieros
            handleSimular({ 
              monto: Number(monto), 
              plazo: Number(plazo),
              ingresos_mensuales: Number(ingresos),
              deudas_actuales: Number(deudas)
            });
          }}
          loading={loading}
          handleLimpiar={() => {
            setIngresos("");
            setDeudas("0");
            handleLimpiar();
          }}
          CONFIG={CONFIG}
          styles={styles}
          formatCurrency={formatCurrency}
          onSolicitar={() => {
            const simToUse = simulacion || vistaPrevia;
            if (!simToUse) {
              window.alert("Primero ajusta monto y plazo para simular.");
              return;
            }
            navigate("/solicitud/nueva", { state: { sim: simToUse } });
          }}
          canSolicitar={!!(simulacion || vistaPrevia)}
        />

        <SimulacionPreview
          vistaPrevia={simulacion || vistaPrevia}
          mostrarAmortizacion={mostrarAmortizacion}
          setMostrarAmortizacion={setMostrarAmortizacion}
          generarTablaAmortizacion={generarTablaAmortizacion}
          formatCurrency={formatCurrency}
          formatPercent={formatPercent}
          styles={styles}
        />
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📚 Historial de Simulaciones</h2>
        <HistorialSimulaciones
          historial={historial}
          loadingHistorial={loadingHistorial}
          handleEliminar={handleEliminar}
          handleSeleccionarSimulacion={handleSeleccionarSimulacion}
          mostrarTodoHistorial={mostrarTodoHistorial}
          handleVerMas={handleVerMas}
          styles={styles}
          formatCurrency={formatCurrency}
          formatPercent={formatPercent}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}